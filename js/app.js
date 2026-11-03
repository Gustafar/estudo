(() => {
const KEY = "foco-cgu-v1";
const $ = (s, el = document) => el.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const DAY = 864e5, LETTERS = "ABCD";
const SUBJ = Object.fromEntries(SUBJECTS.map(s => [s.id, s]));
const GTONE = { b: "g1", c: "g2", e: "g3", d: "gd" };         // cor do bloco por prova
const GSTRONG = { b: "var(--s1)", c: "var(--s2)", e: "var(--s3)", d: "var(--sd)" };
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

// ---------- estado ----------
const blank = name => ({ name, topics: {}, custom: [], cards: {}, answers: {}, sessions: [], essays: {} });
let db;
try { db = JSON.parse(localStorage.getItem(KEY)); } catch { db = null; }
if (!db || !db.profiles) db = { active: 0, profiles: [blank("Eu"), blank("Noiva")] };
const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {} };
const P = () => db.profiles[db.active];
const toast = m => { const t = $("#toast"); t.textContent = m; t.classList.add("show"); clearTimeout(toast.h); toast.h = setTimeout(() => t.classList.remove("show"), 2200); };
const startOfDay = (t = Date.now()) => { const d = new Date(t); d.setHours(0, 0, 0, 0); return +d; };
const dayKey = ts => new Date(ts).toLocaleDateString("sv");
const minutesOn = (from, subj) => P().sessions.filter(s => s.ts >= from && (!subj || s.s === subj)).reduce((a, s) => a + s.min, 0);
const fmtH = m => m >= 60 ? `${Math.floor(m / 60)}h${String(Math.round(m % 60)).padStart(2, "0")}` : `${Math.round(m)}min`;
const streak = () => { const days = new Set(P().sessions.map(s => dayKey(s.ts))); let n = 0, d = Date.now(); if (!days.has(dayKey(d))) d -= DAY; while (days.has(dayKey(d))) { n++; d -= DAY; } return n; };
const allTopics = () => SUBJECTS.flatMap(s => [
  ...TOPICS[s.id].map((t, i) => ({ id: `${s.id}:${i}`, s: s.id, t })),
  ...P().custom.filter(c => c.s === s.id).map(c => ({ id: c.id, s: s.id, t: c.t, custom: true })),
]);
const tstate = id => { const v = P().topics[id]; return v === true ? 2 : v || 0; };
const prog = filter => { const t = allTopics().filter(filter); const n1 = t.filter(x => tstate(x.id) === 1).length, n2 = t.filter(x => tstate(x.id) === 2).length; return { n1, n2, n: t.length, pct: t.length ? Math.round((n2 + n1 / 2) / t.length * 100) : 0 }; };
const wrongIds = () => MCQ.filter(q => P().answers[q.id] && !P().answers[q.id].ok);
const ring = (frac, size, inner) => { const C = 2 * Math.PI * 45; return `<div class="ring" style="width:${size}px;height:${size}px"><svg viewBox="0 0 100 100" aria-hidden="true"><circle class="bg" cx="50" cy="50" r="45"/><circle class="fg" cx="50" cy="50" r="45" stroke-dasharray="${C}" stroke-dashoffset="${C * (1 - Math.min(1, Math.max(0, frac)))}"/></svg><div class="c">${inner || ""}</div></div>`; };

// ---------- ícones e navegação ----------
const ICONS = {
  home: '<path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
  materias: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  questoes: '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
  flash: '<rect x="3" y="7" width="14" height="14" rx="3"/><path d="M7 3h11a3 3 0 0 1 3 3v11"/>',
  disc: '<path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16z"/>',
  foco: '<circle cx="12" cy="13" r="8"/><path d="M12 9v4l2.5 2M9 2h6"/>',
  plano: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
};
const ROUTES = [["home", "Início"], ["materias", "Edital"], ["questoes", "Praticar"], ["flash", "Cartões"], ["disc", "Escrever"], ["foco", "Foco"], ["plano", "Plano"]];
let route = "home", param = null;
const go = (r, p) => { route = r; param = p || null; render(); window.scrollTo(0, 0); };
function render() {
  $("#dock").innerHTML = ROUTES.map(([id, l]) => `<button data-go="${id}" aria-label="${l}" ${route === id ? 'aria-current="page"' : ""}><svg viewBox="0 0 24 24" aria-hidden="true">${ICONS[id]}</svg><span>${l}</span></button>`).join("");
  $("#profiles").innerHTML = db.profiles.map((p, i) => `<button data-prof="${i}" aria-pressed="${i === db.active}">${esc(p.name)}</button>`).join("");
  document.body.classList.toggle("in-quiz", route === "questoes" && qz.mode === "run");
  const v = $("#view"); v.innerHTML = ""; v.onclick = v.onchange = v.oninput = null;
  ({ home, materias, questoes, flash, disc, foco, plano }[route])(v);
}
document.addEventListener("click", e => {
  const g = e.target.closest("[data-go]"); if (g) { $("#menu").hidden = true; return go(g.dataset.go, g.dataset.p); }
  const p = e.target.closest("[data-prof]"); if (p) { db.active = +p.dataset.prof; save(); render(); }
  if (!e.target.closest(".who")) $("#menu").hidden = true;
});
$("#menu-btn").onclick = () => { const m = $("#menu"); m.hidden = !m.hidden; $("#menu-btn").setAttribute("aria-expanded", !m.hidden); };
$("#rename").onclick = () => { $("#menu").hidden = true; const n = prompt("Nome do perfil:", P().name); if (n && n.trim()) { P().name = n.trim().slice(0, 20); save(); render(); } };
$("#export").onclick = () => { $("#menu").hidden = true; const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([JSON.stringify(db)], { type: "application/json" })); a.download = "backup-estudos.json"; a.click(); };
$("#import").onclick = () => { $("#menu").hidden = true; $("#file").click(); };
$("#file").onchange = async e => { try { const j = JSON.parse(await e.target.files[0].text()); if (!j.profiles) throw 0; db = j; save(); render(); toast("Backup restaurado"); } catch { toast("Arquivo inválido"); } };

