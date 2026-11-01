#!/usr/bin/env python3
"""Métricas de una ronda: compara la propuesta del agente con el feedback humano.

Uso: python3 scripts/metricas.py tasks/<id>/rondas/<rNN>
Lee referencias.json y feedback.json; escribe metricas.json e imprime el resultado.
No estima nada: si falta un dato, el valor es null.
"""
import json
import sys
from pathlib import Path


def ratio(a, b):
    return round(a / b, 3) if b else None


def main(d: Path):
    prop = json.loads((d / "referencias.json").read_text())
    fb = json.loads((d / "feedback.json").read_text())

    fb_refs = {r["id"]: r for r in fb.get("refs", [])}
    fb_ins = {i["id"]: i for i in fb.get("insights", [])}

    def estados(items, fbmap):
        out = {"top": 0, "si": 0, "no": 0, "pendiente": 0, "otro": 0, "eliminada": 0}
        for it in items:
            e = fbmap.get(it["id"], {}).get("estado", "eliminada")
            out[e] = out.get(e, 0) + 1
        return out

    refs = prop.get("refs", [])
    ins = prop.get("insights", [])
    er = estados(refs, fb_refs)
    ei = estados(ins, fb_ins)

    # Una tarjeta borrada por el humano cuenta como rechazo.
    acept = er["top"] + er["si"]
    rech = er["no"] + er["eliminada"]
    evaluadas = acept + rech
    faltantes = len(fb.get("faltantes", []))

    con_motivo = sum(1 for r in fb.get("refs", []) if r.get("estado") == "no" and r.get("por_que"))

    m = {
        "tarea": prop.get("tarea"),
        "ronda": prop.get("ronda"),
        "harness_version": prop.get("harness_version"),
        "refs_propuestas": len(refs),
        "refs_estados": er,
        "cobertura_feedback": ratio(evaluadas, len(refs)),
        # De lo que el humano evaluó, cuánto aceptó.
        "precision": ratio(acept, evaluadas),
        "tasa_top": ratio(er["top"], evaluadas),
        # Proxy de recall: lo aceptado frente a lo aceptado + lo que el humano tuvo que traer.
        "recall_proxy": ratio(acept, acept + faltantes),
        "faltantes_humano": faltantes,
        "rechazos_con_motivo": ratio(con_motivo, er["no"]),
        "insights_propuestos": len(ins),
        "insights_estados": ei,
        "insights_aceptados": ratio(ei["top"] + ei["si"], ei["top"] + ei["si"] + ei["no"] + ei["eliminada"]),
        "estados_no_reconocidos": [r for r in fb.get("refs", []) + fb.get("insights", []) if r.get("estado") == "otro"],
        "tiempos": prop.get("tiempos"),
    }
    (d / "metricas.json").write_text(json.dumps(m, ensure_ascii=False, indent=2) + "\n")
    print(json.dumps(m, ensure_ascii=False, indent=2))
    if m["estados_no_reconocidos"]:
        print("\n[REVISAR] Hay estados que no son si/no/top: pregúntale al humano qué quiso decir.")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(Path(sys.argv[1]))
