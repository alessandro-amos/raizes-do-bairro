// voluntarios.js - listagem, busca, remoção e exportação dos registros do localStorage
import * as T from './templates.js';
import { store } from './store.js';
import { mostrarToast, confirmar } from './ui.js';
import { desenharGrafico } from './grafico.js';

export function renderVoluntarios(app, params) {
  let filtro = params.q || '';
  const desenhar = () => {
    app.innerHTML = T.voluntarios(store.buscar(filtro), filtro);
    desenharGrafico(app.querySelector('#grafico-projetos'), store.listar()); // gráfico sempre com o total, não com o filtro
  };
  desenhar();

  // Delegação de eventos no container: sobrevive a re-renderizações
  app.addEventListener('input', (e) => {
    if (e.target.id === 'busca') {
      filtro = e.target.value;
      const tabela = app.querySelector('.tabela-wrap, .vazio');
      const novo = document.createElement('div');
      novo.innerHTML = T.voluntarios(store.buscar(filtro), filtro);
      tabela?.replaceWith(novo.querySelector('.tabela-wrap, .vazio'));
      app.querySelector('.lead').textContent = `Lista salva localmente no navegador (localStorage). ${store.buscar(filtro).length} registro(s).`;
    }
  });

  app.addEventListener('click', async (e) => {
    const remover = e.target.closest('[data-remover]');
    if (remover) {
      if (await confirmar('Remover voluntário?', 'O registro será apagado do armazenamento local.')) {
        store.remover(remover.dataset.remover); desenhar(); mostrarToast('Registro removido.');
      }
    }
    if (e.target.id === 'btn-limpar-tudo') {
      if (await confirmar('Apagar todos os cadastros?', 'Esta ação não pode ser desfeita.')) {
        store.limparTudo(); desenhar(); mostrarToast('Todos os registros foram apagados.');
      }
    }
    if (e.target.id === 'btn-exportar') {
      const blob = new Blob([JSON.stringify(store.listar(), null, 2)], { type: 'application/json' });
      const a = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: 'voluntarios.json' });
      a.click(); URL.revokeObjectURL(a.href);
      mostrarToast('Arquivo voluntarios.json gerado.');
    }
  });
}
