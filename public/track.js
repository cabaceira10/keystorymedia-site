/* Alertas de visitas para o Telegram (anónimo: sem cookies, sem IP, sem identificação).
   Envia para /api/track:
   - "wa" quando alguém carrega num botão de WhatsApp;
   - "leave" quando a pessoa sai ou esconde o site, com o tempo que esteve a ver. */
(() => {
  if (navigator.webdriver) return; // robôs
  const start = Date.now();
  let visibleMs = 0, visibleSince = document.hidden ? 0 : start, sent = false, wa = false;

  const q = new URLSearchParams(location.search);
  const ref = (() => { try { return document.referrer ? new URL(document.referrer).hostname : ""; } catch (e) { return ""; } })();
  let src = "direto";
  if (q.get("fbclid") || /facebook|instagram/i.test(q.get("utm_source") || "")) src = "anúncio Meta";
  else if (q.get("utm_source")) src = q.get("utm_source");
  else if (/instagram/.test(ref)) src = "Instagram";
  else if (/facebook/.test(ref)) src = "Facebook";
  else if (/google/.test(ref)) src = "Google";
  else if (ref && ref !== location.hostname) src = ref;
  const device = matchMedia("(pointer: coarse)").matches ? "telemóvel" : "computador";

  const seconds = () => Math.round((visibleMs + (visibleSince ? Date.now() - visibleSince : 0)) / 1000);
  const send = type => {
    const body = JSON.stringify({ type, s: seconds(), src, device, wa });
    if (!(navigator.sendBeacon && navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }))))
      fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } }).catch(() => {});
  };

  document.addEventListener("click", e => {
    if (!e.target.closest("[data-wa]") || wa) return;
    wa = true;
    send("wa");
  });
  const leave = () => {
    if (visibleSince) { visibleMs += Date.now() - visibleSince; visibleSince = 0; }
    if (sent) return;
    sent = true;
    send("leave");
  };
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) leave();
    else if (!visibleSince) visibleSince = Date.now();
  });
  addEventListener("pagehide", leave);
})();
