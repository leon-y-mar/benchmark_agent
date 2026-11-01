// Lee el feedback humano de una ronda publicada. Solo lectura.
// Reemplazar __TAREA__ y __RONDA__ (strings) antes de ejecutar con use_figma.
const TAREA = "__TAREA__";
const RONDA = "__RONDA__";

const page = figma.root.children.find(p => p.name === `benchmark/${TAREA}`);
if (!page) throw new Error(`No existe la página benchmark/${TAREA}`);
await figma.setCurrentPageAsync(page);
const sec = page.children.find(n => n.name === `ronda/${RONDA}`);
if (!sec) throw new Error(`No existe la sección ronda/${RONDA}`);

const val = (node, name) => {
  const t = node.findOne(n => n.type === "TEXT" && n.name === name);
  return t && "characters" in t ? t.characters.trim() : null;
};
const norm = s => {
  if (!s) return "pendiente";
  const x = s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
  if (x === "?" || x === "" || x === "—") return "pendiente";
  if (/^(top|⭐|star)/.test(x)) return "top";
  if (/^(si|yes|ok|✅)/.test(x)) return "si";
  if (/^(no|❌|x$)/.test(x)) return "no";
  return "otro";
};

const cards = (prefix) => sec.findAllWithCriteria({ types: ["FRAME"] }).filter(n => n.name.startsWith(prefix)).map(c => {
  const raw = val(c, "estado");
  const why = val(c, "por-que");
  return { id: c.name.slice(prefix.length), estado: norm(raw), estado_raw: raw, por_que: why === "—" ? null : why };
});

const faltRaw = val(sec, "faltantes");
const faltantes = !faltRaw || faltRaw === "—" ? [] :
  faltRaw.split("\n").map(s => s.trim()).filter(Boolean);

// Nodos que el humano agregó dentro de la sección (capturas, notas, etc.)
const board = sec.children.find(n => n.name === `tablero/${RONDA}`);
const ajenos = sec.children.filter(n => n !== board).map(n => ({ id: n.id, name: n.name, type: n.type }));

return {
  tarea: TAREA,
  ronda: RONDA,
  refs: cards("ref/"),
  insights: cards("insight/"),
  faltantes,
  agregados_por_humano: ajenos,
};
