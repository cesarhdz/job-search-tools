# Job Search Tools

Open-source tools for running a job search with the AI assistant you already use.

This project provides the durable layer around AI: structured memory, opportunities, triage, tracking, notes, portability, and focused interfaces. Search, reasoning, writing, matching, and coaching should stay with the user's AI host whenever it already does them well.

## Repository

This is a pnpm + TypeScript monorepo organized primarily by product module.

```text
apps/
  web/                 # Next.js runtime/UI shell
  server/              # NestJS API + MCP runtime shell

modules/
  memory/              # search context, experience, skills/evidence
  opportunities/       # saved jobs, snapshots, triage
  tracking/            # status, notes, interactions
  portability/         # import/export

docs/
  architecture.md
  testing.md
  prd/
  adr/

CONTRIBUTING.md
```

The runtime apps should stay thin. Product behavior and contracts belong to the module that owns the capability.

## First milestone

The first milestone is deliberately local-first:

```text
AI -> memory/state -> web UI
web UI -> memory/state -> AI
```

After dependencies are installed, the target developer experience is a single `pnpm dev` command that starts the web app, server/MCP endpoint, and local SQLite workspace.

See:

- [PRD 0001: First end-to-end workspace](docs/prd/0001-first-end-to-end-workspace.md)
- [Architecture](docs/architecture.md)
- [Testing](docs/testing.md)
- [Contributing](CONTRIBUTING.md)

## Principles

- AI-host independent.
- Memory and state are portable.
- Build software only where conversation is a poor interface.
- Organize product behavior by module rather than frontend/backend layer.
- Keep framework/runtime code out of module business rules.
- Local development requires no cloud infrastructure.
- Start with one workspace; do not prevent multiple workspaces later.

## Status

Architecture and product bootstrap. No production release yet.
