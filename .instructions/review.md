### review

Purpose

- Ensure changes are correct, secure, maintainable, and aligned with product goals—fast and respectful.

Inputs

- Pull request link/branch and description with scope and task/bug IDs
- Diff context (files changed) and related specs/design docs (`.spec/{feature}/*`)
- CI status, test results, and benchmark snapshots if relevant
- Repro steps or demo link for UX-facing changes

Outputs

- Clear decision: Approve / Request changes / Comment
- Actionable comments with rationale and, when helpful, suggested diffs
- Follow-up tasks/issues for non-blocking items with owners
- Documentation updates noted or submitted (README, ADRs, CHANGELOG)

Procedure

1. Readiness check (gate)
   - PR has a crisp title/description, screenshots/GIFs for UX.
   - Scope is right-sized; commits reference task/bug IDs.
   - CI is green; includes tests/docs and a small "what/why".
2. High-level review
   - Architecture fit: correct layering, boundaries, and ownership.
   - Product fit: does it solve the stated problem; flags/config considered.
3. Correctness and risk
   - Edge cases: null/empty, large inputs, timeouts, concurrency, i18n/timezones.
   - Error handling: messages, retries, idempotency; no swallowed exceptions.
4. Tests and coverage
   - Failing test reproduced then fixed; new tests for regression and edges.
   - Tests are deterministic (seeded), isolated, and fast.
5. Interfaces and compatibility
   - APIs/DB schemas versioned/backward compatible; migrations safe/reversible.
   - Public contracts documented; no breaking changes without plan.
6. Security and privacy
   - Input validation, output encoding; secret handling; least privilege.
   - PII/data retention compliant; dependencies vetted (licenses/SBoM if needed).
7. Performance and reliability
   - Complexity and allocations appropriate; hot paths considered.
   - Timeouts, backoff, circuit breakers where needed; observability added.
8. Maintainability and clarity
   - Naming, cohesion, duplication, dead code; comments explain why, not what.
   - Folder/module conventions followed; small refactors acceptable with rationale.
9. UX/accessibility (if applicable)
   - Keyboard nav, focus order, color contrast, localization.
10. Dependencies and ops

- New deps justified/pinned; build size/startup/regression impact.
- Config/flags have defaults, ownership, and cleanup plan.

Acceptance criteria

- No P0/P1 issues outstanding; required approvals obtained.
- CI green; tests and docs updated where behavior changed.
- CHANGELOG updated for user-facing changes.

Hand-off

- Approve with brief summary, or request changes with a concise checklist.
- Link any non-blocking follow-ups; suggest staged rollout/flags for high risk.
