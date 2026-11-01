// Publica una ronda de benchmark como tablero de feedback en Figma.
// Uso: el orquestador reemplaza __DATA__ por el JSON de la ronda y ejecuta con
// use_figma (después de cargar la skill figma-use y create_session).
//
// CONVENCIÓN DE NOMBRES (no cambiar: leer-feedback.js depende de ella)
//   página   benchmark/<tarea>
//   sección  ronda/<rNN>
//   tarjeta  ref/<id>      → hijos TEXT: estado, por-que · RECTANGLE: img
//   tarjeta  insight/<id>  → hijos TEXT: estado, por-que
//   tarjeta  faltantes     → hijo TEXT: faltantes
//
// DATA = { tarea, ronda, pregunta_guia, decision, clusters:[{id,nombre,descripcion}],
//          refs:[{id,app,tipo,plataforma,mobbin_url,momento,cluster,patron,observacion,por_que_sirve}],
//          insights:[{id,texto,refs:[]}] }

const DATA = __DATA__;

const R = { family: "Inter", style: "Regular" };
const B = { family: "Inter", style: "Bold" };
await figma.loadFontAsync(R);
await figma.loadFontAsync(B);

const GRAY = { r: 0.45, g: 0.45, b: 0.45 };
const LINE = { r: 0.88, g: 0.88, b: 0.88 };
const WHITE = { r: 1, g: 1, b: 1 };
const PENDING = { r: 1, g: 0.96, b: 0.8 };

// Página
let page = figma.root.children.find(p => p.name === `benchmark/${DATA.tarea}`);
if (!page) { page = figma.createPage(); page.name = `benchmark/${DATA.tarea}`; }
await figma.setCurrentPageAsync(page);

const secName = `ronda/${DATA.ronda}`;
if (page.children.some(n => n.name === secName)) {
  throw new Error(`${secName} ya existe en ${page.name}: no se sobrescribe una ronda publicada`);
}

function text(chars, { size = 14, bold = false, color, width, name, url } = {}) {
  const t = figma.createText();
  t.fontName = bold ? B : R;
  t.fontSize = size;
  t.characters = chars || "—";
  if (color) t.fills = [{ type: "SOLID", color }];
  if (name) t.name = name;
  if (width) { t.resize(width, t.height); t.textAutoResize = "HEIGHT"; }
  if (url) t.setRangeHyperlink(0, t.characters.length, { type: "URL", value: url });
  return t;
}

function card(name, width) {
  const f = figma.createAutoLayout("VERTICAL", { name, itemSpacing: 8 });
  f.paddingTop = f.paddingBottom = f.paddingLeft = f.paddingRight = 16;
  f.cornerRadius = 12;
  f.fills = [{ type: "SOLID", color: WHITE }];
  f.strokes = [{ type: "SOLID", color: LINE }];
  f.counterAxisSizingMode = "FIXED";
  f.resize(width, f.height);
  return f;
}

// Campos que llena el humano
function feedbackFields(parent, inner) {
  parent.appendChild(text("Tu veredicto → escribe: si · no · top", { size: 11, color: GRAY, width: inner }));
  const estado = text("?", { size: 16, bold: true, name: "estado", width: inner });
  estado.fills = [{ type: "SOLID", color: { r: 0.1, g: 0.1, b: 0.1 } }];
  const box = figma.createAutoLayout("VERTICAL", { name: "estado-box" });
  box.paddingTop = box.paddingBottom = box.paddingLeft = box.paddingRight = 8;
  box.cornerRadius = 6;
  box.fills = [{ type: "SOLID", color: PENDING }];
  box.appendChild(estado);
  parent.appendChild(box);
  parent.appendChild(text("Por qué (1 línea):", { size: 11, color: GRAY, width: inner }));
  parent.appendChild(text("—", { size: 13, name: "por-que", width: inner }));
}

const CARD_W = 320, INNER = CARD_W - 32, IMG_H = 560;
const created = [];
const imgNodes = {};

const board = figma.createAutoLayout("VERTICAL", { name: `tablero/${DATA.ronda}`, itemSpacing: 48 });
board.paddingTop = board.paddingBottom = board.paddingLeft = board.paddingRight = 64;
board.fills = [{ type: "SOLID", color: { r: 0.97, g: 0.97, b: 0.97 } }];

