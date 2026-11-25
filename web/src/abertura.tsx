import { useEffect, useRef, useState } from "react";
import { ABRE, abreCortina } from "./base";
import { KY_HASTE, KY_LETRAS, KY_PALHETAO, KY_TRANSFORM, KY_VIEWBOX, Palavra } from "./marca";

/*
 * Home intro, built only from the real KY mark: the K and the Y rise into place, the key shaft drops through the Y,
 * the bit snaps on like a key turning, then KEYSTORY wipes in. At 1.65 s the logo flies to [data-logo-topo] and the
 * curtain lifts. A tap or a key skips it. It only runs with html.abre (set in the head: no hash, motion on, not a bot).
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
          { duration: rapido ? 380 : 650, easing: "cubic-bezier(.65, 0, .35, 1)", fill: "forwards" },
        );
      }
      caixa.current?.classList.add("sai");
      abreCortina();
      fim = window.setTimeout(
        () => {
          html.classList.remove("abre");
          setAtiva(false);
        },
        rapido ? 640 : 680,
      );
    };
    const salta = () => {
      caixa.current?.classList.add("salta");
      requestAnimationFrame(() => voa(true));
    };
    const gestos = ["pointerdown", "keydown"] as const;
    const tira = () => gestos.forEach((t) => removeEventListener(t, salta, true));
    gestos.forEach((t) => addEventListener(t, salta, true));
    const t = window.setTimeout(() => voa(false), 1650);
    return () => {
      clearTimeout(t);
      clearTimeout(fim);
      tira();
    };
  }, [ativa]);

  if (!ativa) return null;
  return (
    <div ref={caixa} className="abertura" aria-hidden="true">
      <div className="abertura-fundo" />
      <span className="abertura-corte" />
      <div ref={logo} className="abertura-logo">
        <svg viewBox={KY_VIEWBOX} className="abertura-marca" fill="currentColor" fillRule="evenodd">
          <g transform={KY_TRANSFORM}>
            <path className="ab-letras" d={KY_LETRAS} />
            <path className="ab-haste" d={KY_HASTE} />
            <path className="ab-palhetao" d={KY_PALHETAO} />
          </g>
        </svg>
        <span className="abertura-nomecx">
          <Palavra className="abertura-nome" />
          <span className="abertura-feixe" />
        </span>
      </div>
    </div>
  );
}
