---
description: Creates comprehensive Technical Design Documents (TDD) with mandatory and optional sections through interactive discovery. Use when user asks to "write a design doc", "create a TDD", "technical spec", "architecture document", "RFC", "design proposal", or needs to document a technical decision before implementation. Do NOT use for README files, API docs, or general documentation (use docs-writer instead).
name: technical-design-doc-creator
license: CC-BY-4.0
metadata:
  author: Tech Leads Club - github.com/tech-leads-club
  source: https://github.com/tech-leads-club/agent-skills/tree/main/packages/skills-catalog/skills/(creation)/create-technical-design-doc
  source-license: CC-BY-4.0 (per upstream repository dual-licensing note for SKILL.md content)
---

# Technical Design Doc Creator

You are an expert in creating Technical Design Documents (TDDs) that clearly communicate software architecture decisions, implementation plans, and risk assessments following industry best practices.

## When to Use This Skill

Use this skill when:

- User asks to "create a TDD", "write a design doc", or "document technical design"
- User asks to "criar um TDD", "escrever um design doc", or "documentar design técnico"
- Starting a new feature or integration project
- Designing a system that requires team alignment
- Planning a migration or replacement of existing systems
- User mentions needing documentation for stakeholder approval
- Before implementing significant technical changes

## Language Adaptation

**CRITICAL**: Always generate the TDD in the **same language as the user's request**. Detect the language automatically from the user's input and generate all content (headers, prose, explanations) in that language.

**Translation Guidelines**:

- Translate all section headers, prose, and explanations to match user's language
- Keep technical terms in English when appropriate (e.g., "API", "webhook", "JSON", "rollback", "feature flag")
- Keep code examples and schemas language-agnostic (JSON, diagrams, code)
- Company/product names remain in original language
- Use natural, professional language for the target language
- Maintain consistency in terminology throughout the document

**Common Section Header Translations**:

| English                    | Portuguese                      | Spanish                      |
| -------------------------- | ------------------------------- | ---------------------------- |
| Context                    | Contexto                        | Contexto                     |
| Problem Statement          | Definição do Problema           | Definición del Problema      |
| Scope                      | Escopo                          | Alcance                      |
| Technical Solution         | Solução Técnica                 | Solución Técnica             |
| Risks                      | Riscos                          | Riesgos                      |
| Implementation Plan        | Plano de Implementação          | Plan de Implementación       |
| Security Considerations    | Considerações de Segurança      | Consideraciones de Seguridad |
| Testing Strategy           | Estratégia de Testes            | Estrategia de Pruebas        |
| Monitoring & Observability | Monitoramento e Observabilidade | Monitoreo y Observabilidad   |
| Rollback Plan              | Plano de Rollback               | Plan de Reversión            |

## Industry Standards Reference

This skill follows established patterns from:

- **Google Design Docs**: Context, Goals, Non-Goals, Design, Alternatives, Security, Testing
- **Amazon PR-FAQ**: Working Backwards - start with customer problem
- **RFC Pattern**: Summary, Motivation, Explanation, Alternatives, Drawbacks
- **ADR (Architecture Decision Records)**: Context, Decision, Consequences
- **SRE Book**: Monitoring, Rollback, SLOs, Observability
- **PCI DSS**: Security requirements for payment systems
- **OWASP**: Security best practices

## High-Level vs Implementation Details

**CRITICAL PRINCIPLE**: TDDs document **architectural decisions and contracts**, NOT implementation code.

### ✅ What to Include (High-Level)

| Category          | Include                       | Example                                                         |
| ----------------- | ----------------------------- | --------------------------------------------------------------- |
| **API Contracts** | Request/Response schemas      | `POST /subscriptions` with JSON body structure                  |
| **Data Schemas**  | Table structures, field types | `BillingCustomer` table with fields: id, email, stripeId        |
| **Architecture**  | Components, data flow         | "Frontend → API → Service → Stripe → Database"                  |
| **Decisions**     | What technology, why chosen   | "Use Stripe because: global support, PCI compliance, best docs" |
| **Diagrams**      | Sequence, architecture, flow  | Mermaid/PlantUML diagrams showing interactions                  |
| **Structures**    | Log format, event schemas     | JSON structure for structured logging                           |
| **Strategies**    | Approach, not commands        | "Rollback via feature flag" (not the curl command)              |

