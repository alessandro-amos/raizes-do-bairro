# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/); versionamento [SemVer](https://semver.org/lang/pt-BR/).

## [1.3.1] - 2026-09-14

### Corrigido
- Anel de foco aparecia no h1 a cada troca de rota (foco programático).
- Brilho decorativo do hero invadia a faixa de números em telas altas e no modo escuro.

## [1.3.0] - 2026-09-14

### Alterado
- Redesign completo: nova paleta (papel, verde, terracota, mostarda), fontes Bricolage Grotesque e Instrument Sans self-hosted, hero assimétrico com selo, faixa de números, depoimento, seção "Como ajudar", chamada final e rodapé em colunas.
- Fotos reais (Unsplash) em WebP responsivo substituem os placeholders; créditos em img/CREDITOS.md.
- Páginas de projeto com ficha lateral fixa; cadastro com coluna "O que acontece depois".

### Corrigido
- Submenu abria no mobile por especificidade de `.menu ul`.
- Overflow horizontal no mobile causado pelo brilho decorativo do hero.

## [1.2.0] - 2026-09-13

### Adicionado
- Imagens em WebP com `<picture>`, `srcset`/`sizes`, `loading="lazy"` e `fetchpriority="high"` no hero.
- Chart.js carregado sob demanda apenas na tela de voluntários (-71 KB na home).

### Corrigido
- Contraste de botões, badges, rodapé e toast no modo escuro (tokens de superfície).
- Nome acessível do botão de tema igual ao texto visível.
- CLS zerado com `aspect-ratio` nas imagens.

## [1.1.0] - 2026-09-13

### Adicionado
- Modo escuro automático (prefers-color-scheme) e manual (botão Tema), com todos os pares de cor acima de 4,5:1.

## [1.0.1] - 2026-09-13

### Corrigido
- Layout shift do rodapé durante a troca de rota (CLS 0,16 -> 0): `#app` reserva altura mínima.

## [1.0.0] - 2026-09-13

### Adicionado
- Páginas semânticas (início, projetos, cadastro) com formulário validado (EP1).
- Design system com tokens, grid de 12 colunas, 5 breakpoints, menu responsivo com dropdown/hambúrguer e componentes de feedback (EP2).
- SPA com router hash-based, templates dinâmicos, validação de formulário, localStorage e gráfico Chart.js (EP3).
- Conformidade WCAG 2.1 AA documentada em docs/acessibilidade.md, build com esbuild e deploy contínuo no GitHub Pages (EP4).

### Corrigido
- Router: rota coringa `*` não compila mais uma regex inválida.
- Contraste do foco e da cor de aviso.
