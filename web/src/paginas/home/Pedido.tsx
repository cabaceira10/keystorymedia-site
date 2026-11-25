import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { A, R, WA_NUMERO } from "../../base";

// The Imogrow audit form (imogrow-static/auditoria.html), copied: same card, same logo in its orbit, same three
// one-field screens, same bar, same buttons. Only the brand, the questions and the send (WhatsApp) change.
const ECRAS = [
  { titulo: "O que queres filmar", sub: "É isto que vamos orçamentar.", rotulo: "O imóvel ou a tua marca", nome: "pedido", tipo: "text", modo: "text", auto: "off", dica: "Ex.: moradia T3 na Nazaré", erro: "Diz-nos o que queres filmar: um imóvel, vários ou a tua marca pessoal." },
  { titulo: "Para onde respondemos", sub: "O orçamento chega-te por WhatsApp.", rotulo: "O teu WhatsApp", nome: "telefone", tipo: "tel", modo: "tel", auto: "tel", dica: "O teu número", erro: "Esse número não parece completo. É por lá que te mandamos o orçamento." },
  { titulo: "Com quem falamos", sub: "Para sabermos quem és.", rotulo: "O teu nome", nome: "nome", tipo: "text", modo: "text", auto: "name", dica: "Nome e agência", erro: "Diz-nos o teu nome." },
] as const;

export default function Pedido() {
  const cartao = useRef<HTMLDivElement>(null);
  const campos = useRef<(HTMLInputElement | null)[]>([]);
  const [vivo, setVivo] = useState(false);
  const [passo, setPasso] = useState(0);
  const [dir, setDir] = useState<"" | "frente" | "tras">("");
  const [valores, setValores] = useState(["", "", ""]);
  const [erro, setErro] = useState("");
  const [feito, setFeito] = useState("");
  const ultimo = passo === ECRAS.length - 1;

  useEffect(() => {
    const el = cartao.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => {
        if (!es[0].isIntersecting) return;
        setVivo(true);
        io.disconnect();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const valido = (i: number) => {
    const v = valores[i].trim();
    return i === 1 ? /^(\+|00)?\d{9,15}$/.test(v.replace(/[\s.()-]/g, "")) : v.length > 0;
  };
  const mostra = (i: number, d: "frente" | "tras") => {
    setErro("");
    setDir(d);
    setPasso(i);
  };
  const avanca = () => {
    if (!valido(passo)) {
      setErro(ECRAS[passo].erro);
      campos.current[passo]?.focus();
      return;
    }
    mostra(passo + 1, "frente");
    requestAnimationFrame(() => campos.current[passo + 1]?.focus({ preventScroll: true }));
  };
  const tecla = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== "Enter" || ultimo || (e.target as HTMLElement).tagName !== "INPUT") return;
    e.preventDefault();
    avanca();
  };
  const envia = (e: FormEvent) => {
    e.preventDefault();
    if (!valido(passo)) {
      setErro(ECRAS[passo].erro);
      campos.current[passo]?.focus();
      return;
    }
    const texto = `Olá! Sou ${valores[2].trim()} e vi o site da Keystory.\nQuero um orçamento para: ${valores[0].trim()}.\nO meu WhatsApp: ${valores[1].trim()}.`;
    const href = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(texto)}`;
    window.open(href, "_blank", "noopener");
    setFeito(href);
  };

  return (
    <section id="contacto" aria-labelledby="t-contacto" className="relative px-4 py-20 sm:px-8 sm:py-24">
      <div ref={cartao} className={`pedido mx-auto max-w-[560px] ${vivo ? "vivo" : ""}`}>
        <div className="ped-cabeca">
          <div className="ped-logo" aria-hidden="true">
            <div className="ped-logo__halo" />
            <div className="ped-logo__anel" />
            <div className="ped-logo__orbita" />
            <div className="ped-logo__base" style={{ WebkitMaskImage: `url(${A("brand/ky.svg")})`, maskImage: `url(${A("brand/ky.svg")})` }} />
          </div>
          <span className="ped-marca">Keystory</span>
          <h2 id="t-contacto">Pede o teu orçamento.</h2>
          <p>Sem reunião e sem compromisso.</p>
        </div>
        {feito ? (
          <div className="aud-feito" role="status">
            <div className="aud-selo">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div>
              <b>Está pedido.</b>
              <p>
                Abrimos o WhatsApp com o teu pedido. Se não abriu,{" "}
                <a href={feito} target="_blank" rel="noopener">
                  carrega aqui
                </a>
                .
              </p>
            </div>
          </div>
        ) : (
          <form className="aud-form" noValidate onSubmit={envia} onKeyDown={tecla}>
            <div className="ped-barra" aria-hidden="true">
              {ECRAS.map((e, i) => (
                <span key={e.nome} className={i <= passo ? "feito" : ""} />
              ))}
            </div>
            <p className="ped-conta" role="status">
              Passo {passo + 1} de {ECRAS.length}
            </p>
            {ECRAS.map((e, i) => (
              <div key={e.nome} className={`aud-campo ecra ${i === passo ? dir : ""}`} hidden={i !== passo}>
                <p className="ecra-titulo">{e.titulo}</p>
                <p className="ecra-sub">{e.sub}</p>
                <label htmlFor={`ped-${e.nome}`}>{e.rotulo}</label>
                <input
                  ref={(el) => {
                    campos.current[i] = el;
                  }}
                  id={`ped-${e.nome}`}
                  name={e.nome}
                  type={e.tipo}
                  inputMode={e.modo}
                  autoComplete={e.auto}
                  placeholder={e.dica}
                  value={valores[i]}
                  aria-invalid={erro && i === passo ? true : undefined}
                  onChange={(ev) => setValores(valores.map((v, k) => (k === i ? ev.target.value : v)))}
                  required
                />
              </div>
            ))}
            <p className="aud-erro" role="alert">
              {erro}
            </p>
            <div className="ped-nav">
              {passo > 0 && (
                <button type="button" className="ped-voltar" onClick={() => mostra(passo - 1, "tras")}>
                  Voltar
                </button>
              )}
              {ultimo ? (
                <button type="submit" className="aud-botao" data-cta="pedido">
                  Pedir orçamento
                </button>
              ) : (
                <button type="button" className="aud-botao" onClick={avanca}>
                  Continuar
                </button>
              )}
            </div>
            <p className="aud-nota">
              Só usamos os teus contactos para te responder. <a href={R("privacidade/")}>Privacidade</a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
