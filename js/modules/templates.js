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
function foto(p, { lazy = true } = {}) {
  return `<picture>
          <source type="image/webp" srcset="${p.imagem.replace('.jpg', '-400.webp')} 400w, ${p.imagem.replace('.jpg', '-800.webp')} 800w" sizes="(min-width: 900px) 30vw, 100vw">
          <img src="${p.imagem}" alt="${p.alt}" width="800" height="500" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">
        </picture>`;
}

export function cardProjeto(p) {
  return `
    <article class="card" id="${p.slug}">
      <a href="#/projetos/${p.slug}" tabindex="-1" aria-hidden="true">${foto(p)}</a>
      <div class="card-corpo">
        <p class="etiquetas">${badge(p)} <span class="badge">${p.categoria}</span></p>
        <h3><a href="#/projetos/${p.slug}" class="link-card">${p.nome}</a></h3>
        <p>${p.resumo}</p>
        <a class="link-seta" href="#/projetos/${p.slug}">Conhecer o projeto</a>
      </div>
    </article>`;
}

export function home({ totalVoluntarios }) {
  const icones = {
    tempo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    doacao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>',
    empresa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/></svg>'
  };
  return `
    <section class="hero" aria-labelledby="titulo-principal">
      <p class="eyebrow">ONG · Jardim Oriente, Piracicaba</p>
      <h1 id="titulo-principal">Criança que lê, come bem e sonha <span class="destaque">muda o bairro</span>.</h1>
      <p class="lead">Desde 2014, moradores do Jardim Oriente mantêm reforço escolar, cozinha-escola e horta comunitária para 320 crianças e 140 famílias por ano.</p>
      <p class="acoes">
        <a class="botao" href="#/cadastro">Quero ser voluntário</a>
        <a class="botao botao-contorno sem-seta" href="#/projetos">Conhecer os projetos</a>
      </p>
      <p class="confianca"><span>Sem fins lucrativos</span><span>Prestação de contas anual</span><span>${totalVoluntarios > 0 ? `${totalVoluntarios} voluntário${totalVoluntarios === 1 ? '' : 's'} cadastrado${totalVoluntarios === 1 ? '' : 's'}` : 'Feito por moradores do bairro'}</span></p>
      <figure>
        <picture>
          <source type="image/webp" srcset="img/hero-criancas-480.webp 480w, img/hero-criancas-800.webp 800w, img/hero-criancas-1200.webp 1200w" sizes="(min-width: 900px) 50vw, 100vw">
          <img src="img/hero-criancas.jpg" alt="Crianças em volta de uma mesa folheando livros ilustrados, com um educador ao lado" width="800" height="600" fetchpriority="high" decoding="async">
        </picture>
        <figcaption>Roda de leitura do Aprender Junto</figcaption>
        <p class="selo" aria-hidden="true"><span><strong>12</strong>anos de bairro</span></p>
      </figure>
    </section>

    <section class="secao" aria-labelledby="t-numeros">
      <div class="faixa">
        <h2 id="t-numeros">O que a comunidade construiu em 2025</h2>
        <dl class="numeros">
          <div><dd>320</dd><dt>crianças atendidas</dt></div>
          <div><dd>140</dd><dt>famílias acompanhadas</dt></div>
          <div><dd>18 mil</dd><dt>refeições servidas</dt></div>
          <div><dd>1,2 t</dd><dt>de hortaliças colhidas</dt></div>
        </dl>
      </div>
    </section>

    <section class="secao" aria-labelledby="t-projetos">
      <div class="secao-cabecalho">
        <div><p class="eyebrow">Projetos</p><h2 id="t-projetos">Três frentes, todas tocadas por gente do bairro</h2></div>
        <a class="link-seta" href="#/projetos">Ver todos os projetos</a>
      </div>
      <div class="cards">${projetos.map(cardProjeto).join('')}</div>
    </section>

    <section class="secao" aria-labelledby="t-depoimento">
      <div class="depoimento">
        <picture>
          <source type="image/webp" srcset="img/depoimento-400.webp 400w, img/depoimento-640.webp 640w" sizes="(min-width: 900px) 34vw, 100vw">
          <img src="img/depoimento.jpg" alt="Dois meninos sentados na calçada lendo o mesmo livro, em frente a um muro grafitado" width="600" height="750" loading="lazy" decoding="async">
        </picture>
        <blockquote>
          <h2 id="t-depoimento" class="visualmente-oculto">Depoimento</h2>
          <p>Meu filho não gostava de escola. Hoje ele chega em casa e lê para a irmã. A gente não tinha isso, e agora tem, aqui na nossa rua.</p>
          <footer>Rosângela, mãe do Kauã, 9 anos, do Aprender Junto</footer>
        </blockquote>
      </div>
    </section>

    <section class="secao" aria-labelledby="t-ajudar">
      <div class="secao-cabecalho">
        <div><p class="eyebrow">Como ajudar</p><h2 id="t-ajudar">Tem espaço para você</h2></div>
      </div>
      <div class="ajudar">
        <article><div class="icone">${icones.tempo}</div><h3>Doe tempo</h3><p>Duas horas por semana já fazem diferença: leitura, cozinha, horta ou apoio administrativo.</p><a class="link-seta" href="#/cadastro">Cadastrar como voluntário</a></article>
        <article><div class="icone">${icones.doacao}</div><h3>Doe alimentos ou recursos</h3><p>Cada cesta mensal custa R$ 180. Doações via Pix são publicadas no relatório de transparência.</p><a class="link-seta" href="#/contato">Falar com a coordenação</a></article>
        <article><div class="icone">${icones.empresa}</div><h3>Seja empresa parceira</h3><p>Apadrinhe uma turma, ofereça vagas de estágio aos jovens da Cozinha-Escola ou patrocine a horta.</p><a class="link-seta" href="#/contato">Propor parceria</a></article>
      </div>
    </section>

    <section class="secao" aria-labelledby="t-chamada">
      <div class="chamada">
        <div>
          <h2 id="t-chamada">Duas horas por semana. Uma criança a mais lendo.</h2>
          <p>Não precisa ser professor. Precisa aparecer. A coordenação acompanha cada voluntário nas primeiras semanas.</p>
          <p class="acoes"><a class="botao botao-claro" href="#/cadastro">Quero ser voluntário</a></p>
        </div>
        <picture>
          <source type="image/webp" srcset="img/voluntario-400.webp 400w, img/voluntario-640.webp 640w" sizes="(min-width: 900px) 28vw, 100vw">
          <img src="img/voluntario.jpg" alt="Mão de um adulto apontando uma página de livro ilustrado para uma criança" width="600" height="800" loading="lazy" decoding="async">
        </picture>
      </div>
    </section>`;
}

