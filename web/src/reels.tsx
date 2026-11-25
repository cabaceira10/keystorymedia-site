import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { A, ouveSom, pedeSom } from "./base";
import { track } from "./rastreio";

/* ---------------- the reel deck (Doxter Carrossel, imperative core kept) ---------------- */
export interface Reel {
  id: string;
  titulo: string;
}

/** The six 9:16 reels, in the order of the reels body sentence: the first three (copy deck 3.2), then the three added after them. */
export const REELS: readonly Reel[] = [
  { id: "reel-casa-nazare", titulo: "Casa na Nazaré, para o Aurélio Cavaleiro." },
  { id: "reel-tomas-marques", titulo: "Marca pessoal do Tomás Marques." },
  { id: "reel-apartamento-nazare-2", titulo: "Apartamento na Nazaré, com drone." },
  { id: "reel-casa-nazare-2", titulo: "Casa na Nazaré, para o Aurélio Cavaleiro." },
  { id: "reel-apartamento-nazare", titulo: "Apartamento na Nazaré, por dentro." },
  { id: "reel-terreno", titulo: "Terreno com o lote marcado na imagem." },
]

const SVG_SOM_ON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"/><path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"/></svg>';
const SVG_SOM_OFF = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" fill="currentColor" stroke="none"/><path d="m16 9.5 5 5m0-5-5 5"/></svg>';

/**
 * Fanned deck of 9:16 reels: drag, swipe, horizontal wheel, arrows and keys; only the front card and its
 * neighbours load; the front plays muted while the deck is in view. The panel's sound button turns the deck
 * sound on and mutes every other player (and the other way round).
 */