// ---------- paleta de comandos (Ctrl+K) ----------
let cmdSel = 0, cmdItems = [];
const cmdAll = () => [
  ...ROUTES.map(([id, l]) => ({ t: l, h: "Ir para", run: () => go(id) })),
  { t: "Treino rápido de 10 questões", h: "Ação", run: () => { qz.subj = "all"; qz.n = 10; if (buildQuiz("treino")) go("questoes"); } },
  { t: "Revisar cartões de hoje", h: "Ação", run: () => go("flash") },
  { t: "Refazer caderno de erros", h: "Ação", run: () => go("questoes", "erros") },
  { t: "Trocar de perfil", h: "Ação", run: () => { db.active = (db.active + 1) % db.profiles.length; save(); render(); } },
  ...SUBJECTS.map(s => ({ t: s.nome, h: "Matéria", run: () => go("materias", s.id) })),
];
function cmdDraw() {
  const q = $("#cmd-in").value.toLowerCase().trim();
  cmdItems = cmdAll().filter(i => !q || i.t.toLowerCase().includes(q)).slice(0, 30);
  cmdSel = Math.min(cmdSel, Math.max(0, cmdItems.length - 1));
  $("#cmd-list").innerHTML = cmdItems.map((i, k) => `<button role="option" data-k="${k}" aria-selected="${k === cmdSel}"><span>${esc(i.t)}</span><small>${i.h}</small></button>`).join("") || `<p class="mut" style="padding:16px">Nada encontrado.</p>`;
}
const cmdOpen = () => { $("#cmd").hidden = false; $("#cmd-in").value = ""; cmdSel = 0; cmdDraw(); $("#cmd-in").focus(); };
const cmdClose = () => { $("#cmd").hidden = true; };
const cmdRun = k => { const i = cmdItems[k]; if (i) { cmdClose(); i.run(); } };
$("#open-cmd").onclick = cmdOpen;
$("#cmd-in").oninput = () => { cmdSel = 0; cmdDraw(); };
$("#cmd-list").onclick = e => { const b = e.target.closest("[data-k]"); if (b) cmdRun(+b.dataset.k); };
$("#cmd").onclick = e => { if (e.target.id === "cmd") cmdClose(); };
document.addEventListener("keydown", e => {
  if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); return $("#cmd").hidden ? cmdOpen() : cmdClose(); }
  if (!$("#cmd").hidden) {
    if (e.key === "Escape") cmdClose();
    else if (e.key === "ArrowDown") { e.preventDefault(); cmdSel = Math.min(cmdSel + 1, cmdItems.length - 1); cmdDraw(); }
    else if (e.key === "ArrowUp") { e.preventDefault(); cmdSel = Math.max(cmdSel - 1, 0); cmdDraw(); }
    else if (e.key === "Enter") cmdRun(cmdSel);
  }
});

const title = (t, lead) => `<h1 class="title">${t}</h1>${lead ? `<p class="lead">${lead}</p>` : `<div style="height:16px"></div>`}`;
const back = (to, label) => `<button class="btn ghost" data-go="${to}">← ${label}</button>`;

// ---------- início ----------
function home(v) {
  const exam = new Date(EXAM.data), left = Math.max(0, Math.ceil((exam - Date.now()) / DAY));
  const t0 = new Date("2026-10-08T00:00:00-03:00"), elapsed = (Date.now() - t0) / (exam - t0);
  const plan = WEEK_PLAN[new Date().getDay()];
  const wk = minutesOn(startOfDay() - 6 * DAY), today = minutesOn(startOfDay());
  const ans = Object.values(P().answers), acc = ans.length ? ans.filter(a => a.ok).length / ans.length : 0;
  const due = CARDS.filter(c => !P().cards[c.id] || P().cards[c.id].due <= Date.now()).length;
  const wrong = wrongIds().length;
  const days = [...Array(7)].map((_, i) => { const d0 = startOfDay() - (6 - i) * DAY; return P().sessions.filter(s => s.ts >= d0 && s.ts < d0 + DAY).reduce((a, s) => a + s.min, 0); });
  const mx = Math.max(60, ...days);
  const groups = Object.entries(GROUPS).filter(([g]) => g !== "d");
  v.innerHTML = `<p class="mut" style="margin:14px 0 18px">Olá, <b style="color:var(--ink)">${esc(P().name)}</b>. Esta é a sua semana de estudo.</p>
  <div class="bento">
    <div class="tile ink span3 row2 m2" style="display:flex;flex-direction:column;justify-content:space-between;min-height:360px">
      <div><h2>Faltam</h2><div class="count">${left}</div><p style="font-size:22px;font-weight:700;margin-top:10px">${left === 1 ? "dia" : "dias"} para a prova</p></div>
      <div><div style="height:8px;border-radius:99px;background:rgba(255,255,255,.15);overflow:hidden"><div style="height:100%;width:${Math.min(100, Math.max(2, elapsed * 100))}%;background:var(--lime);border-radius:99px"></div></div>
      <p class="sm" style="margin-top:10px;opacity:.7">${exam.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })} · desde a abertura do edital</p></div></div>
    <div class="tile lime span3 m2"><h2>Missão de hoje · ${plan.d}</h2><p class="mid" style="font-size:clamp(22px,2.6vw,30px);line-height:1.1;margin-bottom:14px">${esc(plan.t)}</p>
      <div class="chips" style="margin-bottom:18px">${plan.subj.map(s => `<span class="pill" style="background:rgba(22,22,46,.12)">${esc(SUBJ[s].nome)}</span>`).join("")}</div><button class="btn" data-go="foco">Começar foco</button></div>
    <div class="tile g2 span2"><h2>Sequência</h2><div class="mid">${streak()} <span style="font-size:16px;letter-spacing:0;font-family:var(--ui)">dias</span></div>
      <div class="bars" aria-label="Minutos por dia na última semana">${days.map(m => `<div style="height:${Math.max(6, m / mx * 100)}%"></div>`).join("")}</div><p class="sm" style="margin-top:8px"><b>${fmtH(today)}</b> hoje · <b>${fmtH(wk)}</b> na semana</p></div>
    <div class="tile g1 span1" style="display:grid;place-items:center;text-align:center">${ring(acc, 104, `<b class="disp" style="font-size:22px">${ans.length ? Math.round(acc * 100) + "%" : "–"}</b>`)}<p class="sm" style="margin-top:6px;font-weight:600">acertos</p></div>
    <div class="tile span4 row2 m2"><h2>Mapa do edital · toque em um quadrado para abrir o tópico</h2><div class="mosaic">${groups.map(([g, gn]) => `<div class="mgroup"><b>${esc(gn)}</b><div class="cells">${allTopics().filter(t => SUBJ[t.s].g === g).map(t => `<button class="cell k${tstate(t.id)}" style="--c:${GSTRONG[g]}" data-go="materias" data-p="${t.s}" title="${esc(t.t)}" aria-label="${esc(t.t)}"></button>`).join("")}</div></div>`).join("")}</div>
      <div class="leg"><span><i style="background:var(--fill)"></i>não iniciado</span><span><i style="background:color-mix(in srgb,var(--s3) 45%,var(--fill))"></i>estudando</span><span><i style="background:var(--s3)"></i>dominado</span></div></div>
    <button class="tile g3 span2 click" data-go="flash"><h2>Cartões</h2><div class="mid">${due}</div><p style="font-weight:600;margin-top:6px">para revisar hoje</p></button>
    <button class="tile gd span2 click" data-go="questoes" data-p="erros"><h2>Caderno de erros</h2><div class="mid">${wrong}</div><p style="font-weight:600;margin-top:6px">${wrong ? "questões para refazer" : "nada pendente"}</p></button>
  </div>`;
}

