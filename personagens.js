'use strict';
/* Os Quatro Ís · Painel de sessão. Valores, efeitos e limites: Manual do Participante 3.1.0. */
const store=window.OQStore;
const roster=document.getElementById('roster-list');
const reader=document.getElementById('library-reader');
const notice=document.getElementById('notification');
const printable=document.getElementById('session-print');
const params=new URLSearchParams(location.search);
let selectedId=params.get('ficha')||null;
let undoSnapshot=null;
const e=v=>String(v??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
const formatTime=s=>{try{return new Intl.DateTimeFormat('pt-BR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'}).format(new Date(s));}catch(_){return '';}};
function showNotice(message){notice.textContent=message;notice.hidden=false;}
function fileName(s){return (s||'estudante').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')||'estudante';}
function download(data,name){const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json;charset=utf-8'});const url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),3000);}
function log(record,message){record.session.log.unshift({at:new Date().toISOString(),text:message});record.session.log=record.session.log.slice(0,80);}
function update(fn){
 const before=store.get(selectedId);
 if(!before)return;
 const updated=store.patch(selectedId,fn);
 if(!updated){showNotice('Não foi possível salvar. Verifique o armazenamento do navegador.');return;}
 undoSnapshot={id:selectedId,live:before.live,session:before.session};
 refreshSession(updated);
}
function updateBackupStatus(){
 const badge=document.getElementById('backup-status');
 if(!badge)return;
 const status=store.backupStatus();
 badge.textContent=!status.hasRecords?'Nenhuma ficha salva':!status.last?'Backup recomendado — suas fichas estão apenas neste navegador':status.needsBackup?'Há alterações ainda não incluídas no último backup':'Último backup registrado neste navegador';
 badge.dataset.warning=status.needsBackup?'yes':'no';
}
function updatePrintable(rec){
 printable.innerHTML=rec?`<h1>Os Quatro Ís — ${e(rec.character.name)}</h1><p>Manual 3.1.0 · Sessão ${rec.session.number} · Dia ${rec.session.day}</p><div class="session-card"><p>INT ${rec.character.stats.INT} · IMP ${rec.character.stats.IMP} · INF ${rec.character.stats.INF}</p><p>Origem: ${e(rec.character.origin)} · Especializações: ${e(rec.character.specs.join(' / '))}</p><div class="resource-grid">${Object.keys(ranges).map(k=>resource(k,rec)).join('')}</div><h2>Inventário</h2><ul>${rec.live.inventory.map(i=>`<li>${e(i.name)} — ${i.ei} EI</li>`).join('')}</ul><h2>Notas</h2><p style="white-space:pre-wrap">${e(rec.session.notes)}</p></div>`:'';
}
function refreshSession(rec){
 // Não substitua o DOM dos recursos ou o sumário: preserva o botão em foco e a posição da página.
 const oldY=window.scrollY;
 const cards=reader.querySelectorAll('[data-resource-card]');
 cards.forEach(card=>{
  const key=card.dataset.resourceCard,v=rec.live[key];
  card.querySelector('[data-resource-value]').textContent=v;
  const upper=ranges[key][2]??6+rec.character.stats.IMP;
  card.querySelector('[data-delta="-1"]').disabled=v<=ranges[key][1];
  card.querySelector('[data-delta="1"]').disabled=v>=upper;
 });
 const sections={
  alerts:alertsMarkup(rec),
  actions:actions(rec),
  inventory:inventory(rec),
  ties:ties(rec),
  archive:archiveMarkup(rec),
  log:logMarkup(rec)
 };
 for(const [name,html] of Object.entries(sections)){
  const el=reader.querySelector('[data-section="'+name+'"]');
  if(el&&el.innerHTML!==html)el.innerHTML=html;
 }
 const day=reader.querySelector('[data-session-day]');if(day)day.textContent=rec.session.day;
 const number=reader.querySelector('[data-session-number]');if(number)number.textContent=String(rec.session.number).padStart(2,'0');
 const summary=reader.querySelector('[data-session-summary]');if(summary)summary.textContent='Dia '+rec.session.day+' · Sessão '+rec.session.number;
 const notes=reader.querySelector('#session-notes');if(notes&&document.activeElement!==notes&&notes.value!==rec.session.notes)notes.value=rec.session.notes;
 const undo=reader.querySelector('[data-action="undo"]');if(undo)undo.disabled=!(undoSnapshot?.id===selectedId);
 refreshRoll(rec);
 updatePrintable(rec);updateBackupStatus();
 if(window.scrollY!==oldY)window.scrollTo(0,oldY);
}

function select(id){undoSnapshot=null;luckSelection.clear();selectedId=id;const url=new URL(location.href);url.searchParams.set('ficha',id);history.replaceState(null,'',url);render();}
function fallback(){return `<div class="empty-library"><span class="eyebrow">PRIMEIRO REGISTRO</span><h2>Uma ficha pronta<br>para a próxima prova.</h2><p>Crie um estudante pelo formulário oficial. Quando a ficha for finalizada, ela aparecerá aqui para ser usada em jogo, com progresso salvo automaticamente.</p><a class="library-btn dark" href="personagem.html?novo=1">Criar minha primeira ficha ↗</a></div>`;}
const ranges={life:['Vida',0,null,'PV atuais (máximo: 6 + Ímpeto).'],tension:['Tensão',0,6,'3–4 afeta Influência; 5 também afeta Intelecto; 6 gera crise.'],determination:['Determinação',0,3,'Gaste para +1 dado, ignorar penalidade de Tensão ou reduzir 2 PV de um dano.'],fg:['Ferimentos Graves',0,3,'3 FG incapacita; não exceda 1 FG por acontecimento.'],preparation:['Preparação',0,999,'Gaste 1 antes do teste para obter +1 dado (até 7 dados).'],prestige:['Prestígio',0,10,'Favores simples, importantes ou excepcionais, conforme a situação.'],debt:['Dívida',0,10,'A cada 3 com um patrocinador, ele pode exigir um favor significativo.'],suspicion:['Suspeita',0,6,'Em 2 rumores; em 4 vigilância; em 6 ocorre ação e retorno a 3.'],evolution:['Evolução',0,999,'Receba até 2 pontos por sessão; custos: talento 3, especialização 4, atributo 6.']};
function resource(key,rec){const [label,min,max,help]=ranges[key],v=rec.live[key],effectiveMax=max??6+rec.character.stats.IMP;
 return `<div class="resource" data-resource-card="${key}"><div class="resource-label">${label}</div><div class="resource-help">${help}</div><div class="resource-bottom"><div class="resource-count"><span data-resource-value>${v}</span><small> / ${max===null?effectiveMax:max===999?'—':max}</small></div><div class="resource-buttons"><button type="button" data-resource="${key}" data-delta="-1" aria-label="Diminuir ${label}" ${v<=min?'disabled':''}>−</button><button type="button" data-resource="${key}" data-delta="1" aria-label="Aumentar ${label}" ${v>=effectiveMax?'disabled':''}>+</button></div></div></div>`;}
function statusMessages(r){const {live:l}=r;const messages=[];
 if(l.life===0)messages.push('0 PV: incapacitado. É necessário estabilizar antes de recuperar Vida.');
 if(l.fg>=3)messages.push('3 Ferimentos Graves: personagem incapacitado.');
 else if(l.fg>0)messages.push(`${l.fg} FG: ${l.fg===1?'−1 dado':'−2 dados'} nas ações físicas afetadas.`);
 if(l.tension>=6)messages.push('Tensão 6: crise; não pode Pressionar a Sorte.');
 else if(l.tension>=5)messages.push('Tensão 5: −1 dado em INF e INT sob pressão.');
 else if(l.tension>=3)messages.push('Tensão 3–4: −1 dado em INF sob pressão.');
 if(l.suspicion>=6)messages.push('Suspeita 6: ação oficial ou clandestina; conforme o capítulo 10, retorne a 3 após o evento.');
 else if(l.suspicion>=4)messages.push('Suspeita 4: vigilância.');
 else if(l.suspicion>=2)messages.push('Suspeita 2: rumores.');
 const used=l.inventory.reduce((n,i)=>n+i.ei,0),cap=5+r.character.stats.IMP;
 if(used>cap+2)messages.push(`Inventário ${used} EI: excede a margem carregável de ${cap+2} EI; abandone itens ou obtenha ajuda.`);
 else if(used>cap)messages.push('Sobrecarga: −1 dado em deslocamento e resistência física; sem movimento adicional por corrida.');
 return messages;
}
function quick(k,label,help,disabled=false){return `<button type="button" data-quick="${k}" ${disabled?'disabled':''}><strong>${label}</strong><small>${help}</small></button>`;}
function actions(rec){const l=rec.live,s=rec.session;const max=6+rec.character.stats.IMP;const heal=l.life>0||l.stabilized;
 return `<div class="session-quick">${quick('prep','Preparação (uso manual)','Use apenas para testes feitos fora do rolador; ali o gasto é automático.',l.preparation<1)}
 ${quick('det','Determinação (uso manual)','Use apenas para efeitos fora do rolador; ali o gasto é automático.',l.determination<1)}

 ${quick('short','Descanso curto seguro · 1 hora','+1 PV, uma vez por dia.',!heal||l.life>=max||s.shortRestDay===s.day)}
 ${quick('full','Descanso completo · 8 horas','+2 PV e −2 Tensão.',!heal||l.life>=max&&l.tension===0)}
 ${quick('treat','Tratamento médico','INT dificuldade 2, materiais, +2 PV, uma vez/dia.',!heal||l.life>=max||s.medicalDay===s.day)}
 ${quick('stabilize','Marcar estabilização','Em 0 PV: ação e INT dificuldade 2 com recursos adequados.',l.life!==0||l.stabilized)}
 ${quick('recover-det','Recuperar 1 Determinação','Risco significativo por objetivo pessoal; uma vez/sessão.',l.determination>=3||s.determinationAwarded)}
 ${quick('fg','Remover 1 FG','Exige atendimento adequado e dois descansos completos.',l.fg===0)}
 ${quick('evo-base','+1 Evolução · participação','Ao final da sessão, com participação relevante.',s.evolutionBase)}
 ${quick('evo-bonus','+1 Evolução · marco','Opcional por marco narrativo; até 2 pontos/sessão.',s.evolutionBonus)}
 ${quick('next-session','Abrir próxima sessão','Reinicia usos de vínculos e concessões por sessão.')}
 </div>`;}
function ties(rec){return rec.character.ties.map((t,i)=>!t.name||!t.kind?'':`<div class="session-tie"><span><strong>${e(t.name)}</strong><br><small>${e(t.kind)} · intensidade ${t.strength} · +1 dado quando central à ação</small></span><button data-tie="${i}" ${rec.session.tiesUsed.includes(i)?'disabled':''}>${rec.session.tiesUsed.includes(i)?'Usado':'Marcar usado'}</button></div>`).join('')||'<p class="session-info">Nenhum vínculo registrado.</p>';}
function inventory(rec){const sum=rec.live.inventory.reduce((n,i)=>n+i.ei,0),cap=5+rec.character.stats.IMP;
 return `<p class="session-info"><strong>${sum} / ${cap} EI</strong> ocupados. Pode carregar até ${cap+2} EI com sobrecarga; ultrapassar exige abandonar itens ou ajuda. Suprimentos coletivos são registrados separadamente.</p>
 <table class="session-table"><thead><tr><th>Item</th><th>EI</th><th>Integridade</th><th></th></tr></thead><tbody>${rec.live.inventory.map((i,n)=>`<tr><td><strong>${e(i.name)}</strong>${i.notes?`<br><small>${e(i.notes)}</small>`:''}</td><td>${i.ei}</td><td>${i.integrity===null?'—':i.integrity}</td><td><button data-remove-item="${n}" aria-label="Remover ${e(i.name)}">Remover</button></td></tr>`).join('')||'<tr><td colspan="4">Sem equipamentos registrados.</td></tr>'}</tbody></table>
 <form id="add-item" class="session-form"><input name="name" placeholder="Nome do equipamento" maxlength="120" aria-label="Nome do equipamento" required><select name="ei" aria-label="Espaços de inventário">${[1,2,3,4,5].map(n=>`<option value="${n}">${n} EI</option>`).join('')}</select><select name="integrity" aria-label="Integridade inicial"><option value="2">Int. 2</option><option value="1">Int. 1</option><option value="3">Int. 3</option><option value="-">Sem Int.</option></select><button type="submit">Adicionar</button></form>`;}
function alertsMarkup(rec){const messages=statusMessages(rec);return messages.map(m=>`<div class="status-note ${rec.live.life===0||rec.live.fg>=3?'critical':''}">${e(m)}</div>`).join('');}
function archiveMarkup(rec){const s=rec.session;return s.pastSessions.length?s.pastSessions.map(prev=>`<details class="session-archive"><summary>Sessão ${prev.number} · Dia ${prev.day} · ${e(formatTime(prev.closedAt))}</summary><p>${e(prev.notes)}</p></details>`).join(''):'<p class="session-info">As notas das sessões encerradas ficarão arquivadas aqui.</p>';}
function logMarkup(rec){return rec.session.log.slice(0,18).map(i=>`<li><span>${e(i.text)}</span><time>${e(formatTime(i.at))}</time></li>`).join('')||'<li>Nenhum evento registrado nesta ficha.</li>';}
/* Rolagens integradas — capítulos 03, 03A–03C, 04, 05 e 05A do manual 3.1.0 (PDF disponível no site: 3.1.0). */
const diceEngine=window.OQRoll;
let luckSelection=new Set();
function rollForm(rec){
 const specs=rec.character.specs.filter(x=>typeof x==='string');
 const options=specs.length?specs.map(sp=>`<option value="${e(sp)}">${e(sp)}</option>`).join(''):'';
 return `<form id="roll-form" class="dice-form">
  <div class="dice-form-grid">
   <label>Tipo de rolagem<select name="kind" data-roll-kind><option value="teste">Teste de atributo</option><option value="ataque">Ataque (Ímpeto)</option></select></label>
   <label>Atributo<select name="attribute"><option value="INT">Intelecto · ${rec.character.stats.INT}d6</option><option value="IMP">Ímpeto · ${rec.character.stats.IMP}d6</option><option value="INF">Influência · ${rec.character.stats.INF}d6</option></select></label>
   <label data-test-only>Dificuldade<select name="difficulty">${[1,2,3,4].map(n=>`<option value="${n}" ${n===2?'selected':''}>${n} sucesso${n===1?'':'s'}</option>`).join('')}</select></label>
   <label>Especialização pertinente<select name="specialty"><option value="">Nenhuma</option>${options}</select></label>
   <label>Auxílios aprovados<select name="aid">${[0,1,2].map(n=>`<option value="${n}">${n} dado${n===1?'':'s'}</option>`).join('')}</select></label>
   <label>Ajuste situacional do narrador<select name="adjust">${[-3,-2,-1,0,1,2,3].map(n=>`<option value="${n}" ${n===0?'selected':''}>${n>0?'+':''}${n} dado${Math.abs(n)===1?'':'s'}</option>`).join('')}</select></label>
   <label data-attack-only hidden>Cobertura do alvo<select name="coverage"><option value="0">Sem cobertura (0)</option><option value="-1">Parcial (−1)</option><option value="-2">Forte (−2)</option></select></label>
   <label>Uso de Determinação<select name="determination"><option value="">Não gastar</option><option value="die" ${rec.live.determination<1?'disabled':''}>1 ponto: +1 dado</option><option value="ignore" ${rec.live.determination<1?'disabled':''}>1 ponto: ignorar penalidade de Tensão</option></select></label>
  </div>
  <div class="dice-checks">
   <label><input name="specialtyConfirmed" type="checkbox"> Narrador confirmou a especialização</label>
   <label><input name="preparation" type="checkbox" ${rec.live.preparation<1?'disabled':''}> Gastar 1 Preparação (+1 dado)</label>
   <label><input name="pressure" type="checkbox"> Ação sob pressão (aplicar Tensão)</label>
   <label><input name="affected" type="checkbox"> Ação física afetada por FG</label>
  </div>
  <p class="dice-explainer">1–7 dados no total. Apenas 5 e 6 contam como sucesso. Auxílio exige teste Comum bem-sucedido de cada aliado. Gastos são descontados somente ao lançar os dados.</p>
  <button class="dice-primary" type="submit">Rolar dados deste teste</button>
 </form>`;
}
function rollResult(rec){
 const r=rec.session.roll;
 if(!r)return `<div class="dice-empty" role="status">Nenhuma rolagem registrada nesta sessão. Configure um teste acima para começar.</div>`;
 const check=diceEngine.resolve(r);
 const hasFailed=r.dice.some(d=>d<5);
 const canSpec=!!r.specialty&&!r.specialtyUsed&&!r.luckUsed&&hasFailed;
 const canLuck=!r.luckUsed&&!check.passed&&hasFailed&&rec.live.tension<6;
 const caption=r.kind==='ataque'?`Ataque contra ${r.defense} sucesso${r.defense===1?'':'s'} de defesa`:`Dificuldade ${r.difficulty}`;
 const buttons=r.dice.map((value,i)=>{
  const failed=value<5;
  const spec=canSpec&&failed;
  const selectable=canLuck&&failed;
  const active=luckSelection.has(i);
  return `<div class="dice-result-die ${value>=5?'success':'failure'}"><strong class="die-face">${value}</strong><small>${value>=5?'Sucesso':'Sem sucesso'}</small>${spec?`<button type="button" data-roll-spec="${i}" title="Repetir uma vez por especialização">Repetir (esp.)</button>`:''}${selectable?`<button type="button" data-roll-select="${i}" aria-pressed="${active}">${active?'✓ Selecionado':'Pressionar?'}</button>`:''}</div>`;
 }).join('');
 const dmg=r.kind==='ataque'?diceEngine.gradual(check.hits,r.defense,{armor:r.armor,determination:r.defenderDet}):null;
 return `<div class="dice-result" aria-live="polite">
  <div class="dice-result-head"><div><span class="dice-eyebrow">ÚLTIMO TESTE · ${e(r.attribute)}</span><h4>${check.hits} sucesso${check.hits===1?'':'s'} <small>/ ${check.needed} exigido${check.needed===1?'':'s'}</small></h4></div><strong class="dice-outcome ${check.passed?'pass':'fail'}">${check.passed?'SUCESSO':'FALHA'}</strong></div>
  <p class="dice-subtitle">${caption} · ${r.pool}d6${r.specialty?' · '+e(r.specialty):''}</p>
  <div class="dice-faces">${buttons}</div>
  ${canSpec?'<p class="dice-hint">Escolha um único dado de 1 a 4 para repetir pela especialização. O novo resultado deve ser mantido.</p>':''}
  ${r.specialtyUsed?'<p class="dice-hint">Repetição pela especialização já utilizada.</p>':''}
  ${canLuck?`<div class="luck-controls"><p>Após a falha, selecione até dois dados sem sucesso e confirme. Custa <strong>+1 Tensão imediatamente</strong>, mesmo se falhar novamente.</p><button type="button" data-roll-press ${luckSelection.size===0?'disabled':''}>Pressionar a Sorte (${luckSelection.size}/2)</button></div>`:''}
  ${r.luckUsed?'<p class="dice-hint">Pressionar a Sorte já utilizado neste teste (uma vez por teste).</p>':''}
  ${r.kind==='ataque'?`<div class="dice-attack-result"><p><strong>Defesa:</strong> <label>Sucessos da reação <select data-roll-defense>${Array.from({length:8},(_,i)=>`<option value="${i}" ${i===r.defense?'selected':''}>${i}</option>`).join('')}</select></label></p>
    <p class="dice-hint">Defesa passiva = 0. Empates favorecem o defensor. Distância e linha de visão precisam permitir o ataque.</p>
    <div class="dice-damage-row"><strong>${dmg.gross} PV</strong><span>Dano do acerto gradual (margem ${dmg.margin})</span></div>
    <div class="dice-checks"><label><input type="checkbox" data-roll-armor ${r.armor?'checked':''}> Proteção corporal aplicável (−1 PV; Integridade −1 ao absorver)</label><label><input type="checkbox" data-roll-defdet ${r.defenderDet?'checked':''}> Defensor gastou 1 Determinação (−2 PV)</label></div>
    <p class="dice-damage-net">Dano líquido previsto: <strong>${dmg.net} PV</strong>. ${dmg.reducedArmor?'Proteção absorveu 1 PV. ':''}${dmg.reducedDet?'Determinação reduziu '+dmg.reducedDet+' PV. ':''}Aplique PV e possíveis Ferimentos Graves na ficha do alvo, após a decisão do narrador.</p>
    <button type="button" class="dice-secondary" data-roll-log-damage>Registrar cálculo no histórico</button></div>`:''}
  <div class="dice-result-foot"><button type="button" class="dice-secondary" data-roll-clear>Encerrar este resultado</button><span>Rolagem registrada: ${e(formatTime(r.createdAt))}</span></div>
 </div>`;
}
function rollPanel(rec){return `<section class="roll-panel" id="rolagens" aria-label="Rolagens integradas"><div class="roll-panel-head"><div><span class="dice-eyebrow">FERRAMENTAS DA SESSÃO / 01</span><h3>Teste e Acerto Gradual</h3></div><a href="assets/Os_Quatro_Is_Livro_de_Regras_v3_1_0_Regulamento_Geral_da_Ascensao.pdf#page=9" target="_blank" rel="noopener">Regras dos testes ↗</a></div><p class="session-section-note">Prepare a ação com o narrador. O sistema lança dados, registra gastos e calcula resultados, mas não substitui decisões narrativas.</p>${rollForm(rec)}<div data-roll-result>${rollResult(rec)}</div><p class="dice-official">Referência: capítulo 3 (p. 9), especializações (pp. 10–12), condições (p. 13) e embates (pp. 15–18).</p></section>`;}
function refreshRoll(rec){
 const container=reader.querySelector('[data-roll-result]');
 if(container)container.innerHTML=rollResult(rec);
 const form=reader.querySelector('#roll-form');
 if(form){const p=form.elements.preparation; if(p){p.disabled=rec.live.preparation<1;if(p.disabled)p.checked=false;}
  const d=form.elements.determination;if(d)Array.from(d.options).forEach(o=>{if(o.value)o.disabled=rec.live.determination<1;});
  if(d&&rec.live.determination<1)d.value='';
 }
}
function commitRoll(change){
 const rec=store.get(selectedId);if(!rec)return false;
 const saved=store.patch(selectedId,change);
 if(!saved){showNotice('Não foi possível salvar a rolagem. Verifique o armazenamento do navegador.');return false;}
 undoSnapshot=null;
 luckSelection.clear();
 refreshSession(saved);
 return true;
}
function startRoll(form){
 const rec=store.get(selectedId);if(!rec)return;
 if(rec.live.life===0||rec.live.fg>=3){showNotice('Personagem incapacitado. Resolva essa condição antes de rolar.');return;}
 const v=form.elements,kind=v.kind.value==='ataque'?'ataque':'teste',attribute=kind==='ataque'?'IMP':v.attribute.value;
 const specialty=v.specialty.value;
 if(specialty&&(!rec.character.specs.includes(specialty)||!v.specialtyConfirmed.checked)){showNotice('Confirme com o narrador que a especialização é pertinente à ação.');return;}
 const prep=v.preparation.checked,det=v.determination.value;
 if(prep&&rec.live.preparation<1||det&&rec.live.determination<1){showNotice('Preparação ou Determinação insuficiente.');return;}
 const pressure=v.pressure.checked,affected=v.affected.checked;
 const data={attribute:{name:attribute,score:rec.character.stats[attribute]},aid:Number(v.aid.value),adjust:Number(v.adjust.value),coverage:kind==='ataque'?Number(v.coverage.value):0,preparation:prep,determination:det,tension:rec.live.tension,pressure,affected,fg:rec.live.fg};
 const calculation=diceEngine.pool(data);
 if(det==='ignore'&&!calculation.ignoreTension){showNotice('Ignorar Tensão só é aplicável a um teste que esteja sofrendo essa penalidade.');return;}
 const dice=diceEngine.toss(calculation.count);
 const roll={kind,attribute,difficulty:Number(v.difficulty.value),defense:0,specialty, specialtyUsed:false,luckUsed:false,
  pool:calculation.count,dice,initial:dice.join(', '),notes:'',createdAt:new Date().toISOString(),spentPrep:prep,spentDet:!!det,rawPool:calculation.raw,
  armor:false,defenderDet:false};
 const saved=commitRoll(r=>{if(prep)r.live.preparation--;if(det)r.live.determination--;r.session.roll=roll;
  log(r,`Rolagem ${kind==='ataque'?'de ataque':'de teste'} ${attribute} (${calculation.count}d6): [${dice.join(', ')}], ${diceEngine.count(dice)} sucesso(s).${prep?' −1 Preparação.':''}${det?' −1 Determinação.':''}`);});
 if(saved){form.reset();syncRollFields(form);}
}
function syncRollFields(form){
 const attacking=form.elements.kind.value==='ataque';
 form.querySelectorAll('[data-attack-only]').forEach(x=>x.hidden=!attacking);
 form.querySelectorAll('[data-test-only]').forEach(x=>x.hidden=attacking);
 const attr=form.elements.attribute;
 if(attacking){attr.value='IMP';attr.disabled=true;}else attr.disabled=false;
}
function rerollSpecialty(index){
 const rec=store.get(selectedId),r=rec?.session.roll;
 if(!r||!r.specialty||r.specialtyUsed||r.luckUsed||r.dice[index]>=5)return;
 const next=diceEngine.replace(r.dice,[index]);
 commitRoll(x=>{x.session.roll.dice=next;x.session.roll.specialtyUsed=true;log(x,`Especialização ${r.specialty}: dado ${index+1} repetido (${r.dice[index]} → ${next[index]}), ${diceEngine.count(next)} sucesso(s).`);});
}
function chooseLuck(index){
 const rec=store.get(selectedId),r=rec?.session.roll;
 if(!r||r.luckUsed||diceEngine.resolve(r).passed||rec.live.tension>=6||r.dice[index]>=5)return;
 if(luckSelection.has(index))luckSelection.delete(index);
 else if(luckSelection.size<2)luckSelection.add(index);
 else {showNotice('Pressionar a Sorte permite repetir no máximo dois dados sem sucesso.');return;}
 refreshRoll(rec);
}
function pressLuck(){
 const rec=store.get(selectedId),r=rec?.session.roll;
 if(!r||r.luckUsed||diceEngine.resolve(r).passed||rec.live.tension>=6||!luckSelection.size)return;
 const idx=[...luckSelection].sort((a,b)=>a-b),prev=r.dice;
 let newer;
 try{newer=diceEngine.replace(prev,idx);}catch(err){showNotice(err.message);return;}
 commitRoll(x=>{x.live.tension++;x.session.roll.dice=newer;x.session.roll.luckUsed=true;
  log(x,`Pressionar a Sorte: +1 Tensão; dados ${idx.map(i=>i+1).join(', ')} repetidos (${idx.map(i=>prev[i]).join(', ')} → ${idx.map(i=>newer[i]).join(', ')}); ${diceEngine.count(newer)} sucesso(s).`);});
}
function changeDefenseValue(field){
 const rec=store.get(selectedId);if(!rec?.session.roll||rec.session.roll.kind!=='ataque')return;
 const value=clamp(Number(field.value)||0,0,7);
 if(value===rec.session.roll.defense)return;
 commitRoll(r=>{r.session.roll.defense=value;log(r,`Defesa ativa: ${value} sucesso(s) confirmados; recalcular dano gradual.`);});
}
function toggleDamageField(field){
 const rec=store.get(selectedId);if(!rec?.session.roll||rec.session.roll.kind!=='ataque')return;
 const key=field.hasAttribute('data-roll-armor')?'armor':'defenderDet';
 commitRoll(r=>{r.session.roll[key]=field.checked;});
}
function registerDamage(){
 const rec=store.get(selectedId),roll=rec?.session.roll;
 if(!roll||roll.kind!=='ataque')return;
 const result=diceEngine.gradual(diceEngine.count(roll.dice),roll.defense,{armor:roll.armor,determination:roll.defenderDet});
 commitRoll(r=>{log(r,`Acerto Gradual: ataque ${diceEngine.count(roll.dice)}, defesa ${roll.defense}, margem ${result.margin}, dano ${result.gross} PV, redução ${result.gross-result.net}, líquido ${result.net} PV. PV e FG do defensor devem ser atualizados na ficha dele.`);});
 showNotice('Cálculo registrado. Os recursos do defensor não foram alterados automaticamente.');
}

function sessionMarkup(rec){const c=rec.character,l=rec.live,s=rec.session,cap=6+c.stats.IMP,alerts=statusMessages(rec);
 return `<div class="session-card"><div class="session-topline"><span>PARTICIPANTE / ARQUIVO DE CAMPANHA</span><span>SESSÃO <span data-session-number>${String(s.number).padStart(2,'0')}</span></span></div>
 <h2>${e(c.name)}</h2><p class="session-subtitle">Família ${e(c.family)} · Origem ${e(c.origin)} · Trajetória ${e(c.trajectory)} · Média ${e(c.academic?.band||'—')}</p>
 <div class="session-attribute-row">${Object.entries(c.stats).map(([key,val])=>`<div class="session-attribute"><strong>${val}</strong><small>${key}</small></div>`).join('')}</div>
 <div class="session-buttons"><a href="#rolagens">Ir ao rolador ↓</a><a href="personagem.html?editar=${encodeURIComponent(rec.id)}">Editar dados de criação ↗</a><button data-action="export-one">Backup desta ficha</button><button data-action="print">Imprimir resumo</button><a href="personagem.html?novo=1">Criar outro estudante</a><button data-action="undo" disabled>Desfazer último ajuste</button><button class="danger" data-action="delete">Excluir</button></div>
 <div class="session-two"><div class="session-meta"><strong>ESPECIALIZAÇÕES</strong><span>${e(c.specs.join(' · ')||'—')}</span><strong style="margin-top:15px">TALENTO</strong><span>${e(c.talent||'—')}</span></div><div class="session-meta"><strong>JORNADA DA CAMPANHA</strong><span data-session-summary>Dia ${s.day} · Sessão ${s.number}</span><button data-action="next-day">Avançar um dia</button></div></div>
 ${rollPanel(rec)}
 <h3 class="session-h3">Recursos e condições</h3><p class="session-section-note">Os botões alteram o registro da ficha, mas não executam automaticamente testes ou decisões do narrador. Consulte o PDF para as condições de uso.</p>
 <div class="resource-grid">${Object.keys(ranges).map(k=>resource(k,rec)).join('')}</div>
 <div data-section="alerts">${alertsMarkup(rec)}</div>
 <h3 class="session-h3">Ações rápidas da sessão</h3><p class="session-section-note">As condições narrativas precisam ser satisfeitas na mesa. Regras de recuperação: capítulo 4, p. 13.</p><div data-section="actions">${actions(rec)}</div>
 <h3 class="session-h3">Inventário</h3><div data-section="inventory">${inventory(rec)}</div>
 <h3 class="session-h3">Vínculos · uma vez por sessão</h3><div data-section="ties">${ties(rec)}</div>
 <h3 class="session-h3">Anotações da sessão</h3><textarea id="session-notes" class="session-notes" maxlength="6000" placeholder="O que aconteceu nesta sessão? Acordos, pistas, recursos de equipe e próximos passos…" aria-label="Notas de sessão">${e(s.notes)}</textarea><p class="session-info">Salvo automaticamente neste navegador. Salve um backup para transferir as fichas de dispositivo.</p>
 <h3 class="session-h3">Sessões anteriores</h3>
 <div data-section="archive">${archiveMarkup(rec)}</div>
 <h3 class="session-h3">Histórico de alterações</h3><ol class="session-log" data-section="log">${logMarkup(rec)}</ol>
 <div class="session-callout"><strong>Regras da mesa</strong><br>PV máximo = 6 + Ímpeto. O rolador aplica testes e gastos quando autorizado pelo jogador; decisões narrativas permanecem na mesa. Um FG por acontecimento; em 0 PV, estabilize antes de recuperar Vida. PDF oficial 3.1.0 sempre prevalece.</div>
 </div>`;
}
function render(){const characters=store.list();document.getElementById('library-count').textContent=String(characters.length).padStart(2,'0');document.getElementById('roster-count').textContent=`${characters.length} FICHA${characters.length===1?'':'S'}`;
 if(selectedId&&!characters.some(r=>r.id===selectedId))selectedId=null;
 if(!selectedId&&characters.length)selectedId=characters[0].id;
 roster.innerHTML=characters.map(r=>`<button class="roster-item ${r.id===selectedId?'selected':''}" type="button" data-select="${e(r.id)}" ${r.id===selectedId?'aria-current="true"':''}><strong>${e(r.character.name)}</strong><small>${e(r.character.origin)} · INT ${r.character.stats.INT} / IMP ${r.character.stats.IMP} / INF ${r.character.stats.INF}</small></button>`).join('')||'<p class="empty-roster">Nenhuma ficha cadastrada.</p>';
 const rec=selectedId?characters.find(r=>r.id===selectedId):null;reader.innerHTML=rec?sessionMarkup(rec):fallback();
 updatePrintable(rec);
 updateBackupStatus();
}
function confirmAction(msg){return window.confirm(msg);}
function quickAction(action){const rec=store.get(selectedId);if(!rec)return;const l=rec.live,s=rec.session,max=6+rec.character.stats.IMP,canHeal=l.life>0||l.stabilized;
 if(action==='next-session'){
  if(!confirmAction('Abrir uma nova sessão? Os vínculos e limites de concessão por sessão serão reiniciados. A anotação atual será adicionada ao histórico.'))return;
  update(r=>{if(r.session.notes.trim())r.session.pastSessions.unshift({number:r.session.number,day:r.session.day,notes:r.session.notes,closedAt:new Date().toISOString()});r.session.notes='';r.session.number++;r.session.tiesUsed=[];r.session.evolutionBase=false;r.session.evolutionBonus=false;r.session.determinationAwarded=false;r.session.roll=null;luckSelection.clear();log(r,'Nova sessão iniciada; anotações anteriores arquivadas.');});return;
 }
 if(action==='stabilize'){
  if(l.life!==0||l.stabilized)return;
  if(!confirmAction('O personagem recebeu estabilização adequada? A regra exige ação principal, teste de Intelecto dificuldade 2 e recursos plausíveis.'))return;
  update(r=>{r.live.stabilized=true;log(r,'Estabilizado em 0 PV, após procedimento aprovado na mesa.');});return;
 }
 if(action==='fg'){
  if(l.fg<1||!confirmAction('Confirmar atendimento adequado e dois descansos completos para remover 1 Ferimento Grave?'))return;
  update(r=>{r.live.fg--;log(r,'−1 Ferimento Grave após recuperação adequada.');});return;
 }
 if(action==='treat'&&(!canHeal||l.life>=max||s.medicalDay===s.day))return;
 if(action==='treat'&&!confirmAction('O tratamento cumpriu o teste INT dificuldade 2 com materiais e foi aprovado pelo narrador?'))return;
 if(action==='recover-det'&&(l.determination>=3||s.determinationAwarded||!confirmAction('O personagem assumiu risco significativo por um objetivo pessoal nesta sessão?')))return;
 update(r=>{
  const a=r.live,t=r.session,lifeMax=6+r.character.stats.IMP;let text='';
  switch(action){
   case'prep':if(a.preparation<=0)return;a.preparation--;text='−1 Preparação usada antes do teste.';break;
   case'det':if(a.determination<=0)return;a.determination--;text='−1 Determinação gasta.';break;
   case'luck':if(a.tension>=6)return;a.tension++;text='+1 Tensão por Pressionar a Sorte.';break;
   case'short':if(a.life===0&&!a.stabilized||a.life>=lifeMax||t.shortRestDay===t.day)return;a.life=Math.min(lifeMax,a.life+1);t.shortRestDay=t.day;text='Descanso curto: +1 PV.';break;
   case'full':if(a.life===0&&!a.stabilized)return;a.life=Math.min(lifeMax,a.life+2);a.tension=Math.max(0,a.tension-2);text='Descanso completo: +2 PV e −2 Tensão, dentro dos limites.';break;
   case'treat':if(a.life===0&&!a.stabilized||a.life>=lifeMax||t.medicalDay===t.day)return;a.life=Math.min(lifeMax,a.life+2);t.medicalDay=t.day;text='Tratamento médico: +2 PV, teste e materiais confirmados.';break;
   case'recover-det':if(t.determinationAwarded||a.determination>=3)return;a.determination++;t.determinationAwarded=true;text='+1 Determinação por risco significativo.';break;
   case'evo-base':if(t.evolutionBase)return;a.evolution++;t.evolutionBase=true;text='+1 Evolução: participação relevante na sessão.';break;
   case'evo-bonus':if(t.evolutionBonus)return;a.evolution++;t.evolutionBonus=true;text='+1 Evolução: marco narrativo.';break;
  }
  if(text)log(r,text);
 });
}
document.getElementById('import-file').addEventListener('change',async ev=>{
 const file=ev.target.files?.[0];if(!file)return;ev.target.value='';
 if(file.size>3_000_000){showNotice('Arquivo muito grande para importação local.');return;}
 try{const data=JSON.parse(await file.text());const outcome=Array.isArray(data.records)?store.importBackup(data):store.importRecord(data);selectedId=null;undoSnapshot=null;render();showNotice(`${outcome.imported} ficha(s) importada(s); ${outcome.skipped} já existente(s) ignorada(s). Nenhum registro anterior foi substituído.`);}
 catch(err){showNotice('Não foi possível importar: '+err.message);}
});
document.addEventListener('click',ev=>{
 const button=ev.target.closest('button');if(!button)return;
 if(button.hasAttribute('data-roll-spec')){rerollSpecialty(Number(button.dataset.rollSpec));return;}
 if(button.hasAttribute('data-roll-select')){chooseLuck(Number(button.dataset.rollSelect));return;}
 if(button.hasAttribute('data-roll-press')){pressLuck();return;}
 if(button.hasAttribute('data-roll-clear')){commitRoll(r=>{r.session.roll=null;log(r,'Resultado da rolagem anterior encerrado.');});return;}
 if(button.hasAttribute('data-roll-log-damage')){registerDamage();return;}
 if(button.dataset.select){select(button.dataset.select);return;}
 if(button.dataset.resource){const key=button.dataset.resource,delta=Number(button.dataset.delta);const rec=store.get(selectedId);if(!rec)return;
  const max=ranges[key][2]??6+rec.character.stats.IMP;
  if(key==='life'&&delta>0&&rec.live.life===0&&!rec.live.stabilized){showNotice('Em 0 PV, registre estabilização antes de recuperar Vida.');return;}
  if(key==='fg'&&delta<0&&!confirmAction('Retirar um Ferimento Grave exige atendimento adequado e dois descansos completos. Confirmar?'))return;
  update(r=>{const old=r.live[key],next=clamp(old+delta,ranges[key][1],max);if(next===old)return;r.live[key]=next;
    if(key==='life'&&next===0)r.live.stabilized=false;
    if(key==='suspicion'&&next===6)log(r,'Suspeita 6: gatilho narrativo; após a ação, retornar a 3 conforme o manual.');
    log(r,`${ranges[key][0]}: ${old} → ${next} (ajuste manual).`);});return;
 }
 if(button.dataset.quick){quickAction(button.dataset.quick);return;}
 if(button.dataset.tie!==undefined){const i=Number(button.dataset.tie);update(r=>{if(r.session.tiesUsed.includes(i))return;r.session.tiesUsed.push(i);log(r,`Vínculo ${r.character.ties[i]?.name||''} usado nesta sessão.`);});return;}
 if(button.dataset.removeItem!==undefined){const i=Number(button.dataset.removeItem);const rec=store.get(selectedId);if(!rec?.live.inventory[i])return;
  update(r=>{const [item]=r.live.inventory.splice(i,1);log(r,`Item removido: ${item.name}.`);});return;
 }
 if(!button.dataset.action)return;
 const act=button.dataset.action;
 if(act==='export-all'){download({format:'os-quatro-is-biblioteca',version:2,exportedAt:new Date().toISOString(),records:store.list()},'os-quatro-is-biblioteca-backup.json');store.markBackup();updateBackupStatus();showNotice('Backup de todas as fichas gerado. Confirme que o arquivo foi salvo e guarde-o em local seguro.');return;}
 const rec=store.get(selectedId);if(!rec)return;
 if(act==='export-one'){download({document:'Os Quatro Ís — ficha e sessão',version:2,manual:'3.1.0',id:rec.id,createdAt:rec.createdAt,updatedAt:rec.updatedAt,character:rec.character,live:rec.live,session:rec.session},'os-quatro-is-'+fileName(rec.character.name)+'.json');return;}
 if(act==='print'){window.print();return;}
 if(act==='undo'){if(!undoSnapshot||undoSnapshot.id!==selectedId)return;const snap=undoSnapshot;undoSnapshot=null;const restored=store.patch(selectedId,r=>{r.live=snap.live;r.session=snap.session;});if(restored){refreshSession(restored);showNotice('Último ajuste desfeito.');}else showNotice('Não foi possível desfazer.');return;}
 if(act==='delete'){if(!confirmAction(`Excluir permanentemente ${rec.character.name} deste navegador? Exporte antes caso queira preservar a ficha.`))return;store.remove(rec.id);selectedId=null;undoSnapshot=null;render();showNotice('Ficha removida do dispositivo.');return;}
 if(act==='next-day'){update(r=>{r.session.day++;log(r,`Dia da campanha avançou para ${r.session.day}.`);});return;}
});
reader.addEventListener('submit',ev=>{if(ev.target.id==='roll-form'){ev.preventDefault();startRoll(ev.target);return;}if(ev.target.id!=='add-item')return;ev.preventDefault();const data=new FormData(ev.target),name=String(data.get('name')||'').trim().slice(0,120);if(!name)return;
 const ei=clamp(Number(data.get('ei'))||1,1,5),s=String(data.get('integrity'));
 update(r=>{r.live.inventory.push({name,ei,integrity:s==='-'?null:clamp(Number(s)||2,0,3),notes:''});log(r,`Item adicionado: ${name} (${ei} EI).`);});});
reader.addEventListener('change',ev=>{
 const target=ev.target;
 if(target.hasAttribute('data-roll-kind')){syncRollFields(target.closest('form'));return;}
 if(target.hasAttribute('data-roll-defense')){changeDefenseValue(target);return;}
 if(target.hasAttribute('data-roll-armor')||target.hasAttribute('data-roll-defdet')){toggleDamageField(target);return;}
});
reader.addEventListener('input',ev=>{if(ev.target.id!=='session-notes')return;undoSnapshot=null;const rec=store.patch(selectedId,r=>{r.session.notes=ev.target.value;});if(!rec)showNotice('Não foi possível salvar a nota.');else updatePrintable(rec);const undo=reader.querySelector('[data-action="undo"]');if(undo)undo.disabled=true;updateBackupStatus();});
render();