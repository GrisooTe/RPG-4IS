/* Os Quatro Ís · Biblioteca de personagens — armazenamento local, sem servidor. */
(function(){
 'use strict';
 const KEY='os-quatro-is:personagens:v2',OLD='os-quatro-is:ficha-personagem:v1',BACKUP_KEY='os-quatro-is:ultimo-backup:v1';
 const origins=['Tradicional','Empresarial','Política','Comum'];
 const trajectories=['Dedicada','Equilibrada','Interrompida'];
 const schools=['Favorável','Comum','Desfavorável'];
 const specNames=['Investigação','Lógica','Tecnologia','Estratégia','Atletismo','Combate','Furtividade','Resistência','Diplomacia','Manipulação','Percepção social','Comando'];
 const talents=['Mente Analítica','Último Fôlego','Leitor de Pessoas','Articulador','Sempre Alerta'];
 const tieKinds=['Confiança','Rivalidade','Obrigação','Segredo'];
 const text=(v,n=1200)=>typeof v==='string'?v.slice(0,n):'';
 const number=(v,lo,hi,fallback=lo)=>{const x=Number(v);return Number.isFinite(x)?Math.max(lo,Math.min(hi,Math.round(x))):fallback;};
 const clone=v=>JSON.parse(JSON.stringify(v));
 const now=()=>new Date().toISOString();
 const uuid=()=>typeof crypto!=='undefined'&&crypto.randomUUID?crypto.randomUUID():'oq-'+Date.now()+'-'+Math.random().toString(36).slice(2);
 function cleanCharacter(data){
  if(!data||typeof data!=='object')return null;
  const stats=data.stats||{};
  const o={version:1,step:number(data.step,0,8,8),maxStep:number(data.maxStep,0,8,8),finished:!!data.finished,
   name:text(data.name,100).trim(),family:text(data.family,150),aspiration:text(data.aspiration),origin:origins.includes(data.origin)?data.origin:'',socialDetail:text(data.socialDetail),
   stats:{INT:number(stats.INT,1,5,1),IMP:number(stats.IMP,1,5,1),INF:number(stats.INF,1,5,1)},
   specs:Array.isArray(data.specs)?[...new Set(data.specs.filter(s=>specNames.includes(s)))].slice(0,12):[],trajectory:trajectories.includes(data.trajectory)?data.trajectory:'',
   schooling:schools.includes(data.schooling)?data.schooling:'',schoolingReason:text(data.schoolingReason),agreed:!!data.agreed,academic:null,
   talent:talents.includes(data.talent)?data.talent:'',publicGoal:text(data.publicGoal),privateGoal:text(data.privateGoal),secret:text(data.secret),
   ties:Array.isArray(data.ties)?data.ties.slice(0,20).filter(t=>t&&typeof t==='object').map(t=>({name:text(t.name,150),kind:tieKinds.includes(t.kind)?t.kind:'',strength:number(t.strength,1,3,1)})):[]};
  if(data.academic){
   const a=data.academic,dice=a.dice,kept=a.kept;
   if(Array.isArray(dice)&&dice.length===(o.schooling==='Comum'?2:3)&&dice.every(d=>Number.isInteger(d)&&d>=1&&d<=6)
     &&Array.isArray(kept)&&kept.length===2&&new Set(kept).size===2&&kept.every(i=>Number.isInteger(i)&&i>=0&&i<dice.length)){
    const expected=Array.from({length:dice.length},(_,i)=>i).sort((x,y)=>o.schooling==='Desfavorável'?dice[x]-dice[y]||x-y:dice[y]-dice[x]||x-y).slice(0,2).sort((x,y)=>x-y);
    const mod=o.trajectory==='Dedicada'?1:o.trajectory==='Interrompida'?-1:0;
    const total=kept.reduce((s,i)=>s+dice[i],0)+mod;
    const prep=total<=5?0:total<=8?1:total<=10?2:3;
    const band=total<=5?'Abaixo de 7,0':total<=8?'7,0 a 7,9':total<=10?'8,0 a 8,9':'9,0 a 10,0';
    if(kept.join(',')===expected.join(',')&&total===a.total&&prep===a.preparation&&band===a.band){
     o.academic={dice:[...dice],kept:[...kept],modifier:mod,total,preparation:prep,band,condition:o.schooling,trajectory:o.trajectory,rolledAt:text(a.rolledAt,40)};
    }
   }
  }
  return o.name?o:null;
 }
 function initial(ch){return{life:6+ch.stats.IMP,tension:ch.trajectory==='Dedicada'?1:0,determination:ch.trajectory==='Interrompida'?3:2,fg:0,preparation:(ch.academic?.preparation||0)+(ch.origin==='Empresarial'?2:0),prestige:ch.origin==='Tradicional'?2:0,debt:ch.origin==='Empresarial'?2:0,suspicion:ch.origin==='Política'?2:0,evolution:0,stabilized:false,inventory:[]};}
 function normalizeLive(raw,ch){const d=initial(ch),v=raw&&typeof raw==='object'?raw:{};
  const obj={};const ranges={life:[0,6+ch.stats.IMP],tension:[0,6],determination:[0,3],fg:[0,3],preparation:[0,999],prestige:[0,10],debt:[0,10],suspicion:[0,6],evolution:[0,999]};
  for(const [k,[lo,hi]] of Object.entries(ranges))obj[k]=number(v[k],lo,hi,d[k]);
  obj.stabilized=!!v.stabilized;
  obj.inventory=Array.isArray(v.inventory)?v.inventory.slice(0,80).map(i=>({name:text(i.name,120),ei:number(i.ei,1,30,1),integrity:i.integrity===null?null:number(i.integrity,0,3,2),notes:text(i.notes,250)})).filter(x=>x.name.trim()):[];
  return obj;
 }
 function normalizeSession(raw){const x=raw&&typeof raw==='object'?raw:{};return{
  number:number(x.number,1,9999,1),day:number(x.day,1,9999,1),shortRestDay:x.shortRestDay==null?null:number(x.shortRestDay,1,9999),medicalDay:x.medicalDay==null?null:number(x.medicalDay,1,9999),
  determinationAwarded:!!x.determinationAwarded,evolutionBase:!!x.evolutionBase,evolutionBonus:!!x.evolutionBonus,
  tiesUsed:Array.isArray(x.tiesUsed)?x.tiesUsed.slice(0,20).filter(x=>Number.isInteger(x)&&x>=0):[],notes:text(x.notes,6000),
  pastSessions:Array.isArray(x.pastSessions)?x.pastSessions.slice(0,60).map(y=>({number:number(y?.number,1,9999),day:number(y?.day,1,9999),notes:text(y?.notes,6000),closedAt:text(y?.closedAt,40)})):[],
  log:Array.isArray(x.log)?x.log.slice(0,80).map(i=>({at:text(i?.at,40),text:text(i?.text,250)})):[]};}
 function normalizeRecord(r){const ch=cleanCharacter(r?.character);if(!ch||!ch.academic)return null;
  return{id:text(r.id,100)||uuid(),createdAt:text(r.createdAt,40)||now(),updatedAt:text(r.updatedAt,40)||now(),character:ch,live:normalizeLive(r.live,ch),session:normalizeSession(r.session)};}
 function read(){let parsed;try{parsed=JSON.parse(localStorage.getItem(KEY)||'null');}catch(_){return[];}
  return Array.isArray(parsed?.records)?parsed.records.slice(0,120).map(normalizeRecord).filter(Boolean):[];}
 function write(records){try{localStorage.setItem(KEY,JSON.stringify({version:2,records}));return true;}catch(_){return false;}}
 function migrateLegacy(){
  try{if(localStorage.getItem(KEY))return;const old=JSON.parse(localStorage.getItem(OLD)||'null');
   if(old?.finished&&old?.academic){const ch=cleanCharacter(old);if(ch?.academic)write([normalizeRecord({character:ch})]);}
  }catch(_){/* não há rascunho recuperável */}
 }
 function list(){migrateLegacy();return read().sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));}
 function get(id){return list().find(r=>r.id===id)||null;}
 function upsert(character,id){const ch=cleanCharacter(character);if(!ch?.academic)return null;const recs=list();let record=id?recs.find(r=>r.id===id):null;
  if(record){record.character=ch;record.live=normalizeLive(record.live,ch);record.updatedAt=now();}
  else{record=normalizeRecord({id:uuid(),character:ch,createdAt:now()});recs.unshift(record);}
  return write(recs)?clone(record):null;
 }
 function patch(id,change){const recs=list();const i=recs.findIndex(r=>r.id===id);if(i<0)return null;const r=recs[i];
  if(typeof change==='function')change(r);r.live=normalizeLive(r.live,r.character);r.session=normalizeSession(r.session);r.updatedAt=now();
  return write(recs)?clone(r):null;}
 function remove(id){return write(list().filter(r=>r.id!==id));}
 // A cópia de segurança é um arquivo JSON. Não clonamos um personagem já rolado
 // como se fosse outro estudante: uma ficha nova precisa cumprir as nove etapas.
 function fingerprint(record){
  const c=record.character,a=c.academic;
  return JSON.stringify([c.name.trim().normalize('NFD').toLowerCase(),c.family.trim().normalize('NFD').toLowerCase(),c.origin,
   a?.rolledAt||'',a?.condition||'',a?.trajectory||'',a?.dice||[],a?.kept||[],c.stats]);
 }
 function importCandidates(input){
  const rawRecords=Array.isArray(input?.records)?input.records:[input?.character?input:{character:input}];
  if(!rawRecords.length)throw new Error('O arquivo não contém fichas.');
  if(rawRecords.length>100)throw new Error('O arquivo excede o limite de 100 fichas por importação.');
  const candidates=rawRecords.map(r=>normalizeRecord(r));
  if(candidates.some(r=>!r))throw new Error('O arquivo contém fichas inválidas ou sem rolagem acadêmica. Nada foi importado.');
  const existing=list();const ids=new Set(existing.map(r=>r.id));const prints=new Set(existing.map(fingerprint));
  const added=[];let skipped=0;
  for(const record of candidates){
   const print=fingerprint(record);
   if(ids.has(record.id)||prints.has(print)){skipped++;continue;}
   // IDs antigos são mantidos para reconhecer novas importações do mesmo backup.
   ids.add(record.id);prints.add(print);added.push(record);
  }
  if(added.length&&!write([...added,...existing]))throw new Error('Falha ao salvar a biblioteca; nada foi importado.');
  return {imported:added.length,skipped,ids:added.map(r=>r.id)};
 }
 function importRecord(input){return importCandidates(input);}
 function importBackup(input){if(!Array.isArray(input?.records))throw new Error('Não é um backup de biblioteca.');return importCandidates(input);}
 function markBackup(){try{localStorage.setItem(BACKUP_KEY,now());return true;}catch(_){return false;}}
 function backupStatus(){
  let last='';try{last=localStorage.getItem(BACKUP_KEY)||'';}catch(_){/* armazenamento indisponível */}
  const latest=list().reduce((acc,r)=>r.updatedAt>acc?r.updatedAt:acc,'');
  return {last,needsBackup:!!latest&&(!last||latest>last),hasRecords:!!latest};
 }
 window.OQStore={list,get,upsert,patch,remove,importRecord,importBackup,markBackup,backupStatus,initial,normalizeLive,normalizeSession,cleanCharacter,storageKey:KEY};
})();