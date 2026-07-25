# Lessons from Building Hackathon Projects That Feel Like Startups

**Why 36-hour projects are better training than 6-month internships.**

---

Hackathons are mostly hype. You build something, demo it, and everyone forgets about it by Monday.

But if you approach them differently—like you're building a startup, not a demo—they become the most useful training you can get.

I've done 5+ hackathons (Anveshana, SolveExpo, Tech-Sageathon, Google Solution Challenge, VIT Bhopal). Won a few, lost a few. The wins taught me more than the losses because I analyzed why they won.

## The 36-Hour Constraint is a Feature

Infinite time is a curse. With 6 months, you overthink, over-engineer, and never ship.

With 36 hours, you can't overthink. You build the minimum viable thing, ship it, and see if judges care.

This forces ruthless prioritization. You ask: "What's the one thing that makes this compelling?" Not "What's every feature we could imagine?"

Kachra Seth won because we nailed one thing: **AI waste classification + QR tracking + route optimization, end-to-end.** Not because the UI was polished (it wasn't). Not because we had 10 features (we didn't).

We had depth in one direction, not breadth in ten.

VEDA didn't win at Tech-Sageathon, but it made 4th place. Why? We had two agents talking to each other with shared memory. That was novel enough. The judges saw something real, even if unpolished.

## The MVP is Narrative, Not Features

Judges don't know your tech stack. They don't care if you used FastAPI or Express.

They care about: **Does this solve a real problem? Is the demo compelling? Will this actually work?**

So your MVP isn't the feature-complete product. It's the story + the proof of concept.

For Kachra Seth, our MVP was:

1. Real training data (50K+ waste images)
2. A working model (88% accuracy)
3. A simulated city with 500 bins
4. Live demo showing classification + routing

That's it. No full production system. No user onboarding. No scalability. But the narrative was clear: "Here's how municipal waste can be solved with AI."

For MARG, the MVP was:

1. Four LLM agents (logistics, medical, relief, coordination)
2. A shared state machine (Firebase RTDB)
3. A rule engine validating decisions
4. A live dashboard showing the crisis simulation

Again: minimal, but complete. Judges saw a cohesive idea, not scattered features.

## Code Quality Can Be Ignored (For 36 Hours)

This is controversial, but true. Your hackathon code will be garbage. It should be.

Write fast, not clean. Use global variables. Hardcode constants. Skip error handling for edge cases. Deploy to production (you'll get destroyed, but that's the point).

Why? Because shipping is the constraint. Perfection is optional.

After winning, I refactored Kachra Seth. Broke it down into modules, added error handling, wrote tests. Took 2 weeks. Would've been impossible during the 36-hour sprint.

The key: **don't let perfectionism stop you from shipping.** You can refactor later (or not—most hackathon code never gets touched again, and that's fine).

## The Demo Matters More Than the System

Most judges can't evaluate your backend architecture. They _can_ evaluate whether the demo is smooth.

So invest in the demo.

For Kachra Seth, we spent 4 hours building a beautiful dashboard—color-coded bins, live vehicle tracking, a map. Would've been easier to just print a JSON response. But the dashboard made the concept real.

For IRIS, we built a live facial recognition demo where students could walk up, get scanned, and see their attendance appear on the dashboard in real-time. The tech was straightforward; the demo was stunning.

Invest in UX. Write it last, but allocate time for it.

## Storytelling Beats Technical Depth

You have 3 minutes to present. You can't explain your entire system.

So tell a story.

Kachra Seth: "Indian municipalities are drowning in garbage. Bins overflow, routes are inefficient, no one knows what to do. We built an AI system that classifies waste, tracks bins in real-time, and optimizes collection routes. Result: 30% fuel savings, 40% faster cycles, 80% fewer overflows."

That's the story. Everything else is detail.

MARG: "In a crisis, first responders need to make fast decisions with incomplete information. We built a system where four specialized AI agents—logistics, medical, relief, coordination—operate on a shared state and resolve conflicts using rules. Result: faster decisions, zero conflicts, human oversight."

You don't explain the rule engine. You don't detail the Firebase schema. You tell the story.

## Shipping Beats Perfection

This is the hardest lesson for engineers. We want to ship perfect systems. Hackathons reward shipping something that works.

Kachra Seth's model wasn't perfect. 88% accuracy means 1 in 8 predictions are wrong. If this were a medical device, unacceptable. For municipal waste? Good enough.

VEDA's agents sometimes contradict each other. Ideally, they'd always align. In reality, agents occasionally propose incompatible decisions. We show conflicts on the dashboard and let the human coordinator resolve them. It's messy, but it's real.

The lesson: **done is better than perfect.**

## Post-Hackathon: When to Keep Building?

Most hackathon projects die. That's fine—they were learning exercises.

But some are worth continuing. How do you know?

Three signals:

**1. Did real people engage with it?**

Kachra Seth: after the demo, municipal officials asked about deployment. Real-world interest.

IRIS: the college wanted to use it for actual attendance. Real-world use.

DHARA: 50+ students used it during the pilot. Real traction.

If you're demoing to judges and they say "cool," that's not a signal. If you're demoing to actual users and they say "when can we use this," that's a signal.

**2. Do you have co-builders who want to continue?**

Hackathons are solo+team. After, do the team members want to keep building? If yes, continue. If they're tired, let it die.

(I've built solo hackathon projects. They're lonelier and harder. Don't recommend.)

**3. Is the core insight novel enough to justify continued investment?**

Kachra Seth's insight: "AI waste classification + route optimization works for municipalities." Novel enough to build on.

If your insight is "we combined three existing tools," it's probably not worth continuing.

## Key Learnings

- **36 hours forces prioritization.** Without constraints, you'll never ship.
- **The MVP is narrative.** Your story matters more than your features.
- **Code quality can wait.** Ship fast, refactor later (or not).
- **The demo is the product.** Invest time in UX; it makes abstract concepts concrete.
- **Storytelling beats technical depth.** Three minutes, one story, full impact.
- **Shipping beats perfection.** Done is better than perfect.
- **Continue only if real people want it.** User interest is your signal to keep building.

## Closing Thoughts

Hackathons are compressed startup development. All the constraints of a real company (ship fast, with limited resources, under uncertainty) are crammed into 36 hours.

Most engineers see this as punishment. I see it as gift-wrapped training.

If you can ship a coherent, working system in 36 hours, you can ship anything. The skills transfer: ruthless prioritization, narrative clarity, shipping discipline.

Do hackathons. Treat them like startups. Ship something real. Then see if the world cares.

If it does, keep building.

If it doesn't, you've learned everything you need to know to build the next one better.
