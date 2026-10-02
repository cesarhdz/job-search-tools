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

apps/web (Next.js)
  |
  +--> same public API/contracts
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
  memory/         profile, experience, skills/evidence, preferences
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

Used only for the interactive workspace: onboarding, memory inspection/editing, opportunity triage, tracking, notes, and exports.

### NestJS

Used for the API boundary and remote MCP server. Domain code should not depend on Nest decorators or modules.

### Zod

Canonical runtime schemas for boundaries: MCP inputs/outputs, HTTP DTOs, persisted portable formats, and validation.

### PostgreSQL

Default relational adapter for hosted/self-hosted server deployments. Product code depends on storage interfaces, not PostgreSQL directly, so a different local or encrypted-vault adapter can be introduced later.

## Data model direction

V1 starts with one workspace but every domain object belongs to a `workspaceId` so multiple searches can be supported later.

Initial aggregates:

- Workspace
- Memory
  - target roles and preferences
  - experience
  - skills and evidence
  - constraints
- Opportunity
  - source URL
  - immutable/snapshotted job content when saved
  - triage state
- Application
  - status
  - dates
  - notes
  - interactions / feedback
- Document reference
  - future resumes and supporting files

Do not split "professional memory" and "search memory" into separate products. They are contextual state inside a workspace.

## Write path

Every surface calls the same application commands.

Examples:

- `updateMemory`
- `saveOpportunity`
- `dismissOpportunity`
- `changeApplicationStatus`
- `addNote`
- `recordInteraction`

An append-only activity/event log may record mutations for audit, synchronization and undo, without requiring full event sourcing.

## Read path

MCP should expose task-oriented views instead of dumping the complete workspace:

- `get_search_context`
- `get_relevant_evidence`
- `get_opportunity`
- `get_pipeline_summary`
- `get_application_context`

This keeps AI context focused and makes the memory portable between AI hosts.

## Portability

The database is not the portability contract.

Export/import is a versioned logical workspace format containing structured state plus referenced files/snapshots. Hosted PostgreSQL, self-hosted PostgreSQL, or future storage adapters must all map to the same format.

## Explicit non-goals for V1

- own LLM inference
- crawler/search engine
- browser automation
- Gmail ingestion
- vector database as a source of truth
- native resume generator
- native interview coach
- complex multi-workspace UI
