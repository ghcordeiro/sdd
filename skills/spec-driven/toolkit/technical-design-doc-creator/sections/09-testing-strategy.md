### 9. Testing Strategy (CRITICAL)

```markdown
## Testing Strategy

| Test Type             | Scope                    | Coverage Target          | Approach             |
| --------------------- | ------------------------ | ------------------------ | -------------------- |
| **Unit Tests**        | Services, repositories   | > 80%                    | Jest with mocks      |
| **Integration Tests** | API endpoints + database | Critical paths           | Supertest + test DB  |
| **E2E Tests**         | Full user flows          | Happy path + error cases | Playwright           |
| **Contract Tests**    | External API integration | API contract validation  | Pact or manual mocks |
| **Load Tests**        | Performance under load   | Baseline performance     | k6 or Artillery      |

### Test Scenarios

**Unit Tests**:

- ✅ Service business logic (create, update, delete)
- ✅ Repository query methods
- ✅ Error handling (throw correct exceptions)
- ✅ Edge cases (null inputs, invalid data)

**Integration Tests**:

- ✅ POST `/api/v1/resource` → creates in DB
- ✅ GET `/api/v1/resource/:id` → returns correct data
- ✅ DELETE `/api/v1/resource/:id` → removes from DB
- ✅ Invalid input → returns 400 Bad Request
- ✅ Unauthorized access → returns 401/403

**E2E Tests**:

- ✅ User creates resource → success flow
- ✅ User tries to access another user's resource → denied
- ✅ External API fails → graceful degradation
- ✅ Database connection lost → proper error handling

**Load Tests**:

- Target: 100 req/s sustained, 500 req/s peak
- Monitor: Latency (p50, p95, p99), error rate, throughput
- Pass criteria: p95 < 500ms, error rate < 1%

### Test Data Management

- Use factories for test data (e.g., `@faker-js/faker`)
- Seed test database with realistic data
- Clean up test data after each test
- Use separate test database (never use production)
```

**If missing**: Ask "How will you test this? What test types are needed (unit, integration, e2e)? What are critical test scenarios?"
