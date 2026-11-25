import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { A, HERO_FILM, WA_HREF, curva } from "../../base";
import { Play, WhatsApp, useCortina, useMov } from "../../ui";

/** The video: poster and play button; the tap itself starts it with sound (iOS needs play() inside the gesture). */
function Video() {
  const v = useRef<HTMLVideoElement>(null);
  const [anda, setAnda] = useState(false);
  const [src] = useState(() => (HERO_FILM.src1080 && innerWidth * (devicePixelRatio || 1) > 1000 ? HERO_FILM.src1080 : HERO_FILM.src720));
  const toca = () => {
    const el = v.current!;
    el.muted = false;
    el.play().catch(() => {
      el.muted = true;
      el.play().catch(() => {});
    });
    setAnda(true);
  };
  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-night shadow-[0_40px_100px_-30px_rgba(0,0,0,.8)] ring-1 ring-white/15">
      <video
        ref={v}
        src={A(src)}
        poster={A(HERO_FILM.poster)}
        preload="none"
        playsInline
        webkit-playsinline="true"
        controls={anda}
        aria-label={HERO_FILM.label}
        className="h-full w-full object-cover"
      />
      {!anda && (
        <button type="button" onClick={toca} aria-label="Ver o vídeo de 91 segundos com som" className="group absolute inset-0 overflow-hidden">
          <span aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,22,33,.35),rgba(13,22,33,.78))]" />
          <span aria-hidden="true" className="absolute inset-x-0 top-[13%] text-center text-[11px] font-bold uppercase tracking-[0.14em] text-white/85 sm:text-sm">Uma casa na Foz do Arelho em</span>
          <span aria-hidden="true" className="gancho absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[2.3rem] font-black uppercase leading-none tracking-[-0.03em] text-areia sm:text-[6.2rem]">91 segundos</span>
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-marfim text-ink shadow-[0_0_0_8px_rgba(244,239,232,.22),0_18px_40px_-8px_rgba(0,0,0,.8)] transition duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
            <Play className="ml-1 h-7 w-7 sm:h-9 sm:w-9" />
          </span>
          <span aria-hidden="true" className="absolute bottom-[9%] left-1/2 -translate-x-1/2 whitespace-nowrap rounded-[4px] bg-areia px-2.5 py-1 text-[11px] font-bold text-ink sm:text-[13px]">Carrega e ouve com som</span>
        </button>
      )}
    </div>
  );
}

/** Headline, sub headline, video, CTA: one centred column, the video sitting on the line where navy turns ivory. */
export default function Heroi() {
  const aberta = useCortina();
  const mov = useMov();
  const entra = (atraso: number) => ({
    initial: mov ? { opacity: 0, y: 14, filter: "blur(6px)" } : false,
    animate: aberta ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 0.6, delay: atraso, ease: curva },
  });

  return (
    <section id="top" aria-labelledby="t-topo" className="relative overflow-hidden pt-24 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grade-fundo absolute inset-0" />
        <div className="absolute left-1/2 top-[-240px] h-[620px] w-[1000px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(216,195,160,.2),transparent)]" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">
        <motion.p {...entra(0.05)} className="rounded-[3px] bg-marfim px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.06em] text-ink sm:text-[11px]">
          Para agentes imobiliários<span className="hidden sm:inline"> | Caldas da Rainha · Leiria · Nazaré · Óbidos</span>
        </motion.p>

        <motion.h1 {...entra(0.12)} id="t-topo" className="mt-6 max-w-[22ch] text-balance text-[1.85rem] font-extrabold uppercase leading-[1.08] tracking-[-0.01em] text-white sm:text-5xl lg:text-[3.4rem]">
          Estás a perder angariações para quem filma melhor?
        </motion.h1>

        <motion.p {...entra(0.3)} className="mt-5 max-w-2xl text-pretty text-lg leading-snug text-white/85 sm:text-2xl">
          Vídeo, fotografia e drone que vendem os teus imóveis mais depressa. Num só dia de filmagem.
        </motion.p>

        <motion.div {...entra(0.45)} className="relative mt-8 w-full max-w-3xl">
          <div aria-hidden="true" className="absolute bottom-[-2000px] left-1/2 top-1/2 -z-10 w-[100vw] -translate-x-1/2 bg-marfim" />
          <Video />
        </motion.div>

        <motion.p {...entra(0.6)} className="mt-7 max-w-xl text-pretty text-[15px] leading-relaxed text-ink/80 sm:text-base">
          Num só dia filmamos o imóvel. Recebes <strong className="font-bold text-ink">fotografias em 48 horas e vídeo em 5 dias úteis</strong>, feitos pela equipa que já filmou para a Dream Maker Imobiliária, o Tomás Marques e o Aurélio Cavaleiro.
        </motion.p>

        <motion.div {...entra(0.7)} className="mb-12 mt-6 w-full sm:mb-16 sm:w-auto">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener"
            data-cta="hero"
            className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-5 text-[12.5px] font-bold uppercase tracking-[0.02em] sm:px-9 sm:text-[15px] sm:tracking-[0.06em] text-marfim shadow-[0_14px_40px_-12px_rgba(20,32,47,.7)] transition hover:bg-deep sm:w-auto"
          >
            <WhatsApp className="h-5 w-5 text-wa" />
            Quero isto para os meus imóveis
          </a>
        </motion.div>
      </div>
    </section>
  );
}
