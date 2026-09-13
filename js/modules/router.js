// router.js - roteador hash-based (#/rota/:param?query) para a SPA
const rotas = [];
let aoNavegar = null;

let fallback = null;

export function registrar(padrao, handler) {
  if (padrao === '*') { fallback = handler; return; } // rota "não encontrada"
  // converte "/projetos/:slug" em regex com grupos nomeados
  const chaves = [];
  const regex = new RegExp('^' + padrao.replace(/:(\w+)/g, (_, k) => { chaves.push(k); return '([^/]+)'; }) + '$');
  rotas.push({ regex, chaves, handler });
}

export function navegar(caminho) {
  location.hash = '#' + caminho; // dispara hashchange
}

export function rotaAtual() {
  const bruto = location.hash.replace(/^#/, '') || '/';
  const [caminho, query = ''] = bruto.split('?');
  return { caminho, params: Object.fromEntries(new URLSearchParams(query)) };
}

function resolver() {
  const { caminho, params } = rotaAtual();
  for (const r of rotas) {
    const m = caminho.match(r.regex);
    if (m) {
      const p = {};
      r.chaves.forEach((k, i) => { p[k] = decodeURIComponent(m[i + 1]); });
      aoNavegar?.({ caminho, params: { ...params, ...p } });
      return r.handler({ ...params, ...p });
    }
  }
  aoNavegar?.({ caminho, params });
  return fallback?.(params);
}

export function iniciar(callback) {
  aoNavegar = callback;
  window.addEventListener('hashchange', resolver);
  resolver();
}