export function listaProjetos() {
  return `
    <header class="cabecalho-pagina">
      <p class="eyebrow">Projetos</p>
      <h1>Nossos projetos</h1>
      <p class="lead">Três frentes permanentes no Jardim Oriente: educação, renda e alimentação. Todas nasceram de pedidos da própria comunidade.</p>
    </header>
    <div class="cards">${projetos.map(cardProjeto).join('')}</div>`;
}

export function detalheProjeto(p) {
  if (!p) return naoEncontrado();
  return `
    <header class="cabecalho-pagina">
      <p><a class="link-seta" href="#/projetos" style="display:inline-block;transform:scaleX(-1)"></a><a href="#/projetos">Todos os projetos</a></p>
      <p class="etiquetas">${badge(p)} <span class="badge">${p.categoria}</span></p>
      <h1>${p.nome}</h1>
      <p class="lead">${p.resumo}</p>
    </header>
    <article class="projeto-detalhe">
      <div class="conteudo">
        ${foto(p, { lazy: false })}
        <h2>Público atendido</h2><p>${p.publico}</p>
        <h2>Resultados em 2025</h2>
        <ul>${p.resultados.map((r) => `<li>${r}</li>`).join('')}</ul>
      </div>
      <aside class="ficha" aria-label="Como participar">
        <dl>
          <dt>Horários</dt><dd>${p.horarios}</dd>
          <dt>Situação</dt><dd>${p.status === 'ativo' ? `${p.vagas} vaga${p.vagas === 1 ? '' : 's'} para voluntários` : 'Turma encerrada'}</dd>
          <dt>Onde</dt><dd>Sede do instituto, Rua das Palmeiras, 380</dd>
        </dl>
        ${p.status === 'ativo' ? `<a class="botao" href="#/cadastro?projeto=${p.slug}">Quero ajudar neste projeto</a>` : '<span class="botao sem-seta" aria-disabled="true">Inscrições encerradas</span>'}
      </aside>
    </article>`;
}

