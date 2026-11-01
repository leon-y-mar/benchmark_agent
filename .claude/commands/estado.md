---
description: Muestra si el agente se acerca al criterio humano
---

Lee `log.json`. Responde:
1. Tabla por tarea y ronda: precisión, tasa top, recall proxy, insights
   aceptados, cobertura del feedback, versión del harness.
2. Tendencia de precisión y recall entre tareas (ronda 1 de cada tarea: es la
   que mide aprendizaje entre tareas; las rondas 2+ miden corrección dentro
   de la tarea).
3. Learnings activos y cuántas veces se repitieron.
4. Si hay menos de 5 tareas: "Muestra insuficiente para afirmar mejora;
   reporta como tendencia".
No calcules nada que no esté en los archivos. `null` se excluye y se reporta.
