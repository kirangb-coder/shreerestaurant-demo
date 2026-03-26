// ── Navbar scroll ──
  const navbar = document.getElementById('navbar');
  function updateNavbar(){if(window.innerWidth<992||window.scrollY>60)navbar.classList.add('scrolled');else navbar.classList.remove('scrolled')}
  window.addEventListener('scroll',updateNavbar);window.addEventListener('resize',updateNavbar);updateNavbar();

  // ── Close mobile nav on link click ──
  document.querySelectorAll('.nav-link-item,.nav-cta').forEach(link=>{
    link.addEventListener('click',()=>{
      const bsC=bootstrap.Collapse.getInstance(document.getElementById('navMenu'));
      if(bsC)bsC.hide();
    });
  });

  // ── Mini menu tabs ──
  document.querySelectorAll('.menu-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.menu-tab').forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const cat=tab.dataset.cat;
      document.querySelectorAll('.menu-card').forEach(card=>{
        if(card.dataset.cat===cat){
          card.classList.add('active');
          card.style.animation='none';
          requestAnimationFrame(()=>{card.style.animation='fadeUp .5s ease forwards'});
        } else card.classList.remove('active');
      });
    });
  });

  // ── Gallery lightbox ──
  const lightbox=document.getElementById('lightbox'),lbImg=document.getElementById('lbImg');
  document.querySelectorAll('.g-item img').forEach(img=>{
    img.addEventListener('click',()=>{lbImg.src=img.src;lightbox.classList.add('open');document.body.style.overflow='hidden'});
  });
  document.getElementById('lbClose').addEventListener('click',closeLb);
  lightbox.addEventListener('click',e=>{if(e.target===lightbox)closeLb()});
  function closeLb(){lightbox.classList.remove('open');if(!document.getElementById('fullMenuModal').classList.contains('open'))document.body.style.overflow=''}
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeLb();closeFullMenu()}});

  // ── Reveal on scroll ──
  const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}})},{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  // ── Active nav highlight ──
  const sections=document.querySelectorAll('section[id]');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY+120;
    sections.forEach(sec=>{
      if(y>=sec.offsetTop&&y<sec.offsetTop+sec.offsetHeight){
        document.querySelectorAll('.nav-link-item').forEach(a=>{
          a.style.color='';
          if(a.getAttribute('href')==='#'+sec.id)a.style.color='var(--gold)';
        });
      }
    });
  });

  // ════════════════════════════════════════
  // FULL MENU MODAL
  // ════════════════════════════════════════
  const fmmModal   = document.getElementById('fullMenuModal');
  const fmmPanel   = document.getElementById('fmmPanel');
  const fmmClose   = document.getElementById('fmmClose');
  const fmmBackdrop= document.getElementById('fmmBackdrop');

  function openFullMenu(tab) {
    fmmModal.classList.add('open');
    document.body.style.overflow = 'hidden';
    fmmPanel.scrollTop = 0;
    // Optionally switch to a specific tab
    if (tab) switchFmmTab(tab);
    // Close mobile nav if open
    const bsC = bootstrap.Collapse.getInstance(document.getElementById('navMenu'));
    if (bsC) bsC.hide();
  }

  function closeFullMenu() {
    fmmModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  fmmClose.addEventListener('click', closeFullMenu);
  fmmBackdrop.addEventListener('click', closeFullMenu);

  // ── Full Menu tab switching ──
  function switchFmmTab(tabId) {
    document.querySelectorAll('.fmm-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.fmm-cat-section').forEach(s => s.classList.remove('active'));
    const btn = document.querySelector(`.fmm-tab-btn[data-fmm-tab="${tabId}"]`);
    const sec = document.getElementById('fmm-' + tabId);
    if (btn) btn.classList.add('active');
    if (sec) sec.classList.add('active');
  }

  document.querySelectorAll('.fmm-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      switchFmmTab(btn.dataset.fmmTab);
      // On mobile, scroll content into view
      if (window.innerWidth < 768) {
        document.querySelector('.fmm-body').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });