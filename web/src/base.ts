import { HERO_FILM, type Filme } from "./filme-heroi";

export { HERO_FILM };
export type { Filme };

export type Linhas = readonly [string, string];

const raiz = document.getElementById("raiz");
export const RAIZ = raiz?.dataset.raiz || "./";

export const A = (p: string) => RAIZ + p;
export const R = (p: string) => RAIZ + p;

/** The home is one page: the nav links are its sections. */
export const NAV: ReadonlyArray<readonly [string, string]> = [
  ["Trabalho", "#reels"],
  ["Serviços", "#servicos"],
  ["Como funciona", "#como-funciona"],
  ["Perguntas", "#perguntas"],
];

export const curva: [number, number, number, number] = [0.2, 0.7, 0.1, 1];
export const ABRE = document.documentElement.classList.contains("abre");
export const movLigado = () => document.documentElement.dataset.mov !== "off";

/* contacts (DESIGN.md, decided with Cabs) */
export const FALAR = "Falar no WhatsApp";
export const TELEFONE = "+351 910 491 092";
export const INSTAGRAM = "https://www.instagram.com/keystorymedia/";
const WA_NUMERO = "351910491092";
const WA_TEXTO = "Olá! Vi o site da Keystory e gostei do vosso trabalho. Sou agente imobiliário e queria saber mais sobre como podem ajudar-me.";
export const WA_HREF = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(WA_TEXTO)}`;

export const CHAVE_CALMO = "ks-calm";

export const chaveFilme = (f: Filme) => f.src720.replace(/^.*\//, "").replace(/\.\w+$/, "");

/* one sound at a time: a player that takes the sound tells the others to go quiet */
export function pedeSom(dono: string) {
  dispatchEvent(new CustomEvent<string>("ks-som", { detail: dono }));
}
export function ouveSom(dono: string, calar: () => void) {
  const f = (e: Event) => {
    if ((e as CustomEvent<string>).detail !== dono) calar();
  };
  addEventListener("ks-som", f);
  return () => removeEventListener("ks-som", f);
}

/* the home intro tells the page when the curtain starts to lift */
let cortina = !ABRE;
export const cortinaAberta = () => cortina;
export function abreCortina() {
  if (cortina) return;
  cortina = true;
  dispatchEvent(new Event("lv-cortina"));
}