// ---------- edital (matérias) ----------
function materias(v) {
  if (!param) {
    v.innerHTML = title("Edital", "Cada bloco é uma matéria do item 15 do edital. Abra e vá marcando o que você domina.") +
      Object.entries(GROUPS).map(([g, gn]) => `<h2 class="disp" style="font-size:18px;margin:28px 0 14px">${esc(gn)}</h2><div class="bento">${SUBJECTS.filter(s => s.g === g).map(s => { const p = prog(t => t.s === s.id); return `<button class="tile click subj ${GTONE[g]} span2" data-go="materias" data-p="${s.id}"><div class="t">${esc(s.nome)}</div><div><div class="p">${p.pct}%</div><div class="sm" style="font-weight:600">${p.n2} de ${p.n} dominados</div></div></button>`; }).join("")}</div>`).join("");
    return;
  }
  const s = SUBJ[param], items = allTopics().filter(t => t.s === param), p = prog(t => t.s === param), nq = MCQ.filter(q => q.s === param).length;
  v.innerHTML = `<div style="margin-top:12px">${back("materias", "Edital")}</div>${title(esc(s.nome), `${p.n2} dominados, ${p.n1} em estudo, ${p.n - p.n2 - p.n1} por começar · ${fmtH(minutesOn(0, param))} estudadas`)}
  <div class="chips" style="margin-bottom:22px">${nq ? `<button class="btn lime" data-go="questoes" data-p="s:${param}">Praticar ${nq} questões</button>` : ""}<button class="btn ghost" data-go="flash">Cartões</button></div>
  <p class="mut sm" style="margin-bottom:12px">Toque em um tópico para mudar o estado: por começar, em estudo, dominado.</p>
  ${items.map(t => { const k = tstate(t.id); return `<button class="topic k${k}" data-t="${t.id}"><span class="state k${k}">${k === 2 ? "✓" : ""}</span><span class="tt" style="flex:1">${esc(t.t)}</span>${t.custom ? `<span class="sm mut" data-del="${t.id}">remover</span>` : ""}</button>`; }).join("")}
  <form id="addf" style="display:flex;gap:10px;margin-top:20px"><input id="newt" placeholder="Adicionar um tópico seu" aria-label="Novo tópico"><button class="btn">Adicionar</button></form>`;
  v.onclick = e => {
    const d = e.target.closest("[data-del]"); if (d) { P().custom = P().custom.filter(c => c.id !== d.dataset.del); save(); return materias(v); }
    const b = e.target.closest("[data-t]"); if (b) { P().topics[b.dataset.t] = (tstate(b.dataset.t) + 1) % 3; save(); const y = scrollY; materias(v); scrollTo(0, y); }
  };
  $("#addf").onsubmit = e => { e.preventDefault(); const t = $("#newt").value.trim(); if (!t) return; P().custom.push({ id: "x" + Date.now(), s: param, t }); save(); materias(v); };
}

