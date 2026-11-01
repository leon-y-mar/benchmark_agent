# Fuentes de referencias

Revisado el 2026-11-01. "Verificado en sesión" = probado con la herramienta en
este entorno. El resto viene de búsqueda web (links abajo) y hay que
confirmarlo antes de pagar.

| Fuente | Qué es | ¿MCP? | Encaje para order & pay mobile | Estado |
|---|---|---|---|---|
| **Mobbin** | Galería de pantallas, flujos y secciones de apps reales (iOS y web) | Sí, oficial. Herramientas: `search_screens`, `search_flows`, `search_sections`, colecciones | Alto. Es la fuente principal | Verificado en sesión: `search_flows` devolvió Grill'd (Creating a table order), Blackbird (Paying an order) y Swiggy (Pay a bill) |
| **Refero** | Pantallas y flujos, sesgo a web/SaaS | Sí, oficial (`https://api.refero.design/mcp`), requiere Refero Pro; 8.000 llamadas/mes | Bajo-medio: fuerte en web/SaaS, no en restaurantes mobile | No verificado (la doc oficial no abre desde este entorno) |
| **Nicelydone** | Pantallas y flujos de productos SaaS | Sí, oficial, OAuth | Bajo: foco en dashboards, settings, pricing | No verificado. Las cifras de tamaño no coinciden entre fuentes |
| **Page Flows** | Grabaciones de flujos completos (video + capturas) | No encontré MCP | Medio: útil para ver transiciones | Manual |
| **Baymard Institute** | Investigación UX con puntajes, no galería | No | Alto como **evidencia**, no como inspiración. Tiene un benchmark de Food Delivery & Takeout (ago. 2026, 8 sitios/apps, 390+ parámetros). El detalle es de pago | Manual |
| **Screenlane, Pttrns, UI Sources, Lapa Ninja** | Galerías de inspiración | No encontré MCP | Bajo-medio, catálogos más chicos | Manual |
| **Capturas propias** | Apps de tu mercado que no están en galerías | — | Alto para competencia local | Manual: pégalas en `faltantes` |

## Recomendación V0
1. **Mobbin** como única fuente automática. Ya lo pagas y funciona.
2. **Capturas propias** para competencia local: el loop las registra como
   `fuente: humano`. Si se repiten, es la señal para sumar otra fuente.
3. **Baymard** solo cuando la decisión necesita evidencia ("¿el resumen antes
   de pagar reduce abandono?"), no para inspiración.
4. Refero o Nicelydone: no por ahora. Su catálogo apunta a SaaS/web. Reevalúa
   si los benchmarks pasan a web.

## Límite conocido de Mobbin para este caso
En la prueba de humo, 3 de 3 flujos de "restaurant mobile order and pay at the
table" fueron de Australia (Grill'd), EE. UU. (Blackbird) e India (Swiggy).
Una sola búsqueda no basta para concluir cobertura, pero si tu mercado es
Latinoamérica, mide en las primeras tareas cuántos `faltantes` son apps
locales. Ese número te dice si Mobbin alcanza.

## Fuentes
- Mobbin: herramientas MCP en esta sesión (2026-11-01)
- Refero MCP: https://www.producthunt.com/p/refero/refero-mcp · https://doc.refero.design/mcp/getting-started.md
- Nicelydone MCP: https://vzero.nicelydone.club/mcp · https://www.producthunt.com/p/nicely-done/nicelydone-mcp
- Page Flows: https://producthunt.com/posts/page-flows-2-0
- Baymard Food Delivery & Takeout 2026: https://baymard.com/research-articles/food-delivery-and-takeout-ux-benchmark-2026
- Alternativas generales: https://www.toolworthy.ai/blog/mobbin-alternatives · https://coolcuration.com/mobbin-review-is-it-worth-it
