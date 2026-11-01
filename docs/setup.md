# Setup

## Conectores (claude.ai → Settings → Connectors)
- **Mobbin**: herramientas `mcp__Mobbin__*`. Verificado en la sesión del 2026-11-01.
- **Figma**: herramientas `mcp__Figma__*` (`use_figma`, `upload_assets`,
  `get_metadata`, `get_screenshot`). Verificado con `whoami`.

Cada persona que corra el agente necesita sus propios conectores.

## Red en Claude Code en la nube (importante para las imágenes)
Para pegar las capturas en Figma, el agente descarga `image_url` de Mobbin y la
sube con `upload_assets`. En la sesión del 2026-11-01 el proxy de red
**rechazó `mobbin.com`** (y `api.figma.com`). Sin eso, las tarjetas se
publican sin imagen, solo con el link a Mobbin.

Para habilitarlo: menú del entorno en la barra de título de la sesión → Edit →
Network access → agrega `mobbin.com` en Allowed domains (y el host de subida
que devuelva `upload_assets` si también lo bloquea). Pasos oficiales:
https://code.claude.com/docs/en/cloud-environments#network-access

Alternativa: correr el agente en Claude Code local (desktop o CLI), donde no
hay proxy de red.

## Prueba de humo
En una sesión nueva:
```
Lee CLAUDE.md. Dime: 1) qué subagentes ves, 2) si mcp__Mobbin__* responde
(una búsqueda de prueba), 3) si mcp__Figma__whoami responde, 4) si puedes
descargar una image_url de Mobbin con curl. No ejecutes ninguna tarea.
```

## Ciclo de una tarea
| Paso | Dónde | Qué |
|---|---|---|
| 1 | Claude | `/nueva-tarea s01-order-and-pay benchmark para un flujo de mobile order & pay` |
| 2 | Claude | Respondes lo que falte del brief |
| 3 | Claude | `/benchmark s01-order-and-pay` → `/publicar s01-order-and-pay` |
| 4 | Figma | Marcas `estado`, `por-que`, `faltantes` |
| 5 | Claude | `/feedback s01-order-and-pay` → apruebas learnings |
| 6 | Claude | Otra ronda o `/cerrar` |
| 7 | GitHub | Merge a `main`: cada sesión nueva clona `main`, sin merge no ve los learnings |
