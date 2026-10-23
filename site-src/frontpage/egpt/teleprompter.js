// The jumbotron is one panel. Until the reader presses Read or Teleprompt it carousels its
// slides (the judgment with the original's screen capture, then questions each answered by a
// quotation); hovering holds the carousel, the dots (or the arrow keys on them) pick a slide.
// Each slide carries its own library address (data-href) and dwell (data-dwell): a click on a
// slide opens it, and "Read it in the library" follows the active slide, or the reflection's
// address (the roll's data-href) while it is shown. Read shows the
// reflection in the same panel, scrolled by hand; Teleprompt rolls it up the panel at a steady
// pace, with pause, slower, faster and restart; Quotes goes back to the carousel. Reduced-motion
// readers get no auto-advance and a still, scrollable text.
(function(){
  var jumbo=document.getElementById('jumbo'), box=document.getElementById('jumbo-stage'),
      stage=document.getElementById('tp-stage'), roll=document.getElementById('tp-roll');
  if(!jumbo||!box||!stage||!roll)return;
  var slides=[].slice.call(box.querySelectorAll('.slide')), dots=[].slice.call(box.querySelectorAll('[data-dot]'));
  var still=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // the carousel
  var open=jumbo.querySelector('.tp-open'), cur=0, timer=0, hover=0, mode='carousel';
  function addr(){ return mode==='carousel'?slides[cur].getAttribute('data-href'):roll.getAttribute('data-href'); }
  function follow(){ if(open)open.setAttribute('href',addr()); }
  function show(i){ cur=(i+slides.length)%slides.length;
    slides.forEach(function(s,k){s.classList.toggle('is-on',k===cur);});
    dots.forEach(function(d,k){d.classList.toggle('is-on',k===cur);d.setAttribute('aria-selected',k===cur?'true':'false');});
    follow(); }
  function tick(){ clearTimeout(timer); timer=0; if(still||mode!=='carousel'||hover)return;
    timer=setTimeout(function(){show(cur+1);tick();},+slides[cur].getAttribute('data-dwell')); }
  function setMode(m){ mode=m; jumbo.setAttribute('data-mode',m); stage.hidden=(m==='carousel'); follow();
    if(m==='carousel'){tick();} else {clearTimeout(timer);timer=0;} }

  // the teleprompter
  // pos carries the fractional scroll position: a frame's step is well under one pixel at a
  // steady pace, and scrollTop keeps whole pixels, so adding to it directly never moves.
  var speeds=[14,22,32,46,64], si=2, playing=false, last=0, raf=0, hold=0, pos=0;
  var play=jumbo.querySelector('[data-tp="toggle"]');
  function label(){ if(play){play.textContent=playing?'Pause':'Play';play.setAttribute('aria-label',playing?'Pause':'Play');} }
  function step(t){ raf=0; if(!playing)return;
    if(last){ if(!hold){ if(Math.abs(stage.scrollTop-pos)>2) pos=stage.scrollTop; pos+=(t-last)/1000*speeds[si]; stage.scrollTop=pos; }
      if(stage.scrollTop+stage.clientHeight>=stage.scrollHeight-1){playing=false;label();return;} }
    last=t; raf=requestAnimationFrame(step); }
  function start(){ last=0; if(!raf) raf=requestAnimationFrame(step); }

  jumbo.addEventListener('click',function(e){
    var d=e.target.closest&&e.target.closest('[data-dot]'); if(d){ show(+d.getAttribute('data-dot')); tick(); return; }
    // a click on the active slide, outside its own links, opens its address in the library
    var s=e.target.closest&&e.target.closest('.slide.is-on');
    if(s&&mode==='carousel'&&!e.target.closest('a,button')){ location.href=s.getAttribute('data-href'); return; }
    var b=e.target.closest&&e.target.closest('[data-tp]'); if(!b)return; var k=b.getAttribute('data-tp');
    if(k==='read'){ setMode('read'); playing=false; label(); stage.scrollTop=0; stage.focus({preventScroll:true}); }
    if(k==='tele'){ setMode('tele'); stage.scrollTop=0; playing=!still; label(); start(); stage.focus({preventScroll:true}); }
    if(k==='quotes'){ playing=false; label(); setMode('carousel'); }
    if(k==='toggle'){ playing=!playing; if(playing&&stage.scrollTop+stage.clientHeight>=stage.scrollHeight-1)stage.scrollTop=0; label(); start(); }
    if(k==='slower'&&si>0)si--; if(k==='faster'&&si<speeds.length-1)si++;
    if(k==='restart'){ stage.scrollTop=0; playing=true; label(); start(); }
  });
  box.addEventListener('keydown',function(e){ var d=e.target.closest&&e.target.closest('[data-dot]'); if(!d)return;
    var step=e.key==='ArrowRight'?1:e.key==='ArrowLeft'?-1:0; if(!step)return; e.preventDefault();
    show(cur+step); tick(); dots[cur].focus(); });
  box.addEventListener('mouseenter',function(){hover=1;hold=1;clearTimeout(timer);timer=0;});
  box.addEventListener('mouseleave',function(){hover=0;hold=0;last=0;tick();});
  stage.addEventListener('touchstart',function(){hold=1;},{passive:true});
  stage.addEventListener('touchend',function(){setTimeout(function(){hold=0;last=0;},1200);},{passive:true});
  stage.addEventListener('keydown',function(e){ if(e.key===' '&&mode==='tele'){e.preventDefault();playing=!playing;label();start();} });
  if('IntersectionObserver' in window){ new IntersectionObserver(function(en){
    if(en[0].isIntersecting){ hold=0; last=0; if(mode==='tele'&&playing)start(); if(mode==='carousel')tick(); }
    else { hold=1; clearTimeout(timer); timer=0; } },{threshold:.2}).observe(box); }
  // a link of the form index.html#q<n> (the shelf pages in the viewer) opens on that question
  var q=/^#q(\d)$/.exec(location.hash); show(q?+q[1]:0); label(); tick();
  if(q){ setTimeout(function(){ box.scrollIntoView({block:'center'}); },50); }
})();
