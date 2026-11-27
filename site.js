(function(){
var $=function(s,r){return(r||document).querySelector(s)},$$=function(s,r){return[].slice.call((r||document).querySelectorAll(s))};
var reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
var b=$('.burger'),n=$('#nav');if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)});
$$('.p4-nav a[href="#"]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault()})});
var hdr=$('.p4-hdr'),prog=$('.prog'),tt=$('.totop');
function onScroll(){var y=window.scrollY,h=document.documentElement.scrollHeight-innerHeight;
 if(hdr)hdr.classList.toggle('scrolled',y>40);if(prog)prog.style.transform='scaleX('+(h>0?y/h:0)+')';if(tt)tt.classList.toggle('on',y>800)}
addEventListener('scroll',onScroll,{passive:true});onScroll();
if(tt)tt.addEventListener('click',function(){scrollTo({top:0,behavior:reduce?'auto':'smooth'})});
var rv=$$('.rv');if(!rv.length)$$('main .content-block,main .certificates-list > *,main .news-block,main .vision-block').forEach(function(e){e.classList.add('rv');rv.push(e)});
var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.1});
rv.forEach(function(e){io.observe(e)});
/* drag rails: logos and product galleries */
function rail(el,pv,nx){
 function step(){var c=el.firstElementChild;return c?c.getBoundingClientRect().width+16:300}
 function upd(){if(pv)pv.disabled=el.scrollLeft<4;if(nx)nx.disabled=el.scrollLeft>el.scrollWidth-el.clientWidth-4}
 if(pv)pv.addEventListener('click',function(){el.scrollBy({left:-step(),behavior:'smooth'})});if(nx)nx.addEventListener('click',function(){el.scrollBy({left:step(),behavior:'smooth'})});
 el.addEventListener('scroll',upd,{passive:true});addEventListener('resize',upd);upd();
 var down=false,sx=0,sl=0,moved=false;
 el.addEventListener('pointerdown',function(e){if(e.pointerType!=='mouse')return;down=true;moved=false;sx=e.clientX;sl=el.scrollLeft});
 addEventListener('pointermove',function(e){if(!down)return;var dx=e.clientX-sx;if(Math.abs(dx)>4){moved=true;el.classList.add('drag')}el.scrollLeft=sl-dx});
 addEventListener('pointerup',function(){if(!down)return;down=false;el.classList.remove('drag')});
 el.addEventListener('click',function(e){if(moved){e.preventDefault();moved=false}},true)}
$$('.railwrap').forEach(function(w){rail($('.rail',w),$('.rprev',w),$('.rnext',w))});
$$('.brand-prod-slider').forEach(function(el){rail(el)});
/* product tabs and read more */
$$('.sub_prod').forEach(function(t){t.addEventListener('click',function(e){e.preventDefault();
 $$('.sub_prod').forEach(function(x){x.classList.toggle('active',x===t)});
 var id=t.getAttribute('data-id');$$('.sub_prod_desc').forEach(function(p){p.classList.toggle('active',p.id===id)})})});
$$('.sub_prod_desc').forEach(function(p){var a=$('.read_more_sub',p);if(!a)return;
 a.addEventListener('click',function(e){e.preventDefault();var o=p.classList.toggle('expanded');a.textContent=o?'Read less':'Read more'})});
/* contact form: opens the visitor's email app, with a visible confirmation */
var f=$('#contact-form'),btn=$('#send');
if(f&&btn){btn.addEventListener('click',function(){
 var el=f.elements,nm=el.name.value.trim(),em=el.email.value.trim(),ph=el.phone.value.trim(),ms=el.message.value.trim(),st=$('.fstatus',f);
 if(!st){st=document.createElement('div');st.className='fstatus';st.setAttribute('role','status');f.appendChild(st)}
 if(!nm||!em||!ph||!ms){st.textContent='Please fill in your name, email, phone number and message.';return}
 location.href='mailto:info@porteclink.ae?subject='+encodeURIComponent('Website enquiry from '+nm)+'&body='+encodeURIComponent(ms+'\n\n'+nm+' / '+em+' / '+ph);
 st.textContent='Your email app should open with the message ready. If nothing opens, send it to info@porteclink.ae.'})}
})();
