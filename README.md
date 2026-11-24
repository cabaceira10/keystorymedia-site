# Keystory Media · site

Site da Keystory Media (https://keystorymedia.com), alojado no Cloudflare Pages.

## Estrutura
- `public/`: o site em si (HTML, CSS e JS sem build, mais os assets). Os textos e projetos estão em `public/data.js`.
- `functions/`: Pages Functions (por exemplo `/api/track`).
- `wrangler.toml`: configuração do projeto `keystory` no Cloudflare Pages.
- `DESIGN.md`: decisões de design e objetivos do site. Lê isto antes de mudares coisas grandes.

## Ver em local

```
npx wrangler pages dev public
```

## Publicar
Só quem tem acesso à conta Cloudflare:

```
npx wrangler pages deploy --project-name keystory --branch main
```
