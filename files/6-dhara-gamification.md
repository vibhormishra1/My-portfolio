# DHARA — Gamifying Environmental Action

**How we used gamification mechanics to make campus sustainability feel less like a chore.**

---

Most sustainability platforms fail at the same place: execution. They're designed for people who already care. If you're passionate about the environment, you'll fill out impact surveys and track your carbon footprint. Everyone else bounces.

DHARA is different. It's built for apathy—for the student who doesn't think twice about electricity use until a leaderboard tells them they're 10th on their floor.

## The Core Loop

DHARA has a simple mechanic: **challenges → points → rewards**.

Students complete daily and weekly challenges:

- "Take a 5-minute shower" (5 points)
- "Use public transport instead of auto" (10 points)
- "Organize a campus cleanup" (50 points)

Points feed into a currency system that unlocks rewards: tree plantings in the student's name, discounts at the campus cafe, features on an "Environmental Hero" wall.

Leaderboards run at three levels: floor, college, and campus. Real-time rankings create FOMO—the driver of engagement.

## The Design Problem: Frivolous Points

The biggest risk with gamification: the system feels arbitrary. Why is a shower 5 points but recycling 3 points? Students sense the unfairness and stop caring.

We solved this by tying points to _actual_ environmental impact. Each challenge has a carbon or water impact estimate sourced from EPA and Indian government environmental data:

- A 5-minute shower saves ~10 liters of water → 5 points
- Public transport saves ~2kg CO2 per trip → 10 points
- Planting a tree offsets ~20kg CO2/year → 50 points

The math is approximate—an auto trip's carbon depends on fuel type, distance, occupancy. But it's grounded in reality, not arbitrary.

When a student asks "Why is this worth X points," the answer isn't "we decided." It's "because it actually saves this much water."

## Technical: React + TypeScript + Vite

The frontend is lightweight. No heavy frameworks; we use React for state management and TanStack Query for data fetching (challenges change daily).

State structure:

```typescript
type User = {
  id: string;
  name: string;
  points: number;
  challenges_completed: string[];
  streak: number; // days in a row of ≥1 challenge
  floor: string;
  rank_floor: number;
  rank_campus: number;
};
```

We fetch leaderboards asynchronously (heavy query, cached for 10 minutes) and stream user state updates in real-time via WebSockets.

Vite's hot module replacement was a lifesaver during development. Tweaking gamification mechanics (point values, challenge difficulty) happens in real-time without losing app state.

## Architecture Diagrams as Product Validation

We used React-based ER and use-case diagrams as part of the product design process. This sounds weird—why put database schemas in your app?

Answer: validation. A teammate could see the ER diagram and immediately spot issues:

- "Wait, we're storing challenges as an array in the user doc? That doesn't scale if students complete 1000+ challenges."
- "Use cases show no way for admins to add challenges. That's a problem."

We iterated on architecture directly inside the app, live. By the time we built the backend, the schema was vetted.

This is an unconventional way to do system design—most teams use Lucidchart or draw.io separately. But for a startup-speed hackathon project, embedding the diagrams in the product itself caught issues early.

## The Churn Problem

Early metrics: 60% of students completed a challenge on day 1. By day 7, 15% were still active. Churn was steep.

We added three mechanics:

**1. Streaks.** Complete at least one challenge per day, and your multiplier increases: day 2 = 1.1x points, day 5 = 1.5x points. A broken streak hurts (you drop back to 1x). This alone bumped week-7 retention to 35%.

**2. Social proof.** Show the user's floor's leaderboard prominently. Seeing your name drop from 5th to 10th when a peer completes challenges creates urgency.

**3. Surprise challenges.** Every Tuesday, a random "flash challenge" appears (valid for 24 hours, high points). Keeps people checking the app.

Result: week 7 retention climbed to 45%. Still lossy, but acceptable for a gamified app built for casual users.

## What Matters: Community, Not Just Mechanics

Leaderboards and points get people in the door. What keeps them is community.

We added a "Floor Hall of Fame"—features the top 3 students from each floor, with a short bio. Suddenly, gamification became about recognition, not just optimization.

We also added a community challenge board where students post photos of sustainability actions. "I used a jute bag today" with a photo might sound trivial, but it normalizes the behavior and creates social reinforcement.

The mechanics aren't the product. Community is.

## Key Learnings

- **Gamification is about behavior, not fun.** Points and leaderboards aren't fun. They're nudges. The fun is the social proof and peer recognition.
- **Impact transparency matters.** When students understand that their 5-minute shower actually saves 10 liters, they care more than when it's just "5 points."
- **Streaks are powerful.** Not because they motivate people; because losing a streak demotivates them into maintaining it. The loop is asymmetric.
- **Churn is normal and expected.** 45% week-7 retention on a gamified app for casuals is solid. You're not building Wordle; you're trying to nudge behavior.

## Closing Thoughts

DHARA launched during Smart India Hackathon as an eco-challenge platform for campus sustainability. We didn't win big (there were better ideas), but we proved that gamification, grounded in real impact, can shift behavior.

The next phase: integration with the campus utility system. When a student completes "take a 5-minute shower," we want to actually measure their water usage and confirm the impact. Right now it's on trust (students self-report). Real measurement would be game-changing—literally and ethically.

Live demo: [eco-rise.vercel.app](https://eco-rise.vercel.app)
