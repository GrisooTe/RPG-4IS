'use strict';

/**
 * Biblioteca digital de Os Quatro Ís.
 * IMPORTANTE: este arquivo traz apenas textos de navegação/editoriais.
 * As regras oficiais não foram transcritas, pois o PDF de referência não foi fornecido.
 * O PDF em assets/ é a fonte de verdade e tem precedência sobre o site.
 */
const PDF_PATH = 'assets/Os_Quatro_Is_Livro_de_Regras_v2_2.pdf';
const chapters = [
  {
    slug:'primeiros-passos', number:'01', title:'Primeiros passos',
    description:'Conheça esta edição digital, sua organização e a relação com o documento oficial.',
    tags:['introdução','site','documentação','leitura'],
    lead:'Este espaço foi criado para tornar o acesso às regras mais claro e agradável, preservando o livro original como referência definitiva.',
    about:'Esta página apresenta o funcionamento da biblioteca. Ela não altera, interpreta nem substitui qualquer regra do sistema.',
    points:[['Como ler','Percorra o índice à esquerda para localizar um assunto. Os números exibidos aqui indicam apenas a ordem de navegação do site.'],['Onde estão as regras completas','A íntegra das regras deve ser consultada no PDF oficial, acessível pela seção “PDF oficial” quando o arquivo for adicionado ao projeto.'],['Como manter a fidelidade','Antes de publicar transcrições, confronte cada seção com o PDF vigente e identifique sua versão.']],
  },
  {
    slug:'personagens', number:'02', title:'Criação de personagens',
    description:'Acompanhe os assuntos ligados a identidade, origem familiar e construção da ficha.',
    tags:['personagens','ficha','origem familiar','atributos'],
    lead:'Quem é o personagem, de onde ele vem e quais são suas possibilidades dentro do sistema?',
    about:'O livro de regras contém o procedimento oficial para criar personagens. Esta seção funciona, por enquanto, como um índice temático de consulta.',
    points:[['Identidade e origem','Procure no PDF oficial as definições de origem familiar e os demais elementos de identidade de personagem.'],['Atributos e escolhas','Confira as etapas de distribuição e os limites definidos pelo documento oficial.'],['Ficha de personagem','Os campos da ficha interativa serão implementados quando a versão vigente das regras puder ser conferida integralmente.']],
  },
  {
    slug:'especializacoes', number:'03', title:'Especializações',
    description:'Um ponto de entrada para consultar especializações e seus testes.',
    tags:['especializações','testes','habilidades'],
    lead:'As especializações ajudam a localizar o que um personagem sabe fazer e como isso entra em jogo.',
    about:'As regras para escolha, progressão e testes de especialização dependem do texto exato do PDF oficial.',
    points:[['Escolha','Verifique as opções de especialização disponíveis e seus requisitos no livro oficial.'],['Aplicação','Consulte quando uma especialização pode ser usada em um teste.'],['Progressão','Confirme se há mudanças de especialização durante a campanha e como são registradas.']],
  },
  {
    slug:'testes', number:'04', title:'Testes e acerto gradual',
    description:'Encontre a parte do sistema dedicada à resolução de ações e seus resultados.',
    tags:['testes','acerto gradual','dados','resultados'],
    lead:'As decisões dos personagens passam por procedimentos de resolução que dão consequência ao que acontece na ficção.',
    about:'As fórmulas, os dados utilizados, as dificuldades e as categorias de resultado só serão publicados aqui após conferência literal com a fonte oficial.',
    points:[['Preparação do teste','Consulte a regra que determina quando rolar dados e quais valores entram no cálculo.'],['Acerto gradual','Leia no PDF a definição e as consequências de cada grau de acerto.'],['Exemplos','A edição digital poderá incluir exemplos revisados, separados visualmente do texto normativo.']],
  },
  {
    slug:'combate', number:'05', title:'Armas, combate e dano',
    description:'Acesso rápido aos temas de confrontos, ataques, danos e equipamentos.',
    tags:['armas','combate','dano','equipamentos'],
    lead:'Equipamentos e confrontos precisam de procedimentos claros para que cada ação na mesa tenha efeitos compreensíveis.',
    about:'As tabelas de armas, valores de dano e condições de combate não foram recriadas nesta primeira versão. Devem ser extraídas do documento oficial.',
    points:[['Armas','As categorias, características e valores devem corresponder exatamente às regras vigentes.'],['Ataques e defesa','A sequência de resolução será publicada após comparação com o PDF.'],['Danos e consequências','Não serão presumidos pontos de vida, fórmulas ou penalidades sem fonte.']],
  },
  {
    slug:'instituicoes', number:'06', title:'Origens e instituições',
    description:'Navegue pelas dimensões sociais e institucionais relacionadas aos personagens.',
    tags:['origem familiar','contato institucional','sociedade','instituições'],
    lead:'As relações entre personagens e instituições integram a dimensão social de Os Quatro Ís.',
    about:'O texto definitivo deve distinguir os conceitos do sistema de acordo com a redação oficial, sem fundi-los ou criar benefícios não documentados.',
    points:[['Origem familiar','O conceito será apresentado na redação exata do livro.'],['Contato institucional','A relação desse elemento com a origem familiar será esclarecida a partir da versão oficial.'],['Consequências narrativas','Exemplos e comentários editoriais terão identificação própria, distinta das regras.']],
  },
  {
    slug:'glossario', number:'07', title:'Glossário',
    description:'Encontre os termos recorrentes do sistema em um só lugar.',
    tags:['vocabulário','termos','glossário','acerto gradual','especializações'],
    lead:'Uma boa consulta começa por palavras encontráveis e definições consistentes.',
    about:'Os termos abaixo são entradas de índice; não são definições normativas. As definições serão importadas somente após consulta ao glossário do PDF.',
    points:[['Acerto gradual','Termo a localizar na seção de resolução de testes do livro.'],['Especialização','Termo a localizar na criação de personagens e nos procedimentos de testes.'],['Origem familiar','Termo a localizar nas etapas de criação e identidade do personagem.'],['Contato institucional','Termo a localizar na parte social e institucional do sistema.']],
  }
];

