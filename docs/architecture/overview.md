# Architecture overview

## Goal

Job Search Tools is the portable product layer around an AI-assisted job search.

The AI host should continue to do the work it is already good at: searching, reasoning, matching, writing, and coaching. This project owns the durable state and the interfaces where chat is a poor fit.

## Runtime shape

```text
AI host
  |
  | MCP
  v
apps/api (NestJS)
  |
  +--> packages/domain
  +--> packages/contracts
  +--> packages/memory
  +--> packages/workspace
  +--> packages/portability
  +--> packages/storage
  |
  v
storage adapter
  |
  +--> SQLite (V0/local)
  +--> PostgreSQL (future hosted)

apps/web (Next.js)
  |
  +--> same application/domain behavior
  +--> triage, tracking, notes, memory editing
```

The web app and AI host are two interfaces over the same commands and state.

## Monorepo

```text
apps/
  web/            Next.js UI
  api/            NestJS API + MCP endpoint

packages/
  domain/         framework-free entities, value objects, commands
  contracts/      Zod schemas shared across API, MCP, UI, import/export
  memory/         structured job-search context
  workspace/      opportunities, applications, notes, interactions
  mcp/            MCP tools/resources and mapping to application commands
  portability/    versioned import/export format
  storage/        storage ports and adapters
  resume/         future; only if native tooling becomes justified
```

## Technology choices

### pnpm + TypeScript

One workspace and one dependency graph for all public tools. TypeScript is strict by default.

### Next.js

Used for the interactive workspace: onboarding, memory inspection/editing, opportunity triage, tracking, notes, and exports.

### NestJS

Used for the API boundary and HTTP MCP transport. Domain code must not depend on Nest decorators or modules.

### Zod

Canonical runtime schemas for boundaries: MCP inputs/outputs, HTTP DTOs, persisted portable formats, and validation.

### SQLite first

SQLite is the default V0/local storage adapter so the full product can run with `pnpm dev` and no external infrastructure.

Product code depends on storage interfaces rather than SQLite directly. PostgreSQL is a future hosted adapter, not a local-development requirement.

## Local development

The target loop is:

```text
clone
  -> pnpm install
  -> pnpm dev
  -> connect MCP client
  -> exercise AI <-> state <-> UI
```

No AWS, Docker, hosted database, or remote authentication is required for the first end-to-end slice.

## Data model direction

V0 starts with one workspace but every domain object belongs to a `workspaceId` so multiple searches can be supported later.

Initial concepts:

- Workspace
- Memory
  - target roles and preferences
  - experience
  - skills and evidence
  - constraints
- Opportunity
  - source URL
  - snapshotted job content when saved
  - triage/tracking state
  - notes
- Application/interaction details
  - introduced only as real tracking needs require them
- Document reference
  - future resumes and supporting files

Do not split "professional memory" and "search memory" into separate products. They are contextual state inside a workspace.

## Write path

Every surface calls the same application commands.

Examples:

- `updateMemory`
- `saveOpportunity`
- `updateOpportunityStatus`
- `addNote`

An append-only activity/event log may later record mutations for audit, synchronization, and undo without requiring full event sourcing.

## Read path

MCP should expose task-oriented views instead of dumping the complete workspace:

- `get_search_context`
- `get_opportunity`
- later, focused evidence/pipeline/application views as required

This keeps AI context focused and makes memory useful across AI hosts.

## Portability

The database is not the portability contract.

Export/import is a versioned logical workspace format containing structured state plus referenced files/snapshots. SQLite, hosted PostgreSQL, or future adapters map to the same logical format.

## Explicit non-goals for V0

- own LLM inference
- crawler/search engine
- browser automation
- Gmail ingestion
- vector database as a source of truth
- native resume generator
- native interview coach
- cloud auth/billing
- complex multi-workspace UI
