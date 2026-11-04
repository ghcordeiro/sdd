### 6. Risks (MANDATORY)

```markdown
## Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| External API downtime | High | Medium | Implement circuit breaker, cache responses, fallback to degraded mode |
| Data migration failure | High | Low | Test on staging copy, run dry-run first, have rollback script ready |
| Performance degradation | Medium | Medium | Load test before deployment, implement caching, monitor latency |
| Security vulnerability | High | Low | Security review, penetration testing, follow OWASP guidelines |
| Scope creep | Medium | High | Strict scope definition, change request process, regular stakeholder alignment |

**Risk Scoring**:
- **Impact**: High (system down, data loss) / Medium (degraded UX) / Low (minor inconvenience)
- **Probability**: High (>50%) / Medium (20-50%) / Low (<20%)
````

**If user provides < 3 risks**: Ask "What could go wrong? Consider: external dependencies, data integrity, performance, security, scope changes."
