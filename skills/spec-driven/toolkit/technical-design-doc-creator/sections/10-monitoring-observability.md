### 10. Monitoring & Observability (CRITICAL for production)

````markdown
## Monitoring & Observability

### Metrics to Track

| Metric                    | Type       | Alert Threshold   | Dashboard          |
| ------------------------- | ---------- | ----------------- | ------------------ |
| `api.latency`             | Latency    | p95 > 1s for 5min | DataDog / Grafana  |
| `api.error_rate`          | Error rate | > 1% for 5min     | DataDog / Grafana  |
| `external_api.latency`    | Latency    | p95 > 2s for 5min | DataDog            |
| `external_api.errors`     | Counter    | > 5 in 1min       | PagerDuty          |
| `database.query_time`     | Duration   | p95 > 100ms       | DataDog            |
| `webhook.processing_time` | Duration   | > 5s              | Internal Dashboard |

### Structured Logging

**Log Format** (JSON):

```json
{
  "level": "info",
  "timestamp": "2026-02-04T10:00:00Z",
  "message": "Resource created",
  "context": {
    "userId": "user-123",
    "resourceId": "res-456",
    "action": "create",
    "duration_ms": 45
  }
}
```
````

**What to Log**:

- ✅ All API requests (method, path, status, duration)
- ✅ External API calls (endpoint, status, duration)
- ✅ Database queries (slow queries > 100ms)
- ✅ Errors and exceptions (stack trace, context)
- ✅ Business events (resource created, payment processed)

**What NOT to Log**:

- ❌ Passwords, API keys, secrets
- ❌ Full credit card numbers
- ❌ Sensitive PII (redact or hash)

### Alerts

| Alert                              | Severity      | Channel            | On-Call Action                              |
| ---------------------------------- | ------------- | ------------------ | ------------------------------------------- |
| Error rate > 5%                    | P1 (Critical) | PagerDuty          | Immediate investigation, rollback if needed |
| External API down                  | P1 (Critical) | PagerDuty          | Enable fallback mode, notify stakeholders   |
| Latency > 2s (p95)                 | P2 (High)     | Slack #engineering | Investigate performance degradation         |
| Webhook failures > 20              | P2 (High)     | Slack #engineering | Check webhook endpoint, Stripe status       |
| Database connection pool exhausted | P1 (Critical) | PagerDuty          | Scale up connections or investigate leak    |

### Dashboards

**Operational Dashboard**:

- Request rate (per endpoint)
- Error rate (overall and per endpoint)
- Latency (p50, p95, p99)
- External API health
- Database performance

**Business Dashboard**:

- Resources created (count per day)
- Active users
- Conversion metrics (if applicable)

````

**If missing for production system**: Ask "How will you monitor this in production? What metrics matter? What alerts do you need?"