export function Carrossel({ reels = REELS, rotulo = "Reels da Keystory" }: { reels?: readonly Reel[]; rotulo?: string }) {
  const raizRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const raiz = raizRef.current!;
    const palco = raiz.querySelector<HTMLUListElement>("[data-reels-palco]")!;
    const num = raiz.querySelector<HTMLSpanElement>("[data-reels-num]")!;
    const btSom = raiz.querySelector<HTMLButtonElement>("[data-reels-som]")!;
    const mq = matchMedia("(min-width: 900px)");
    const parado = () => document.documentElement.dataset.mov === "off";
    const R = reels.length;
    // the ring needs a hidden card on each side of the three in view, so a wrapping card never crosses the front
    const dados = R < 5 ? reels.concat(reels) : reels.slice();
    const N = dados.length;
    let cur = 0;
    let dentro = false;
    let somLigado = false;
    let arrastou = false;

    const marcaSom = () => {
      btSom.setAttribute("aria-pressed", String(somLigado));
      btSom.setAttribute("aria-label", somLigado ? "Desligar o som" : "Ligar o som");
      btSom.innerHTML = somLigado ? SVG_SOM_ON : SVG_SOM_OFF;
    };

    const lis = dados.map((r, i) => {
      const li = document.createElement("li");
      li.className = "reels-cartao";
      li.dataset.reel = r.id;
      li.innerHTML =
        `<video muted playsinline loop preload="none" poster="${A(`campaign/film/${r.id}.webp`)}" data-src="${A(`campaign/film/${r.id}.mp4`)}" width="720" height="1280"></video>` +
        `<button type="button" class="reels-play" data-play-centro aria-label="Ver o reel"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4.5v15l12.5-7.5z"/></svg></button>` +
        `<input type="range" class="barra-video reels-barra" min="0" max="1000" step="1" value="0" aria-label="Posição do reel">`;
      const v = li.querySelector("video")!;
      v.setAttribute("aria-label", r.titulo);
      const barra = li.querySelector<HTMLInputElement>(".reels-barra")!;
      // as on the hero film: play() runs inside the tap itself, with sound, and falls back to muted if iOS refuses
      li.querySelector<HTMLButtonElement>(".reels-play")!.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (cur !== i) return;
        li.dataset.mao = "";
        if (!v.getAttribute("src")) v.src = v.dataset.src!;
        if (v.error) v.load();
        somLigado = true;
        v.muted = false;
        pedeSom("reels");
        marcaSom();
        v.play().catch(() => {
          somLigado = false;
          marcaSom();
          v.muted = true;
          v.play().catch(() => {});
        });
        track("reel_play", { reel: r.id });
      });
      li.addEventListener("click", (e) => {
        if ((e.target as Element).closest(".reels-barra")) return;
        if (arrastou) {
          arrastou = false;
          return;
        }
        e.preventDefault();
        if (cur !== i) {
          vai(i);
          return;
        }
        // tapping the front reel pauses and resumes at the same point
        if (v.paused) {
          li.dataset.mao = "";
          if (!v.getAttribute("src")) v.src = v.dataset.src!;
          v.play().catch(() => {});
        } else {
          li.dataset.mao = "1";
          v.pause();
        }
      });
      const parou = () => li.classList.toggle("parado", v.paused);
      (["play", "pause"] as const).forEach((t) => v.addEventListener(t, parou));
      parou();
      v.addEventListener("timeupdate", () => {
        if (!v.duration) return;
        const p = v.currentTime / v.duration;
        barra.value = String(Math.round(p * 1000));
        barra.style.setProperty("--p", `${(p * 100).toFixed(2)}%`);
      });
      barra.addEventListener("input", () => {
        if (v.duration) v.currentTime = (Number(barra.value) / 1000) * v.duration;
        barra.style.setProperty("--p", `${Number(barra.value) / 10}%`);
      });
      palco.appendChild(li);
      return li;
    });

    function pinta() {
      const largo = mq.matches;
      lis.forEach((li, i) => {
        let dd = i - cur;
        if (dd > N / 2) dd -= N;
        if (dd < -N / 2) dd += N;
        const a = Math.abs(dd);
        // hidden cards wait one step past the neighbours, not spread across the page
        const x = Math.max(-2, Math.min(2, dd)) * (largo ? 70 : 52);
        const rot = a === 0 ? 1.5 : dd < 0 ? -2 : 2.5;
        li.style.transform = `translate(${x}%,0) scale(${a ? 0.84 : 1}) rotate(${rot}deg)`;
        li.style.zIndex = String(50 - a);
        li.style.opacity = a > 1 ? "0" : a ? ".72" : "1";
        li.style.pointerEvents = a > 1 ? "none" : "auto";
        li.classList.toggle("frente", a === 0);
        li.setAttribute("aria-hidden", a ? "true" : "false");
        li.querySelectorAll("input, button").forEach((el) => ((el as HTMLElement).tabIndex = a ? -1 : 0));
        const v = li.querySelector("video")!;
        if (a) li.dataset.mao = "";
        if (a <= 1 && !v.getAttribute("src")) v.src = v.dataset.src!;
        if (a <= 1 && dentro) v.preload = a === 0 ? "auto" : "metadata";
        const anda = a === 0 && dentro && !li.dataset.mao && (!parado() || somLigado);
        // muted autoplay only on the front reel while the deck is in view, so the neighbours never load and play behind it
        v.autoplay = anda;
        if (anda) {
          v.muted = !somLigado;
          const p = v.play();
          if (p)
            p.catch(() => {
              somLigado = false;
              marcaSom();
              v.muted = true;
              v.play().catch(() => {});
            });
        } else {
          v.pause();
          v.muted = true;
        }
      });
      num.textContent = `0${(cur % R) + 1}`.slice(-2) + " / " + `0${R}`.slice(-2);
      marcaSom();
    }
    const vai = (i: number) => {
      cur = (i + N) % N;
      pinta();
      track("reel_view", { reel: dados[cur].id });
    };

    const ant = () => vai(cur - 1);
    const seg = () => vai(cur + 1);
    const btAnt = raiz.querySelector<HTMLButtonElement>("[data-reels-ant]")!;
    const btSeg = raiz.querySelector<HTMLButtonElement>("[data-reels-seg]")!;
    btAnt.addEventListener("click", ant);
    btSeg.addEventListener("click", seg);
    const teclas = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") vai(cur - 1);
      if (e.key === "ArrowRight") vai(cur + 1);
      // on the deck itself (not on its buttons) Space, Enter and K pause and resume the front reel, as a tap does
      if (e.target === raiz && (e.key === " " || e.key === "Enter" || e.key === "k" || e.key === "K")) {
        e.preventDefault();
        const li = lis[cur];
        const v = li.querySelector("video")!;
        if (v.paused) {
          li.dataset.mao = "";
          if (!v.getAttribute("src")) v.src = v.dataset.src!;
          v.play().catch(() => {});
        } else {
          li.dataset.mao = "1";
          v.pause();
        }
      }
    };
    raiz.addEventListener("keydown", teclas);

    // the sound turns on inside the tap itself (iOS only allows it there)
    const somClique = () => {
      const v = lis[cur].querySelector("video")!;
      somLigado = !somLigado;
      if (!v.getAttribute("src")) v.src = v.dataset.src!;
      v.muted = !somLigado;
      if (somLigado) {
        lis[cur].dataset.mao = "";
        pedeSom("reels");
        v.play().catch(() => {
          somLigado = false;
          v.muted = true;
          marcaSom();
        });
      }
      track(somLigado ? "reel_sound_on" : "reel_sound_off", { reel: dados[cur].id });
      pinta();
    };
    btSom.addEventListener("click", somClique);
    const calaOutro = ouveSom("reels", () => {
      if (!somLigado) return;
      somLigado = false;
      lis.forEach((li) => (li.querySelector("video")!.muted = true));
      marcaSom();
    });

    // mouse drag, finger swipe, horizontal trackpad (one reel per gesture); vertical scroll stays free
    let x0: number | null = null;
    const prime = (e: PointerEvent) => {
      arrastou = false;
      if (e.pointerType === "mouse" && !(e.target as Element).closest(".reels-barra")) x0 = e.clientX;
    };
    palco.addEventListener("pointerdown", prime, { passive: true });
    const solta = (e: PointerEvent) => {
      if (x0 === null) return;
      const dx = e.clientX - x0;
      x0 = null;
      if (Math.abs(dx) > 40) {
        arrastou = true;
        vai(cur + (dx < 0 ? 1 : -1));
      }
    };
    addEventListener("pointerup", solta, { passive: true });
    let trav = false;
    let acum = 0;
    let tAcum = 0;
    const roda = (e: WheelEvent) => {
      if (e.ctrlKey) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.1) return;
      e.preventDefault();
      acum += e.deltaX;
      if (trav) acum = 0;
      else if (Math.abs(acum) > 28) {
        vai(cur + (acum > 0 ? 1 : -1));
        acum = 0;
        trav = true;
      }
      clearTimeout(tAcum);
      tAcum = window.setTimeout(() => {
        acum = 0;
        trav = false;
      }, 200);
    };
    raiz.addEventListener("wheel", roda, { passive: false });
    let t0: { x: number; y: number } | null = null;
    const tIni = (e: TouchEvent) => {
      if ((e.target as Element).closest(".reels-barra")) {
        t0 = null;
        return;
      }
      const t = e.touches[0];
      t0 = { x: t.clientX, y: t.clientY };
    };
    const tFim = (e: TouchEvent) => {
      if (!t0) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - t0.x;
      const dy = t.clientY - t0.y;
      t0 = null;
      if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.2) vai(cur + (dx < 0 ? 1 : -1));
    };
    raiz.addEventListener("touchstart", tIni, { passive: true });
    raiz.addEventListener("touchend", tFim, { passive: true });
    // iPhone in low power mode: a tap with the deck in view starts the front reel. A tap on the deck itself is left
    // to its own click handlers: playing here first would make the card's click pause the reel at once.
    const toque = (e: TouchEvent) => {
      if (!dentro || parado() || raiz.contains(e.target as Node)) return;
      const v = lis[cur].querySelector("video")!;
      if (v.paused && !lis[cur].dataset.mao) v.play().catch(() => {});
    };
    addEventListener("touchend", toque, { capture: true, passive: true });
    const io = new IntersectionObserver(
      (es) => {
        dentro = es[0].isIntersecting;
        pinta();
      },
      { threshold: 0.3 },
    );
    io.observe(raiz);
    const vis = () => {
      if (document.hidden) lis[cur].querySelector("video")!.pause();
      else pinta();
    };
    document.addEventListener("visibilitychange", vis);
    mq.addEventListener("change", pinta);
    pinta();

    return () => {
      io.disconnect();
      calaOutro();
      clearTimeout(tAcum);
      removeEventListener("pointerup", solta);
      removeEventListener("touchend", toque, { capture: true });
      document.removeEventListener("visibilitychange", vis);
      mq.removeEventListener("change", pinta);
      btAnt.removeEventListener("click", ant);
      btSeg.removeEventListener("click", seg);
      btSom.removeEventListener("click", somClique);
      raiz.removeEventListener("keydown", teclas);
      raiz.removeEventListener("wheel", roda);
      raiz.removeEventListener("touchstart", tIni);
      raiz.removeEventListener("touchend", tFim);
      palco.removeEventListener("pointerdown", prime);
      lis.forEach((li) => {
        li.querySelector("video")!.pause();
        li.remove();
      });
    };
  }, [reels]);

  const n = String(reels.length).padStart(2, "0");
  return (
    <div ref={raizRef} data-leitor className="reels" aria-roledescription="carousel" aria-label={rotulo} tabIndex={0}>
      <ul className="reels-palco" data-reels-palco />
      <div className="reels-painel vidro">
        <button type="button" className="reels-seta" data-reels-ant aria-label="Reel anterior">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 5l-7 7 7 7" />
          </svg>
        </button>
        <span className="reels-num" data-reels-num aria-live="polite">
          01 / {n}
        </span>
        <button type="button" className="reels-seta" data-reels-seg aria-label="Reel seguinte">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
        <span className="reels-sep" aria-hidden="true" />
        <button type="button" className="reels-seta" data-reels-som aria-pressed="false" aria-label="Ligar o som" />
      </div>
    </div>
  );
}

/* ---------------- the technical drawing: page 1 of a contract at real A4 size ---------------- */
/** The deck in its section: rises when a quarter is in view, then the front reel plays. */
export function MesaReels({ className = "" }: { className?: string }) {
  const mesa = useRef<HTMLDivElement>(null);
  const pousou = useInView(mesa, { once: true, amount: 0.25 });
  return (
    <div ref={mesa} className={`mesa relative mx-auto max-w-7xl px-5 sm:px-8 ${pousou ? "pousou" : ""} ${className}`}>
      <div className="mesa-reels">
        <Carrossel />
      </div>
    </div>
  );
}
