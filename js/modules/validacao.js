// validacao.js - regras de negócio do cadastro; devolve um mapa { campo: mensagem }
export function cpfValido(cpf) {
  const d = cpf.replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  const calc = (n) => { let s = 0; for (let i = 0; i < n; i++) s += +d[i] * (n + 1 - i); const r = (s * 10) % 11; return r === 10 ? 0 : r; };
  return calc(9) === +d[9] && calc(10) === +d[10];
}

export function idade(dataISO) {
  const n = new Date(dataISO); const h = new Date();
  let a = h.getFullYear() - n.getFullYear();
  if (h < new Date(h.getFullYear(), n.getMonth(), n.getDate())) a--;
  return a;
}

export function validarCadastro(dados, { cpfJaExiste = false } = {}) {
  const erros = {};
  if (!dados.nome || dados.nome.trim().length < 5) erros.nome = 'Informe o nome completo (mínimo 5 letras).';
  else if (!/\s/.test(dados.nome.trim())) erros.nome = 'Informe nome e sobrenome.';
  if (!dados.cpf) erros.cpf = 'CPF é obrigatório.';
  else if (!cpfValido(dados.cpf)) erros.cpf = 'CPF inválido: confira os dígitos.';
  else if (cpfJaExiste) erros.cpf = 'Este CPF já está cadastrado.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(dados.email || '')) erros.email = 'Digite um e-mail válido (ex.: nome@dominio.com).';
  if (!/^\(\d{2}\) \d{4,5}-\d{4}$/.test(dados.telefone || '')) erros.telefone = 'Telefone no formato (19) 99999-9999.';
  if (!dados.nascimento) erros.nascimento = 'Informe a data de nascimento.';
  else { const i = idade(dados.nascimento); if (i < 16) erros.nascimento = 'É preciso ter 16 anos ou mais.'; else if (i > 100) erros.nascimento = 'Data inválida.'; }
  if (!/^\d{5}-\d{3}$/.test(dados.cep || '')) erros.cep = 'CEP no formato 13400-000.';
  if (!dados.projeto) erros.projeto = 'Escolha um projeto.';
  const h = Number(dados.horas);
  if (!Number.isInteger(h) || h < 1 || h > 20) erros.horas = 'Entre 1 e 20 horas por semana.';
  if (!dados.areas || dados.areas.length === 0) erros.areas = 'Marque pelo menos uma área.';
  if (!dados.lgpd) erros.lgpd = 'É necessário autorizar o uso dos dados.';
  return erros;
}