// ---------- praticar (questões) ----------
let qz = { mode: "menu", kind: "treino", subj: "all", n: 10, list: [], i: 0, combo: 0 };
function buildQuiz(kind) {
  let pool = MCQ.filter(q => qz.subj === "all" || q.s === qz.subj);
  if (kind === "erros") pool = wrongIds();
  pool = shuffle(pool);
  if (kind !== "erros" && qz.n) pool = pool.slice(0, qz.n);
  if (!pool.length) { toast(kind === "erros" ? "Seu caderno de erros está vazio" : "Sem questões nessa matéria"); return false; }
  qz = { ...qz, mode: "run", kind, i: 0, combo: 0, list: pool.map(q => ({ q, opts: shuffle([{ t: q.c, right: true }, ...q.w.map(t => ({ t, right: false }))]), pick: null, done: false })) };
  return true;
}
function questoes(v) {
  if (param) { if (param === "erros") buildQuiz("erros"); else if (param.startsWith("s:")) { qz.subj = param.slice(2); qz.mode = "menu"; } param = null; }
  document.body.classList.toggle("in-quiz", qz.mode === "run");
  if (qz.mode === "menu") return quizMenu(v);
  if (qz.mode === "end") return quizEnd(v);
  if (qz.mode === "hist") return quizHist(v);
  quizRun(v);
}
function quizMenu(v) {
  const subs = SUBJECTS.filter(s => MCQ.some(q => q.s === s.id));
  const cnt = qz.subj === "all" ? MCQ.length : MCQ.filter(q => q.s === qz.subj).length;
  v.innerHTML = title("Praticar", `${MCQ.length} questões de múltipla escolha. Escolha o foco e o ritmo.`) +
    `<h3 style="margin-bottom:10px">Matéria</h3><div class="chips" style="margin-bottom:24px"><button class="chip" data-s="all" aria-pressed="${qz.subj === "all"}">Todas</button>${subs.map(s => `<button class="chip" data-s="${s.id}" aria-pressed="${qz.subj === s.id}">${esc(s.nome)}</button>`).join("")}</div>
    <h3 style="margin-bottom:10px">Quantidade</h3><div class="chips" style="margin-bottom:28px">${[10, 20, 0].map(n => `<button class="chip" data-n="${n}" aria-pressed="${qz.n === n}">${n || "Todas (" + cnt + ")"}</button>`).join("")}</div>
    <div class="bento">
      <button class="tile lime click span2 m2" data-k="treino" style="min-height:190px"><h2>Treino</h2><div class="mid" style="font-size:26px">Gabarito na hora</div><p class="sm" style="margin-top:8px;font-weight:600">Você marca, vê a explicação e segue.</p></button>
      <button class="tile g3 click span2" data-k="simulado" style="min-height:190px"><h2>Simulado</h2><div class="mid" style="font-size:26px">Só no fim</div><p class="sm" style="margin-top:8px;font-weight:600">Resultado e revisão ao terminar.</p></button>
      <button class="tile g2 click span2" data-k="erros" style="min-height:190px"><h2>Caderno de erros</h2><div class="mid" style="font-size:26px">${wrongIds().length} para refazer</div><p class="sm" style="margin-top:8px;font-weight:600">Só o que você errou antes.</p></button>
    </div>
    <button class="btn ghost" data-h="1" style="margin-top:20px">Ver respondidas (${answered().length})</button>`;
  v.onclick = e => {
    const s = e.target.closest("[data-s]"), n = e.target.closest("[data-n]"), k = e.target.closest("[data-k]");
    if (e.target.closest("[data-h]")) { qz.mode = "hist"; qz.hf = "all"; return quizHist(v); }
    if (s) { qz.subj = s.dataset.s; return quizMenu(v); }
    if (n) { qz.n = +n.dataset.n; return quizMenu(v); }
    if (k && buildQuiz(k.dataset.k)) questoes(v);
  };
}
const answered = () => MCQ.filter(q => P().answers[q.id]).sort((a, b) => P().answers[b.id].ts - P().answers[a.id].ts);
function quizHist(v) {
  const list = answered().filter(q => qz.hf === "all" || (qz.hf === "ok") === P().answers[q.id].ok);
  const f = [["all", "Todas"], ["ok", "Acertos"], ["no", "Erros"]];
  v.innerHTML = title("Respondidas", `${answered().length} questões já respondidas, da mais recente para a mais antiga.`) +
    `<div class="chips" style="margin-bottom:20px">${f.map(([k, t]) => `<button class="chip" data-f="${k}" aria-pressed="${qz.hf === k}">${t}</button>`).join("")}</div>` +
    (list.length ? list.map(q => { const a = P().answers[q.id]; return `<div class="tile" style="margin-bottom:12px"><span class="pill">${esc(SUBJ[q.s].nome)} · ${a.ok ? "Acertou" : "Errou"}</span><p style="font-weight:700;font-size:18px;margin-top:10px">${esc(q.q)}</p>${a.pick && !a.ok ? `<p class="sm" style="margin-top:12px"><span class="mut">Você marcou:</span> ${esc(a.pick)}</p>` : ""}<p class="sm" style="margin-top:4px"><span class="mut">Correta:</span> <b>${esc(q.c)}</b></p><p class="sm" style="margin-top:10px;padding:12px 14px;border-radius:16px;background:var(--fill)">${esc(q.exp)}</p></div>`; }).join("") : `<p class="mut">Nada por aqui ainda.</p>`) +
    `<button class="btn" data-b="1" style="margin-top:12px">Voltar</button>`;
  v.onclick = e => {
    const f = e.target.closest("[data-f]");
    if (f) { qz.hf = f.dataset.f; return quizHist(v); }
    if (e.target.closest("[data-b]")) { qz.mode = "menu"; questoes(v); }
  };
}
function quizRun(v) {
  const it = qz.list[qz.i], q = it.q, sim = qz.kind === "simulado", reveal = it.done && !sim, last = qz.i === qz.list.length - 1;
  const right = it.opts.findIndex(o => o.right);
  v.innerHTML = `<div class="arena">
    <div class="arena-top"><button class="x" id="quit" aria-label="Encerrar"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="stepper" aria-label="Questão ${qz.i + 1} de ${qz.list.length}">${qz.list.map((x, j) => `<i class="${j === qz.i ? "now " : ""}${x.done && !sim ? (x.pick.right ? "ok" : "no") : x.pick ? "sel" : ""}"></i>`).join("")}</div>
      ${qz.combo >= 2 ? `<span class="combo" key="${qz.combo}">${qz.combo} seguidas</span>` : ""}</div>
    <div><div class="qsub">${esc(SUBJ[q.s].nome)}</div><h2 class="stem" style="margin-top:8px">${esc(q.q)}</h2></div>
    <div class="opts" role="radiogroup" aria-label="Alternativas">${it.opts.map((o, k) => `<button class="opt ${reveal ? "locked " + (o.right ? "right" : o === it.pick ? "wrong" : "dim") : ""}" role="radio" aria-checked="${it.pick === o}" data-k="${k}"><span class="L">${LETTERS[k]}</span><span>${esc(o.t)}</span></button>`).join("")}</div>
    ${reveal ? "" : `<div style="display:flex;justify-content:space-between;align-items:center;gap:12px"><span class="mut sm">Teclas A a D marcam, Enter confirma</span><button class="btn lime" id="${sim ? "next" : "ok"}" ${it.pick ? "" : "disabled"}>${sim ? (last ? "Ver resultado" : "Próxima") : "Responder"}</button></div>`}
  </div>
  ${reveal ? `<div class="sheet ${it.pick.right ? "ok" : "no"}" role="status"><h3>${it.pick.right ? "Isso aí." : "Resposta: " + LETTERS[right]}</h3><div class="row"><p>${esc(q.exp)}</p><button class="btn" id="next">${last ? "Ver resultado" : "Continuar"}</button></div></div>` : ""}`;
  const pick = k => { if (reveal) return; it.pick = it.opts[k]; quizRun(v); };
  const confirm = () => { if (!it.pick) return; it.done = true; P().answers[q.id] = { ok: it.pick.right, ts: Date.now(), pick: it.pick.t }; qz.combo = it.pick.right ? qz.combo + 1 : 0; save(); quizRun(v); };
  const next = () => { if (sim) it.done = true; if (last) return finishQuiz(v); qz.i++; quizRun(v); };
  v.onclick = e => {
    const o = e.target.closest(".opt"); if (o) return pick(+o.dataset.k);
    if (e.target.closest("#ok")) return confirm();
    if (e.target.closest("#next")) return next();
    if (e.target.closest("#quit") && window.confirm("Encerrar agora? As respostas confirmadas ficam salvas.")) finishQuiz(v);
  };
  document.querySelector(".sheet")?.addEventListener("click", e => { if (e.target.closest("#next")) next(); });
  quizRun.key = e => {
    const k = LETTERS.indexOf(e.key.toUpperCase());
    if (e.key.length === 1 && k >= 0 && k < it.opts.length) return pick(k);
    if (e.key === "Enter") { e.preventDefault(); if (reveal) next(); else if (sim && it.pick) next(); else confirm(); }
  };
}
document.addEventListener("keydown", e => { if (route === "questoes" && qz.mode === "run" && $("#cmd").hidden && !e.ctrlKey && !e.metaKey && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) quizRun.key?.(e); });
function finishQuiz(v) {
  if (qz.kind === "simulado") qz.list.forEach(x => { if (x.pick) { x.done = true; P().answers[x.q.id] = { ok: x.pick.right, ts: Date.now(), pick: x.pick.t }; } });
  save(); qz.mode = "end"; document.body.classList.remove("in-quiz"); quizEnd(v);
}
function quizEnd(v) {
  const done = qz.list.filter(x => x.pick), ok = done.filter(x => x.pick.right).length, wrong = qz.list.filter(x => x.pick && !x.pick.right);
  const pct = qz.list.length ? ok / qz.list.length : 0;
  v.innerHTML = title("Resultado") + `<div class="bento"><div class="tile lime span3 m2" style="display:flex;gap:24px;align-items:center">${ring(pct, 130, `<b class="disp" style="font-size:26px">${Math.round(pct * 100)}%</b>`)}<div><div class="mid">${ok} de ${qz.list.length}</div><p style="font-weight:600;margin-top:6px">${done.length < qz.list.length ? `${qz.list.length - done.length} sem resposta` : pct >= .8 ? "Muito bom." : "Veja os erros abaixo."}</p></div></div>
    <div class="tile ink span3 m2" style="display:flex;flex-direction:column;justify-content:center;gap:14px"><button class="btn lime" data-m="again">Nova rodada</button><button class="btn ghost" style="background:rgba(255,255,255,.14);color:inherit" data-go="home">Voltar ao início</button></div></div>` +
    (wrong.length ? `<h2 class="disp" style="font-size:18px;margin:32px 0 14px">Para rever</h2>${wrong.map(x => `<div class="tile" style="margin-bottom:12px"><p style="font-weight:700;font-size:18px">${esc(x.q.q)}</p><p style="margin-top:12px" class="sm"><span class="mut">Você marcou:</span> ${esc(x.pick.t)}</p><p class="sm" style="margin-top:4px"><span class="mut">Correta:</span> <b>${esc(x.opts.find(o => o.right).t)}</b></p><p class="sm" style="margin-top:10px;padding:12px 14px;border-radius:16px;background:var(--fill)">${esc(x.q.exp)}</p></div>`).join("")}` : "");
  v.onclick = e => { if (e.target.closest("[data-m]")) { qz.mode = "menu"; questoes(v); } };
}

