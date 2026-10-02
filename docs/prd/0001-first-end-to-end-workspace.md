---
id: PRD-0001
title: First end-to-end workspace
type: prd
status: proposed
---

# PRD 0001: First end-to-end workspace

## Problem

AI assistants are already good at searching, reading job descriptions, reasoning about fit, writing, and interview preparation. They are much worse at maintaining a durable, inspectable job-search state across conversations and AI providers.

A user needs one structured workspace that both an AI host and a traditional UI can read and update.

## Goal

Prove the core product loop locally, without cloud infrastructure:

```text
AI -> memory/state -> web UI
web UI -> memory/state -> AI
```

A user should be able to start the project locally, connect an MCP-capable AI client, save an opportunity through the AI, see it in the web UI, update it in the UI, and have the AI read the updated state.

## Primary user flow

1. Start Job Search Tools locally.
2. Provide the minimum search context needed to begin.
3. Connect an MCP-capable AI client to the local server.
4. Ask the AI to read the search context.
5. Give the AI a job posting and ask it to save the opportunity.
6. Open the web UI and review the saved opportunity.
7. Change its status or add a note.
8. Ask the AI about the opportunity and receive the updated state.
9. Export the workspace.

The AI host is responsible for search, fit analysis, writing, and other reasoning. Job Search Tools is responsible for durable state and UI.

## V0 scope

### Workspace

V0 supports one workspace in the UI. Domain objects still carry a workspace identifier so multiple searches can be supported later.

### Minimal onboarding

Onboarding should be intentionally small. V0 only needs enough information to start a useful search:

- target role or roles
- location / remote preference
- optional must-haves or exclusions

Everything else should be progressively enriched through normal use, either from the web UI or through the AI.

The product should not require a user to fully model their career before they can begin.

### Memory

The workspace can progressively accumulate richer context such as:

- company/work preferences
- compensation preferences
- experience
- skills
- evidence / achievements
- explicit constraints

Memory is editable by the user and accessible to the AI through task-oriented MCP tools.

### Opportunities

An opportunity contains:

- title
- company
- source URL
- saved-at timestamp
- job-description snapshot or normalized text when available
- status
- notes

Initial statuses:

- `review`
- `saved`
- `applied`
- `closed`

The status model is intentionally small. More stages are added only after real use shows they are necessary.

### Tracking

V0 tracking is intentionally lightweight:

- status
- notes
- optional next action
- timestamps

Interview preparation, negotiation, and resume adaptation remain jobs for the AI host. The workspace only preserves the state/context they may need.

### Portability

The user can export the full logical workspace in a versioned format and import it again.

The database file is not the portability contract.

## MCP capabilities

The first MCP surface should remain small:

- `get_search_context`
- `update_search_context`
- `save_opportunity`
- `get_opportunity`
- `update_opportunity_status`
- `add_opportunity_note`

Tools should return structured results and stable identifiers.

The MCP layer must not contain product/domain rules that are unavailable to the web application. Both surfaces invoke the same application behavior.

## Web UI

V0 needs only:

- lightweight onboarding / memory editor
- opportunity list
- opportunity detail
- status update
- notes
- export/import

Visual polish is secondary to proving that the AI and UI operate on exactly the same state.

## Local-first developer experience

After cloning and installing dependencies, the target workflow is:

```bash
pnpm dev
```

That command should:

- start the web app
- start the API/MCP server
- create/migrate the local SQLite database when necessary
- print the web and MCP endpoints

No Docker, cloud account, PostgreSQL installation, or hosted service should be required for V0 development.

A contributor should be able to connect an MCP client and exercise the product within minutes of cloning the repository.

## Acceptance criteria

### Deterministic

- memory can be created, read, and updated
- an opportunity can be saved and retrieved
- status and notes persist
- UI and MCP observe the same state
- one workspace cannot accidentally resolve another workspace's records
- export followed by import preserves supported state

### AI interaction

We do not assert exact model wording. We evaluate behavior:

- the AI reads search context when needed
- "save this job" calls the save tool with valid structured arguments
- a read-only request does not cause an unnecessary write
- status changes use the correct opportunity identifier
- untrusted text inside a job description cannot itself trigger workspace mutations

### End-to-end

V0 is successful when:

1. `pnpm dev` starts the system.
2. Minimal search context is entered in the web UI.
3. An MCP-capable AI client reads it.
4. The AI saves a job opportunity.
5. The opportunity appears in the UI without manual database changes.
6. The user adds a note or changes status in the UI.
7. The AI subsequently reads the updated state.
8. The workspace can be exported.

## Implementation milestones

Keep this list at PR/milestone level. Detailed subtasks belong in the implementation PR that performs the work.

### 1. Runnable monorepo

Scaffold Next.js + NestJS and make `pnpm dev` start the empty local system.

**Done when:** a fresh clone runs web + server with one command after dependency installation.

### 2. Core modules + SQLite

Implement the first memory/opportunity/tracking module behavior and SQLite persistence.

**Done when:** V0 state survives process restarts without external infrastructure.

### 3. Usable web UI

Implement minimal onboarding/memory editing, opportunity review, status and notes.

**Done when:** all V0 state can be inspected and changed without touching the database.

### 4. MCP vertical slice

Expose the initial MCP tools over the same module/application behavior.

**Done when:** an MCP client reads and mutates the same workspace shown by the UI.

### 5. Local AI end-to-end

Connect at least one MCP-capable AI client and exercise the complete acceptance flow, including adversarial/untrusted job-description content.

**Done when:** the AI/UI round trip works locally without AWS.

### 6. Portability

Implement the versioned export/import format and round-trip tests.

**Done when:** a workspace can be moved without copying the SQLite database.

## Non-goals

- job crawler or search engine
- built-in LLM inference
- Gmail ingestion
- browser automation
- native resume generator
- native interview coach
- vector database as source of truth
- cloud authentication
- billing
- multiple-workspace UI
- mobile app
- community features

## Privacy direction

V0 is local-only by default. It should not send workspace content anywhere except to the AI host the user explicitly connects.

Hosted encryption/authentication is a later cloud concern and must not change the logical workspace format.

## Open questions for later

- exact hosted encryption/key model
- multi-workspace UX
- document/resume storage
- richer application stages
- synchronization between devices
- which parts of the public knowledge base should be exposed to AI hosts
