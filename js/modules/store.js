// store.js - camada de persistência em localStorage (única que conhece a chave e o JSON)
const CHAVE = 'raizes.voluntarios.v1';
const CHAVE_RASCUNHO = 'raizes.cadastro.rascunho';

function ler(chave, padrao) {
  try { return JSON.parse(localStorage.getItem(chave)) ?? padrao; }
  catch { return padrao; } // JSON corrompido ou localStorage bloqueado
}
function gravar(chave, valor) {
  try { localStorage.setItem(chave, JSON.stringify(valor)); return true; }
  catch (e) { console.error('Falha ao gravar no localStorage', e); return false; }
}

export const store = {
  listar() { return ler(CHAVE, []); },
  buscar(termo = '') {
    const t = termo.trim().toLowerCase();
    return this.listar().filter((v) => !t || v.nome.toLowerCase().includes(t) || (v.projeto || '').includes(t));
  },
  existeCpf(cpf) { return this.listar().some((v) => v.cpf === cpf); },
  adicionar(voluntario) {
    const lista = this.listar();
    const registro = { ...voluntario, id: crypto.randomUUID(), criadoEm: new Date().toISOString() };
    lista.push(registro);
    return gravar(CHAVE, lista) ? registro : null;
  },
  remover(id) { return gravar(CHAVE, this.listar().filter((v) => v.id !== id)); },
  limparTudo() { localStorage.removeItem(CHAVE); },
  salvarRascunho(dados) { gravar(CHAVE_RASCUNHO, dados); },
  lerRascunho() { return ler(CHAVE_RASCUNHO, {}); },
  apagarRascunho() { localStorage.removeItem(CHAVE_RASCUNHO); }
};
