# How I Design AI Systems Before Writing a Single Line of Code

**A framework for thinking through the hard problems before you start coding.**

---

Engineers want to code. That's our weakness.

We see an AI problem, and our instinct is to spin up a Jupyter notebook, start prompting Claude, and iterate until it works. That's how demos get built.

It's not how systems get built.

The teams that ship robust AI systems spend 40% of their time on design. Not UI/UX design—system design. Before any code is written.

Here's how I do it.

## Step 1: Map the Loop

Every AI system is a loop. User input → Agent reasoning → Action → Feedback → Repeat.

Draw the loop. Write out every step.

For IRIS-LLM, the loop is:

```
User asks question
  ↓
Is it unambiguous?
  ↓ (No) Ask for clarification
  ↓ (Yes) Generate SQL
  ↓
Is the SQL valid?
  ↓ (No) Regenerate
  ↓ (Yes) Execute query
  ↓
Format results
  ↓
Return to user
```

For MARG, the loop is:

```
Crisis event occurs
  ↓
Logistics agent proposes action
Medical agent proposes action
Relief agent proposes action
  ↓
Validate all proposals against rules
  ↓
Conflicts detected?
  ↓ (Yes) Coordination agent resolves
  ↓ (No) Execute all
  ↓
Log outcomes
  ↓
Repeat
```

Writing out the loop forces you to see bottlenecks and failure modes. You'll spot them before code.

## Step 2: Define Failure Modes

For every step in the loop, ask: What can go wrong here?

IRIS-LLM failures:

- User's question is ambiguous → Ask for clarification
- SQL generation fails → Retry with different prompt
- SQL is syntactically correct but semantically wrong → Show preview, ask for confirmation
- Database query times out → Return cached result if available
- No cached result → Apologize and escalate to human

MARG failures:

- Proposal violates constraints → Reject, log reason
- Multiple proposals conflict → Coordinate agent decides
- Coordination agent can't decide → Escalate to human commander
- External API (medical database) fails → Use cached data, mark as stale
- System is in a deadlock (A waits for B, B waits for A) → Kill the deadlock, escalate

Writing these out, you'll realize how many failure modes you hadn't considered.

## Step 3: Define State

What state does your system need to maintain?

Not code—just the data structures.

IRIS-LLM state:

```
{
  query: string,
  generated_sql: string,
  query_status: "pending" | "executing" | "complete" | "error",
  results: any[],
  user_confirmation: boolean,
  error_reason: string
}
```

MARG state:

```
{
  crisis_id: string,
  disaster_type: string,
  resource_inventory: { medical_units: [...], vehicles: [...], supplies: {...} },
  decisions: {
    proposed: [{ id, timestamp, agent, action, rationale }],
    approved: [...],
    rejected: [{ id, timestamp, reason }],
    executed: [...]
  },
  active_conflicts: [{ id, agents_involved, status }]
}
```

This is the source of truth. Everything flows from it. By defining it upfront, you see what's missing.

## Step 4: Define Agent Roles

If you're building a multi-agent system, define each agent's role explicitly.

Not in a prompt—on paper.

VEDA:

- **PM**: Optimizes for user value and timeline. Skeptical of scope. Rejects ~30% of feature requests.
- **Senior Engineer**: Minimizes technical risk. Pushes back on infeasible timelines. Owns architecture.
- **Client**: Wants value. Wants timeline. Doesn't care about technical constraints. Demands things.
- **Junior Developer**: Asks good questions. Identifies risks. Defers to senior but appropriately questions decisions.

For each agent:

- What's their objective? (PM's objective is != Client's objective)
- What information do they read? (Does PM see technical details? Yes. Does client?)
- What decisions can they make? (Only client can approve features, not PM)
- What constraints exist? (PM can't approve scope beyond available time)

Write these down. You'll design the system differently when you understand the constraints.

## Step 5: Define Communication Patterns

How do agents talk?

Patterns matter. Design before code.

**Synchronous**: Agent A calls Agent B, waits for response.

- Pro: Simple, immediate feedback.
- Con: Blocking, scalability issues, tight coupling.
- Use when: You need an answer immediately.

**Asynchronous**: Agent A sends message to Agent B, continues. Agent B responds later.

- Pro: Scalable, decoupled, handles latency.
- Con: Complex state management, eventual consistency.
- Use when: You can tolerate delays.

**Publish/Subscribe**: Agent A publishes a decision. All agents interested in that topic receive it.

- Pro: Decoupled, broadcast, easy to add new agents.
- Con: Loose coupling makes it hard to debug.
- Use when: Many agents need to react to a decision.

VEDA uses asynchronous + publish/subscribe. Agents poll a shared Firebase database and broadcast their proposals.

MARG uses asynchronous with a coordinator agent to enforce ordering.

Decide upfront. It changes your architecture dramatically.

## Step 6: Define Observability

You'll need to debug this. Plan for it now.

What do you log?

- Every agent decision and its reasoning
- Every tool call and its result
- Every conflict and how it was resolved
- Every failure and the recovery action
- Cost per request (tokens, API calls)
- Latency per step

Create a logging schema:

```typescript
type Log = {
  timestamp: ISO8601;
  agent_id: string;
  action: "propose" | "decide" | "execute" | "fail" | "escalate";
  details: {
    proposal?: object;
    reasoning?: string;
    error?: string;
    tokens_used?: number;
  };
};
```

Store logs in a time-series database. Query them when things go wrong.

This is how you'll debug production issues. Plan for it.

## Step 7: Define Constraints

What are your non-negotiables?

- Latency SLA: Agent must respond within X milliseconds.
- Cost SLA: Cost per request must be < $Y.
- Accuracy SLA: Agent must be correct >90% of the time.
- Availability SLA: System must be up 99.9% of the time.

Write these down. They'll inform every architecture decision.

If latency is critical, you'll cache aggressively. If cost is critical, you'll use smaller models. If accuracy is critical, you'll add validation and human review.

## Step 8: Design the Escalation Path

Every AI system fails. When it does, where does it go?

Define the escalation path upfront.

For IRIS-LLM:

- Query is ambiguous → Prompt user for clarification
- SQL generation fails → Show generated SQL to user, ask for help
- SQL is syntactically correct but returns 0 rows → Suggest alternative queries
- System error → Escalate to admin, show logs

For MARG:

- Proposal violates constraints → Log and reject
- Multiple proposals conflict → Coordination agent decides
- Coordination agent can't decide → Escalate to human commander
- Human commander goes offline → System enters safe mode (no new deployments, only execute approved decisions)

Plan the escalation chain. It's how you handle failures gracefully.

## Step 9: Sketch the MVP

What's the minimal version that proves the core idea?

For IRIS-LLM: Query attendance data without chat interface. Just SQL generation.

For MARG: Three agents (logistics, medical, coordination) with a rule engine, no UI.

For VEDA: Two agents (PM, engineer) running one sprint iteration.

The MVP shouldn't be feature-complete. It should be complete _in one direction_. Deep, not broad.

## Step 10: Write It Down

Don't skip this. Write a one-page design document.

**Page 1:**

- Problem statement
- User loop (what does the user do?)
- Agent roles (if multi-agent)
- Success metrics (what does "working" mean?)

**Implicit details** (you don't need to write, but think about):

- State schema
- Failure modes and recovery
- Communication patterns
- Observability plan
- Escalation path

Print it. Post it on a wall. Refer to it while coding. Update it if your understanding changes.

## Key Learnings

- **Loop thinking is powerful.** It forces you to see the actual problem, not the imagined one.
- **Failures matter more than happy paths.** Spend more time thinking about what goes wrong than what goes right.
- **State is underrated.** Define it clearly. It's the skeleton of your system.
- **Communication patterns are architectural.** Choose them before code.
- **Observability is insurance.** Plan for debugging from day 1.
- **Constraints guide design.** Latency, cost, accuracy—they all matter.

## Closing Thoughts

This process takes 1-2 hours for a small system, 1-2 days for a complex one.

It feels slow. It is slow.

But it's 10x faster than coding without a plan and debugging in production.

Spend the time upfront. Design before code. Ship systems that work.

That's the difference between demos and products.
