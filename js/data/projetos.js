// Dados dos projetos: fonte única usada pelos templates da SPA
export const projetos = [
  {
    slug: 'aprender-junto',
    nome: 'Aprender Junto',
    categoria: 'Educação',
    status: 'ativo',
    vagas: 6,
    resumo: 'Reforço escolar e roda de leitura no contraturno para crianças do 2º ao 5º ano.',
    publico: '60 crianças de 7 a 11 anos, moradoras do Jardim Oriente e bairros vizinhos.',
    resultados: ['92% das crianças avançaram um nível de leitura em 2025', '38 famílias acompanhadas pela equipe pedagógica', '4 voluntários formados em alfabetização'],
    horarios: 'Segunda a quinta, 13h30 às 17h',
    imagem: 'img/projeto-aprender.jpg',
    alt: 'Crianças deitadas no tapete folheando um livro ilustrado'
  },
  {
    slug: 'cozinha-escola',
    nome: 'Cozinha-Escola',
    categoria: 'Renda',
    status: 'ativo',
    vagas: 4,
    resumo: 'Formação em gastronomia e empreendedorismo para mães e jovens do bairro.',
    publico: 'Mulheres e jovens de 16 a 29 anos em busca de renda.',
    resultados: ['3 turmas concluídas, 41 pessoas formadas', '12 participantes hoje vendem marmitas e doces', '1.800 refeições doadas às famílias atendidas'],
    horarios: 'Terça e quinta, 14h às 17h',
    imagem: 'img/projeto-cozinha.jpg',
    alt: 'Grupo de adultos cozinhando juntos em uma cozinha industrial, com legumes na frigideira'
  },
  {
    slug: 'horta-comunitaria',
    nome: 'Horta Comunitária',
    categoria: 'Alimentação',
    status: 'encerrado',
    vagas: 0,
    resumo: 'Produção de hortaliças que abastece a cozinha e as cestas das famílias.',
    publico: 'Famílias atendidas e voluntários de todas as idades.',
    resultados: ['1,2 tonelada de hortaliças colhidas em 2025', '140 cestas mensais complementadas com verduras', 'Turma 2025 encerrada; nova turma em março de 2027'],
    horarios: 'Sábados, 8h às 11h',
    imagem: 'img/projeto-horta.jpg',
    alt: 'Vista de cima de canteiros de madeira em uma horta comunitária, com duas pessoas cuidando das plantas'
  }
];

export const areasAtuacao = ['Educação', 'Cozinha', 'Horta', 'Comunicação', 'Administrativo', 'Transporte'];
