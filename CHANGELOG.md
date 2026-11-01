# Changelog del harness

Cada cambio a CLAUDE.md, agentes, comandos, scripts o perfil sube versión.
`log.json` registra con qué versión corrió cada ronda.

## v0.1.0 · V0
- Orquestador (`CLAUDE.md`) con chequeo de brief bloqueante.
- Subagentes `benchmarker` (Mobbin) y `analista` (feedback → learnings).
- Comandos: `/nueva-tarea`, `/benchmark`, `/publicar`, `/feedback`,
  `/calibrar`, `/cerrar`, `/estado`.
- Tablero en Figma con campos de feedback (`estado`, `por-que`, `faltantes`)
  y lector que los convierte a `feedback.json`.
- `scripts/metricas.py`: precisión, tasa top, recall proxy, insights aceptados.
- `memory/perfil.md` vacío: se llena con `/calibrar`.
- `docs/fuentes.md`: Mobbin y alternativas revisadas.
