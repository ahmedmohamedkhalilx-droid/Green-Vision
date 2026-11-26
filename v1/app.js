(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var d=document;
  /* header gains a hairline shadow after scrolling */
  var hd=d.querySelector('header.site');
  if(hd){var f=function(){hd.classList.toggle('scrolled',scrollY>8)};addEventListener('scroll',f,{passive:true});f()}
  /* mobile menu */
  var bt=d.querySelector('.burger'),nv=d.getElementById('nav');
  if(bt&&nv){bt.setAttribute('aria-expanded','false');bt.addEventListener('click',function(){var o=nv.classList.toggle('open');bt.setAttribute('aria-expanded',o)})}
  /* scroll reveal, staggered within each parent */
  if(!reduce&&'IntersectionObserver' in window){
    var sel='.sh,.svc-card,.sectors figure,.about>*,.stats>div,.proj,.sheet,.kv,.tablewrap,.prose>section,.contact-grid>div,.detail>div,.svc>div';
    var els=[].slice.call(d.querySelectorAll(sel));
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){var t=e.target;t.classList.add('in');io.unobserve(t);setTimeout(function(){t.classList.remove('rv','in');t.style.removeProperty('--d')},900)}})},{threshold:.12,rootMargin:'0px 0px -6% 0px'});
    els.forEach(function(el){var sib=[].indexOf.call(el.parentNode.children,el);el.style.setProperty('--d',Math.min(sib,5)*60+'ms');el.classList.add('rv');io.observe(el)});
  }
})();
