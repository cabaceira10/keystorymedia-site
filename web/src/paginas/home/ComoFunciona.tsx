import { motion } from "framer-motion";
import { curva } from "../../base";
import { TituloBloco, useMov } from "../../ui";

const PASSOS = [
  ["Planeamento", "Falamos no WhatsApp, percebemos o imóvel ou a tua marca e enviamos o plano e os guiões antes de filmar."],
  ["Um dia de filmagem", "Vídeo, fotografia e drone no mesmo dia, para não perderes tempo."],
  ["Entrega", "Fotografias em 48 horas e vídeos editados em 5 dias úteis, prontos a publicar."],
] as const;

/** The 3 steps from the offer PDF (DESIGN.md). */
export default function ComoFunciona() {
  const mov = useMov();
  return (
    <section id="como-funciona" aria-labelledby="t-como" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <TituloBloco id="t-como" titulo={["Como funciona.", "Três passos, um dia."]} />
      <ol className="relative mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
        {PASSOS.map(([t, p], i) => (
          <motion.li
            key={t}
            initial={mov ? { opacity: 0, y: 24, filter: "blur(6px)" } : false}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: curva }}
            className="cartao list-none rounded-3xl border border-white/[.08] bg-gradient-to-b from-deep/80 to-ink/80 p-6 sm:p-8"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full border border-areia/40 text-[15px] font-semibold text-areia">{i + 1}</span>
            <h3 className="mt-5 text-lg font-semibold tracking-[-0.015em] text-white">{t}</h3>
            <p className="mt-2 text-pretty text-[15px] leading-relaxed text-mute">{p}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  );
}
