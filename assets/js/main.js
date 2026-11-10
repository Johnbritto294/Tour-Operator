const IMG=id=>`assets/img/${id}.webp`;
const user=()=>{try{return JSON.parse(localStorage.getItem('stackly_user'))}catch(e){return null}};
const page=location.pathname.split('/').pop().replace('.html','')||'index';
const pages=[['index','Home'],['about','About'],['features','Features'],['blog','Blog'],['contact','Contact']];
function buildNav(){
  const nav=document.getElementById('nav');if(!nav)return;
  const auth=`<a href="login.html" class="btn btn-ghost btn-sm ms-lg-2 mt-2 mt-lg-0">Log in</a><a href="register.html" class="btn btn-sun btn-sm ms-lg-2 mt-2 mt-lg-0">Register</a>`;
  nav.innerHTML=`<nav class="navbar navbar-expand-lg site-nav"><div class="container">
  <a class="brand" href="index.html"><img src="logo_matching_light.webp" alt="Stackly" class="brand-logo"></a>
  <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#m" aria-controls="m" aria-expanded="false" aria-label="Toggle menu"><i class="bi bi-list"></i></button>
  <div class="collapse navbar-collapse" id="m">
    <ul class="navbar-nav mx-auto align-items-lg-center">
    ${pages.map(p=>`<li class="nav-item"><a class="nav-link ${p[0]==page?'active':''}" href="${p[0]}.html">${p[1]}</a></li>`).join('')}
    </ul>
    <div class="nav-auth-wrap d-flex flex-wrap align-items-lg-center">${auth}</div>
    <div class="nav-mobile-footer d-lg-none">
      <p class="mb-1 text-white-50"><i class="bi bi-compass text-warning me-2"></i>Small-group tours &middot; 48 countries</p>
      <small class="text-white-50">&copy; 2026 Stackly Tours</small>
    </div>
  </div></div></nav>`;
  const n=document.querySelector('.site-nav');const t=()=>n.classList.toggle('scrolled',scrollY>40);t();addEventListener('scroll',t,{passive:true});
  const m=document.getElementById('m');
  const toggler=nav.querySelector('.navbar-toggler');
  const icon=toggler?toggler.querySelector('i'):null;
  if(m){
    m.addEventListener('show.bs.collapse',()=>{
      document.body.classList.add('nav-open');
      document.documentElement.classList.add('nav-open');
      if(n)n.classList.add('menu-open');
      if(icon){icon.classList.remove('bi-list');icon.classList.add('bi-x-lg')}
    });
    m.addEventListener('hidden.bs.collapse',()=>{
      document.body.classList.remove('nav-open');
      document.documentElement.classList.remove('nav-open');
      if(n)n.classList.remove('menu-open');
      if(icon){icon.classList.remove('bi-x-lg');icon.classList.add('bi-list')}
    });
    m.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>{
        if(innerWidth<992&&m.classList.contains('show')){
          const c=bootstrap.Collapse.getInstance(m);
          if(c)c.hide();
        }
      });
    });
  }
  window.addEventListener('resize',()=>{
    if(innerWidth>=992&&document.body.classList.contains('nav-open')){
      document.body.classList.remove('nav-open');
      document.documentElement.classList.remove('nav-open');
      if(n)n.classList.remove('menu-open');
      if(icon){icon.classList.remove('bi-x-lg');icon.classList.add('bi-list')}
      if(m){
        const c=bootstrap.Collapse.getInstance(m);
        if(c)c.hide();
      }
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&m&&m.classList.contains('show')){
      const c=bootstrap.Collapse.getInstance(m);
      if(c)c.hide();
    }
  });
}
function buildFoot(){
  const f=document.getElementById('foot');if(!f)return;
  f.innerHTML=`<footer class="foot"><div class="container"><div class="row g-5">
  <div class="col-lg-4"><a class="brand d-inline-block mb-3" href="index.html" aria-label="Stackly Home"><img src="logo_matching_light.webp" alt="Stackly" class="brand-logo"></a><p>Small-group journeys, local guides and trips planned end to end, so you only have to show up.</p>
  <div class="soc"><a href="404.html" aria-label="Instagram"><i class="bi bi-instagram"></i></a><a href="404.html" aria-label="Facebook"><i class="bi bi-facebook"></i></a><a href="404.html" aria-label="X"><i class="bi bi-twitter-x"></i></a><a href="404.html" aria-label="YouTube"><i class="bi bi-youtube"></i></a></div></div>
  <div class="col-6 col-lg-2"><h5>Explore</h5>${pages.map(p=>`<a href="${p[0]}.html">${p[1]}</a>`).join('')}</div>
  <div class="col-6 col-lg-2"><h5>Trip ideas</h5><a href="404.html">Beach escapes</a><a href="404.html">Mountain trails</a><a href="404.html">City culture</a><a href="404.html">Wildlife safaris</a><a href="404.html">Travel guides</a></div>
  <div class="col-lg-4"><h5>Get trip ideas monthly</h5><form class="d-flex gap-2 news"><input class="form-control" type="email" required pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$" title="Email must end with .com (e.g. you@email.com)" placeholder="you@email.com" aria-label="Email"><button class="btn btn-sun">Subscribe</button></form><small class="d-block mt-2 news-msg"></small></div>
  </div><hr class="my-4 border-secondary"><small>&copy; 2026 Stackly Tours. All rights reserved.</small></div></footer>`;
  f.querySelector('.news').onsubmit=e=>{
    e.preventDefault();
    const input=e.target.querySelector('input[type="email"]');
    const val=(input?input.value:'').trim();
    const msgEl=f.querySelector('.news-msg');
    if(!/^[^\s@]+@[^\s@]+\.com$/i.test(val)){
      msgEl.className='d-block mt-2 news-msg text-danger fw-semibold';
      msgEl.textContent='Email must end with .com to subscribe (e.g. you@email.com).';
      if(input)input.focus();
      return;
    }
    go404(e);
  };
}
const go404=e=>{if(e)e.preventDefault();sessionStorage.setItem('stackly_prev_url',location.href);sessionStorage.setItem('stackly_prev_scroll',String(window.scrollY));location.href='404.html'};
document.addEventListener('click',e=>{const a=e.target.closest('a[href="404.html"]');if(a)go404(e)});
document.querySelectorAll('[data-img]').forEach(i=>{i.src=IMG(i.dataset.img,+i.dataset.w||900);i.loading=i.classList.contains('eager')?'eager':'lazy'});
buildNav();buildFoot();
const heroSearch=document.getElementById('hero-search-form');
if(heroSearch){
  const dep=document.getElementById('hero-dep');
  if(dep)dep.min=new Date().toISOString().split('T')[0];
  heroSearch.addEventListener('submit',e=>{
    e.preventDefault();
    if(heroSearch.checkValidity()){
      go404(e);
    }else{
      heroSearch.reportValidity();
    }
  });
}
if(page=='login'){
  const regEmail = sessionStorage.getItem('stackly_reg_email');
  if(regEmail){
    sessionStorage.removeItem('stackly_reg_email');
    const f = document.querySelector('form[data-form="login"]');
    if(f){
      const emInput = f.querySelector('input[name="email"]');
      if(emInput) emInput.value = regEmail;
      const regRole = sessionStorage.getItem('stackly_reg_role');
      if(regRole){
        sessionStorage.removeItem('stackly_reg_role');
        const roleRadio = f.querySelector(`input[name="role"][value="${regRole}"]`);
        if(roleRadio) roleRadio.checked = true;
      }
      msg(f, 'Account created successfully! Please log in.', true);
    }
  }
}
if(page=='dashboard'){
  const u=user();if(!u)location.replace('login.html');
  else{
    const r=u.role==='admin'?'admin':'user';
    document.body.classList.toggle('role-admin',r==='admin');
    document.querySelectorAll('.uname').forEach(e=>e.textContent=u.name);
    document.querySelectorAll('.uemail').forEach(e=>e.textContent=u.email||'');
    document.querySelectorAll('.role-badge').forEach(e=>e.textContent=r==='admin'?'Admin':'User');
    document.querySelectorAll('[data-role-view]').forEach(e=>e.classList.toggle('d-none',e.dataset.roleView!==r));
    const showUserTab=(t,sc=true)=>{
      document.querySelectorAll('[data-user-tab]').forEach(a=>a.classList.toggle('on',a.dataset.userTab===t));
      document.querySelectorAll('[data-user-pane]').forEach(p=>p.classList.toggle('d-none',p.dataset.userPane!==t));
      sessionStorage.setItem('stackly_user_tab',t);
      history.replaceState(null,'','#'+t);
      if(sc)window.scrollTo({top:0,behavior:'smooth'});
    };
    document.querySelectorAll('[data-user-tab]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showUserTab(a.dataset.userTab)}));
    document.querySelectorAll('.dash-main [data-role-view="user"] .btn').forEach(b=>{b.style.cursor='pointer';b.addEventListener('click',go404)});
    const showAdminTab=(t,sc=true)=>{
      document.querySelectorAll('[data-admin-tab]').forEach(a=>a.classList.toggle('on',a.dataset.adminTab===t));
      document.querySelectorAll('[data-admin-pane]').forEach(p=>p.classList.toggle('d-none',p.dataset.adminPane!==t));
      sessionStorage.setItem('stackly_admin_tab',t);
      history.replaceState(null,'','#'+t);
      if(sc)window.scrollTo({top:0,behavior:'smooth'});
    };
    document.querySelectorAll('[data-admin-tab]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();showAdminTab(a.dataset.adminTab)}));
    document.querySelectorAll('.dash-main [data-role-view="admin"] .btn, .dash-main [data-role-view="admin"] .admin-act, .dash-main [data-role-view="admin"] .admin-pill').forEach(b=>{b.style.cursor='pointer';b.addEventListener('click',go404)});
    const hTab=location.hash.replace('#','');
    if(r==='admin'){
      const t=hTab||sessionStorage.getItem('stackly_admin_tab')||'overview';
      if(document.querySelector(`[data-admin-pane="${t}"]`))showAdminTab(t,false);
    }else{
      const t=hTab||sessionStorage.getItem('stackly_user_tab')||'overview';
      if(document.querySelector(`[data-user-pane="${t}"]`))showUserTab(t,false);
    }
    const lo=document.getElementById('logout-btn');if(lo)lo.onclick=e=>{e.preventDefault();localStorage.removeItem('stackly_user');sessionStorage.removeItem('stackly_admin_tab');sessionStorage.removeItem('stackly_user_tab');location.href='login.html'};
    const dashToggler=document.querySelector('.dash-toggler');
    const dashSide=document.getElementById('dashSidebar');
    const dashBackdrop=document.getElementById('dashBackdrop');
    const dashCloseBtn=document.querySelector('.dash-close-btn');
    const openDashMenu=()=>{
      document.body.classList.add('nav-open');
      document.documentElement.classList.add('nav-open');
      if(dashSide)dashSide.classList.add('show');
      if(dashBackdrop)dashBackdrop.classList.add('show');
    };
    const closeDashMenu=()=>{
      document.body.classList.remove('nav-open');
      document.documentElement.classList.remove('nav-open');
      if(dashSide)dashSide.classList.remove('show');
      if(dashBackdrop)dashBackdrop.classList.remove('show');
    };
    if(dashToggler)dashToggler.addEventListener('click',openDashMenu);
    if(dashCloseBtn)dashCloseBtn.addEventListener('click',closeDashMenu);
    if(dashBackdrop)dashBackdrop.addEventListener('click',closeDashMenu);
    if(dashSide){
      dashSide.querySelectorAll('a').forEach(a=>{
        a.addEventListener('click',()=>{
          if(window.innerWidth<992)closeDashMenu();
        });
      });
    }
    window.addEventListener('resize',()=>{
      if(window.innerWidth>=992)closeDashMenu();
    });
    document.addEventListener('keydown',e=>{
      if(e.key==='Escape')closeDashMenu();
    });
  }
}
window.addEventListener('pageshow',()=>{
  if(sessionStorage.getItem('stackly_returning')==='1'){
    sessionStorage.removeItem('stackly_returning');
    const y=+(sessionStorage.getItem('stackly_prev_scroll')||0);
    setTimeout(()=>window.scrollTo({top:y,behavior:'instant'}),20);
  }
});
/* animations */
gsap.registerPlugin(ScrollTrigger);
const mm=gsap.matchMedia();
mm.add('(prefers-reduced-motion: no-preference)',()=>{
  const h=document.querySelector('.hero');
  if(h){
    const tl=gsap.timeline({defaults:{ease:'power4.out'}});
    tl.from('.hero-img',{clipPath:'inset(10% 8% 10% 8% round 36px)',duration:1.6,ease:'expo.out'})
      .from('.hero-img img',{scale:1.3,duration:2},0)
      .from('.hero h1 span b',{yPercent:110,duration:1.1,stagger:.15},.5)
      .from('.hero .hero-fade',{y:24,opacity:0,duration:.7,stagger:.07,clearProps:'transform,opacity'},.7)
      .from('.site-nav',{y:-80,opacity:0,duration:.9,clearProps:'transform,opacity'},.6);
    gsap.to('.hero-img img',{yPercent:-10,ease:'none',scrollTrigger:{trigger:h,start:'top top',end:'bottom top',scrub:true}});
  }
  gsap.utils.toArray('[data-stagger]').forEach(g=>gsap.from(g.children,{y:60,opacity:0,duration:.9,stagger:.12,ease:'power3.out',scrollTrigger:{trigger:g,start:'top 85%'}}));
  gsap.utils.toArray('[data-reveal]').forEach(e=>gsap.from(e,{y:40,opacity:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 88%'}}));
  gsap.utils.toArray('.parallax img').forEach(i=>gsap.to(i,{yPercent:-14,ease:'none',scrollTrigger:{trigger:i.parentElement,scrub:true}}));
  gsap.utils.toArray('[data-count]').forEach(c=>{const o={v:0},end=+c.dataset.count,s=c.dataset.suffix||'';gsap.to(o,{v:end,duration:2,ease:'power2.out',scrollTrigger:{trigger:c,start:'top 90%',once:true},onUpdate:()=>c.textContent=Math.round(o.v).toLocaleString()+s})});
  gsap.utils.toArray('.bars div').forEach((b,i)=>gsap.from(b,{scaleY:0,duration:1,delay:i*.07,ease:'back.out(1.4)',scrollTrigger:{trigger:b,start:'top 95%'}}));
  gsap.from('.auth-form form > *',{y:24,opacity:0,stagger:.08,duration:.7,delay:.2});
  gsap.from('.dash-main .kpi',{y:30,opacity:0,stagger:.1,duration:.7,delay:.2});
  mm.add('(min-width: 992px)',()=>{const t=document.querySelector('.h-track');if(!t)return;
    gsap.to(t,{x:()=>-(t.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.h-wrap',start:'top top',end:()=>'+='+(t.scrollWidth-innerWidth),pin:true,scrub:1,invalidateOnRefresh:true}})});
});
/* forms & name validation */
const isNameField = el => {
  if (!el || el.tagName !== 'INPUT') return false;
  const id = (el.id || '').toLowerCase();
  const name = (el.name || '').toLowerCase();
  const auto = (el.autocomplete || '').toLowerCase();
  const ph = (el.placeholder || '').toLowerCase();
  return id === 'name' || id === 'n' || name === 'name' || name === 'fullname' || auto === 'name' || ph.includes('name');
};

document.addEventListener('keydown', e => {
  if (!isNameField(e.target)) return;
  if (/^[0-9]$/.test(e.key)) {
    e.preventDefault();
  }
}, true);

document.addEventListener('input', e => {
  const input = e.target;
  if (!isNameField(input)) return;
  const val = input.value;
  const clean = val.replace(/[0-9]/g, '');
  if (val !== clean) {
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const diff = val.length - clean.length;
    input.value = clean;
    if (start !== null) {
      input.setSelectionRange(Math.max(0, start - diff), Math.max(0, end - diff));
    }
  }
}, true);

document.addEventListener('paste', e => {
  const input = e.target;
  if (!isNameField(input)) return;
  const pasted = (e.clipboardData || window.clipboardData)?.getData('text') || '';
  if (/[0-9]/.test(pasted)) {
    e.preventDefault();
    const clean = pasted.replace(/[0-9]/g, '');
    document.execCommand('insertText', false, clean);
  }
});

/* email fields: must end with .com */
const isValidComEmail = em => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/i.test((em || '').trim());

document.addEventListener('blur', e => {
  const input = e.target;
  if (input && input.tagName === 'INPUT' && input.type === 'email') {
    const val = input.value.trim();
    if (val && !isValidComEmail(val)) {
      input.setCustomValidity('Email address must end with .com (e.g. name@example.com)');
    } else {
      input.setCustomValidity('');
    }
  }
  if (input && input.tagName === 'INPUT' && input.type === 'password') {
    const val = input.value;
    if (val && val.length < 6) {
      input.setCustomValidity('Password must be at least 6 characters.');
    } else {
      input.setCustomValidity('');
    }
  }
}, true);

document.addEventListener('input', e => {
  const input = e.target;
  if (input && input.tagName === 'INPUT') {
    if (input.type === 'email' || input.type === 'password') {
      input.setCustomValidity('');
    }
  }
}, true);

const msg=(f,t,ok=true)=>{let m=f.querySelector('.fm');if(!m){m=document.createElement('div');m.className='fm mt-3 small fw-semibold';f.appendChild(m)}m.className='fm mt-3 small fw-semibold '+(ok?'text-success':'text-danger');m.textContent=t};
document.querySelectorAll('form[data-form]').forEach(f=>f.addEventListener('submit',e=>{
  e.preventDefault();const k=f.dataset.form,d=Object.fromEntries(new FormData(f)),role=d.role||'user';
  if(k=='contact'){
    if(!d.name || !d.name.trim() || /[0-9]/.test(d.name)){
      return msg(f,'Name must contain only alphabetic letters (no numbers).',false);
    }
    if(!isValidComEmail(d.email)){
      return msg(f,'Email must end with .com to proceed (e.g. name@example.com).',false);
    }
    if(!d.message || !d.message.trim()){
      return msg(f,'Please enter your message.',false);
    }
    go404(e);
  }
  if(k=='login'){
    if(!isValidComEmail(d.email)){
      return msg(f,'Email must end with .com to proceed (e.g. name@example.com).',false);
    }
    if(!d.password || d.password.length < 6){
      return msg(f,'Password must be at least 6 characters.',false);
    }
    let uName = d.email.split('@')[0];
    let uRole = role;
    try {
      const users = JSON.parse(localStorage.getItem('stackly_accounts') || '{}');
      const found = users[d.email.trim().toLowerCase()];
      if(found){
        if(found.name) uName = found.name;
        if(found.role) uRole = found.role;
      }
    } catch(err){}
    localStorage.setItem('stackly_user',JSON.stringify({name:uName,email:d.email.trim(),role:uRole}));
    location.href='dashboard.html';
  }
  if(k=='register'){
    if(!d.name || !d.name.trim() || /[0-9]/.test(d.name)){
      return msg(f,'Full name must contain only alphabetic letters (no numbers).',false);
    }
    if(!isValidComEmail(d.email)){
      return msg(f,'Email must end with .com to proceed (e.g. name@example.com).',false);
    }
    if(!d.password || d.password.length < 6){
      return msg(f,'Password must be at least 6 characters.',false);
    }
    if(!d.confirm || d.confirm.length < 6){
      return msg(f,'Confirm password must be at least 6 characters.',false);
    }
    if(d.password!==d.confirm)return msg(f,'Passwords do not match. Re-enter both fields.',false);
    if(!d.terms)return msg(f,'Please agree to the Terms and Privacy Policy to continue.',false);
    try {
      const users = JSON.parse(localStorage.getItem('stackly_accounts') || '{}');
      users[d.email.trim().toLowerCase()] = { name: d.name.trim(), role };
      localStorage.setItem('stackly_accounts', JSON.stringify(users));
    } catch(err){}
    sessionStorage.setItem('stackly_reg_email', d.email.trim());
    sessionStorage.setItem('stackly_reg_role', role);
    location.href='login.html';
  }
}));
