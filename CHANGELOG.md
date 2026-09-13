# Changelog

Formato baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/); versionamento [SemVer](https://semver.org/lang/pt-BR/).

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
