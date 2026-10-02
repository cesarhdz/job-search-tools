# ADR 0001: Stack and repository boundaries

Status: Accepted for bootstrap

## Decision

Use a pnpm + TypeScript monorepo for the public product.

- Next.js for the workspace web application.
- NestJS for API and MCP transport.
- Zod for shared runtime contracts.
- PostgreSQL as the first server-side storage adapter.
- Keep domain packages framework-independent.
- Do not add Turborepo until repository scale justifies it.
- Keep the public website/knowledge base in a separate Astro repository.
- Keep managed hosting/control-plane code in the private `job-search-cloud` repository.

## Rationale

Memory, tracking, triage, MCP and portability evolve around one shared domain model and should version together. The website has a different editorial/contribution lifecycle, while cloud operations have a different security and licensing boundary.

## Consequences

Public packages can later be published and consumed by the hosted service. The cloud repository must not duplicate domain rules that belong here.
