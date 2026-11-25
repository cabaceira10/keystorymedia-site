import { Surge } from "../../ui";

const NOMES = ["Dream Maker Imobiliária", "Tomás Marques", "Aurélio Marques"];
const NUMEROS = [
  ["1", "dia", "de filmagem: vídeo, fotografia e drone"],
  ["48", "horas", "e tens as fotografias"],
  ["5", "dias úteis", "e tens o vídeo editado"],
] as const;

/** Social proof right under the hero: who we already filmed for, then the three delivery numbers. */
export default function Prova() {
  const fila = [...NOMES, ...NOMES, ...NOMES, ...NOMES];
  return (
    <section aria-label="Para quem já filmámos e em quanto tempo entregamos" className="relative overflow-hidden bg-night py-14 sm:py-20">
      <p className="text-center text-[11px] font-extrabold uppercase tracking-[0.18em] text-mute sm:text-xs">Já filmámos para</p>
      <div className="mt-5 flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]" aria-hidden="true">
        <div className="fita flex shrink-0 items-center">
          {fila.map((n, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className={`text-[2.6rem] font-black uppercase leading-none tracking-[-0.02em] sm:text-[5.5rem] ${i % 2 ? "text-areia" : "contorno"}`}>{n}</span>
              <span className="mx-6 h-2.5 w-2.5 rounded-full bg-areia sm:mx-10 sm:h-3.5 sm:w-3.5" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">Dream Maker Imobiliária, Tomás Marques e Aurélio Marques.</p>
      <div className="mx-auto mt-12 grid max-w-6xl grid-cols-3 gap-3 px-5 sm:mt-16 sm:gap-8 sm:px-8">
        {NUMEROS.map(([n, u, d], i) => (
          <Surge key={u} atraso={i * 0.08}>
            <div className="border-t border-white/15 pt-4 sm:pt-6">
              <span className="block text-[3.3rem] font-black leading-[.9] tracking-[-0.05em] text-white sm:text-[7rem]">{n}</span>
              <span className="mt-1 block text-[13px] font-extrabold uppercase tracking-[0.02em] text-areia sm:mt-2 sm:text-2xl">{u}</span>
              <span className="mt-1 block text-[12px] leading-snug text-mute sm:mt-2 sm:text-base">{d}</span>
            </div>
          </Surge>
        ))}
      </div>
    </section>
  );
}