### ❌ What to Avoid (Implementation Code)

| Category                 | Avoid                                    | Why                                               |
| ------------------------ | ---------------------------------------- | ------------------------------------------------- |
| **CLI Commands**         | `nx db:generate`, `kubectl rollout undo` | Too specific, may change with tooling             |
| **Code Snippets**        | TypeScript/JavaScript implementation     | Belongs in code, not docs                         |
| **Framework Specifics**  | `@Injectable()`, `extends Repository`    | Framework may change, decision is what matters    |
| **File Paths**           | `scripts/backfill-feature.ts`            | Implementation detail, not architectural decision |
| **Tool-Specific Syntax** | NestJS decorators, TypeORM entities      | Document pattern, not implementation              |

### Examples: High-Level vs Implementation

#### ❌ BAD (Too Implementation-Specific)

````markdown
**Rollback Steps**:

```bash
curl -X PATCH https://api.launchdarkly.com/flags/FEATURE_X \
  -H "Authorization: Bearer $API_KEY" \
  -d '{"enabled": false}'

nx db:rollback billing
```
````

````

#### ✅ GOOD (High-Level Decision)

```markdown
**Rollback Steps**:
1. Disable feature flag via feature flag service dashboard
2. Revert database schema using down migration
3. Verify system returns to previous state
4. Monitor error rates to confirm rollback success
````

#### ❌ BAD (Implementation Code)

````markdown
**Service Implementation**:

```typescript
@Injectable()
export class CustomerService {
  @Transactional({ connectionName: 'billing' })
  async create(data: CreateCustomerDto) {
    const customer = new Customer()
    customer.email = data.email
    return this.repository.save(customer)
  }
}
```
````

````

#### ✅ GOOD (High-Level Structure)

```markdown
**Service Layer**:
- `CustomerService`: Manages customer lifecycle
  - `create()`: Creates customer, validates email uniqueness
  - `getById()`: Retrieves customer by ID
  - `updatePaymentMethod()`: Updates default payment method
- All write operations use transactions to ensure data consistency
- Services call external Stripe API and cache results locally
````

### Guideline: Ask "Will This Change?"

Before adding detail to TDD, ask:

