import { useEffect, useRef, useState } from "react";
import { A } from "../../base";
import { Play, Surge, TituloBloco } from "../../ui";

const FOTOS = [
  { titulo: "Casa Nazaré", dir: "casa-nazare", n: 10 },
  { titulo: "Casa Nazaré II", dir: "casa-nazare-2", n: 10 },
  { titulo: "Apartamento Nazaré", dir: "apartamento-nazare", n: 10 },
  { titulo: "Apartamento Nazaré II", dir: "apartamento-nazare-2", n: 10 },
] as const;

const RENDERS = [
  { titulo: "Terreno Nazaré I", src: "campaign/film/ai-terreno-nazare-1.mp4", poster: "img/ai-terreno-nazare.webp" },
  { titulo: "Terreno Nazaré II", src: "campaign/film/ai-terreno-nazare-2.mp4", poster: "img/ai-terreno-nazare-2.webp" },
] as const;

const foto = (dir: string, i: number, mini = false) => A(`assets/img/${dir}/${String(i + 1).padStart(2, "0")}${mini ? "-t" : ""}.webp`);

/** A film that starts on the tap, with sound (iOS needs play() inside the gesture). */
function Filme({ titulo, src, poster }: { titulo: string; src: string; poster: string }) {
  const v = useRef<HTMLVideoElement>(null);
  const [anda, setAnda] = useState(false);
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
    <figure>
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-night ring-1 ring-white/10">
        <video ref={v} src={A(src)} poster={A(poster)} preload="none" playsInline controls={anda} aria-label={titulo} className="h-full w-full object-cover" />
        {!anda && (
          <button type="button" onClick={toca} aria-label={`Ver o vídeo: ${titulo}`} className="group absolute inset-0 grid place-items-center bg-night/25">
            <span className="grid h-16 w-16 place-items-center rounded-full bg-marfim sm:h-24 sm:w-24 text-ink shadow-[0_0_0_8px_rgba(244,239,232,.2),0_18px_40px_-8px_rgba(0,0,0,.8)] transition duration-300 group-hover:scale-110">
              <Play className="ml-1 h-7 w-7 sm:h-10 sm:w-10" />
            </span>
          </button>
        )}
      </div>
      <figcaption className="mt-3 text-sm font-extrabold uppercase tracking-[0.04em] text-white">{titulo}</figcaption>
    </figure>
  );
}

/** Full-screen photo viewer: arrows on screen and on the keyboard, Escape closes. */
function Visor({ dir, titulo, n, i, muda, fecha }: { dir: string; titulo: string; n: number; i: number; muda: (i: number) => void; fecha: () => void }) {
  useEffect(() => {
    const tecla = (e: KeyboardEvent) => {
      if (e.key === "Escape") fecha();
      if (e.key === "ArrowRight") muda((i + 1) % n);
      if (e.key === "ArrowLeft") muda((i + n - 1) % n);
    };
    document.addEventListener("keydown", tecla);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
    };
  }, [i, n, muda, fecha]);
  const seta = "grid h-12 w-12 place-items-center rounded-full bg-white/10 text-2xl text-white backdrop-blur transition hover:bg-white/20";
  return (
    <div role="dialog" aria-modal="true" aria-label={`${titulo}, fotografia ${i + 1} de ${n}`} className="fixed inset-0 z-[90] flex flex-col bg-night/95 p-3 sm:p-6" onClick={fecha}>
      <div className="flex items-center justify-between text-sm font-bold uppercase tracking-[0.06em] text-white">
        <span>
          {titulo} · {String(i + 1).padStart(2, "0")}/{n}
        </span>
        <button type="button" onClick={fecha} aria-label="Fechar" className={seta}>
          ×
        </button>
      </div>
      <div className="relative mt-3 min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
        <img src={foto(dir, i)} alt={`${titulo}, fotografia ${i + 1}`} className="h-full w-full object-contain" />
        <button type="button" onClick={() => muda((i + n - 1) % n)} aria-label="Fotografia anterior" className={`${seta} absolute left-1 top-1/2 -translate-y-1/2`}>
          ‹
        </button>
        <button type="button" onClick={() => muda((i + 1) % n)} aria-label="Fotografia seguinte" className={`${seta} absolute right-1 top-1/2 -translate-y-1/2`}>
          ›
        </button>
      </div>
    </div>
  );
}

/** The portfolio the old site had: the photo sets and the two AI render films. */
export default function Portefolio() {
  const [casa, setCasa] = useState(0);
  const [aberta, setAberta] = useState<number | null>(null);
  const c = FOTOS[casa];
  return (
    <section id="portefolio" aria-labelledby="t-portefolio" className="relative mx-auto max-w-[1500px] px-5 py-20 sm:px-8 sm:py-24">
      <TituloBloco id="t-portefolio" titulo={["Não acredites em nós.", "Vê o trabalho."]} />

      <Surge>
        <h3 className="mt-12 text-2xl font-extrabold uppercase tracking-[-0.01em] text-white sm:text-4xl">Fotografia</h3>
        <p className="mt-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-mute">Interiores e exteriores, editados para os portais. Toca numa fotografia para a ver em grande.</p>
      </Surge>
      <div role="tablist" aria-label="Imóveis fotografados" className="mt-5 flex flex-wrap gap-2">
        {FOTOS.map((f, i) => (
          <button
            key={f.dir}
            type="button"
            role="tab"
            aria-selected={i === casa}
            onClick={() => setCasa(i)}
            className={`h-10 rounded-full px-4 text-[13px] font-bold uppercase tracking-[0.02em] transition ${i === casa ? "bg-areia text-ink" : "bg-white/[.06] text-soft ring-1 ring-white/10 hover:bg-white/[.12]"}`}
          >
            {f.titulo}
          </button>
        ))}
      </div>
      <div className="-mx-5 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-3 sm:-mx-8 sm:px-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {Array.from({ length: c.n }, (_, i) => (
          <button key={`${c.dir}-${i}`} type="button" onClick={() => setAberta(i)} aria-label={`${c.titulo}, abrir a fotografia ${i + 1}`} className="group relative aspect-[3/2] w-[86vw] max-w-[760px] flex-none snap-start overflow-hidden rounded-2xl bg-deep ring-1 ring-white/10">
            <img src={foto(c.dir, i)} alt="" loading="lazy" decoding="async" draggable={false} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
          </button>
        ))}
      </div>

      <Surge>
        <h3 className="mt-20 text-2xl font-extrabold uppercase tracking-[-0.01em] text-white sm:text-4xl">Renders com IA</h3>
        <p className="mt-2 max-w-2xl text-pretty text-[15px] leading-relaxed text-mute">Filmamos o terreno ou a obra e usamos IA para revelar o projeto acabado. O comprador vê a casa antes de haver casa.</p>
      </Surge>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        {RENDERS.map((r) => (
          <Filme key={r.src} {...r} />
        ))}
      </div>

      {aberta !== null && <Visor dir={c.dir} titulo={c.titulo} n={c.n} i={aberta} muda={setAberta} fecha={() => setAberta(null)} />}
    </section>
  );
}
