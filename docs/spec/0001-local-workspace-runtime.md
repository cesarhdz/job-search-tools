---
id: SPEC-0001
title: Local workspace runtime
type: spec
status: implemented
prd: PRD-0001
---

# SPEC 0001: Local workspace runtime

## Goal

Deliver the first visible, runnable increment of Job Search Tools.

A contributor should be able to clone the repository, install dependencies, start the product with one command, and see a real initial workspace screen backed by a healthy local server and SQLite storage.

## Deliverable

After:

```bash
pnpm install
pnpm dev
```

the user sees an initial Job Search Tools workspace page in the browser.

The page is intentionally small, but it should look like the beginning of the product rather than a framework placeholder. It should:

- identify the product as Job Search Tools
- identify the current workspace as local
- show that the workspace is ready
- provide a clear placeholder/entry point for the next slice: search context / memory

The server exposes a minimal health/status endpoint used to verify that the local runtime and SQLite storage are available.

No editable product data is required yet.

## Scope

This slice establishes:

- pnpm workspace configuration
- strict TypeScript configuration
- Next.js web runtime in `apps/web`
- NestJS server runtime in `apps/server`
- local SQLite storage bootstrap
- root development scripts that start the required runtimes together
- an initial product workspace screen
- a minimal server health/status endpoint
- automated build/type checks where practical

The runtime apps remain composition shells. Product rules and future workspace behavior belong in modules.

## Runtime behavior

The target developer flow is:

```bash
pnpm install
pnpm dev
```

After `pnpm dev` starts:

- the web app is reachable locally
- the initial workspace screen renders successfully
- the server is reachable locally
- the server health/status endpoint confirms the runtime is healthy
- SQLite can be opened by the local runtime
- no external service, account, or cloud credential is required

Exact local ports may follow framework defaults unless implementation reveals a reason to standardize them.

## SQLite boundary

SQLite is introduced only as the default local persistence adapter.

This spec does not define memory, opportunity, tracking, or portability schemas. Product modules will define their persistence needs when those slices are implemented.

Creating the local database and validating that it can be opened is sufficient for this slice.

## Documentation impact

Every implementation of this spec must review the documentation affected by the resulting system behavior.

For this slice:

- **PRD-0001** — remains the product source; mark the corresponding milestone complete only when the deliverable satisfies it.
- **Architecture** — update the local runtime section to describe the implemented commands/runtime rather than a future target.
- **ADR** — no new ADR is currently required because Next.js, NestJS, pnpm, TypeScript, and SQLite are already established architectural choices. Add an ADR if implementation introduces a new durable architectural decision whose rationale should be preserved.
- **Testing** — update `docs/testing.md` if the implementation establishes new concrete test commands or conventions that should apply to later slices.
- **README** — update local setup/run instructions so a new contributor can reach the deliverable.

Documentation changes belong in the implementation PR when they describe implemented behavior.

## Verification

The slice is complete when a fresh checkout can demonstrate:

- `pnpm install` succeeds
- `pnpm dev` starts both web and server runtimes
- the initial workspace screen is visible and is not a stock framework page
- the server health/status endpoint responds successfully
- SQLite is available to the local runtime
- no cloud credentials are required
- documented local setup matches the actual commands

## Non-goals

- editable memory or onboarding
- opportunity model or tracking
- MCP tools or transport
- import/export format
- authentication
- hosted deployment
- production database configuration
- product workflows beyond the initial workspace surface

## Open questions

Resolve these during implementation only if they materially affect the slice:

- which lightweight SQLite library/adapter to use
- how the root development script coordinates web and server processes
- whether the web page reads runtime status from the server or keeps health verification separate
