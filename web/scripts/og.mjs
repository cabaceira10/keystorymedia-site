// Renders the home share card to public/og.jpg, 1200x630: KY logo, the h1, the real film still.
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright-core";

const PUB = resolve("public");
const b64 = (p) => readFileSync(resolve(PUB, p)).toString("base64");
const fonte = b64("fonts/montserrat.woff2");
const ky = b64("brand/logo-sand.svg");
const foto = b64("img/drone-foz-do-arelho.webp");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face { font-family: Montserrat; src: url(data:font/woff2;base64,${fonte}) format("woff2"); font-weight: 100 900; }
* { margin: 0; box-sizing: border-box; }
body { width: 1200px; height: 630px; overflow: hidden; background: #14202f; font-family: Montserrat, sans-serif; color: #fff; position: relative; }
.grade { position: absolute; inset: 0; background-image: linear-gradient(rgba(216,195,160,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(216,195,160,.05) 1px, transparent 1px); background-size: 72px 72px; }
.luz { position: absolute; width: 900px; height: 700px; right: -260px; top: -260px; background: radial-gradient(closest-side, rgba(216,195,160,.3), transparent); }
.foto { position: absolute; right: 56px; top: 150px; width: 560px; aspect-ratio: 16/9; border-radius: 22px; overflow: hidden; border: 1px solid rgba(255,255,255,.14); box-shadow: 0 40px 120px -40px rgba(216,195,160,.6); }
.foto img { width: 100%; height: 100%; object-fit: cover; }
.c { position: absolute; inset: 0; padding: 64px 72px; display: flex; flex-direction: column; }
.logo img { height: 74px; width: auto; }
h1 { margin-top: auto; font-size: 70px; line-height: 1.04; font-weight: 650; letter-spacing: -0.04em; width: 560px; }
h1 span { display: block; }
.g { background: linear-gradient(180deg, #f4efe8 18%, #e9dbc0 58%, #d8c3a0); -webkit-background-clip: text; background-clip: text; color: transparent; padding-bottom: 6px; }
p { margin-top: 22px; font-size: 26px; color: #c3c9d0; letter-spacing: -0.01em; width: 560px; }
</style></head><body><div class="grade"></div><div class="luz"></div><div class="foto"><img src="data:image/webp;base64,${foto}" alt=""></div>
<div class="c"><div class="logo"><img src="data:image/svg+xml;base64,${ky}" alt=""></div>
<h1><span>Cada casa tem</span><span class="g">uma história.</span></h1>
<p>Vídeo, fotografia e drone para agentes imobiliários.</p></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "load" });
await page.waitForTimeout(300);
await page.screenshot({ path: resolve(PUB, "og.jpg"), type: "jpeg", quality: 88 });
await browser.close();
console.log("og.jpg written");
