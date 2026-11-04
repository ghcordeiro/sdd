### 7. Implementation Plan (MANDATORY)

```markdown
## Implementation Plan

| Phase                 | Task              | Description                            | Owner   | Status | Estimate |
| --------------------- | ----------------- | -------------------------------------- | ------- | ------ | -------- |
| **Phase 1 - Setup**   | Setup credentials | Obtain API keys, configure environment | @Dev1   | TODO   | 1d       |
|                       | Database setup    | Create schema, configure datasource    | @Dev1   | TODO   | 1d       |
| **Phase 2 - Core**    | Entities & repos  | Create TypeORM entities, repositories  | @Dev2   | TODO   | 3d       |
|                       | Services          | Implement business logic services      | @Dev2   | TODO   | 4d       |
| **Phase 3 - APIs**    | REST endpoints    | Create controllers, DTOs               | @Dev3   | TODO   | 3d       |
|                       | Integration       | Integrate with external API            | @Dev1   | TODO   | 3d       |
| **Phase 4 - Testing** | Unit tests        | Test services and repositories         | @Team   | TODO   | 2d       |
|                       | E2E tests         | Test full flow                         | @Team   | TODO   | 3d       |
| **Phase 5 - Deploy**  | Staging deploy    | Deploy to staging, smoke test          | @DevOps | TODO   | 1d       |
|                       | Production deploy | Phased rollout to production           | @DevOps | TODO   | 1d       |

**Total Estimate**: ~20 days (4 weeks)

**Dependencies**:

- Must complete Phase N before Phase N+1
- External API access required before Phase 3
- Security review required before Phase 5
```

**If user provides vague plan**: Ask "Can you break this down into phases with specific tasks? Who will work on each part? What's the estimated timeline?"
