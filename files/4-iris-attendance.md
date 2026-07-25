# IRIS — Designing an AI Attendance System with Facial Recognition and LLM Queries

**How we built a biometric system that 500+ students trust, and an LLM layer that lets faculty ask questions instead of running reports.**

---

Attendance at a college isn't just about "was the student in the room." It's compliance, analytics, pattern spotting. A student missing 5 classes out of 20 is one story; missing 5 _consecutive_ classes before an exam is another.

IRIS is a two-layer system: biometric attendance on the backend (DeepFace + JWT), and an LLM-powered query interface on top (IRIS-LLM). The first captures attendance; the second makes it useful.

## The Biometric Layer: DeepFace + QR Fallback

We use DeepFace (RetinaFace for detection, ArcFace for recognition) to match students' faces against enrollment photos. DeepFace is fast (~50ms per face), accurate enough for institutional ID (~99.5% at 0.6 threshold), and has no licensing friction.

But here's the problem: students weren't comfortable trusting only facial recognition. Bad lighting, glasses, different hairstyles. And faculty wanted an auditable record—"the system said she was here" isn't enough for attendance disputes.

So we built a two-factor approach:

1. **Primary**: Facial recognition for frictionless check-in.
2. **Fallback**: QR-code-based backup. Each student gets a phone-generated QR code that changes every 30 seconds (JWT with RS256 asymmetric signing, signed by the backend).

If facial recognition fails (low confidence, student not in frame clearly), the system prompts for QR fallback. Both methods log identical data: student ID, timestamp, biometric/token used.

## The Security Bet: 30-Second Token Rotation

We made an aggressive choice: QR tokens expire in 30 seconds. Why?

Prevents screenshot attacks. A student can't snap a photo of their QR code at the beginning of class and hand it around. By the time someone else scans it, it's dead.

Prevents replay attacks. If a token is intercepted mid-transmission, it's garbage within 30 seconds.

The trade-off: high refresh rate means more API calls. We cache the last 3 tokens server-side and validate against them, which catches clock-skew and late-arriving requests. Token generation is microseconds; it's not a bottleneck.

## IRIS-LLM: Natural Language Queries on Attendance Data

Raw attendance data is rows in a database. Useful intelligence is buried in patterns. We built IRIS-LLM as a query interface where faculty ask questions:

- "Which students in CSE-A have more than 4 absences?"
- "Show me attendance patterns for students who failed the midterm"
- "Who has 100% attendance this semester?"

Instead of SQL, faculty type questions in English. IRIS-LLM:

1. Converts the query to SQL (using Claude as the LLM)
2. Runs the query against PostgreSQL
3. Formats the result (table, chart, summary)
4. Returns it to the faculty

The LLM sees a schema description and examples of valid queries. We use few-shot prompting:

```
Given attendance data with columns: student_id, course_id, date, status (present/absent),
answer the following question in SQL:

Example: "Show students with >4 absences"
SELECT student_id, COUNT(*) as absences
FROM attendance
WHERE status='absent'
GROUP BY student_id
HAVING COUNT(*) > 4;

Now answer: "Which students in CSE-A have more than 4 absences?"
```

Claude generates SQL that works ~95% of the time on the first try. When it fails (rare), faculty see the error and can refine their question.

## What We Learned About Trust

The hardest part wasn't the technology. It was adoption.

Early pilots: faculty were skeptical. "What if the system makes a mistake?" Students were worried about privacy. "Are you storing my face?"

We addressed this with transparency:

- **Code access**: Faculty could inspect the DeepFace threshold, token logic, database queries.
- **Audit logs**: Every attendance decision was logged with confidence score, method (facial vs. QR), and timestamp.
- **Privacy guarantees**: Enrollment photos aren't cloud-backed; they live in a local encrypted file. Face embeddings aren't stored—only distances.
- **Override mechanism**: Faculty can manually correct any attendance entry. Changes are logged and attributed.

After the first semester, adoption hit 80%. Not because the system was perfect. Because students and faculty understood what it did and didn't do.

## The Scaling Question

We designed for 500 students across 15 courses. In testing:

- Enrollment photo processing: ~2 hours for 500 students (batch, offline).
- Face recognition per attendance event: ~100ms (single GPU).
- JWT token generation: negligible.
- Database queries (IRIS-LLM): sub-second for most queries.

The bottleneck in production isn't biometrics; it's human behavior. 200 students checking in during a 2-minute window creates traffic spikes. We added a queue: students who can't check in during the rush get bumped to the next 2-minute window. Doesn't affect the data, just spreads load.

## Key Learnings

- **Biometrics alone aren't enough.** Pair them with fallbacks. Build trust, not just accuracy.
- **Attendance data is only useful if it's queryable.** IRIS-LLM turned raw logs into actionable intelligence.
- **Transparency beats accuracy.** A 95% accurate system that's interpretable beats a 99% accurate black box.
- **Token rotation is simple and effective.** 30-second refresh costs you a few extra API calls and buys you serious security.
- **Institutional adoption requires education.** The first deployment failed because no one understood the system. The second succeeded because we invested in explanation.

## Closing Thoughts

IRIS isn't trying to replace human judgment. It's trying to eliminate clerical work and catch patterns humans miss. A teacher shouldn't spend time cross-referencing attendance sheets; they should focus on students at risk.

We shipped this across SIRT with 500+ active users. Next step: integrating with the institution's academic management system so attendance data flows automatically into eligibility checks, merit calculations, and early-warning systems for at-risk students.

GitHub: [github.com/vibhormishra1/IRIS-LLM](https://github.com/vibhormishra1/IRIS-LLM)
