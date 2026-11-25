import { A } from "../../base";
import { Celula, TituloBloco } from "../../ui";

function Foto({ src, alt, posicao = "center" }: { src: string; alt: string; posicao?: string }) {
  return (
    <img
      src={A(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={{ objectPosition: posicao }}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover/c:scale-[1.04]"
    />
  );
}

const VEU = <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-deep/90 to-transparent" />;

/** What we do, in the words of the current site (DESIGN.md: no prices). */
export default function Servicos() {
  return (
    <section id="servicos" aria-labelledby="t-servicos" className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
      <TituloBloco id="t-servicos" titulo={["Tudo o que a casa precisa.", "Num só dia."]} texto="Tudo o que a casa precisa para chegar ao mercado com nível premium, e conteúdo de autoridade para o agente, todos os meses." />
      <div className="mt-12 grid gap-4 sm:gap-5 lg:grid-cols-6">
        <Celula className="group/c lg:col-span-4" alto="h-64 sm:h-80" titulo="Imóveis" texto="Reel vertical cinematográfico para Instagram, Facebook e TikTok, e fotografia de interiores e exteriores, editada para os portais.">
          <Foto src="img/imovel-foz-do-arelho.webp" alt="Interior da casa T3 na Foz do Arelho, filmada pela Keystory" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-80" titulo="Drone" texto="O imóvel, o terreno e a envolvente vistos de cima, sempre que a legislação o permita." atraso={0.06}>
          <Foto src="img/drone-foz-do-arelho.webp" alt="A Foz do Arelho vista de drone" posicao="30% center" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-72" titulo="Marca pessoal" texto="Studio: 8 vídeos por mês com iluminação profissional. Cinematic: 4 vídeos premium por mês, na rua, com b-roll. Guiões e ganchos escritos por nós." >
          <Foto src="img/marca-pessoal.webp" alt="Reel de marca pessoal do Tomás Marques" posicao="center 30%" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-72" titulo="Fotografia" texto="Interiores e exteriores, editados para os portais. As fotografias chegam em 48 horas." atraso={0.06}>
          <Foto src="img/foto-casa-nazare.webp" alt="Fotografia de uma casa na Nazaré" />
          {VEU}
        </Celula>
        <Celula className="group/c lg:col-span-2" alto="h-64 sm:h-72" titulo="Renders com IA" texto="Terrenos mostrados como vão ficar. A filmagem é real: a zona, a luz e a vista são verdadeiras. Só o que falta construir é gerado." atraso={0.12}>
          <Foto src="img/ai-terreno-nazare.webp" alt="Terreno na Nazaré com a casa gerada por IA" />
          {VEU}
        </Celula>
      </div>
      <div className="mt-5 grid gap-4 sm:gap-5 lg:grid-cols-2">
        <div className="rounded-3xl border border-white/[.08] bg-gradient-to-b from-deep/80 to-ink/80 p-6 sm:p-8">
          <h3 className="text-xl font-extrabold uppercase tracking-[-0.01em] text-white sm:text-2xl">Pack completo</h3>
          <p className="mt-2 text-pretty text-[15px] leading-relaxed text-mute">A tua marca e os teus imóveis num só plano mensal: marca pessoal Studio ou Cinematic, 2 imóveis por mês com vídeo, fotografia e drone, e imóveis extra com condições de cliente.</p>
        </div>
        <div className="relative overflow-hidden rounded-3xl bg-areia p-6 text-ink sm:p-8">
          <span className="inline-block rounded-[3px] bg-ink px-2 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-areia">Lugares limitados</span>
          <h3 className="mt-3 text-xl font-extrabold uppercase tracking-[-0.01em] sm:text-2xl">Condições de fundador</h3>
          <p className="mt-2 text-pretty text-[15px] leading-relaxed text-ink/80">Os primeiros clientes de marca pessoal garantem condições especiais enquanto o plano estiver ativo. Lugares limitados.</p>
        </div>
      </div>
    </section>
  );
}
