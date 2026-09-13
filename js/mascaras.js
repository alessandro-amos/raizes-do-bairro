// Máscaras de entrada e validação do formulário de cadastro.
// Mantém a validação nativa do HTML5 (required, pattern, type) e só
// formata o valor enquanto a pessoa digita, para que o pattern seja satisfeito.

(function () {
  'use strict';

  function somenteDigitos(valor, maximo) {
    return valor.replace(/\D/g, '').slice(0, maximo);
  }

  function mascaraCPF(valor) {
    var d = somenteDigitos(valor, 11);
    return d
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }

  function mascaraTelefone(valor) {
    var d = somenteDigitos(valor, 11);
    if (d.length <= 10) {
      return d
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return d
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2');
  }

  function mascaraCEP(valor) {
    var d = somenteDigitos(valor, 8);
    return d.replace(/(\d{5})(\d)/, '$1-$2');
  }

  function aplicar(id, mascara) {
    var campo = document.getElementById(id);
    if (!campo) { return; }
    campo.addEventListener('input', function () {
      campo.value = mascara(campo.value);
    });
  }

  // Validação de dígitos verificadores do CPF (além do formato).
  function cpfValido(cpf) {
    var d = somenteDigitos(cpf, 11);
    if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) { return false; }
    var soma = 0, i, resto;
    for (i = 0; i < 9; i++) { soma += parseInt(d.charAt(i), 10) * (10 - i); }
    resto = (soma * 10) % 11;
    if (resto === 10) { resto = 0; }
    if (resto !== parseInt(d.charAt(9), 10)) { return false; }
    soma = 0;
    for (i = 0; i < 10; i++) { soma += parseInt(d.charAt(i), 10) * (11 - i); }
    resto = (soma * 10) % 11;
    if (resto === 10) { resto = 0; }
    return resto === parseInt(d.charAt(10), 10);
  }

  document.addEventListener('DOMContentLoaded', function () {
    aplicar('cpf', mascaraCPF);
    aplicar('telefone', mascaraTelefone);
    aplicar('cep', mascaraCEP);

    var form = document.getElementById('form-cadastro');
    var cpf = document.getElementById('cpf');
    var status = document.getElementById('mensagem-status');

    cpf.addEventListener('input', function () {
      if (cpf.value.length === 14 && !cpfValido(cpf.value)) {
        cpf.setCustomValidity('CPF inválido: confira os dígitos.');
      } else {
        cpf.setCustomValidity('');
      }
    });

    form.addEventListener('submit', function (evento) {
      evento.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        status.textContent = 'Há campos obrigatórios ou inválidos. Corrija os itens destacados.';
        return;
      }
      status.textContent = 'Cadastro enviado! A coordenação entra em contato em até cinco dias úteis.';
      form.reset();
    });
  });
})();