// ---------- cartões ----------
const INTERVALS = [0, 1, 3, 7, 14, 30];
let fl = { mode: "deck", queue: [], i: 0, open: false, hits: 0, miss: 0, label: "" };
const isDue = c => !P().cards[c.id] || P().cards[c.id].due <= Date.now();
const boxOf = c => P().cards[c.id]?.box || 0;
const inDays = n => n <= 1 ? "amanhã" : `em ${n} dias`;
function startFlash(subj) {
  const pool = CARDS.filter(c => subj === "due" || c.s === subj);
  let q = pool.filter(isDue), free = false;
  if (!q.length && subj !== "due") { q = pool; free = true; }
  if (!q.length) { toast("Nenhum cartão para revisar agora"); return false; }
  fl = { mode: "run", queue: shuffle(q), i: 0, open: false, hits: 0, miss: 0, label: subj === "due" ? "Revisão de hoje" : SUBJ[subj].nome + (free ? " · revisão livre" : "") };
  return true;
}
function flash(v) {
  if (fl.mode === "run") return flashRun(v);
  if (fl.mode === "end") return flashEnd(v);
  const due = CARDS.filter(isDue).length, fixed = CARDS.filter(c => boxOf(c) >= 3).length;
  const decks = SUBJECTS.filter(s => CARDS.some(c => c.s === s.id));
  const step = (n, t) => `<div class="tile span2 m2"><h2>Passo ${n}</h2><p style="font-weight:700;font-size:18px;line-height:1.25">${t}</p></div>`;
  v.innerHTML = title("Cartões", "Treino de memória: você vê a pergunta, tenta lembrar, confere a resposta e diz se acertou. O app decide quando cada cartão volta.") +
    `<div class="bento">
      ${step(1, "Leia a pergunta e tente responder de cabeça, em voz alta se der.")}
      ${step(2, "Vire o cartão: veja a resposta, a explicação e como o tema cai na prova.")}
      ${step(3, "Marque Lembrei ou Não lembrei. O que você erra volta amanhã; o que acerta volta em 1, 3, 7, 14 e 30 dias.")}
      <div class="tile lime span3 m2" style="display:flex;flex-direction:column;justify-content:space-between;gap:18px;min-height:190px"><div><h2>Para hoje</h2><div class="mid">${due} ${due === 1 ? "cartão" : "cartões"}</div></div><div><button class="btn" id="go-due" ${due ? "" : "disabled"}>${due ? "Começar a revisão" : "Nada para hoje"}</button></div></div>
      <div class="tile g3 span2"><h2>Já fixados</h2><div class="mid">${fixed}</div><p class="sm" style="font-weight:600;margin-top:6px">acertou 3 vezes seguidas ou mais</p></div>
      <div class="tile g1 span1"><h2>Total</h2><div class="mid">${CARDS.length}</div></div>
    </div>
    <h2 class="disp" style="font-size:18px;margin:32px 0 14px">Baralhos por matéria</h2>
    <div class="bento">${decks.map(s => { const all = CARDS.filter(c => c.s === s.id), d = all.filter(isDue).length, f = all.filter(c => boxOf(c) >= 3).length; return `<button class="tile click ${GTONE[s.g]} span2" data-deck="${s.id}" style="display:flex;flex-direction:column;gap:16px;min-height:170px"><div style="font-weight:700;font-size:17px;line-height:1.2">${esc(s.nome)}</div><div style="margin-top:auto"><div class="sm" style="font-weight:700">${d} para hoje · ${all.length} no total</div><div style="height:6px;border-radius:99px;background:rgba(22,22,46,.15);margin-top:8px;overflow:hidden"><div style="height:100%;width:${all.length ? f / all.length * 100 : 0}%;background:var(--ink)"></div></div><div class="sm" style="margin-top:6px;opacity:.75">${f} fixados</div></div></button>`; }).join("")}</div>`;
  v.onclick = e => {
    if (e.target.closest("#go-due") && startFlash("due")) return flash(v);
    const d = e.target.closest("[data-deck]"); if (d && startFlash(d.dataset.deck)) flash(v);
  };
}
function flashRun(v) {
  const c = fl.queue[fl.i], hitBox = Math.min(boxOf(c) + 1, 5);
  v.innerHTML = `<div class="arena-top" style="margin-top:12px"><button class="x" id="quit" aria-label="Voltar aos baralhos"><svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg></button>
      <div class="stepper" aria-label="Cartão ${fl.i + 1} de ${fl.queue.length}">${fl.queue.map((x, j) => `<i class="${j < fl.i ? "ok" : j === fl.i ? "now" : ""}"></i>`).join("")}</div><span class="sm mut" style="font-weight:700">${fl.i + 1}/${fl.queue.length}</span></div>
    <p class="qsub" style="margin:18px 0 12px">${esc(fl.label)}</p>
    <div class="stage"><button class="flip ${fl.open ? "open" : ""}" id="card" aria-label="Virar cartão">
      <div class="face f"><span class="pill" style="align-self:flex-start">${esc(SUBJ[c.s].nome)}</span><div class="q">${esc(c.q)}</div><span class="mut sm">Tente responder de cabeça. Depois vire o cartão (espaço).</span></div>
      <div class="face b"><span class="pill" style="align-self:flex-start;background:rgba(22,22,46,.12)">${esc(c.q)}</span>
        <div><div class="lbl">Resposta</div><div class="a">${esc(c.a)}</div></div>
        ${c.d ? `<div><div class="lbl">Entenda melhor</div><p class="more">${esc(c.d)}</p></div>` : ""}
        ${c.p ? `<div class="exam"><div class="lbl">Na prova</div><p class="more">${esc(c.p)}</p></div>` : ""}</div></button></div>
    <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">${fl.open
      ? `<button class="btn ghost" id="no">Não lembrei <span class="sm mut">volta amanhã</span> <kbd>1</kbd></button><button class="btn lime" id="yes">Lembrei <span class="sm" style="opacity:.7">volta ${inDays(INTERVALS[hitBox])}</span> <kbd>2</kbd></button>`
      : `<button class="btn lime" id="flip">Virar cartão <kbd>espaço</kbd></button>`}</div>`;
  const reveal = () => { if (fl.open) return; fl.open = true; $("#card").classList.add("open"); const b = $("#flip"); if (b) b.outerHTML = `<button class="btn ghost" id="no">Não lembrei <span class="sm mut">volta amanhã</span> <kbd>1</kbd></button><button class="btn lime" id="yes">Lembrei <span class="sm" style="opacity:.7">volta ${inDays(INTERVALS[hitBox])}</span> <kbd>2</kbd></button>`; };
  const answer = hit => {
    if (!fl.open) return;
    const box = hit ? hitBox : 0; P().cards[c.id] = { box, due: startOfDay() + INTERVALS[box] * DAY + (hit ? 0 : DAY) }; save();
    hit ? fl.hits++ : fl.miss++; fl.i++; fl.open = false;
    if (fl.i >= fl.queue.length) fl.mode = "end";
    flash(v); window.scrollTo(0, 0);
  };
  v.onclick = e => {
    if (e.target.closest("#quit")) { fl.mode = "deck"; return flash(v); }
    if (e.target.closest("#yes")) return answer(true);
    if (e.target.closest("#no")) return answer(false);
    if (e.target.closest("#card,#flip")) reveal();
  };
  flash.key = e => { if (e.key === " ") { e.preventDefault(); reveal(); } else if (e.key === "1") answer(false); else if (e.key === "2") answer(true); };
}
function flashEnd(v) {
  const tot = fl.hits + fl.miss;
  v.innerHTML = title("Sessão concluída") + `<div class="bento"><div class="tile lime span3 m2"><h2>Você lembrou de</h2><div class="mid">${fl.hits} de ${tot}</div><p style="font-weight:600;margin-top:8px">${fl.miss ? `${fl.miss} ${fl.miss === 1 ? "cartão volta" : "cartões voltam"} amanhã.` : "Nenhum para repetir amanhã."}</p></div>
    <div class="tile ink span3 m2" style="display:flex;flex-direction:column;gap:12px;justify-content:center"><button class="btn lime" id="back">Voltar aos baralhos</button><button class="btn ghost" style="background:rgba(255,255,255,.14);color:inherit" data-go="questoes">Praticar questões</button></div></div>`;
  v.onclick = e => { if (e.target.closest("#back")) { fl.mode = "deck"; flash(v); } };
}
document.addEventListener("keydown", e => { if (route === "flash" && fl.mode === "run" && $("#cmd").hidden && !/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) flash.key?.(e); });

