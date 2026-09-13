// cadastro.js - controlador da tela de cadastro: eventos, validação, persistência
import * as T from './templates.js';
import { store } from './store.js';
import { aplicarMascaras } from './mascaras.js';
import { validarCadastro } from './validacao.js';
import { mostrarToast, confirmar } from './ui.js';
import { navegar } from './router.js';

function lerFormulario(form) {
  const fd = new FormData(form);
  const dados = Object.fromEntries(fd.entries());
  dados.areas = fd.getAll('areas');
  dados.lgpd = fd.has('lgpd');
  dados.nome = (dados.nome || '').trim();
  return dados;
}

function mostrarErros(form, erros) {
  form.querySelectorAll('.campo-erro').forEach((p) => { p.textContent = ''; });
  form.querySelectorAll('[aria-invalid]').forEach((el) => el.removeAttribute('aria-invalid'));
  Object.entries(erros).forEach(([campo, msg]) => {
    const p = form.querySelector('#erro-' + campo);
    if (p) p.textContent = msg;
    const el = form.querySelector('#' + campo);
    if (el) el.setAttribute('aria-invalid', 'true');
  });
  const primeiro = Object.keys(erros)[0];
  form.querySelector('#' + primeiro)?.focus();
}

export function renderCadastro(app, params) {
  app.innerHTML = T.cadastro({ dados: store.lerRascunho(), projetoSugerido: params.projeto });
  const form = app.querySelector('#form-cadastro');
  const status = form.querySelector('#mensagem-status');
  const contador = form.querySelector('#contador-mensagem');
  const mensagem = form.querySelector('#mensagem');
  aplicarMascaras(form);

  const atualizarContador = () => { contador.textContent = `${mensagem.value.length}/500`; };
  atualizarContador();
  mensagem.addEventListener('input', atualizarContador);

  // Rascunho automático: cada alteração salva no localStorage (debounce simples)
  let timer;
  form.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => store.salvarRascunho(lerFormulario(form)), 300);
  });

  // Validação por campo: ao sair dele (blur) e, se já estiver com erro, a cada tecla (input)
  const validarCampo = (el) => {
    const campo = el.name;
    if (!campo) return;
    const erros = validarCadastro(lerFormulario(form));
    const p = form.querySelector('#erro-' + campo);
    if (p) p.textContent = erros[campo] || '';
    el.toggleAttribute('aria-invalid', Boolean(erros[campo]));
  };
  form.addEventListener('focusout', (e) => validarCampo(e.target));
  form.addEventListener('input', (e) => { if (e.target.hasAttribute('aria-invalid') || form.querySelector('#erro-' + e.target.name)?.textContent) validarCampo(e.target); });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const dados = lerFormulario(form);
    const erros = validarCadastro(dados, { cpfJaExiste: store.existeCpf(dados.cpf) });
    if (Object.keys(erros).length) {
      mostrarErros(form, erros);
      status.className = 'status falha';
      status.setAttribute('role', 'alert'); // interrompe o leitor de tela: há erro
      status.textContent = `Corrija ${Object.keys(erros).length} campo(s) destacado(s).`;
      mostrarToast('Há campos com erro no formulário.', 'erro');
      return;
    }
    const btn = form.querySelector('#btn-enviar');
    btn.classList.add('carregando'); btn.disabled = true;
    setTimeout(() => { // simula latência de envio
      const salvo = store.adicionar(dados);
      btn.classList.remove('carregando'); btn.disabled = false;
      if (!salvo) { status.className = 'status falha'; status.textContent = 'Não foi possível salvar. Verifique o armazenamento do navegador.'; return; }
      store.apagarRascunho();
      status.setAttribute('role', 'status');
      status.className = 'status ok';
      status.textContent = `Cadastro de ${salvo.nome} salvo com sucesso!`;
      mostrarToast('Cadastro enviado! Obrigado por se voluntariar.');
      setTimeout(() => navegar('/voluntarios'), 1200);
    }, 600);
  });

  form.querySelector('#btn-limpar').addEventListener('click', async () => {
    if (await confirmar('Limpar formulário?', 'Os dados digitados e o rascunho salvo serão apagados.')) {
      store.apagarRascunho();
      renderCadastro(app, params);
      mostrarToast('Formulário limpo.');
    }
  });
}
