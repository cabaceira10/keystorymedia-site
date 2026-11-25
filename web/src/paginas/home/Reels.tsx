import { MesaReels } from "../../reels";
import { DuasLinhas, Surge, tituloH2 } from "../../ui";

/** Title and line centred, the reel deck centred below them. */
export default function Reels() {
  return (
    <section id="reels" aria-labelledby="t-reels" className="relative overflow-x-clip py-16 sm:py-24">
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-5 text-center sm:px-8">
        <Surge>
          <h2 id="t-reels" className={`${tituloH2} lg:text-[3.2rem]`}>
            <DuasLinhas l={["Provavelmente", "já nos viste aqui."]} />
          </h2>
        </Surge>
        <Surge atraso={0.12}>
          <p className="mx-auto max-w-xl text-pretty text-base leading-relaxed text-white/80 sm:text-lg">
            Aqui tens alguns exemplos do nosso trabalho. Toca num para ouvir.
          </p>
        </Surge>
      </div>
      <MesaReels className="mt-10 lg:mt-12" />
    </section>
  );
}
