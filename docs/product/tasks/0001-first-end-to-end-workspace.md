# Implementation plan: PRD 0001

This is the ordered implementation plan for the first end-to-end workspace. Each section should normally become one focused pull request.

## 0. Architecture bootstrap

- [x] pnpm + TypeScript monorepo direction
- [x] Next.js web boundary
- [x] NestJS API/MCP boundary
- [x] framework-independent domain boundary
- [x] local-first storage direction
- [x] PRD 0001
- [x] contribution / PR standards

## 1. Scaffold runnable monorepo

- [ ] create `apps/web` with Next.js
- [ ] create `apps/api` with NestJS
- [ ] create shared package skeletons
- [ ] add root dev/build/typecheck/test commands
- [ ] add formatting/linting
- [ ] make `pnpm dev` start web + API together
- [ ] add health endpoint
- [ ] document local URLs

**Done when:** a fresh clone can run the empty system with one command after `pnpm install`.

## 2. Domain + SQLite persistence

- [ ] define `Workspace`
- [ ] define structured search memory
- [ ] define `Opportunity`
- [ ] define minimal statuses
- [ ] define `Note`
- [ ] define repository/storage ports
- [ ] implement SQLite adapter
- [ ] migrations/bootstrap on first run
- [ ] unit tests for domain rules
- [ ] integration tests for persistence

**Done when:** domain state survives process restarts without any external database.

## 3. First usable web UI

- [ ] onboarding/search-context form
- [ ] memory view/edit screen
- [ ] opportunities list
- [ ] opportunity detail
- [ ] status changes
- [ ] add/view notes
- [ ] empty/error/loading states

**Done when:** the complete V0 state can be inspected and changed without touching the database.

## 4. MCP vertical slice

- [ ] transport-agnostic MCP tool definitions
- [ ] Streamable HTTP endpoint in the API
- [ ] `get_search_context`
- [ ] `update_search_context`
- [ ] `save_opportunity`
- [ ] `get_opportunity`
- [ ] `update_opportunity_status`
- [ ] `add_opportunity_note`
- [ ] contract tests for every tool
- [ ] local MCP Inspector/client instructions

**Done when:** an MCP client can read and mutate the same workspace shown by the web UI.

## 5. Local AI end-to-end

- [ ] document connection to at least one local MCP-capable AI client
- [ ] add reusable fixture workspace
- [ ] add AI behavior/eval scenarios
- [ ] test read -> save -> UI update -> UI write -> AI read
- [ ] add adversarial job-description fixture for prompt-injection behavior

**Done when:** the PRD end-to-end acceptance flow can be demonstrated locally without AWS.

## 6. Portability

- [ ] define versioned export schema
- [ ] export complete workspace
- [ ] import exported workspace
- [ ] round-trip tests
- [ ] document compatibility/versioning rules

**Done when:** a workspace can be moved without copying the SQLite database.

## After V0

Only after the local vertical slice works should we consider:

- Docker release image
- hosted PostgreSQL adapter
- remote authentication
- `job-search-cloud` deployment
- multiple workspaces
- resume/document tooling
