/* Reviews page: shows published reviews and sends new ones by email for approval. */
(function(){
  var d=document,list=d.getElementById('review-list'),form=d.getElementById('review-form');
  var data=(window.GV_REVIEWS||[]).filter(function(r){return r&&r.text&&r.name});
  function el(tag,cls,txt){var e=d.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e}
  if(list){
    if(!data.length){
      var empty=el('div','pr-empty');
      empty.appendChild(el('h3','', 'No reviews published yet'));
      empty.appendChild(el('p','', 'Reviews from our clients and partners appear here once they have been checked and approved. If you have worked with Green Vision, you are welcome to be the first.'));
      var a=el('a','pr-btn','Write a review');a.href='#review-form';empty.appendChild(a);list.appendChild(empty);
    }else data.forEach(function(r){
      var c=el('article','pr-card'),n=Math.max(0,Math.min(5,Math.round(+r.rating||0)));
      var s=el('div','pr-stars',new Array(n+1).join('★')+new Array(6-n).join('☆'));s.setAttribute('role','img');s.setAttribute('aria-label',n+' out of 5');
      c.appendChild(s);c.appendChild(el('p','pr-text',r.text));
      var who=el('div','pr-who');who.appendChild(el('b','',r.name));
      var meta=[r.role,r.company].filter(Boolean).join(', ');if(meta)who.appendChild(el('span','',meta));
      var sub=[r.project,r.date].filter(Boolean).join(' · ');if(sub)who.appendChild(el('span','pr-sub',sub));
      c.appendChild(who);list.appendChild(c);
    });
  }
  if(!form)return;
  var sel=form.elements.subject,want=new URLSearchParams(location.search).get('partner');
  if(want&&sel){var found=false;[].forEach.call(sel.options,function(o){if(o.value===want){o.selected=true;found=true}});
    if(!found){var o=d.createElement('option');o.value=o.textContent=want;o.selected=true;sel.insertBefore(o,sel.options[1]||null)}}
  form.addEventListener('submit',function(e){
    e.preventDefault();
    var f=form.elements,rating=(form.querySelector('input[name=rating]:checked')||{}).value;
    var st=form.querySelector('.fstatus');
    if(!st){st=el('div','fstatus');st.setAttribute('role','status');st.style.cssText='font-size:14px;line-height:22px;padding:14px 16px;border:1px solid currentColor;border-radius:10px';form.appendChild(st)}
    st.innerHTML='';
    if(!rating){st.textContent='Please choose a rating from 1 to 5 stars.';return}
    var subj='Review of Green Vision from '+f.name.value.trim();
    var body='Reviewer: '+f.name.value.trim()+'\nRole and company: '+f.role.value.trim()+'\nAbout: '+f.subject.value+'\nRating: '+rating+' out of 5\nPermission to publish name and review: '+(f.consent.checked?'Yes':'No')+'\n\n'+f.text.value.trim();
    var p=el('p','', 'Your email app should open with the review ready to send. If nothing opens, copy it and send it to info@greenvision.ae. Reviews are checked by our team before they are published.');
    var b=el('button','', 'Copy review');b.type='button';
    b.style.cssText='margin-top:10px;padding:8px 14px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font:inherit;cursor:pointer';
    b.addEventListener('click',function(){var txt='To: info@greenvision.ae\nSubject: '+subj+'\n\n'+body;
      function fb(){var t=d.createElement('textarea');t.value=txt;d.body.appendChild(t);t.select();try{d.execCommand('copy');b.textContent='Copied'}catch(x){b.textContent='Select and copy by hand'}t.remove()}
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(function(){b.textContent='Copied'},fb);else fb()});
    st.appendChild(p);st.appendChild(b);
    location.href='mailto:info@greenvision.ae?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  });
})();
