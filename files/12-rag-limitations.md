# RAG Isn't Enough: Designing AI Systems That Can Reason

**Why retrieval-augmented generation is a solved problem, and why the frontier is reasoning-augmented retrieval.**

---

Every AI startup's technical stack looks the same: "We use vector embeddings and RAG." Like RAG is the answer to every question.

It's not.

RAG (Retrieval-Augmented Generation) is useful for grounding LLM responses in data. You retrieve relevant documents and feed them to the LLM, which generates answers based on the retrieved context.

But here's what RAG doesn't do: **reason over the retrieved data.**

Example: "How has the company's revenue changed over the last 5 quarters?"

RAG approach:

1. Embed the question.
2. Search for documents about revenue.
3. Retrieve Q1, Q2, Q3, Q4, Q5 revenue reports.
4. Feed them to the LLM.
5. LLM generates: "Q1: $10M, Q2: $12M, Q3: $14M, Q4: $15M, Q5: $16M. Revenue is growing."

That works. But notice: the LLM didn't _reason_. It pattern-matched retrieved data and output text.

Now ask: "Which quarter had the biggest growth?"

RAG still retrieves the same documents. But the answer requires comparing growth rates (16-15=1M vs 15-14=1M), selecting the maximum, and explaining. The LLM _can_ do this—pattern matching works for simple arithmetic.

But now ask: "Given our growth rate, how many employees do we need to hire to maintain quality?"

RAG retrieves revenue documents. But there's no document about "growth-to-headcount ratio." The LLM can't reason backward from first principles. It can only pattern-match what's in the training data (or the retrieved context).

That's where RAG breaks.

## The Limitations of Retrieval

RAG assumes the answer exists in your database. What if it doesn't?

Case 1: **Inference.** You need the LLM to apply a principle, not just retrieve a fact.

Example: "If we're growing 20% annually and burning $500K/month, when do we hit profitability?"

This requires:

- Data (growth rate, burn rate)
- A model (runway = cash / monthly burn)
- Reasoning (apply the model to the data)

RAG retrieves the first two. The LLM must construct and reason through the third. It can, but only if it's capable enough (Claude, GPT-4) and if the reasoning is simple enough.

Case 2: **Multi-hop reasoning.** The answer requires chaining multiple facts together.

Example: "Which of our salespeople should we promote to team lead?"

This needs:

- Salesperson 1: revenue $500K, tenure 2 years, 90% deal close rate, interpersonal feedback: strong
- Salesperson 2: revenue $600K, tenure 1 year, 85% deal close rate, interpersonal feedback: learning

