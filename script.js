/* ==========================================================
   ✏️  PERSONNALISE TOUT ICI (tu n'as pas besoin de toucher au reste)
   ========================================================== */
const CONFIG = {
  // Date de l'anniversaire (année-mois-jourTheure) — ex: "2026-12-31T00:00:00"
  targetDate: "2026-12-31T00:00:00",

  // Fichiers (mets-les dans le dossier "media/") — laisse "" pour désactiver
  music: "media/music.mp3",
  video: "media/video.mp4",
  videoPoster: "",

  // La lettre : chaque ligne = un paragraphe (écrit lettre par lettre)
  letter: [
    "JOYEUX ANNIVERSAIRE MON AMOUR ♡",
    "Aujourd'hui est un jour très spécial, car c'est le jour où la personne la plus précieuse de ma vie est née.",
    "Merci d'être toujours là, d'avoir rendu mes journées plus belles et d'avoir transformé de simples moments en souvenirs inoubliables.",
    "Que cette nouvelle année t'apporte autant de bonheur que tu m'en donnes.",
    "Je t'aime, aujourd'hui et toujours. ♡"
  ],

  // Les photos (4 à 9 recommandées) : remplace par "photos/1.jpg", "photos/2.jpg"...
  // Si une entrée a  video: "media/clipX.mp4"  → le cadre joue la vidéo (muette, en boucle), et avec le son quand on clique dessus.
  // "src" sert alors d'image de secours tant que la vidéo n'est pas là (ou si elle ne charge pas).
  photos: [
    { src: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?auto=format&fit=crop&w=600&q=80", caption: "Notre premier sourire" },
    { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=600&q=80", video: "media/clip1.mp4", caption: "Une journée magique" },
    { src: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=600&q=80", caption: "Juste nous deux" },
    { src: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80", video: "media/clip2.mp4", caption: "À jamais gravé" },
    { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?auto=format&fit=crop&w=600&q=80", video: "media/clip3.mp4", caption: "Nos rires" },
    { src: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?auto=format&fit=crop&w=600&q=80", caption: "Moments tendres" },
    { src: "https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=600&q=80", video: "media/clip4.mp4", caption: "Ensemble" },
    { src: "https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=600&q=80", caption: "Toi & moi" }
  ],

  // Scène "vœux"
  wishesTitle: "Joyeux anniversaire, mon cœur ♡",
  wishes: [
    "Je te souhaite du bonheur, de la santé, du succès et de belles bénédictions pour ce nouveau chapitre de ta vie.",
    "Que tous tes rêves deviennent réalité, et que ton cœur soit toujours rempli de joie.",
    "Merci d'être dans ma vie. Reste heureuse, reste en bonne santé, et continue de sourire. Je t'aime, toujours."
  ],

  // Scène finale : mots qui s'écrivent et s'effacent
  finalWords: ["Avec tout mon amour", "Toujours & à jamais"],
  finalLine: "Merci d'être une partie de ma vie. J'espère que ce petit cadeau rendra ton jour encore plus beau.",
  finalSign: "Pour toujours à toi ♡"
};
/* ========================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const $ = id => document.getElementById(id);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  let runId = 0; // annule les animations d'écriture quand on change de scène

  /* ---------- Pétales & étincelles ---------- */
  const petals = $("petals");
  if (!reduced) {
    for (let i = 0; i < 26; i++) {
      const p = document.createElement("i");
      const s = 8 + Math.random() * 12;
      p.style.cssText = `left:${Math.random() * 100}%;width:${s}px;height:${s * 1.3}px;` +
        `animation-duration:${9 + Math.random() * 10}s,${3 + Math.random() * 3}s;` +
        `animation-delay:${-Math.random() * 18}s,${-Math.random() * 5}s;opacity:${.35 + Math.random() * .5}`;
      petals.appendChild(p);
    }
  }


  /* ---------- Ballons ---------- */
  const balloons = $("balloons");
  if (!reduced) {
    const pairs = [["#f6a5c0","#c9628a"],["#ffd98e","#d9a441"],["#c9b6ff","#8a6bd6"],["#9fe0d0","#4fae9c"],["#ffb59e","#e0735a"]];
    for (let i = 0; i < 9; i++) {
      const b = document.createElement("i"), c = pairs[i % pairs.length];
      b.style.cssText = `left:${4 + Math.random() * 92}%;--w:${46 + Math.random() * 30}px;--c1:${c[0]};--c2:${c[1]};` +
        `--d:${16 + Math.random() * 14}s;--dl:${-Math.random() * 28}s`;
      balloons.appendChild(b);
    }
  }

  /* ---------- Effets (confettis, feux d'artifice, coeurs, étincelles) ---------- */
  const fx = $("fx"), ctx = fx.getContext("2d");
  let W = 0, H = 0, raf = 0;
  const parts = [];
  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight;
    fx.width = W * dpr; fx.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  resize(); addEventListener("resize", resize);
  const rnd = (a, b) => a + Math.random() * (b - a);
  const COLORS = ["#efc3d2", "#d991aa", "#d9b978", "#fff6e5", "#c9b6ff", "#9fe0d0", "#ffb59e"];
  function loop() {
    ctx.clearRect(0, 0, W, H);
    for (let i = parts.length - 1; i >= 0; i--) {
      const q = parts[i];
      q.update(q); 
      if (q.life <= 0) { parts.splice(i, 1); continue; }
      ctx.save(); q.draw(q); ctx.restore();
    }
    raf = parts.length ? requestAnimationFrame(loop) : 0;
  }
  function add(q) { if (reduced) return; parts.push(q); if (!raf) raf = requestAnimationFrame(loop); }

  function confetti(x, y, n = 130) {
    for (let i = 0; i < n; i++) {
      const a = rnd(0, Math.PI * 2), sp = rnd(4, 13);
      add({
        x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 7, rot: rnd(0, 6.28), vr: rnd(-.35, .35),
        w: rnd(6, 12), h: rnd(3, 7), c: COLORS[i % COLORS.length], life: 1, decay: rnd(.004, .009),
        update(q) { q.vx *= .985; q.vy = q.vy * .985 + .28; q.x += q.vx; q.y += q.vy; q.rot += q.vr; q.life -= q.decay; if (q.y > H + 20) q.life = 0; },
        draw(q) { ctx.globalAlpha = Math.min(1, q.life * 2); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.scale(1, Math.cos(q.rot * 2)); ctx.fillStyle = q.c; ctx.fillRect(-q.w / 2, -q.h / 2, q.w, q.h); }
      });
    }
  }
  function burst(x, y, color) {
    const n = 70, base = color || COLORS[(Math.random() * COLORS.length) | 0];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + rnd(-.05, .05), sp = rnd(2, 7.5) * (i % 2 ? 1 : .6);
      add({
        x, y, px: x, py: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, c: base, life: 1, decay: rnd(.012, .022),
        update(q) { q.px = q.x; q.py = q.y; q.vx *= .96; q.vy = q.vy * .96 + .06; q.x += q.vx; q.y += q.vy; q.life -= q.decay; },
        draw(q) { ctx.globalAlpha = q.life; ctx.strokeStyle = q.c; ctx.lineWidth = 2; ctx.lineCap = "round"; ctx.shadowColor = q.c; ctx.shadowBlur = 8;
          ctx.beginPath(); ctx.moveTo(q.px, q.py); ctx.lineTo(q.x, q.y); ctx.stroke(); }
      });
    }
  }
  function firework(x = rnd(W * .15, W * .85), ty = rnd(H * .12, H * .45)) {
    const col = COLORS[(Math.random() * COLORS.length) | 0];
    add({
      x, y: H + 10, ty, life: 1, tx: x,
      update(q) { q.y -= Math.max(5, (q.y - q.ty) * .06 + 3); if (q.y <= q.ty) { q.life = 0; burst(q.x, q.y, col); } },
      draw(q) { ctx.fillStyle = "#fff"; ctx.shadowColor = col; ctx.shadowBlur = 12; ctx.beginPath(); ctx.arc(q.x, q.y, 2.2, 0, 6.3); ctx.fill(); }
    });
  }
  function hearts(x, y, n = 14, spread = 80) {
    for (let i = 0; i < n; i++) {
      add({
        x: x + rnd(-spread, spread), y: y + rnd(-10, 20), vy: rnd(-2.6, -.9), vx: rnd(-.6, .6), s: rnd(14, 30), ph: rnd(0, 6.28),
        c: ["#f6a5c0", "#ff8fb1", "#efc3d2", "#d991aa"][i % 4], life: 1, decay: rnd(.003, .006), glyph: i % 3 ? "♥" : "♡",
        update(q) { q.ph += .06; q.x += q.vx + Math.sin(q.ph) * .7; q.y += q.vy; q.life -= q.decay; },
        draw(q) { ctx.globalAlpha = Math.min(1, q.life * 1.6); ctx.fillStyle = q.c; ctx.shadowColor = q.c; ctx.shadowBlur = 12; ctx.font = `${q.s}px serif`; ctx.textAlign = "center"; ctx.fillText(q.glyph, q.x, q.y); }
      });
    }
  }
  function sparkle(x, y, n = 1, big = 1) {
    for (let i = 0; i < n; i++) {
      add({
        x: x + rnd(-6, 6), y: y + rnd(-6, 6), vx: rnd(-1.2, 1.2), vy: rnd(-1.6, .4), r: rnd(3, 7) * big, rot: rnd(0, 3), life: 1, decay: rnd(.025, .045),
        c: Math.random() > .5 ? "#fff6e5" : "#efc3d2",
        update(q) { q.x += q.vx; q.y += q.vy; q.vy += .03; q.rot += .08; q.life -= q.decay; },
        draw(q) { ctx.globalAlpha = q.life; ctx.fillStyle = q.c; ctx.shadowColor = "#d9b978"; ctx.shadowBlur = 10; ctx.translate(q.x, q.y); ctx.rotate(q.rot);
          const r = q.r * q.life + 1; ctx.beginPath(); for (let k = 0; k < 8; k++) { const rr = k % 2 ? r * .3 : r; ctx.lineTo(Math.cos(k * Math.PI / 4) * rr, Math.sin(k * Math.PI / 4) * rr); } ctx.closePath(); ctx.fill(); }
      });
    }
  }
  // traînée d'étincelles derrière la souris / le doigt
  let lastSp = 0;
  addEventListener("pointermove", e => { const t = performance.now(); if (t - lastSp > 35) { lastSp = t; sparkle(e.clientX, e.clientY, 1); } });
  addEventListener("pointerdown", e => { if (!e.target.closest(".next,#cake,.memory")) sparkle(e.clientX, e.clientY, 8, 1.4); });
  const centerOf = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };
  let ambientId = 0; // boucle d'ambiance (coeurs / feux d'artifice) annulée au changement de scène

  /* ---------- Musique ---------- */
  const music = $("music"), toggle = $("music-toggle");
  let musicOn = false, musicWanted = true;
  if (CONFIG.music) music.src = CONFIG.music; else toggle.style.display = "none";
  async function playMusic() {
    if (!CONFIG.music || !musicWanted) return;
    try { await music.play(); musicOn = true; toggle.classList.add("on"); } catch { musicOn = false; toggle.classList.remove("on"); }
  }
  function pauseMusic() { music.pause(); musicOn = false; toggle.classList.remove("on"); }
  // Démarrage automatique : essaie dès le chargement, sinon dès la 1re interaction (clic / toucher / touche)
  playMusic();
  const unlock = e => {
    if (e.target.closest && e.target.closest("#music-toggle")) return;
    playMusic().then(() => { if (musicOn) ["pointerdown", "touchend", "click", "keydown"].forEach(t => removeEventListener(t, unlock, true)); });
  };
  ["pointerdown", "touchend", "click", "keydown"].forEach(t => addEventListener(t, unlock, true));
  toggle.addEventListener("click", () => {
    if (musicOn) { musicWanted = false; pauseMusic(); } else { musicWanted = true; playMusic(); }
  });

  /* ---------- Navigation ---------- */
  function goTo(n) {
    const cur = document.querySelector(".scene.active");
    const next = $("scene-" + n);
    if (!next || cur === next) return;
    runId++; ambientId++;
    document.body.dataset.scene = n;
    cur.classList.remove("active");
    next.classList.add("active");
    next.scrollTop = 0;
    if (n === "5" || n === 5) { /* vidéo : rien */ } else { stopVideo(); }
    if (String(n) !== "4") { pauseClips(); gallery.querySelectorAll("video.clip").forEach(c => { if (c._resumeMusic) { c._resumeMusic = false; playMusic(); } }); }
    ({ 3: runLetter, 4: runGallery, 6: runWishes, 7: runFinal }[n] || (() => {}))();
  }
  document.querySelectorAll(".next").forEach(b => b.addEventListener("click", async () => {
    playMusic();
    if (b.id === "open-gift") {
      const g = $("gift");
      b.disabled = true;
      g.classList.add("shake");
      await sleep(reduced ? 0 : 750);
      g.classList.remove("shake"); g.classList.add("open");
      const [gx, gy] = centerOf(g);
      confetti(gx, gy - 30, 170); hearts(gx, gy, 16, 70);
      setTimeout(() => firework(W * .25, H * .3), 250);
      setTimeout(() => firework(W * .75, H * .25), 500);
      await sleep(reduced ? 0 : 1700);
      b.disabled = false;
    } else {
      sparkle(...centerOf(b), 14, 1.6);
    }
    goTo(b.dataset.next);
  }));

  /* ---------- Machine à écrire ---------- */
  async function typeInto(el, text, speed, id) {
    for (const ch of text) {
      if (id !== runId) return false;
      el.textContent += ch;
      await sleep(reduced ? 0 : speed);
    }
    return true;
  }

  /* ---------- Compte à rebours ---------- */
  const target = new Date(CONFIG.targetDate).getTime();
  const pad = v => String(v).padStart(2, "0");
  function tick() {
    const left = Math.max(0, target - Date.now());
    $("days").textContent = pad(Math.floor(left / 864e5));
    $("hours").textContent = pad(Math.floor(left % 864e5 / 36e5));
    $("minutes").textContent = pad(Math.floor(left % 36e5 / 6e4));
    const sec = $("seconds"), nv = pad(Math.floor(left % 6e4 / 1e3));
    if (sec.textContent !== nv) { sec.textContent = nv; sec.classList.remove("pop"); void sec.offsetWidth; sec.classList.add("pop"); }
    if (left === 0) {
      $("count-title").innerHTML = "C'est son jour<br><em>spécial !</em>";
      $("count-sub").textContent = "Le moment est enfin arrivé ♡";
    }
  }
  tick(); setInterval(tick, 1000);

  /* ---------- Lettre ---------- */
  async function runLetter() {
    const id = runId, box = $("letter"), btn = $("letter-next");
    box.innerHTML = ""; btn.classList.remove("show");
    $("letter-card").onclick = () => { // clic = tout afficher
      runId++;
      box.innerHTML = CONFIG.letter.map(t => `<p>${t}</p>`).join("");
      btn.classList.add("show"); hearts(W / 2, H * .75, 10, W * .25);
    };
    await sleep(reduced ? 0 : 900);
    for (let i = 0; i < CONFIG.letter.length; i++) {
      const p = document.createElement("p");
      if (i === 0) p.className = "first";
      box.appendChild(p);
      const ok = await typeInto(p, CONFIG.letter[i], 28, id);
      if (!ok) return;
      box.scrollTop = box.scrollHeight;
      await sleep(reduced ? 0 : 350);
    }
    if (id === runId) { btn.classList.add("show"); hearts(W / 2, H * .75, 12, W * .25); }
  }

  /* ---------- Galerie ---------- */
  const gallery = $("gallery");
  gallery.innerHTML = CONFIG.photos.map((p, i) => {
    const rot = (Math.random() * 14 - 7).toFixed(1);
    const dy = Math.round(Math.random() * 30 - 15);
    const vid = p.video ? `<video class="clip" src="${p.video}" muted loop playsinline preload="metadata"${p.src ? ` poster="${p.src}"` : ""}></video><span class="clip-badge" aria-hidden="true">▶</span>` : "";
    return `<figure class="polaroid memory${p.video ? " has-video" : ""}" style="--r:${rot}deg;--dy:${dy}px;--i:${i}">
      <div class="frame"><img src="${p.src || ""}" alt="${p.caption || ""}" loading="lazy">${vid}</div><figcaption>${p.caption || ""}</figcaption></figure>`;
  }).join("");
  // vidéo qui ne charge pas → on garde l'image de secours
  gallery.querySelectorAll("video.clip").forEach(v => v.addEventListener("error", () => { v.remove(); const b = v.parentNode && v.parentNode.querySelector(".clip-badge"); if (b) b.remove(); }));
  const clips = () => [...gallery.querySelectorAll("video.clip")];
  const playClips = () => clips().forEach(v => { v.muted = true; v.play().catch(() => {}); });
  const pauseClips = () => clips().forEach(v => { v.pause(); v.muted = true; });
  gallery.querySelectorAll(".memory").forEach(f => f.addEventListener("click", () => {
    sparkle(...centerOf(f), 14, 1.6);
    const was = f.classList.contains("zoom");
    gallery.querySelectorAll(".zoom").forEach(z => { z.classList.remove("zoom"); const c = z.querySelector("video.clip"); if (c) c.muted = true; });
    const clip = f.querySelector("video.clip");
    if (!was) {
      f.classList.add("zoom");
      if (clip) { clip.muted = false; clip.currentTime = 0; clip.play().catch(() => { clip.muted = true; clip.play().catch(() => {}); }); if (musicOn) { pauseMusic(); musicWanted = true; clip._resumeMusic = true; } }
    }
    if (!(!was && clip)) clips().forEach(c => { if (c._resumeMusic) { c._resumeMusic = false; playMusic(); } });
  }));
  function runGallery() {
    playClips();
    setTimeout(() => hearts(W / 2, H * .85, 10, W * .3), 600);
    gallery.querySelectorAll(".memory").forEach(f => { f.classList.remove("in", "zoom"); void f.offsetWidth; f.classList.add("in"); });
  }

  /* ---------- Lecteur vidéo ---------- */
  const v = $("video"), player = $("player");
  const fmt = s => isFinite(s) ? Math.floor(s / 60) + ":" + pad(Math.floor(s % 60)) : "0:00";
  if (CONFIG.video) { v.src = CONFIG.video; if (CONFIG.videoPoster) v.poster = CONFIG.videoPoster; }
  else player.classList.add("no-video");
  v.addEventListener("error", () => player.classList.add("no-video"));
  function setPlayUI(playing) {
    $("pp").textContent = playing ? "❚❚" : "▶";
    player.classList.toggle("playing", playing);
  }
  function togglePlay() {
    if (v.paused) {
      v.play().then(() => { if (musicOn) { pauseMusic(); musicWanted = true; v._resumeMusic = true; } }).catch(() => {});
    } else v.pause();
  }
  function stopVideo() {
    if (!v.paused) v.pause();
    if (v._resumeMusic) { v._resumeMusic = false; playMusic(); }
  }
  v.addEventListener("play", () => setPlayUI(true));
  v.addEventListener("pause", () => { setPlayUI(false); if (v._resumeMusic) { v._resumeMusic = false; playMusic(); } });
  v.addEventListener("ended", () => { setPlayUI(false); v.currentTime = 0; });
  v.addEventListener("timeupdate", () => {
    if (v.duration) $("seek").value = (v.currentTime / v.duration) * 1000;
    $("time").textContent = fmt(v.currentTime) + " / " + fmt(v.duration);
  });
  v.addEventListener("loadedmetadata", () => { $("time").textContent = "0:00 / " + fmt(v.duration); });
  $("seek").addEventListener("input", e => { if (v.duration) v.currentTime = (e.target.value / 1000) * v.duration; });
  $("pp").addEventListener("click", togglePlay);
  $("big-play").addEventListener("click", togglePlay);
  v.addEventListener("click", togglePlay);
  $("mute").addEventListener("click", () => { v.muted = !v.muted; $("mute").textContent = v.muted ? "🔇" : "🔊"; });

  /* ---------- Vœux ---------- */
  async function runWishes() {
    const id = runId, box = $("wishes"), amb = ambientId;
    (async () => { while (amb === ambientId) { hearts(rnd(W * .1, W * .9), H + 10, 1, 0); await sleep(450); } })();
    box.innerHTML = "";
    const all = [CONFIG.wishesTitle, ...CONFIG.wishes];
    for (let i = 0; i < all.length; i++) {
      const p = document.createElement("p");
      if (i === 0) p.className = "wish-head";
      box.appendChild(p);
      if (!(await typeInto(p, all[i], 14, id))) return;
      await sleep(reduced ? 0 : 200);
    }
  }

  /* ---------- Final ---------- */
  async function runFinal() {
    const id = runId, w = $("final-words"), amb = ambientId, cake = $("cake");
    cake.classList.remove("out");
    $("cake-hint").textContent = "Clique sur le gâteau pour souffler les bougies ✨";
    (async () => { await sleep(500); while (amb === ambientId) { firework(); await sleep(rnd(900, 1900)); } })();
    w.textContent = ""; $("final-line").textContent = ""; $("final-sign").textContent = "";
    $("final-line").style.opacity = 0; $("final-sign").style.opacity = 0;
    let i = 0;
    while (id === runId) {
      const word = CONFIG.finalWords[i % CONFIG.finalWords.length];
      if (!(await typeInto(w, word, 85, id))) return;
      if (i === 0) {
        $("final-line").textContent = CONFIG.finalLine; $("final-line").style.opacity = 1;
        $("final-sign").textContent = CONFIG.finalSign; $("final-sign").style.opacity = 1;
      }
      if (CONFIG.finalWords.length < 2) return;
      await sleep(2200);
      while (w.textContent.length && id === runId) { w.textContent = w.textContent.slice(0, -1); await sleep(40); }
      await sleep(300); i++;
    }
  }

  /* ---------- Gâteau : souffler les bougies ---------- */
  function blowCandles() {
    const cake = $("cake");
    if (cake.classList.contains("out")) { const [x, y] = centerOf(cake); hearts(x, y, 8, 60); return; }
    cake.classList.add("out");
    const [x, y] = centerOf(cake);
    confetti(x, y - 40, 190);
    setTimeout(() => { firework(W * .2); firework(W * .5, H * .2); firework(W * .8); }, 200);
    setTimeout(() => hearts(x, y, 22, 120), 400);
    $("cake-hint").textContent = "Fais un vœu… ♡ Joyeux anniversaire !";
  }
  $("cake").addEventListener("click", blowCandles);
  $("cake").addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); blowCandles(); } });

  /* ---------- Rejouer ---------- */
  $("restart").addEventListener("click", () => {
    runId++; ambientId++;
    document.body.dataset.scene = "1";
    $("gift").classList.remove("open");
    document.querySelector(".scene.active").classList.remove("active");
    $("scene-1").classList.add("active");
  });
});
