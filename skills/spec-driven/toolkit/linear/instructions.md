---
name: linear
description: "Linear integration for spec-driven: pulls issue context before Specify, pushes spec+plan+tasks back to Linear after Tasks gate. Requires Linear MCP. Quick mode exempt."
license: CC-BY-4.0
metadata:
  author: "Guilherme Cordeiro - github.com/ghcordeiro"
  version: "1.0.0"
---

# Linear Toolkit

Integração entre o fluxo spec-driven e o Linear. Atua em dois momentos no ciclo de vida SDD: antes da fase Specify (para puxar contexto) e após o gate da fase Tasks (para empurrar specs de volta).

> **Idioma:** Detecte o idioma do usuário na conversa e responda nesse idioma ao longo de toda a execução. Mantenha termos técnicos do Linear (IDs de issues, nomes de tools) em inglês.

> **Quick mode é isento.** Este toolkit não roda em Quick mode — zero cerimônia.

---

## Hook 1 — Pre-Specify: Pull Issue Context

**Quando rodar:** Imediatamente antes da fase Specify começar, antes de qualquer trabalho no spec.md.

### Step 1: Verificar disponibilidade do MCP

Antes de perguntar qualquer coisa ao usuário, verifique se o MCP do Linear está acessível chamando `get_authenticated_user`. Se a chamada falhar ou a tool não estiver disponível:

- Informe o usuário que o MCP do Linear não está configurado.
- Forneça instruções de setup:
  ```
  Para habilitar a integração com o Linear, adicione o servidor MCP do Linear
  à sua configuração do Claude Code. Consulte: https://linear.app/docs/mcp
  ```
- Skipe todos os steps restantes do Linear e prossiga diretamente para a fase Specify sem contexto do Linear.

### Step 2: Perguntar sobre uso do Linear

Se o MCP estiver disponível, pergunte ao usuário de forma conversacional (no idioma detectado):

> "Você tem um issue no Linear para esta feature? Se sim, passe o ID (ex: LIN-100) e eu vou buscar o contexto."

- **Não** (ou skip): armazene `LINEAR_ISSUE_ID = none` e prossiga para Specify. Não pergunte novamente durante esta sessão.
- **Sim**: armazene o ID fornecido como `LINEAR_ISSUE_ID` (ex: `LIN-100`).

### Step 3: Buscar e usar o contexto do issue

Chame `get_issue` com o ID fornecido. Extraia e retenha na sessão:

- **title** — use como ponto de partida para o nome da feature no spec.md
- **description** — leia para entender requisitos, objetivos e restrições já capturados
- **teamId** — guarde para uso na criação de sub-issues no Hook 2
- **id** (UUID interno) — guarde como `LINEAR_ISSUE_UUID` para uso como `parentId` no Hook 2

Resuma o que foi encontrado em 2-3 frases e confirme: "Encontrei o issue. Vou usar esse contexto para informar o spec. Prosseguindo para Specify."

Se `get_issue` falhar (issue não encontrado, permissão negada): informe o usuário, skipe o enriquecimento de contexto e prossiga para Specify sem o Linear.

---

## Hook 2 — Post-Tasks: Push Specs to Linear

**Quando rodar:** Após o gate da fase Tasks ser aprovado pelo usuário (tasks.md finalizado e aprovado). Não rode antes da aprovação.

**Pré-requisito:** `LINEAR_ISSUE_ID` deve estar definido e diferente de `none`. Se for `none`, skipe este hook inteiramente.

### Step 1: Ler os artefatos de spec

Carregue os seguintes arquivos de `.specs/features/[LINEAR_ISSUE_ID]/`:

- `spec.md` — para Objetivo, Fluxo resumido, Requisitos principais, NFRs, Fora de escopo, Pré-requisitos
- `plan.md` — para Decisões de arquitetura e referências de ADRs
- `tasks.md` — para Ordem de execução e lista de tasks para criar sub-issues

### Step 2: Montar a descrição do issue pai

Componha a descrição atualizada na seguinte estrutura exata. Preencha cada seção com os artefatos carregados no Step 1:

```markdown
## Objetivo
[2-3 frases da seção Summary do spec.md — o que está sendo construído, para quem, qual valor entrega]

## Fluxo resumido
[Steps numerados derivados da seção System Process Context do spec.md — do ponto de entrada ao resultado]

## Requisitos principais
| ID | Tema |
|---|---|
[Uma linha por ID de requisito da tabela Requirement Traceability do spec.md — coluna ID e título da story como Tema]

## Decisões de arquitetura (resumo)
[Bullets da tabela Tech Decisions do plan.md — um bullet por decisão significativa, formato: "Decisão: rationale (ADR-NNN)"]

## NFRs relevantes
[Requisitos não-funcionais — derivados de Edge Cases e Success Criteria do spec.md que sejam não-funcionais: performance, segurança, confiabilidade, escalabilidade]

## Fora de escopo
[Items da tabela Out of Scope do spec.md]

## Pré-requisito
[Quaisquer pré-requisitos mencionados no spec.md ou plan.md — se nenhum: "Nenhum"]

---

## Ordem de execução sugerida (`.specs/features/ISSUE-ID/tasks.md`)
[Copie o Execution Plan / Parallel Execution Map do tasks.md como bloco de código — o diagrama ASCII mostrando T1 → T2 → T3 etc.]

## Sub-issues (Linear)
| Task | Issue |
|---|---|
[Deixar vazio por ora — será preenchido após a criação dos sub-issues no Step 5]

---

**Specs no repositório:** `.specs/features/ISSUE-ID/` (`spec.md`, `plan.md`, `tasks.md`)
**ADRs:** [liste cada ADR criado durante a fase Plan, formato: `docs/adr/NNN-title.md`]
```

