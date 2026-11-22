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
if (storedTheme !== 'light') document.documentElement.dataset.theme='dark'; else document.documentElement.dataset.theme='light';

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
  return `<section class="registry-home container" aria-labelledby="registry-title">
    <div class="registry-toolbar"><span>ARQUIVO DA ASCENSÃO / ÍNDICE DE CONSULTA</span><span>REGISTRO 00 · MANUAL 3.0.1</span></div>
    <div class="registry-heading"><div><span class="registry-kicker">Os Quatro Ís · Sistema de RPG</span>
      <h1 id="registry-title">Arquivo da Ascensão</h1>
      <p>Documentos de regras e registros de personagens para uso durante a campanha. Esta edição reúne as ferramentas da mesa sem substituir as decisões do narrador.</p>
      </div><div class="registry-mark" aria-hidden="true">${archiveSeal()}<span>ARQUIVO 04/Í</span></div></div>
    <div class="registry-grid">
      <section class="registry-primary" aria-labelledby="registry-access"><div class="registry-panel-head"><h2 id="registry-access">Consultas e registros</h2><span>04 SEÇÕES</span></div>
        <nav class="registry-directory" aria-label="Acessos às ferramentas do RPG">
          <a href="#regras"><span class="registry-id">01</span><span class="registry-entry"><strong>Livro de regras</strong><small>Índice do manual, capítulos, exemplos e consulta textual.</small></span><span class="registry-arrow" aria-hidden="true">↗</span></a>
          <a href="personagem.html"><span class="registry-id">02</span><span class="registry-entry"><strong>Registro de personagem</strong><small>Criação oficial, atributos, origem e histórico acadêmico.</small></span><span class="registry-arrow" aria-hidden="true">↗</span></a>
          <a href="personagens.html"><span class="registry-id">03</span><span class="registry-entry"><strong>Fichas de sessão</strong><small>Personagens salvos, recursos, testes, inventário e notas.</small></span><span class="registry-arrow" aria-hidden="true">↗</span></a>
          <a href="#regras/pdf"><span class="registry-id">04</span><span class="registry-entry"><strong>Manual oficial em PDF</strong><small>Documento integral da edição 3.0.1, com 42 páginas.</small></span><span class="registry-arrow" aria-hidden="true">↗</span></a>
        </nav>
        <div class="registry-inline-note"><span class="registry-code">NOTA 01</span><p>As fichas ficam armazenadas somente neste navegador. Faça uma cópia de segurança antes de trocar de dispositivo.</p></div>
      </section>
      <aside class="registry-aside" aria-labelledby="registry-reference"><div class="registry-aside-head"><span>QUADRO DE REFERÊNCIA</span><span>ED. 3.0.1</span></div>
        <h2 id="registry-reference">A Ascensão</h2>
        <p>A competição organiza-se em quatro provas. O manual descreve sua estrutura, a criação dos estudantes e as consequências de cada sessão.</p>
        <dl class="registry-facts"><div><dt>Convocados</dt><dd>1.000</dd></div><div><dt>Reconhecidos ao final</dt><dd>10</dd></div><div><dt>Provas</dt><dd>04</dd></div><div><dt>Manual</dt><dd>3.0.1</dd></div></dl>
        <div class="registry-trials"><span>ETAPAS</span><ol><li><a href="#regras/ascensao">Interferência</a></li><li><a href="#regras/ascensao">Intuito</a></li><li><a href="#regras/ascensao">Instinto</a></li><li><a href="#regras/ascensao">Iscas</a></li></ol></div>
      </aside>
    </div>
    <div class="registry-foot"><span>DOCUMENTAÇÃO DE JOGO / ACESSO LOCAL</span><span>As regras e os procedimentos definitivos constam no livro oficial.</span></div>
  </section>`;
}
function archiveSeal() {
  return `<svg viewBox="0 0 120 120" aria-hidden="true" focusable="false"><circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" stroke-width="1.3"/><circle cx="60" cy="60" r="43" fill="none" stroke="currentColor" stroke-width=".6" stroke-dasharray="2 3"/><path d="M60 13v94M13 60h94" stroke="currentColor" opacity=".28" stroke-width=".7"/><path d="M36 43v36M47 43v36M70 43v36M81 43v36" stroke="currentColor" stroke-width="4"/><path d="M30 37h23M30 85h23M64 37h23M64 85h23" stroke="currentColor" stroke-width="1.8"/><path d="M57 60h6M60 57v6" stroke="currentColor" stroke-width="2"/></svg>`;
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
  return `${heading('DOCUMENTAÇÃO / ÍNDICE','Livro de regras','Sumário da edição 3.0.1. Selecione uma seção para consultar o documento original.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar('')}<div class="reader-area" id="reader-area"><div class="reader-top"><span>EDIÇÃO DIGITAL / ÍNDICE</span><span>${chapters.length} ENTRADAS</span></div>
      <div class="reader-kicker">BIBLIOTECA · VISÃO GERAL</div><h2>Índice de consulta</h2><p class="reader-lead">Os capítulos e suas páginas estão organizados abaixo. A busca também permite localizar termos do manual.</p>
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
  return `${heading('DOCUMENTAÇÃO / CAPÍTULOS','Livro de regras','Capítulos organizados conforme o manual 3.0.1. O texto integral permanece no PDF.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar(chapter.slug)}<article class="reader-area" id="reader-area"><div class="reader-top"><span>SEÇÃO ${chapter.number}</span><span>PÁGINA ${String(chapter.page).padStart(2,"0")}</span></div>
      <div class="reader-kicker">${chapter.number} · REGISTRO DE CAPÍTULO</div>
      <div class="chapter-breadcrumb"><a href="#regras">Livro de regras</a> / ${chapter.title}</div><h2>${chapter.title}</h2><p class="reader-lead">${chapter.lead}</p>
      <div class="chapter-meta"><span>TIPO · ORGANIZAÇÃO DA LEITURA</span><span>MANUAL OFICIAL · EDIÇÃO 3.0.1</span></div>
      <div class="chapter-body"><p>${chapter.about}</p><h3>Nesta seção</h3>
      <div class="topic-list">${chapter.points.map((x,j)=>`<div class="topic-row"><span class="topic-index">${String(j+1).padStart(2,'0')}</span><div><h3>${x[0]}</h3><p>${x[1]}</p></div><span></span></div>`).join('')}</div>
      <div class="reading-note"><strong>Nota de edição</strong><p>Estas notas resumem o PDF. O texto completo da seção oficial prevalece em qualquer decisão de jogo.</p></div>
      <div class="topic-tags">${chapter.tags.map(t=>`<span class="topic-tag">${e(t)}</span>`).join('')}</div>
      <div class="page-actions"><a class="btn primary" href="${PDF_PATH}#page=${chapter.page}" target="_blank" rel="noopener">Abrir página ${chapter.page} no PDF <span class="arrow">↗</span></a><a class="btn outline" href="${PDF_PATH}" download>Baixar manual <span class="arrow">↓</span></a></div>
      <div class="reading-note"><strong>Texto oficial da seção · p. ${chapter.page}</strong><p>O leitor abaixo mostra o manual completo na página correspondente. Os resumos acima são apenas notas de navegação.</p></div>
      <iframe class="pdf-frame" title="Os Quatro Ís · ${e(chapter.title)} · página ${chapter.page}" src="${PDF_PATH}#page=${chapter.page}&view=FitH" loading="lazy"></iframe>
      ${referenceBox()}
      <div class="next-topic"><span>${i>0?`<a href="#regras/${chapters[i-1].slug}">← ${chapters[i-1].title}</a>`:`<a href="#regras">← Índice geral</a>`}</span><span>${i<chapters.length-1?`<a href="#regras/${chapters[i+1].slug}">${chapters[i+1].title} →</a>`:`<a href="#regras/pdf">PDF oficial →</a>`}</span></div></div>
    </article></div>`;
}
function pdfPage() {
  return `${heading('DOCUMENTAÇÃO / FONTE','Manual oficial em PDF','Edição 3.0.1 · 42 páginas · capítulos, exemplos e glossário.')}
    <div class="container">${pdfSourcePanel()}</div>
    <div class="book-shell container">${sidebar('pdf')}<section class="reader-area" id="reader-area"><div class="reader-top"><span>EDIÇÃO 3.0.1</span><span>${pdfReady?'42 PÁGINAS':'VERIFICANDO'}</span></div>
    <div class="reader-kicker">FONTE DO SISTEMA</div><h2>${pdfReady?'Leitor do documento':'Adicione o livro oficial.'}</h2>
    ${pdfReady ? `<p class="reader-lead">Visualize o livro aqui ou abra-o em uma nova guia para leitura ampliada.</p><div class="page-actions"><a class="btn primary" href="${PDF_PATH}" target="_blank" rel="noopener">Abrir em nova guia <span class="arrow">↗</span></a><a class="btn outline" href="${PDF_PATH}" download>Baixar PDF <span class="arrow">↓</span></a></div><iframe class="pdf-frame" title="Livro de regras oficial — Os Quatro Ís" src="${PDF_PATH}#view=FitH" loading="lazy"></iframe>`:
    `<p class="reader-lead">O arquivo oficial não está disponível neste momento. Confira a publicação do GitHub Pages ou abra a versão no repositório.</p><div class="reading-note"><strong>Como ativar o leitor</strong><p>Envie o PDF oficial para a pasta <strong>assets</strong> do repositório usando exatamente o nome abaixo. Ao publicar novamente, o leitor passará a exibir o arquivo.</p><div class="file-path">${PDF_PATH}</div><div><button type="button" class="small-btn" data-copy="${PDF_PATH}">Copiar caminho do arquivo</button></div></div><p>Se o PDF oficial mudar de versão ou nome, atualize o arquivo e a constante <code>PDF_PATH</code> no início de <code>app.js</code>.</p>`}
    ${referenceBox()}</section></div>`;
}
function aboutPage() {
  return `<section class="about-wrap container archive-about">
    <div class="about-head"><span class="eyebrow">FICHA DE REFERÊNCIA / PROJETO</span><span>PROTOCOLO / 00</span></div>
    <h1>Informações do arquivo</h1>
    <p>Este arquivo reúne o manual oficial de <strong>Os Quatro Ís</strong> e as ferramentas de apoio à campanha: registro de estudantes, fichas em sessão e consulta às regras.</p>
    <div class="about-registries"><div><span>REGISTRO 01</span><h3>Manual oficial</h3><p>O livro 3.0.1 define todas as regras. O índice e os resumos auxiliam na consulta, mas nunca substituem sua redação.</p><a href="#regras/pdf">ABRIR O MANUAL ↗</a></div><div><span>REGISTRO 02</span><h3>Ferramentas locais</h3><p>As fichas e os diários ficam no dispositivo do jogador. Faça backups antes de trocar de navegador ou apagar dados.</p><a href="personagens.html">ABRIR FICHAS ↗</a></div></div>
    <div class="about-card"><span class="eyebrow">COMPROMISSO DE PROJETO</span><h3>Linguagem do arquivo</h3><p>Selos, fichários e nomenclaturas evocam a instituição da Ascensão. São elementos visuais ficcionais: não há monitoramento de jogadores nem envio de seus dados ao GitHub. O material de regras continua preservado no PDF.</p></div>
    <div class="button-row"><a class="btn primary" href="#regras">Consultar códice <span class="arrow">↗</span></a><a class="btn outline" href="personagem.html">Criar estudante <span class="arrow">→</span></a></div>
  </section>`;
}
function currentRoute() {
  return (decodeURIComponent(location.hash.replace(/^#/,'')) || 'inicio').replace(/^\/+/, '');
}
function libraryMarkupForRoute(route) {
  const slug = route.split('/')[1];
  const chapter = chapters.find(c => c.slug === slug);
  return !slug ? libraryPage() : slug === 'pdf' ? pdfPage() : chapter ? chapterPage(chapter) : libraryPage();
}
function render() {
  const route = currentRoute();
  const root = route.split('/')[0];
  const previousRoute = document.body.dataset.currentRoute || '';
  const stayingInBook = root === 'regras' && previousRoute.startsWith('regras') && !!document.getElementById('reader-area');
  const oldY = window.scrollY;
  const oldShell = document.querySelector('.book-shell');
  const oldShellTop = oldShell ? oldShell.getBoundingClientRect().top : 0;
  let previousMinHeight = '';
  let preservedReader = null;

  document.querySelectorAll('[data-nav]').forEach(link => {
    const active = link.dataset.nav === (root === 'regras' ? 'regras' : root === 'sobre' ? 'sobre' : 'inicio');
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  if (root === 'regras') {
    const markup = libraryMarkupForRoute(route);
    if (stayingInBook) {
      // Não recrie o sumário: links, foco e posição de rolagem continuam existindo.
      const template = document.createElement('template');
      template.innerHTML = markup;
      const nextReader = template.content.querySelector('#reader-area');
      const reader = document.getElementById('reader-area');
      if (nextReader && reader) {
        previousMinHeight = reader.style.minHeight;
        reader.style.minHeight = `${reader.getBoundingClientRect().height}px`;
        reader.innerHTML = nextReader.innerHTML;
        preservedReader = reader;
        document.querySelectorAll('.chapter-menu a[href^="#regras"]').forEach(link => {
          const selected = link.getAttribute('href') === `#${route}`;
          link.classList.toggle('active', selected);
          if (selected) link.setAttribute('aria-current', 'page');
          else link.removeAttribute('aria-current');
        });
        const search = document.getElementById('book-search');
        if (search) search.value = '';
      } else {
        main.innerHTML = markup;
      }
    } else {
      main.innerHTML = markup;
    }
  } else {
    main.innerHTML = root === 'sobre' ? aboutPage() : homePage();
  }

  document.title = root === 'regras' ? 'Livro de regras | Os Quatro Ís' : root === 'sobre' ? 'Sobre | Os Quatro Ís' : 'Os Quatro Ís — RPG';
  document.body.dataset.currentRoute = route;
  originalReaderMarkup = document.getElementById('reader-area')?.innerHTML || '';
  if (!preservedReader) {
    const search = document.getElementById('book-search');
    if (search) search.addEventListener('input', searchChapters);
  }
  document.querySelectorAll('[data-copy]').forEach(btn => {
    if (btn.dataset.copyBound) return;
    btn.dataset.copyBound = 'true';
    btn.addEventListener('click', () => {
      if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(btn.dataset.copy).then(() => showToast('Caminho copiado.')).catch(() => showToast('Selecione o caminho acima para copiá-lo.'));
      else showToast('Selecione o caminho acima para copiá-lo.');
    });
  });
  document.getElementById('mobile-menu').hidden = true;
  document.getElementById('mobile-menu-toggle').setAttribute('aria-expanded', 'false');

  if (stayingInBook && preservedReader) {
    const shell = document.querySelector('.book-shell');
    const newTop = shell?.getBoundingClientRect().top ?? oldShellTop;
    const target = Math.max(0, oldY + newTop - oldShellTop);
    window.scrollTo(0, target);
    requestAnimationFrame(() => {
      // Libera a altura provisória só depois da troca, sem recriar a lateral.
      preservedReader.style.minHeight = previousMinHeight;
      window.scrollTo(0, target);
    });
  } else {
    window.scrollTo(0, 0);
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
  try { if(location.protocol==='http:' || location.protocol==='https:'){ const r=await fetch(PDF_PATH,{method:'HEAD',cache:'no-store'}); if(r.status===404)pdfReady=false; else if(r.ok)pdfReady=true; } }
  catch(_) { /* Mantém a referência local já incluída quando HEAD é bloqueado. */ }
  document.querySelectorAll('[data-pdf-status]').forEach(node=>{node.textContent=pdfReady?'PDF disponível':'PDF ainda não incluído';node.dataset.ready=pdfReady?'yes':'no';});
  // Sem renderização secundária.
}
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.defaultPrevented || event.button !== 0 ||
      event.metaKey || event.ctrlKey || event.shiftKey || event.altKey ||
      link.hasAttribute('download') || link.target && link.target !== '_self') return;
  const dest = link.getAttribute('href');
  if (!/^#(?:inicio|regras(?:\/[^#]*)?|sobre)$/.test(dest)) return;
  event.preventDefault();
  if (location.hash === dest) return;
  history.pushState({route:dest}, '', dest);
  render();
});
window.addEventListener('popstate', render);
window.addEventListener('hashchange',render);
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