/* Careers page: opens the visitor's email app with the application filled in and shows a copy fallback. */
(function(){
  var f=document.getElementById('cv-form');if(!f)return;
  f.addEventListener('submit',function(ev){
    ev.preventDefault();var el=f.elements;
    var subj='Application: '+el.role.value+' - '+el.name.value.trim();
    var body='Name: '+el.name.value.trim()+'\nEmail: '+el.email.value.trim()+'\nPhone: '+el.phone.value.trim()+'\nRole: '+el.role.value+'\nYears of experience: '+el.exp.value.trim()+'\n\n'+el.message.value.trim()+'\n\n(Please attach your CV to this email.)';
    var st=f.querySelector('.fstatus');
    if(!st){st=document.createElement('div');st.className='fstatus';st.setAttribute('role','status');st.style.cssText='font-size:14px;line-height:22px;padding:14px 16px;border:1px solid currentColor;border-radius:10px';f.appendChild(st)}
    st.innerHTML='';
    var p=document.createElement('p');p.textContent='Your email app should open with your details ready. Attach your CV and send it. If nothing opens, copy the text and email it with your CV to info@greenvision.ae.';
    var b=document.createElement('button');b.type='button';b.textContent='Copy application text';
    b.style.cssText='margin-top:10px;padding:8px 14px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font:inherit;cursor:pointer';
    b.addEventListener('click',function(){var txt='To: info@greenvision.ae\nSubject: '+subj+'\n\n'+body;
      function fb(){var t=document.createElement('textarea');t.value=txt;document.body.appendChild(t);t.select();try{document.execCommand('copy');b.textContent='Copied'}catch(x){b.textContent='Select and copy by hand'}t.remove()}
      if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(txt).then(function(){b.textContent='Copied'},fb);else fb()});
    st.appendChild(p);st.appendChild(b);
    location.href='mailto:info@greenvision.ae?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  });
})();
