# Instituto Raízes do Bairro

[![Deploy](https://github.com/alessandro-amos/raizes-do-bairro/actions/workflows/deploy.yml/badge.svg)](https://github.com/alessandro-amos/raizes-do-bairro/actions/workflows/deploy.yml)
[![CI](https://github.com/alessandro-amos/raizes-do-bairro/actions/workflows/ci.yml/badge.svg)](https://github.com/alessandro-amos/raizes-do-bairro/actions/workflows/ci.yml)
![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-green)

Site institucional (SPA) de uma ONG fictícia de Piracicaba/SP que atende crianças e famílias do Jardim Oriente
com reforço escolar, cozinha-escola e horta comunitária. Desenvolvido como projeto das Experiências Práticas 1 a 4
da disciplina **Desenvolvimento Front-end para Web** (Ciência da Computação, Cruzeiro do Sul Virtual).

**Produção:** https://alessandro-amos.github.io/raizes-do-bairro/

## Funcionalidades

- Páginas: início, projetos (lista e detalhe), cadastro de voluntário, lista de voluntários e contato.
- SPA com roteamento por hash (`#/projetos/:slug`), templates em JavaScript e troca de conteúdo sem recarregar.
- Formulário com máscaras (CPF, telefone, CEP), validação por campo e no envio, rascunho automático e mensagens acessíveis.
- Persistência em `localStorage` (voluntários e rascunho), busca, remoção com confirmação e exportação em JSON.
- Gráfico "voluntários por projeto" com Chart.js.
- Design system próprio (tokens de cor, tipografia e espaçamento), grid de 12 colunas, menu responsivo com dropdown e hambúrguer.
- Conformidade WCAG 2.1 AA: ver [docs/acessibilidade.md](docs/acessibilidade.md).

## Tecnologias

HTML5 semântico, CSS3 (custom properties, Grid, Flexbox, media queries), JavaScript ES2020 (ES Modules, sem framework),
fontes [Bricolage Grotesque](https://fonts.google.com/specimen/Bricolage+Grotesque) e [Instrument Sans](https://fonts.google.com/specimen/Instrument+Sans) (OFL, self-hosted), fotos do [Unsplash](https://unsplash.com/license),
[Chart.js](https://www.chartjs.org/) 4 via CDN, [esbuild](https://esbuild.github.io/) para o build, GitHub Actions e GitHub Pages para CI/CD.

## Estrutura de pastas

```
raizes-do-bairro/
├── html/index.html        # shell da SPA (header, #app, footer, modal, toast)
├── css/                   # reset.css e style.css (design system + componentes)
├── img/                   # fotos em WebP responsivo + JPEG fallback (créditos em CREDITOS.md)
├── fonts/                 # woff2 self-hosted (subset latin)
├── js/
│   ├── main.js            # ponto de entrada: registra rotas e renderiza
│   ├── data/projetos.js   # dados dos projetos
│   └── modules/           # router, templates, store, validacao, mascaras, ui, grafico, cadastro, voluntarios
├── scripts/build.mjs      # build de produção (gera dist/)
├── docs/                  # relatórios (acessibilidade, lighthouse)
└── .github/workflows/     # ci.yml (PRs) e deploy.yml (Pages)
```

## Como rodar

Pré-requisitos: Node.js 22+ e npm.

```bash
git clone https://github.com/alessandro-amos/raizes-do-bairro.git
cd raizes-do-bairro
npm install          # instala o esbuild
npm run dev          # servidor local em http://localhost:5173 (abra /html/)
```

Qualquer servidor estático funciona (`python3 -m http.server`, Live Server do VS Code). A aplicação usa ES Modules,
por isso não abre direto pelo `file://`.

## Build e deploy

```bash
npm run build        # gera dist/ (JS empacotado e minificado, CSS minificado, imagens, index.html com hash)
npm run preview      # serve dist/ em http://localhost:4173
```

O deploy é automático: todo push na branch `main` executa `.github/workflows/deploy.yml`, que roda o build e publica
`dist/` no GitHub Pages. Pull requests para `develop` e `main` passam pelo `ci.yml` (build + validação W3C do HTML gerado).

## Fluxo de trabalho (GitFlow)

| Branch | Uso |
|---|---|
| `main` | código em produção; só recebe merges de `release/*` e `hotfix/*`, sempre com tag `vX.Y.Z` |
| `develop` | integração contínua das funcionalidades |
| `feature/<nome>` | cada funcionalidade; nasce de `develop` e volta por merge `--no-ff` |
| `release/<versão>` | preparação de versão (CHANGELOG, versão no package.json) |
| `hotfix/<versão>` | correção urgente a partir de `main`, mesclada em `main` e `develop` |

Commits seguem [Conventional Commits](https://www.conventionalcommits.org/pt-br/): `feat`, `fix`, `docs`, `refactor`,
`build`, `ci`, `chore`, `a11y`, com escopo opcional (`feat(cadastro): …`).

## Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | servidor de desenvolvimento |
| `npm run build` | build de produção em `dist/` |
| `npm run preview` | serve o build |
| `npm run audit:a11y` | Lighthouse (acessibilidade, performance, boas práticas, SEO) contra o preview |

## Autor

**Alessandro Rocha Amos** - desenvolvedor full stack e mobile, líder técnico na Altec Sistemas.
[GitHub](https://github.com/alessandro-amos) · [LinkedIn](https://br.linkedin.com/in/alessandro-amos-725b302aa)

## Licença

[MIT](LICENSE)
