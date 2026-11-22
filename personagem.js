'use strict';
/**
 * OS QUATRO ÍS — ficha interativa.
 * Referência normativa: Livro de Regras 3.1.0, capítulos 02, 02A, 02B,
 * talentos iniciais do capítulo 04 e vínculos do capítulo 10.
 * Não cria regras: automatiza valores e procedimento publicados.
 */
const SHEET_VERSION = 1;
const STORAGE_KEY = 'os-quatro-is:ficha-personagem:v1';
const OFFICIAL_PDF = 'assets/Os_Quatro_Is_Livro_de_Regras_v3_1_0_Regulamento_Geral_da_Ascensao.pdf';
const stepPages31 = [12,9,12,16,10,10,11,19,12]; // páginas da edição 3.1.0
const stepInfo = [
  ['Identidade',12],['Origem familiar',9],['Atributos',9],
  ['Especializações',16],['Trajetória escolar',10],['Condições de ensino',10],
  ['Média e Preparação',11],['Talento e vínculos',20],['Ficha final',12]
];
const originInfo = {
  Tradicional:{benefit:'Prestígio 2',cost:'Uma obrigação familiar importante',detail:'Descreva uma obrigação familiar importante'},
  Empresarial:{benefit:'+2 Preparação',cost:'Dívida 2 com patrocinador',detail:'Quem é o patrocinador?'},
  Política:{benefit:'Um contato institucional',cost:'Suspeita 2',detail:'Quem é o contato institucional?'},
  Comum:{benefit:'+1 ponto de atributo inicial',cost:'Sem acesso garantido a patrocinadores',detail:''}
};
const traits = {
  INT:{name:'Intelecto',description:'Análise, observação e planejamento'},
  IMP:{name:'Ímpeto',description:'Movimento, vigor e ação física'},
  INF:{name:'Influência',description:'Relações, leitura social e comando'}
};
const specializations = {
  Intelecto:['Investigação','Lógica','Tecnologia','Estratégia'],
  Ímpeto:['Atletismo','Combate','Furtividade','Resistência'],
  Influência:['Diplomacia','Manipulação','Percepção social','Comando']
};
const talentInfo = {
  'Mente Analítica':'Uma vez por cena, um 6 em INT revela uma pista adicional.',
  'Último Fôlego':'Uma vez por prova, ignore penalidade de Ferimentos Graves por uma rodada.',
  'Leitor de Pessoas':'Uma vez por cena, 2+ sucessos em Percepção social revelam uma motivação imediata.',
  'Articulador':'Uma vez por cena, forneça +1 dado extra ao auxiliar negociação, limite 7.',
  'Sempre Alerta':'+1 dado para identificar emboscadas e sabotagens.'
};
const trajectoryInfo = {
  Dedicada:{modifier:1,effect:'Começa com 1 Tensão.'},
  Equilibrada:{modifier:0,effect:'Sem ajuste adicional.'},
  Interrompida:{modifier:-1,effect:'Começa com +1 Determinação, até 3.'}
};
const schoolInfo = {
  Favorável:{dice:3,keep:'Mantenha os 2 maiores.',example:'Ensino consistente, tutoria, tempo e recursos para estudar.'},
  Comum:{dice:2,keep:'Mantenha ambos os dados.',example:'Rotina escolar sem facilidade ou obstáculo marcante.'},
  Desfavorável:{dice:3,keep:'Mantenha os 2 menores.',example:'Interrupções prolongadas, trabalho exaustivo ou falta de acesso.'}
};
const relationshipTypes = ['Confiança','Rivalidade','Obrigação','Segredo'];
function blankState() {
  return {version:SHEET_VERSION,step:0,maxStep:0,finished:false,
    name:'',family:'',aspiration:'',origin:'',socialDetail:'',
    stats:{INT:1,IMP:1,INF:1},specs:[],trajectory:'',schooling:'',schoolingReason:'',agreed:false,academic:null,
    talent:'',publicGoal:'',privateGoal:'',secret:'',ties:[{name:'',kind:'',strength:1}]};
}
function restoreState() {
  try {
    const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    if(!parsed || parsed.version!==SHEET_VERSION || !parsed.stats || !Array.isArray(parsed.specs) || !Array.isArray(parsed.ties)) return blankState();
    const def=blankState();
    const safe=Object.assign(def,parsed);
    safe.stats={INT:Math.max(1,Math.min(4,Number(parsed.stats.INT)||1)),IMP:Math.max(1,Math.min(4,Number(parsed.stats.IMP)||1)),INF:Math.max(1,Math.min(4,Number(parsed.stats.INF)||1))};
    safe.step=Math.max(0,Math.min(8,Number(parsed.step)||0));
    safe.maxStep=Math.max(safe.step,Math.min(8,Number(parsed.maxStep)||0));
    safe.specs=safe.specs.filter(s=>Object.values(specializations).flat().includes(s)).slice(0,2);
    if(safe.academic && (!Array.isArray(safe.academic.dice)||!Array.isArray(safe.academic.kept)||safe.academic.dice.length<2)) safe.academic=null;
    return safe;
  } catch(_) {return blankState();}
}
const editorParams=new URLSearchParams(location.search);
let editingId=editorParams.get('editar')||null;
let state;
if(editingId){
 const registered=window.OQStore?.get(editingId);
 if(registered){state=Object.assign(blankState(),registered.character,{finished:true,step:8,maxStep:8});}
 else{editingId=null;state=restoreState();}
}else if(editorParams.has('novo')){state=blankState();}
else {state=restoreState();}
const stage=document.getElementById('step-stage');
const actionArea=document.getElementById('creation-actions');
const summary=document.getElementById('character-summary');
const nav=document.getElementById('step-nav');
const printArea=document.getElementById('character-print');
function esc(s) {return String(s??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
function save() {try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}catch(_){/* armazenamento opcional */}}
function budget() {return state.origin==='Comum'?10:9;}
function assigned() {return Object.values(state.stats).reduce((a,b)=>a+b,0);}
function derived(){
 const tr=trajectoryInfo[state.trajectory];
 const acad=state.academic;
 return {life:6+state.stats.IMP, determination:state.trajectory==='Interrompida'?3:2,
  tension:state.trajectory==='Dedicada'?1:0, fg:0,
  preparation:(acad?acad.preparation:0)+(state.origin==='Empresarial'?2:0),
  prestige:state.origin==='Tradicional'?2:0, debt:state.origin==='Empresarial'?2:0,
  suspicion:state.origin==='Política'?2:0,
  academicModifier:tr?tr.modifier:0};
}
function field(label,key,placeholder,area=false,extra=''){
 return `<div class="field-group"><label for="f-${key}">${label}</label>${area?`<textarea id="f-${key}" data-field="${key}" rows="3" placeholder="${esc(placeholder)}" ${extra}>${esc(state[key])}</textarea>`:`<input id="f-${key}" data-field="${key}" type="text" value="${esc(state[key])}" placeholder="${esc(placeholder)}" ${extra}>`}</div>`;
}
function radioCard(group,value,title,subtitle,rule='',locked=false){
 return `<label class="choice-card"><span class="choice-top"><input type="radio" name="${group}" data-choice="${group}" value="${esc(value)}" ${state[group]===value?'checked':''} ${locked?'disabled':''}><strong>${esc(title)}</strong></span><small>${esc(subtitle)}${rule?`<br><span class="choice-rule">${esc(rule)}</span>`:''}</small></label>`;
}
function intro(index,title,description){
 const page=stepInfo[index][1];
 return `<div class="step-eyebrow"><span>ETAPA ${String(index+1).padStart(2,'0')} DE 09 · 3.1.0 / P. ${stepPages31[index]}</span><a class="step-page-link" href="${OFFICIAL_PDF}#page=${page}" target="_blank" rel="noopener">PDF 3.1.0 · p. ${page} ↗</a></div><h2 id="step-heading">${title}</h2><p class="step-intro">${description}</p>`;
}
function stepMarkup(index) {
 const locked=Boolean(state.academic),d=derived();
 if(index===0) return intro(0,'Quem é o estudante?','Comece pela identidade. O Departamento da Ascensão registra nomes, mas é a história que define quem entra na competição.')+
   field('Nome do personagem','name','Nome do estudante')+field('Família','family','Sobrenome, núcleo familiar ou nome da família')+field('O que esse estudante deseja conquistar?','aspiration','Uma ideia simples sobre o objetivo do personagem',true)+
   `<div class="compact-box"><strong>Referência · 02A, etapa 01</strong><p>O manual pede nome, família e uma ideia simples sobre o que o estudante deseja conquistar. Os objetivos público e privado serão detalhados depois.</p></div>`;
 if(index===1) return intro(1,'De onde você vem?','A origem familiar define benefícios, custos sociais e obrigações. Ela não determina automaticamente as condições de ensino.')+
   `<div class="choice-grid">${Object.entries(originInfo).map(([k,v])=>radioCard('origin',k,k,v.benefit,v.cost)).join('')}</div>`+
   (state.origin && originInfo[state.origin].detail?field(originInfo[state.origin].detail,'socialDetail','Registre a relação ou obrigação ligada à origem',true):'')+
   `<div class="compact-box"><strong>Origem ≠ especialização</strong><p>Origem concede um benefício social/mecânico e uma complicação. Especializações são escolhidas separadamente.</p></div>`;
 if(index===2) return intro(2,'Distribua os atributos.','Cada atributo começa em 1 e pode chegar a 4 na criação. Distribua exatamente 9 pontos no total, ou 10 para a origem Comum.')+
   `<div class="stat-allocation ${assigned()===budget()?'ok':'bad'}"><span>Pontos distribuídos</span><strong>${assigned()} / ${budget()}</strong><span>${budget()-assigned()>0?`${budget()-assigned()} restantes`:assigned()===budget()?'Distribuição concluída':`${assigned()-budget()} acima do limite`}</span></div>`+
   `<div class="attribute-table">${Object.entries(traits).map(([code,meta])=>`<div class="attribute-row"><div class="attribute-title"><strong>${esc(meta.name)} · ${code}</strong><small>${esc(meta.description)}</small></div><button type="button" class="attribute-control" data-stat="${code}" data-delta="-1" ${state.stats[code]<=1?'disabled':''} aria-label="Diminuir ${esc(meta.name)}">−</button><span class="attribute-value" aria-live="polite">${state.stats[code]}</span><button type="button" class="attribute-control" data-stat="${code}" data-delta="1" ${state.stats[code]>=4||assigned()>=budget()?'disabled':''} aria-label="Aumentar ${esc(meta.name)}">+</button></div>`).join('')}</div>`+
   `<p class="field-hint" style="margin-top:18px">Os atributos definem quantos dados de seis faces serão rolados nos testes (capítulo 3).</p>`;
 if(index===3) return intro(3,'Escolha duas especializações.','Especializações não somam dados: em um teste pertinente, permitem repetir uma vez um dado sem sucesso, mantendo o novo resultado.')+
   `<div class="specializations">${Object.entries(specializations).map(([group,items])=>`<section class="spec-group"><h3>${group}</h3><div class="spec-grid">${items.map(item=>`<label class="spec-option"><input type="checkbox" data-spec="${esc(item)}" ${state.specs.includes(item)?'checked':''} ${!state.specs.includes(item)&&state.specs.length>=2?'disabled':''}><span>${esc(item)}</span></label>`).join('')}</div></section>`).join('')}</div>`+
   `<div class="spec-counter"><span>Especializações selecionadas</span><strong>${state.specs.length} / 2</strong></div>`;
 if(index===4) return intro(4,'Qual foi sua trajetória escolar?','Sua trajetória altera a rolagem da média e um valor inicial da ficha. Depois da rolagem acadêmica, esta escolha será bloqueada para respeitar o resultado obtido.')+
   `<div class="choice-grid">${Object.entries(trajectoryInfo).map(([k,v])=>radioCard('trajectory',k,k,'Modificador acadêmico: '+(v.modifier>0?'+':'')+v.modifier,v.effect,locked)).join('')}</div>`+
   (locked?`<div class="locked-note">Trajetória preservada: a média já foi rolada. O manual não permite uma nova rolagem para procurar uma faixa melhor.</div>`:'')+
   `<div class="compact-box"><strong>Como funciona?</strong><p>O modificador da trajetória é somado aos dois dados mantidos na etapa 07. A origem familiar não substitui essa escolha.</p></div>`;
 if(index===5) return intro(5,'Em quais condições você estudou?','O narrador e o grupo classificam a experiência escolar como favorável, comum ou desfavorável. Não é um benefício automático de origem.')+
   `<div class="choice-grid">${Object.entries(schoolInfo).map(([k,v])=>radioCard('schooling',k,k,`${v.dice}d6 · ${v.keep}`,v.example,locked)).join('')}</div>`+
   `<div class="field-group"><label for="schooling-reason">Justificativa narrativa das condições de ensino</label><textarea id="schooling-reason" data-field="schoolingReason" rows="3" placeholder="Que elementos da história justificam esta condição?" ${locked?'disabled':''}>${esc(state.schoolingReason)}</textarea><p class="field-hint">O livro exige justificativa acordada entre narrador e grupo antes da rolagem.</p></div>`+
   `<label class="agreement"><input type="checkbox" data-agreed ${state.agreed?'checked':''} ${locked?'disabled':''}><span><strong>Narrador e grupo concordaram</strong> com a classificação e sua justificativa antes de rolar.</span></label>`+
   (locked?`<div class="locked-note">Condição escolar preservada: a rolagem já foi realizada nesta ficha.</div>`:'');
 if(index===6) {
   const ready=!validateStep(4).length&&!validateStep(5).length;
   const record=state.academic;
   return intro(6,'Descubra sua média.','Role os dados conforme sua condição de ensino, mantenha exatamente dois e aplique o modificador da trajetória. Esta rolagem é realizada uma única vez por ficha.')+
     `<div class="roll-well"><h3>Rolagem acadêmica</h3><p><strong>Trajetória:</strong> ${esc(state.trajectory||'não definida')} ${state.trajectory?`(${d.academicModifier>0?'+':''}${d.academicModifier})`:''}<br><strong>Condições:</strong> ${esc(state.schooling||'não definidas')} ${state.schooling?`· ${schoolInfo[state.schooling].dice}d6, ${schoolInfo[state.schooling].keep.toLowerCase()}`:''}</p>`+
     (record?`<div class="dice-row">${record.dice.map((v,i)=>`<span class="die ${record.kept.includes(i)?'':'dropped'}" aria-label="Dado ${i+1}: ${v}${record.kept.includes(i)?', mantido':', descartado'}">${v}</span>`).join('')}</div><p>Dados mantidos: ${record.kept.map(i=>record.dice[i]).join(' + ')}. Modificador: ${record.modifier>0?'+':''}${record.modifier}.</p><div class="result-highlight"><div><small>RESULTADO FINAL</small><strong>${record.total}</strong></div><div><small>MÉDIA REGISTRADA</small><strong>${esc(record.band)}</strong></div><div><small>PREPARAÇÃO ACADÊMICA</small><strong>${record.preparation}</strong></div></div><div class="locked-note">Rolagem registrada e bloqueada. O manual (página 6) não permite repeti-la para buscar uma faixa melhor. Para criar outro estudante, use “Começar outra ficha”.</div>`:
     `<p>O resultado ainda não foi determinado. Confirme as etapas 05 e 06 antes de lançar os dados.</p><button class="roll-button" type="button" id="roll-academic" ${ready?'':'disabled'}>Rolar média escolar uma vez</button>`)+
     `</div><div class="compact-box"><strong>Faixas da tabela oficial · página 6</strong><p>5 ou menos → abaixo de 7,0 / 0 Preparação · 6 a 8 → 7,0–7,9 / 1 · 9 a 10 → 8,0–8,9 / 2 · 11 ou mais → 9,0–10,0 / 3.</p></div>`+
     `<p class="field-hint">A faixa é o registro escolar. Um valor exato dentro dela, se necessário, pode ser escolhido pelo jogador e narrador sem alterar a Preparação. Bônus Empresarial (+2) é somado posteriormente.</p>`;
 }
 if(index===7) return intro(7,'Talentos, objetivos e vínculos.','Escolha um dos talentos iniciais sugeridos no capítulo 4. Registre seus objetivos, um segredo e pelo menos um vínculo com outro participante.')+
   `<div class="field-title">Um talento inicial</div><div class="talent-grid">${Object.entries(talentInfo).map(([k,description])=>`<label class="talent-item"><span class="talent-item-head"><input type="radio" name="talent" data-choice="talent" value="${esc(k)}" ${state.talent===k?'checked':''}>${esc(k)}</span><p>${esc(description)}</p></label>`).join('')}</div>`+
   field('Objetivo público','publicGoal','O que os outros sabem que seu estudante quer alcançar?',true)+
   field('Objetivo privado','privateGoal','O que ele pretende conquistar de verdade?',true)+
   field('Segredo','secret','Que informação o personagem mantém escondida?',true)+
   `<div class="field-group"><div class="field-title">Vínculos com outros participantes</div><p class="field-hint">O capítulo 10 descreve Confiança, Rivalidade, Obrigação e Segredo, com intensidade de 1 a 3.</p>`+
   state.ties.map((tie,i)=>`<div class="tie-line"><input type="text" data-tie-index="${i}" data-tie-field="name" value="${esc(tie.name)}" placeholder="Nome de outro participante" aria-label="Nome do vínculo ${i+1}"><select data-tie-index="${i}" data-tie-field="kind" aria-label="Tipo do vínculo ${i+1}"><option value="">Tipo de vínculo</option>${relationshipTypes.map(t=>`<option value="${t}" ${tie.kind===t?'selected':''}>${t}</option>`).join('')}</select><select data-tie-index="${i}" data-tie-field="strength" aria-label="Intensidade do vínculo ${i+1}">${[1,2,3].map(v=>`<option value="${v}" ${Number(tie.strength)===v?'selected':''}>Nível ${v}</option>`).join('')}</select><button type="button" data-remove-tie="${i}" class="tie-remove" ${state.ties.length===1?'disabled':''} aria-label="Remover vínculo ${i+1}">×</button></div>`).join('')+
   `<button type="button" class="tie-add" id="add-tie">+ Adicionar vínculo</button></div>`;
 return intro(8,'Seu registro está completo?','Confira a ficha antes de finalizar. Todos os valores abaixo são calculados segundo o manual; a rolagem acadêmica permanece registrada.')+
   `<div id="review-status">${allErrors().length?`<div class="compact-box"><strong>Há ${allErrors().length} pendência(s).</strong><p>${esc(allErrors()[0])}</p></div>`:`<span class="ready-pill">✓ Dados obrigatórios completos</span>`}</div>${reviewMarkup(false)}`+
   `<div class="review-actions"><button type="button" id="finish-character" ${allErrors().length?'disabled':''}>${state.finished?'Ficha finalizada ✓':'Finalizar ficha'}</button><button type="button" class="secondary" id="export-character" ${state.finished?'':'disabled'}>Baixar ficha (.json)</button><button type="button" class="secondary" id="print-character" ${state.finished?'':'disabled'}>Imprimir / salvar em PDF</button>${state.finished&&editingId?`<a class="secondary" href="personagens.html?ficha=${encodeURIComponent(editingId)}">Abrir na biblioteca ↗</a>`:''}</div>`;
}
function validateStep(i) {
 const errs=[];
 if(i===0){if(!state.name.trim())errs.push('Informe o nome do estudante.');if(!state.family.trim())errs.push('Informe a família.');if(!state.aspiration.trim())errs.push('Registre uma ideia do que o estudante deseja conquistar.');}
 if(i===1){if(!originInfo[state.origin])errs.push('Escolha uma origem familiar.');else if(originInfo[state.origin].detail&&!state.socialDetail.trim())errs.push('Registre a obrigação, o patrocinador ou o contato institucional da origem.');}
 if(i===2){const points=assigned();if(points!==budget())errs.push(`Distribua exatamente ${budget()} pontos entre INT, IMP e INF (atualmente ${points}).`);if(Object.values(state.stats).some(v=>!Number.isInteger(v)||v<1||v>4))errs.push('Cada atributo deve ficar entre 1 e 4.');}
 if(i===3&&state.specs.length!==2)errs.push('Escolha exatamente duas especializações.');
 if(i===4&&!trajectoryInfo[state.trajectory])errs.push('Escolha a trajetória escolar.');
 if(i===5){if(!schoolInfo[state.schooling])errs.push('Escolha as condições de ensino.');if(!state.schoolingReason.trim())errs.push('Explique a condição de ensino escolhida.');if(!state.agreed)errs.push('Confirme o acordo entre narrador e grupo antes da rolagem.');}
 if(i===6&&!state.academic)errs.push('Realize a única rolagem da média acadêmica.');
 if(i===7){if(!talentInfo[state.talent])errs.push('Escolha um talento inicial.');if(!state.publicGoal.trim())errs.push('Registre o objetivo público.');if(!state.privateGoal.trim())errs.push('Registre o objetivo privado.');if(!state.secret.trim())errs.push('Registre o segredo do personagem.');if(!state.ties.some(t=>t.name.trim()&&relationshipTypes.includes(t.kind)&&[1,2,3].includes(Number(t.strength))))errs.push('Registre pelo menos um vínculo com outro participante, com tipo e intensidade.');}
 return errs;
}
function allErrors(){return Array.from({length:8},(_,i)=>validateStep(i)).flat();}
function statusText(value,fallback='Ainda não definido'){return value?esc(value):`<span style="color:var(--muted)">${fallback}</span>`;}
function summaryMarkup(){
 const d=derived();
 return `<h3 class="summary-name">${statusText(state.name,'Estudante sem nome')}</h3><p class="summary-family">${statusText(state.family,'Família não informada')}</p>`+
 `<div class="summary-line"><span>Origem</span><strong>${statusText(state.origin,'—')}</strong></div>`+
 `<div class="summary-numbers">${Object.keys(traits).map(key=>`<div class="summary-number"><strong>${state.stats[key]}</strong><small>${key}</small></div>`).join('')}</div>`+
 `<div class="summary-line"><span>Pontos de atributo</span><strong>${assigned()} / ${budget()}</strong></div>`+
 `<div class="summary-line"><span>Especializações</span><strong>${state.specs.length} / 2</strong></div>`+
 `<div class="summary-divider">RECURSOS INICIAIS</div>`+
 [['Vida (PV)',d.life],['Determinação',d.determination],['Tensão',d.tension],['Ferimentos Graves',d.fg],['Preparação',d.preparation],['Prestígio',d.prestige],['Dívida',d.debt],['Suspeita',d.suspicion]].map(([k,v])=>`<div class="summary-line"><span>${k}</span><strong>${v}</strong></div>`).join('')+
 `<div class="summary-divider">HISTÓRICO ACADÊMICO</div>`+
 `<div class="summary-line"><span>Trajetória</span><strong>${statusText(state.trajectory,'—')}</strong></div>`+
 `<div class="summary-line"><span>Condição</span><strong>${statusText(state.schooling,'—')}</strong></div>`+
 `<div class="summary-line"><span>Média</span><strong>${state.academic?esc(state.academic.band):'A rolar'}</strong></div>`+
 `<p class="summary-note"><b>Preparação acadêmica:</b> ${state.academic?state.academic.preparation:'a definir'}${state.origin==='Empresarial'?' · bônus Empresarial: +2':''}. Esta ficha não substitui o PDF oficial.</p>`;
}
function reviewMarkup(forPrint){
 const d=derived(),a=state.academic;
 const entries=[['Origem',state.origin||'—'],['Família',state.family||'—'],['Trajetória',state.trajectory||'—'],['Condições de ensino',state.schooling||'—'],['Média registrada',a?a.band:'—'],['Resultado dos dados',a?`${a.dice.join(', ')} · mantidos ${a.kept.map(i=>a.dice[i]).join(' e ')} · total ${a.total}`:'—'],['Especializações',state.specs.join(' · ')||'—'],['Talento inicial',state.talent||'—']];
 return `<div class="review-sheet"><span class="smallcaps">DEPARTAMENTO DA ASCENSÃO · REGISTRO DE PARTICIPANTE</span><h3>${esc(state.name||'Estudante')}</h3><p class="field-hint">Ficha inicial · Manual 3.1.0 · ${forPrint?'cópia de mesa':'pré-visualização'}</p>`+
 `<div class="review-stat-row">${Object.keys(traits).map(key=>`<div class="review-stat"><strong>${state.stats[key]}</strong><small>${key}</small></div>`).join('')}</div>`+
 `<div class="review-grid">${entries.map(([k,v])=>`<div><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join('')}</div>`+
 `<div class="review-section-title">VALORES INICIAIS</div><div class="review-grid">${[['Vida atual e máxima',`${d.life} / ${d.life} PV`],['Determinação',d.determination],['Tensão',d.tension],['Ferimentos Graves',0],['Preparação',d.preparation],['Prestígio',d.prestige],['Dívida',d.debt],['Suspeita',d.suspicion]].map(([k,v])=>`<div><strong>${esc(k)}</strong><span>${esc(v)}</span></div>`).join('')}</div>`+
 (state.origin!=='Comum'?`<div class="review-section-title">ORIGEM E COMPLICAÇÃO</div><p class="review-paragraph"><strong>${esc(originInfo[state.origin]?.cost||'')}</strong> — ${esc(state.socialDetail)}</p>`:`<p class="review-paragraph">Origem Comum: +1 ponto de atributo inicial e sem acesso garantido a patrocinadores.</p>`)+
 `<div class="review-section-title">HISTÓRIA E OBJETIVOS</div><p class="review-paragraph"><strong>Ideia:</strong> ${esc(state.aspiration)}</p><p class="review-paragraph"><strong>Objetivo público:</strong> ${esc(state.publicGoal)}</p><p class="review-paragraph"><strong>Objetivo privado:</strong> ${esc(state.privateGoal)}</p><p class="review-paragraph"><strong>Segredo:</strong> ${esc(state.secret)}</p>`+
 `<div class="review-section-title">VÍNCULOS</div>${state.ties.filter(t=>t.name.trim()&&t.kind).map(t=>`<p class="review-paragraph">${esc(t.name)} · ${esc(t.kind)} · intensidade ${esc(t.strength)}</p>`).join('')}`+
 `<div class="review-section-title">REGISTRO ACADÊMICO</div><p class="review-paragraph">${esc(state.schoolingReason)}</p><p class="review-paragraph">Preparação acadêmica ${a?a.preparation:'—'}${state.origin==='Empresarial'?' + 2 pela origem Empresarial':''}; total inicial ${d.preparation}.</p>`+
 `<p class="field-hint" style="margin-top:20px">Os efeitos dos talentos e vínculos seguem os capítulos 4 e 10. A ficha registra a situação inicial do personagem, antes de gastos ou consequências em jogo.</p></div>`;
}
function render(){
 stage.innerHTML=stepMarkup(state.step);
 summary.innerHTML=summaryMarkup();
 const error=state.step<8?validateStep(state.step):allErrors();
 const index=state.step;
 actionArea.innerHTML=`<button class="btn outline" type="button" id="previous-step" ${index===0?'disabled':''}>← Voltar</button><div class="action-right"><button type="button" class="btn primary" id="next-step" ${index===8?'disabled':''}>${index===7?'Revisar ficha':'Continuar'} →</button></div>`;
 // Mensagens são exibidas apenas quando a pessoa tenta avançar; não antecipar erros antes de preencher.
 nav.innerHTML=stepInfo.map(([title],i)=>`<button type="button" data-step-jump="${i}" ${i>state.maxStep?'disabled':''} ${i===index?'aria-current="step"':''}><span class="step-index">${String(i+1).padStart(2,'0')}</span><span class="step-label">${title}</span>${i<index&&!validateStep(i).length?'<span class="step-done">✓</span>':''}</button>`).join('');
 document.getElementById('step-counter').textContent=`${String(index+1).padStart(2,'0')} / 09`;
 document.getElementById('step-meter-fill').style.width=`${((index+1)/9)*100}%`;
 printArea.innerHTML=state.finished?reviewMarkup(true):'';
 save();
}
function redrawKeepingPosition(){const y=window.scrollY;render();window.scrollTo(0,y);}
function updateSummary(){summary.innerHTML=summaryMarkup();save();}
function showError(message){
 let target=document.getElementById('form-error');
 if(!target){target=document.createElement('div');target.id='form-error';target.className='action-error';target.setAttribute('role','alert');actionArea.before(target);}
 target.textContent=message;
}
function clearError(){const el=document.getElementById('form-error');if(el)el.remove();}
function navigateStep(next){state.step=next;state.maxStep=Math.max(state.maxStep,next);clearError();render();const target=document.getElementById('step-stage');const rect=target?.getBoundingClientRect();if(rect&&(rect.top<0||rect.top>window.innerHeight-140))target.scrollIntoView({behavior:'auto',block:'start'});}
function finish(){
 const errs=allErrors();if(errs.length){showError(errs[0]);return;}
 state.finished=true;
 const saved=window.OQStore?.upsert(state,editingId);
 if(!saved){showError('Não foi possível guardar a ficha na biblioteca. Exporte os dados antes de sair.');return;}
 editingId=saved.id;
 history.replaceState(null,'','personagem.html?editar='+encodeURIComponent(editingId));
 redrawKeepingPosition();showToast('Ficha salva na biblioteca. Você já pode usá-la em uma sessão.');
}
function showToast(message){const n=document.getElementById('toast');n.textContent=message;n.classList.add('visible');}
function randomDie(){const v=new Uint32Array(1);crypto.getRandomValues(v);return (v[0]%6)+1;}
function rollAcademic(){
 if(state.academic)return;
 if(validateStep(4).length||validateStep(5).length){showError('Conclua e confirme trajetória e condições de ensino antes de rolar.');return;}
 const info=schoolInfo[state.schooling];
 const dice=Array.from({length:info.dice},randomDie);
 const kept=Array.from({length:dice.length},(_,i)=>i).sort((a,b)=>state.schooling==='Desfavorável'?dice[a]-dice[b]||a-b:dice[b]-dice[a]||a-b).slice(0,2).sort((a,b)=>a-b);
 const modifier=trajectoryInfo[state.trajectory].modifier;
 const total=kept.reduce((sum,i)=>sum+dice[i],0)+modifier;
 const preparation=total<=5?0:total<=8?1:total<=10?2:3;
 const band=total<=5?'Abaixo de 7,0':total<=8?'7,0 a 7,9':total<=10?'8,0 a 8,9':'9,0 a 10,0';
 state.academic={dice,kept,modifier,total,preparation,band,condition:state.schooling,trajectory:state.trajectory,rolledAt:new Date().toISOString()};
 state.finished=false;clearError();redrawKeepingPosition();
}
function downloadJSON(){
 if(!state.finished)return;
 const clean={...state,step:undefined,maxStep:undefined,finished:undefined};
 const blob=new Blob([JSON.stringify({document:'Os Quatro Ís — Ficha de personagem',manual:'3.1.0',character:clean,values:derived()},null,2)],{type:'application/json;charset=utf-8'});
 const url=URL.createObjectURL(blob),a=document.createElement('a');
 a.href=url;a.download='ficha-'+(state.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'estudante')+'.json';
 document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),200);
}
function updateFormValue(target){
 const key=target.dataset.field;
 if(key && Object.prototype.hasOwnProperty.call(state,key)){
   if((key==='schoolingReason')&&state.academic)return;
   state[key]=target.value;state.finished=false;updateSummary();return;
 }
 if(target.dataset.tieField){
   const index=Number(target.dataset.tieIndex);if(!state.ties[index])return;
   state.ties[index][target.dataset.tieField]=target.dataset.tieField==='strength'?Number(target.value):target.value;
   state.finished=false;updateSummary();
 }
}
stage.addEventListener('input',event=>{
 if(event.target.matches('[data-field], [data-tie-field]'))updateFormValue(event.target);
});
stage.addEventListener('change',event=>{
 const t=event.target;
 if(t.dataset.choice){
   if(['trajectory','schooling'].includes(t.dataset.choice)&&state.academic)return;
   const priorOrigin=state.origin;
   state[t.dataset.choice]=t.value;
   if(t.dataset.choice==='origin'&&priorOrigin!==state.origin)state.socialDetail='';
   if(t.dataset.choice==='schooling')state.agreed=false;
   state.finished=false;clearError();redrawKeepingPosition();return;
 }
 if(t.dataset.spec){
   const chosen=t.dataset.spec;
   if(t.checked&&!state.specs.includes(chosen)&&state.specs.length<2)state.specs.push(chosen);
   if(!t.checked)state.specs=state.specs.filter(s=>s!==chosen);
   state.finished=false;clearError();redrawKeepingPosition();return;
 }
 if(t.hasAttribute('data-agreed')){state.agreed=t.checked;state.finished=false;updateSummary();return;}
 if(t.dataset.tieField)updateFormValue(t);
});
stage.addEventListener('click',event=>{
 const b=event.target.closest('button');if(!b)return;
 if(b.dataset.stat){
   const code=b.dataset.stat,delta=Number(b.dataset.delta);const next=state.stats[code]+delta;
   if(next<1||next>4||delta>0&&assigned()>=budget())return;
   state.stats[code]=next;state.finished=false;redrawKeepingPosition();return;
 }
 if(b.id==='roll-academic')rollAcademic();
 if(b.id==='add-tie'){state.ties.push({name:'',kind:'',strength:1});redrawKeepingPosition();}
 if(b.hasAttribute('data-remove-tie')&&state.ties.length>1){state.ties.splice(Number(b.dataset.removeTie),1);state.finished=false;redrawKeepingPosition();}
 if(b.id==='finish-character')finish();
 if(b.id==='export-character')downloadJSON();
 if(b.id==='print-character'&&state.finished)window.print();
});
nav.addEventListener('click',event=>{
 const button=event.target.closest('[data-step-jump]');
 if(!button||button.disabled)return;
 navigateStep(Number(button.dataset.stepJump));
});
actionArea.addEventListener('click',event=>{
 const btn=event.target.closest('button');if(!btn||btn.disabled)return;
 if(btn.id==='previous-step'){navigateStep(Math.max(0,state.step-1));return;}
 if(btn.id==='next-step'){
   const err=validateStep(state.step);
   if(err.length){showError(err[0]);return;}
   navigateStep(Math.min(8,state.step+1));
 }
});
document.getElementById('reset-character').addEventListener('click',()=>{
 if(!window.confirm('Deseja criar uma nova ficha? O rascunho atual será substituído, incluindo a rolagem acadêmica registrada.'))return;
 editingId=null;state=blankState();history.replaceState(null,'','personagem.html?novo=1');save();navigateStep(0);
});
render();