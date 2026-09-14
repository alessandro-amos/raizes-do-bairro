# Relatório de acessibilidade (WCAG 2.1 nível AA)

Projeto: Instituto Raízes do Bairro (SPA). Revisão feita em 13/09/2026 por Alessandro Amos.

## Como foi verificado

| Método | Ferramenta | Resultado |
|---|---|---|
| Auditoria automática | Lighthouse (Chrome headless), categoria Accessibility | ver `docs/lighthouse.md` |
| Contraste de cores | cálculo WCAG (luminância relativa) em todos os pares texto/fundo do design system | todos ≥ 4,5:1 (texto) e ≥ 3:1 (não texto) |
| Navegação por teclado | Tab / Shift+Tab / Enter / Esc em todas as telas | ordem lógica, foco visível, sem armadilha |
| Leitor de tela | VoiceOver (macOS) na home, projetos e cadastro | landmarks, títulos, erros e troca de rota anunciados |
| Zoom | 200 % e 400 % no Chrome | sem perda de conteúdo, sem rolagem horizontal |
| Movimento | `prefers-reduced-motion: reduce` | transições e animações desligadas |

## Critérios atendidos (seleção)

| Critério | Como foi atendido |
|---|---|
| 1.1.1 Conteúdo não textual | `alt` descritivo em todas as imagens; logo com `alt`; gráfico `<canvas role="img" aria-label>` |
| 1.3.1 Informação e relações | HTML semântico (`header/nav/main/section/article/aside/footer`), `fieldset/legend`, `label for`, `<th>` na tabela, `aria-describedby` ligando campo e mensagem de erro |
| 1.3.5 Identificar finalidade da entrada | `autocomplete="name"`, `email`, `tel` |
| 1.4.1 Uso da cor | erro = borda + fundo + ícone/texto; badges têm texto, não só cor |
| 1.4.3 Contraste mínimo | texto #1e2420/#fbfaf6 15,1:1; links 6,2:1; botão 4,9:1; badge aviso ajustado para 5,3:1 |
| 1.4.4 Redimensionar texto | tipografia e espaçamento em `rem`; layout fluido |
| 1.4.10 Reflow | grid mobile first, sem rolagem horizontal a 320 px; tabela com `overflow-x` próprio |
| 1.4.11 Contraste não textual | foco com anel escuro 3 px (≥ 3:1) e halo branco; bordas de campo 2 px |
| 1.4.12 Espaçamento de texto | `line-height 1.6`, nada com altura fixa que corte texto |
| 2.1.1 / 2.1.2 Teclado | menu, dropdown (`:focus-within`), modal `<dialog>`, botões e links operáveis; Esc fecha |
| 2.4.1 Ignorar blocos | link "Pular para o conteúdo" e landmarks |
| 2.4.2 Título da página | `document.title` atualizado a cada rota |
| 2.4.3 Ordem do foco | após trocar de rota, foco vai ao `h1` da nova view |
| 2.4.4 Finalidade do link | textos de link descritivos ("Ver projeto", "Quero ajudar neste projeto") |
| 2.4.6 Cabeçalhos e rótulos | hierarquia h1 > h2 > h3 por tela |
| 2.4.7 Foco visível | `:focus-visible` global |
| 2.5.3 Rótulo no nome | texto visível dos botões igual ao nome acessível |
| 2.5.5 Tamanho do alvo | mínimo 44 × 44 px em botões, links do menu e campos |
| 3.1.1 Idioma | `<html lang="pt-BR">` |
| 3.2.x Previsibilidade | menu igual em todas as telas; nenhuma mudança de contexto automática além do redirecionamento após salvar (anunciado) |
| 3.3.1 / 3.3.3 Erros | mensagem por campo, sugestão de formato, `aria-invalid`, resumo em `role="alert"` |
| 3.3.2 Rótulos ou instruções | `label` visível em todos os campos, `*` para obrigatórios, placeholder só como exemplo |
| 4.1.2 Nome, função, valor | `aria-expanded` no hambúrguer e no dropdown, `aria-current="page"` no menu, `aria-live` no toast e no anúncio de rota |
| 4.1.3 Mensagens de status | `#toast` e `#mensagem-status` com `role="status"`/`aria-live="polite"` |

## Ajustes feitos nesta revisão

1. Cor de aviso `#8a6d00` → `#7a5f00` (contraste 4,49:1 → 5,3:1 sobre `#fff4d6`).
2. Anel de foco amarelo (1,6:1 sobre branco) substituído por anel escuro `#1e2420` com halo branco; amarelo mantido apenas sobre fundos verdes (3,75:1).
3. Região `aria-live` que anuncia "Página carregada: …" a cada troca de rota.
4. `aria-describedby` em todos os campos apontando para a mensagem de erro; resumo de erros com `role="alert"`.
5. Suporte a `prefers-contrast: more` e `forced-colors: active`.

## Pendências conhecidas

- Testar com NVDA/JAWS no Windows (só VoiceOver foi usado).
- Legendas/transcrição não se aplicam (não há mídia com áudio).

## Modo escuro (v1.1.0)

Ativado automaticamente por `prefers-color-scheme: dark` ou manualmente pelo botão "Tema" (persistido em `localStorage`, chave `raizes.tema`).
Os tokens são redefinidos em `:root[data-tema="escuro"]`; nenhum componente precisou de CSS novo além de fundos fixos de alerta.

| Par | Cores (texto / fundo) | Contraste |
|---|---|---|
| Texto / fundo | #eef2ee / #14181a | 15,8:1 |
| Texto / card | #eef2ee / #1e2420 | 14,0:1 |
| Link / fundo | #6fc48f / #14181a | 8,5:1 |
| Título / fundo | #a8e0b8 / #14181a | 11,9:1 |
| Texto de apoio / fundo | #b9c4bc / #14181a | 9,9:1 |
| Botão principal | #ffffff / #b5562a | 4,9:1 |
| Erro / fundo | #ff8a80 / #14181a | 7,8:1 |
| Foco / fundo | #ffd166 / #14181a | 12,4:1 |
| Borda de campo / fundo (não texto) | #7a877e / #14181a | 4,8:1 |

| Botão secundário (ambos os temas) | #ffffff / #1f6f43 | 6,2:1 |

## Performance (v1.2.0, Lighthouse no build)

| Métrica | v1.1.0 | v1.2.0 |
|---|---|---|
| Peso total da home | 122 KiB | 53 KiB |
| LCP | 2,0 s | 1,4 s |
| CLS | 0,136 | 0 |
| Chart.js | carregado em todas as rotas | só em /voluntarios |

## Redesign v1.3.0

Nova paleta (papel #f6f1e8, verde #173f2c/#24603f, terracota #b5562a, mostarda #e6a92b) e fontes Bricolage Grotesque + Instrument Sans (self-hosted, `font-display: optional` para não causar layout shift).

| Par | Cores (texto / fundo) | Contraste |
|---|---|---|
| Texto / papel | #1a1f1c / #f6f1e8 | 15,3:1 |
| Texto de apoio / papel | #545c57 / #f6f1e8 | 6,1:1 |
| Link / card | #24603f / #fffdf9 | 7,3:1 |
| Eyebrow terracota / papel | #a04a1f / #f6f1e8 | 5,3:1 |
| Botão principal | #ffffff / #b5562a | 4,9:1 |
| Números mostarda / faixa verde | #e6a92b / #173f2c | 5,7:1 |
| Chamada (texto branco / terracota) | #ffffff / #b5562a | 4,9:1 |

Lighthouse do build (mobile): performance 97, acessibilidade 100, boas práticas 96, SEO 100, CLS 0.
