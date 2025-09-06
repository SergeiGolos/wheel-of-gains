### build

Purpose

- Implement planned tasks with fast feedback and traceability.

Inputs

- `.spec/{feature}/plan.md`
- Source code and existing tests

Outputs

- Code changes linked to task IDs
- `.spec/{feature}/progress.md` with status, notes, and discovered issues
- Updated `.ground/*` if new decisions or structures emerge

Procedure

1. Pick the next unblocked task; confirm inputs/changed files.
2. Write tests first when feasible (unit/integration/e2e stubs).
3. Implement minimal changes; keep commits atomic and traceable to task IDs.
4. Run build/lint/tests locally; fix failures immediately.
5. Update progress and decisions; adjust plan if blockers arise.

Acceptance criteria

- Green build/lint/tests for modified areas.
- Commits reference task IDs; no unexplained dead code or TODOs.

Hand-off

- Provides artifacts for test/QA and for merging/release.
