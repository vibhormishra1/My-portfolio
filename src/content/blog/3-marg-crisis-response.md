# MARG — Building a Neurosymbolic Multi-Agent Crisis Response Platform

**How we combined LLM reasoning with deterministic rules to coordinate disaster relief across logistics, medical, and relief agents.**

---

MARG started with a simple question: can LLMs make good decisions in a crisis? Fast, under uncertainty, with lives at stake?

The answer is no—not alone. But pair them with a rule engine? Yes.

MARG is our Google Solution Challenge 2026 entry: a crisis response platform where four specialized LLM agents operate on a shared Firebase Realtime Database state machine. An LLM proposes; a deterministic rule engine validates. Conflict resolution happens in milliseconds.

## The Architecture: LLM + Rules

The platform has four agents:

- **Logistics Agent**: Routes emergency vehicles, allocates supplies, optimizes evacuation paths.
- **Medical Agent**: Triages casualties, requests specific medical equipment, coordinates with hospitals.
- **Relief Agent**: Manages shelter allocation, food distribution, communication with citizens.
- **Coordination Agent**: Arbitrates conflicts, escalates to human commanders when uncertain.

Each agent reads the current state (disaster type, affected population, resource inventory) and proposes actions. Here's where it differs from naive multi-agent design:

**Agents don't commit directly.** They propose. A rule engine validates every proposal against constraints:

- No more medical units deployed than available
- No shelter allocation > facility capacity
- No supply routes through damaged infrastructure (checked against damage map)
- Evacuation priority: critical → high → medium → low

If a proposal violates constraints, it's rejected and logged. The coordination agent reviews rejected proposals and either negotiates a revision or escalates.

## State Management: Firebase RTDB as Source of Truth

Everything lives in one Firebase Realtime Database:

```
/crisis
  /metadata
    /crisis_id
    /start_time
    /disaster_type
  /resources
    /medical_units: {available, deployed, in_transit}
    /supplies: {water, food, medicine, ...}
    /vehicles: [{id, location, capacity, fuel}]
  /locations
    /shelters: [{id, capacity, current, damage_level}]
    /hospitals: [{id, specialty, bed_count, current}]
    /damaged_zones: [{lat, lng, radius, severity}]
  /decisions
    /proposed: [timestamp-ordered list]
    /approved: [timestamp-ordered list]
    /rejected: [timestamp-ordered list]
```

Agents poll `/decisions/proposed` every 5 seconds. If a proposal is approved, they execute it (send vehicle, allocate supplies). If rejected, they see the reason and propose a revision.

Conflict resolution happens here: if two agents propose incompatible actions on the same resource, the first write wins, the second is rejected. We _could_ use distributed consensus (Paxos, Raft), but in a crisis, accepting slight resource-allocation inefficiency beats waiting for consensus.

## Deterministic Conflict Resolution

The rule engine is deterministic. Feed it the same state twice, you get the same validation result. This is non-negotiable—first responders can't debug why a decision was rejected if reasons change.

We implemented it as a TypeScript rule engine (not ML-based) because:

1. Rules are auditable. First responders need to know _why_ a vehicle wasn't deployed.
2. Rules are interpretable. No black boxes in life-or-death systems.
3. Rules can be updated without retraining. When regulations change, you update rules.

Here's a simplified rule:

```typescript
if (proposal.type === "deploy_vehicle") {
  const vehicle = state.resources.vehicles[proposal.vehicle_id];
  const zone = state.locations.damaged_zones.find((z) => distance(vehicle.location, z) < z.radius);

  if (zone && zone.severity === "critical") {
    return { approved: false, reason: "Zone too damaged for vehicle access" };
  }
  if (vehicle.fuel < calculateFuelRequired(proposal.route)) {
    return { approved: false, reason: "Insufficient fuel" };
  }
  return { approved: true };
}
```

## The Dashboard: Real-time Command Center

We built a React + TypeScript dashboard that streams state updates via WebSocket. Incident commanders see:

- Live agent proposals (with reasoning from Gemini 2.0 Flash)
- Resource inventory, vehicle positions, shelter capacity
- Decision timeline (approved → executed → completed)
- Rejected proposals and why

The dashboard also accepts _overrides_. If a human commander disagrees with the rule engine, they can force-approve a rejected proposal. This is logged and flagged for post-incident review.

## Deployment & Scaling

We containerized the backend (FastAPI) and deployed on Railway with rolling updates. The rule engine runs in-process; Firebase handles persistence and distribution.

In testing with simulated disasters (earthquake, flood, fire), the system made ~500 decisions per hour with <200ms validation latency. Bottleneck was Firebase write throughput, not agent reasoning.

## What Almost Broke Us

**1. Proposal Thundering Herd.** Early on, all agents would propose at the same time, causing Firebase write collisions. We added random backoff: each agent waits 50-150ms before polling. Collisions dropped 90%.

**2. Memory Explosion.** Storing every decision ever is expensive. We trimmed decisions older than 12 hours and summarized recent decisions into a "situation report" that agents read instead. Reduced context size by 60%.

**3. Agent Contradiction.** The medical agent would request an ambulance that the logistics agent had already marked for evacuation. We added a _shared ledger_: before proposing, agents check what others proposed in the last 30 seconds. Coordination improved dramatically.

## Key Learnings

- **Neurosymbolic beats pure neural.** An LLM is a terrible validator. A rule engine is a terrible reasoner. Together, they're formidable.
- **State machines are underrated.** Your shared state needs structure. Firebase RTDB's hierarchical model forced us to think clearly about what matters.
- **Determinism is a feature, not a bug.** When people's lives depend on decisions, you need to know _why_ a decision was made.
- **Humans stay in the loop.** We could've fully automated crisis response. Instead, we kept humans as arbiters. This is correct.

## Closing Thoughts

MARG is still in development, but it's already taught us how to build AI systems that operate in uncertainty without gambling with lives. The rule engine isn't beautiful—it's a 400-line TypeScript file with explicit if-statements. But that's the point. Beauty is for demos. Clarity is for production.

Next: integrating real incident data from municipal disaster management agencies, and testing on actual crisis scenarios.