// Encabezado
const head = figma.createAutoLayout("VERTICAL", { name: "encabezado", itemSpacing: 8 });
head.fills = [];
head.appendChild(text(`Benchmark · ${DATA.tarea} · ${DATA.ronda}`, { size: 32, bold: true }));
head.appendChild(text(`Pregunta guía: ${DATA.pregunta_guia}`, { size: 18, width: 1200 }));
if (DATA.decision) head.appendChild(text(`Decisión que alimenta: ${DATA.decision}`, { size: 16, color: GRAY, width: 1200 }));
board.appendChild(head);

// Clusters con sus referencias
for (const c of DATA.clusters) {
  const block = figma.createAutoLayout("VERTICAL", { name: `cluster/${c.id}`, itemSpacing: 16 });
  block.fills = [];
  block.appendChild(text(c.nombre, { size: 22, bold: true }));
  if (c.descripcion) block.appendChild(text(c.descripcion, { size: 14, color: GRAY, width: 1200 }));
  const row = figma.createAutoLayout("HORIZONTAL", { name: "refs", itemSpacing: 24 });
  row.fills = [];
  for (const r of DATA.refs.filter(x => x.cluster === c.id)) {
    const k = card(`ref/${r.id}`, CARD_W);
    const img = figma.createRectangle();
    img.name = "img";
    img.resize(INNER, IMG_H);
    img.cornerRadius = 8;
    img.fills = [{ type: "SOLID", color: LINE }];
    k.appendChild(img);
    imgNodes[r.id] = img.id;
    k.appendChild(text(`${r.app} · ${r.tipo} · ${r.plataforma}`, { size: 14, bold: true, width: INNER }));
    if (r.momento) k.appendChild(text(`Momento: ${r.momento}`, { size: 12, color: GRAY, width: INNER }));
    k.appendChild(text(r.patron, { size: 13, bold: true, width: INNER }));
    k.appendChild(text(r.observacion, { size: 13, width: INNER }));
    k.appendChild(text(`Sirve porque: ${r.por_que_sirve}`, { size: 12, color: GRAY, width: INNER }));
    k.appendChild(text(r.mobbin_url ? "Abrir en Mobbin ↗" : "sin link", { size: 12, width: INNER, url: r.mobbin_url }));
    feedbackFields(k, INNER);
    row.appendChild(k);
    created.push(k.id);
  }
  block.appendChild(row);
  board.appendChild(block);
}

// Insights
const ins = figma.createAutoLayout("VERTICAL", { name: "insights", itemSpacing: 16 });
ins.fills = [];
ins.appendChild(text("Insights", { size: 22, bold: true }));
const insRow = figma.createAutoLayout("HORIZONTAL", { name: "insights-row", itemSpacing: 24 });
insRow.fills = [];
for (const i of DATA.insights) {
  const k = card(`insight/${i.id}`, 380);
  k.appendChild(text(i.texto, { size: 15, bold: true, width: 348 }));
  k.appendChild(text(`Refs: ${(i.refs || []).join(", ")}`, { size: 12, color: GRAY, width: 348 }));
  feedbackFields(k, 348);
  insRow.appendChild(k);
  created.push(k.id);
}
ins.appendChild(insRow);
board.appendChild(ins);

// Faltantes
const f = card("faltantes", 780);
f.appendChild(text("¿Qué falta? Pega apps, links o capturas que tú habrías incluido (una por línea).", { size: 15, bold: true, width: 748 }));
f.appendChild(text("—", { size: 13, name: "faltantes", width: 748 }));
board.appendChild(f);

// Sección a la derecha de lo existente
const maxX = page.children.reduce((m, n) => Math.max(m, n.x + n.width), 0);
const section = figma.createSection();
section.name = secName;
section.appendChild(board);
board.x = 80; board.y = 80;
section.resizeWithoutConstraints(board.width + 160, board.height + 160);
section.x = maxX ? maxX + 400 : 0;
section.y = 0;

return {
  pageId: page.id,
  sectionId: section.id,
  boardId: board.id,
  cardIds: created,
  imgNodes, // { ref_id: rectNodeId } → upload_assets nodeIds en este orden
};
