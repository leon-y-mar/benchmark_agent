---
description: Cierra una tarea de benchmark
argument-hint: <id>
---

1. Verifica que la última ronda tenga `feedback.json` y `analisis.md`.
2. Pregunta al humano (si no lo dijo): ¿cuántos minutos le tomó revisar en
   Figma? ¿cuántos le habría tomado hacer el benchmark solo? Si no sabe: `null`.
3. Escribe `tasks/$ARGUMENTS/cierre.json`: rondas, métricas por ronda,
   minutos humano, minutos estimados sin agente (marcado como "estimado por
   el humano"), refs finales `top`.
4. Commit `bench($ARGUMENTS): cierre`.
