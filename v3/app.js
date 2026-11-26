(function(){
  var d=document,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var bt=d.querySelector('.topbar'),nv=d.getElementById('nav');
  if(bt&&nv){bt.setAttribute('aria-expanded','false');bt.addEventListener('click',function(){var o=nv.classList.toggle('open');bt.setAttribute('aria-expanded',o)})}
  if(reduce||!('IntersectionObserver' in window))return;
  var sel='.sec-head,.row,.sect,.about>*,.facts>div,.tile,.strip4>div,.prose>*,.split>*,.kv,.tablewrap,.cgrid>div,.band .wrap>*';
  var els=[].slice.call(d.querySelectorAll(sel));
  els.forEach(function(el){var i=[].indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',Math.min(i,5)*60+'ms');el.classList.add('rv')});
  var pending=els.slice(),tick=false;
  function check(){
    tick=false;var h=innerHeight*.94;
    pending=pending.filter(function(el){
      if(el.getBoundingClientRect().top<h){el.classList.add('in');setTimeout(function(){el.classList.remove('rv','in');el.style.removeProperty('--d')},900);return false}
      return true});
    if(!pending.length){removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll)}
  }
  function onScroll(){if(!tick){tick=true;requestAnimationFrame(check)}}
  addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);
  check();
})();
