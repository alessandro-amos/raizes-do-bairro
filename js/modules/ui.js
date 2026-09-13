// ui.js - componentes de feedback (toast, modal) e menu; não conhece regras de negócio
const toast = document.getElementById('toast');
const modal = document.getElementById('modal');
let timerToast;

export function mostrarToast(mensagem, tipo = 'sucesso') {
  toast.textContent = mensagem;
  toast.classList.toggle('toast-erro', tipo === 'erro');
  toast.classList.add('visivel');
  clearTimeout(timerToast);
  timerToast = setTimeout(() => toast.classList.remove('visivel'), 4000);
}

// Devolve uma Promise<boolean>: true se o usuário confirmar
export function confirmar(titulo, texto) {
  modal.querySelector('#modal-titulo').textContent = titulo;
  modal.querySelector('#modal-texto').textContent = texto;
  modal.showModal();
  return new Promise((resolve) => {
    const fim = (ok) => { modal.close(); modal.removeEventListener('click', aoClicar); resolve(ok); };
    const aoClicar = (e) => { const b = e.target.closest('[data-modal]'); if (b) fim(b.dataset.modal === 'ok'); };
    modal.addEventListener('click', aoClicar);
    modal.addEventListener('cancel', () => fim(false), { once: true });
  });
}

export function iniciarMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('menu');
  toggle.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    toggle.setAttribute('aria-expanded', String(aberto));
  });
  // Delegação: um listener para todos os botões de submenu
  menu.addEventListener('click', (e) => {
    const btn = e.target.closest('.tem-submenu > button');
    if (btn) btn.setAttribute('aria-expanded', String(btn.getAttribute('aria-expanded') !== 'true'));
    if (e.target.closest('a')) { menu.classList.remove('aberto'); toggle.setAttribute('aria-expanded', 'false'); }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { document.querySelectorAll('[aria-expanded="true"]').forEach((b) => b.setAttribute('aria-expanded', 'false')); menu.classList.remove('aberto'); }
  });
}

export function marcarRotaAtiva(caminho) {
  document.querySelectorAll('#menu a[data-rota]').forEach((a) => {
    const ativa = a.dataset.rota === '/' ? caminho === '/' : caminho.startsWith(a.dataset.rota);
    if (ativa) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
}

// Modo escuro manual: sobrepõe a preferência do sistema e persiste no localStorage
export function iniciarTema() {
  const btn = document.getElementById('tema-toggle');
  if (!btn) return;
  const raiz = document.documentElement;
  const sistemaEscuro = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
  const atual = () => raiz.dataset.tema || (sistemaEscuro() ? 'escuro' : 'claro');
  const aplicar = (tema) => {
    raiz.dataset.tema = tema;
    btn.setAttribute('aria-pressed', String(tema === 'escuro'));
    try { localStorage.setItem('raizes.tema', tema); } catch { /* storage indisponível: só não persiste */ }
  };
  btn.setAttribute('aria-pressed', String(atual() === 'escuro'));
  btn.addEventListener('click', () => aplicar(atual() === 'escuro' ? 'claro' : 'escuro'));
}
