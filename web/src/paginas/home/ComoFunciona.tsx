import { motion } from "framer-motion";
import { curva } from "../../base";
import { TituloBloco, tituloH2, useMov } from "../../ui";

const PASSOS = [
  ["Planeamento", "Falamos no WhatsApp, percebemos o imóvel ou a tua marca e enviamos o plano e os guiões antes de filmar."],
  ["Um dia de filmagem", "Vídeo, fotografia e drone no mesmo dia, para não perderes tempo."],
  ["Entrega", "Fotografias em 48 horas e vídeos editados em 5 dias úteis, prontos a publicar."],
] as const;

/** The 3 steps from the offer PDF (DESIGN.md), on the ivory band: the light half of the hero, again. */
export default function ComoFunciona() {
  const mov = useMov();
  return (
    <section id="como-funciona" aria-labelledby="t-como" className="relative bg-marfim text-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <TituloBloco id="t-como" titulo={["Do WhatsApp ao reel.", "Em três passos."]} h2Classe={`${tituloH2} !text-ink [&_.l2]:!text-teal`} />
        <ol className="relative mt-12 grid gap-4 sm:gap-5 lg:grid-cols-3">
          {PASSOS.map(([t, p], i) => (
            <motion.li
              key={t}
              initial={mov ? { opacity: 0, y: 24 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: curva }}
              className="relative list-none overflow-hidden rounded-2xl bg-white p-6 shadow-[0_24px_60px_-30px_rgba(20,32,47,.35)] ring-1 ring-ink/[.06] sm:p-8"
            >
              <span aria-hidden="true" className="contorno-escuro absolute -right-2 -top-6 text-[8rem] font-black lg:text-[6rem] leading-none tracking-[-0.06em]">0{i + 1}</span>
              <span className="relative text-xs font-extrabold uppercase tracking-[0.16em] text-teal">Passo {i + 1}</span>
              <h3 className="relative mt-3 text-2xl font-extrabold uppercase leading-tight tracking-[-0.01em]">{t}</h3>
              <p className="relative mt-3 text-pretty text-[15px] leading-relaxed text-ink/70">{p}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
