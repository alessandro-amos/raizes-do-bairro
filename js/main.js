// main.js - ponto de entrada: registra rotas e liga os módulos
import { registrar, iniciar } from './modules/router.js';
import * as T from './modules/templates.js';
import { projetos } from './data/projetos.js';
import { store } from './modules/store.js';
import { iniciarMenu, marcarRotaAtiva, iniciarTema } from './modules/ui.js';
import { renderCadastro } from './modules/cadastro.js';
import { renderVoluntarios } from './modules/voluntarios.js';

const app = document.getElementById('app');

// Troca a view com uma pequena animação e devolve o foco ao topo do conteúdo
function render(html) {
  app.classList.remove('view'); void app.offsetWidth; app.classList.add('view');
  app.innerHTML = html;
  window.scrollTo({ top: 0 });
  const h1 = document.querySelector('h1');
  h1?.setAttribute('tabindex', '-1');
  h1?.focus({ preventScroll: true });
  // leitores de tela anunciam a troca de view (telas interativas injetam o h1 logo depois, por isso o setTimeout)
  setTimeout(() => {
    const titulo = document.querySelector('h1')?.textContent;
    const anuncio = document.getElementById('anuncio-rota');
    if (anuncio && titulo) anuncio.textContent = `Página carregada: ${titulo}`;
  }, 0);
}

registrar('/', () => { document.title = 'Instituto Raízes do Bairro'; render(T.home({ totalVoluntarios: store.listar().length })); });
registrar('/projetos', () => { document.title = 'Projetos | Raízes do Bairro'; render(T.listaProjetos()); });
registrar('/projetos/:slug', ({ slug }) => { const p = projetos.find((x) => x.slug === slug); document.title = (p?.nome || 'Projeto') + ' | Raízes do Bairro'; render(T.detalheProjeto(p)); });
registrar('/cadastro', (params) => { document.title = 'Seja voluntário | Raízes do Bairro'; render(''); renderCadastro(app, params); });
registrar('/voluntarios', (params) => { document.title = 'Voluntários | Raízes do Bairro'; render(''); renderVoluntarios(app, params); });
registrar('/contato', () => { document.title = 'Contato | Raízes do Bairro'; render(T.contato()); });
registrar('*', () => { document.title = 'Página não encontrada'; render(T.naoEncontrado()); });

iniciarMenu();
iniciarTema();
iniciar(({ caminho }) => marcarRotaAtiva(caminho));