let pdfReady = false;
let toastTimer;
let originalReaderMarkup = '';
const main = document.getElementById('conteudo');
const storedTheme = (() => { try { return localStorage.getItem('quatrois-theme'); } catch (_) { return null; }})();
if (storedTheme === 'dark') document.documentElement.dataset.theme='dark';

const e = (value) => String(value).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function showToast(message) {
  const node=document.getElementById('toast');
  node.textContent=message;
  node.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>node.classList.remove('visible'),3700);
}
function heading(label,title,subtitle='') {
  return `<div class="book-intro container"><span class="eyebrow">${label}</span><h1>${title}</h1><p>${subtitle}</p></div>`;
}
function pdfStatusPill() {
  return `<span class="pdf-status" data-pdf-status data-ready="${pdfReady?'yes':'no'}">${pdfReady?'PDF disponível':'PDF ainda não incluído'}</span>`;
}
function pdfSourcePanel() {
  return `<div class="source-panel"><div><strong>Documento de referência · Os Quatro Ís</strong><small>O PDF oficial prevalece sobre notas, resumos e índices deste site.</small></div>${pdfStatusPill()}</div>`;
}
function homePage() {
  return `<section class="hero container">
    <div class="hero-copy"><span class="eyebrow">SISTEMA DE RPG · EDIÇÃO DIGITAL</span>
      <h1>O mundo não é <em>neutro.</em><br>Suas escolhas também não.</h1>
      <p class="hero-intro">Bem-vindo ao espaço digital de <strong>Os Quatro Ís</strong>. Um lugar para conhecer o projeto, navegar por seus assuntos e consultar o livro de regras — sem perder de vista a versão oficial.</p>
      <div class="button-row"><a class="btn primary" href="#regras">Explorar o livro <span class="arrow">↗</span></a><a class="btn outline" href="#sobre">Conhecer o projeto <span class="arrow">→</span></a></div>
      <div class="hero-note">VERSÃO INICIAL DO SITE · CONTEÚDO EM REVISÃO</div>
    </div>
    <div class="hero-art" role="img" aria-label="Composição editorial com quatro letras Í sobre círculos concêntricos">
      <div class="art-head"><span>UM UNIVERSO EM CONSTRUÇÃO</span><span>001 / 004</span></div>
      <div class="art-circle"></div><div class="art-circle c2"></div><div class="art-circle c3"></div>
      <div class="art-monogram" aria-hidden="true">ÍÍÍÍ</div>
      <p class="art-title">Cada escolha<br>tem um peso.</p>
      <div class="art-foot"><span>OS QUATRO ÍS</span><span>ARQUIVO / 2026</span></div>
    </div></section>
    <section class="section-band"><div class="container"><div class="section-heading"><div><span class="eyebrow">POR ONDE COMEÇAR</span><h2>Uma biblioteca para<br>encontrar caminhos.</h2></div><p class="section-aside">A primeira edição organiza a leitura. Outras ferramentas serão incorporadas conforme a documentação oficial for revisada.</p></div>
    <div class="path-grid">
      <a class="path-card" href="#regras"><span class="num">01 / ARQUIVO</span><div><h3>Livro de regras</h3><p>Explore o índice de assuntos, pesquise termos e encontre o documento de referência.</p></div><span class="more" aria-hidden="true">↗</span></a>
      <a class="path-card" href="#regras/personagens"><span class="num">02 / PERSONAGEM</span><div><h3>Criação de personagens</h3><p>Encontre os temas de identidade, origem e especializações no catálogo digital.</p></div><span class="more" aria-hidden="true">↗</span></a>
      <a class="path-card" href="#regras/pdf"><span class="num">03 / FONTE</span><div><h3>PDF oficial</h3><p>O arquivo original permanece soberano. O leitor integrado estará ativo quando o PDF for incluído.</p></div><span class="more" aria-hidden="true">↗</span></a>
    </div></div></section>
    <section class="manifesto"><div class="container manifesto-inner"><div><span class="mini-label">NOTA EDITORIAL / 01</span><h2>O site organiza a leitura.<br>O livro define as regras.</h2></div><p>Esta versão apresenta um índice temático provisório. Nenhuma mecânica foi inventada ou alterada para preencher lacunas: a transcrição dependerá da conferência com o PDF oficial.</p></div></section>`;
}
function sidebar(selected) {
  return `<aside class="book-sidebar" aria-label="Índice do livro"><div class="sidebar-head"><strong>ÍNDICE DE ASSUNTOS</strong><span>07 + PDF</span></div>
    <div class="search-wrap"><label class="sr-only" for="book-search">Pesquisar assunto</label><input class="search-input" type="search" id="book-search" placeholder="Pesquisar assunto..." autocomplete="off" aria-label="Pesquisar assunto"></div>
    <div class="search-help">Digite para encontrar capítulos e palavras-chave.</div>
    <nav class="chapter-menu" aria-label="Capítulos da biblioteca">${chapters.map(c=>`<a href="#regras/${c.slug}" class="${selected===c.slug?'active':''}" ${selected===c.slug?'aria-current="page"':''}><span class="chapter-no">${c.number}</span><span>${c.title}</span></a>`).join('')}<a href="#regras/pdf" class="${selected==='pdf'?'active':''}" ${selected==='pdf'?'aria-current="page"':''}><span class="chapter-no">↗</span><span>PDF oficial</span></a></nav>
    <p class="sidebar-foot">Ordem editorial provisória: estes números não correspondem necessariamente aos capítulos e subcapítulos da versão oficial.</p></aside>`;
}
function referenceBox() {
  const info = pdfReady ? `<a class="btn primary" href="${PDF_PATH}" target="_blank" rel="noopener">Abrir PDF <span class="arrow">↗</span></a>` : `<a class="btn outline" href="#regras/pdf">Como incluir o PDF <span class="arrow">→</span></a>`;
  return `<div class="source-box"><div><strong>Confira sempre o documento oficial.</strong><p>O texto definitivo das regras está no PDF. Este site não substitui o original.</p></div>${info}</div>`;
}
function libraryPage() {
  return `${heading('ACERVO / ÍNDICE','Livro de regras','Um caminho para encontrar os assuntos do jogo. Nesta versão inicial, o índice é editorial e provisório; o texto normativo será incorporado apenas após conferência com o PDF oficial.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar('')}<div class="reader-area" id="reader-area"><div class="reader-top"><span>EDIÇÃO DIGITAL / ÍNDICE</span><span>07 TÓPICOS</span></div>
      <div class="reader-kicker">BIBLIOTECA · VISÃO GERAL</div><h2>Encontre o que importa.</h2><p class="reader-lead">Pesquise um termo, escolha um assunto no índice ou abra o PDF oficial quando o documento estiver disponível.</p>
      <div class="reading-note"><strong>Sobre a fidelidade das regras</strong><p>Os textos de navegação e resumos abaixo foram produzidos apenas para organizar a leitura. Não são regras novas. A estrutura 01–07 é independente da numeração do livro.</p></div>
      <div id="topic-results">${topicRows(chapters)}</div>${referenceBox()}
    </div></div>`;
}
function topicRows(arr) {
  if (!arr.length) return `<div class="empty-results">Nenhum assunto encontrado. Experimente outra palavra-chave.</div>`;
  return `<div class="topic-list">${arr.map(c=>`<a class="topic-row" href="#regras/${c.slug}"><span class="topic-index">${c.number}</span><div><h3>${c.title}</h3><p>${c.description}</p></div><span class="topic-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
}
function chapterPage(chapter) {
  let i=chapters.indexOf(chapter);
  return `${heading('ACERVO / ASSUNTOS','Livro de regras','Este índice ajuda a localizar e organizar o conteúdo. O PDF oficial continua sendo a referência definitiva.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar(chapter.slug)}<article class="reader-area" id="reader-area"><div class="reader-top"><span>ASSUNTO ${chapter.number} / 07</span><span>GUIA EDITORIAL</span></div>
      <div class="reader-kicker">${chapter.number} · CATÁLOGO TEMÁTICO</div>
      <div class="chapter-breadcrumb"><a href="#regras">Livro de regras</a> / ${chapter.title}</div><h2>${chapter.title}</h2><p class="reader-lead">${chapter.lead}</p>
      <div class="chapter-meta"><span>TIPO · ORGANIZAÇÃO DA LEITURA</span><span>STATUS · AGUARDA CONFERÊNCIA COM O PDF</span></div>
      <div class="chapter-body"><p>${chapter.about}</p><h3>O que procurar no livro</h3>
      <div class="topic-list">${chapter.points.map((x,j)=>`<div class="topic-row"><span class="topic-index">${String(j+1).padStart(2,'0')}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div><span></span></div>`).join('')}</div>
      <div class="reading-note"><strong>Nota de edição</strong><p>Este capítulo é um roteiro de consulta, não uma transcrição das regras. Não utilize estas anotações para arbitrar mecânicas durante a partida.</p></div>
      <div class="topic-tags">${chapter.tags.map(t=>`<span class="topic-tag">${e(t)}</span>`).join('')}</div>
      ${referenceBox()}
      <div class="next-topic"><span>${i>0?`<a href="#regras/${chapters[i-1].slug}">← ${chapters[i-1].title}</a>`:`<a href="#regras">← Índice geral</a>`}</span><span>${i<chapters.length-1?`<a href="#regras/${chapters[i+1].slug}">${chapters[i+1].title} →</a>`:`<a href="#regras/pdf">PDF oficial →</a>`}</span></div></div>
    </article></div>`;
}
function pdfPage() {
  return `${heading('ACERVO / FONTE PRIMÁRIA','PDF oficial','O documento original é a autoridade sobre regras, testes, especializações, danos e demais procedimentos do sistema.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar('pdf')}<section class="reader-area" id="reader-area"><div class="reader-top"><span>DOCUMENTO ORIGINAL</span><span>${pdfReady?'DISPONÍVEL':'PENDENTE'}</span></div>
    <div class="reader-kicker">FONTE DO SISTEMA</div><h2>${pdfReady?'Leitor do documento':'Adicione o livro oficial.'}</h2>
    ${pdfReady ? `<p class="reader-lead">Visualize o livro aqui ou abra-o em uma nova guia para leitura ampliada.</p><div class="page-actions"><a class="btn primary" href="${PDF_PATH}" target="_blank" rel="noopener">Abrir em nova guia <span class="arrow">↗</span></a><a class="btn outline" href="${PDF_PATH}" download>Baixar PDF <span class="arrow">↓</span></a></div><iframe class="pdf-frame" title="Livro de regras oficial — Os Quatro Ís" src="${PDF_PATH}#view=FitH" loading="lazy"></iframe>`:
    `<p class="reader-lead">O PDF de referência não estava disponível durante a criação do site. Nenhuma versão provisória foi inventada para ocupar o seu lugar.</p><div class="reading-note"><strong>Como ativar o leitor</strong><p>Envie o PDF oficial para a pasta <strong>assets</strong> do repositório usando exatamente o nome abaixo. Ao publicar novamente, o leitor passará a exibir o arquivo.</p><div class="file-path">${PDF_PATH}</div><div><button type="button" class="small-btn" data-copy="${PDF_PATH}">Copiar caminho do arquivo</button></div></div><p>Se o PDF oficial mudar de versão ou nome, atualize o arquivo e a constante <code>PDF_PATH</code> no início de <code>app.js</code>.</p>`}
    ${referenceBox()}</section></div>`;
}
function aboutPage() {
  return `<section class="about-wrap container"><span class="eyebrow">O PROJETO / NOTA EDITORIAL</span><h1>Sobre<br>Os Quatro Ís.</h1>
    <p><strong>Os Quatro Ís</strong> é um sistema de RPG em desenvolvimento. Esta edição web tem uma proposta simples: tornar o material acessível, pesquisável e legível em computador e celular.</p>
    <p>A identidade visual usa composição editorial, tipografia clássica, tons de papel e espaços generosos. O resultado se aproxima de um arquivo de leitura, e não de um painel de videogame.</p>
    <div class="about-card"><span class="eyebrow">COMPROMISSO COM A FONTE</span><h3>Uma regra, uma referência.</h3><p>Os conceitos do site não são substitutos para os procedimentos publicados no livro em PDF. Quando a versão oficial estiver incorporada, as futuras transcrições deverão ser revisadas contra ela. O site não altera o livro de regras.</p></div>
    <div class="button-row"><a class="btn primary" href="#regras">Acessar biblioteca <span class="arrow">↗</span></a></div></section>`;
}
function currentRoute() {
  return (decodeURIComponent(location.hash.replace(/^#/,'')) || 'inicio').replace(/^\/+/, '');
}
function render() {
  const route=currentRoute();
  const root=route.split('/')[0];
  for(const link of document.querySelectorAll('[data-nav]')) {
    const active=link.dataset.nav===(root==='regras'?'regras':root==='sobre'?'sobre':'inicio');
    link.classList.toggle('active',active);
    if(active)link.setAttribute('aria-current','page'); else link.removeAttribute('aria-current');
  }
  if(root==='regras') {
    const slug=route.split('/')[1];
    main.innerHTML=!slug?libraryPage():slug==='pdf'?pdfPage():(chapters.find(c=>c.slug===slug) ? chapterPage(chapters.find(c=>c.slug===slug)) : libraryPage());
  } else if(root==='sobre') {
    main.innerHTML=aboutPage();
  } else main.innerHTML=homePage();
  document.title = root==='regras' ? `Livro de regras | Os Quatro Ís` : root==='sobre' ? 'Sobre | Os Quatro Ís' : 'Os Quatro Ís — RPG';
  originalReaderMarkup=document.getElementById('reader-area')?.innerHTML || '';
  const search=document.getElementById('book-search');
  if(search) search.addEventListener('input', searchChapters);
  document.querySelectorAll('[data-copy]').forEach(btn=>btn.addEventListener('click',()=>{
    if(navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(btn.dataset.copy).then(()=>showToast('Caminho copiado.')).catch(()=>showToast('Selecione o caminho acima para copiá-lo.'));
    else showToast('Selecione o caminho acima para copiá-lo.');
  }));
  document.getElementById('mobile-menu').hidden=true;
  document.getElementById('mobile-menu-toggle').setAttribute('aria-expanded','false');
  window.scrollTo({top:0,behavior:'auto'});
}
function searchChapters(event) {
  const query=event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  let results=chapters.filter(c=>[c.title,c.description,c.lead,c.about,...c.tags,...c.points.flat()].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query));
  const reader=document.getElementById('reader-area');
  if(!reader)return;
  const resultsMarkup=`<div class="reader-top"><span>RESULTADOS DA PESQUISA</span><span>${results.length} ENCONTRADOS</span></div><div class="reader-kicker">BUSCA NO CATÁLOGO</div><h2>Pesquisar assuntos</h2><p class="reader-lead">${query?'Resultados do índice editorial; ainda não representam busca no texto integral do PDF.':'Selecione um dos temas abaixo.'}</p>${topicRows(results)}`;
  if(query) reader.innerHTML=resultsMarkup;
  else reader.innerHTML=originalReaderMarkup;
}
async function checkPdf() {
  try { const r=await fetch(PDF_PATH,{method:'HEAD',cache:'no-store'}); pdfReady=r.ok && (r.headers.get('content-type')||'').toLowerCase().includes('pdf'); }
  catch(_) { pdfReady=false; }
  document.querySelectorAll('[data-pdf-status]').forEach(node=>{node.textContent=pdfReady?'PDF disponível':'PDF ainda não incluído';node.dataset.ready=pdfReady?'yes':'no';});
  if(currentRoute()==='regras/pdf')render();
}
window.addEventListener('hashchange',render);
document.getElementById('theme-toggle').addEventListener('click',()=>{
  const dark=document.documentElement.dataset.theme!=='dark';
  if(dark)document.documentElement.dataset.theme='dark';else delete document.documentElement.dataset.theme;
  try {localStorage.setItem('quatrois-theme',dark?'dark':'light');}catch(_){/* armazenamento opcional */}
});
document.getElementById('mobile-menu-toggle').addEventListener('click',()=>{
  const menu=document.getElementById('mobile-menu');
  const opening=menu.hidden; menu.hidden=!opening;
  document.getElementById('mobile-menu-toggle').setAttribute('aria-expanded',String(opening));
});
document.addEventListener('keydown',(event)=>{
  if((event.key==='/' && !['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) && currentRoute().startsWith('regras')) {
    event.preventDefault(); document.getElementById('book-search')?.focus();
  }
  if(event.key==='Escape')document.getElementById('book-search')?.blur();
});
render();
checkPdf();