// ---------- escrever (discursiva) ----------
let cpl = +localStorage.getItem("cpl") || 90;
function disc(v) {
  const e = param ? ESSAYS.find(x => x.id === param) : null;
  if (!e) {
    v.innerHTML = title("Escrever", "Duas questões: 30 linhas sobre conhecimentos complementares (30 pontos) e até 60 linhas de situação-problema (70 pontos). Treine uma por semana.") +
      [30, 60].map(n => `<h2 class="disp" style="font-size:18px;margin:28px 0 14px">${n === 30 ? "Questão 1 · 30 linhas" : "Questão 2 · até 60 linhas"}</h2><div class="bento">${ESSAYS.filter(x => x.linhas === n).map(x => `<button class="tile click ${n === 30 ? "g2" : "g3"} span2" data-go="disc" data-p="${x.id}" style="min-height:200px;display:flex;flex-direction:column;justify-content:space-between"><div><h2>${P().essays[x.id]?.text ? "Rascunho salvo" : "Novo"}</h2><p style="font-weight:700;font-size:18px;line-height:1.25">${esc(x.titulo.replace(/^Q\d · /, ""))}</p></div><p class="sm">${esc(x.enunciado.slice(0, 110))}…</p></button>`).join("")}</div>`).join("") +
      `<div class="tile" style="margin-top:28px"><h2>Regras do edital</h2><p class="sm">Texto manuscrito. O que passar do limite de linhas é desconsiderado. Cada erro de grafia, morfossintaxe ou vocabulário desconta nota (Q1: 6 × erros ÷ linhas; Q2: 14 × erros ÷ linhas). Fuga ao tema zera a questão. É preciso 50 pontos no total.</p></div>`;
    return;
  }
  const d = P().essays[e.id] || { text: "", chk: {} };
  const lines = t => t.split("\n").reduce((a, p) => a + Math.max(1, Math.ceil(p.length / cpl)), 0);
  v.innerHTML = `<div style="margin-top:12px">${back("disc", "Escrever")}</div>${title(esc(e.titulo.replace(/^Q\d · /, "")), esc(e.enunciado))}
  <div class="editor"><textarea class="paper" id="txt" aria-label="Seu texto" placeholder="Escreva aqui. Responda cada quesito na ordem do enunciado." spellcheck="true">${esc(d.text)}</textarea>
  <div style="display:grid;gap:14px"><div class="tile lime" style="text-align:center"><div id="rg"></div><p class="sm" style="font-weight:600;margin-top:6px">linhas estimadas de ${e.linhas}</p></div>
    <div class="tile"><h2>Sua letra</h2><label class="sm mut">Caracteres por linha</label><input id="cpl" type="number" min="40" max="150" value="${cpl}" style="margin-top:6px"></div>
    <div class="tile"><h2>Quesitos</h2>${e.quesitos.map((q, i) => `<label class="check"><input type="checkbox" data-q="${i}" ${d.chk[i] ? "checked" : ""}><span>${esc(q)}</span></label>`).join("")}</div></div></div>`;
  const txt = $("#txt"), upd = () => { const n = lines(txt.value); $("#rg").innerHTML = ring(n / e.linhas, 120, `<b class="disp" style="font-size:30px;${n > e.linhas ? "color:var(--bad)" : ""}">${n}</b>`); };
  const persist = () => { P().essays[e.id] = { text: txt.value, chk: Object.fromEntries([...v.querySelectorAll("[data-q]")].map(c => [c.dataset.q, c.checked])), ts: Date.now() }; save(); };
  v.oninput = ev => { if (ev.target.id === "txt") { upd(); persist(); } else if (ev.target.id === "cpl") { cpl = +ev.target.value || 90; localStorage.setItem("cpl", cpl); upd(); } };
  v.onchange = ev => { if (ev.target.dataset.q !== undefined) persist(); };
  upd();
}

