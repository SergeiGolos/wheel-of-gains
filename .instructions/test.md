### test/QA
Purpose
- Validate behavior against requirements and prevent regressions.

Inputs
- `.spec/{feature}/requirements.md`
- `.spec/{feature}/design.md`
- Application under test

Outputs
- Automated tests (unit/integration/e2e)
- Optional: Playwright specs for acceptance and visual regression
- Test reports/artifacts (traces, screenshots) as configured by the test runner

Procedure
1. Derive tests directly from acceptance criteria; map 1:1 where possible.
2. Implement unit/integration tests; add Playwright for end-to-end and visual diffs when UI applies.
3. Run tests in CI-like conditions; capture artifacts.
4. File defects with minimal repros; link back to task IDs.

Acceptance criteria
- All acceptance criteria have corresponding automated checks.
- Visual checks (if UI) are stable or baselines are updated with review.

Hand-off
- Signals readiness for review/release; feeds back defects to build/plan.
