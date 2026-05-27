---
name: ea-service-docs
description: >
  Generates complete service documentation for Engenho Agro repositories.
  Reads the full codebase (routes, DTOs, models, interfaces) and produces
  structured Markdown docs in .engenhoagro/docs/ following the EA portal standard.
  Covers architecture, API by module, functional flows, runbook and integration guide.
license: CC-BY-4.0
---

# ea-service-docs

Skill para gerar documentação completa de um serviço da Engenho Agro.

Lê o codebase real (rotas, DTOs, models, interfaces) e produz documentação estruturada
em `.engenhoagro/docs/` seguindo o padrão do portal de documentação da EA.

---

## Quando usar

- Primeira documentação de um serviço (onboarding)
- Revisão completa da documentação existente
- Após refatoração significativa de rotas ou modelos

**Comando:** `generate ea docs` ou `documenta este serviço`

---

## O que este skill produz

```
.engenhoagro/docs/
├── meta.yml              ← preenchido pelo dev (contexto de domínio)
├── architecture.md       ← contexto, responsabilidades, dependências, env vars
├── api/
│   ├── web.md            ← endpoints do módulo web com tipagem real
│   ├── mobile.md         ← endpoints do módulo mobile
│   └── integration.md    ← endpoints de integração com sistemas externos
├── functional.md         ← fluxos em linguagem de negócio (para suporte/consultoria)
└── runbook.md            ← deploy, rollback, alertas (placeholder para preenchimento)
```

---

## Protocolo de execução

### PASSO 1 — Verificar ou criar meta.yml

Antes de qualquer geração, verificar se `.engenhoagro/docs/meta.yml` existe.

**Se não existe**, criar com o template abaixo e **pausar para o dev preencher**:

```yaml
# .engenhoagro/docs/meta.yml
# Preencha antes de gerar a documentação.
# Este arquivo é a fonte de verdade para contexto de domínio.

service: <nome-do-repo>
owner: <nome do dev responsável>
description: <uma frase descrevendo o que este serviço faz>

# Módulos da API (se o serviço tiver subdivisões de rotas)
# Remova os que não se aplicam
modules:
  - name: web
    description: <quem usa e para quê>
    routes_path: src/routes/web
  - name: mobile
    description: <quem usa e para quê>
    routes_path: src/routes/mobile
  - name: integration
    description: <quem usa e para quê>
    routes_path: src/routes/integration

# Dependências — o que NÃO é possível inferir do código
dependencies:
  internal:
    - service: <nome-do-serviço>
      how: <como este serviço usa aquele>
  external:
    - service: <nome do sistema externo>
      how: <função e criticidade>

# Banco de dados
database:
  - type: <MongoDB | PostgreSQL | Redis | ...>
    usage: <leitura/escrita/cache>

# Notas de domínio — termos do agronegócio usados no código
# Formato: NomeNoCode = Termo de Negócio = Definição
domain_notes: |
  Producer = Cooperado = Produtor rural associado à cooperativa
  CropSeason = Safra = Ciclo anual de produção agrícola
  DeliveryOrder = Ordem de Entrega = Pedido de entrega de produto
  FarmProducer = Propriedade Rural = Fazenda do cooperado
```

**Se existe**, ler e usar como contexto primário para toda a geração.

---

### PASSO 2 — Mapear o codebase

Explorar o repositório atual e catalogar:

**Rotas:**
- Listar todos os arquivos em `src/routes/**/*.ts` (ou equivalente)
- Identificar módulos (subpastas: web, mobile, integration, etc.)
- Para cada arquivo de rota, ler o conteúdo completo

**DTOs:**
- Ler todos os arquivos em `src/dto/**/*.ts`
- Identificar campos obrigatórios vs opcionais
- Identificar tipos e validações

**Models/Schemas:**
- Ler todos os arquivos em `src/models/**/*.ts` ou `src/schemas/**/*.ts`
- Extrair estrutura de dados persistidos

**Interfaces:**
- Ler `src/interfaces/**/*.ts`
- Identificar contratos internos relevantes para a API

**Configuração:**
- Ler `.env.example` ou `.exemple.env` para variáveis de ambiente
- Ler `package.json` para stack e dependências principais

---

### PASSO 3 — Gerar architecture.md

**Arquivo:** `.engenhoagro/docs/architecture.md`

**Frontmatter obrigatório:**
```
<!-- generated: true -->
<!-- template: architecture -->
<!-- audience: dev -->
<!-- version: 1.0 -->
```

**Seções obrigatórias:**

1. **Responsabilidade** — O que este serviço faz em 2-3 frases
2. **Contexto no ecossistema** — Diagrama ASCII mostrando posição no sistema
3. **Dependências internas** — Tabela com serviços, como usa e criticidade (do meta.yml)
4. **Dependências externas** — Idem para sistemas externos
5. **Banco de dados** — Tipo, nome e uso (do meta.yml + código)
6. **Variáveis de ambiente** — Tabela completa extraída do `.env.example`
7. **Como rodar localmente** — Comandos reais do README ou package.json
8. **Notas de domínio** — Glossário mapeando termos do código para termos de negócio (do meta.yml)

**Regras:**
- NUNCA inventar dependências — usar apenas o que está no meta.yml ou importado no código
- Para seções sem informação, escrever "A confirmar" — nunca inventar
- Usar os termos de domínio do meta.yml

