import { useEffect, useRef, useState, type CSSProperties } from "react";
import { A, FALAR, WA_HREF } from "../../base";
import { WhatsApp } from "../../ui";

// The closing card (Imogrow quote layout: logo in its orbit, stars, headline) with one action: open WhatsApp.

// A fixed sky: the same stars on every render, so nothing jumps when React paints again.
const ESTRELAS = Array.from({ length: 44 }, (_, i) => {
  const r = (n: number) => ((Math.sin(i * 12.9898 + n * 78.233) * 43758.5453) % 1 + 1) % 1;
  return { left: `${r(1) * 100}%`, top: `${r(2) * 100}%`, "--d": `${r(3) * 3 + 2}s`, "--a": `${r(4) * 5}s`, "--peak": String(0.15 + r(5) * 0.65) } as CSSProperties;
});

export default function Pedido() {
  const cartao = useRef<HTMLDivElement>(null);
  const [vivo, setVivo] = useState(false);

  useEffect(() => {
    const el = cartao.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        setVivo(true);
        io.disconnect();
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="contacto" aria-labelledby="t-contacto" className="relative px-4 py-20 sm:px-8 sm:py-24">
      <div ref={cartao} className={`ped-zona mx-auto max-w-[560px] ${vivo ? "vivo" : ""}`}>
        <div className="ped-estrelas" aria-hidden="true">
          {ESTRELAS.map((e, i) => (
            <span key={i} className="ped-estrela" style={e} />
          ))}
        </div>
        <div className="ped-cabeca">
          <div className="ped-logo" aria-hidden="true">
            <div className="ped-logo__halo" />
            <div className="ped-logo__anel" />
            <div className="ped-logo__orbita" />
            <div className="ped-logo__base" style={{ WebkitMaskImage: `url(${A("brand/ky.svg")})`, maskImage: `url(${A("brand/ky.svg")})` }} />
          </div>
          <span className="ped-marca">Keystory</span>
          <h2 id="t-contacto">Fala connosco no WhatsApp.</h2>
          <p>Sem reunião e sem compromisso. Manda mensagem para estudarmos o teu caso e percebermos como te podemos ajudar.</p>
        </div>
        <div className="pedido">
          <a href={WA_HREF} target="_blank" rel="noopener" className="aud-botao" data-cta="pedido">
            <WhatsApp className="h-5 w-5" />
            {FALAR}
          </a>
        </div>
      </div>
    </section>
  );
}
