import { useEffect, useRef, useState } from "react";
import { ABRE, abreCortina } from "./base";
import { KY_HASTE, KY_LETRAS, KY_PALHETAO, KY_TRANSFORM, KY_VIEWBOX, Palavra } from "./marca";

/*
 * Home intro, from the real mark only. The K and the Y rise, the key shaft drops through the Y, the bit turns in,
 * KEYSTORY wipes in. Then the screen opens as two doors swinging into the house while the logo flies to its place
 * in the header. The lockup has the header's exact proportions, so the flight is a pure translate and scale.
 * A tap or a key skips it. It only runs with html.abre (set in the head: no hash, motion on, not a bot).
 */
export default function Abertura() {
  const [ativa, setAtiva] = useState(ABRE);
  const caixa = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ativa) return;
    const html = document.documentElement;
    let fim = 0;
    let foi = false;
    const voa = (rapido: boolean) => {
      if (foi) return;
      foi = true;
      tira();
      const alvo = document.querySelector("[data-logo-topo]");
      const el = logo.current;
      if (alvo && el) {
        const de = el.getBoundingClientRect();
        const para = alvo.getBoundingClientRect();
        el.animate(
          [{ transform: "translate(0, 0) scale(1)" }, { transform: `translate(${para.left - de.left}px, ${para.top - de.top}px) scale(${para.height / de.height})` }],
          { duration: rapido ? 420 : 820, easing: "cubic-bezier(.7, 0, .2, 1)", fill: "forwards" },
        );
      }
      caixa.current?.classList.add("sai");
      abreCortina();
      fim = window.setTimeout(
        () => {
          html.classList.remove("abre");
          setAtiva(false);
        },
        rapido ? 560 : 1050,
      );
    };
    const salta = () => {
      caixa.current?.classList.add("salta");
      requestAnimationFrame(() => voa(true));
    };
    const gestos = ["pointerdown", "keydown"] as const;
    const tira = () => gestos.forEach((t) => removeEventListener(t, salta, true));
    gestos.forEach((t) => addEventListener(t, salta, true));
    const t = window.setTimeout(() => voa(false), 1500);
    return () => {
      clearTimeout(t);
      clearTimeout(fim);
      tira();
    };
  }, [ativa]);

  if (!ativa) return null;
  return (
    <div ref={caixa} className="abertura" aria-hidden="true">
      <span className="ab-porta e" />
      <span className="ab-porta d" />
      <div ref={logo} className="ab-logo">
        <div className="ab-clique">
          <svg viewBox={KY_VIEWBOX} className="ab-ky" fill="currentColor" fillRule="evenodd">
            <g transform={KY_TRANSFORM}>
              <path className="ab-letras" d={KY_LETRAS} />
              <path className="ab-haste" d={KY_HASTE} />
              <path className="ab-palhetao" d={KY_PALHETAO} />
            </g>
          </svg>
          <Palavra className="ab-nome" />
        </div>
      </div>
    </div>
  );
}
