/* Os Quatro Ís 1.9 — motor de testes; fonte normativa: manual 3.0.1, pp. 9–18. */
(function(root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OQRoll = api;
})(typeof window !== 'undefined' ? window : null, function() {
  'use strict';
  const cap=(v,a,b)=>Math.max(a,Math.min(b,v));
  const ints=(v,a,b)=>Number.isFinite(Number(v))?cap(Math.trunc(Number(v)),a,b):a;
  const count=dice=>dice.filter(v=>v>=5).length;
  function die() {
    const arr=new Uint32Array(1);
    const limit=4294967296 - (4294967296 % 6);
    let v;do{crypto.getRandomValues(arr);v=arr[0];}while(v>=limit);
    return (v%6)+1;
  }
  function toss(n,roller=die){return Array.from({length:ints(n,1,7)},()=>roller());}
  function resolve(roll){
    const hits=count(roll.dice);
    const needed=roll.kind==='ataque'?ints(roll.defense,0,7)+1:ints(roll.difficulty,1,4);
    return {hits,needed,passed:hits>=needed,margin:roll.kind==='ataque'?hits-ints(roll.defense,0,7):hits-needed};
  }
  function pool({attribute,aid=0,adjust=0,coverage=0,preparation=false,determination='',tension=0,pressure=false,affected=false,fg=0}){
    const trait=typeof attribute==='object'?attribute.name:attribute;
    const penalty=(pressure&&((trait==='INF'&&tension>=3)||(trait==='INT'&&tension>=5)))?1:0;
    const injury=affected&&fg>0?Math.min(2,fg):0;
    const ignore=determination==='ignore'&&penalty>0;
    const total=ints(attribute?.score,1,7)+ints(aid,0,2)+ints(adjust,-3,3)+ints(coverage,-2,0)+
      (preparation?1:0)+(determination==='die'?1:0)-injury-(ignore?0:penalty);
    return {count:cap(total,1,7),tensionPenalty:ignore?0:penalty,injuryPenalty:injury,raw:total,ignoreTension:ignore};
  }
  function replace(dice,indices,roller=die){
    const set=new Set(indices);
    if (indices.length>2 || !indices.length || set.size!==indices.length) throw Error('Escolha de repetição inválida.');
    const output=dice.slice();
    for(const i of indices){if(!Number.isInteger(i)||i<0||i>=dice.length||dice[i]>=5)throw Error('Somente dados sem sucesso podem ser repetidos.');output[i]=roller();}
    return output;
  }
  function gradual(attack,defense,{armor=false,determination=false}={}){
    const a=ints(attack,0,7),d=ints(defense,0,7);
    const margin=a-d;
    const gross=margin<=0||a===0?0:a===1?1:margin>=2?3:2;
    const reducedArmor=armor&&gross>0?1:0;
    const afterArmor=Math.max(0,gross-reducedArmor);
    const reducedDet=determination?Math.min(2,afterArmor):0;
    return {margin,hit:gross>0,gross,reducedArmor,reducedDet,net:Math.max(0,gross-reducedArmor-reducedDet)};
  }
  return {count,die,toss,resolve,pool,replace,gradual};
});