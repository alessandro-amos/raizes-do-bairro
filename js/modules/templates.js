// templates.js - funções puras que recebem dados e devolvem HTML (template literals)
import { projetos, areasAtuacao } from '../data/projetos.js';

// Evita XSS: tudo que vem do usuário (localStorage) passa por aqui antes de ir para o DOM
export function escapar(valor) {
  return String(valor ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

export function badge(projeto) {
  if (projeto.status === 'encerrado') return '<span class="badge badge-encerrado">Encerrado</span>';
  if (projeto.vagas > 0) return `<span class="badge badge-vagas">${projeto.vagas} vagas</span>`;
  return '<span class="badge badge-ativo">Ativo</span>';
}

// Componente reutilizável: card de projeto (usado na home e na lista de projetos)
export function cardProjeto(p) {
  return `
    <article class="card" id="${p.slug}">
      <p>${badge(p)} <span class="badge">${p.categoria}</span></p>
      <h3>${p.nome}</h3>
      <p>${p.resumo}</p>
      <a class="botao botao-contorno" href="#/projetos/${p.slug}">Ver projeto</a>
    </article>`;
}

export function home({ totalVoluntarios }) {
  return `
    <section class="hero" aria-labelledby="titulo-principal">
      <h1 id="titulo-principal">Instituto Raízes do Bairro</h1>
      <p class="lead">Desde 2014 cuidamos de crianças e famílias da zona norte de Piracicaba com reforço escolar, alimentação e formação profissional.</p>
      <p class="acoes">
        <a class="botao" href="#/cadastro">Quero ser voluntário</a>
        <a class="botao botao-secundario" href="#/projetos">Conhecer os projetos</a>
      </p>
      <figure>
        <img src="../img/hero-criancas.jpg" alt="Grupo de crianças em roda de leitura no pátio do instituto" width="1200" height="600">
        <figcaption>Roda de leitura do projeto Aprender Junto.</figcaption>
      </figure>
    </section>
    <section aria-labelledby="t-numeros">
      <h2 id="t-numeros">Nossos números</h2>
      <dl class="numeros">
        <div><dt>Crianças atendidas</dt><dd>320</dd></div>
        <div><dt>Famílias</dt><dd>140</dd></div>
        <div><dt>Voluntários cadastrados</dt><dd>${totalVoluntarios}</dd></div>
        <div><dt>Refeições em 2025</dt><dd>18 mil</dd></div>
      </dl>
    </section>
    <section aria-labelledby="t-projetos">
      <h2 id="t-projetos">Projetos ativos</h2>
      <div class="cards">${projetos.filter((p) => p.status === 'ativo').map(cardProjeto).join('')}</div>
    </section>`;
}

export function listaProjetos() {
  return `
    <h1>Nossos projetos</h1>
    <p class="lead">Três frentes permanentes, todas tocadas por gente do bairro.</p>
    <div class="cards">${projetos.map(cardProjeto).join('')}</div>`;
}

export function detalheProjeto(p) {
  if (!p) return naoEncontrado();
  return `
    <p><a href="#/projetos">&larr; Todos os projetos</a></p>
    <article class="projeto">
      <p>${badge(p)} <span class="badge">${p.categoria}</span></p>
      <h1>${p.nome}</h1>
      <figure><img src="${p.imagem}" alt="${p.alt}" width="800" height="500"></figure>
      <h2>Público atendido</h2><p>${p.publico}</p>
      <h2>Resultados em 2025</h2>
      <ul>${p.resultados.map((r) => `<li>${r}</li>`).join('')}</ul>
      <h2>Como participar</h2>
      <p>Horários: ${p.horarios}.</p>
      ${p.status === 'ativo' ? `<a class="botao" href="#/cadastro?projeto=${p.slug}">Quero ajudar neste projeto</a>` : '<span class="botao" aria-disabled="true">Inscrições encerradas</span>'}
    </article>`;
}

export function cadastro({ dados = {}, projetoSugerido = '' }) {
  const v = (k) => escapar(dados[k] ?? '');
  const opcoesProjeto = projetos.filter((p) => p.status === 'ativo')
    .map((p) => `<option value="${p.slug}" ${(dados.projeto || projetoSugerido) === p.slug ? 'selected' : ''}>${p.nome}</option>`).join('');
  const areas = areasAtuacao.map((a) => `
      <div class="opcoes"><input type="checkbox" id="area-${a}" name="areas" value="${a}" ${(dados.areas || []).includes(a) ? 'checked' : ''}><label for="area-${a}">${a}</label></div>`).join('');
  return `
    <h1>Cadastro de voluntário</h1>
    <p class="lead">Preencha os dados abaixo. Os campos com * são obrigatórios. Seus dados ficam salvos neste navegador.</p>
    <form id="form-cadastro" novalidate>
      <fieldset>
        <legend>Dados pessoais</legend>
        <div class="campo campo-meio"><label for="nome">Nome completo *</label><input id="nome" aria-describedby="erro-nome" name="nome" type="text" required minlength="5" maxlength="100" autocomplete="name" value="${v('nome')}"><p class="campo-erro" id="erro-nome"></p></div>
        <div class="campo campo-meio"><label for="cpf">CPF *</label><input id="cpf" aria-describedby="erro-cpf" name="cpf" type="text" inputmode="numeric" required maxlength="14" placeholder="000.000.000-00" value="${v('cpf')}"><p class="campo-erro" id="erro-cpf"></p></div>
        <div class="campo campo-meio"><label for="email">E-mail *</label><input id="email" aria-describedby="erro-email" name="email" type="email" required autocomplete="email" value="${v('email')}"><p class="campo-erro" id="erro-email"></p></div>
        <div class="campo campo-meio"><label for="telefone">Telefone/WhatsApp *</label><input id="telefone" aria-describedby="erro-telefone" name="telefone" type="tel" inputmode="numeric" required maxlength="15" placeholder="(19) 99999-9999" autocomplete="tel" value="${v('telefone')}"><p class="campo-erro" id="erro-telefone"></p></div>
        <div class="campo campo-curto"><label for="nascimento">Data de nascimento *</label><input id="nascimento" aria-describedby="erro-nascimento" name="nascimento" type="date" required value="${v('nascimento')}"><p class="campo-erro" id="erro-nascimento"></p></div>
        <div class="campo campo-curto"><label for="cep">CEP *</label><input id="cep" aria-describedby="erro-cep" name="cep" type="text" inputmode="numeric" required maxlength="9" placeholder="13400-000" value="${v('cep')}"><p class="campo-erro" id="erro-cep"></p></div>
      </fieldset>
      <fieldset>
        <legend>Como quer ajudar</legend>
        <div class="campo campo-meio"><label for="projeto">Projeto de interesse *</label><select id="projeto" aria-describedby="erro-projeto" name="projeto" required><option value="">Selecione…</option>${opcoesProjeto}</select><p class="campo-erro" id="erro-projeto"></p></div>
        <div class="campo campo-meio"><label for="horas">Horas por semana *</label><input id="horas" aria-describedby="erro-horas" name="horas" type="number" min="1" max="20" required value="${v('horas')}"><p class="campo-erro" id="erro-horas"></p></div>
        <div class="campo"><p id="rotulo-areas"><strong>Áreas em que pode atuar (marque ao menos uma) *</strong></p><div role="group" aria-labelledby="rotulo-areas">${areas}</div><p class="campo-erro" id="erro-areas"></p></div>
        <div class="campo"><label for="mensagem">Conte um pouco sobre você</label><textarea id="mensagem" name="mensagem" rows="4" maxlength="500" aria-describedby="contador-mensagem">${v('mensagem')}</textarea><p class="contador" id="contador-mensagem">0/500</p></div>
      </fieldset>
      <div class="opcoes"><input type="checkbox" id="lgpd" name="lgpd" required aria-describedby="erro-lgpd" ${dados.lgpd ? 'checked' : ''}><label for="lgpd">Autorizo o uso dos meus dados para contato sobre o voluntariado (LGPD). *</label></div>
      <p class="campo-erro" id="erro-lgpd"></p>
      <p class="acoes">
        <button class="botao" type="submit" id="btn-enviar">Enviar cadastro</button>
        <button class="botao botao-contorno" type="button" id="btn-limpar">Limpar</button>
      </p>
      <p id="mensagem-status" class="status" role="status" aria-live="polite"></p>
    </form>`;
}

export function voluntarios(lista, filtro = '') {
  const linhas = lista.map((v) => `
      <tr>
        <td>${escapar(v.nome)}</td>
        <td>${escapar(v.email)}</td>
        <td>${escapar(v.telefone)}</td>
        <td>${escapar(projetos.find((p) => p.slug === v.projeto)?.nome || v.projeto)}</td>
        <td>${escapar((v.areas || []).join(', '))}</td>
        <td>${escapar(v.horas)}h</td>
        <td>${new Date(v.criadoEm).toLocaleDateString('pt-BR')}</td>
        <td><button class="botao botao-contorno" type="button" data-remover="${escapar(v.id)}">Remover</button></td>
      </tr>`).join('');
  return `
    <h1>Voluntários cadastrados</h1>
    <p class="lead">Lista salva localmente no navegador (localStorage). ${lista.length} registro(s).</p>
    <div class="filtros">
      <div><label for="busca">Buscar por nome ou projeto</label><input id="busca" type="search" value="${escapar(filtro)}" placeholder="Ex.: Maria, cozinha"></div>
      <button class="botao botao-contorno" type="button" id="btn-exportar">Exportar JSON</button>
      <button class="botao botao-contorno" type="button" id="btn-limpar-tudo">Apagar todos</button>
    </div>
    ${lista.length ? `<section class="grafico" aria-labelledby="t-grafico"><h2 id="t-grafico">Voluntários por projeto</h2><div class="grafico-wrap"><canvas id="grafico-projetos" role="img" aria-label="Gráfico de barras com a quantidade de voluntários por projeto"></canvas></div></section><div class="tabela-wrap"><table class="tabela"><thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th>Projeto</th><th>Áreas</th><th>Horas</th><th>Cadastro</th><th></th></tr></thead><tbody>${linhas}</tbody></table></div>`
                   : '<p class="vazio">Nenhum voluntário encontrado. <a href="#/cadastro">Faça o primeiro cadastro</a>.</p>'}`;
}

export function contato() {
  return `
    <h1>Contato</h1>
    <address>
      <p>Rua das Palmeiras, 380 - Jardim Oriente, Piracicaba/SP, CEP 13403-560</p>
      <p>Telefone/WhatsApp: <a href="tel:+551934210000">(19) 3421-0000</a></p>
      <p>E-mail: <a href="mailto:contato@raizesdobairro.org.br">contato@raizesdobairro.org.br</a></p>
    </address>`;
}

export function naoEncontrado() {
  return `<h1>Página não encontrada</h1><p>O endereço não existe. <a href="#/">Voltar ao início</a>.</p>`;
}
