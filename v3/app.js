(function(){
  var d=document,reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var h=d.querySelector('.hdr');
  if(h){var f=function(){h.classList.toggle('scrolled',scrollY>20)};addEventListener('scroll',f,{passive:true});f()}
  var bt=d.querySelector('.burger'),nv=d.getElementById('nav');
  if(bt&&nv){bt.setAttribute('aria-expanded','false');bt.addEventListener('click',function(){var o=nv.classList.toggle('open');bt.setAttribute('aria-expanded',o)})}
  if(reduce)return;
  var sel='.sec-head,.intro>*,.svc,.mk,.how>div,.pcard,.logos>div,.stats .grid>div,.prose>*,.split>*,.kv,.tablewrap,.cgrid>div,.cta-band .wrap>*';
  var els=[].slice.call(d.querySelectorAll(sel));
  els.forEach(function(el){var i=[].indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',Math.min(i,6)*60+'ms');el.classList.add('rv')});
  var pending=els.slice(),tick=false;
  function check(){tick=false;var lim=innerHeight*.94;
    pending=pending.filter(function(el){if(el.getBoundingClientRect().top<lim){el.classList.add('in');setTimeout(function(){el.classList.remove('rv','in');el.style.removeProperty('--d')},900);return false}return true});
    if(!pending.length){removeEventListener('scroll',on);removeEventListener('resize',on)}}
  function on(){if(!tick){tick=true;requestAnimationFrame(check)}}
  addEventListener('scroll',on,{passive:true});addEventListener('resize',on);check();
})();
