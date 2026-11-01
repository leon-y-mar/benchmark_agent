---
description: Lee el feedback de Figma, mide la ronda y propone learnings
argument-hint: <id>
---

Feedback de la última ronda publicada de `$ARGUMENTS`:

1. Lee `rondas/rNN/figma.json`. Carga `figma-use`, `create_session`.
2. Ejecuta `scripts/figma/leer-feedback.js` (reemplaza `__TAREA__`, `__RONDA__`)
   con `use_figma`. Guarda la salida tal cual en `rondas/rNN/feedback.json`.
3. Si menos del 50% de las refs tiene estado, detente y avisa: "Solo marcaste
   X de Y. ¿Sigo con esto o completas primero?". Pendiente ≠ rechazo.
4. `python3 scripts/metricas.py tasks/$ARGUMENTS/rondas/rNN` → `metricas.json`.
5. Delega en `analista` → `rondas/rNN/analisis.md`.
6. Muestra métricas, top 3 causas de rechazo y las propuestas numeradas.
   Pregunta cuáles aprobar. Solo con aprobación explícita edita
   `memory/learnings.md` y/o `memory/perfil.md` (sube el contador si ya existía).
7. Agrega una fila de ronda a `log.json` (esquema en `docs/loop.md`).
   Dato que no exista → `null`, nunca un estimado.
8. Commit `bench($ARGUMENTS): feedback rNN`.
9. Pregunta: "¿Otra ronda (`/benchmark $ARGUMENTS`) o cerramos (`/cerrar $ARGUMENTS`)?"
