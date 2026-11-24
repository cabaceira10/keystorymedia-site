# Site Keystory Media: design

*Fechado com o Cabs a 23/11/2026. As decisões marcadas **(escolha do Claude)** podem ser corrigidas.*

## Para que serve
É a montra da Keystory Media (vídeo, foto e drone para agentes imobiliários). O visitante típico é um agente imobiliário que viu o Instagram ou recebeu um DM e quer saber quem somos.
**Objetivo único:** o agente manda mensagem no WhatsApp.

## Objetivos
- Mostrar o trabalho com aspeto premium, sobretudo no telemóvel.
- Levar ao WhatsApp em qualquer ponto do site, com a mensagem já escrita.
- Aparecer no Google em pesquisas locais (Caldas, Leiria, Nazaré, Óbidos).

## Não é objetivo
- Não mostra preços. O preço é tratado no WhatsApp.
- Não tem formulários, email de contacto nem blog.
- Não tem painel de edição. As alterações são feitas pelo Claude.

## O que faria o site falhar
- Parecer um template genérico.
- Ser lento ou ficar mal no telemóvel.
- Ter o portefólio escondido ou difícil de ver.
- Ter o WhatsApp longe do dedo.

## Restrições
- **Alojamento no Netlify** (decisão do Cabs, que já o usa), no lugar do Cloudflare Pages.
- **Custo zero até ao domínio.** O domínio keystorymedia.com (~10–12 €/ano) só se compra depois de o Cabs aprovar o site, visto no endereço grátis de teste.
- **Vídeos:** YouTube não listado, no canal Key Story Media. IDs em `videos-youtube.md`. Os vídeos bloqueados por música ficam de fora até serem resolvidos.
- **Marca:** `G:\Keystory\1-Branding`. Azul-marinho #14202F, areia #D8C3A0, marfim #F4EFE8, letras Cormorant Garamond e Montserrat, logótipo KY.
- **Voz:** marca Keystory a falar em "nós", sem rosto. O Cabs quer que o site sirva quando houver equipa.

## Forma de construir
| | Opção | Prós | Contras |
|---|---|---|---|
| ✅ | **A. Site à medida no Cloudflare Pages** (escolhida) | Grátis, design próprio, rápido, domínio liga-se sem custo | As alterações são pedidas ao Claude |
| | B. Construtor (Framer, Webflow, Wix) | O Cabs edita sozinho | Pago para usar o domínio próprio, preso a templates |
| | C. WordPress | Conhecido | Alojamento pago, lento, manutenção |

## O que o Cabs decidiu
- **WhatsApp:** 910 491 092 (pessoal). Botão fixo no canto em todas as páginas.
- **Mensagem geral:** "Olá! Vi o site da Keystory e gostei do vosso trabalho. Sou agente imobiliário e queria saber mais sobre como podem ajudar-me."
- **Variantes por secção:**
  - Imóveis: "…queria saber mais sobre vídeo e fotografia para os meus imóveis."
  - Personal Brand: "…queria saber mais sobre criar a minha marca pessoal."
- **Sem preços.** Fica o destaque "Condições de fundador: os primeiros 5 clientes de Personal Brand garantem condições especiais para sempre. Restam 5 lugares."
- **Zona de trabalho** invisível na página, mas presente nos dados para o Google.
- **Portefólio em 4 partes:** Imóveis, Personal Brand (por projeto: Sessão Marques, Sessão Dream Maker), Fotos e Vídeos AI.

## Estrutura (página única, a descer)
1. **Início:** vídeo de fundo em loop, o logótipo, a frase da marca e o botão de WhatsApp.
2. **Portefólio:** separadores Imóveis, Personal Brand, Fotos e Vídeos AI. Cada projeto abre em detalhe ao carregar e termina com "Quero isto → WhatsApp".
3. **Serviços:** Imóveis, Personal Brand (Studio e Cinematic) e Pack Completo, com o que cada um inclui (texto do PDF da oferta, sem preços) e o destaque de fundador.
4. **Como funciona:** os 3 passos do PDF (planeamento, um dia de filmagem, entrega).
5. **Rodapé:** WhatsApp e Instagram @keystorymedia.

## Escolhas do Claude (corrigíveis)
- **Frase principal:** "Cada casa tem uma história." (vem do PDF).
- **Vídeo de fundo:** um loop de 10–15 s montado com planos de drone e interiores do portefólio, comprimido e alojado no próprio site (não vem do YouTube, para arrancar logo).
- **Vídeos do portefólio:** cada um mostra uma capa leve e só carrega o player do YouTube ao carregar em play, com a opção de não sugerir vídeos de outros canais. Os verticais aparecem em formato 9:16.
- **Fotos:** escolho as 8–12 melhores de cada projeto (das 341), comprimidas para web, numa galeria que abre em ecrã inteiro.
- **Língua (decisão do Cabs):** **português e inglês**, porque vai ser útil quando for para os EUA. Botão PT/EN no topo. Português por defeito; o inglês é escolhido automaticamente quando o browser está em inglês. As mensagens de WhatsApp também têm versão inglesa. Nos vídeos com versão EN (Foz do Arelho, Costa de Prata), o site em inglês mostra essa versão.
- **Vídeos AI:** a secção só aparece quando os 3 terrenos estiverem carregados.
- **SEO:** título e descrição por secção, dados de "LocalBusiness" com a zona, imagem para partilhas e sitemap. Faz-se uma revisão com a skill seo-audit antes de comprar o domínio.
- **Ferramentas:** HTML, CSS e JS simples, sem frameworks. Design com a skill frontend-design e revisão final com web-design-guidelines.

## Revisão 2: nova direção visual (23/11, depois de ver o primeiro site)
O Cabs não gostou do primeiro resultado e indicou como referência o site da Ignite Media Studios. O que fica decidido:
- **Sem vídeo de fundo no início.** Fica uma frase grande e curta sobre azul-marinho muito escuro, com um brilho cor de areia em arco no horizonte. A fechadura sai.
- **Grelha de categorias** (Imóveis, Marca pessoal, Fotografia, Vídeos AI): cartões grandes, cada um com um clip curto em loop e em silêncio, alojado no site.
- **"Já nos viste aqui":** reels verticais dentro de molduras de telemóvel, em pré-visualizações curtas e silenciosas alojadas no site. Ao carregar, abre o vídeo completo do YouTube, se existir.
- **Casos de clientes** (Dream Maker, Tomás Marques, Aurélio Marques): o que fizemos e os entregáveis, **sem métricas por agora**, porque o Cabs ainda não tem números. Não se inventam números, e também não há barra de estatísticas até haver dados reais.
- **Secção AI** como vantagem própria: terrenos e projetos mostrados como vão ficar.
- Mantém-se a paleta Keystory (azul-marinho, areia, marfim) com fundos mais escuros. Não se copia o preto e dourado da referência.
- Mantém-se tudo o resto já decidido: WhatsApp, sem preços, fundador, PT/EN.

## Fica para o construtor
- A disposição visual exata, as animações e os detalhes de tipografia, dentro da marca.
- A ordem dos projetos no portefólio (melhores primeiro).
