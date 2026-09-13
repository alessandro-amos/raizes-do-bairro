// mascaras.js - formatação de CPF, telefone e CEP durante a digitação
export const somenteDigitos = (v) => v.replace(/\D/g, '');
export const mascaraCPF = (v) => somenteDigitos(v).slice(0, 11).replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
export const mascaraTelefone = (v) => { const d = somenteDigitos(v).slice(0, 11); return d.length > 10 ? d.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3') : d.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3').replace(/-$/, ''); };
export const mascaraCEP = (v) => somenteDigitos(v).slice(0, 8).replace(/(\d{5})(\d)/, '$1-$2');

export function aplicarMascaras(form) {
  const mapa = { cpf: mascaraCPF, telefone: mascaraTelefone, cep: mascaraCEP };
  Object.entries(mapa).forEach(([id, fn]) => {
    const el = form.querySelector('#' + id);
    el?.addEventListener('input', () => { el.value = fn(el.value); });
  });
}
