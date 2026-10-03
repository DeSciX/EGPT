// The issue's player: one audio element, a Listen button per piece that has an episode.
(function(){
  var bar=document.getElementById('player'), au=document.getElementById('player-audio'), play=document.getElementById('player-play'),
      title=document.getElementById('player-title'), seek=document.getElementById('player-seek'), time=document.getElementById('player-time');
  if(!bar||!au)return;
  var current=null;
  function fmt(s){ s=Math.max(0,Math.floor(s||0)); return Math.floor(s/60)+':'+('0'+s%60).slice(-2); }
  function mark(){ [].forEach.call(document.querySelectorAll('[data-listen]'),function(b){ var on=b===current&&!au.paused; b.classList.toggle('is-playing',on); var l=b.querySelector('.listen__label'); if(l)l.textContent=on?'Pause':'Listen'; });
    play.classList.toggle('is-paused',au.paused); play.setAttribute('aria-label',au.paused?'Play':'Pause'); }
  document.addEventListener('click',function(e){
    var b=e.target.closest&&e.target.closest('[data-listen]'); if(!b)return;
    if(b===current||b.getAttribute('data-src')===au.getAttribute('src')){ current=b; if(au.paused)au.play();else au.pause(); return; }
    current=b; au.src=b.getAttribute('data-src'); title.textContent=b.getAttribute('data-title')||''; bar.hidden=false; au.play();
  });
  play.addEventListener('click',function(){ if(au.paused)au.play();else au.pause(); });
  document.getElementById('player-close').addEventListener('click',function(){ au.pause(); bar.hidden=true; current=null; mark(); });
  ['play','pause','ended'].forEach(function(ev){ au.addEventListener(ev,mark); });
  au.addEventListener('timeupdate',function(){ if(au.duration){ seek.value=Math.round(1000*au.currentTime/au.duration); time.textContent=fmt(au.currentTime)+' / '+fmt(au.duration); } });
  seek.addEventListener('input',function(){ if(au.duration)au.currentTime=au.duration*seek.value/1000; });
})();
