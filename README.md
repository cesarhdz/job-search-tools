# Job Search Tools

Open-source tools for running a job search with the AI assistant you already use.

This project provides the durable layer around AI: structured memory, opportunities, triage, tracking, notes, portability, and focused interfaces. Search, reasoning, writing, matching, and coaching should stay with the user's AI host whenever it already does them well.

## Repository

This is a pnpm + TypeScript monorepo.

```text
apps/
  web/            # Next.js workspace UI
  api/            # NestJS API + MCP server

packages/
  domain/         # pure domain model
  contracts/      # shared Zod schemas and tool contracts
  memory/         # job-search memory
  workspace/      # opportunities, tracking, notes, feedback
  mcp/            # AI-host integration
  portability/    # import/export
  storage/        # persistence interfaces/adapters
  resume/         # future, only if native tooling becomes useful

docs/
  product/
  architecture/
  adr/
```

## First milestone

The first milestone is deliberately local-first:

```text
AI -> memory/state -> web UI
web UI -> memory/state -> AI
```

After dependencies are installed, the target developer experience is a single `pnpm dev` command that starts the web app, API/MCP endpoint, and local SQLite workspace.

See:

- [PRD 0001: First end-to-end workspace](docs/product/prds/0001-first-end-to-end-workspace.md)
- [Implementation plan](docs/product/tasks/0001-first-end-to-end-workspace.md)
- [Architecture overview](docs/architecture/overview.md)
- [Testing strategy](docs/architecture/testing.md)
- [Contributing](CONTRIBUTING.md)

## Principles

- AI-host independent.
- Memory and state are portable.
- Build software only where conversation is a poor interface.
- Keep the domain model separate from storage and framework code.
- Local development requires no cloud infrastructure.
- The hosted platform is not required to use the open-source tools.
- Start with one workspace; do not prevent multiple workspaces later.

## Status

Architecture and product bootstrap. No production release yet.
