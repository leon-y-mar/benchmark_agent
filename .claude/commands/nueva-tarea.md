---
description: Crea una tarea de benchmark desde texto o desde un frame de Figma
argument-hint: <id> [url-de-figma-con-el-brief] [texto libre]
---

Crea la tarea con `$ARGUMENTS`:

1. El primer argumento es el id (kebab-case). Si `tasks/<id>/` existe, detente.
2. Crea `tasks/<id>/rondas/` y copia `templates/brief.md` a `tasks/<id>/brief.md`.
3. Completa el brief solo con lo que el humano dio:
   - **Texto libre** (ej. "benchmark para un flujo de mobile order & pay"):
     copia el pedido literal en "Pedido original" y llena los campos que dice.
   - **URL de Figma**: carga la skill `figma-use`, `create_session`, y lee el
     texto del frame con `get_metadata`/`use_figma`. Copia el texto literal en
     "Pedido original". Si el frame no tiene campos claros, no los infieras.
4. Lista los campos obligatorios vacíos (ver `CLAUDE.md`, Paso 0) y pregúntalos
   en un solo mensaje. No sigas hasta tener respuesta.
5. Con el brief completo: commit `bench(<id>): nueva tarea` y di
   "Listo. Corre `/benchmark <id>`".
