// grafico.js - adaptador da biblioteca externa Chart.js (carregada via CDN em index.html)
// Isola a dependência: o resto da aplicação só chama desenharGrafico(canvas, dados)
import { projetos } from '../data/projetos.js';

let instancia = null; // guarda o gráfico atual para destruir antes de redesenhar

export function desenharGrafico(canvas, voluntarios) {
  if (!canvas || typeof window.Chart === 'undefined') return null; // CDN indisponível: a tabela continua funcionando
  const cor = (nome) => getComputedStyle(document.documentElement).getPropertyValue(nome).trim();
  const rotulos = projetos.map((p) => p.nome);
  const valores = projetos.map((p) => voluntarios.filter((v) => v.projeto === p.slug).length);
  instancia?.destroy();
  instancia = new window.Chart(canvas, {
    type: 'bar',
    data: { labels: rotulos, datasets: [{ label: 'Voluntários', data: valores, backgroundColor: [cor('--cor-primaria-700'), cor('--cor-secundaria-500'), cor('--cor-primaria-500')], borderRadius: 6 }] },
    options: {
      responsive: true, maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0, color: cor('--cor-neutra-600') }, grid: { color: cor('--cor-neutra-300') } }, x: { ticks: { color: cor('--cor-neutra-600') } } }
    }
  });
  return instancia;
}
