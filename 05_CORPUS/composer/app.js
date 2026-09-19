<script>
(function(){
"use strict";
var R = (window.__CORPUS__ && window.__CORPUS__.records) || [];
var doc = [];
var insertAt = null;      // index to insert new blocks at; null = append               // blocks: {k:'quote'|'prose'|'h2'|'holding', id?, text?, note?, para?, cmt?, cmtLabel?}
var KEY  = 'egpt-composer-drafts-v2';   // { name: {t,s,b,doc,saved} }
var AUTO = '__autosave';                // reserved slot, always kept current
var current = AUTO;                     // name of the draft in the editor

function esc(s){return String(s==null?'':s).replace(/[&<>]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;'}[c];});}
function el(h){var d=document.createElement('div');d.innerHTML=h.trim();return d.firstChild;}
function byId(id){for(var i=0;i<R.length;i++) if(R[i].id===id) return R[i]; return null;}
function nsp(t){return String(t||'').replace(/\s+/g,' ').trim();}
/* Inline emphasis is allowed in quotations, prose and comments — the traditional
   "emphasis added" convention. Everything is escaped first; only these bare tags,
   with no attributes, are then let back through. */
var TAGS='b|i|em|strong|u|sup|sub|mark|small|br';
var TAG_RE=new RegExp('&lt;(\\/?)('+TAGS+')\\s*(\\/?)&gt;','gi');
function rich(t){ return esc(t).replace(TAG_RE, function(_,close,tag,slash){
  return '<'+close+tag.toLowerCase()+slash+'>'; }); }
function stripTags(t){ return String(t||'').replace(new RegExp('<\\/?('+TAGS+')\\s*\\/?>','gi'),''); }
/* Text of a quote block: the author's edit if there is one, else the verbatim record. */
function blockText(b){ var r=byId(b.id); return (b.text!=null && b.text!=='') ? b.text : (r?r.quote:''); }
function isEdited(b){ var r=byId(b.id); return !!r && b.text!=null && b.text!=='' && nsp(stripTags(b.text))!==nsp(stripTags(r.quote)); }
/* A quotation may be shortened with … and annotated with [brackets]. Everything else
   must survive verbatim, in order. Returns {ok, why}. */
function checkEdit(orig, edited){
  var O=nsp(stripTags(orig)), E=nsp(stripTags(edited));
  if(!E) return {ok:false, why:'The quotation is empty.'};
  if(E===O) return {ok:true, why:'Unchanged from the source.'};
  var stripped=E.replace(/\[[^\]]*\]/g,'\u0000');
  var segs=stripped.split(/\u0000|\.\.\.|…/).map(nsp).filter(Boolean);
  var pos=0;
  for(var i=0;i<segs.length;i++){
    var at=O.indexOf(segs[i], pos);
    if(at<0) return {ok:false, why:'Not in the source, or out of order: “'+segs[i].slice(0,60)+'…”'};
    pos=at+segs[i].length;
  }
  return {ok:true, why:'Every kept run appears in the source, in order. Cuts marked …, insertions in [ ].'};
}
function cite(r){
  var b=[r.source.work, r.source.locus, r.source.date].filter(Boolean);
  return b.join(' · ');
}
function allDrafts(){
  try{ var v=localStorage.getItem(KEY); return v?JSON.parse(v):{}; }catch(e){ return {}; }
}
function putDrafts(d){
  try{ localStorage.setItem(KEY, JSON.stringify(d)); return true; }
  catch(e){ flash('Could not save — browser storage is unavailable or full.', true); return false; }
}
function flash(msg, bad){
  var n=document.getElementById('draftState');
  n.textContent=msg; n.style.color= bad ? 'var(--flag)' : 'var(--ok)';
  clearTimeout(flash._t); flash._t=setTimeout(function(){ n.textContent=''; }, bad?6000:2200);
}
function stamp(){ var d=new Date(); return d.toISOString().slice(0,16).replace('T',' '); }

/* ---------- library ---------- */
var $q=document.getElementById('q'), $sp=document.getElementById('fSpeaker'),
    $th=document.getElementById('fTheme'),
    $yf=document.getElementById('yFrom'), $yt=document.getElementById('yTo'),
    $list=document.getElementById('list');

function uniq(a){var s={},o=[];a.forEach(function(x){if(x&&!s[x]){s[x]=1;o.push(x);}});return o.sort();}
/* speakers listed by last name, which is how you look a person up */
var spSeen={}, spList=[];
R.forEach(function(r){ var n=r.speaker.name;
  if(!spSeen[n]){ spSeen[n]=1; spList.push({n:n, k:r.speaker.sort||n.toLowerCase()}); } });
spList.sort(function(a,b){ return a.k<b.k?-1:a.k>b.k?1:0; });
spList.forEach(function(s){ var o=el('<option></option>'); o.value=s.n;
  o.textContent=s.n+'  ('+s.k.split(',')[0]+')'; $sp.appendChild(o); });
uniq([].concat.apply([],R.map(function(r){return r.themes||[];}))).forEach(function(v){$th.appendChild(el('<option>'+esc(v)+'</option>'));});

/* A record matches a year range if ANY year it carries falls inside it.
   Records with no year are shown only when no range is set. */
function inYears(r){
  var lo=parseInt($yf.value,10), hi=parseInt($yt.value,10);
  var hasLo=!isNaN(lo), hasHi=!isNaN(hi);
  if(!hasLo && !hasHi) return true;
  var ys=r.years||[];
  if(!ys.length) return false;
  for(var i=0;i<ys.length;i++){
    if((!hasLo || ys[i]>=lo) && (!hasHi || ys[i]<=hi)) return true;
  }
  return false;
}
function match(r){
  var t=$q.value.trim().toLowerCase();
  if($sp.value && r.speaker.name!==$sp.value) return false;
  if($th.value && (r.themes||[]).indexOf($th.value)<0) return false;
  if(!inYears(r)) return false;
  if(!t) return true;
  return (r.embed_text||'').toLowerCase().indexOf(t)>=0;
}
function inDoc(id){return doc.some(function(b){return b.k==='quote'&&b.id===id;});}

function renderLib(){
  var hits=R.filter(match);
  var lo=parseInt($yf.value,10), hi=parseInt($yt.value,10), rng='';
  if(!isNaN(lo)||!isNaN(hi)){
    rng=' · '+(isNaN(lo)?'…':lo)+'–'+(isNaN(hi)?'…':hi)+
        ' (undated quotations hidden)';
  }
  document.getElementById('libCount').textContent=hits.length+' of '+R.length+' shown'+rng;
  $list.innerHTML='';
  if(!hits.length){$list.appendChild(el('<p class="empty">Nothing matches. Clear a filter.</p>'));return;}
  hits.slice(0,400).forEach(function(r){
    var n=el('<article class="q'+(inDoc(r.id)?' inDoc':'')+'" tabindex="0"></article>');
    n.innerHTML='<div class="who">'+esc(r.speaker.name)+'</div>'+
      '<blockquote>“'+esc((r.quote||'(no such passage found)').slice(0,260))+
      (r.quote&&r.quote.length>260?'…':'')+'”</blockquote>'+
      '<div class="meta">'+esc(cite(r))+
      ((r.years&&r.years.length)?'<span class="yr">'+r.years.join(', ')+'</span>':'')+'</div>';
    function add(){ if(!inDoc(r.id)){ addBlock({k:'quote',id:r.id}); } }
    n.addEventListener('click',add);
    n.addEventListener('keydown',function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();add();}});
    $list.appendChild(n);
  });
  if(hits.length>400) $list.appendChild(el('<p class="empty">Showing the first 400. Narrow the search to see the rest.</p>'));
}
[$q,$sp,$th,$yf,$yt].forEach(function(n){n.addEventListener('input',renderLib);});
document.getElementById('yClear').addEventListener('click',function(){$yf.value='';$yt.value='';renderLib();});

/* ---------- document ---------- */
var $doc=document.getElementById('doc');
var dragFrom=null;

function addBlock(b){
  if(insertAt!=null && insertAt>=0 && insertAt<=doc.length){ doc.splice(insertAt,0,b); insertAt++; }
  else doc.push(b);
  sync();
}
function renderDoc(){
  document.getElementById('docCount').textContent=doc.length+' block'+(doc.length===1?'':'s')+
    (insertAt!=null?' \u00b7 inserting at '+(insertAt+1):'');
  $doc.innerHTML='';
  if(!doc.length){$doc.appendChild(el('<p class="empty">Click a quote on the left to add it. Use the buttons above for your own headings, prose and holding blocks.</p>'));return;}
  doc.forEach(function(b,i){
    var n=el('<div class="blk"'+((insertAt===i)?' data-ins="above"':(insertAt===i+1)?' data-ins="below"':'')+' data-k="'+b.k+'" draggable="true"></div>');
    var head='<div class="blkhead"><span class="grip" title="Drag to reorder">☰</span>'+
      '<span class="lbl">'+({quote:'Quote',prose:'Prose',h2:'Heading',holding:'Holding'})[b.k]+'</span>'+
      '<button class="btn sm" data-up="'+i+'">↑</button>'+
      '<button class="btn sm" data-dn="'+i+'">↓</button>'+
      '<button class="btn sm ins" data-ib="'+i+'" title="Insert new blocks above this one">⊕↑</button>'+
      '<button class="btn sm ins" data-ja="'+i+'" title="Insert new blocks below this one">⊕↓</button>'+
      '<button class="btn sm" data-rm="'+i+'">✕</button></div>';
    if(b.k==='quote'){
      var r=byId(b.id)||{speaker:{name:'?'},source:{},quote:'(missing record)'};
      var cur=blockText(b), ed=isEdited(b);
      n.innerHTML=head.replace('</div>','')+
        (ed?'<span class="editedTag">EDITED</span>':'')+
        ((b.cmt&&b.cmt.trim())?'<span class="hasCmt">COMMENT</span>':'')+
        (b.note?'<span class="noteTag">ENDNOTE</span>':'')+
        '<button class="btn sm" data-ed="'+i+'">'+(b.open?'Done':'Edit')+'</button>'+
        '<button class="btn sm" data-nt="'+i+'">'+(b.note?'Inline it':'Endnote it')+'</button>'+
        '<button class="btn sm" data-cm="'+i+'">'+(b.cmtOpen?'Close note':'Comment')+'</button></div>'+
        '<div class="qt">“'+rich(cur.slice(0,300))+(cur.length>300?'…':'')+'”</div>'+
        '<div class="cite">'+esc(r.speaker.name)+' · '+esc(cite(r))+'</div>'+
        (b.open?
          '<div class="qedit">'+
          '<div class="qtools">'+
            '<button class="btn sm" data-ins="'+i+'">Insert [ ]</button>'+
            '<button class="btn sm" data-ell="'+i+'">Cut to …</button>'+
            '<button class="btn sm" data-rst="'+i+'">Restore original</button>'+
          '</div>'+
          '<textarea data-qt="'+i+'" spellcheck="false">'+esc(cur)+'</textarea>'+
          '<div class="chk" data-chk="'+i+'"></div>'+
          '<div class="orig"><b>Source text</b><br>'+esc(r.quote||'')+'</div>'+
          '</div>' : '')+
        (b.note?
          '<div class="para"><label>Body paraphrase \u2014 what the reader sees; the quote moves to a numbered endnote.</label>'+
          '<textarea data-pa="'+i+'" placeholder="Say it in your own words here.">'+esc(b.para||'')+'</textarea></div>' : '')+
        (b.cmtOpen?
          '<div class="cmt">'+
          '<input type="text" data-cl="'+i+'" placeholder="Author\u2019s Comment" value="'+
            esc(b.cmtLabel||'')+'">'+
          '<textarea data-cx="'+i+'" placeholder="Your note beside this quote \u2014 a translation of a technical term, or the context a reader needs.">'+
            esc(b.cmt||'')+'</textarea>'+
          '</div>' : '');
    } else {
      n.innerHTML=head+'<textarea data-tx="'+i+'" placeholder="'+
        (b.k==='h2'?'Section heading':b.k==='holding'?'The conclusion this section is going to establish':'Your text')+
        '">'+esc(b.text||'')+'</textarea>';
      if(b.k==='h2') n.querySelector('textarea').style.minHeight='2.2em';
    }
    n.addEventListener('dragstart',function(e){dragFrom=i;n.classList.add('drag');e.dataTransfer.effectAllowed='move';});
    n.addEventListener('dragend',function(){dragFrom=null;n.classList.remove('drag');
      [].forEach.call($doc.children,function(c){c.classList.remove('over');});});
    n.addEventListener('dragover',function(e){e.preventDefault();n.classList.add('over');});
    n.addEventListener('dragleave',function(){n.classList.remove('over');});
    n.addEventListener('drop',function(e){e.preventDefault();n.classList.remove('over');
      if(dragFrom===null||dragFrom===i)return;
      var moved=doc.splice(dragFrom,1)[0]; doc.splice(i,0,moved); sync();});
    $doc.appendChild(n);
  });
}
function wrapSel(i, before, after, replace){
  var ta=$doc.querySelector('[data-qt="'+i+'"]'); if(!ta) return;
  var a=ta.selectionStart, z=ta.selectionEnd, v=ta.value;
  var mid = replace!=null ? replace : v.slice(a,z);
  ta.value = v.slice(0,a) + before + mid + after + v.slice(z);
  doc[i].text = ta.value;
  var caret = a + before.length + mid.length;
  ta.focus(); ta.setSelectionRange(caret, caret);
  runCheck(i); renderPreview(); autosave();
}
function markEdited(i){
  var ta=$doc.querySelector('[data-qt="'+i+'"]'); if(!ta) return;
  var blk=ta.closest('.blk'); if(!blk) return;
  var head=blk.querySelector('.blkhead'), tag=head.querySelector('.editedTag');
  if(isEdited(doc[i])){
    if(!tag){ tag=el('<span class="editedTag">EDITED</span>');
      head.insertBefore(tag, head.querySelector('[data-ed]')); }
  } else if(tag){ tag.parentNode.removeChild(tag); }
}
function markComment(i){
  var tx=$doc.querySelector('[data-cx="'+i+'"]'); if(!tx) return;
  var blk=tx.closest('.blk'); if(!blk) return;
  var head=blk.querySelector('.blkhead'), tag=head.querySelector('.hasCmt');
  if((doc[i].cmt||'').trim()){
    if(!tag){ tag=el('<span class="hasCmt">COMMENT</span>');
      head.insertBefore(tag, head.querySelector('[data-ed]')); }
  } else if(tag){ tag.parentNode.removeChild(tag); }
}
function runCheck(i){
  var box=$doc.querySelector('[data-chk="'+i+'"]'); if(!box) return;
  var r=byId(doc[i].id); if(!r) return;
  var res=checkEdit(r.quote, doc[i].text!=null&&doc[i].text!==''?doc[i].text:r.quote);
  box.className='chk'+(res.ok?'':' bad');
  box.textContent=(res.ok?'✓ ':'⚠ ')+res.why;
}
$doc.addEventListener('click',function(e){
  var t=e.target; if(t.tagName!=='BUTTON')return;
  var u=t.getAttribute('data-up'), d=t.getAttribute('data-dn'), r=t.getAttribute('data-rm'),
      ed=t.getAttribute('data-ed'), ins=t.getAttribute('data-ins'),
      ell=t.getAttribute('data-ell'), rst=t.getAttribute('data-rst');
  if(u!==null&&u>0){var i=+u;var m=doc.splice(i,1)[0];doc.splice(i-1,0,m);sync();}
  else if(d!==null&&+d<doc.length-1){var j=+d;var m2=doc.splice(j,1)[0];doc.splice(j+1,0,m2);sync();}
  else if(r!==null){doc.splice(+r,1); if(insertAt!=null&&insertAt>+r) insertAt--; if(insertAt>doc.length) insertAt=null; sync();}
  else if(ed!==null){var k=+ed; doc[k].open=!doc[k].open;
    if(doc[k].open&&(doc[k].text==null||doc[k].text==='')){var rr=byId(doc[k].id); doc[k].text=rr?rr.quote:'';}
    renderDoc(); if(doc[k].open){runCheck(k); var ta=$doc.querySelector('[data-qt="'+k+'"]'); if(ta) ta.focus();}}
  else if(t.getAttribute('data-cm')!==null){ var m=+t.getAttribute('data-cm');
    doc[m].cmtOpen=!doc[m].cmtOpen; renderDoc();
    if(doc[m].cmtOpen){ var tx=$doc.querySelector('[data-cx="'+m+'"]'); if(tx) tx.focus(); } }
  else if(t.getAttribute('data-ib')!==null){ var ib=+t.getAttribute('data-ib');
    insertAt=(insertAt===ib)?null:ib; renderDoc(); }
  else if(t.getAttribute('data-ja')!==null){ var ja=+t.getAttribute('data-ja')+1;
    insertAt=(insertAt===ja)?null:ja; renderDoc(); }
  else if(t.getAttribute('data-nt')!==null){ var nn=+t.getAttribute('data-nt');
    doc[nn].note=!doc[nn].note; renderDoc(); renderPreview(); autosave();
    if(doc[nn].note){ var pa=$doc.querySelector('[data-pa="'+nn+'"]'); if(pa) pa.focus(); } }
  else if(t.getAttribute('data-em')!==null){ wrapSel(+t.getAttribute('data-em'),'<em>','</em>'); }
  else if(t.getAttribute('data-st')!==null){ wrapSel(+t.getAttribute('data-st'),'<strong>','</strong>'); }
  else if(ins!==null){ wrapSel(+ins,'[',']'); }
  else if(ell!==null){ wrapSel(+ell,'','','…'); }
  else if(rst!==null){ var q=+rst, rr2=byId(doc[q].id); doc[q].text=rr2?rr2.quote:''; renderDoc(); runCheck(q); renderPreview(); autosave(); }
});
$doc.addEventListener('input',function(e){
  var i=e.target.getAttribute('data-tx');
  if(i!==null){ doc[+i].text=e.target.value; renderPreview(); autosave(); return; }
  var q=e.target.getAttribute('data-qt');
  if(q!==null){ doc[+q].text=e.target.value; runCheck(+q); markEdited(+q); renderPreview(); autosave(); return; }
  var cx=e.target.getAttribute('data-cx');
  if(cx!==null){ doc[+cx].cmt=e.target.value; markComment(+cx); renderPreview(); autosave(); return; }
  var pa=e.target.getAttribute('data-pa');
  if(pa!==null){ doc[+pa].para=e.target.value; renderPreview(); autosave(); return; }
  var cl=e.target.getAttribute('data-cl');
  if(cl!==null){ doc[+cl].cmtLabel=e.target.value; renderPreview(); autosave(); }
});
document.querySelectorAll('[data-add]').forEach(function(b){
  b.addEventListener('click',function(){addBlock({k:b.getAttribute('data-add'),text:''});
    var tas=$doc.querySelectorAll('textarea'); if(tas.length) tas[tas.length-1].focus();});
});

/* ---------- render ---------- */
function buildBody(forExport){
  var wantR=document.getElementById('optRestored').checked;
  var t=document.getElementById('docTitle').value||'Untitled',
      s=document.getElementById('docSub').value,
      by=document.getElementById('docBy').value;
  var o=[], ends=[];
  o.push('<h1>'+esc(t)+'</h1>');
  if(s) o.push('<p class="standfirst">'+rich(s)+'</p>');
  if(by) o.push('<p class="byline">'+esc(by)+'</p>');
  doc.forEach(function(b){
    if(b.k==='h2'){ if(b.text) o.push('<h2>'+rich(b.text)+'</h2>'); }
    else if(b.k==='prose'){ (b.text||'').split(/\n{2,}/).forEach(function(p){ if(p.trim()) o.push('<p>'+rich(p.trim())+'</p>'); }); }
    else if(b.k==='holding'){ if(b.text) o.push('<div class="holding"><p>'+rich(b.text)+'</p></div>'); }
    else {
      var r=byId(b.id); if(!r) return;
      if(b.note){
        var en=ends.length+1;
        var body=(b.para||'').trim();
        var mark='<sup class="enref" id="enr'+en+'"><a href="#en'+en+'">'+en+'</a></sup>';
        if(body){ var ps=body.split(/\n{2,}/).filter(function(x){return x.trim();});
          ps.forEach(function(x,ix){ o.push('<p>'+rich(x.trim())+(ix===ps.length-1?mark:'')+'</p>'); }); }
        else { o.push('<p class="empty">'+mark+'</p>'); }
        ends.push({n:en, r:r, text:blockText(b), cmt:(b.cmt||'').trim(), lab:(b.cmtLabel||'').trim()});
        return;
      }
      var note=(b.cmt||'').trim();
      o.push('<div class="qrow'+(note?' withCmt':'')+'">');
      o.push('<blockquote><p>“'+rich(blockText(b))+'”</p></blockquote>');
      if(note){
        var lab=(b.cmtLabel||'').trim()||'Author\u2019s Comment';
        var paras=note.split(/\n{2,}/).filter(function(x){return x.trim();})
          .map(function(x){return '<p>'+rich(x.trim())+'</p>';}).join('');
        o.push('<aside class="aside"><span class="lbl2">'+esc(lab)+'</span>'+paras+'</aside>');
      }
      o.push('</div>');
      o.push('<p class="src">'+esc(r.speaker.name)+' · '+esc(cite(r))+'</p>');
      if(wantR&&r.restored) o.push('<p class="caut"><b>Restored</b> '+esc(r.restored)+'</p>');
    }
  });
  if(ends.length){
    o.push('<section class="endnotes"><h2>Notes</h2><ol>');
    ends.forEach(function(e){
      var li='<li id="en'+e.n+'"><span class="enq">\u201c'+rich(e.text)+'\u201d</span> '+
        '<span class="ensrc">'+esc(e.r.speaker.name)+' \u00b7 '+esc(cite(e.r))+'</span>';
      if(e.cmt){ var lab=e.lab||'Author\u2019s Comment';
        li+='<span class="encmt"><b>'+esc(lab)+'</b> '+rich(e.cmt)+'</span>'; }
      if(wantR&&e.r.restored) li+='<span class="encmt"><b>Restored</b> '+esc(e.r.restored)+'</span>';
      li+=' <a class="enback" href="#enr'+e.n+'">\u21a9</a></li>';
      o.push(li);
    });
    o.push('</ol></section>');
  }
  return o.join('\n');
}
function renderPreview(){ document.getElementById('preview').innerHTML=buildBody(false); }

/* ---------- export ---------- */
function exportHTML(){
  var css=document.getElementById('paperCSS').textContent;
  var t=document.getElementById('docTitle').value||'Untitled';
  return '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n'+
    '<meta name="viewport" content="width=device-width,initial-scale=1">\n'+
    '<title>'+esc(t)+'</title>\n'+
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'+
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'+
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..700;1,6..72,200..600&family=Courier+Prime:ital,wght@0,400;0,700;1,400&display=swap">\n'+
    '<style>'+css+'</style>\n</head>\n<body>\n<article class="wrap">\n'+buildBody(true)+'\n</article>\n</body>\n</html>\n';
}
document.getElementById('btnDownload').addEventListener('click',function(){
  var name=(document.getElementById('docTitle').value||'paper').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.html';
  var b=new Blob([exportHTML()],{type:'text/html'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){URL.revokeObjectURL(a.href);},2000);
});
document.getElementById('btnShow').addEventListener('click',function(){
  var o=document.getElementById('exportOut');
  o.style.display = o.style.display==='block' ? 'none' : 'block';
  if(o.style.display==='block'){ o.value=exportHTML(); o.focus(); o.select(); }
});
document.getElementById('btnExport').addEventListener('click',function(){
  document.getElementById('btnDownload').click();
});

/* ---------- drafts ---------- */
var $sel=document.getElementById('draftSel');

function state(){return {t:document.getElementById('docTitle').value,
  s:document.getElementById('docSub').value,b:document.getElementById('docBy').value,
  doc:doc, saved:stamp()};}

function applyState(st){
  document.getElementById('docTitle').value=st.t||'Untitled';
  document.getElementById('docSub').value=st.s||'';
  document.getElementById('docBy').value=st.b||'';
  doc=(st.doc||[]).map(function(b){ b.open=false; b.cmtOpen=false; return b; });
}
function refreshSel(){
  var d=allDrafts(), names=Object.keys(d).filter(function(k){return k!==AUTO;}).sort();
  $sel.innerHTML='';
  if(!names.length){ $sel.appendChild(el('<option value="">— none saved —</option>')); }
  names.forEach(function(nm){
    var o=el('<option></option>'); o.value=nm;
    o.textContent=nm+'  ('+(d[nm].saved||'?')+')';
    $sel.appendChild(o);
  });
  if(current!==AUTO && d[current]) $sel.value=current;
}
function autosave(){ var d=allDrafts(); d[AUTO]=state(); putDrafts(d); }

function saveAs(name){
  name=nsp(name);
  if(!name){ return; }
  if(name===AUTO){ flash('That name is reserved.', true); return; }
  var d=allDrafts();
  if(d[name] && !confirm('“'+name+'” already exists. Overwrite it?')) return;
  d[name]=state();
  if(putDrafts(d)){ current=name; refreshSel(); $sel.value=name; flash('Saved “'+name+'”'); }
}
document.getElementById('btnSaveAs').addEventListener('click',function(){
  var suggested=nsp(document.getElementById('docTitle').value)||'Draft';
  var name=prompt('Save this paper as:', suggested);
  if(name!==null) saveAs(name);
});
document.getElementById('btnSave').addEventListener('click',function(){
  if(current===AUTO || !allDrafts()[current]){ document.getElementById('btnSaveAs').click(); return; }
  var d=allDrafts(); d[current]=state();
  if(putDrafts(d)){ refreshSel(); flash('Saved “'+current+'”'); }
});
document.getElementById('btnLoad').addEventListener('click',function(){
  var name=$sel.value; if(!name){ flash('No draft selected.', true); return; }
  var d=allDrafts(); if(!d[name]){ flash('That draft is gone.', true); refreshSel(); return; }
  if(doc.length && !confirm('Replace what is in the editor with “'+name+'”?')) return;
  applyState(d[name]); current=name; sync(); flash('Opened “'+name+'”');
});
document.getElementById('btnDel').addEventListener('click',function(){
  var name=$sel.value; if(!name) return;
  if(!confirm('Delete the draft “'+name+'”? This cannot be undone.')) return;
  var d=allDrafts(); delete d[name];
  if(putDrafts(d)){ if(current===name) current=AUTO; refreshSel(); flash('Deleted “'+name+'”'); }
});
document.getElementById('btnNew').addEventListener('click',function(){
  if(doc.length && !confirm('Clear the editor? Anything unsaved is lost.')) return;
  doc=[]; current=AUTO;
  document.getElementById('docTitle').value='Untitled';
  document.getElementById('docSub').value='';
  sync(); refreshSel();
});

/* Backup and restore — localStorage is per browser, so drafts also live as a file. */
document.getElementById('btnBackup').addEventListener('click',function(){
  var d=allDrafts();
  var blob=new Blob([JSON.stringify({kind:'egpt-composer-drafts',v:2,drafts:d},null,1)],{type:'application/json'});
  var a=document.createElement('a'); a.href=URL.createObjectURL(blob);
  a.download='composer-drafts-'+stamp().replace(/[: ]/g,'-')+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(function(){URL.revokeObjectURL(a.href);},2000);
  flash('Backed up '+Object.keys(d).filter(function(k){return k!==AUTO;}).length+' draft(s)');
});
document.getElementById('btnRestore').addEventListener('click',function(){
  document.getElementById('restoreFile').click();
});
document.getElementById('restoreFile').addEventListener('change',function(e){
  var f=e.target.files&&e.target.files[0]; if(!f) return;
  var rd=new FileReader();
  rd.onload=function(){
    var parsed; try{ parsed=JSON.parse(rd.result); }catch(err){ flash('That file is not readable JSON.', true); return; }
    var incoming=(parsed&&parsed.drafts)||null;
    if(!incoming||typeof incoming!=='object'){ flash('No drafts found in that file.', true); return; }
    var d=allDrafts(), added=0, renamed=0;
    Object.keys(incoming).forEach(function(nm){
      if(nm===AUTO) return;
      var target=nm;
      if(d[target]){ var n=2; while(d[target+' ('+n+')']) n++; target=target+' ('+n+')'; renamed++; }
      d[target]=incoming[nm]; added++;
    });
    if(putDrafts(d)){ refreshSel();
      flash('Restored '+added+' draft(s)'+(renamed?', '+renamed+' renamed to avoid a clash':'')); }
  };
  rd.readAsText(f);
  e.target.value='';
});

['docTitle','docSub','docBy'].forEach(function(id){
  document.getElementById(id).addEventListener('input',function(){renderPreview();autosave();});});
document.getElementById('optRestored').addEventListener('change',renderPreview);

var $app=document.getElementById('app'), $full=document.getElementById('btnFull');
function setReading(on){
  $app.classList.toggle('reading', !!on);
  $full.textContent = on ? 'Back to editing' : 'Read full width';
  if(!on) sync();
}
$full.addEventListener('click',function(){ setReading(!$app.classList.contains('reading')); });
document.addEventListener('keydown',function(e){
  if(e.key==='Escape' && $app.classList.contains('reading')) setReading(false);
});

function sync(){renderLib();renderDoc();renderPreview();autosave();}
document.getElementById('corpusCount').textContent=R.length+' quotations in the corpus';
var boot=allDrafts()[AUTO];
if(boot) applyState(boot);
refreshSel();
sync();
})();
</script>
