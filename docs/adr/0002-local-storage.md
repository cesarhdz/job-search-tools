---
id: ADR-0002
title: SQLite for local development, storage behind ports
type: adr
status: accepted
scope: V0
---

# ADR 0002: SQLite for local development, storage behind ports

## Context

The open-source project should be immediately usable by contributors and should not require a cloud account or locally managed database server.

A future hosted service will likely prefer PostgreSQL, but making PostgreSQL a local prerequisite adds setup cost before the product is validated.

## Decision

Use SQLite as the default V0/local persistence implementation.

Domain/application code depends on repository/storage interfaces rather than SQLite APIs.

Conceptually:

```text
domain/application
       |
       v
storage ports
   |       |
   v       v
SQLite   PostgreSQL
V0       future hosted adapter
```

Only SQLite is implemented initially. PostgreSQL is added when the hosted service requires it.

The logical export format, not the SQLite database file, is the portability contract.

## Consequences

### Positive

- no external database process for local development
- one-command startup is realistic
- simple self-hosting for a single user
- storage remains replaceable
- hosted infrastructure can choose a different topology later

### Trade-offs

- SQL dialect/migration differences must stay inside adapters
- we must not leak SQLite-specific behavior into domain code
- supporting multiple databases is not a V0 goal

## Deferred

The SQL library/ORM is an implementation choice for the first persistence PR. It must preserve the storage boundary defined here.
