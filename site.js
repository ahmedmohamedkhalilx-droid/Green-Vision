(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
document.documentElement.classList.add('js');
/* menu */
var b=$('.burger'),n=$('#nav');if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
/* header, progress, back to top */
var hdr=$('.p4-hdr'),prog=$('.prog'),tt=$('.totop');
function onScroll(){var y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;
 if(hdr)hdr.classList.toggle('scrolled',y>40);if(prog)prog.style.transform='scaleX('+(h>0?y/h:0)+')';if(tt)tt.classList.toggle('on',y>800)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
if(tt)tt.addEventListener('click',function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
/* reveal */
var rvs=$$('.rv');if(!rvs.length)$$('main .container > *').forEach(function(e){e.classList.add('rv');rvs.push(e)});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1});
rvs.forEach(function(e){io.observe(e)});
/* hero slider with swipe */
var hero=$('.hero');
if(hero){var slides=$$('.slide',hero),dots=$$('.dots button',hero),cur=0,timer,DUR=6000;
 hero.style.setProperty('--dur',DUR/1000+'s');
 function go(i){cur=(i+slides.length)%slides.length;slides.forEach(function(s,k){s.classList.toggle('on',k===cur)});
  dots.forEach(function(d,k){d.setAttribute('aria-selected',k===cur);var f=d.firstChild;f.style.transition='none';f.style.transform='scaleX(0)';void f.offsetWidth;f.style.transition='';f.style.transform=''});
  clearTimeout(timer);if(!reduce&&!hero.matches(':hover,:focus-within'))timer=setTimeout(function(){go(cur+1)},DUR)}
 dots.forEach(function(d,k){d.addEventListener('click',function(){go(k)})});
 $('.prev',hero).addEventListener('click',function(){go(cur-1)});$('.next',hero).addEventListener('click',function(){go(cur+1)});
 hero.addEventListener('mouseenter',function(){clearTimeout(timer)});hero.addEventListener('mouseleave',function(){go(cur)});
 var sx=null,sy=0;
 hero.addEventListener('pointerdown',function(e){if(e.target.closest('a,button'))return;sx=e.clientX;sy=e.clientY});
 addEventListener('pointerup',function(e){if(sx===null)return;var dx=e.clientX-sx,dy=e.clientY-sy;sx=null;if(Math.abs(dx)>50&&Math.abs(dx)>Math.abs(dy)*1.5)go(cur+(dx<0?1:-1))});
 hero.setAttribute('tabindex','0');hero.addEventListener('keydown',function(e){if(e.key==='ArrowRight')go(cur+1);if(e.key==='ArrowLeft')go(cur-1)});
 go(0)}
/* count up */
$$('[data-count]').forEach(function(el){var to=+el.dataset.count,from=+(el.dataset.from||0),suf=el.dataset.suf||'';
 el.textContent=to+suf;
 new IntersectionObserver(function(es,o){if(!es[0].isIntersecting)return;o.disconnect();if(reduce)return;var t0=performance.now();
  (function f(t){var p=Math.min((t-t0)/1200,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(from+(to-from)*e)+suf;if(p<1)requestAnimationFrame(f)})(t0)},{threshold:.6}).observe(el)});
/* tabs (services, about) */
function tabs(root){var ts=$$('[role=tab]',root),ps=$$('[role=tabpanel]',root);
 function sel(i,focus){ts.forEach(function(t,k){t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1});
  ps.forEach(function(p,k){var on=k===i;p.hidden=!on;if(on){p.classList.remove('swap');void p.offsetWidth;p.classList.add('swap')}});if(focus)ts[i].focus()}
 ts.forEach(function(t,k){t.addEventListener('click',function(){sel(k)});
  t.addEventListener('keydown',function(e){var d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(d){e.preventDefault();sel((k+d+ts.length)%ts.length,true)}})});
 /* swipe on the panel switches tab */
 var x0=null;root.addEventListener('pointerdown',function(e){x0=e.clientX});
 root.addEventListener('pointerup',function(e){if(x0===null)return;var dx=e.clientX-x0;x0=null;if(Math.abs(dx)>70&&e.pointerType==='touch'){var c=ts.findIndex(function(t){return t.getAttribute('aria-selected')==='true'});sel((c+(dx<0?1:-1)+ts.length)%ts.length)}});
 sel(0)}
$$('[data-tabs]').forEach(tabs);
/* areas accordion */
var areas=$$('.area');areas.forEach(function(a){function on(){areas.forEach(function(x){x.classList.toggle('on',x===a)})}
 a.addEventListener('mouseenter',on);a.addEventListener('focus',on);a.addEventListener('click',on)});
/* project rail: drag, arrows */
var rail=$('.rail');
if(rail){var pv=$('.rprev'),nx=$('.rnext');
 function step(){var c=rail.firstElementChild;return c?c.getBoundingClientRect().width+24:300}
 function upd(){pv.disabled=rail.scrollLeft<4;nx.disabled=rail.scrollLeft>rail.scrollWidth-rail.clientWidth-4}
 pv.addEventListener('click',function(){rail.scrollBy({left:-step(),behavior:'smooth'})});nx.addEventListener('click',function(){rail.scrollBy({left:step(),behavior:'smooth'})});
 rail.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
 var down=false,sx0=0,sl=0,moved=false;
 rail.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx0=e.clientX;sl=rail.scrollLeft});
 addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx0;if(Math.abs(dx)>4){moved=true;rail.classList.add('drag')}rail.scrollLeft=sl-dx});
 addEventListener('pointerup',function(){if(!down)return;down=false;rail.classList.remove('drag')});
 rail.addEventListener('click',function(e){if(moved){e.preventDefault();moved=false}},true)}
})();
