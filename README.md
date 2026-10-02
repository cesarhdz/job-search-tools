# Job Search Tools

Open-source tools for running a job search with the AI assistant you already use.

This project provides the durable layer around AI: structured memory, opportunities, triage, tracking, notes, portability, and focused interfaces. Search, reasoning, writing, matching, and coaching should stay with the user's AI host whenever it already does them well.

## Repository

This is a pnpm + TypeScript monorepo.

Planned applications and packages:

```text
apps/
  web/            # Next.js workspace UI
  api/            # NestJS API + MCP server

packages/
  domain/         # pure domain model
  contracts/      # shared Zod schemas and tool contracts
  memory/         # job-search memory
  workspace/      # opportunities, applications, notes, feedback
  mcp/            # AI-host integration
  portability/    # import/export
  storage/        # persistence interfaces/adapters
  resume/         # future, only if native tooling becomes useful

docs/
  architecture/
  product/
  adr/
```

## V1

- One job-search workspace.
- Onboarding into structured memory.
- MCP read/write tools for that memory.
- Opportunities with job snapshots.
- Triage: review, save, dismiss, applied.
- Basic tracking, notes, and feedback.
- Export/import.

## Principles

- AI-host independent.
- Memory and state are portable.
- Build software only where conversation is a poor interface.
- Keep the domain model separate from storage and framework code.
- The hosted platform is not required to use the open-source tools.
- Start with one workspace; do not prevent multiple workspaces later.

## Status

Architecture bootstrap. No production release yet.
