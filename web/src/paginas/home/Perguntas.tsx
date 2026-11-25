import { Surge, TituloBloco } from "../../ui";

// The questions and answers of the current site, word for word.
const PERGUNTAS = [
  ["Quanto custa?", "Depende do imóvel e do plano. Temos packs de 1, 2 e 3 casas e planos mensais de marca pessoal. Fala connosco no WhatsApp e enviamos as condições."],
  ["Em quanto tempo recebo as fotos e o vídeo?", "As fotografias em 48 horas e o vídeo em 5 dias úteis."],
  ["O drone está sempre incluído?", "Sim, sempre que a legislação o permita."],
  ["Como funcionam os packs de 2 e 3 casas?", "Pagas o pack de uma vez, com desconto por casa. Em troca, filmamos as casas todas juntas, no mesmo dia ou, no máximo, em dois dias."],
  ["Na marca pessoal, tenho de saber falar para a câmara?", "Não. Escrevemos os guiões e os ganchos e orientamos-te durante a gravação."],
  ["Há compromisso mínimo nos planos mensais?", "Sim, 3 meses: é o tempo que uma marca pessoal precisa para ganhar tração."],
] as const;

export default function Perguntas() {
  return (
    <section id="perguntas" aria-labelledby="t-perguntas" className="relative mx-auto grid max-w-7xl gap-10 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
      <TituloBloco id="t-perguntas" titulo={["Perguntas", "que nos fazem."]} />
      <Surge atraso={0.08}>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {PERGUNTAS.map(([q, r]) => (
            <details key={q} className="pergunta group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-base font-semibold tracking-[-0.01em] text-white sm:text-lg [&::-webkit-details-marker]:hidden">
                {q}
                <span aria-hidden="true" className="relative h-4 w-4 shrink-0">
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-4 -translate-y-1/2 bg-areia" />
                  <span className="absolute left-1/2 top-0 h-4 w-[1.5px] -translate-x-1/2 bg-areia transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-5 pr-10 text-pretty text-[15px] leading-relaxed text-mute sm:text-base">{r}</p>
            </details>
          ))}
        </div>
      </Surge>
    </section>
  );
}
