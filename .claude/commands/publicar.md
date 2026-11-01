---
description: Publica la última ronda en Figma como tablero para feedback
argument-hint: <id>
---

Publica la última ronda de `$ARGUMENTS` en Figma:

1. Lee `brief.md` (URL Figma destino → fileKey) y la última
   `rondas/rNN/referencias.json`.
2. Carga la skill `figma-use`. `create_session` con el fileKey.
3. Toma `scripts/figma/publicar-tablero.js`, reemplaza `__DATA__` por el JSON
   de la ronda (solo los campos que usa el script) y ejecútalo con `use_figma`.
   El script falla si la sección `ronda/rNN` ya existe: no la borres, avisa.
4. Imágenes: el script devuelve `{ref_id: nodeId}` de cada rectángulo `img`.
   - Descarga cada `image_url` a `tasks/$ARGUMENTS/rondas/rNN/img/` (expiran a
     los 30 días según Mobbin: guardarlas sirve de archivo).
   - `upload_assets` con `count` y `nodeIds` en el mismo orden; haz POST de
     los bytes a cada URL con su Content-Type.
   - Si la descarga o el POST fallan por red, deja las tarjetas sin imagen y
     di qué host bloqueó (ver `docs/setup.md`).
5. Guarda en `rondas/rNN/figma.json`: fileKey, pageId, sectionId, nodeIds, fecha,
   y si las imágenes subieron.
6. Commit `bench($ARGUMENTS): publicar rNN`.
7. Dile al humano, en este formato:
   - Link al archivo/página
   - "En cada tarjeta escribe en `estado`: **si**, **no** o **top**; en
     `por-que`, una línea (opcional pero es lo que más enseña). En
     `faltantes` pega apps o links que tú habrías incluido."
   - "Luego corre `/feedback $ARGUMENTS`."