---

### PASSO 4 — Gerar api/*.md por módulo

Para **cada módulo** listado no meta.yml (ou encontrado em `src/routes/`):

**Arquivo:** `.engenhoagro/docs/api/{modulo}.md`

**Frontmatter obrigatório:**
```
<!-- generated: true -->
<!-- template: api -->
<!-- audience: dev -->
<!-- module: {modulo} -->
<!-- version: 1.0 -->
```

**Para cada endpoint encontrado nas rotas do módulo:**

```markdown
### {Recurso} — ex: Producer

#### `{MÉTODO} /{path}`

{Descrição do que faz — inferida do nome do controller/método}

**Request:**

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `{campo}` | `{tipo TypeScript real do DTO}` | sim/não | {descrição} |

**Response 200:**
```typescript
{
  // estrutura real extraída do DTO de resposta ou do model
}
```

**Erros:**
| Status | Quando ocorre |
|---|---|
| 400 | {condição real se inferível} |
| 401 | Token ausente ou expirado |
| 404 | {recurso} não encontrado |
```

**Regras críticas:**
- Usar a tipagem REAL dos DTOs TypeScript — não inventar campos
- Se o DTO não existir para um endpoint, documentar o que é possível inferir das rotas e marcar campos como "A confirmar"
- Incluir TODOS os endpoints encontrados nos arquivos de rota do módulo
- Agrupar por recurso (Producer, CropSeason, DeliveryOrder, etc.)

---

### PASSO 5 — Gerar functional.md

**Arquivo:** `.engenhoagro/docs/functional.md`

**Frontmatter obrigatório:**
```
<!-- generated: true -->
<!-- template: functional -->
<!-- audience: support -->
<!-- version: 1.0 -->
```

**Regras:**
- Linguagem de negócio — sem jargão técnico
- Usar os termos do meta.yml (Producer → Cooperado, CropSeason → Safra, etc.)
- Inferir fluxos dos endpoints reais — não inventar funcionalidades
- Cada fluxo deve corresponder a pelo menos um endpoint real

**Seções:**
1. O que este serviço faz (para leigos)
2. Para quem é (tabela: perfil → como usa)
3. Fluxos principais (baseados nos grupos de endpoints)
4. Casos de erro comuns (erros que o usuário verá)
5. FAQ (perguntas frequentes de suporte)
6. Glossário específico deste serviço

---

### PASSO 6 — Gerar runbook.md

**Arquivo:** `.engenhoagro/docs/runbook.md`

Gerar como **placeholder estruturado** — as seções técnicas de operação
(alertas, contatos, SLAs) DEVEM ser preenchidas manualmente pelo dev responsável.

Preencher automaticamente apenas o que é possível inferir:
- Stack e versão (do package.json)
- Comandos de build e start (do package.json scripts)
- Variáveis de ambiente críticas (do .env.example)
- Sinalizar claramente com `<!-- TODO: preencher manualmente -->` nas seções que precisam de input humano

---

### PASSO 7 — Gerar integration.md (somente se aplicável)

**Gerar apenas se** o serviço tiver um módulo `integration` nas rotas OU se o meta.yml indicar que é uma API pública.

**Arquivo:** `.engenhoagro/docs/integration.md` (ou `api/integration.md`)

**Frontmatter obrigatório:**
```
<!-- generated: true -->
<!-- template: integration -->
<!-- audience: partner -->
<!-- version: 1.0 -->
```

Baseado nos endpoints reais do módulo de integração, com exemplos de request/response usando tipos TypeScript reais.

---

### PASSO 8 — Validar e reportar

Após gerar todos os arquivos, reportar:

```
✅ .engenhoagro/docs/architecture.md
✅ .engenhoagro/docs/api/web.md (X endpoints)
✅ .engenhoagro/docs/api/mobile.md (X endpoints)
✅ .engenhoagro/docs/api/integration.md (X endpoints)
✅ .engenhoagro/docs/functional.md
⚠️  .engenhoagro/docs/runbook.md — requer preenchimento manual nas seções marcadas com TODO

📋 Revisão necessária:
- [ ] Dependências internas em architecture.md (verificar se estão corretas)
- [ ] Campos marcados como "A confirmar" em api/*.md
- [ ] Seções TODO no runbook.md
- [ ] Validar se os fluxos do functional.md refletem o produto real
```

---

## Regras absolutas

1. **NUNCA inventar campos, endpoints ou dependências** — se não está no código ou no meta.yml, é "A confirmar"
2. **Usar tipagem TypeScript real** dos DTOs — não usar tipos genéricos como `string | number`
3. **Todos os endpoints das rotas** devem aparecer no api/*.md correspondente
4. **Termos de domínio** do meta.yml devem ser usados consistentemente em todos os arquivos
5. **Não gerar integration.md** para serviços que não são APIs públicas (ACLs internos, agents, libs)

---

## Exemplo de uso

```
# No Cursor ou Claude Code, dentro do repo:
generate ea docs

# Ou:
documenta este serviço seguindo o padrão Engenho Agro
```

O agente irá:
1. Verificar se `.engenhoagro/docs/meta.yml` existe → se não, criar e pedir preenchimento
2. Mapear todas as rotas, DTOs e models
3. Gerar os arquivos de documentação
4. Reportar o que precisa de revisão manual
