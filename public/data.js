/* Keystory Media: conteúdo do portefólio.
   Para acrescentar um vídeo novo, basta pôr o ID do YouTube em `yt`.
   Vídeos que o YouTube bloqueia (música) ficam no próprio site: `src` = nome do ficheiro em assets/videos.
   Um vídeo com yt: null fica escondido até ter ID. */

window.KS_DATA = {
  whatsapp: "351910491092",
  instagram: "keystorymedia",

  /* Telemóveis: pré-visualização curta e silenciosa. `yt` abre o vídeo completo, se existir. */
  phones: [
    { clip: "ph-marques-5", who: "Tomás Marques", yt: null },
    { clip: "ph-casa-nazare", who: "Aurélio Marques", yt: "IIHB1Yq5RXM" },
    { clip: "ph-marques-9", who: "Tomás Marques", yt: null },
    { clip: "ph-dreammaker", who: "Dream Maker", yt: null },
    { clip: "ph-apart-nazare-2", who: "Aurélio Marques", yt: "hwepUlPutwo" },
    { clip: "ph-marques-1", who: "Tomás Marques", yt: "ld-0iPdOWeQ" }
  ],

  /* Casos: o que fizemos. Sem números até haver dados reais. */
  cases: [
    {
      name: "Dream Maker Imobiliária",
      role: { pt: "Agência imobiliária · Caldas da Rainha", en: "Real estate agency · Caldas da Rainha" },
      media: "assets/clips/marca.webp",
      did: {
        pt: ["Vídeos de imóveis, incluindo versões em inglês para compradores estrangeiros", "Capas para a TV da montra, com os dados de cada imóvel", "Inauguração da agência e uma atividade aberta à comunidade, em vídeo e fotografia"],
        en: ["Property videos, including English versions for foreign buyers", "Shop-window TV covers with each property's details", "The agency's opening and a community event, in video and photography"]
      }
    },
    {
      name: "Tomás Marques",
      role: { pt: "Consultor imobiliário", en: "Real estate consultant" },
      media: "assets/clips/ph-marques-5.webp",
      vertical: true,
      did: {
        pt: ["Sessão de marca pessoal: 16 reels gravados e editados a partir de um plano de conteúdos", "Imóveis e terrenos com drone, com o terreno marcado na imagem", "Legendas e grafismo próprios para cada vídeo"],
        en: ["Personal brand session: 16 reels shot and edited from a content plan", "Properties and land with drone, with the plot marked on screen", "Custom captions and graphics for every video"]
      }
    },
    {
      name: "Aurélio Marques",
      role: { pt: "Consultor imobiliário · Nazaré", en: "Real estate consultant · Nazaré" },
      media: "assets/img/apartamento-nazare-2/01-t.webp",
      did: {
        pt: ["Casas e apartamentos na Nazaré com vídeo, fotografia e drone", "Um filme sobre a Costa de Prata, em português e inglês, para atrair compradores de fora", "Terrenos mostrados com o projeto acabado, gerado com AI"],
        en: ["Homes and apartments in Nazaré with video, photography and drone", "A film about the Silver Coast, in Portuguese and English, to attract buyers from abroad", "Land plots shown with the finished project, generated with AI"]
      }
    }
  ],

  imoveis: [
    { title: "Casa T3 Foz do Arelho", client: "Dream Maker", yt: "_I9q8lowKlI", ytEn: "Rahvkh2KJZQ", poster: "casa-t3-foz-do-arelho-dream-maker", ratio: "h" },
    { title: "Projeto Costa de Prata", client: "Aurélio Marques", yt: null, ytEn: null, poster: "projeto-costa-de-prata-aurelio-marques", ratio: "h" },
    { title: "Casa T3 Nadadouro", client: "Dream Maker", yt: "XQsZGMOnga0", poster: "casa-t3-nadadouro-dream-maker", ratio: "h" },
    { title: "Apartamento T3 Fonte Luminosa", client: "Dream Maker", yt: null /* apagado do YouTube a 24/11 */, poster: "apartamento-t3-fonte-luminosa-dream-maker", ratio: "h" },
    { title: "Casa Nazaré", client: "Aurélio Marques", yt: "IIHB1Yq5RXM", poster: "casa-nazare-aurelio-marques", ratio: "v" },
    { title: "Casa Nazaré II", client: "Aurélio Marques", yt: "PRjLTw-FQ7s", poster: "casa-nazare-2-aurelio-marques", ratio: "v" },
    { title: "Apartamento Nazaré", client: "Aurélio Marques", yt: "tLa8uwdR2Us", poster: "apartamento-nazare-aurelio-marques", ratio: "v" },
    { title: "Apartamento Nazaré II", client: "Aurélio Marques", yt: "hwepUlPutwo", poster: "apartamento-nazare-2-aurelio-marques", ratio: "v" },
    { title: "Casa Cidade Nova", client: "Tomás Marques", yt: null /* apagado do YouTube a 24/11 */, poster: "casa-cidade-nova-tomas-marques", ratio: "v" },
    { title: "Casa Avenal", client: "Tomás Marques", yt: null, src: "casa-avenal-tomas-marques", poster: "casa-avenal-tomas-marques", ratio: "v" },
    { title: "Casa Famalicão", client: "Tomás Marques", yt: null, poster: "casa-famalicao-tomas-marques", ratio: "v" },
    { title: "Apartamento T4 com terraço", client: "Dream Maker", yt: null, src: "apartamento-t4-com-terraco-caldas-dream-maker", poster: "apartamento-t4-com-terraco-caldas-dream-maker", ratio: "v" },
    { title: "Terreno Fanadia", client: "Tomás Marques", yt: "0vsAAai_3WM", poster: "terreno-fanadia-tomas-marques", ratio: "v" },
    { title: "Terreno I", client: "Tomás Marques", yt: "3d4_IUkSZL0", poster: "terreno-1-tomas-marques", ratio: "v" },
    { title: "Terreno II", client: "Tomás Marques", yt: "pZVV556ztTE", poster: "terreno-2-tomas-marques", ratio: "v" }
  ],

  brand: [
    {
      id: "marques",
      title: "Sessão Tomás Marques",
      blurb: { pt: "Vídeos de autoridade para um consultor que quer ser a referência da sua zona.", en: "Authority videos for a consultant who wants to own his local market." },
      videos: ["1","2","3","4","5","6","7","8","9","10","11.1","11.2","11.3","11.4","12","13"].map(n => ({
        title: "Reel " + n, yt: ({ "1": "ld-0iPdOWeQ" })[n] || null, poster: "sessao-tomas-marques-reel-" + n.replace(".", "-"), ratio: "v"
      }))
    },
    {
      id: "dreammaker",
      title: "Sessão Dream Maker",
      blurb: { pt: "A inauguração da agência e uma atividade aberta à comunidade, contadas em vídeo e fotografia.", en: "The agency's opening and a community event, told through video and photography." },
      videos: [
        { title: "Inauguração", yt: null, poster: "inauguracao-dream-maker-imobiliaria", ratio: "h" },
        { title: "Atividade no parque", yt: null, poster: "atividade-dream-maker-no-parque", ratio: "h" },
        { title: "Atividade: teaser", yt: null, poster: "atividade-dream-maker-no-parque-teaser", ratio: "v" },
        { title: "Atividade: resultados", yt: null, poster: "atividade-dream-maker-no-parque-resultados", ratio: "v" }
      ],
      photos: [
        { dir: "dreammaker-inauguracao", n: 8 },
        { dir: "dreammaker-atividade", n: 10 }
      ]
    }
  ],

  fotos: [
    { title: "Casa Nazaré", dir: "casa-nazare", n: 10 },
    { title: "Casa Nazaré II", dir: "casa-nazare-2", n: 10 },
    { title: "Apartamento Nazaré", dir: "apartamento-nazare", n: 10 },
    { title: "Apartamento Nazaré II", dir: "apartamento-nazare-2", n: 10 }
  ],

  ai: [
    { title: "Terreno Nazaré I", yt: "bBtZT_0DLBc", poster: "terreno-nazare-1-ai-aurelio-marques", ratio: "h" },
    { title: "Terreno Nazaré II", yt: "4uhzL_0Oiak", poster: "terreno-nazare-2-ai-aurelio-marques", ratio: "h" },
    { title: "Terreno Pataias", yt: null, poster: "terreno-pataias-ai-aurelio-marques", ratio: "h" }
  ]
};
