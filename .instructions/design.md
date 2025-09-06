### design

Purpose

- Propose how to meet the requirements with clear architecture and trade-offs.

Inputs

- `.spec/{feature}/requirements.md`
- `.ground/*`

Outputs

- `.spec/{feature}/design.md` including: approach, alternatives, data/flow diagrams, interfaces, risks, and metrics

Procedure

1. List constraints and success metrics from requirements.
2. Outline candidate approaches; capture pros/cons; choose one with rationale.
3. Define module boundaries, interfaces, and data contracts; add Mermaid diagrams if helpful.
4. Identify migration/compat implications and rollout strategy.
5. Update risks/assumptions and open questions.
6. Save to `.spec/{feature}/design.md`.

Acceptance criteria

- Design aligns with requirements and references `.ground` context.
- Interfaces and data shapes are specified; diagrams render.

Hand-off

- Enables planning to break work into implementable tasks.
