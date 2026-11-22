/* Arquivo da Ascensão — alternância de contraste e navegação responsiva */
(() => {
 'use strict';
 const root=document.documentElement;
 const button=document.getElementById('theme-toggle');
 if(button){
  const paint=()=>{const light=root.dataset.theme==='light';button.setAttribute('aria-pressed',String(light));button.title=light?'Alternar para arquivo noturno':'Alternar para documento claro';};
  button.addEventListener('click',()=>{const light=root.dataset.theme!=='light';root.dataset.theme=light?'light':'dark';try{localStorage.setItem('quatrois-theme',root.dataset.theme);}catch(_){}paint();});
  paint();
 }
 // Páginas estáticas de ficha usam o menu completo em telas pequenas.
 const trigger=document.getElementById('archive-menu-toggle');
 const panel=document.getElementById('archive-mobile-menu');
 if(trigger&&panel){trigger.addEventListener('click',()=>{const open=panel.hidden;panel.hidden=!open;trigger.setAttribute('aria-expanded',String(open));});panel.addEventListener('click',e=>{if(e.target.closest('a')){panel.hidden=true;trigger.setAttribute('aria-expanded','false');}});}
})();