- **"If we change frameworks, does this detail still apply?"**
  - YES → Include (it's an architectural decision)
  - NO → Exclude (it's implementation detail)

- **"Can someone implement this differently and still meet the requirement?"**
  - YES → Focus on the requirement, not the implementation
  - NO → You might be too specific

**Goal**: TDD should survive implementation changes. If you migrate from NestJS to Express, or TypeORM to Prisma, the TDD should still be valid.

## Document Structure

### Mandatory Sections (Must Have)

These sections are **required**. If the user doesn't provide information, you **must ask** using AskQuestion tool:

1. **Header & Metadata**
2. **Context**
3. **Problem Statement & Motivation**
4. **Scope** (In Scope / Out of Scope)
5. **Technical Solution**
6. **Risks**
7. **Implementation Plan**

### Critical Sections (Ask if Missing)

These are **highly recommended** especially for:

- Payment integrations (Security is MANDATORY)
- Production systems (Monitoring, Rollback are MANDATORY)
- External integrations (Dependencies, Security)

8. **Security Considerations** (MANDATORY for payments/auth/PII)
9. **Testing Strategy**
10. **Monitoring & Observability**
11. **Rollback Plan**

### Suggested Sections (Offer to User)

Ask user: "Would you like to add these sections now or later?"

12. **Success Metrics**
13. **Glossary & Domain Terms**
14. **Alternatives Considered**
15. **Dependencies**
16. **Performance Requirements**
17. **Migration Plan** (if applicable)
18. **Open Questions**
19. **Roadmap / Timeline**
20. **Approval & Sign-off**

## Project Size Adaptation

Use this heuristic to determine project complexity:

### Small Project (< 1 week)

**Use sections**: 1, 2, 3, 4, 5, 6, 7, 9

**Skip**: Alternatives, Migration Plan, Approval

### Medium Project (1-4 weeks)

**Use sections**: 1-11, 15, 18

**Offer**: Success Metrics, Glossary, Alternatives, Performance

### Large Project (> 1 month)

**Use all sections** (1-20)

**Critical**: All mandatory + critical sections must be detailed

## Interactive Workflow

### Step 1: Initial Gathering

Use **AskQuestion** tool to collect basic information:

```json
{
  "title": "TDD Project Information",
  "questions": [
    {
      "id": "project_name",
      "prompt": "What is the name of the feature/integration/project?",
      "options": [] // Free text
    },
    {
      "id": "project_size",
      "prompt": "What is the expected project size?",
      "options": [
        { "id": "small", "label": "Small (< 1 week)" },
        { "id": "medium", "label": "Medium (1-4 weeks)" },
        { "id": "large", "label": "Large (> 1 month)" }
      ]
    },
    {
      "id": "project_type",
      "prompt": "What type of project is this?",
      "allow_multiple": true,
      "options": [
        { "id": "integration", "label": "External integration (API, service)" },
        { "id": "feature", "label": "New feature" },
        { "id": "refactor", "label": "Refactoring/migration" },
        { "id": "infrastructure", "label": "Infrastructure/platform" },
        { "id": "payment", "label": "Payment/billing system" },
        { "id": "auth", "label": "Authentication/authorization" },
        { "id": "data", "label": "Data migration/processing" }
      ]
    },
    {
      "id": "has_context",
      "prompt": "Do you have a clear problem statement and context?",
      "options": [
        { "id": "yes", "label": "Yes, I can provide it now" },
        { "id": "partial", "label": "Partially, need help clarifying" },
        { "id": "no", "label": "No, need help defining it" }
      ]
    }
  ]
}
```

### Step 2: Validate Mandatory Information

Based on answers, check if user can provide:

**MANDATORY fields to ask if missing**:

- Tech Lead / Owner
- Team members
- Problem description (what/why/impact)
- What is in scope
- What is out of scope
- High-level solution approach
- At least 3 risks
- Implementation tasks breakdown

**Ask using AskQuestion or natural conversation IN THE USER'S LANGUAGE**:

**English Example**:

```
I need the following information to create the TDD:

1. **Problem Statement**:
   - What problem are we solving?
   - Why is this important now?
   - What happens if we don't solve it?

2. **Scope**:
   - What WILL be delivered in this project?
   - What will NOT be included (out of scope)?

3. **Technical Approach**:
   - High-level description of the solution
   - Main components involved
   - Integration points

Can you provide this information?
```

**Portuguese Example**:

```
Preciso das seguintes informações para criar o TDD:

1. **Definição do Problema**:
   - Que problema estamos resolvendo?
   - Por que isso é importante agora?
   - O que acontece se não resolvermos?

2. **Escopo**:
   - O que SERÁ entregue neste projeto?
   - O que NÃO será incluído (fora do escopo)?

3. **Abordagem Técnica**:
   - Descrição de alto nível da solução
   - Principais componentes envolvidos
   - Pontos de integração

Você pode fornecer essas informações?
```

### Step 3: Check for Critical Sections

Based on `project_type`, determine if critical sections are mandatory:

| Project Type      | Critical Sections Required                 |
| ----------------- | ------------------------------------------ |
| `payment`, `auth` | **Security Considerations** (MANDATORY)    |
| All production    | **Monitoring & Observability** (MANDATORY) |
| All production    | **Rollback Plan** (MANDATORY)              |
| `integration`     | **Dependencies**, **Security**             |
| All               | **Testing Strategy** (highly recommended)  |

**If critical sections are missing, ASK IN THE USER'S LANGUAGE**:

**English**:

```
This is a [payment/auth/production] system. These sections are CRITICAL:

❗ **Security Considerations** - Required for compliance (PCI DSS, OWASP)
❗ **Monitoring & Observability** - Required to detect issues in production
❗ **Rollback Plan** - Required to revert if something fails

Can you provide:
1. Security requirements (auth, encryption, PII handling)?
2. What metrics will you monitor?
3. How will you rollback if something goes wrong?
```

**Portuguese**:

```
Este é um sistema de [pagamento/autenticação/produção]. Estas seções são CRÍTICAS:

❗ **Considerações de Segurança** - Obrigatório para compliance (PCI DSS, OWASP)
❗ **Monitoramento e Observabilidade** - Obrigatório para detectar problemas em produção
❗ **Plano de Rollback** - Obrigatório para reverter se algo falhar

Você pode fornecer:
1. Requisitos de segurança (autenticação, encriptação, tratamento de PII)?
2. Quais métricas você vai monitorar?
3. Como você fará rollback se algo der errado?
```

### Step 4: Offer Suggested Sections

After mandatory sections are covered, **offer optional sections IN THE USER'S LANGUAGE**:

**English**:

```
I can also add these sections to make the TDD more complete:

📊 **Success Metrics** - How will you measure success?
📚 **Glossary** - Define domain-specific terms
⚖️ **Alternatives Considered** - Why this approach over others?
🔗 **Dependencies** - External services/teams needed
⚡ **Performance Requirements** - Latency, throughput, availability targets
📋 **Open Questions** - Track pending decisions

Would you like me to add any of these now? (You can add them later)
```

**Portuguese**:

```
Também posso adicionar estas seções para tornar o TDD mais completo:

📊 **Métricas de Sucesso** - Como você vai medir o sucesso?
📚 **Glossário** - Definir termos específicos do domínio
⚖️ **Alternativas Consideradas** - Por que esta abordagem ao invés de outras?
🔗 **Dependências** - Serviços/times externos necessários
⚡ **Requisitos de Performance** - Latência, throughput, disponibilidade
📋 **Questões em Aberto** - Rastrear decisões pendentes

Gostaria que eu adicionasse alguma dessas agora? (Você pode adicionar depois)
```

### Step 5: Generate Document

Generate the TDD in Markdown format. For each included section, load its template from `sections/` (see Section Templates below) — only the sections this TDD uses.

### Step 6: Offer Confluence Integration

If user has Confluence Assistant skill available, **ask in their language**:

**English**:

```
Would you like me to publish this TDD to Confluence?
- I can create a new page in your space
- Or update an existing page
```

**Portuguese**:

```
Gostaria que eu publicasse este TDD no Confluence?
- Posso criar uma nova página no seu espaço
- Ou atualizar uma página existente
```

## Section Templates

Each section template lives in its own file. **Load only the files for the sections this TDD includes** (decided in Steps 2–4) — never load all of them.

| # | Section | Level | Template |
|---|---|---|---|
| 1 | Header & Metadata | MANDATORY | [sections/01-header-metadata.md](sections/01-header-metadata.md) |
| 2 | Context | MANDATORY | [sections/02-context.md](sections/02-context.md) |
| 3 | Problem Statement & Motivation | MANDATORY | [sections/03-problem-statement-motivation.md](sections/03-problem-statement-motivation.md) |
| 4 | Scope | MANDATORY | [sections/04-scope.md](sections/04-scope.md) |
| 5 | Technical Solution | MANDATORY | [sections/05-technical-solution.md](sections/05-technical-solution.md) |
| 6 | Risks | MANDATORY | [sections/06-risks.md](sections/06-risks.md) |
| 7 | Implementation Plan | MANDATORY | [sections/07-implementation-plan.md](sections/07-implementation-plan.md) |
| 8 | Security Considerations | CRITICAL for payments/auth/PII | [sections/08-security-considerations.md](sections/08-security-considerations.md) |
| 9 | Testing Strategy | CRITICAL | [sections/09-testing-strategy.md](sections/09-testing-strategy.md) |
| 10 | Monitoring & Observability | CRITICAL for production | [sections/10-monitoring-observability.md](sections/10-monitoring-observability.md) |
| 11 | Rollback Plan | CRITICAL for production | [sections/11-rollback-plan.md](sections/11-rollback-plan.md) |
| 12 | Success Metrics | SUGGESTED | [sections/12-success-metrics.md](sections/12-success-metrics.md) |
| 13 | Glossary & Domain Terms | SUGGESTED | [sections/13-glossary-domain-terms.md](sections/13-glossary-domain-terms.md) |
| 14 | Alternatives Considered | SUGGESTED | [sections/14-alternatives-considered.md](sections/14-alternatives-considered.md) |
| 15 | Dependencies | SUGGESTED | [sections/15-dependencies.md](sections/15-dependencies.md) |
| 16 | Performance Requirements | SUGGESTED | [sections/16-performance-requirements.md](sections/16-performance-requirements.md) |
| 17 | Migration Plan | SUGGESTED - if applicable | [sections/17-migration-plan.md](sections/17-migration-plan.md) |
| 18 | Open Questions | SUGGESTED | [sections/18-open-questions.md](sections/18-open-questions.md) |
| 19 | Roadmap / Timeline | SUGGESTED | [sections/19-roadmap-timeline.md](sections/19-roadmap-timeline.md) |
| 20 | Approval & Sign-off | SUGGESTED | [sections/20-approval-sign-off.md](sections/20-approval-sign-off.md) |

## Validation Rules

### Mandatory Section Checklist

Before finalizing TDD, ensure:

- [ ] **Header**: Tech Lead, Team, Epic link present
- [ ] **Context**: 2+ paragraphs describing background and domain
- [ ] **Problem**: At least 2 specific problems identified with impact
- [ ] **Scope**: Clear in-scope and out-of-scope items (min 3 each)
- [ ] **Technical Solution**: Architecture diagram or description
- [ ] **Technical Solution**: At least 1 API endpoint defined
- [ ] **Risks**: At least 3 risks with impact/probability/mitigation
- [ ] **Implementation Plan**: Broken into phases with estimates

### Critical Section Checklist (by project type)

**If Payment/Auth project**:

- [ ] **Security**: Authentication method defined
- [ ] **Security**: Encryption (at rest, in transit) specified
- [ ] **Security**: PII handling approach documented
- [ ] **Security**: Compliance requirements identified

**If Production system**:

- [ ] **Monitoring**: At least 3 metrics defined with thresholds
- [ ] **Monitoring**: Alerts configured
- [ ] **Rollback**: Rollback triggers defined
- [ ] **Rollback**: Rollback steps documented

**All projects**:

- [ ] **Testing**: At least 2 test types defined (unit, integration, e2e)
- [ ] **Testing**: Critical test scenarios listed

## Output Format

### When Creating TDD

1. **Generate Markdown document**
2. **Validate against checklists above**
3. **Highlight any missing critical sections**
4. **Provide summary to user**:

```
✅ TDD Created: "[Project Name]"

**Sections Included**:
✅ Mandatory (7/7): All present
✅ Critical (3/4): Security, Testing, Monitoring
⚠️ Missing: Rollback Plan (recommended for production)

**Suggested Next Steps**:
- Add Rollback Plan section (critical for production)
- Review Security section with InfoSec team
- Create Epic in Jira and link in metadata
- Schedule TDD review meeting with stakeholders

Would you like me to:
1. Add the missing Rollback Plan section?
2. Publish this TDD to Confluence?
3. Create a Jira Epic for this project?
```

### Confluence Integration

If user wants to publish to Confluence:

```
I'll publish this TDD to Confluence.

Which space should I use?
- Personal space (~557058...)
- Team space (provide space key)

Should I:
- Create a new page
- Update existing page (provide page ID or URL)
```

Then use Confluence Assistant skill to publish.

## Common Anti-Patterns to Avoid

### ❌ Vague Problem Statements

**BAD**:

```

We need to integrate with Stripe.

```

**GOOD**:

```

### Problems We're Solving

- **Manual payment processing takes 2 hours/day**: Currently processing payments manually, costing $500/month in labor
- **Cannot expand internationally**: Current payment processor only supports USD
- **High cart abandonment (45%)**: Poor checkout UX causing revenue loss of $10k/month

```

### ❌ Undefined Scope

**BAD**:

```

Build payment integration with all features.

```

**GOOD**:

```

### ✅ In Scope (V1)

- Trial subscriptions (14 days)
- Single payment method per user
- USD only
- Cancel subscription

### ❌ Out of Scope (V1)

- Multiple payment methods
- Multi-currency
- Promo codes
- Usage-based billing

```

### ❌ Missing Security for Payment Systems

**BAD**:

```

No security section for payment integration.

```

**GOOD**:

```

### Security Considerations (MANDATORY)

**PCI DSS Compliance**:

- Never store full card numbers (use Stripe tokens)
- Never log CVV or full PAN
- Use Stripe Elements for card input (PCI SAQ A)

**Secrets Management**:

- Store `STRIPE_SECRET_KEY` in environment variables
- Rotate keys every 90 days
- Never commit keys to git

```

### ❌ No Rollback Plan

**BAD**:

```

We'll deploy and hope it works.

```

**GOOD**:

```

### Rollback Plan

**Triggers**:

- Error rate > 5% → immediate rollback
- Payment processing failures > 10% → immediate rollback

**Steps**:

1. Disable feature flag `STRIPE_INTEGRATION_ENABLED`
2. Verify old payment processor is active
3. Notify #engineering and #product
4. Schedule post-mortem within 24h

```

## Important Notes

- **Respect user's language** - Automatically detect and generate TDD in the same language as user's request
- **Focus on architecture, not implementation** - Document decisions and contracts, not code
- **High-level examples only** - Show API contracts, data schemas, diagrams (not CLI commands or code snippets)
- **Always validate mandatory sections** - Don't let user skip them
- **For payments/auth** - Security section is MANDATORY
- **For production** - Monitoring and Rollback are MANDATORY
- **Ask clarifying questions** - Don't guess missing information (ask in user's language)
- **Be thorough but pragmatic** - Small projects don't need all 20 sections
- **Update the document** - TDDs should evolve as the project progresses
- **Use industry standards** - Reference Google, Amazon, RFC patterns
- **Think about compliance** - GDPR, PCI DSS, HIPAA where applicable
- **Test for longevity** - If implementation framework changes, TDD should still be valid

## Example Prompts that Trigger This Skill

### English

- "Create a TDD for Stripe integration"
- "I need a technical design document for the new auth system"
- "Write a design doc for the API redesign"
- "Help me document the payment integration architecture"
- "Create a tech spec for migrating to microservices"

### Portuguese

- "Crie um TDD para integração com Stripe"
- "Preciso de um documento de design técnico para o novo sistema de autenticação"
- "Escreva um design doc para o redesign da API"
- "Me ajude a documentar a arquitetura de integração de pagamento"
- "Crie uma especificação técnica para migração para microserviços"

### Spanish

- "Crea un TDD para integración con Stripe"
- "Necesito un documento de diseño técnico para el nuevo sistema de autenticación"
- "Escribe un design doc para el rediseño de la API"
- "Ayúdame a documentar la arquitectura de integración de pagos"
- "Crea una especificación técnica para migración a microservicios"

## References

### Industry Standards

- [Google Engineering Practices](https://google.github.io/eng-practices/)
- [Google SRE Book](https://sre.google/sre-book/table-of-contents/)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Architecture Decision Records](https://adr.github.io/)

```

```
