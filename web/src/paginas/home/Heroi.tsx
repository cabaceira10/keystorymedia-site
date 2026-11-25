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
        <button type="button" onClick={toca} aria-label="Ver o vídeo" className="group absolute inset-0 grid place-items-center">
          <span className="grid h-20 w-20 place-items-center rounded-full bg-areia text-ink shadow-[0_0_0_10px_rgba(216,195,160,.25),0_20px_50px_-10px_rgba(0,0,0,.7)] transition group-hover:scale-105 sm:h-24 sm:w-24">
            <Play className="ml-1 h-8 w-8 sm:h-10 sm:w-10" />
          </span>
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
        <motion.p {...entra(0.05)} className="rounded-md bg-white/[.08] px-3 py-1.5 text-[9.5px] font-semibold uppercase tracking-[0.1em] sm:tracking-[0.16em] text-areia ring-1 ring-white/10 sm:text-xs">
          Caldas da Rainha · Leiria · Nazaré · Óbidos
        </motion.p>

        <motion.h1 {...entra(0.12)} id="t-topo" className="mt-6 text-balance text-[1.95rem] font-extrabold uppercase leading-[1.08] tracking-[-0.01em] text-white sm:text-5xl lg:text-[3.4rem]">
          Os teus imóveis param o scroll?
        </motion.h1>

        <motion.p {...entra(0.3)} className="mt-5 max-w-2xl text-pretty text-lg leading-snug text-white/85 sm:text-2xl">
          Vídeo, fotografia e drone para agentes imobiliários. Tudo num só dia de filmagem.
        </motion.p>

        <motion.div {...entra(0.45)} className="relative mt-8 w-full max-w-3xl">
          <div aria-hidden="true" className="absolute bottom-[-2000px] left-1/2 top-1/2 -z-10 w-[100vw] -translate-x-1/2 bg-marfim" />
          <Video />
        </motion.div>

        <motion.p {...entra(0.6)} className="mt-7 max-w-xl text-pretty text-[15px] leading-relaxed text-ink/80 sm:text-base">
          Filmamos o imóvel, tratamos da edição e entregamos <strong className="font-bold text-ink">fotografias em 48 horas e vídeos em 5 dias úteis</strong>, prontos a publicar no Instagram e nos portais.
        </motion.p>

        <motion.div {...entra(0.7)} className="mb-12 mt-6 w-full sm:mb-16 sm:w-auto">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener"
            data-cta="hero"
            className="inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-6 text-[13px] font-bold sm:px-9 sm:text-[15px] uppercase tracking-[0.06em] text-marfim shadow-[0_14px_40px_-12px_rgba(20,32,47,.7)] transition hover:bg-deep sm:w-auto"
          >
            <WhatsApp className="h-5 w-5 text-wa" />
            Quero filmar o meu imóvel
          </a>
        </motion.div>
      </div>
    </section>
  );
}
