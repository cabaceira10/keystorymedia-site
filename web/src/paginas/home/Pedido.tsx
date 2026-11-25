import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { INSTAGRAM, TELEFONE, WA_NUMERO, curva } from "../../base";
import { Ky } from "../../marca";
import { DuasLinhas, Instagram, Surge, WhatsApp, tituloH2, useMov } from "../../ui";

const QUERO = ["Filmar um imóvel", "Pack de 2 ou 3 casas", "Marca pessoal", "Renders com IA"] as const;
const ZONA = ["Caldas da Rainha", "Leiria", "Nazaré", "Óbidos", "Outra zona"] as const;
const QUANDO = ["Esta semana", "Este mês", "Ainda estou a ver"] as const;
const PASSOS = ["O que queres", "Onde e quando", "Com quem falamos"] as const;

/** Tap choices: one tap selects, no typing. */
function Escolhas({ rotulo, opcoes, valor, muda }: { rotulo: string; opcoes: readonly string[]; valor: string; muda: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="text-xs font-extrabold uppercase tracking-[0.14em] text-teal">{rotulo}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {opcoes.map((o) => (
          <button
            key={o}
            type="button"
            aria-pressed={o === valor}
            onClick={() => muda(o)}
            className={`min-h-12 rounded-xl px-4 text-left text-[15px] font-bold transition ${o === valor ? "bg-ink text-marfim shadow-[0_10px_24px_-12px_rgba(20,32,47,.8)]" : "bg-ink/[.05] text-ink ring-1 ring-ink/10 hover:bg-ink/[.1]"}`}
          >
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

/** The request, three taps at a time. No backend: the last step opens WhatsApp with the answers written out. */
function Formulario() {
  const mov = useMov();
  const [passo, setPasso] = useState(0);
  const [dir, setDir] = useState(1);
  const [quero, setQuero] = useState("");
  const [zona, setZona] = useState("");
  const [quando, setQuando] = useState("");
  const [nome, setNome] = useState("");
  const [nota, setNota] = useState("");
  const [erro, setErro] = useState("");
  const campoNome = useRef<HTMLInputElement>(null);
  const ultimo = passo === PASSOS.length - 1;

  const vai = (p: number) => {
    setErro("");
    setDir(p > passo ? 1 : -1);
    setPasso(p);
  };
  const escolhe = (muda: (v: string) => void, seguinte: boolean) => (v: string) => {
    muda(v);
    setErro("");
    if (seguinte) window.setTimeout(() => vai(passo + 1), 220);
  };
  const continuar = () => {
    if (passo === 0 && !quero) return setErro("Escolhe uma opção para continuar.");
    if (passo === 1 && !zona) return setErro("Escolhe a zona para continuar.");
    vai(passo + 1);
  };
  const mensagem = () =>
    [
      `Olá! Sou ${nome.trim()} e vi o site da Keystory.`,
      `Quero: ${quero}.`,
      `Zona: ${zona}.`,
      quando && `Quando: ${quando}.`,
      nota.trim() && `Nota: ${nota.trim()}`,
    ]
      .filter(Boolean)
      .join("\n");
  const envia = () => {
    if (!nome.trim()) {
      setErro("Diz-nos o teu nome.");
      campoNome.current?.focus();
      return;
    }
    window.open(`https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(mensagem())}`, "_blank", "noopener");
  };

  const campo = "mt-2 w-full rounded-xl bg-ink/[.05] px-4 text-[16px] font-medium text-ink ring-1 ring-ink/10 placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-ink";
  return (
    <div className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-3xl bg-marfim p-5 text-left text-ink shadow-[0_40px_100px_-40px_rgba(0,0,0,.9)] sm:p-8">
      <div className="flex items-center gap-4">
        <motion.span
          key={passo}
          initial={mov ? { rotate: -12, scale: 0.8 } : false}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 14 }}
          className="grid h-12 w-12 flex-none place-items-center rounded-2xl bg-ink text-areia"
        >
          <Ky className="h-6 w-auto" />
        </motion.span>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-ink/50">
            Passo {passo + 1} de {PASSOS.length}
          </p>
          <p className="text-lg font-extrabold uppercase leading-tight tracking-[-0.01em]">{PASSOS[passo]}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-1.5" aria-hidden="true">
        {PASSOS.map((p, i) => (
          <span key={p} className="h-1.5 flex-1 overflow-hidden rounded-full bg-ink/10">
            <motion.span className="block h-full origin-left rounded-full bg-ink" initial={false} animate={{ scaleX: i <= passo ? 1 : 0 }} transition={{ duration: 0.45, ease: curva }} />
          </span>
        ))}
      </div>

      <div className="relative mt-6 min-h-[236px]">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={passo}
            custom={dir}
            initial={mov ? { opacity: 0, x: dir * 44 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={mov ? { opacity: 0, x: dir * -44 } : undefined}
            transition={{ duration: 0.28, ease: curva }}
            className="space-y-5"
          >
            {passo === 0 && <Escolhas rotulo="O que queres?" opcoes={QUERO} valor={quero} muda={escolhe(setQuero, true)} />}
            {passo === 1 && (
              <>
                <Escolhas rotulo="Onde é?" opcoes={ZONA} valor={zona} muda={escolhe(setZona, false)} />
                <Escolhas rotulo="Para quando?" opcoes={QUANDO} valor={quando} muda={escolhe(setQuando, false)} />
              </>
            )}
            {passo === 2 && (
              <>
                <label className="block text-xs font-extrabold uppercase tracking-[0.14em] text-teal">
                  O teu nome
                  <input ref={campoNome} value={nome} onChange={(e) => setNome(e.target.value)} autoComplete="name" placeholder="Nome e agência" className={`${campo} h-12 normal-case tracking-normal`} />
                </label>
                <label className="block text-xs font-extrabold uppercase tracking-[0.14em] text-teal">
                  Queres dizer mais alguma coisa? (opcional)
                  <textarea value={nota} onChange={(e) => setNota(e.target.value)} rows={2} placeholder="O imóvel, a morada, a ideia" className={`${campo} py-3 normal-case tracking-normal`} />
                </label>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <p role="alert" className="mt-3 min-h-5 text-sm font-bold text-[#a3321f]">
        {erro}
      </p>
      <div className="mt-2 flex items-center gap-3">
        {passo > 0 && (
          <button type="button" onClick={() => vai(passo - 1)} className="h-14 rounded-full px-5 text-sm font-extrabold uppercase tracking-[0.02em] text-ink/70 ring-1 ring-ink/15 transition hover:bg-ink/[.06]">
            Voltar
          </button>
        )}
        {ultimo ? (
          <button type="button" onClick={envia} data-cta="pedido" className="inline-flex h-14 flex-1 items-center justify-center gap-2.5 rounded-full bg-wa px-5 text-[13px] font-extrabold uppercase tracking-[0.02em] text-[#06210f] shadow-[0_10px_40px_-10px_rgba(37,211,102,.7)] transition hover:brightness-110 sm:text-[15px]">
            <WhatsApp className="h-5 w-5" />
            Enviar no WhatsApp
          </button>
        ) : (
          <button type="button" onClick={continuar} className="h-14 flex-1 rounded-full bg-ink px-5 text-[13px] font-extrabold uppercase tracking-[0.04em] text-marfim transition hover:bg-deep sm:text-[15px]">
            Continuar
          </button>
        )}
      </div>
    </div>
  );
}

/** The ask, before the questions: the step form, then Instagram and the phone number. */
export default function Pedido() {
  return (
    <section id="contacto" aria-labelledby="t-contacto" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(216,195,160,.16),transparent)]" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <Surge>
          <h2 id="t-contacto" className={tituloH2}>
            <DuasLinhas l={["Marca a tua", "primeira filmagem."]} />
          </h2>
        </Surge>
        <Surge atraso={0.08}>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-mute sm:text-lg">Três toques e o pedido segue pelo WhatsApp. Respondemos com o plano e as condições.</p>
        </Surge>
        <Surge atraso={0.14}>
          <Formulario />
        </Surge>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-soft">
          <a href={INSTAGRAM} target="_blank" rel="noopener" className="inline-flex items-center gap-2 font-semibold hover:text-white">
            <Instagram className="h-4 w-4" />
            @keystorymedia
          </a>
          <span className="text-mute">{TELEFONE}</span>
        </div>
      </div>
    </section>
  );
}
