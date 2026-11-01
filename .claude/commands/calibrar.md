---
description: Construye o actualiza el perfil de cómo el humano hace benchmark
argument-hint: [url-de-figma-de-un-benchmark-tuyo]
---

Objetivo: llenar `memory/perfil.md` con datos del humano, no con supuestos.

1. Si hay URL de Figma: carga `figma-use`, `create_session`, lee el benchmark
   (estructura, nº de refs, cómo agrupa, cómo anota, qué fuentes usa) con
   `get_metadata` y `get_screenshot`. Escribe lo observado en
   `calibracion/<nombre>.md` con el template `templates/calibracion.md`.
   Solo lo que se ve en el archivo; lo que no se ve, "no observado".
2. Entrevista: haz las preguntas de `memory/perfil.md` que estén vacías, de a
   máximo 4 por mensaje. Cita al humano literal.
3. Muestra el diff propuesto de `perfil.md` y pide aprobación antes de escribir.
4. Commit `bench(calibracion): perfil`.
