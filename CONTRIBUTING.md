# Contributing

Job Search Tools is intended to be easy to run, understand, and modify locally.

## Before contributing

For product changes, start with the relevant PRD under `docs/prd/`.

`ARCHITECTURE.md` describes the current system and should stay evergreen. When a change makes a durable architectural decision worth preserving, add an ADR under `docs/adr/` and update `ARCHITECTURE.md` to reflect the resulting system.

Small fixes do not need a new PRD or ADR.

## Pull requests

Keep pull requests focused and reviewable.

- one coherent change per PR
- avoid mixing large refactors with product features
- link the relevant PRD, issue, or ADR
- keep detailed implementation subtasks in the implementation PR rather than maintaining a second project plan
- include exact local test steps
- update contracts/docs when behavior changes
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
- do not add infrastructure that the current vertical slice does not require

## Review

All changes go through pull requests. The repository owner is the initial required reviewer while the project is bootstrapping.
