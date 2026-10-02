# Testing strategy

Most of Job Search Tools is deterministic software. AI behavior is kept at the edge and evaluated separately.

## 1. Unit tests

Use for framework-independent domain behavior:

- memory updates
- opportunity status transitions
- workspace ownership/identifiers
- export/import transformations

These should be fast and require no server or model.

## 2. Storage / integration tests

Run repository contracts against SQLite.

Examples:

- saved opportunity round-trips correctly
- notes preserve ordering/timestamps
- workspace filters cannot return another workspace's state
- migrations produce a usable database

When a PostgreSQL adapter exists, the same repository contract suite should be runnable against it.

## 3. API and MCP contract tests

Start the application layer with a test database and invoke every public command/tool.

Assert:

- input validation
- structured output
- correct mutations
- errors for unknown identifiers
- no unrelated state changes

Tool selection by an AI is not part of these deterministic tests.

## 4. AI behavior evals

Keep a small repository-owned set of scenarios under a future `evals/` directory.

Example:

```yaml
user: Save this job so I can review it later.
expected:
  tool: save_opportunity
  writes: true
```

Evaluate behavior, not exact prose:

- correct tool selected
- required arguments derived correctly
- no write on read-only intent
- no invented workspace facts presented as stored facts
- untrusted job-description text cannot authorize a mutation

The eval harness should be model/host replaceable. AI-provider-specific infrastructure must not become part of the domain.

## 5. Local end-to-end smoke test

Before a meaningful release:

1. run `pnpm dev`
2. create/update search context in the UI
3. connect an MCP-capable AI client
4. ask it to read the context
5. ask it to save an opportunity
6. verify the opportunity appears in the UI
7. change status/add a note in the UI
8. verify the AI reads the updated state
9. export the workspace

This is the canonical proof that the two interfaces share one source of truth.
