### Scope and conventions
- Folder conventions
	- `.ground/` short-term project knowledge (maps, glossaries, decisions)
	- `.spec/{feature}/` requirements, design, plan, and progress for a feature
	- `.notes/` scribe research and summaries
	- `.instructions/folders.md` for detailed folder structure
- File conventions
	- Prefer Markdown for human-facing docs; use simple frontmatter when helpful.
	- Use Mermaid for lightweight diagrams in design docs.

### Task contract template (reusable)
- Purpose: what this task achieves at a high level
- Inputs: files/context required
- Outputs: files created/updated with exact paths
- Procedure: 4–8 concrete steps, deterministic
- Acceptance criteria: verifiable checks and gates
- Hand-off: what the next task needs from this one

### Issue template integration (Markdown .md templates)

Use classic Markdown issue templates under `.github/ISSUE_TEMPLATE/*.md` with YAML frontmatter and an HTML footer comment. Automation should parse issues as follows:

- Agent selection (in priority order)
	1) Labels: if a label `agent:<role>` exists (from frontmatter `labels:`), use `<role>` as the agent.
	2) Footer comment: parse `<!-- agent=<key>; instruction_file=<path> -->` from the issue body.
	3) Title prefix: if the title starts with `[<key>]`, use `<key>` as the agent.
	4) Name hint: if frontmatter `name:` is like `Agent – <Key>`, normalize `<Key>` to `<key>`.

- Instruction mapping
	- If the footer provides `instruction_file`, load that path.
	- Else, resolve `.instructions/<agent>.md` using the detected agent key.

- .ground context import
	- Expected body sections:
		- A line starting with `Ground refs:` listing categories separated by `|` or `,`.
			- Allowed tokens: `maps`, `glossaries`, `decisions`, `notes` (case-insensitive). Ignore others.
			- Example: `Ground refs: maps | decisions`.
		- A list under `Ground links:` with bullet items pointing to files under `.ground/`.
			- Example bullets: `- .ground/maps/architecture.md`
	- Import all matching `.ground/**` files found in these sections.

- YAML frontmatter keys respected
	- `title`: default prefix like `[design]:` is recommended; do not overwrite user edits.
	- `labels`: apply labels verbatim; ensure `agent:<role>` and `area:automation` exist in the repo for best results.
	- `assignees`, `about`, `name`: not used for logic except the `name` hint above.

- Footer comment format (required for unambiguous mapping)
	- `<!-- agent=<key>; instruction_file=.instructions/<key>.md -->`
	- Regex example: `<!--\s*agent=(?<agent>[a-z0-9_-]+);\s*instruction_file=(?<path>[^>]+)\s*-->`

- Edge cases and fallbacks
	- If multiple agent signals conflict, resolve by priority order above.
	- If no agent can be determined, look for a title prefix `[something]`; otherwise, prompt for agent or default to `requirements`.
	- If `.instructions/<agent>.md` is missing, surface an actionable error with the agent key.

Notes
- Templates live in `.github/ISSUE_TEMPLATE/` and are visible on GitHub’s “New issue” page.
- Maintain the HTML footer comment in each template to keep automation robust to label/title changes.