RAG retrieves all this. But answering requires weighing factors (experience matters, but raw revenue doesn't tell the whole story), considering trade-offs (new to the team but higher revenue), and making a judgment call. The LLM can do this—it's pattern matching again—but it's not reasoning. It's interpolation.

Case 3: **Contradiction resolution.** Databases are messy. You have conflicting data.

Example: "Is Alice in Boston or New York?"

RAG retrieves:

- Alice's profile: "Based in Boston"
- A recent email: "Flying to New York tomorrow"
- A calendar event: "Board meeting in Boston, March 15"

All three are true _and_ contradictory. RAG doesn't know which to trust. It'll output something like "Alice is based in Boston but recently traveled to New York." Which isn't wrong, but it's not reasoned.

To _reason_, you'd need:

- A temporal model (the email is recent, so she might be in New York now)
- Context (the board meeting is March 15; what's today?)
- Assumptions (recent travel implies current location)

RAG doesn't do this naturally. You need to add reasoning on top.

## From RAG to Reasoning-Augmented Systems

The next layer isn't better retrieval. It's reasoning systems that _use_ retrieval as input.

Here's the pattern:

```
Question → Decompose into sub-questions →
Retrieve data for each sub-question →
Reason over the data →
Synthesize an answer
```

Example: "Given our growth and burn rate, how many months of runway do we have?"

Decompose:

- Sub-Q1: What's our monthly burn rate?
- Sub-Q2: How much cash do we have?
- Sub-Q3: What's our growth rate? (helps forecast)

Retrieve:

- Burn rate from financial documents (retrieved)
- Cash from balance sheet (retrieved)
- Growth rate from quarterly reports (retrieved)

Reason:

- Runway = Cash / Burn
- With growth, burn might change; adjust the forecast
- Calculate months of runway

Synthesize:

- "Based on current burn of $X/month and cash of $Y, you have Z months of runway. If growth accelerates as projected, this could extend to Z+1 months."

This is what we do in IRIS-LLM. A faculty member asks "Show me students with more than 4 absences." We don't just retrieve attendance data and let Claude output text. We:

1. **Decompose**: student_id, course_id, date, status
2. **Retrieve**: attendance records
3. **Reason**: COUNT(status='absent') GROUP BY student_id HAVING COUNT > 4
4. **Synthesize**: [list of students]

The LLM's role is narrower: convert natural language to a logical query, not generate prose from raw data.

## Where This Matters: Hallucination Prevention

RAG doesn't prevent hallucinations. It reduces them—because the LLM is grounded in retrieved data—but doesn't eliminate them.

Example: "Based on Q1 revenue of $10M, how many people work here?"

RAG retrieves Q1 revenue ($10M). The LLM outputs: "Based on revenue-to-headcount ratios in tech, probably 50 people."

That's a hallucination. There's no retrieved data about headcount. The LLM pattern-matched "tech company + $10M revenue = 50 people" and generated an answer.

A reasoning system would:

1. Decompose: Can I infer headcount from revenue alone? No, I need more data.
2. Query: What data do we have about headcount? (Nothing in this case)
3. Reason: I don't have the data to answer this.
4. Respond: "I don't know. We'd need to query the headcount database."

No hallucination. No false confidence.

## Building Reasoning Systems in Practice

Start with RAG. It's useful. But add:

**1. Query Decomposition**

Break complex questions into retrievable sub-questions. Have the LLM generate the decomposition, then retrieve for each sub-question.

```typescript
const decompose = async (question) => {
  const subQuestions = await llm.generate([
    { role: "user", content: `Break this into retrievable sub-questions: ${question}` },
  ]);
  return subQuestions; // ["What's burn rate?", "What's cash?", ...]
};

const retrieve = async (subQuestions) => {
  return Promise.all(subQuestions.map((q) => search(q)));
};

const reason = async (subQuestions, data) => {
  // Apply domain logic, not just pattern matching
  return calculate(data);
};
```

**2. Validation**

After the LLM generates an answer, validate it against the retrieved data. Does the answer match? If not, re-prompt or escalate.

```typescript
const validate = (question, answer, retrievedData) => {
  // Does the answer cite data we actually retrieved?
  // Is the arithmetic correct?
  // Are there contradictions?
  return isValid(answer, retrievedData);
};
```

**3. Grounding**

Every claim in the final answer should point back to a retrieved source. "Revenue is $10M (Q1 report, page 3)" not just "Revenue is $10M."

## Key Learnings

- **RAG is pattern matching over data, not reasoning.** Useful, but limited.
- **Reasoning requires decomposition.** Break complex questions into retrievable pieces.
- **Validation beats confidence.** Always check that the answer matches the data.
- **Hallucinations happen when there's no data to retrieve.** The system should know when it doesn't know.
- **Domain logic belongs in rules, not prompts.** If you need to calculate runway, write a function. Don't prompt the LLM to do arithmetic.

## Closing Thoughts

RAG solved the grounding problem. You no longer need to worry about LLMs hallucinating facts outside their training data. That's huge.

But grounding isn't reasoning. A system that can retrieve data and apply domain logic is more useful than a system that can only pattern-match.

The next generation of AI systems won't be better at retrieval. They'll be better at reasoning over what they retrieve.

That's where the frontier is.
