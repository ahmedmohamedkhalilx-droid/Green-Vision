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
  /* photo viewer: tap to enlarge, arrows or swipe to browse, swipe down or Esc to close */
  var imgs=[].slice.call(d.querySelectorAll('img.zoom'));
  if(!imgs.length)return;
  var lb,im,cur=0,cap;
  function build(){
    lb=d.createElement('div');lb.className='lb';lb.setAttribute('role','dialog');lb.setAttribute('aria-modal','true');lb.setAttribute('aria-label','Photo viewer');
    lb.innerHTML='<button class="lb-x" aria-label="Close">&times;</button><button class="lb-p" aria-label="Previous">&lsaquo;</button><button class="lb-n" aria-label="Next">&rsaquo;</button><figure><img alt=""><figcaption></figcaption></figure>';
    d.body.appendChild(lb);im=lb.querySelector('img');cap=lb.querySelector('figcaption');
    lb.addEventListener('click',function(e){if(e.target===lb||e.target.classList.contains('lb-x'))close();else if(e.target.classList.contains('lb-p'))go(-1);else if(e.target.classList.contains('lb-n'))go(1)});
    var x0,y0,t0;
    lb.addEventListener('touchstart',function(e){var t=e.changedTouches[0];x0=t.clientX;y0=t.clientY;t0=Date.now()},{passive:true});
    lb.addEventListener('touchend',function(e){var t=e.changedTouches[0],dx=t.clientX-x0,dy=t.clientY-y0;
      if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy))go(dx<0?1:-1);else if(dy>80&&Math.abs(dy)>Math.abs(dx))close()},{passive:true});
  }
  function show(i,dir){
    cur=(i+imgs.length)%imgs.length;var s=imgs[cur];
    im.classList.remove('slide-l','slide-r');void im.offsetWidth;
    im.src=s.currentSrc||s.src;im.alt=s.alt||'';
    var c=s.closest('figure');cap.textContent=c&&c.querySelector('figcaption')?c.querySelector('figcaption').textContent:(s.alt||'');
    if(dir&&!reduce)im.classList.add(dir>0?'slide-l':'slide-r');
    lb.classList.toggle('single',imgs.length<2);
  }
  function open(i){if(!lb)build();show(i,0);d.body.classList.add('lb-open');requestAnimationFrame(function(){lb.classList.add('on')});lb.querySelector('.lb-x').focus()}
  function close(){if(!lb)return;lb.classList.remove('on');d.body.classList.remove('lb-open');if(last)last.focus()}
  function go(n){show(cur+n,n)}
  var last;
  imgs.forEach(function(el,i){el.tabIndex=0;el.setAttribute('role','button');el.addEventListener('click',function(){last=el;open(i)});el.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();last=el;open(i)}})});
  addEventListener('keydown',function(e){if(!lb||!lb.classList.contains('on'))return;if(e.key==='Escape')close();else if(e.key==='ArrowRight')go(1);else if(e.key==='ArrowLeft')go(-1)});
})();
