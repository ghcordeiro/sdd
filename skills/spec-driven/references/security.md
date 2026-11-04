# Security Review

**Trigger (Implement):** the change touches authentication, authorization, sessions/tokens, external input (HTTP, files, queues, CLI args), secrets or credentials, crypto, payments, PII, file system paths, shell/SQL/template execution, or permissions.

> If the host agent has a dedicated security review skill or command (e.g. `security-review`), use it instead of this file. For web headers, cookies and deprecated APIs, also run `toolkit/best-practices`.

Review the diff for this task, not the whole repo. Report each finding as **Critical** (blocks commit) / **Warning** (fix or justify) with file:line.

## Checklist

- **Input:** every value from outside the trust boundary is validated (type, length, format, allowlist). No string-built SQL, shell, paths, or templates — parameterize.
- **AuthN/AuthZ:** every new endpoint/action checks *who* and *what they may access*. Object-level checks, not just "logged in". Deny by default.
- **Secrets:** none in code, logs, errors, URLs, or test fixtures. Read from env/secret store. New secret → documented, not committed.
- **Data exposure:** responses and logs carry only needed fields. No stack traces or internal IDs to clients. PII minimized.
- **Paths & files:** resolved paths stay inside the intended base (check with a trailing separator). Upload type/size limited.
- **Crypto:** standard libraries only, no homemade crypto. Passwords hashed with a slow KDF. Random tokens from a CSPRNG.
- **Dependencies:** new packages are maintained, pinned, and needed. Check advisories for them.
- **Failure mode:** errors fail closed. Rate limits on auth and expensive endpoints.

Critical findings must be fixed before the commit. Record any accepted risk as an ADR.
