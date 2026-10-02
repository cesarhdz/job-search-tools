# ADR 0003: Local-first development and transport-agnostic MCP tools

Status: Accepted for V0

## Context

The primary product integration is an AI host using MCP. Requiring a deployed server for every development cycle would slow iteration and make open-source contribution harder.

## Decision

The complete V0 product must run locally with one root command after dependencies are installed:

```bash
pnpm dev
```

This starts:

- Next.js web UI
- NestJS API
- MCP HTTP endpoint
- local SQLite persistence

MCP tool definitions live outside transport/framework code. The NestJS application exposes them over Streamable HTTP. Additional transports such as stdio may be added when a client requires them without changing tool/domain behavior.

Local development must support:

1. deterministic MCP contract tests
2. manual tool testing with an MCP inspector/client
3. end-to-end testing with at least one MCP-capable AI client

Cloud deployment is not required to build or test the product.

## Rationale

The fastest useful feedback loop is:

```text
edit code -> pnpm dev -> AI call -> UI/state inspection
```

The local environment should mirror product behavior while removing authentication, billing, network deployment, and managed storage from the loop.

## Consequences

- local mode uses a single development workspace by default
- hosted authentication is an adapter/boundary added later
- AI behavior can be tested before AWS exists
- remote deployment must reuse the same application/domain code
