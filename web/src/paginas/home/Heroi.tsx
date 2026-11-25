import { motion } from "framer-motion";
import { FALAR, HERO_FILM, WA_HREF, curva, type Linhas } from "../../base";
import { Filme } from "../../filme";
import { BotaoFantasma, TextoDesfocado, WhatsApp, useCortina, useMov } from "../../ui";

const H1: Linhas = ["Cada casa tem", "uma história."];
const CLIENTES = ["Dream Maker Imobiliária", "Tomás Marques", "Aurélio Marques"] as const;

/** The format: strong h1 and one sentence on the left, the real 16:9 film on the right, the clients under it. */
export default function Heroi() {
  const aberta = useCortina();
  const mov = useMov();
  const entra = (atraso: number) => ({
    initial: mov ? { opacity: 0, y: 12, filter: "blur(6px)" } : false,
    animate: aberta ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined,
    transition: { duration: 0.55, delay: atraso, ease: curva },
  });

  return (
    <section id="top" aria-labelledby="t-topo" className="relative flex min-h-[100svh] flex-col overflow-hidden pt-24 sm:pt-28">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="grade-fundo absolute inset-0" />
        <div className="absolute right-[-10%] top-[-260px] h-[620px] w-[1000px] rounded-full bg-[radial-gradient(closest-side,rgba(216,195,160,.22),transparent)]" />
        <div className="absolute bottom-[-180px] left-[-12%] h-[420px] w-[760px] rounded-full bg-[radial-gradient(closest-side,rgba(150,126,90,.2),transparent)]" />
      </div>

      {/* text first in the DOM (reading and focus order); the film moves above it on phones only */}
      <div className="relative mx-auto my-auto grid w-full max-w-[1360px] items-center gap-8 px-5 sm:px-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
        <div className="min-w-0">
          <h1 id="t-topo" className="text-balance text-[2.5rem] font-[650] leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-[clamp(3rem,4.6vw,4.4rem)]">
            <TextoDesfocado linhas={H1} ativo={aberta} atraso={0.1} />
          </h1>

          <motion.p {...entra(0.45)} className="mt-5 max-w-md text-pretty text-base leading-relaxed text-mute sm:text-lg">
            Vídeo, fotografia e drone para agentes imobiliários. Tudo num só dia de filmagem.
          </motion.p>

          <motion.div {...entra(0.6)} className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener"
              data-cta="hero"
              className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-white px-7 text-[15px] font-semibold text-ink shadow-[0_0_0_1px_rgba(255,255,255,.3),0_8px_40px_-8px_rgba(216,195,160,.75)] transition hover:shadow-[0_0_0_1px_rgba(255,255,255,.5),0_8px_50px_-6px_rgba(236,222,196,.95)]"
            >
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-mint/60 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <WhatsApp className="relative h-[18px] w-[18px] text-[#128c4a]" />
              <span className="relative">{FALAR}</span>
            </a>
            <BotaoFantasma href="#reels">Ver o trabalho</BotaoFantasma>
          </motion.div>
        </div>

        <div className="order-first min-w-0 lg:order-none">
          <Filme filme={HERO_FILM} modo="heroi" atraso={0.05} legenda="Casa T3 na Foz do Arelho, para a Dream Maker Imobiliária." />
        </div>
      </div>

      <motion.div
        initial={mov ? { opacity: 0, y: 10, filter: "blur(4px)" } : false}
        animate={aberta ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
        transition={{ duration: 0.6, delay: 0.8, ease: curva }}
        className="relative mx-auto flex w-full max-w-[1360px] flex-col items-center gap-3 px-5 pb-8 pt-10 sm:px-8 sm:pb-10"
      >
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/50">Já filmámos para</span>
        <ul className="flex flex-wrap items-center justify-center gap-2.5">
          {CLIENTES.map((c) => (
            <li key={c} className="vidro list-none rounded-full px-4 py-2 text-sm font-medium text-white/85">
              {c}
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
