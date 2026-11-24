(() => {
  const D = window.KS_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- PT / EN ---------- */
  const T = {
    en: {
      "skip": "Skip to the work",
      "nav.work": "Work", "nav.clients": "Clients", "nav.ai": "AI", "nav.services": "Services",
      "cta.short": "Talk to us",
      "hero.title": "Show the home before you open the door.",
      "hero.lede": "Cinematic video, photography and drone that sell your listings faster and grow your presence in the market.",
      "cat.imoveis": "Properties", "cat.brand": "Personal brand", "cat.fotos": "Photography", "cat.ai": "AI videos",
      "feed.title": "You've probably seen us here",
      "feed.sub": "Content made for Instagram, where sellers choose their agent.",
      "clients.title": "Who we work with",
      "clients.sub": "Beautiful is the start. The point is for the agent to be seen, remembered and called.",
      "work.title": "All the work",
      "tab.imoveis": "Properties", "tab.brand": "Personal brand", "tab.fotos": "Photography",
      "cta.imoveis": "I want this for my listings",
      "cta.brand": "I want my personal brand",
      "ai.title": "We show what doesn't exist yet.",
      "ai.sub": "We film the land or the building site and use AI to reveal the finished project. Buyers see the home before there is a home.",
      "ai.1": "<b>Land and plots.</b> Empty ground shows what can be built there.",
      "ai.2": "<b>Projects under construction.</b> The finished development, with life inside, before it's ready.",
      "ai.3": "<b>Real footage as the base.</b> The area, the light and the view are real. Only what's still to be built is generated.",
      "services.title": "What we do",
      "svc.imoveis.name": "Properties",
      "svc.imoveis.lede": "Everything a home needs to reach the market at a premium level, in a single shoot day.",
      "svc.imoveis.1": "Cinematic vertical reel for Instagram, Facebook and TikTok",
      "svc.imoveis.2": "Interior and exterior photography, edited for property portals",
      "svc.imoveis.3": "Drone footage of the property, the land and the area",
      "svc.imoveis.4": "Photos in 48 hours, video in 5 working days",
      "svc.brand.name": "Personal brand",
      "svc.brand.lede": "Authority content every month. You show up, we handle the rest.",
      "svc.brand.1": "<b>Studio:</b> 8 videos a month, recorded in a private space with professional lighting",
      "svc.brand.2": "<b>Cinematic:</b> 4 premium videos a month, outdoors and on chosen locations, with b-roll",
      "svc.brand.3": "Scripts and hooks written by us, captions and posting guidance",
      "svc.founder": "<b>Founding terms.</b> Our first personal brand clients keep special terms for as long as their plan is active. Limited places.",
      "svc.full.name": "Full package",
      "svc.full.lede": "Your brand and your listings in one monthly plan.",
      "svc.full.1": "Personal brand, Studio or Cinematic",
      "svc.full.2": "2 properties a month with video, photography and drone",
      "svc.full.3": "Extra properties at client terms",
      "process.title": "How it works",
      "step.1.t": "Planning.", "step.1.d": "We talk on WhatsApp, get to know the property or your brand, and send the plan and scripts before the shoot.",
      "step.2.t": "One shoot day.", "step.2.d": "Video, photography and drone on the same day, so you don't lose time.",
      "step.3.t": "Delivery.", "step.3.d": "Photos within 48 hours and edited videos within 5 working days, ready to post.",
      "cta.price": "Ask for terms on WhatsApp",
      "closing.title": "Book your first shoot.",
      "faq.title": "Frequently asked questions",
      "faq.1.q": "How much does it cost?", "faq.1.a": "It depends on the property and the plan. We have packs of 1, 2 and 3 homes and monthly personal brand plans. Message us on WhatsApp and we'll send you the terms.",
      "faq.2.q": "How soon do I get the photos and the video?", "faq.2.a": "Photos within 48 hours and the video within 5 working days.",
      "faq.3.q": "Is drone footage always included?", "faq.3.a": "Yes, whenever the law allows it.",
      "faq.4.q": "Do you work outside your area?", "faq.4.a": "Yes. Travel is included in our base area. Outside it, we quote it separately.",
      "faq.5.q": "How do the 2 and 3 home packs work?", "faq.5.a": "You pay for the pack once, with a discount per home. In return, we film all the homes together, on the same day or, at most, over two days.",
      "faq.6.q": "For personal brand, do I need to be good on camera?", "faq.6.a": "No. We write the scripts and hooks and coach you during the shoot.",
      "faq.7.q": "Is there a minimum commitment on monthly plans?", "faq.7.a": "Yes, 3 months: that's how long a personal brand needs to gain traction.",
      "faq.8.q": "Do you make videos in English for foreign buyers?", "faq.8.a": "Yes. We've already made English versions for homes in Foz do Arelho and on the Silver Coast.",
      "cta.talk": "Message us on WhatsApp",
      "videos": "videos", "photos": "photos"
    },
    pt: { "videos": "vídeos", "photos": "fotografias" }
  };
  $$("[data-i18n]").forEach(el => { T.pt[el.dataset.i18n] ??= el.innerHTML; });

  const WA = {
    pt: {
      general: "Olá! Vi o site da Keystory e gostei do vosso trabalho. Sou agente imobiliário e queria saber mais sobre como podem ajudar-me.",
      imoveis: "Olá! Vi o site da Keystory e gostei do vosso trabalho. Sou agente imobiliário e queria saber mais sobre vídeo e fotografia para os meus imóveis.",
      brand: "Olá! Vi o site da Keystory e gostei do vosso trabalho. Sou agente imobiliário e queria saber mais sobre criar a minha marca pessoal."
    },
    en: {
      general: "Hi! I saw the Keystory website and liked your work. I'm a real estate agent and would like to know how you can help me.",
      imoveis: "Hi! I saw the Keystory website and liked your work. I'm a real estate agent and would like to know more about video and photography for my listings.",
      brand: "Hi! I saw the Keystory website and liked your work. I'm a real estate agent and would like to know more about building my personal brand."
    }
  };

  let lang = "";
  try { lang = localStorage.getItem("ks-lang") || ""; } catch (e) {}
  const q = new URLSearchParams(location.search).get("lang");
  if (q === "en" || q === "pt") lang = q;
  if (!lang) lang = (navigator.languages || [navigator.language || "pt"]).some(l => l.toLowerCase().startsWith("pt")) ? "pt" : "en";
  const t = k => (T[lang] && T[lang][k]) ?? T.pt[k] ?? k;

  function applyLang() {
    document.documentElement.lang = lang === "en" ? "en" : "pt-PT";
    $$("[data-i18n]").forEach(el => { el.innerHTML = t(el.dataset.i18n); });
    $$("[data-lang]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
    $$("[data-wa]").forEach(a => { a.href = `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(WA[lang][a.dataset.wa])}`; });
    document.title = lang === "en" ? "Keystory Media · Real estate video, photography and drone" : "Keystory Media · Vídeo, fotografia e drone para imobiliário";
    render();
  }
  $$("[data-lang]").forEach(b => b.addEventListener("click", () => {
    lang = b.dataset.lang;
    try { localStorage.setItem("ks-lang", lang); } catch (e) {}
    applyLang();
  }));

  /* ---------- Render ---------- */
  const groups = {};
  const poster = p => `assets/posters/${p}.webp`;
  const ytOf = v => (lang === "en" && v.ytEn) ? v.ytEn : v.yt;
  const live = list => list.filter(v => v.yt || v.src);
  const fill = (sel, nodes) => { const el = $(sel); el.innerHTML = ""; nodes.forEach(n => el.append(n)); };
  const h = (html) => { const d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstElementChild; };

  function tile(v, i, group) {
    const b = h(`<button type="button" class="tile tile--${v.ratio}" data-group="${group}" data-index="${i}">
      <img class="tile__img" src="${poster(v.poster)}" alt="" loading="lazy" decoding="async">
      <span class="tile__play" aria-hidden="true"></span>
      <span class="tile__meta"><span class="tile__title">${v.title}</span>${v.client ? `<span class="tile__client">${v.client}</span>` : ""}</span></button>`);
    b.setAttribute("aria-label", v.title + (v.client ? ", " + v.client : ""));
    return b;
  }
  function photoBtn(src, i, group, cap) {
    const b = h(`<button type="button" class="ph" data-group="${group}" data-index="${i}"><img src="${src}-t.webp" alt="" loading="lazy" decoding="async"></button>`);
    b.setAttribute("aria-label", `${cap}, ${i + 1}`);
    return b;
  }

  function render() {
    // Telemóveis
    groups.phones = D.phones.filter(p => p.yt).map(p => ({ type: "yt", v: { yt: p.yt, title: p.who, ratio: "v" } }));
    let k = 0;
    fill("[data-list=phones]", D.phones.map(p => {
      const inner = `<span class="phone__screen"><video muted loop playsinline preload="none" poster="assets/clips/${p.clip}.webp" data-src="assets/clips/${p.clip}.mp4" aria-hidden="true"></video></span>`;
      const el = p.yt
        ? h(`<div class="phone"><button type="button" class="phone__frame" data-group="phones" data-index="${k++}" aria-label="${p.who}">${inner}<span class="phone__play" aria-hidden="true"></span></button><span class="phone__who">${p.who}</span></div>`)
        : h(`<div class="phone"><span class="phone__frame">${inner}</span><span class="phone__who">${p.who}</span></div>`);
      return el;
    }));

    // Casos (secção desligada por agora: só aparece se voltar a existir no HTML)
    if ($("[data-list=cases]")) fill("[data-list=cases]", D.cases.map(c => h(`<article class="case">
      <div class="case__media${c.vertical ? " case__media--v" : ""}"><img src="${c.media}" alt="" loading="lazy" decoding="async"></div>
      <div><h3 class="case__name">${c.name}</h3><span class="case__role">${c.role[lang]}</span>
      <ul class="case__list">${c.did[lang].map(x => `<li>${x}</li>`).join("")}</ul></div></article>`)));

    // Imóveis
    const im = live(D.imoveis), hz = im.filter(v => v.ratio === "h"), vt = im.filter(v => v.ratio === "v");
    groups["imoveis-h"] = hz.map(v => ({ type: "yt", v }));
    groups["imoveis-v"] = vt.map(v => ({ type: "yt", v }));
    fill("[data-list=imoveis-h]", hz.map((v, i) => tile(v, i, "imoveis-h")));
    fill("[data-list=imoveis-v]", vt.map((v, i) => tile(v, i, "imoveis-v")));

    // Vídeos AI (a linha só aparece quando há vídeos com ID)
    const aiv = live(D.ai);
    groups.ai = aiv.map(v => ({ type: "yt", v }));
    if ($("[data-list=ai]")) { fill("[data-list=ai]", aiv.map((v, i) => tile(v, i, "ai"))); $(".ai__videos").hidden = !aiv.length; }

    // Marca pessoal
    const box = $("[data-list=brand]"); box.innerHTML = "";
    D.brand.forEach(p => {
      const vids = live(p.videos);
      const photos = (p.photos || []).flatMap(a => Array.from({ length: a.n }, (_, i) => `assets/img/${a.dir}/${String(i + 1).padStart(2, "0")}`));
      if (!vids.length && !photos.length) return;
      const g = "brand-" + p.id, gp = "brandph-" + p.id;
      groups[g] = vids.map(v => ({ type: "yt", v }));
      groups[gp] = photos.map(src => ({ type: "img", src, cap: p.title }));
      const counts = [vids.length && `${vids.length} ${t("videos")}`, photos.length && `${photos.length} ${t("photos")}`].filter(Boolean).join(" + ");
      const el = h(`<article class="project"><header class="project__head"><h3 class="project__title">${p.title}</h3><span class="project__count">${counts}</span><p class="project__blurb">${p.blurb[lang]}</p></header></article>`);
      if (vids.length) { const r = h(`<div class="reel reel--v"></div>`); vids.forEach((v, i) => r.append(tile(v, i, g))); el.append(r); }
      if (photos.length) { const s = h(`<div class="strip"></div>`); photos.slice(0, 6).forEach((src, i) => s.append(photoBtn(src, i, gp, p.title))); el.append(s); }
      box.append(el);
    });

    // Fotografia
    const fb = $("[data-list=fotos]"); fb.innerHTML = "";
    D.fotos.forEach(a => {
      const g = "foto-" + a.dir;
      const srcs = Array.from({ length: a.n }, (_, i) => `assets/img/${a.dir}/${String(i + 1).padStart(2, "0")}`);
      groups[g] = srcs.map(src => ({ type: "img", src, cap: a.title }));
      const el = h(`<section class="album"><h3 class="album__title">${a.title}</h3><div class="album__grid"></div></section>`);
      srcs.slice(0, 9).forEach((src, i) => $(".album__grid", el).append(photoBtn(src, i, g, a.title)));
      fb.append(el);
    });

    watchVideos();
  }

  /* ---------- Vídeos silenciosos: só tocam quando estão à vista ---------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
    entries.forEach(e => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        if (!reduceMotion) v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    });
  }, { rootMargin: "120px 0px", threshold: 0.2 }) : null;
  function watchVideos() {
    $$("video[data-src]").forEach(v => {
      if (v.dataset.watched) return;
      v.dataset.watched = "1";
      if (io) io.observe(v); else { v.src = v.dataset.src; }
    });
  }

  /* ---------- Tabs ---------- */
  const tabs = $$("[role=tab]");
  function select(tab) {
    tabs.forEach(x => {
      const on = x === tab;
      x.setAttribute("aria-selected", String(on)); x.tabIndex = on ? 0 : -1;
      $("#" + x.getAttribute("aria-controls")).hidden = !on;
    });
  }
  tabs.forEach(tab => {
    tab.addEventListener("click", () => select(tab));
    tab.addEventListener("keydown", e => {
      const i = tabs.indexOf(tab);
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const n = tabs[(i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) % tabs.length];
        n.focus(); select(n); e.preventDefault();
      }
    });
  });
  $$(".cat[data-tab]").forEach(c => c.addEventListener("click", () => select($("#" + c.dataset.tab))));

  /* ---------- Visualizador (fotos + YouTube) ---------- */
  const dlg = $("#viewer"), stage = $(".viewer__stage", dlg), cap = $(".viewer__cap", dlg);
  let cur = { group: null, i: 0 };
  function show() {
    const list = groups[cur.group], it = list[cur.i];
    stage.innerHTML = "";
    if (it.type === "img") {
      const img = new Image(); img.src = it.src + ".webp"; img.alt = `${it.cap}, ${cur.i + 1}`;
      stage.append(img); cap.textContent = `${it.cap} · ${cur.i + 1}/${list.length}`;
    } else {
      const fcls = `frame${it.v.ratio === "v" ? " frame--v" : ""}`;
      /* Vídeos alojados no próprio site (`src`) usam o leitor do browser; os outros vêm do YouTube. */
      const f = it.v.src
        ? h(`<div class="${fcls}"><video src="assets/videos/${it.v.src}.mp4" poster="${poster(it.v.poster)}" controls autoplay playsinline preload="auto"></video></div>`)
        : h(`<div class="${fcls}"><iframe src="https://www.youtube-nocookie.com/embed/${ytOf(it.v)}?autoplay=1&rel=0&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`);
      $("iframe, video", f).title = it.v.title;
      stage.append(f); cap.textContent = it.v.title + (it.v.client ? ` · ${it.v.client}` : "");
    }
    $("[data-prev]", dlg).hidden = cur.i === 0;
    $("[data-next]", dlg).hidden = cur.i === list.length - 1;
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-group]");
    if (!b || !groups[b.dataset.group]) return;
    cur = { group: b.dataset.group, i: +b.dataset.index };
    show(); dlg.showModal();
  });
  const step = d => { const n = cur.i + d; if (n >= 0 && n < groups[cur.group].length) { cur.i = n; show(); } };
  $("[data-prev]", dlg).addEventListener("click", () => step(-1));
  $("[data-next]", dlg).addEventListener("click", () => step(1));
  $("[data-close]", dlg).addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener("close", () => { stage.innerHTML = ""; });
  dlg.addEventListener("keydown", e => { if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); });
  let tx = null;
  dlg.addEventListener("touchstart", e => { tx = e.touches[0].clientX; }, { passive: true });
  dlg.addEventListener("touchend", e => { if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1); tx = null; });

  $("#year").textContent = new Date().getFullYear();
  applyLang();
  watchVideos();
})();