// ---------- foco ----------
let tm = JSON.parse(sessionStorage.getItem("tm") || "null") || { subj: "e1", min: 50, end: null, running: false, left: null };
let tick;
const saveTm = () => sessionStorage.setItem("tm", JSON.stringify(tm));
function foco(v) {
  const hist = P().sessions.slice(-5).reverse();
  v.innerHTML = title("Foco", "Escolha a matéria, ligue o timer e feche o resto. Cada sessão concluída entra no seu histórico.") +
    `<div class="bento"><div class="tile span4 m2"><div class="focus-wrap"><div class="timer" id="tr"></div>
      <div class="chips">${[25, 50, 90].map(m => `<button class="chip" data-min="${m}" aria-pressed="${tm.min === m}">${m} min</button>`).join("")}</div>
      <select id="ts" aria-label="Matéria" style="max-width:420px">${SUBJECTS.map(s => `<option value="${s.id}" ${tm.subj === s.id ? "selected" : ""}>${esc(s.nome)}</option>`).join("")}</select>
      <div style="display:flex;gap:12px"><button class="btn lime" id="go">${tm.running ? "Pausar" : "Começar"}</button><button class="btn ghost" id="rst">Zerar</button></div></div></div>
    <div class="tile span2 m2"><h2>Histórico</h2>${hist.map(s => `<div class="tip" style="padding:12px 0"><div style="flex:1"><b>${esc(SUBJ[s.s].nome)}</b><div class="sm mut">${new Date(s.ts).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}</div></div><b>${fmtH(s.min)}</b></div>`).join("") || `<p class="mut sm">Nenhuma sessão ainda.</p>`}
    <form id="manf" style="display:flex;gap:8px;margin-top:16px"><input id="man" type="number" min="1" placeholder="Minutos fora do timer" aria-label="Minutos"><button class="btn">+</button></form></div></div>`;
  const draw = () => {
    const total = tm.min * 60000, left = tm.running ? Math.max(0, tm.end - Date.now()) : (tm.left ?? total);
    const t = `<b class="t">${String(Math.floor(left / 60000)).padStart(2, "0")}:${String(Math.floor(left / 1000) % 60).padStart(2, "0")}</b>`;
    const el = $("#tr"); if (el) el.innerHTML = ring(1 - left / total, 420, t).replace('style="width:420px;height:420px"', 'style="width:100%;height:100%"');
    if (tm.running && left <= 0) finish();
  };
  const finish = () => { tm.running = false; tm.left = null; clearInterval(tick); P().sessions.push({ ts: Date.now(), s: tm.subj, min: tm.min }); save(); saveTm(); toast(`Sessão de ${tm.min} min registrada`); if (route === "foco") foco(v); };
  $("#go").onclick = () => { if (tm.running) { tm.left = tm.end - Date.now(); tm.running = false; clearInterval(tick); } else { tm.end = Date.now() + (tm.left ?? tm.min * 60000); tm.running = true; clearInterval(tick); tick = setInterval(draw, 500); } saveTm(); $("#go").textContent = tm.running ? "Pausar" : "Retomar"; draw(); };
  $("#rst").onclick = () => { tm.running = false; tm.left = null; clearInterval(tick); saveTm(); foco(v); };
  $("#ts").onchange = e => { tm.subj = e.target.value; saveTm(); };
  v.onclick = e => { const m = e.target.closest("[data-min]"); if (m) { tm.min = +m.dataset.min; tm.left = null; tm.running = false; clearInterval(tick); saveTm(); foco(v); } };
  $("#manf").onsubmit = e => { e.preventDefault(); const m = +$("#man").value; if (m > 0) { P().sessions.push({ ts: Date.now(), s: tm.subj, min: m }); save(); foco(v); } };
  if (tm.running) { clearInterval(tick); tick = setInterval(draw, 500); }
  draw();
}

