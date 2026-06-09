(function(){
  const DESIGN_W=1920, DESIGN_H=1080;
  const wrap=document.querySelector('.deck-wrap');
  const deck=document.querySelector('.slides');
  const slides=Array.from(document.querySelectorAll('.slide'));
  const prev=document.getElementById('prev');
  const next=document.getElementById('next');
  const prog=document.getElementById('prog');
  const snum=document.getElementById('snum');
  let cur=0;

  function fit(){
    const s=Math.min(wrap.clientWidth/DESIGN_W, wrap.clientHeight/DESIGN_H);
    deck.style.transform=`scale(${s})`;
    deck.style.transformOrigin='center center';
    deck.style.position='absolute';
    deck.style.left=`${(wrap.clientWidth-DESIGN_W)/2}px`;
    deck.style.top=`${(wrap.clientHeight-DESIGN_H)/2}px`;
  }

  function go(i){
    slides[cur].classList.remove('active');
    cur=Math.max(0,Math.min(slides.length-1,i));
    slides[cur].classList.add('active');
    prev.disabled=cur===0;
    next.disabled=cur===slides.length-1;
    prog.style.width=((cur+1)/slides.length*100)+'%';
    snum.textContent=(cur+1)+' / '+slides.length;
    history.replaceState(null,'','#'+(cur+1));
  }

  function fromHash(){
    const h=parseInt(location.hash.replace('#',''),10);
    return Number.isNaN(h)?0:Math.max(0,Math.min(slides.length-1,h-1));
  }

  prev.addEventListener('click',()=>go(cur-1));
  next.addEventListener('click',()=>go(cur+1));
  window.addEventListener('resize',fit);
  window.addEventListener('hashchange',()=>go(fromHash()));
  document.addEventListener('keydown',e=>{
    if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();go(cur+1);}
    if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(cur-1);}
    if(e.key==='Home'){e.preventDefault();go(0);}
    if(e.key==='End'){e.preventDefault();go(slides.length-1);}
  });

  fit();
  go(fromHash());
})();
