### 11. Rollback Plan (CRITICAL for production)

```markdown
## Rollback Plan

### Deployment Strategy

- **Feature Flag**: `FEATURE_X_ENABLED` (LaunchDarkly / custom)
- **Phased Rollout**:
  - Phase 1: 5% of traffic (1 day)
  - Phase 2: 25% of traffic (1 day)
  - Phase 3: 50% of traffic (1 day)
  - Phase 4: 100% of traffic

- **Canary Deployment**: Deploy to 1 instance first, monitor for 1h before full rollout

### Rollback Triggers

| Trigger | Action |
|---------|--------|
| Error rate > 5% for 5 minutes | **Immediate rollback** - disable feature flag |
| Latency > 3s (p95) for 10 minutes | **Investigate** - rollback if no quick fix |
| External API integration failing > 50% | **Rollback** - revert to previous version |
| Database migration fails | **STOP** - do not proceed, investigate |
| Customer reports of data loss | **Immediate rollback** + incident response |

### Rollback Steps

**1. Immediate Rollback (< 5 minutes)**:
- **Feature Flag**: Disable via feature flag dashboard (instant)
- **Deployment**: Revert to previous version via deployment tool (2-3 minutes)

**2. Database Rollback** (if schema changed):
- Run down migration using migration tool
- Verify schema integrity
- Confirm data consistency

**3. Communication**:

- Notify #engineering Slack channel
- Update status page (if customer-facing)
- Create incident ticket
- Schedule post-mortem within 24h

### Post-Rollback

- **Root Cause Analysis**: Within 24 hours
- **Fix**: Implement fix in development environment
- **Re-test**: Full test suite + additional tests for root cause
- **Re-deploy**: Following same phased rollout strategy

### Database Rollback Considerations

- **Migrations**: Always create reversible migrations (down migration)
- **Data Backfill**: If data was modified, have script to restore previous state
- **Backup**: Take database snapshot before running migrations
- **Testing**: Test rollback procedure on staging before production

````

**If missing for production**: Ask "What happens if the deploy goes wrong? How will you rollback? What are the triggers for rollback?"
