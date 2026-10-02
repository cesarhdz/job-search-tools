---
id: SPEC-0001
title: Local workspace runtime
type: spec
status: proposed
prd: PRD-0001
---

# SPEC 0001: Local workspace runtime

## Goal

Make the repository executable locally with the smallest runtime needed to begin building the first end-to-end workspace.

A contributor should be able to clone the repository, install dependencies, start the project with one command, and verify that the web and server runtimes are available without configuring cloud infrastructure.

## Scope

This slice establishes only the local application foundation:

- pnpm workspace configuration
- strict TypeScript configuration
- Next.js web runtime in `apps/web`
- NestJS server runtime in `apps/server`
- local SQLite availability for later product modules
- root development scripts that start the required runtimes together
- minimal health/status surfaces for verifying the setup

The runtime apps remain composition shells. This slice does not introduce product behavior into them.

## Developer flow

The target flow is:

```bash
pnpm install
pnpm dev
```

After `pnpm dev` starts:

- the web app is reachable locally
- the server is reachable locally
- the server exposes a minimal health endpoint
- the local workspace has access to SQLite storage
- no external service or cloud account is required

Exact local ports may follow framework defaults unless implementation reveals a reason to standardize them.

## SQLite boundary

SQLite is introduced only as the default local persistence adapter.

This spec does not define the memory, opportunity, tracking, or portability schemas. Product modules will define their own persistence needs when those slices are implemented.

Creating an empty database, connection, or minimal storage bootstrap is sufficient for this slice.

## Verification

The slice is complete when a fresh checkout can demonstrate:

- `pnpm install` succeeds
- `pnpm dev` starts both web and server runtimes
- the web app responds successfully
- the server health endpoint responds successfully
- SQLite can be opened by the local runtime
- no cloud credentials are required

Automated checks should cover build/type correctness where practical. Product-level tests belong to later slices that introduce product behavior.

## Non-goals

- memory schema or onboarding UI
- opportunity model or tracking
- MCP tools or transport
- import/export format
- authentication
- hosted deployment
- production database configuration
- product UI beyond what is necessary to verify the web runtime

## Open questions

Resolve these during implementation only if they materially affect the slice:

- which lightweight SQLite library/adapter to use
- how the root development script coordinates web and server processes
- whether a dedicated storage smoke test is preferable to startup validation
