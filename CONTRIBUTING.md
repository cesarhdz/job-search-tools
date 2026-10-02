# Contributing

Job Search Tools is intended to be easy to run, understand, and modify locally.

## Before contributing

For product changes, start with the relevant PRD under `docs/product/prds/`.

For architecture decisions that change a durable boundary, add or update an ADR under `docs/adr/`.

Small fixes do not need a new PRD or ADR.

## Pull requests

Keep pull requests focused and reviewable.

- one coherent change per PR
- avoid mixing large refactors with product features
- link the relevant PRD, task, issue, or ADR
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

- domain code must not depend on Next.js, NestJS, or a concrete database
- both UI and MCP call the same application/domain behavior
- SQLite is the default local adapter, not the domain model
- AI inference is not a required backend dependency
- user workspace portability must not depend on copying a database file
- do not add infrastructure that the current vertical slice does not require

## Review

All changes go through pull requests. The repository owner is the initial required reviewer while the project is bootstrapping.
