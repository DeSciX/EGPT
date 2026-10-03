/* ============================================================
   EGPT-Evidence library viewer — journal.js
   The journal's article mode. A file under journal/<issue>/ is editorial, not evidence, so it is
   set as a magazine article: section, headline, deck, byline, a Listen button when the piece has
   an episode, the text, then the next piece in the issue. No provenance strip, no record ids, no
   hashes. The sidebar becomes the issue's contents. The issue itself (titles, order, audio) is
   issues/<id>.json, written by scripts/build-journal.js. Cowork, 2 October 2026.
   ============================================================ */
(function () {
  'use strict';
  var V = window.EGPTViewer;
  if (!V) return;
  var esc = V.esc, $ = function (id) { return document.getElementById(id); };
  var nav = $('journal-nav'), treeNav = V.el.treeNav, rendered = V.el.rendered, search = document.querySelector('.sidebar-search');
  var RE = /^journal\/([^/]+)\/([^/]+)\.md$/;
  var cache = {}, active = false, builtFor = '';

  function owns(path) { return RE.test(path || ''); }
  function getIssue(id) {
    if (cache[id]) return Promise.resolve(cache[id]);
    return fetch('issues/' + encodeURIComponent(id) + '.json').then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (j) { j._all = [].concat.apply([], j.sections.map(function (s) { return s.items; })); cache[id] = j; return j; });
  }
  function two(n) { return (n < 10 ? '0' : '') + n; }
  function hashOf(a) { return a.href.replace(/^library\.html/, ''); }
  // straight quotes and dashes, set as type
  function typeset(root) {
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n, list = [];
    while ((n = w.nextNode())) { var p = n.parentElement; if (p && !p.closest('code,pre,script,style')) list.push(n); }
    list.forEach(function (t) {
      t.nodeValue = t.nodeValue.replace(/(^|[\s(\[\u2014-])"(?=\S)/g, '$1\u201C').replace(/"/g, '\u201D')
        .replace(/(^|[\s(\[\u2014\u201C-])'(?=\S)/g, '$1\u2018').replace(/'/g, '\u2019').replace(/ -- /g, ' \u2014 ');
    });
  }
  function listenBtn(a) {
    if (!a || !a.audio) return '';
    return '<button type="button" class="jr-listen" data-jr-listen aria-expanded="false"><span class="jr-listen__icon" aria-hidden="true"></span><span class="jr-listen__label">Listen</span>' +
      (a.audio.duration ? '<span class="jr-listen__time">' + esc(a.audio.duration) + '</span>' : '') + '</button>';
  }
  function buildNav(issue) {
    var M = issue.masthead, html = '<div class="jr-nav__head"><a class="jr-nav__back" href="#" data-home>\u2190 The library</a>' +
      '<a class="jr-nav__mast" href="' + esc(issue.page) + '"><img src="' + esc(M.cover) + '" alt="" width="56" height="56"><span><b>' + esc(M.name) + '</b><small>Issue ' + esc(issue.number) + ' \u00b7 ' + esc(issue.date) + '</small></span></a></div>' +
      '<a class="jr-ix jr-ix--note" href="#' + esc(issue.note.path) + '" data-path="' + esc(issue.note.path) + '"><span class="jr-ix__t">From the editor</span></a>';
    html += issue.sections.map(function (s) {
      return '<p class="jr-nav__sec">' + esc(s.title) + '</p>' + s.items.map(function (a) {
        return '<a class="jr-ix' + (a.status === 'stub' ? ' is-soon' : '') + '" href="' + esc(hashOf(a)) + '"' + (a.path ? ' data-path="' + esc(a.path) + '"' : '') + '><span class="jr-ix__n">' + two(a.n) + '</span><span class="jr-ix__t">' + esc(a.title) +
          (a.audio ? '<span class="jr-ix__audio" title="Has audio" aria-label="has audio"></span>' : '') + '</span></a>';
      }).join('');
    }).join('');
    nav.innerHTML = html; builtFor = issue.id;
    nav.querySelector('[data-home]').addEventListener('click', function (e) { e.preventDefault(); location.hash = ''; });
  }
  function enter(issue, path) {
    if (builtFor !== issue.id) buildNav(issue);
    active = true; document.body.classList.add('is-journal');
    nav.hidden = false; treeNav.hidden = true; if (search) search.hidden = true;
    var olds = nav.querySelectorAll('.is-active'); for (var i = 0; i < olds.length; i++) olds[i].classList.remove('is-active');
    var row = nav.querySelector('[data-path="' + path.replace(/["\\]/g, '\\$&') + '"]'); if (row) { row.classList.add('is-active'); if (!V.isMobile()) row.scrollIntoView({ block: 'nearest' }); }
  }
  function leave() {
    if (!active) return; active = false; document.body.classList.remove('is-journal');
    nav.hidden = true; treeNav.hidden = false; if (search) search.hidden = false;
  }
  function onNavigate(path) { if (!owns(path)) leave(); }

  function render(path, anchor) {
    var m = RE.exec(path), id = m[1];
    rendered.innerHTML = '<p class="loading">Loading\u2026</p>';
    Promise.all([getIssue(id), fetch(V.rawUrl(path)).then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.text(); })]).then(function (res) {
      if (V.currentPath() !== path) return;
      var issue = res[0], fm = V.parseFrontMatter(res[1]), meta = fm.meta || {};
      var a = path === issue.note.path ? issue.note : issue._all.filter(function (x) { return x.path === path; })[0] || { title: meta.title || '', dek: meta.dek || '', author: meta.author || '', section: meta.section || '' };
      var k = issue._all.indexOf(a), prev = k > 0 ? issue._all[k - 1] : null, next = k >= 0 ? issue._all[k + 1] : issue._all[0];
      var body = fm.body.trim();
      var by = [a.author ? 'By ' + esc(a.author) : '', esc(issue.date), a.minutes ? a.minutes + ' min read' : ''].filter(Boolean).join(' <span class="jr-dot">\u00b7</span> ');
      var side = function (x, cls, lab) { return x ? '<a class="' + cls + '" href="' + esc(hashOf(x)) + '"><small>' + lab + ' \u00b7 ' + esc(x.section) + '</small><span>' + esc(x.title) + '</span></a>' : '<span></span>'; };
      rendered.innerHTML = '<article class="doc jr">' +
        '<header class="jr-head"><p class="jr-kicker"><a href="' + esc(issue.page) + '">' + esc(issue.masthead.name) + '</a><span class="jr-dot">\u00b7</span>' + esc(a.section || '') + '</p>' +
        '<h1 class="jr-title">' + esc(a.title) + '</h1>' + (a.dek ? '<p class="jr-dek">' + esc(a.dek) + '</p>' : '') +
        '<div class="jr-meta"><p class="jr-by">' + by + '</p>' + listenBtn(a) + '</div>' +
        (a.audio ? '<div class="jr-player" hidden><audio controls preload="none" src="' + esc(a.audio.src) + '"></audio><span class="jr-player__t">' + esc(a.audio.title) + '</span></div>' : '') + '</header>' +
        (body ? '<div class="jr-body">' + marked.parse(body) + '</div>' : '<div class="jr-soon"><p>This piece is in preparation for Issue ' + esc(issue.number) + '.</p></div>') +
        '<footer class="jr-foot"><nav class="jr-pn" aria-label="More in this issue">' + side(prev, 'jr-pn__prev', '\u2190 Previous') + side(next, 'jr-pn__next', 'Next \u2192') + '</nav>' +
        '<p class="jr-back"><a href="' + esc(issue.page) + '#contents">All of Issue ' + esc(issue.number) + '</a></p></footer></article>';
      var art = rendered.querySelector('.jr-body');
      if (art) {
        V.headingIds(art); V.rebaseRelativeUrls(art, path); V.wrapTables(art); typeset(art);
        // a quotation's closing "— Speaker, Work, year" line is its attribution
        var bqs = art.querySelectorAll('blockquote');
        for (var i = 0; i < bqs.length; i++) { var last = bqs[i].lastElementChild; if (last && last.tagName === 'P' && /^\s*[\u2014\u2013]/.test(last.textContent)) { last.className = 'jr-cite'; last.innerHTML = last.innerHTML.replace(/^\s*[\u2014\u2013]\s*/, ''); } }
      }
      // an article whose front matter names a timeline (timeline: timelines/<id>.json) is an interactive one:
      // the text is its introduction, and the evidence timeline follows (site-assets/timeline.js)
      if (meta.timeline && window.EGPTTimeline) {
        var jr = rendered.querySelector('.jr'), tl = document.createElement('div');
        jr.classList.add('jr--wide'); jr.insertBefore(tl, jr.querySelector('.jr-foot'));
        var open = /^f-/.test(anchor || '') ? anchor.slice(2) : '';
        window.EGPTTimeline.mount(tl, V.rawUrl(path.replace(/[^/]+$/, '') + meta.timeline), { noTitle: true, open: open, linkHeld: function (p) { return '#' + p; } });
        if (open) anchor = '';
      }
      typeset(rendered.querySelector('.jr-head'));
      var btn = rendered.querySelector('[data-jr-listen]');
      if (btn) {
        var box = rendered.querySelector('.jr-player'), au = box.querySelector('audio');
        var mark = function () { btn.classList.toggle('is-playing', !au.paused); btn.querySelector('.jr-listen__label').textContent = au.paused ? 'Listen' : 'Pause'; };
        btn.addEventListener('click', function () { box.hidden = false; btn.setAttribute('aria-expanded', 'true'); if (au.paused) au.play(); else au.pause(); });
        ['play', 'pause', 'ended'].forEach(function (ev) { au.addEventListener(ev, mark); });
      }
      enter(issue, path);
      V.el.spineBar.hidden = true;
      V.el.githubLink.style.display = V.el.rawLink.style.display = 'none';
      V.el.shelfmark.innerHTML = '<a class="shelfmark__shelf" href="' + esc(issue.page) + '">' + esc(issue.masthead.name) + '</a><span class="shelfmark__sep">/</span><span class="shelfmark__dir">Issue ' + esc(issue.number) + '</span><span class="shelfmark__sep">/</span><span class="shelfmark__file">' + esc(a.title) + '</span>';
      document.title = a.title + ' \u2014 ' + issue.masthead.name;
      if (anchor) setTimeout(function () { V.scrollToAnchor(anchor); }, 30);
    }).catch(function () { if (V.currentPath() === path) rendered.innerHTML = '<div class="doc"><div class="notice"><p>This article could not be loaded here.</p><p><a href="journal.html">The journal</a></p></div></div>'; });
  }
  window.EGPTJournal = { owns: owns, render: render, onNavigate: onNavigate, leave: leave };
})();
