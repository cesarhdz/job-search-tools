# Contributing

Job Search Tools is intended to be easy to run, understand, and modify locally.

## Change design

Use the smallest amount of design documentation that makes the change clear and reviewable.

- **PRD** (`docs/prd/`) — why/what: problem, outcome, scope, constraints, product acceptance criteria.
- **Spec** (`docs/spec/`) — how a concrete product slice should behave: contracts, flows, data, edge cases, acceptance tests.
- **ADR** (`docs/adr/`) — why a durable technical/architectural decision was made.
- **Architecture** (`docs/architecture.md`) — evergreen description of the current system.

Specs are written just in time. Do not fully specify later phases before the current slice has produced useful feedback.

A larger change may naturally move through separate PRs:

```text
PRD -> spec -> implementation
```

That separation is not mandatory. A small, well-understood change may include PRD + spec + implementation in one PR when the combined change is still coherent and easy to review.

Small fixes do not need a PRD or spec. Add an ADR only when the reasoning is likely to matter later.

## Work tracking

Keep project tracking deliberately small.

Each active PRD may contain a short `Progress` checklist with product-level milestones. This is the lightweight backlog for that product effort.

Rules:

- keep milestones outcome-oriented, not implementation-task-oriented
- detailed subtasks live only in the PR that implements them
- link a PR or spec from the milestone when it exists
- one milestone may be completed by multiple PRs
- do not create specs, issues, or placeholder files merely to represent future work
- avoid duplicating the same task list in PRDs, specs, issues, and PR descriptions

Example:

```markdown
## Progress

- [x] Define product direction — #1
- [ ] Run a usable workspace locally
- [ ] Save and track opportunities
- [ ] Use the same state from AI and UI
- [ ] Export and restore the workspace
```

If the project later outgrows this convention, introduce more project-management structure only when there is demonstrated need.

## Atomic and incremental pull requests

Every PR should be a coherent increment that can be merged on its own.

Prefer changes that are:

- **atomic** — one coherent purpose
- **additive** — extend the repository without requiring unrelated future work
- **incremental** — solve the next useful slice instead of designing the whole roadmap
- **independently mergeable** — the PR makes sense even if no planned future PR is ever opened

A documentation-only PR is valid when the document itself is a useful decision or proposal. For example, a proposed PRD can merge before its specs or implementation exist.

Avoid:

- speculative scaffolding for later phases
- implementation that depends on an unmerged future design
- large refactors mixed with product behavior
- maintaining duplicate task plans across documents

Detailed implementation subtasks belong in the implementation PR. High-level future phases should not be treated as committed design.

## Documentation metadata

Structured documentation uses YAML frontmatter so it can be indexed or rendered later without relying on filename/title parsing.

Use frontmatter for:

- PRDs
- specs
- ADRs
- architecture/testing guides
- other docs that become part of the structured documentation set

README and contributor-facing repository files do not need frontmatter.

Keep metadata small. Typical fields:

```yaml
---
id: SPEC-0001
title: Example
type: spec
status: proposed
prd: PRD-0001
---
```

Not every document needs every field.

When a historical spec/ADR is replaced, prefer marking it superseded and linking its replacement instead of rewriting the historical decision as if it had always been different.

## Pull requests

Keep pull requests focused and reviewable.

- one coherent change per PR
- link the relevant PRD, spec, issue, or ADR when one exists
- include exact local test steps for implementation changes
- update current architecture/docs when behavior changes
- never commit secrets or real user/job-search data

Changes to MCP tools should describe:

- tool added/changed
- input contract
- output contract
- whether the change is breaking

Changes to persisted/exported data should describe:

- migration impact
- backward compatibility
- export-format impact

UI changes should include screenshots when they materially change the interface.

## Commit convention

Use simple Conventional Commit prefixes:

- `feat:`
- `fix:`
- `docs:`
- `refactor:`
- `test:`
- `chore:`

## Architecture rules

- organize product behavior around modules/capabilities
- `apps/web` and `apps/server` are composition/runtime shells, not separate product architectures
- framework-specific code must not own domain rules
- UI and MCP invoke the same module/application behavior
- SQLite is the default local adapter, not the domain model
- AI inference is not a required backend dependency
- user workspace portability must not depend on copying a database file
- do not add infrastructure that the current slice does not require

## Review

All changes go through pull requests. The repository owner is the initial required reviewer while the project is bootstrapping.