// ---------- plano ----------
function plano(v) {
  const today = new Date().getDay();
  v.innerHTML = title("Plano", "Rotina semanal e as regras da prova, conforme o Edital nº 1 – CGU – AFFC.") +
    `<div class="week">${[1, 2, 3, 4, 5, 6, 0].map(i => { const w = WEEK_PLAN[i]; return `<div class="day ${i === today ? "today" : ""}"><b>${w.d.slice(0, 3)}</b><p>${esc(w.t)}</p><span class="sm" style="opacity:.7;margin-top:auto">${w.subj.map(s => esc(SUBJ[s].nome.split(" ")[0])).join(", ")}</span></div>`; }).join("")}</div>
    <h2 class="disp" style="font-size:18px;margin:36px 0 14px">A prova</h2>
    <div class="bento">${PROVAS.map((p, k) => `<div class="tile ${["g1", "g2", "g3", "gd"][k]} span3"><h2>${esc(p.n)}</h2><div class="mid">${p.itens}${typeof p.itens === "number" ? " itens" : ""}</div><p style="font-weight:600;margin-top:8px">${p.pts} · ${p.min}</p></div>`).join("")}</div>
    <p class="mut sm" style="margin:14px 4px">Objetivas: 5 horas, de manhã. Elimina quem somar menos de 78 pontos entre P1, P2 e P3. Discursiva: 3h30, à tarde. O Específicos vale 180 dos 260 pontos das objetivas.</p>
    <h2 class="disp" style="font-size:18px;margin:36px 0 6px">Dicas de prova</h2>${BANCA_TIPS.map(t => `<div class="tip"><span>→</span><div>${esc(t)}</div></div>`).join("")}
    <div class="tile" style="margin-top:28px"><p class="sm">A prova real do Cebraspe tem itens Certo/Errado, e cada erro anula um acerto. O treino daqui usa múltipla escolha para fixar o conteúdo. Confira datas e retificações no site do Cebraspe.</p></div>`;
}

render();
})();
