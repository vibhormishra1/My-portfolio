# From Prompt Engineering to Agent Engineering

**Why better prompts won't save a bad system, and why systems thinking matters more than copy-paste examples.**

---

Two years ago, everyone became a prompt engineer. "The real skill is finding the magic incantation," they said. Feed the LLM the right words, and it'll do anything.

That's true—for chatbots. For systems? It's wrong.

Prompt engineering optimizes a single forward pass. Agent engineering optimizes the entire loop.

## The Limits of Prompt Engineering

A good prompt can make an LLM solve problems it otherwise wouldn't. Few-shot examples help. Chain-of-thought reasoning helps. Telling the LLM to "be an expert in X" ... actually doesn't help much, but it feels good.

But here's what a prompt can't do:

- Recover from tool failures
- Remember context across conversations
- Balance speed and accuracy
- Route requests based on complexity
- Handle edge cases systematically

Those require systems thinking, not better prompts.

I learned this the hard way. Early IRIS-LLM: I spent 2 weeks perfecting the prompt for attendance queries. "You are an expert in SQL and education analytics..." Fifteen examples. Careful instruction structure.

Result: 89% accuracy on test queries. Production: 68% accuracy.

Why? Because the test data was clean. Students asked well-formed questions. Production data was messy. Students asked ambiguous stuff: "Show me students who are bad." (Bad at attendance? Bad at grades? Bad at participation?)

A better prompt wouldn't fix that. I needed a **triage system** that classified queries (ambiguous → ask for clarification, clear → execute).

So I added a routing layer. First, the LLM classifies the query. If ambiguous, we ask the user to clarify. If clear, we execute.

Accuracy jumped to 91%.

That's agent engineering.

## Layers of AI Systems

**Layer 1: Prompt**

The system prompt defining the agent's role, tools, and constraints.

**Layer 2: Tool Definitions**

How you describe the tools the agent can call. Vague definitions lead to misuse. Precise definitions lead to accurate tool calls.

**Layer 3: State Management**

What memory does the agent have? How is it stored? How is it retrieved? This matters more than the prompt.

**Layer 4: Routing**

How do different requests flow through your system? Simple queries go fast; complex ones get routed to humans. This is systems design, not prompting.

**Layer 5: Error Handling**

What happens when the agent fails? Does it retry? Escalate? Degrade? This is where most teams lose users.

**Layer 6: Observability**

Can you debug what went wrong? This layer doesn't affect correctness, but it determines whether you can fix issues when they arise.

Most teams obsess over Layer 1 (the prompt) and ignore the rest. That's backwards.

## A Case Study: VEDA Agent Consistency

In VEDA, we wanted agents to maintain consistent personas across 50+ messages. Everyone told us: "Better prompts, more examples."

We tried. Personas still drifted.

The issue wasn't the prompt. It was Layer 3 (state management). The agent's internal state (what it had committed to, what it had learned) was scattered across the conversation history. By message 30, the agent had forgotten what it decided on day 1.

Solution: explicit state tracking.

```typescript
type AgentState = {
  role: string; // PM, Senior Engineer, etc.
  commitments: string[]; // What I promised to do
  decisions: string[]; // What I decided
  learnings: string[]; // What I learned from failures
};
```

After each decision, we update the agent's state explicitly. Before responding, the agent reads its state. This gives it grounding—"I'm a PM, and I've rejected scope creep 3 times this sprint. Let me be skeptical again."

Consistency jumped from 60% to 95%.

Better prompts wouldn't have done this. Explicit state management did.

## Tool Design is Half the Battle

A vague tool definition:

```json
{
  "name": "query_database",
  "description": "Query the database"
}
```

The agent has no idea what the database contains, what queries are valid, or what results look like. It'll make random guesses.

A precise tool definition:

```json
{
  "name": "query_attendance_records",
  "description": "Query student attendance records. Returns array of {student_id, date, status: 'present'|'absent', marked_by: user_id}",
  "parameters": {
    "type": "object",
    "properties": {
      "student_id": { "type": "string", "description": "SIRT student ID (e.g., 'SIRT-001234')" },
      "start_date": { "type": "string", "description": "YYYY-MM-DD format" },
      "end_date": { "type": "string" },
      "status_filter": {
        "enum": ["present", "absent", "all"],
        "description": "Filter by status or return all"
      }
    },
    "required": ["student_id", "start_date", "end_date"]
  }
}
```

The agent knows exactly what it's querying, what parameters are required, what the response looks like. Accuracy on tool calls jumps from 70% to 95%.

Tool design takes time. It's tedious. But it's more important than prompt engineering.

## Error Handling is Where Agents Prove Themselves

In a notebook, errors crash the script. You fix them and re-run.

In production, errors need recovery.

A good system has three error paths:

**Path 1: Automatic Recovery**

Tool call fails? Retry with exponential backoff. If it fails 3 times, try a different tool or mark the resource as unavailable.

**Path 2: Escalation**

If recovery fails, escalate to a human. Log what happened; let the human decide.

**Path 3: Degradation**

If the primary tool is unavailable, use cached data or a fallback. Slow but works.

MARG implements this explicitly:

```typescript
async function executeToolWithRecovery(tool, input, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await tool(input);
    } catch (error) {
      if (i === maxRetries - 1) {
        // All retries exhausted; escalate
        return escalateToHuman({ tool, input, error, attempts: i + 1 });
      }
      // Exponential backoff
      await sleep(Math.pow(2, i) * 100);
    }
  }
}
```

This doesn't require a special prompt. It's systems design.

## The Hierarchy

When you're building an AI system, focus in this order:

1. **System architecture.** How do requests flow? How is state managed? How do agents coordinate?
2. **Tool definitions.** Be precise. Vague tools lead to misuse.
3. **Error handling.** Make sure failures don't cascade.
4. **Routing.** Send different requests to different paths based on complexity.
5. **Observability.** Log everything so you can debug.
6. **Prompt.** Once the system is solid, tune the prompt.

Most teams do the reverse. That's why most systems are fragile.

## Key Learnings

- **Prompts optimize one forward pass. Systems optimize the loop.** You can't prompt-engineer your way out of a bad architecture.
- **Tool definitions are more important than prompts.** An agent with bad tools and a good prompt will perform worse than an agent with good tools and a mediocre prompt.
- **State management is invisible but critical.** Most prompt drifting and inconsistency issues are state management problems, not prompt problems.
- **Error handling is the difference between toys and systems.** A chatbot that crashes is fine. An agent in production that crashes is a disaster.

## Closing Thoughts

Prompt engineering is still valuable. But it's a tactic, not a strategy.

The strategy is systems thinking. Understand how information flows. Design state management carefully. Build in error recovery. Then tune the prompt.

That's how you go from a notebook demo to a system that actually works.
