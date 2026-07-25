# Kachra Seth — Building an AI-Powered Urban Waste Management Platform

**How we shipped a 3-layer SaaS platform with computer vision, route optimization, and QR tracking—and won ₹16,000 at Anveshana 2025.**

---

When we started Kachra Seth, the problem was straightforward: Indian municipalities drowning in waste logistics. Overstuffed bins, no real-time tracking, routes planned by hand on a whiteboard. But the engineering problem was harder—how do you actually _operationalize_ a garbage system?

We built Kachra Seth as a three-layer platform: a citizen mobile app, a municipal operations dashboard, and an ML-powered classification engine.

## The AI Layer

At the core was waste classification. We trained a DenseNet201 CNN on 50,000+ images of Indian waste across seven categories—plastics, metals, paper, food, glass, electronics, and hazardous materials. The model handles real-world variance: garbage covered in dust, mixed items, poor lighting. We achieved ~88% accuracy on validation data.

Training DenseNet201 rather than building from scratch was a deliberate trade-off. ResNet would've been faster to converge; Inception would've given us better multi-scale features. But DenseNet's dense connections mean you can compress the model without destroying accuracy—critical when you're running inference on a municipal tablet with intermittent connectivity.

## The Routing Problem

Classification alone doesn't move garbage. We designed a two-phase routing system:

**Phase 1: Shortest Path.** Each morning, Dijkstra computes the optimal path between all bins in a zone. This handles the "visit all nodes once" problem efficiently.

**Phase 2: Vehicle Assignment.** A Genetic Algorithm distributes bins across vehicles—optimizing for load capacity, travel distance, and crew availability. We used crossover and mutation to explore the solution space, tracking fitness across 100 generations.

This hybrid approach beats pure Dijkstra (which ignores load constraints) and pure GA (which is slow without a good initial solution). In pilot testing, it cut fuel consumption by ~30% and reduced collection cycles by 40%.

## The QR & Geolocation Layer

Real-time tracking was non-negotiable. Each bin gets a QR code tied to a unique ID in MongoDB. When collection crews scan, the system logs GPS coordinates, timestamp, and fill level. Municipal officers see a live map—bins color-coded by urgency (green → yellow → red based on DenseNet predictions).

The mobile app worked offline. GPS points and QR scans queue locally, then sync when connectivity returns. We used MongoDB's upsert operations to handle late-arriving data without conflicts.

## What We Got Wrong (and Fixed)

Early on, we assumed constant bin capacity—each bin holds N liters. Reality: overflow bins, partially-full zones, seasonal variance. We switched to a machine-learning fill-level predictor (simple regression on historical data + day-of-week + weather). Not perfect, but good enough to prevent most overflows.

We also underestimated adoption friction. Municipal workers preferred the paper system at first. We embedded in-app tutorials, printed checklists, and trained crew leads directly. The second deployment had 80% adoption—game-changer.

## Key Learnings

- **Hybrid optimization beats purity.** Two simple algorithms (Dijkstra + GA) outperformed a single sophisticated one.
- **Offline-first is non-negotiable** in municipal India. Connectivity is sporadic; your system must work around it.
- **End-user research matters more than accuracy.** 88% model accuracy is useless if crews don't trust the classification. We added a manual-review flow for edge cases.
- **Hackathons reward shipping, not perfection.** We prioritized integration over polish—the judges saw a working end-to-end system, not just a notebook.

## Closing Thoughts

Kachra Seth taught me that AI in civic infrastructure isn't about the model. It's about closing loops: real-time data → decisions → accountability. DenseNet201 is table stakes. The system that matters is the one that gets crews to trust it, cities to fund it, and waste out of the streets.

Live demo: [kachra-seth.vercel.app](https://kachra-seth.vercel.app)