export function cadastro({ dados = {}, projetoSugerido = '' }) {
  const v = (k) => escapar(dados[k] ?? '');
  const opcoesProjeto = projetos.filter((p) => p.status === 'ativo')
    .map((p) => `<option value="${p.slug}" ${(dados.projeto || projetoSugerido) === p.slug ? 'selected' : ''}>${p.nome}</option>`).join('');
  const areas = areasAtuacao.map((a) => `
      <div class="opcoes"><input type="checkbox" id="area-${a}" name="areas" value="${a}" ${(dados.areas || []).includes(a) ? 'checked' : ''}><label for="area-${a}">${a}</label></div>`).join('');
  return `
    <header class="cabecalho-pagina">
      <p class="eyebrow">Voluntariado</p>
      <h1>Cadastro de voluntário</h1>
      <p class="lead">Leva uns três minutos. Os campos com * são obrigatórios e o rascunho fica salvo neste navegador.</p>
    </header>
    <div class="pagina-form">
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
    </form>
    <aside aria-labelledby="t-proximos">
      <h2 id="t-proximos">O que acontece depois</h2>
      <ol>
        <li>A coordenação lê seu cadastro e liga em até 3 dias úteis.</li>
        <li>Você visita a sede e conhece o projeto escolhido.</li>
        <li>Nas primeiras semanas, alguém da equipe acompanha você.</li>
      </ol>
      <p><small>Dúvidas? <a href="#/contato">Fale com a gente</a>.</small></p>
    </aside>
    </div>`;
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
    <header class="cabecalho-pagina">
      <p class="eyebrow">Coordenação</p>
      <h1>Voluntários cadastrados</h1>
      <p class="lead">Lista salva localmente no navegador (localStorage). ${lista.length} registro(s).</p>
    </header>
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
    <header class="cabecalho-pagina">
      <p class="eyebrow">Contato</p>
      <h1>Fale com a gente</h1>
      <p class="lead">A sede fica aberta de segunda a sexta, das 8h às 18h. Para doações e parcerias, prefira o e-mail.</p>
    </header>
    <div class="contato">
      <div class="bloco">
        <h2>Sede</h2>
        <address>
          <span>Rua das Palmeiras, 380 - Jardim Oriente</span>
          <span>Piracicaba/SP, CEP 13403-560</span>
          <a href="tel:+551934210000">(19) 3421-0000</a>
          <a href="mailto:contato@raizesdobairro.org.br">contato@raizesdobairro.org.br</a>
        </address>
      </div>
      <div class="bloco">
        <h2>Transparência</h2>
        <p>Relatório anual de atividades e prestação de contas disponíveis para consulta na sede e por e-mail.</p>
        <p>CNPJ 00.000.000/0001-00 · Fundado em março de 2014</p>
      </div>
    </div>`;
}

export function naoEncontrado() {
  return `<header class="cabecalho-pagina"><h1>Página não encontrada</h1><p class="lead">O endereço não existe. <a href="#/">Voltar ao início</a>.</p></header>`;
}
