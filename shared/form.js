/* Contact form: opens the visitor's email app with the message filled in,
   and always shows a visible confirmation plus a copy fallback. */
(function(){
  document.querySelectorAll('form.cform').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var el=f.elements,n=el.name.value.trim(),m=el.email.value.trim(),t=el.message.value.trim();
      var subj='Website enquiry from '+n,body=t+'\n\n'+n+' / '+m;
      var url='mailto:info@greenvision.ae?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
      var st=f.querySelector('.fstatus');
      if(!st){st=document.createElement('div');st.className='fstatus';st.setAttribute('role','status');
        st.style.cssText='font-size:14px;line-height:22px;padding:14px 16px;border:1px solid currentColor;border-radius:10px';f.appendChild(st)}
      st.innerHTML='';
      var p=document.createElement('p');
      p.textContent='Your email app should open with the message ready. If nothing opens, copy the message and send it to info@greenvision.ae.';
      var b=document.createElement('button');b.type='button';b.textContent='Copy message';
      b.style.cssText='margin-top:10px;padding:8px 14px;border-radius:8px;border:1px solid currentColor;background:transparent;color:inherit;font:inherit;cursor:pointer';
      b.addEventListener('click',function(){
        var txt='To: info@greenvision.ae\nSubject: '+subj+'\n\n'+body;
        function fallback(){var ta=document.createElement('textarea');ta.value=txt;document.body.appendChild(ta);ta.select();
          try{document.execCommand('copy');b.textContent='Copied'}catch(x){b.textContent='Select and copy by hand'}ta.remove()}
        if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(txt).then(function(){b.textContent='Copied'},fallback)}else fallback();
      });
      st.appendChild(p);st.appendChild(b);
      location.href=url;
    });
  });
})();
