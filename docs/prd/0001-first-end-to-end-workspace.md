---
id: PRD-0001
title: First end-to-end workspace
type: prd
status: proposed
---

# PRD 0001: First end-to-end workspace

## Problem

AI assistants are already good at searching, reading job descriptions, reasoning about fit, writing, and interview preparation. They are much worse at maintaining durable, inspectable job-search state across conversations and AI providers.

A user needs one structured workspace that both an AI host and a traditional UI can read and update.

## Goal

Prove the core product loop locally, without requiring cloud infrastructure:

```text
AI -> durable workspace -> web UI
web UI -> durable workspace -> AI
```

A user should be able to start with a small amount of search context, work with an MCP-capable AI client, save an opportunity through the AI, see it in the web UI, update it there, and have the AI read the updated state.

## Product principles

- The AI host does search, reasoning, matching, writing, and coaching when it already does those jobs well.
- Job Search Tools owns durable state, portability, and interfaces where chat is a poor fit.
- Starting should require very little setup.
- Memory should become richer progressively through normal use rather than through a large upfront profile.
- The first version is local-first and must not require the hosted/cloud product.
- The workspace is portable and not defined by its database implementation.

## Primary user flow

1. Start Job Search Tools locally.
2. Provide the minimum search context needed to begin.
3. Connect an MCP-capable AI client.
4. Ask the AI to use the stored search context.
5. Ask the AI to save a job opportunity.
6. Review that opportunity in the web UI.
7. Update its tracking state or add context in the UI.
8. Ask the AI about it again and receive the updated state.
9. Export the workspace.

## V0 scope

### Minimal onboarding

V0 should ask only for enough information to make the first AI interaction useful:

- target role or roles
- location / remote preference
- optional must-haves or exclusions

Everything else can be added progressively from normal AI/UI use.

The product should not require a user to fully model their career before beginning.

### Progressive memory

The workspace can accumulate richer context over time, including:

- company/work preferences
- compensation preferences
- experience
- skills
- evidence / achievements
- explicit constraints

The exact schema and editing behavior are design concerns for the memory spec.

### Opportunities and tracking

A user can preserve job opportunities they want to review or track and maintain lightweight state/context around them.

The exact fields, statuses, transitions, snapshots, and commands belong in opportunity/tracking specs.

### AI access

An MCP-capable AI client can read relevant workspace context and perform explicit workspace actions.

The exact MCP tools and contracts belong in the spec for each product slice.

### Web UI

The web UI provides focused interfaces for things that are cumbersome in conversation, initially:

- lightweight onboarding / memory editing
- opportunity review
- lightweight tracking and notes
- portability

Exact screens and interaction design belong in specs.

### Portability

The user can export the logical workspace in a versioned format and import it again.

The database file is not the portability contract.

## Product-level acceptance criteria

V0 is successful when the following can be demonstrated locally:

1. A user can begin with minimal search context.
2. An MCP-capable AI client can read that context.
3. The AI can save an opportunity into the workspace.
4. The saved opportunity appears in the web UI.
5. The user can update relevant state/context in the UI.
6. The AI subsequently observes that updated state.
7. The workspace can be exported and restored without depending on a particular database file.

We evaluate AI integration by successful behavior/tool use rather than exact generated wording.

## Non-goals

- job crawler or search engine
- built-in LLM inference
- Gmail ingestion
- browser automation
- native resume generator
- native interview coach
- vector database as source of truth
- cloud authentication or billing
- multiple-workspace UI
- mobile app
- community features

## Privacy direction

V0 is local-first. It should not send workspace content anywhere except to services the user explicitly connects.

Hosted encryption/authentication is a later cloud concern and must not change the logical workspace format.

## Open questions

These are intentionally unresolved until a concrete slice needs them:

- exact memory schema
- opportunity fields and lifecycle
- MCP tool contracts
- local runtime details
- import/export representation
- multi-workspace UX
- document/resume storage
- synchronization between devices
