### 8. Security Considerations (CRITICAL for payments/auth/PII)

```markdown
## Security Considerations

### Authentication & Authorization

- **Authentication**: How users prove identity
  - Example: JWT tokens, OAuth 2.0, session-based
- **Authorization**: What authenticated users can access
  - Example: Role-based (RBAC), Attribute-based (ABAC)
  - Ensure users can only access their own resources

### Data Protection

**Encryption**:

- **At Rest**: Database encryption enabled (AES-256)
- **In Transit**: TLS 1.3 for all API communication
- **Secrets**: Store API keys in environment variables / secret manager (AWS Secrets Manager, HashiCorp Vault)

**PII Handling**:

- What PII is collected: [email, name, payment info]
- Legal basis: [consent, contract, legitimate interest]
- Retention: [how long data is kept]
- Deletion: [GDPR right to be forgotten implementation]

### Compliance Requirements

| Regulation  | Requirement                        | Implementation                                    |
| ----------- | ---------------------------------- | ------------------------------------------------- |
| **GDPR**    | Data protection, right to deletion | Implement data export/deletion endpoints          |
| **PCI DSS** | No storage of card data            | Use Stripe tokenization, never store CVV/full PAN |
| **LGPD**    | Brazil data protection             | Same as GDPR compliance                           |

### Security Best Practices

- ✅ Input validation on all endpoints
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS prevention (sanitize user input, CSP headers)
- ✅ CSRF protection (tokens for state-changing operations)
- ✅ Rate limiting (e.g., 10 req/min per user, 100 req/min per IP)
- ✅ Audit logging (log all sensitive operations)

### Secrets Management

**API Keys**:

- Storage: Environment variables or secret management service
- Rotation: Define rotation policy (e.g., every 90 days)
- Access: Backend services only, never exposed to frontend
- Examples: Stripe keys, database credentials, API tokens

**Webhook Signatures**:

- Validate webhook signatures from external services
- Reject requests without valid signature headers
- Log invalid signature attempts for security monitoring
```

**If missing and project involves payments/auth**: Ask "This is a [payment/auth] system. I need security details: How will you handle authentication? What encryption will be used? What PII is collected? Any compliance requirements (GDPR, PCI DSS)?"
