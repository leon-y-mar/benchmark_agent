---
description: Ejecuta una ronda de benchmark (la siguiente que corresponda)
argument-hint: <id>
---

Ronda de benchmark para `$ARGUMENTS`:

1. Chequeo del brief (Paso 0 de `CLAUDE.md`). Bloqueante.
2. Ronda = siguiente `rNN` en `tasks/$ARGUMENTS/rondas/`. Si la anterior no
   tiene `feedback.json`, detente: "Falta el feedback de la ronda anterior.
   Márcalo en Figma y corre `/feedback $ARGUMENTS`."
3. En tu primer mensaje informa: versión del harness, si Mobbin responde
   (búsqueda mínima de prueba), y si `perfil.md` está vacío (si lo está,
   sugiere `/calibrar` pero sigue).
4. `date -Iseconds` → inicio. Delega en `benchmarker` con las rutas.
5. Verifica la salida antes de seguir:
   - `referencias.json` es JSON válido y sigue el esquema.
   - Cada ref tiene `mobbin_url` (o link de su fuente). Sin link, se elimina.
   - Hay ≥ 3 clusters y cada insight cita ≥ 1 ref.
6. `date -Iseconds` → fin. Guarda ambos en `referencias.json` (`tiempos`).
7. Commit `bench($ARGUMENTS): ronda rNN`.
8. Muestra: nº de refs por cluster, insights (1 línea c/u), búsquedas hechas,
   y "Corre `/publicar $ARGUMENTS` para llevarlo a Figma".
