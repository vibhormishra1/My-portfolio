# SkillBridge — Building a Voice-First Internship Platform for Rural India

**How we designed a PWA for users who don't type, with Web Speech API and Redis caching.**

---

The problem with most job platforms isn't the jobs. It's the interface. In rural India, typing isn't the bottleneck—typing _in English_ is.

SkillBridge is a progressive web app (PWA) designed for voice-first interaction. A student from a village in Madhya Pradesh can call a number, speak in Hindi about the kinds of internships they want, and get matched with real opportunities—all without typing a single character.

## The Voice Layer

We use the Web Speech API (browser-native, no external services) to handle speech-to-text. Recognition runs client-side in supported browsers (Chrome, Edge); fallback to text input on older Safari or Firefox.

The flow:

1. Student taps "Speak"
2. Browser records audio and sends it to Google's Speech-to-Text API (free tier for small volumes)
3. Transcript comes back in ~1 second
4. We parse intent: "I want to learn web development and make money quickly" → {skill: "web-dev", priority: "salary", experience: "beginner"}
5. We query matching internships

The hard part: speech-to-text output is noisy. A student says "I want web developing" and the API returns "I one web developing" or "I want with developing." We built an intent-parsing layer that's robust to transcription errors.

Instead of exact string matching ("web development"), we tokenize and use fuzzy matching (Levenshtein distance). "Web developing" → "web-dev" with 90% confidence. Close enough.

## Multilingual Support: Hindi, Tamil, English

We support three languages because SkillBridge's core users span three language zones. The Web Speech API handles this natively—just change the `lang` parameter.

But here's where it gets tricky: internship titles are usually in English. A student asks in Hindi for "डिजिटल मार्केटिंग" (digital marketing); we need to match it to opportunities tagged as "digital-marketing" or "marketing-analytics."

We built a lightweight translation layer: instead of calling a full translation API (expensive, slow), we maintain a mapping table:

```json
{
  "हिंदी": "hindi",
  "डिजिटल मार्केटिंग": "digital-marketing",
  "वेब डेवलपमेंट": "web-development",
  ...
}
```

For terms not in the table, we fetch from Google's Translation API asynchronously (in the background) and cache the result for next time. First request is slow; subsequent ones hit the cache.

## Profiling Without Forms

Traditional platforms ask: "What's your experience level? What skills do you have? What's your salary expectation?" SkillBridge gets this through conversation, not forms.

The onboarding is six natural-language prompts:

1. "What are you interested in learning?"
2. "How much experience do you have?"
3. "What's more important—learning or earning?"
4. "Do you prefer freelance or full-time internships?"
5. "What's your target monthly stipend?"
6. "Which cities are you open to?"

We parse responses into a profile vector and store it in MongoDB. The matching algorithm (simple cosine similarity against opportunity vectors) runs real-time.

## Caching the Match Layer

Matching 500 students against 2,000+ internships in real-time is expensive. We use Redis to cache:

- Student profiles: `profile:{student_id}` → {skills, experience, salary, location}
- Opportunity vectors: `opportunity:{opp_id}` → {skills_required, level, salary, locations}
- Match scores: `matches:{student_id}` → [ranked list of opportunities]

When a student's profile changes, we invalidate their match cache and recompute asynchronously. When new internships are posted, we mark all existing match caches as stale. Periodic batch jobs refresh in the background.

Result: student queries return cached results in ~50ms. Stale data is acceptable (internships are posted daily, not hourly), and the latency matters more on mobile.

## The Product: Conversation Over Completion

Most onboarding flows are forms: fields you fill, validation errors you see, completion percentage that goes up. Ours is a conversation.

A student starts the app. The first voice prompt is casual: "Hey! What brings you here?"

Their response triggers follow-ups based on what they said. Someone interested in "learning" gets different follow-ups than someone prioritizing "earning money fast."

This feels human. It feels optional (conversations can end anytime). And it actually works better at gathering signal than forms—people over-explain in voice, revealing context a form can't capture.

## What Didn't Work

**1. Audio Quality Assumptions.** Early versions assumed decent phone mics and quiet environments. Real users: crowded shops, outdoor markets, background noise. We added noise filtering (preprocessing audio before sending to speech-to-text) and confidence thresholds (if the API's confidence is <70%, we ask to repeat).

**2. Latency Sensitivity.** 2-second delays between a question and the response felt broken. We pre-fetch the next question while audio is processing, and buffer responses. Most interactions now feel instant.

**3. Language Switching.** Some students code-switch (Hindi + English in one sentence). The API picks one language and misses the other. We added a hybrid mode: if the transcript contains >20% of a second language, we re-process it. Not perfect, but catches most cases.

## Key Learnings

- **Voice UI isn't just speech-to-text.** It's conversation design. Your prompts matter more than your API.
- **Caching is critical for PWAs.** Especially on 3G, every API call is ~500ms. Cache everything that's not user-specific.
- **Fuzzy matching beats exact matching.** Transcription errors are inevitable. Build robustness in.
- **Conversations scale better than forms** for diverse, non-English-primary users. They reveal intent more naturally.

## Closing Thoughts

SkillBridge is live with ~150 active students and growing. The internship match rate (students who apply to and get internships) is 22% in month 1, climbing to 35% by month 3 as profiles improve.

What matters isn't the voice part. It's that we designed for the actual user, not the ideal user. Real students are busy, they're not on PCs, and they think better out loud than typing into forms.

That's the win.

Live demo: [skill-bridge-ten-dusky.vercel.app](https://skill-bridge-ten-dusky.vercel.app)
