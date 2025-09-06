### plan

Purpose

- Break the design into bite-sized, independently verifiable tasks.

Inputs

- `.spec/{feature}/design.md`
- Relevant source files (referenced via paths)

Outputs

- `.spec/{feature}/plan.md` task list with IDs, owners (optional), effort, blockers, and acceptance for each task

Procedure

1. Identify milestones and sequence; group tasks by specialization (FE/BE/DB/DevOps/Sec).
2. For each task, define: inputs, changed files, steps, acceptance checks.
3. Mark blockers/dependencies explicitly.
4. Keep tasks small (≤ 2 hours) and independently testable.
5. Save to `.spec/{feature}/plan.md`.

Acceptance criteria

- Each task has clear acceptance; dependencies form a DAG (no cycles).
- Total plan is realistic and covers design scope.

Hand-off

- Drives build execution and tracking.
