import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion, MotionConfig, MotionGlobalConfig } from "framer-motion";
import { CHAVE_CALMO, FALAR, INSTAGRAM, NAV, R, TELEFONE, WA_HREF, curva } from "./base";
import { DuasLinhas, Instagram, Logotipo, MovContexto, Surge, WhatsApp, tituloH2 } from "./ui";

/* ---------------- sky ---------------- */
function Ceu() {
  return (
    <div className="ceu" aria-hidden="true">
      <span className="ceu-luz l1" />
      <span className="ceu-luz l2" />
      <span className="ceu-luz l3" />
    </div>
  );
}

/* ---------------- header ---------------- */
function Topo() {
  const [aberto, setAberto] = useState(false);
  const botao = useRef<HTMLButtonElement>(null);
  const cabeca = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!aberto) return;
    const tecla = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setAberto(false);
      botao.current?.focus();
    };
    const sai = (e: FocusEvent) => {
      if (!cabeca.current?.contains(e.relatedTarget as Node | null)) setAberto(false);
    };
    const h = cabeca.current;
    document.addEventListener("keydown", tecla);
    h?.addEventListener("focusout", sai);
    return () => {
      document.removeEventListener("keydown", tecla);
      h?.removeEventListener("focusout", sai);
    };
  }, [aberto]);

  return (
    <header ref={cabeca} className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className={`mx-auto max-w-[1240px] rounded-2xl border border-white/10 shadow-[0_14px_40px_-16px_rgba(0,0,0,.8)] backdrop-blur-xl transition-colors ${aberto ? "bg-night/95" : "bg-night/80"}`}>
        <div className="flex h-14 items-center gap-4 pl-3 pr-2">
          <a href={R("")} aria-label="Keystory Media, início" className="flex h-11 shrink-0 items-center">
            <Logotipo topo />
          </a>
          <nav aria-label="Principal" className="hidden flex-1 items-center justify-center gap-1 lg:flex">
            {NAV.map(([t, h]) => (
              <a key={h} href={h} className="rounded-lg px-3.5 py-2 text-sm font-medium text-white/65 transition hover:text-white">
                {t}
              </a>
            ))}
          </nav>
          <a href={WA_HREF} target="_blank" rel="noopener" className="hidden h-10 shrink-0 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-ink transition hover:bg-marfim lg:inline-flex">
            <WhatsApp className="h-4 w-4" />
            {FALAR}
          </a>
          <button
            ref={botao}
            type="button"
            className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[.03] lg:hidden"
            aria-expanded={aberto}
            aria-controls={aberto ? "menu-movel" : undefined}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto(!aberto)}
          >
            <span className="relative block h-3 w-4">
              <span className={`absolute left-0 h-[1.5px] w-4 bg-white transition ${aberto ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-[1.5px] w-4 bg-white transition ${aberto ? "top-1.5 -rotate-45" : "top-[10px]"}`} />
            </span>
          </button>
        </div>
        <AnimatePresence>
          {aberto && (
            <motion.nav
              id="menu-movel"
              aria-label="Menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: curva }}
              className="overflow-hidden border-t border-white/[.06] lg:hidden"
            >
              <div className="flex flex-col px-4 pb-4 pt-1">
                {NAV.map(([t, h]) => (
                  <a key={h} href={h} onClick={() => setAberto(false)} className="border-b border-white/[.06] py-3.5 text-lg font-medium tracking-[-0.02em] text-white">
                    {t}
                  </a>
                ))}
                <a href={WA_HREF} target="_blank" rel="noopener" className="mt-4 flex h-12 items-center justify-center gap-2 rounded-xl bg-white font-semibold text-ink">
                  <WhatsApp className="h-5 w-5" />
                  {FALAR}
                </a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

/* ---------------- contact (replaces the demo form: Keystory takes contact on WhatsApp only) ---------------- */
function Contacto() {
  return (
    <section id="contacto" aria-labelledby="t-contacto" className="relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(216,195,160,.16),transparent)]" />
      </div>
      <div className="relative mx-auto max-w-3xl text-center">
        <Surge>
          <h2 id="t-contacto" className={tituloH2}>
            <DuasLinhas l={["Marca a tua", "primeira filmagem."]} />
          </h2>
        </Surge>
        <Surge atraso={0.08}>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-base leading-relaxed text-mute sm:text-lg">
            Diz-nos o imóvel ou a marca que queres mostrar. Respondemos no WhatsApp com o plano e as condições.
          </p>
        </Surge>
        <Surge atraso={0.16}>
          <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener"
              data-cta="contacto"
              className="inline-flex h-14 items-center justify-center gap-2.5 rounded-full bg-wa px-6 text-[13px] font-extrabold uppercase sm:px-8 sm:text-[15px] tracking-[0.02em] text-[#06210f] shadow-[0_10px_40px_-10px_rgba(37,211,102,.6)] transition hover:brightness-110"
            >
              <WhatsApp className="h-5 w-5" />
              Quero marcar a minha filmagem
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noopener" aria-label="Instagram @keystorymedia" className="inline-flex h-14 items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/[.03] px-6 text-base font-medium text-white backdrop-blur transition hover:border-white/30 hover:bg-white/[.07]">
              <Instagram className="h-5 w-5" />
              @keystorymedia
            </a>
          </div>
          <p className="mt-5 text-sm text-mute">{TELEFONE}</p>
        </Surge>
      </div>
    </section>
  );
}

/* ---------------- footer ---------------- */
function Rodape({ mov, setMov }: { mov: boolean; setMov: (v: boolean) => void }) {
  const link = "inline-flex min-h-11 items-center text-[13px] text-white/60 transition hover:text-white";
  return (
    <footer className="border-t border-white/[.06] bg-night/60 px-5 pb-32 pt-8 sm:px-8 lg:pb-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <a href={R("")} aria-label="Keystory Media, início" className="w-fit">
          <Logotipo />
        </a>
        <nav aria-label="Rodapé" className="flex flex-wrap items-center gap-x-5">
          <a href={WA_HREF} target="_blank" rel="noopener" className={link}>
            WhatsApp
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noopener" className={link}>
            Instagram
          </a>
          <a href={R("privacidade/")} className={link}>
            Privacidade e cookies
          </a>
          <button type="button" aria-pressed={!mov} onClick={() => setMov(!mov)} className={`${link} text-left`}>
            {mov ? "Reduzir movimento" : "Ligar movimento"}
          </button>
        </nav>
      </div>
      <p className="mx-auto mt-3 max-w-7xl text-xs leading-relaxed text-white/50">Keystory Media · vídeo, fotografia e drone para o imobiliário · Caldas da Rainha, Leiria, Nazaré e Óbidos</p>
    </footer>
  );
}

/* ---------------- fixed contact bar (every width) ---------------- */
function Fixo() {
  const [mostra, setMostra] = useState(false);
  useEffect(() => {
    const contacto = document.getElementById("contacto");
    let perto = false;
    const f = () => setMostra(window.scrollY > window.innerHeight * 0.7 && !perto);
    const io = new IntersectionObserver(
      ([e]) => {
        perto = e.isIntersecting;
        f();
      },
      { threshold: 0.15 },
    );
    if (contacto) io.observe(contacto);
    addEventListener("scroll", f, { passive: true });
    f();
    return () => {
      io.disconnect();
      removeEventListener("scroll", f);
    };
  }, []);
  return (
    <AnimatePresence>
      {mostra && (
        <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center px-3 pb-3" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
          <motion.div initial={{ y: 110 }} animate={{ y: 0 }} exit={{ y: 110 }} transition={{ duration: 0.45, ease: curva }} className="vidro pointer-events-auto flex w-full gap-2 rounded-2xl p-1.5 sm:w-auto">
            <a
              href={WA_HREF}
              target="_blank"
              rel="noopener"
              data-cta="whatsapp-fixo"
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-wa px-6 text-[15px] font-semibold text-[#06210f] transition hover:brightness-110 sm:flex-none"
            >
              <WhatsApp className="h-5 w-5" />
              {FALAR}
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/* ---------------- page ---------------- */
function guardaMov(mov: boolean) {
  document.documentElement.dataset.mov = mov ? "on" : "off";
  try {
    localStorage.setItem(CHAVE_CALMO, mov ? "0" : "1");
  } catch {
    /* no storage */
  }
}

/** The shell around the page: sky, header, page, contact, footer, fixed bar, motion switch. */
export default function Casca({ children }: { children: (mov: boolean) => ReactNode }) {
  const [mov, setMov] = useState(() => document.documentElement.dataset.mov !== "off");
  const primeira = useRef(true);
  MotionGlobalConfig.skipAnimations = !mov;

  useEffect(() => {
    if (primeira.current) {
      primeira.current = false;
      return;
    }
    guardaMov(mov);
  }, [mov]);

  // React draws after load, so the browser cannot find the anchor alone
  useEffect(() => {
    if (!location.hash) return;
    const alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (alvo) requestAnimationFrame(() => alvo.scrollIntoView({ behavior: "instant" as ScrollBehavior }));
  }, []);

  return (
    <MotionConfig reducedMotion={mov ? "never" : "always"}>
      <MovContexto.Provider value={mov}>
        <Ceu />
        <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[90] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-ink">
          Saltar para o conteúdo
        </a>
        <Topo />
        <main id="conteudo" tabIndex={-1} className="overflow-x-clip outline-none">
          {children(mov)}
          <Contacto />
        </main>
        <Rodape mov={mov} setMov={setMov} />
        <Fixo />
      </MovContexto.Provider>
    </MotionConfig>
  );
}
