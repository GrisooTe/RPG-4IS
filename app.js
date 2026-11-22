'use strict';

/**
 * Biblioteca digital de Os Quatro Ís.
 * IMPORTANTE: este arquivo traz apenas textos de navegação/editoriais.
 * Este índice e seus resumos foram conferidos com o PDF oficial da edição 3.0.1.
 * O PDF em assets/ é a fonte de verdade e tem precedência sobre o site.
 */
const PDF_PATH = 'assets/Os_Quatro_Is_Livro_de_Regras_v3_0_1_Sumario_Corrigido.pdf';
const PDF_VERSION = '3.0.1';
const chapters = [
  {
    "number": "—",
    "slug": "antes-de-comecar",
    "title": "Antes de começar",
    "page": 2,
    "description": "Introdução ao manual, materiais necessários e orientação de leitura.",
    "lead": "O manual foi concebido para 3 a 6 participantes e um narrador, utilizando dados de seis faces (d6).",
    "about": "Esta entrada resume o conteúdo da página 2 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Princípio do jogo",
        "As provas avaliam os personagens; as escolhas revelam quem eles são."
      ],
      [
        "Como utilizar",
        "Capítulos iniciais tratam da criação e dos testes; os seguintes desenvolvem embates, exploração, provas e política."
      ]
    ],
    "tags": [
      "introdução",
      "narrador",
      "d6"
    ]
  },
  {
    "number": "01",
    "slug": "ascensao",
    "title": "A Ascensão e a campanha",
    "page": 3,
    "description": "A competição, suas quatro etapas e as consequências de participar.",
    "lead": "Mil estudantes são convocados; dez recebem reconhecimento e benefícios. As quatro provas são Interferência, Intuito, Instinto e Iscas.",
    "about": "Esta entrada resume o conteúdo da página 3 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "As quatro etapas",
        "Interferência: controle e sabotagem; Intuito: investigação; Instinto: ambiente hostil; Iscas: objetivos e confrontos."
      ],
      [
        "Ciclo de sessão",
        "Preparação, prova e repercussão organizam as consequências de cada episódio."
      ]
    ],
    "tags": [
      "ascensão",
      "competição",
      "Interferência",
      "Intuito",
      "Instinto",
      "Iscas"
    ]
  },
  {
    "number": "02",
    "slug": "personagens",
    "title": "Criação de personagens",
    "page": 4,
    "description": "Atributos, especializações, origens familiares e histórico acadêmico.",
    "lead": "Distribua 9 pontos entre Intelecto, Ímpeto e Influência (de 1 a 4 na criação); a origem Comum recebe 1 ponto adicional. Escolha duas especializações.",
    "about": "Esta entrada resume o conteúdo da página 4 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Atributos",
        "Intelecto (INT), Ímpeto (IMP) e Influência (INF)."
      ],
      [
        "Origens familiares",
        "Tradicional, Empresarial, Política ou Comum, cada qual com benefício e complicação."
      ],
      [
        "Histórico escolar",
        "Trajetória, condições de ensino e rolagem definem a faixa de média e a Preparação acadêmica."
      ]
    ],
    "tags": [
      "atributos",
      "origem familiar",
      "INT",
      "IMP",
      "INF",
      "trajetória",
      "preparação"
    ]
  },
  {
    "number": "02A",
    "slug": "criacao-passo-a-passo",
    "title": "Criação passo a passo",
    "page": 7,
    "description": "Nove decisões ordenadas para preencher a ficha sem perder etapas.",
    "lead": "O guia reúne identidade, origem, atributos, duas especializações, trajetória, condições de ensino, média, talento, vínculos e valores iniciais.",
    "about": "Esta entrada resume o conteúdo da página 7 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Ordem de criação",
        "Siga as nove etapas da página 7."
      ],
      [
        "Valores iniciais",
        "Vida = 6 + Ímpeto; Determinação = 2, ou 3 na trajetória Interrompida; Ferimentos Graves = 0."
      ]
    ],
    "tags": [
      "ficha",
      "criação",
      "passo a passo",
      "personagem"
    ]
  },
  {
    "number": "02B",
    "slug": "exemplo-nara",
    "title": "Personagem completo: Nara",
    "page": 8,
    "description": "Exemplo oficial de personagem de origem Comum.",
    "lead": "Nara possui INT 4, IMP 3 e INF 3; escolhe Tecnologia e Investigação, trajetória Dedicada e obtém média entre 8,0 e 8,9.",
    "about": "Esta entrada resume o conteúdo da página 8 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Atributos",
        "4 + 3 + 3 = 10 pontos por sua origem Comum."
      ],
      [
        "Resultado",
        "Dois pontos de Preparação acadêmica e 9 PV iniciais."
      ]
    ],
    "tags": [
      "Nara",
      "exemplo de criação",
      "comum"
    ]
  },
  {
    "number": "03",
    "slug": "testes",
    "title": "Testes e cooperação",
    "page": 9,
    "description": "Reserva de dados, dificuldade, teste oposto, sorte e auxílio.",
    "lead": "Role tantos d6 quanto o atributo apropriado, respeitando 1 a 7 dados. Cada 5 ou 6 representa um sucesso.",
    "about": "Esta entrada resume o conteúdo da página 9 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Dificuldades",
        "Comum: 1; Desafiadora: 2; Muito difícil: 3; Excepcional: 4 sucessos."
      ],
      [
        "Pressionar a Sorte",
        "Após falhar, pode repetir até dois dados sem sucesso e receber imediatamente 1 Tensão."
      ],
      [
        "Auxílio",
        "Até dois aliados podem conceder +1 dado cada, após testes próprios."
      ]
    ],
    "tags": [
      "d6",
      "dificuldade",
      "sucesso",
      "pressão",
      "cooperação"
    ]
  },
  {
    "number": "03A",
    "slug": "testes-especializacao",
    "title": "Testes: atributo e especialização",
    "page": 10,
    "description": "Exemplo visual de uma especialização em um teste.",
    "lead": "O atributo determina os dados; uma especialização pertinente permite repetir uma vez apenas um dado sem sucesso, mantendo o novo resultado.",
    "about": "Esta entrada resume o conteúdo da página 10 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Exemplo de Nara",
        "Ela rola INT 4 e repete um dado falho com Tecnologia para alcançar 2 sucessos."
      ],
      [
        "Regra essencial",
        "Especialização não fornece dado adicional nem sucesso automático."
      ]
    ],
    "tags": [
      "especialização",
      "Nara",
      "rolagem",
      "repetir dado"
    ]
  },
  {
    "number": "03B",
    "slug": "doze-especializacoes",
    "title": "As 12 especializações",
    "page": 11,
    "description": "Lista das especializações e exemplos de uso.",
    "lead": "Intelecto: Investigação, Lógica, Tecnologia e Estratégia. Ímpeto: Atletismo, Combate, Furtividade e Resistência. Influência: Diplomacia, Manipulação, Percepção social e Comando.",
    "about": "Esta entrada resume o conteúdo da página 11 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Atributo pertinente",
        "A escolha do atributo depende da ação concreta, não apenas do nome da especialização."
      ],
      [
        "Uma repetição",
        "Uma especialização não pode ser aplicada duas vezes ao mesmo teste."
      ]
    ],
    "tags": [
      "Investigação",
      "Lógica",
      "Tecnologia",
      "Estratégia",
      "Atletismo",
      "Combate",
      "Furtividade",
      "Resistência",
      "Diplomacia",
      "Manipulação",
      "Percepção social",
      "Comando"
    ]
  },
  {
    "number": "03C",
    "slug": "duvidas-frequentes",
    "title": "Exemplos e dúvidas frequentes",
    "page": 12,
    "description": "Situações esclarecidas para distinguir regras de teste.",
    "lead": "Os exemplos mostram como proceder sem especialização, como combinar Preparação e auxílio e quando Pressionar a Sorte.",
    "about": "Esta entrada resume o conteúdo da página 12 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Sem especialização",
        "A tentativa ainda é permitida; apenas não há repetição especial."
      ],
      [
        "Repetição",
        "Uma especialização pertinente concede uma repetição por teste, não uma por opção marcada."
      ]
    ],
    "tags": [
      "FAQ",
      "dúvidas",
      "testes",
      "especialização"
    ]
  },
  {
    "number": "04",
    "slug": "condicoes-e-evolucao",
    "title": "Condições e evolução",
    "page": 13,
    "description": "Vida, Tensão, Ferimentos Graves, Determinação, recuperação e talentos.",
    "lead": "Vida máxima = 6 + Ímpeto; Ferimentos Graves variam de 0 a 3; Tensão de 0 a 6.",
    "about": "Esta entrada resume o conteúdo da página 13 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Recuperação",
        "Descansos, tratamento médico e apoio emocional têm procedimentos específicos."
      ],
      [
        "Progressão",
        "Gaste pontos de Evolução para adquirir talentos, especializações ou elevar atributos."
      ]
    ],
    "tags": [
      "PV",
      "Vida",
      "Tensão",
      "Ferimentos Graves",
      "FG",
      "Determinação",
      "talentos"
    ]
  },
  {
    "number": "05",
    "slug": "embates",
    "title": "Embates: regras de luta",
    "page": 14,
    "description": "Turnos, ataque, defesa, zonas, manobras e dano gradual.",
    "lead": "Por rodada, cada participante dispõe de 1 movimento, 1 ação principal e 1 reação. Os ataques usam testes de Ímpeto e a defesa ativa requer reação.",
    "about": "Esta entrada resume o conteúdo da página 14 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Acerto gradual",
        "1 sucesso causa 1 PV; 2+ sucessos com margem menor que 2 causam 2 PV; margem 2+ causa 3 PV."
      ],
      [
        "Alternativas",
        "Agarrar, desarmar, derrubar e outras manobras podem substituir o dano."
      ]
    ],
    "tags": [
      "combate",
      "ataque",
      "defesa",
      "dano",
      "acerto gradual",
      "PV"
    ]
  },
  {
    "number": "05A",
    "slug": "acerto-gradual",
    "title": "Acerto Gradual: exemplo visual",
    "page": 18,
    "description": "Exemplo completo com comparação de ataque e defesa.",
    "lead": "Davi obtém 2 sucessos e a guarda 1: margem de 1, causando 2 PV. Se a guarda não reagisse, a margem seria 2 e o dano seria 3 PV.",
    "about": "Esta entrada resume o conteúdo da página 18 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Resultado",
        "O dano depende dos sucessos do ataque e da margem sobre a defesa."
      ],
      [
        "Armas",
        "Uma arma não acrescenta automaticamente PV de dano nem requer rolagem separada."
      ]
    ],
    "tags": [
      "dano",
      "exemplo visual",
      "acerto gradual",
      "Davi"
    ]
  },
  {
    "number": "06",
    "slug": "exploracao",
    "title": "Exploração: jornadas e perigos",
    "page": 19,
    "description": "Regiões, turnos, ritmos de viagem, suprimentos e riscos.",
    "lead": "Um turno de exploração representa aproximadamente uma hora; a equipe escolhe seu ritmo.",
    "about": "Esta entrada resume o conteúdo da página 19 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Ritmos",
        "Cauteloso, Normal e Acelerado, cada um com alcance e efeitos próprios."
      ],
      [
        "Recursos",
        "A equipe começa Instinto com 6 Suprimentos e consome 2 por dia."
      ]
    ],
    "tags": [
      "exploração",
      "jornada",
      "suprimentos",
      "relógio de perigo"
    ]
  },
  {
    "number": "06A",
    "slug": "exploracao-avancada",
    "title": "Exploração avançada",
    "page": 21,
    "description": "Encontros, rastreamento, perseguição e fuga, com exemplos práticos.",
    "lead": "Este módulo distingue turnos de exploração, encontros, perseguições de 1 a 5 minutos e embates.",
    "about": "Esta entrada resume o conteúdo da página 21 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Relógios",
        "Perigo Ambiental e Exposição medem coisas diferentes e não devem ser duplicados sem motivo."
      ],
      [
        "Perseguição",
        "A trilha vai de −3 (contato) a +3 (fuga), com disputa entre líderes."
      ]
    ],
    "tags": [
      "perseguição",
      "encontros",
      "rastreamento",
      "Exposição"
    ]
  },
  {
    "number": "06A·1",
    "slug": "ameacas",
    "title": "Ameaças e encontros prontos",
    "page": 28,
    "description": "Patrulha, drone, equipe rival e tabela opcional de eventos.",
    "lead": "A página apresenta uma patrulha de reconhecimento, a sentinela SR-4 e a Equipe Vesper.",
    "about": "Esta entrada resume o conteúdo da página 28 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Encontros",
        "Cada ameaça possui objetivo, abordagem e fraquezas."
      ],
      [
        "Eventos",
        "Uma tabela opcional de 1d6 permite acontecimentos imprevistos quando agregarem escolhas."
      ]
    ],
    "tags": [
      "patrulha",
      "SR-4",
      "Vesper",
      "ameaça",
      "encontros"
    ]
  },
  {
    "number": "06A·2",
    "slug": "exemplo-perseguicao",
    "title": "Exemplo completo de perseguição",
    "page": 29,
    "description": "Três rodadas de fuga na Estação.",
    "lead": "Caio, Helena e Nara se alternam na liderança e a trilha passa de 0 para +2, depois +1 e finalmente +3.",
    "about": "Esta entrada resume o conteúdo da página 29 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Desfecho",
        "A fuga termina, mas a Exposição pode permanecer e permitir rastreamento futuro."
      ],
      [
        "Integração",
        "O módulo mostra como lidar com a perseguição dentro de Interferência e Instinto."
      ]
    ],
    "tags": [
      "perseguição",
      "Caio",
      "Helena",
      "Nara",
      "fuga"
    ]
  },
  {
    "number": "07",
    "slug": "inventario",
    "title": "Inventário e equipamentos",
    "page": 30,
    "description": "Espaços de inventário, Integridade, equipamentos e reparos.",
    "lead": "A capacidade pessoal é 5 + Ímpeto Espaços de Inventário (EI). Os itens ocupam espaços conforme seu porte.",
    "about": "Esta entrada resume o conteúdo da página 30 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Integridade",
        "Itens relevantes têm 1 a 3 pontos de Integridade; zero significa que deixam de funcionar."
      ],
      [
        "Sobrecarga",
        "É possível carregar até 2 EI acima da capacidade, com penalidades."
      ]
    ],
    "tags": [
      "EI",
      "equipamento",
      "inventário",
      "reparo",
      "integridade"
    ]
  },
  {
    "number": "07A",
    "slug": "armas",
    "title": "Armas e equipamentos ofensivos",
    "page": 32,
    "description": "Alcances e possibilidades táticas de armas e equipamentos.",
    "lead": "Armas não conferem bônus automático de dano: definem alcance, propriedades e manobras possíveis.",
    "about": "Esta entrada resume o conteúdo da página 32 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Dano",
        "Aplique o Acerto Gradual do capítulo 5, sem rolagem de dano separada."
      ],
      [
        "Exemplos",
        "Bastão, lâmina curta, arma de haste, arco de treino e dispositivo de contenção."
      ]
    ],
    "tags": [
      "armas",
      "dano",
      "bastão",
      "lâmina",
      "arco",
      "contenção"
    ]
  },
  {
    "number": "08",
    "slug": "interferencia",
    "title": "Manual da Interferência",
    "page": 33,
    "description": "Operações, controle de setores, pontuação e sabotagem.",
    "lead": "Interferência é a prova de controle territorial, informação e sabotagem, estruturada em equipes, setores e seis rodadas.",
    "about": "Esta entrada resume o conteúdo da página 33 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Recursos",
        "Equipes começam com 3 OP, recuperam 2 por rodada, respeitando o máximo de 5."
      ],
      [
        "Vitória",
        "O controle dos setores e os objetivos produzem pontos de vitória."
      ]
    ],
    "tags": [
      "Interferência",
      "OP",
      "setores",
      "sabotagem"
    ]
  },
  {
    "number": "09",
    "slug": "outras-provas",
    "title": "Intuito, Instinto e Iscas",
    "page": 35,
    "description": "Estruturas jogáveis para as outras três provas.",
    "lead": "Intuito propõe investigação; Instinto usa exploração e suprimentos; Iscas combina embates com objetivos ocultos.",
    "about": "Esta entrada resume o conteúdo da página 35 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Intuito",
        "Clareza permite obter pistas ou antecipar consequências."
      ],
      [
        "Instinto",
        "Aproveita exploração em regiões e consumo de recursos."
      ],
      [
        "Iscas",
        "Inclui estratégias não letais e decisões políticas."
      ]
    ],
    "tags": [
      "Intuito",
      "Instinto",
      "Iscas",
      "provas"
    ]
  },
  {
    "number": "10",
    "slug": "politica",
    "title": "Política: o custo de vencer",
    "page": 36,
    "description": "Prestígio, Dívida, Suspeita, patrocínios e vínculos.",
    "lead": "A Ascensão influencia a posição de famílias e seus compromissos institucionais.",
    "about": "Esta entrada resume o conteúdo da página 36 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Indicadores",
        "Prestígio vai de 0 a 10, Dívida de 0 a 10 e Suspeita de 0 a 6."
      ],
      [
        "Vínculos",
        "Confiança, Rivalidade, Obrigação ou Segredo podem afetar testes uma vez por sessão."
      ]
    ],
    "tags": [
      "política",
      "Prestígio",
      "Dívida",
      "Suspeita",
      "patrocínio",
      "vínculo"
    ]
  },
  {
    "number": "11",
    "slug": "narrador",
    "title": "Orientações ao narrador",
    "page": 37,
    "description": "Preparação de cenas, consequências e antagonistas.",
    "lead": "Uma cena deve ter objetivo, oposição, informação disponível, consequência de fracasso e pelo menos duas escolhas significativas.",
    "about": "Esta entrada resume o conteúdo da página 37 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Falhas",
        "Uma falha deve fazer a história avançar."
      ],
      [
        "Eliminação",
        "A desclassificação de personagens não precisa excluir os jogadores da campanha."
      ]
    ],
    "tags": [
      "narrador",
      "cena",
      "oposição",
      "fracasso"
    ]
  },
  {
    "number": "12",
    "slug": "referencia-rapida",
    "title": "Referência rápida de mesa",
    "page": 38,
    "description": "Resumo dos procedimentos de testes, combate, exploração e política.",
    "lead": "Reúne valores e limites fundamentais para consulta durante a sessão.",
    "about": "Esta entrada resume o conteúdo da página 38 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Testes",
        "5 ou 6 no d6 vale sucesso; 1 a 7 dados por teste."
      ],
      [
        "Embates",
        "A iniciativa usa Ímpeto e o dano segue o Acerto Gradual."
      ]
    ],
    "tags": [
      "resumo",
      "referência",
      "consulta rápida"
    ]
  },
  {
    "number": "—",
    "slug": "glossario",
    "title": "Glossário de regras",
    "page": 40,
    "description": "Definições organizadas das páginas 40 a 42.",
    "lead": "Define os principais termos usados pelo sistema, como Acerto Gradual, Determinação, Ferimento Grave, OP e Tensão.",
    "about": "Esta entrada resume o conteúdo da página 40 do manual oficial. Para uma decisão de regras, consulte sempre a redação integral do PDF.",
    "points": [
      [
        "Termos",
        "As definições resumem procedimentos dos capítulos anteriores."
      ],
      [
        "Precedência",
        "Em caso de dúvida, vale o texto integral das regras."
      ]
    ],
    "tags": [
      "glossário",
      "vocabulário",
      "FG",
      "OP",
      "PV"
    ]
  }
];

