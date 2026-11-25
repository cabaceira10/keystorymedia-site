import { MesaReels } from "../../reels";
import { DuasLinhas, Surge, tituloH2 } from "../../ui";

/** The format: who it is for on the left, the real reels on the deck. */
export default function Reels() {
  return (
    <section id="reels" aria-labelledby="t-reels" className="relative overflow-x-clip py-16 sm:py-24">
      <div className="relative mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Surge>
          <h2 id="t-reels" className={`${tituloH2} lg:text-[3.2rem]`}>
            <DuasLinhas l={["Provavelmente", "já nos viste aqui."]} />
          </h2>
        </Surge>
        <Surge atraso={0.12} className="lg:pt-3">
          <p className="border-t border-white/15 pt-5 text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Seis reels reais, feitos para o Instagram, onde os vendedores escolhem o agente: casas e apartamentos na Nazaré, um terreno com o lote marcado na imagem e a marca pessoal do Tomás Marques. Toca num para ouvir.
          </p>
        </Surge>
      </div>
      <MesaReels className="mt-10 lg:mt-12" />
    </section>
  );
}
