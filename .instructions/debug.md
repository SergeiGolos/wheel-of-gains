### debug

Purpose

- Diagnose and resolve defects quickly with reproducibility and traceability.

Inputs

- Failing test, bug report, or reproducible steps
- Logs/stack traces and environment details (OS, version, branch, commit)
- Related source files and specs (`.spec/{feature}/*`)

Outputs

- Minimal reproducible test (unit/integration/e2e) that fails before the fix
- Code change that fixes the root cause (not just symptoms)
- `.spec/{feature}/progress.md` updated with status, root cause, and notes
- `.ground/*` updated if new decisions/invariants emerge
- Optional: link/path to minimal repro artifact if outside tests

Procedure

1. Reproduce
   - Capture exact steps, inputs, and environment; pin commit/branch.
   - Write a failing test at the smallest scope feasible; tag with bug ID.
2. Isolate
   - Inspect logs/stack; add targeted, temporary tracing (remove before commit).
   - Use breakpoints/tracepoints; consider `git bisect` for regressions.
   - Note hypotheses/observations in `.notes/` for later summarization.
3. Fix
   - Implement the minimal fix addressing the root cause; avoid broad refactors.
   - Extend coverage for edge cases discovered during investigation.
4. Verify
   - Run build/lint/tests locally; ensure the previously failing test is green.
   - Smoke test the original repro path and adjacent risky paths.
5. Prevent regressions
   - Add assertions/guards; right-size logging with sampling/levels.
   - Document brittle assumptions and update interfaces/contracts if needed.
6. Traceability
   - Reference bug/task ID in commits and PR; link to the failing test.
   - Summarize root cause and mitigation in progress notes.

Acceptance criteria

- A failing test existed pre-fix and passes post-fix.
- Build, lint, and tests are green for modified areas.
- Root cause and mitigation documented succinctly.
- No leftover noisy logging or debug-only code.

Hand-off

- Ready for code review with linked test evidence, repro steps, and notes.
- If user-facing, propose a release-note entry and verify telemetry/alerts if applicable.
