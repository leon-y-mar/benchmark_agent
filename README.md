# Benchmark Agent

Agente especialista en benchmarking de UX/UI. Busca referencias reales en
Mobbin, las publica en Figma como tablero, recibe tu feedback ahí y aprende,
ronda a ronda, a hacer benchmark como tú.

**Versión:** v0.1.0 (ver `CHANGELOG.md`)

```
pedido (Claude o Figma) ─► brief ─► benchmarker (Mobbin) ─► tablero en Figma
        ▲                                                        │
        │                                   tú: si · no · top + por qué + faltantes
        │                                                        ▼
  perfil + learnings ◄── apruebas ◄── analista ◄── métricas ◄── feedback.json
```

| Pieza | Archivo | Rol |
|---|---|---|
| Orquestador | `CLAUDE.md` | Valida, delega, publica en Figma, registra |
| Benchmarker | `.claude/agents/benchmarker.md` | Busca, mira, selecciona, agrupa, concluye |
| Analista | `.claude/agents/analista.md` | Explica la distancia entre lo propuesto y tu criterio |
| Tu criterio | `memory/perfil.md`, `memory/learnings.md`, `calibracion/` | Lo que el agente intenta imitar |
| Medición | `scripts/metricas.py`, `log.json` | Si se está acercando o no |

## Comandos
| Comando | Cuándo |
|---|---|
| `/calibrar [url-figma]` | Antes de la primera tarea: entrevista + benchmarks tuyos |
| `/nueva-tarea <id> [url-figma \| texto]` | Nuevo pedido |
| `/benchmark <id>` | Corre una ronda |
| `/publicar <id>` | Lleva la ronda a Figma |
| `/feedback <id>` | Lee tus marcas en Figma, mide, propone learnings |
| `/cerrar <id>` | Termina la tarea |
| `/estado` | ¿Se acerca a tu criterio? |

## Empezar
1. `docs/setup.md` (conectores y red para imágenes)
2. `/calibrar` con 1–2 benchmarks tuyos en Figma
3. `/nueva-tarea s01-order-and-pay benchmark para un flujo de mobile order & pay`

Más: `docs/loop.md` (cómo aprende y qué mide) · `docs/fuentes.md` (Mobbin y alternativas).