let pdfReady = true;
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
  return `<div class="source-panel"><div><strong>Documento de referência · Os Quatro Ís · edição ${PDF_VERSION}</strong><small>O PDF oficial prevalece sobre notas, resumos e índices deste site.</small></div>${pdfStatusPill()}</div>`;
}
function homePage() {
  return `<section class="hero container">
    <div class="hero-copy"><span class="eyebrow">SISTEMA DE RPG · EDIÇÃO DIGITAL</span>
      <h1>O mundo não é <em>neutro.</em><br>Suas escolhas também não.</h1>
      <p class="hero-intro">Bem-vindo ao espaço digital de <strong>Os Quatro Ís</strong>. Um lugar para conhecer o projeto, navegar por seus assuntos e consultar o livro de regras — sem perder de vista a versão oficial.</p>
      <div class="button-row"><a class="btn primary" href="#regras">Explorar o livro <span class="arrow">↗</span></a><a class="btn outline" href="#sobre">Conhecer o projeto <span class="arrow">→</span></a></div>
      <div class="hero-note">MANUAL OFICIAL · EDIÇÃO 3.0.1 · 42 PÁGINAS</div>
    </div>
    <div class="hero-art" role="img" aria-label="Composição editorial com quatro letras Í sobre círculos concêntricos">
      <div class="art-head"><span>UM UNIVERSO EM CONSTRUÇÃO</span><span>001 / 004</span></div>
      <div class="art-circle"></div><div class="art-circle c2"></div><div class="art-circle c3"></div>
      <div class="art-monogram" aria-hidden="true">ÍÍÍÍ</div>
      <p class="art-title">Cada escolha<br>tem um peso.</p>
      <div class="art-foot"><span>OS QUATRO ÍS</span><span>ARQUIVO / 2026</span></div>
    </div></section>
    <section class="section-band"><div class="container"><div class="section-heading"><div><span class="eyebrow">POR ONDE COMEÇAR</span><h2>Uma biblioteca para<br>encontrar caminhos.</h2></div><p class="section-aside">O índice segue o sumário oficial da edição 3.0.1, incluindo os módulos e o glossário.</p></div>
    <div class="path-grid">
      <a class="path-card" href="#regras"><span class="num">01 / ARQUIVO</span><div><h3>Livro de regras</h3><p>Explore o índice de assuntos, pesquise termos e encontre o documento de referência.</p></div><span class="more" aria-hidden="true">↗</span></a>
      <a class="path-card" href="#regras/personagens"><span class="num">02 / PERSONAGEM</span><div><h3>Criação de personagens</h3><p>Acesse os procedimentos e exemplos oficiais de criação nas páginas 4 a 8.</p></div><span class="more" aria-hidden="true">↗</span></a>
      <a class="path-card" href="#regras/pdf"><span class="num">03 / FONTE</span><div><h3>PDF oficial</h3><p>Abra ou baixe o livro oficial de 42 páginas diretamente na biblioteca.</p></div><span class="more" aria-hidden="true">↗</span></a>
    </div></div></section>
    <section class="manifesto"><div class="container manifesto-inner"><div><span class="mini-label">NOTA EDITORIAL / 01</span><h2>O site organiza a leitura.<br>O livro define as regras.</h2></div><p>O índice e os resumos agora seguem o livro de regras 3.0.1. A íntegra do PDF é a fonte oficial: nenhuma regra foi alterada para esta edição web.</p></div></section>`;
}
function sidebar(selected) {
  return `<aside class="book-sidebar" aria-label="Índice do livro"><div class="sidebar-head"><strong>SUMÁRIO DO MANUAL</strong><span>3.0.1</span></div>
    <div class="search-wrap"><label class="sr-only" for="book-search">Pesquisar assunto</label><input class="search-input" type="search" id="book-search" placeholder="Pesquisar assunto..." autocomplete="off" aria-label="Pesquisar assunto"></div>
    <div class="search-help">Busque títulos, termos ou páginas do manual.</div>
    <nav class="chapter-menu" aria-label="Capítulos da biblioteca">${chapters.map(c=>`<a href="#regras/${c.slug}" class="${selected===c.slug?'active':''}" ${selected===c.slug?'aria-current="page"':''}><span class="chapter-no">${c.number}</span><span>${c.title} <small class="page-index">p. ${String(c.page).padStart(2,'0')}</small></span></a>`).join('')}<a href="#regras/pdf" class="${selected==='pdf'?'active':''}" ${selected==='pdf'?'aria-current="page"':''}><span class="chapter-no">↗</span><span>PDF oficial</span></a></nav>
    <p class="sidebar-foot">Sumário baseado no manual oficial 3.0.1. As entradas 06A·1 e 06A·2 distinguem anexos do módulo 06A.</p></aside>`;
}
function referenceBox() {
  const info = pdfReady ? `<a class="btn primary" href="${PDF_PATH}" target="_blank" rel="noopener">Abrir PDF <span class="arrow">↗</span></a>` : `<a class="btn outline" href="#regras/pdf">Como incluir o PDF <span class="arrow">→</span></a>`;
  return `<div class="source-box"><div><strong>Confira sempre o documento oficial.</strong><p>O texto definitivo das regras está no PDF. Este site não substitui o original.</p></div>${info}</div>`;
}
function libraryPage() {
  return `${heading('ACERVO / ÍNDICE','Livro de regras','Consulte o sumário da edição 3.0.1, pesquise assuntos ou abra qualquer capítulo diretamente na página correspondente do PDF oficial.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar('')}<div class="reader-area" id="reader-area"><div class="reader-top"><span>EDIÇÃO DIGITAL / ÍNDICE</span><span>${chapters.length} ENTRADAS</span></div>
      <div class="reader-kicker">BIBLIOTECA · VISÃO GERAL</div><h2>Encontre o que importa.</h2><p class="reader-lead">Pesquise um termo, escolha uma seção ou navegue pelo documento oficial completo.</p>
      <div class="reading-note"><strong>Sobre a fidelidade das regras</strong><p>Este índice acompanha o sumário da edição 3.0.1. Resumos são apoios editoriais; para a regra integral, abra o PDF na página indicada.</p></div>
      <div id="topic-results">${topicRows(chapters)}</div>${referenceBox()}
    </div></div>`;
}
function topicRows(arr) {
  if (!arr.length) return `<div class="empty-results">Nenhum assunto encontrado. Experimente outra palavra-chave.</div>`;
  return `<div class="topic-list">${arr.map(c=>`<a class="topic-row" href="#regras/${c.slug}"><span class="topic-index">${c.number}</span><div><h3>${e(c.title)} <small class="page-index">p. ${String(c.page).padStart(2,"0")}</small></h3><p>${e(c.description)}</p></div><span class="topic-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
}
function chapterPage(chapter) {
  let i=chapters.indexOf(chapter);
  return `${heading('ACERVO / CAPÍTULOS','Livro de regras','O sumário corresponde à edição oficial 3.0.1. Cada seção aponta para sua página no PDF.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar(chapter.slug)}<article class="reader-area" id="reader-area"><div class="reader-top"><span>SEÇÃO ${chapter.number}</span><span>PÁGINA ${String(chapter.page).padStart(2,"0")}</span></div>
      <div class="reader-kicker">${chapter.number} · CATÁLOGO TEMÁTICO</div>
      <div class="chapter-breadcrumb"><a href="#regras">Livro de regras</a> / ${chapter.title}</div><h2>${chapter.title}</h2><p class="reader-lead">${chapter.lead}</p>
      <div class="chapter-meta"><span>TIPO · ORGANIZAÇÃO DA LEITURA</span><span>FONTE · MANUAL OFICIAL 3.0.1</span></div>
      <div class="chapter-body"><p>${chapter.about}</p><h3>Nesta seção</h3>
      <div class="topic-list">${chapter.points.map((x,j)=>`<div class="topic-row"><span class="topic-index">${String(j+1).padStart(2,'0')}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div><span></span></div>`).join('')}</div>
      <div class="reading-note"><strong>Nota de edição</strong><p>Estas notas resumem o PDF. O texto completo da seção oficial prevalece em qualquer decisão de jogo.</p></div>
      <div class="topic-tags">${chapter.tags.map(t=>`<span class="topic-tag">${e(t)}</span>`).join('')}</div>
      <div class="page-actions"><a class="btn primary" href="${PDF_PATH}#page=${chapter.page}" target="_blank" rel="noopener">Ampliar página ${chapter.page} do PDF <span class="arrow">↗</span></a><a class="btn outline" href="${PDF_PATH}" download>Baixar livro completo ↓</a></div>
       <div class="reading-note"><strong>Texto original do manual · página ${chapter.page}</strong><p>O documento abaixo é o livro oficial 3.0.1, preservado integralmente. Use a barra do leitor para avançar pelas demais páginas.</p></div>
       <iframe class="pdf-frame" title="Livro oficial Os Quatro Ís — ${e(chapter.title)} — página ${chapter.page}" src="${PDF_PATH}#page=${chapter.page}&view=FitH" loading="lazy"></iframe>
      ${referenceBox()}
      <div class="next-topic"><span>${i>0?`<a href="#regras/${chapters[i-1].slug}">← ${chapters[i-1].title}</a>`:`<a href="#regras">← Índice geral</a>`}</span><span>${i<chapters.length-1?`<a href="#regras/${chapters[i+1].slug}">${chapters[i+1].title} →</a>`:`<a href="#regras/pdf">PDF oficial →</a>`}</span></div></div>
    </article></div>`;
}
function pdfPage() {
  return `${heading('ACERVO / FONTE PRIMÁRIA','PDF oficial','A edição 3.0.1 contém 42 páginas. Leia o manual integral ou acesse diretamente os capítulos pelo índice.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar('pdf')}<section class="reader-area" id="reader-area"><div class="reader-top"><span>EDIÇÃO 3.0.1</span><span>42 PÁGINAS</span></div>
    <div class="reader-kicker">FONTE DO SISTEMA</div><h2>Leia o manual completo.</h2>
    <p class="reader-lead">Este é o PDF original, sem alterações. Caso a visualização embutida não funcione no seu navegador, utilize o botão de abertura em nova aba.</p>
    <div class="page-actions"><a class="btn primary" href="${PDF_PATH}" target="_blank" rel="noopener">Abrir PDF em nova aba ↗</a><a class="btn outline" href="${PDF_PATH}" download>Baixar PDF ↓</a></div>
    <iframe class="pdf-frame" title="Livro de regras oficial — Os Quatro Ís — edição 3.0.1" src="${PDF_PATH}#page=1&view=FitH" loading="lazy"></iframe>
    ${referenceBox()}</section></div>`;
}
function aboutPage() {
  return `<section class="about-wrap container"><span class="eyebrow">O PROJETO / NOTA EDITORIAL</span><h1>Sobre<br>Os Quatro Ís.</h1>
    <p><strong>Os Quatro Ís</strong> é um sistema de RPG em desenvolvimento. Esta edição web tem uma proposta simples: tornar o material acessível, pesquisável e legível em computador e celular.</p>
    <p>A identidade visual usa composição editorial, tipografia clássica, tons de papel e espaços generosos. O resultado se aproxima de um arquivo de leitura, e não de um painel de videogame.</p>
    <div class="about-card"><span class="eyebrow">COMPROMISSO COM A FONTE</span><h3>Uma regra, uma referência.</h3><p>Os conceitos do site não são substitutos para os procedimentos publicados no livro em PDF. A edição 3.0.1 está incorporada; resumos devem continuar conferidos com ela. O site não altera o livro de regras.</p></div>
    <div class="button-row"><a class="btn primary" href="#regras">Acessar biblioteca <span class="arrow">↗</span></a></div></section>`;
}
function currentRoute() {
  return (decodeURIComponent(location.hash.replace(/^#/,'')) || 'inicio').replace(/^\/+/, '');
}
function render() {
  // Ao trocar de capítulo, mantenha a posição do leitor no viewport.
  const previousBook = document.querySelector('.book-shell');
  const previousBookTop = previousBook?.getBoundingClientRect().top ?? 0;
  const previousRoute = document.body.dataset.currentRoute || '';
  const nextRoute = currentRoute();
  const stayingInBook = previousRoute.startsWith('regras') && nextRoute.startsWith('regras') && !!previousBook;
  const oldScroll = window.scrollY;
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
  document.body.dataset.currentRoute = route;
  if (stayingInBook) {
    const currentBook = document.querySelector('.book-shell');
    if (currentBook) {
      // Compensa alterações no conteúdo acima do leitor e preserva a altura de leitura.
      const shift = currentBook.getBoundingClientRect().top - previousBookTop;
      window.scrollTo({top: Math.max(0, oldScroll + shift), behavior:'instant'});
    }
  } else {
    window.scrollTo({top:0,behavior:'instant'});
  }
}
function searchChapters(event) {
  const query=event.target.value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim();
  let results=chapters.filter(c=>[c.number,c.title,c.description,c.lead,c.about,...c.tags,...c.points.flat()].join(' ').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query));
  const reader=document.getElementById('reader-area');
  if(!reader)return;
  const resultsMarkup=`<div class="reader-top"><span>RESULTADOS DA PESQUISA</span><span>${results.length} ENCONTRADOS</span></div><div class="reader-kicker">BUSCA NO CATÁLOGO</div><h2>Pesquisar assuntos</h2><p class="reader-lead">${query?'Resultados do sumário, dos resumos e da pesquisa textual por página do PDF.':'Selecione um dos temas abaixo.'}</p>${topicRows(results)}${searchPDFPages(query)}`;
  if(query) reader.innerHTML=resultsMarkup;
  else reader.innerHTML=originalReaderMarkup;
}

function searchPDFPages(query) {
  if (!query || !Array.isArray(window.OQ_PDF_SEARCH)) return '';
  const hits = window.OQ_PDF_SEARCH.filter(entry => String(entry.text).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().includes(query)).slice(0,12);
  if (!hits.length) return '';
  return `<div class="reading-note"><strong>Também encontrado no texto do PDF</strong><p>Pesquisa nas páginas da edição 3.0.1. Selecione uma página para ler o texto original.</p></div><div class="topic-list">${hits.map(hit=>`<a class="topic-row" href="${PDF_PATH}#page=${hit.page}" target="_blank" rel="noopener"><span class="topic-index">${String(hit.page).padStart(2,'0')}</span><div><h3>Página ${hit.page}</h3><p>${e(hit.preview)}</p></div><span class="topic-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
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