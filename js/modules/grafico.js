// grafico.js - adaptador da biblioteca externa Chart.js (carregada via CDN em index.html)
// Isola a dependência: o resto da aplicação só chama desenharGrafico(canvas, dados)
import { projetos } from '../data/projetos.js';

let instancia = null; // guarda o gráfico atual para destruir antes de redesenhar
let carregando = null;

// Carrega o Chart.js (71 KB) sob demanda, só quando a tela de voluntários é aberta
export function carregarChart() {
  if (window.Chart) return Promise.resolve(window.Chart);
  if (!carregando) {
    carregando = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js';
      s.async = true;
      s.onload = () => resolve(window.Chart);
      s.onerror = () => { carregando = null; reject(new Error('Chart.js indisponível')); };
      document.head.appendChild(s);
    });
  }
  return carregando;
}

export async function desenharGrafico(canvas, voluntarios) {
  if (!canvas) return null;
  try { await carregarChart(); } catch { return null; } // CDN indisponível: a tabela continua funcionando
  if (!canvas.isConnected) return null; // usuário já trocou de tela
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
