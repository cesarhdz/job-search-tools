---
title: Architecture
type: architecture
status: current
---

# Architecture

This document describes the current architecture of Job Search Tools. It is intentionally evergreen: update it when the system changes. Historical decisions and their rationale live in `docs/adr/`.

## Product boundary

Job Search Tools is the portable state and workflow layer around an AI-assisted job search.

The AI host should keep doing what it already does well:

- search
- research
- reasoning and matching
- writing
- interview preparation and coaching

This project owns what should persist or benefits from a structured interface:

- job-search memory
- opportunities
- triage and tracking
- notes and feedback
- portability
- focused UI

The core loop is:

```text
AI host <-> MCP <-> shared workspace <-> web UI
```

The AI and the web app are two interfaces over the same state and application behavior.

## Code organization

The primary organization is by product module, not frontend/backend layer.

```text
apps/
  web/                 # Next.js composition/runtime shell
  server/              # NestJS + MCP composition/runtime shell

modules/
  memory/              # profile, preferences, experience, skills/evidence
  opportunities/       # saved jobs, snapshots, triage state
  tracking/            # application state, notes, interactions
  portability/         # versioned import/export

docs/
  architecture.md
  testing.md
  prd/
  spec/
  adr/
```

Each module owns the behavior and contracts for its capability. A module may contain domain/application code and the adapters it needs, but framework-specific composition stays in the runtime apps.

We should avoid global `domain` or `contracts` packages becoming dumping grounds. Shared code should be extracted only when two real modules need the same abstraction.

## Product and design evolution

Design is intentionally incremental. We should document the decision that is needed for the next useful slice, not fully specify later phases before we have learned from the current one.

The documentation layers have different jobs:

- **PRD** — defines the problem, intended outcome, scope, product constraints, and product-level acceptance criteria.
- **Spec** — defines the behavior and design of a concrete slice that is ready to be implemented.
- **ADR** — preserves the rationale for a durable technical/architectural decision.
- **Architecture** — describes the current system after those decisions have been incorporated.

A typical larger change can evolve as:

```text
PRD
  -> merge
  -> learn / choose next slice
  -> spec
  -> merge
  -> implementation
  -> learn
  -> next spec
```

This is not a mandatory one-document-per-PR ceremony. A small, well-understood change may include its PRD, spec, and implementation in the same pull request when that remains the smallest coherent change.

The important constraint is that pull requests remain atomic and independently useful. A merged PR should not depend on a hypothetical future PR to make its contents coherent.

Specs are created just in time. We should prefer extending the system from observed use over writing speculative specs for later phases.

## Runtime boundaries

### Web

`apps/web` is a Next.js application responsible for interfaces that are awkward in chat:

- lightweight onboarding / memory editing
- opportunity triage
- tracking
- notes
- import/export

It should be thin: UI composition and transport/client concerns belong here; product rules belong in modules.

### Server

`apps/server` is a NestJS runtime responsible for:

- HTTP API
- MCP Streamable HTTP endpoint
- local storage composition
- process lifecycle / health

NestJS is a transport/composition choice, not the domain architecture.

### MCP

MCP tools are task-oriented adapters over module application behavior. They must not implement a second set of product rules.

The same underlying commands are available to the web application.

Exact tool contracts belong in the spec for the slice that introduces them rather than in the high-level product architecture.

## Local-first runtime

V0 must be easy to run locally, with no cloud dependency in the development loop.

The target feedback loop is:

```text
edit -> local run -> AI call -> inspect UI/state
```

The concrete local runtime and commands are specified when that slice is implemented.

## Storage

Persistence is behind module/storage ports.

V0 uses SQLite because it removes external infrastructure from local development and self-hosting.

A future hosted deployment may use PostgreSQL. Supporting arbitrary databases is not a goal.

```text
module application logic
        |
        v
repository/storage port
        |
   +----+------+
   |           |
 SQLite     PostgreSQL
 V0/local   future hosted
```

The database file is not the portability contract.

## Workspace model

V0 exposes one workspace in the UI, but persisted objects carry a `workspaceId` so the model does not prevent multiple job searches later.

A workspace contains contextual job-search state, including:

- target roles
- preferences and constraints
- experience
- skills and supporting evidence
- opportunities
- tracking state
- notes / interactions
- future document references

There is no separate "professional memory" and "search memory" product. They are parts of the same workspace context.

## Opportunity lifecycle

The first lifecycle should remain intentionally small and evolve from actual use rather than being copied from a full ATS.

Exact states and transitions belong in the relevant opportunity/tracking spec.

When an opportunity is saved, the workspace may keep a snapshot/normalized copy of the job description so the user's history does not depend on the original posting remaining online.

## Portability

Export/import is a versioned logical workspace format.

All persistence implementations must be able to map to and from that format. This lets the user move between local, hosted, or future compatible implementations without making SQLite/PostgreSQL itself the public contract.

## AI boundary

The project does not require an LLM backend.

An AI host receives task-relevant context through MCP and can update state through explicit tools.

We test AI integration primarily as behavior/tool use rather than exact generated wording. See `docs/testing.md`.

## Hosted deployment

`job-search-cloud` is intentionally outside this repository.

It may later provide:

- authentication
- managed storage
- encryption/key management
- deployment
- billing
- operational telemetry

It should run/consume this product rather than duplicate its domain behavior.

## Current non-goals

- own LLM inference
- crawler/search engine
- browser automation
- Gmail ingestion
- vector database as source of truth
- native resume generator
- native interview coach
- cloud auth/billing
- complex multi-workspace UI
