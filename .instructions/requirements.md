### requirements

Purpose

- Translate a user ask/story plus grounding into a clear, testable spec.

Inputs

- Source ask (issue, note, or prompt)
- `.ground/*` artifacts
- Any relevant `.notes/*` from scribe

Outputs

- `.spec/{feature}/requirements.md` with: problem statement, scope, non-goals, functional and non-functional requirements, and acceptance criteria

Procedure

1. Restate the ask crisply; define in/out of scope.
2. Derive functional and non-functional requirements using `.ground` context.
3. Write atomic acceptance criteria (Given/When/Then or numbered checks).
4. Note dependencies, risks, and constraints.
5. Save to `.spec/{feature}/requirements.md`.

Acceptance criteria

- Requirements are unambiguous; each acceptance criterion is verifiable.
- File path matches the chosen `{feature}` slug; links resolve.

Hand-off

- Feeds directly into design and test planning.
