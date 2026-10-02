# ADR 0001: Stack and repository boundaries

Status: Accepted for bootstrap

## Decision

Use a pnpm + TypeScript monorepo for the public product.

- Next.js for the workspace web runtime.
- NestJS for the server/API/MCP runtime.
- Organize product behavior primarily by module/capability, not frontend/backend layer.
- Keep `apps/web` and `apps/server` as thin composition roots.
- Let each module own its domain/application behavior and contracts.
- Keep concrete persistence behind storage ports.
- Use SQLite as the first local adapter; PostgreSQL is added when hosted deployment requires it.
- Do not add Turborepo until repository scale justifies it.
- Keep the public website/knowledge base in a separate Astro repository.
- Keep managed hosting/control-plane code in the private `job-search-cloud` repository.

## Rationale

Memory, opportunities, tracking, MCP and portability evolve as product capabilities and should be understandable independently of the runtime surface that invokes them.

A frontend/backend-first layout tends to split one capability across unrelated trees and encourages duplicate rules. The web app and MCP server should instead compose the same module behavior.

The local open-source product must also be easy to run without infrastructure. The website has a different editorial/contribution lifecycle, while cloud operations have a different security and licensing boundary.

## Consequences

The initial shape is:

```text
apps/
  web/
  server/

modules/
  memory/
  opportunities/
  tracking/
  portability/
```

Module internals may contain domain, application, contracts, and adapters as needed. We should not introduce a global `domain` or `contracts` package until there is a real cross-module abstraction.

The cloud repository must consume/run this product rather than duplicate its behavior.

Storage, auth, and deployment remain replaceable boundaries rather than assumptions embedded in product modules.
