# El loop: cómo el agente se acerca a tu criterio

"Benchmark como yo" no se puede mejorar si no se mide. El loop convierte tu
feedback en Figma en tres cosas: **métricas**, **learnings** y **perfil**.

```
           ┌────────────── memory/perfil.md + learnings.md ◄──────────┐
           ▼                                                          │ apruebas
  brief ─► benchmarker ─► referencias.json ─► Figma ─► tú marcas ─► feedback.json
                                                                       │
                                                         metricas.py + analista
```

## Dos loops
| Loop | Dentro de | Qué mide | Señal de mejora |
|---|---|---|---|
| Corrección | una tarea (r01 → r02 → …) | si el agente aplica tu feedback | precisión r02 > r01 |
| Aprendizaje | entre tareas (r01 de cada tarea) | si el agente ya piensa como tú sin ayuda | precisión y recall de **r01** suben de tarea en tarea |

El segundo es el que importa. Si solo sube el primero, el agente obedece pero
no aprende.

## Métricas (`scripts/metricas.py`)
| Métrica | Fórmula | Pregunta |
|---|---|---|
| `precision` | (top + si) / evaluadas | ¿Elige lo que yo elegiría? |
| `tasa_top` | top / evaluadas | ¿Encuentra lo que yo destacaría? |
| `recall_proxy` | aceptadas / (aceptadas + faltantes) | ¿Se le escapa lo que yo sí traería? |
| `insights_aceptados` | insights si+top / evaluados | ¿Concluye lo que yo concluiría? |
| `cobertura_feedback` | evaluadas / propuestas | ¿Cuánto marqué? (si es bajo, las otras no valen) |
| `rechazos_con_motivo` | "no" con por qué / "no" | ¿Le estoy dando material para aprender? |

Una tarjeta borrada cuenta como `no`. Una sin marcar es `pendiente` y no cuenta.

## Esquema de `log.json` (una fila por ronda)
```json
{
  "tarea": "", "ronda": "", "fecha": "", "harness_version": "",
  "refs_propuestas": 0, "precision": null, "tasa_top": null,
  "recall_proxy": null, "insights_aceptados": null,
  "cobertura_feedback": null, "faltantes_humano": 0,
  "learnings_aprobados": 0, "minutos_ronda": null,
  "mobbin_disponible": true, "imagenes_en_figma": true
}
```

## Reglas para que el loop no se engañe
- Solo apruebas tú. El agente propone máx. 3 learnings por ronda, con evidencia.
- Un learning repetido x3 sube a `perfil.md` o al agente, con nueva versión.
- Cada cambio al harness sube versión en `CHANGELOG.md`; así sabes si una mejora
  vino del harness o de la tarea.
- Con menos de 5 tareas, solo hay tendencia, no mejora demostrada.
- **Calibración en sombra (recomendado en la primera tarea):** haz tú el mismo
  benchmark en paralelo, sin ver el del agente, y pásalo por `/calibrar`. Es la
  única forma de tener un recall real y no solo el proxy de `faltantes`.