Substitua `ISSUE-ID` pelo valor real de `LINEAR_ISSUE_ID`.

Se nenhum ADR foi criado (fase Plan skipada ou sem decisões significativas), omita a linha **ADRs** do rodapé em vez de escrever "nenhum".

### Step 3: Atualizar o issue pai

Chame `save_issue` com:
- `id`: o valor de `LINEAR_ISSUE_ID`
- `description`: o markdown completo montado no Step 2

Confirme o sucesso ao usuário antes de prosseguir.

### Step 4: Criar sub-issues para cada task

Para cada task definida no `tasks.md` (cada entrada sob `## Task Breakdown`), crie um sub-issue no Linear.

**Formato do título:** `[TASK-ID] — [task title]`
Exemplos: `L1 — design-system`, `T2 — implement-auth-service`

**Formato da descrição de cada sub-issue:**

```markdown
## O que fazer
[Conteúdo do campo **What** da task no tasks.md]

## Onde
[Conteúdo do campo **Where** da task no tasks.md]

## Concluído quando
[Conteúdo do checklist **Done when** da task no tasks.md, como lista de bullets]

## Dependências
[Conteúdo do campo **Depends on** da task — se nenhuma: "Nenhuma"]

## Requisito rastreável
[Conteúdo do campo **Requirement** da task — o ID de requisito do spec que esta task satisfaz]
```

Chame `save_issue` para cada task com:
- `title`: título formatado acima
- `description`: descrição formatada acima
- `parentId`: o `LINEAR_ISSUE_UUID` capturado no Hook 1 Step 3 (UUID interno, não o identifier legível como "LIN-100")
- `teamId`: o team ID capturado no Hook 1 Step 3

> **Atenção:** `parentId` exige o UUID interno, não o identifier legível (ex: "LIN-100"). Sempre use o campo `id` da resposta do `get_issue`, não o campo `identifier`.

Processe os sub-issues **sequencialmente** (não em paralelo) para isolar falhas por task e garantir ordem previsível.

### Step 5: Atualizar a tabela Sub-issues no issue pai

Após criar todos os sub-issues, colete suas URLs e IDs do Linear. Atualize a tabela `## Sub-issues (Linear)` na descrição do issue pai com uma linha por sub-issue criado:

| Task | Issue |
|---|---|
| `[TASK-ID] — [título]` | [URL do issue no Linear] |

Chame `save_issue` novamente no issue pai com a descrição atualizada.

### Step 6: Confirmar conclusão

Reporte ao usuário:
- Issue pai `LINEAR_ISSUE_ID` foi atualizado com o conteúdo das specs.
- N sub-issues criados: liste cada um com sua URL do Linear.
- Localização das specs: `.specs/features/[LINEAR_ISSUE_ID]/`

---

## Tratamento de Erros

| Cenário | Comportamento |
|---|---|
| MCP não configurado | Informa o usuário com link de setup. Skipa todos os steps do Linear. Prossegue com SDD normalmente. |
| Usuário diz "não" ao Linear | Armazena `LINEAR_ISSUE_ID = none`. Ambos os hooks silenciados para toda a sessão. |
| `get_issue` falha (não encontrado / sem permissão) | Avisa o usuário. Skipa enriquecimento de contexto. Prossegue para Specify sem Linear. |
| `save_issue` falha na atualização do pai | Avisa o usuário e exibe o markdown completo para que possa ser colado manualmente no Linear. |
| `save_issue` falha num sub-issue | Registra qual task falhou com seu erro. Continua criando os sub-issues restantes. Reporta todas as falhas no final. |
| Formato do ID incorreto | Pede ao usuário para confirmar o formato do ID (ex: LIN-100). Tenta uma vez; se ainda inválido, skipa. |

---

## Dicas de implementação

- Se `list_teams` for necessário para resolver o `teamId`, chame uma vez e reutilize o resultado — não chame repetidamente.
- Os caminhos dos artefatos de spec seguem o padrão `.specs/features/[LINEAR_ISSUE_ID]/` — o nome da pasta coincide com o identifier do issue.
- Se o `tasks.md` usar um prefixo de task não-padrão (ex: `L1`, `B3` em vez de `T1`), preserve o prefixo exato no título do sub-issue.
- Se a fase Tasks foi skipada pelo auto-sizing (escopo pequeno), este hook Post-Tasks não se aplica — não há `tasks.md` para processar.
