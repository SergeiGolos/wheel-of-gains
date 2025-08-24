---


---

### ground
Purpose
- Scan the repository and generate concise project grounding to accelerate later tasks.

Inputs
- Repository files, commit history (optional), existing `.ground/*`

Outputs
- `.ground/index.md` high-level overview and module list
- `.ground/code-map.md` key files, entry points, and cross-links
- `.ground/decisions.md` notable choices/assumptions with dates
- `.ground/glossary.md` domain terms and abbreviations

Procedure
1. Enumerate top folders and common config files; identify tech stack.
2. Map entry points (e.g., main app, build scripts, CI, infra) and test roots.
3. Summarize modules and responsibilities; link to important files.
4. Record implicit decisions and constraints discovered while scanning.
5. Extract glossary terms from code/docs; define briefly.
6. Save/refresh artifacts listed in Outputs.

Acceptance criteria
- All Output files exist, are under 300 lines each, and link to real paths.
- No TODO placeholders; dated decisions present where applicable.

Hand-off
- Provides shared context for requirements, design, and planning.
