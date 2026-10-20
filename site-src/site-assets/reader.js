/* ============================================================
   EGPT-Evidence library viewer — reader.js
   The reader: a book with an index at the side, read in the same pane as everything else.
   One component, driven by a book index (books/<id>.json, schema egpt.book/1); the same code
   opens the Claude session (a transcript with questions) and the trial (five documents with
   headings). It owns three address forms on library.html:

     #book:<id>                        the book's cover
     #book:<id>/<part>                 a part of the book (its first item, or its own page)
     #book:<id>/<part>/<ref>           one item: a question by its key ("1", "1a"), a turn of a
                                       transcript by its anchor ("m12", "m12-q1"), a place by
                                       the anchor of its href
     #shelf:<id>                       a shelf of the library (site-src/shelves.json), see the end

   It renders its own pages (cover, question) into the viewer's pane and hands a document to the
   viewer (site.js) to render; the viewer calls back through EGPTReader.onNavigate so the book's
   chrome (index, bar) stays while a reader is inside the book, and so a page that is in a book
   says so when reached from outside. Vanilla JS, no build step. Written by Cowork, 1 October
   2026, for the EVIDENCE seat's integration; every non-quoted string in it is a draft for the
   author's pass (they are gathered in COWORK_READER_AND_LIBRARY_HANDBACK.md).
   ============================================================ */
(function () {
  'use strict';
  var V = window.EGPTViewer;
  if (!V) { console.warn('reader.js: site.js did not expose EGPTViewer'); return; }
  var esc = V.esc, $ = function (id) { return document.getElementById(id); };
  var BOOKS = V.data.books || [];
  var bookNav = $('book-nav'), bookBar = $('book-bar'), treeNav = V.el.treeNav, rendered = V.el.rendered, iframe = V.el.iframe;
  var search = document.querySelector('.sidebar-search');
  var cache = {};           // id → the index as fetched
  var current = null;       // { book, entry } while a reader is inside a book
  var hosting = null;       // the entry the viewer is being asked to render, during V.navigate
  var builtNav = '';        // the id of the book whose index is in the sidebar

  /* ---------------------------------------------------------- the index: fetch, flatten, address */
  function summary(id) { for (var i = 0; i < BOOKS.length; i++) if (BOOKS[i].id === id) return BOOKS[i]; return null; }
  function fetchBook(id) {
    if (cache[id]) return Promise.resolve(cache[id]);
    return fetch('books/' + encodeURIComponent(id) + '.json').then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); })
      .then(function (b) { if (b.schema !== 'egpt.book/1') throw new Error('not egpt.book/1'); b._flat = flatten(b); cache[id] = b; return b; });
  }
  function keyRef(key) { return String(key).replace(/[^A-Za-z0-9]/g, '').toLowerCase(); }    // "1(a)" → "1a"
  function splitHref(h) { var k = (h || '').indexOf('#'); return { path: k < 0 ? h : h.slice(0, k), anchor: k < 0 ? '' : h.slice(k + 1) }; }
  function kindOfItem(it) { if (it.key !== undefined && it.text !== undefined) return 'question'; if (it.message !== undefined && it.who !== undefined) return 'turn'; return 'place'; }
  // one ordered list of everything a reader can stand on, with the address of each
  function flatten(book) {
    var out = [];
    book.parts.forEach(function (part, pi) {
      var n = 0;
      function add(it, depth, parent) {
        var kind = kindOfItem(it), ref, href = it.href || '';
        if (kind === 'question') { ref = keyRef(it.key); href = it.answers && it.answers.length ? it.answers[0].href : (it.asked || ''); }
        else if (kind === 'turn') ref = 'm' + it.message;
        else { var sp = splitHref(href); ref = sp.anchor || ('i' + (n + 1)); }
        var e = { book: book.id, part: part, partIndex: pi, item: it, kind: kind, ref: ref, href: href, depth: depth, parent: parent, n: n++,
          addr: 'book:' + book.id + '/' + part.id + '/' + ref };
        out.push(e);
        (it.parts || []).forEach(function (sub) { add(sub, depth + 1, e); });
      }
      (part.items || []).forEach(function (it) { add(it, 0, null); });
      if (!(part.items || []).length && part.href) out.push({ book: book.id, part: part, partIndex: pi, item: { title: part.title, href: part.href }, kind: 'place', ref: '', href: part.href, depth: 0, parent: null, n: 0, addr: 'book:' + book.id + '/' + part.id });
    });
    return out;
  }
  function partEntries(book, part) { return book._flat.filter(function (e) { return e.part === part; }); }
  function partName(p) { return p.short || p.title; }
  function partById(book, id) { for (var i = 0; i < book.parts.length; i++) if (book.parts[i].id === id) return book.parts[i]; return null; }
  function findEntry(book, part, ref) {
    var list = partEntries(book, part), i;
    if (!ref) return list[0] || null;
    for (i = 0; i < list.length; i++) if (list[i].ref === ref) return list[i];
    // a turn may be addressed by any anchor inside its message: m12-q1 → message 12
    var m = /^m(\d+)(?:-|$)/.exec(ref);
    if (m) for (i = 0; i < list.length; i++) if (list[i].kind === 'turn' && String(list[i].item.message) === m[1]) return list[i];
    return null;
  }
  // the entry that a plain document address lands on, if any (used by the "this page is in a book" line)
  function entryForPath(book, path, anchor) {
    var list = book._flat, i, sp;
    if (anchor) for (i = 0; i < list.length; i++) { sp = splitHref(list[i].href); if (sp.path === path && sp.anchor === anchor) return list[i]; }
    var m = /^m(\d+)/.exec(anchor || '');
    if (m && book.page === path) for (i = 0; i < list.length; i++) if (list[i].kind === 'turn' && String(list[i].item.message) === m[1]) return list[i];
    for (i = 0; i < list.length; i++) { sp = splitHref(list[i].href); if (sp.path === path && (!anchor || !sp.anchor)) return list[i]; }
    if (book.page === path) for (i = 0; i < list.length; i++) if (list[i].kind === 'turn') return list[i];
    return null;
  }
  function questionNumber(it) { var m = /^Question\s+([^.]+)\./.exec(it.title || ''); return m ? m[1] : String(it.key); }
  function questionTitle(it) { return (it.title || '').replace(/^Question\s+[^.]+\.\s*/, ''); }
  function plain(t) { return String(t || '').replace(/\*\*|__|`/g, '').replace(/(^|\s)[*_](?=\S)/g, '$1').replace(/(\S)[*_](?=\s|$)/g, '$1'); }
  var WHO = { ME: 'The author', CLAUDE: 'Claude', CHATGPT: 'ChatGPT' };
  function who(w, it) { if (it && it.who_name) return it.who_name; return WHO[w] || String(w || ''); }
  function bookLine(b) {
    if (b.messages) return b.messages + ' messages';
    var docs = {}; (b._flat || []).forEach(function (e) { var p = splitHref(e.href).path; if (p) docs[p] = 1; });
    var n = Object.keys(docs).length; return n ? n + ' document' + (n === 1 ? '' : 's') : '';
  }

  /* ---------------------------------------------------------- the reader's own pages */
  function md(s) { return (window.marked && typeof marked.parseInline === 'function') ? marked.parseInline(esc(s)) : esc(s); }
  function paragraphs(text) { return String(text || '').split(/\n\s*\n/).map(function (p) { return '<p>' + md(p.replace(/\s*\n\s*/g, ' ')) + '</p>'; }).join(''); }
  function answersList(it) {
    if (!it.answers || !it.answers.length) return '';
    return '<ol class="book-answers">' + it.answers.map(function (a) {
      var sp = splitHref(a.href);
      return '<li><a href="#book:' + esc(current.book.id) + '/transcript/' + esc(sp.anchor || ('m' + a.message)) + '"><span class="book-answers__lead">' + md(a.lead) + '</span><span class="book-answers__at">message ' + esc(a.message) + '</span></a></li>';
    }).join('') + '</ol>';
  }
  function ownPage(html, title) {
    V.setCurrentPath('');
    V.closeDrawer();
    V.el.landing.style.display = 'none';
    document.body.classList.add('is-reading');
    V.el.githubLink.style.display = V.el.rawLink.style.display = 'none';
    V.el.spineBar.hidden = true;
    V.showRendered();
    rendered.innerHTML = html;
    V.markTree('', null);
    document.title = title + ' — ' + V.data.site.brand;
    window.scrollTo(0, 0);
    V.closeMobileSidebar();
  }
  function coverHtml(b) {
    var ways = b.parts.map(function (p) {
      var list = partEntries(b, p), first = list[0], kinds = list.length ? list[0].kind : 'place';
      var line = kinds === 'turn' ? list.length + ' messages, in the order they happened'
        : kinds === 'question' ? (p.items || []).length + ' questions, each with where it is answered'
        : list.length === 1 ? (first && first.item.title) : (function () { var d = {}; list.forEach(function (e) { d[splitHref(e.href).path] = 1; }); var nd = Object.keys(d).length; return nd === list.length ? nd + ' documents' : list.length + ' headings' + (nd > 1 ? ' in ' + nd + ' documents' : ''); })();
      var href = kinds === 'question' ? '#book:' + b.id + '/' + p.id : (first ? '#' + first.addr : '#book:' + b.id);
      return '<a class="book-way" href="' + esc(href) + '"><span class="book-way__n">' + (p.id === 'verdict' ? '' : '') + '</span><span class="book-way__t">' + esc(p.title) + '</span><span class="book-way__l">' + esc(line || '') + '</span></a>';
    }).join('');
    var answer = b.answer && b.answer.text ? '<figure class="book-cover__answer"><blockquote>' + esc(b.answer.text) + '</blockquote>' +
      '<figcaption><a href="#book:' + esc(b.id) + '/transcript/' + esc(splitHref(b.answer.href).anchor || ('m' + b.answer.message)) + '">Message ' + esc(b.answer.message) + ', the final statement</a></figcaption></figure>' : '';
    var st = (V.state.books || {})[b.id], resume = '';
    if (st && st.addr) { var e = null; for (var i = 0; i < b._flat.length; i++) if (b._flat[i].addr === st.addr) e = b._flat[i];
      if (e) resume = '<p class="book-resume"><span class="book-resume__k">Where you left off</span><a href="#' + esc(e.addr) + '">' + esc(entryLabel(e)) + '</a></p>'; }
    var contents = b.parts.map(function (p) {
      var list = partEntries(b, p).filter(function (e) { return e.depth === 0; });
      if (list.length < 2 || list[0].kind === 'turn') return '';
      var rows = list.map(function (e) {
        if (e.kind === 'question') return '<li class="book-toc__q"><a href="#' + esc(e.addr) + '"><span class="book-toc__k">Question ' + esc(questionNumber(e.item)) + '</span><span class="book-toc__t">' + esc(questionTitle(e.item)) + '</span></a><div class="book-toc__text">' + paragraphs(e.item.text) + '</div>' +
          (e.item.parts && e.item.parts.length ? '<p class="book-toc__parts">' + e.item.parts.map(function (s) { var se = findEntry(b, p, keyRef(s.key)); return '<a href="#' + esc(se ? se.addr : e.addr) + '">' + esc(s.key) + '</a>'; }).join('') + '</p>' : '') + '</li>';
        return '<li><a href="#' + esc(e.addr) + '">' + esc(e.item.title) + '</a></li>';
      }).join('');
      return '<section class="book-toc"><h2>' + esc(p.title) + '</h2><ol class="book-toc__list">' + rows + '</ol></section>';
    }).join('');
    var foot = '<footer class="book-foot"><h2>About this book</h2>' +
      '<p>This is an index, not a new text. Every line in it points at a place in a file held in the library' + (b.source ? ': ' + (b.page ? '<a href="#' + esc(b.page) + '">the page built from ' + esc(b.source) + '</a>' : '<a href="#' + esc(b.source) + '">' + esc(b.source) + '</a>') : '') +
      (b.messages ? ', ' + b.messages + ' messages as the author saved them' : '') + '. The index was written by <span class="mono">' + esc(b.generated_by || '') + '</span>; the titles of its parts are the only words in it that are not the files\u2019 own.</p></footer>';
    return '<div class="doc book-cover">' +
      '<p class="eyebrow">A book in the library' + (bookLine(b) ? ' \u00b7 ' + esc(bookLine(b)) : '') + '</p>' +
      '<h1 class="book-cover__title">' + esc(b.title) + '</h1>' + answer + resume +
      '<nav class="book-ways" aria-label="Ways into the book">' + ways + '</nav>' + contents + foot + '</div>';
  }
  function questionHtml(b, e) {
    var it = e.item, num = questionNumber(it), siblings = b._flat.filter(function (x) { return x.kind === 'question'; }), k = siblings.indexOf(e);
    var prev = siblings[k - 1], next = siblings[k + 1];
    var parts = (it.parts || []).map(function (s) {
      var se = findEntry(b, e.part, keyRef(s.key));
      return '<section class="book-q__part" id="' + esc('q-' + keyRef(s.key)) + '"><h2><span class="book-q__k">Question ' + esc(questionNumber(s)) + '</span> ' + esc(questionTitle(s)) + '</h2><div class="book-q__text book-q__text--part">' + paragraphs(s.text) + '</div>' +
        (s.answers && s.answers.length ? '<h3>Where it is answered</h3>' + answersList(s) : '') + (se ? '<p class="book-q__own"><a href="#' + esc(se.addr) + '">This part on its own page</a></p>' : '') + '</section>';
    }).join('');
    var asked = it.asked ? '<p class="book-q__asked"><a href="#' + esc(it.asked) + '">As the prompt asks it</a>' + (e.parent ? ' \u00b7 <a href="#' + esc(e.parent.addr) + '">Question ' + esc(questionNumber(e.parent.item)) + ', which it is part of</a>' : '') + '</p>' : '';
    return '<div class="doc book-page book-q">' +
      '<p class="eyebrow">Question ' + esc(num) + (e.depth ? '' : ' of ' + (e.part.items || []).length) + '</p>' +
      '<h1 class="book-q__title">' + esc(questionTitle(it)) + '</h1>' +
      '<div class="book-q__text">' + paragraphs(it.text) + '</div>' + asked +
      (it.answers && it.answers.length ? '<section class="book-q__answers"><h2>Where it is answered</h2>' + answersList(it) + '</section>' : '') +
      parts +
      '<nav class="book-pn" aria-label="Previous and next question">' +
        (prev ? '<a class="book-pn__prev" href="#' + esc(prev.addr) + '"><span aria-hidden="true">\u2190</span><span><small>Question ' + esc(questionNumber(prev.item)) + '</small>' + esc(questionTitle(prev.item)) + '</span></a>' : '<span></span>') +
        (next ? '<a class="book-pn__next" href="#' + esc(next.addr) + '"><span><small>Question ' + esc(questionNumber(next.item)) + '</small>' + esc(questionTitle(next.item)) + '</span><span aria-hidden="true">\u2192</span></a>' : '<a class="book-pn__next" href="#book:' + esc(b.id) + '/verdict"><span><small>After the questions</small>The final statement</span><span aria-hidden="true">\u2192</span></a>') +
      '</nav></div>';
  }
  function partHtml(b, p) {    // a part with questions, as one page: the questions written out in full
    var list = partEntries(b, p).filter(function (e) { return e.depth === 0; });
    return '<div class="doc book-page"><p class="eyebrow">' + esc(b.title) + '</p><h1 class="book-cover__title">' + esc(p.title) + '</h1>' +
      '<ol class="book-toc__list">' + list.map(function (e) {
        return '<li class="book-toc__q"><a href="#' + esc(e.addr) + '"><span class="book-toc__k">Question ' + esc(questionNumber(e.item)) + '</span><span class="book-toc__t">' + esc(questionTitle(e.item)) + '</span></a><div class="book-toc__text">' + paragraphs(e.item.text) + '</div>' +
          (e.item.parts && e.item.parts.length ? '<p class="book-toc__parts">' + e.item.parts.map(function (s) { var se = findEntry(b, p, keyRef(s.key)); return '<a href="#' + esc(se ? se.addr : e.addr) + '">' + esc(s.key) + '</a>'; }).join('') + '</p>' : '') + '</li>';
      }).join('') + '</ol></div>';
  }

  /* ---------------------------------------------------------- the index at the side */
  function entryLabel(e) {
    if (e.kind === 'question') return 'Question ' + questionNumber(e.item) + '. ' + questionTitle(e.item);
    if (e.kind === 'turn') return 'Message ' + e.item.message + ' \u00b7 ' + who(e.item.who, e.item);
    return e.item.title;
  }
  function navRow(b, e) {
    var a = '<a class="book-ix book-ix--' + e.kind + (e.depth ? ' book-ix--sub' : '') + '" href="#' + esc(e.addr) + '" data-addr="' + esc(e.addr) + '">';
    if (e.kind === 'question') return a + '<span class="book-ix__k">Question ' + esc(questionNumber(e.item)) + '</span><span class="book-ix__t">' + esc(questionTitle(e.item)) + '</span>' + (e.depth ? '' : '<span class="book-ix__text">' + esc(e.item.text.replace(/\s*\n\s*/g, ' ')) + '</span>') + '</a>';
    if (e.kind === 'turn') return a + '<span class="book-ix__k">' + esc(e.item.message) + '</span><span class="book-ix__who">' + esc(who(e.item.who, e.item)) + '</span><span class="book-ix__opens">' + esc(plain(e.item.opens)) + '</span></a>';
    return a + '<span class="book-ix__t">' + esc(e.item.title) + '</span></a>';
  }
  function buildNav(b) {
    var open = ((V.state.books || {})[b.id] || {}).open || {};
    var html = '<div class="book-nav__head"><a class="book-nav__back" href="#" data-home>\u2190 The library</a>' +
      '<a class="book-nav__title" href="#book:' + esc(b.id) + '">' + esc(b.title) + '</a>' + (bookLine(b) ? '<span class="book-nav__meta">' + esc(bookLine(b)) + '</span>' : '') + '</div>';
    html += b.parts.map(function (p) {
      var list = partEntries(b, p), top = list.filter(function (e) { return e.depth === 0; });
      var isOpen = (p.id in open) ? !!open[p.id] : !(top.length && top[0].kind === 'turn');
      var rows = top.map(function (e) {
        var subs = list.filter(function (x) { return x.parent === e; });
        var sub = subs.length ? '<details class="book-sub"><summary>' + subs.length + ' part' + (subs.length === 1 ? '' : 's') + ': ' + esc(subs.map(function (s) { return s.item.key; }).join(', ')) + '</summary>' + subs.map(function (s) { return navRow(b, s); }).join('') + '</details>' : '';
        return navRow(b, e) + sub;
      }).join('');
      var meta = top.length ? (top[0].kind === 'turn' ? top.length + ' messages' : top[0].kind === 'question' ? top.length + ' questions' : top.length) : '';
      return '<details class="book-part" data-part="' + esc(p.id) + '"' + (isOpen ? ' open' : '') + '><summary><span class="book-part__t">' + esc(partName(p)) + '</span><span class="book-part__meta">' + esc(String(meta)) + '</span></summary><div class="book-part__body">' + rows + '</div></details>';
    }).join('');
    bookNav.innerHTML = html;
    builtNav = b.id;
    bookNav.querySelector('[data-home]').addEventListener('click', function (e) { e.preventDefault(); location.hash = ''; });
    bookNav.addEventListener('toggle', function (ev) {
      var d = ev.target; if (!d.matches || !d.matches('details.book-part')) return;
      var st = bookState(b.id); st.open = st.open || {}; st.open[d.getAttribute('data-part')] = d.open ? 1 : 0; V.save();
    }, true);
  }
  function markNav(e) {
    var olds = bookNav.querySelectorAll('.is-active'); for (var i = 0; i < olds.length; i++) olds[i].classList.remove('is-active');
    if (!e) return;
    var row = bookNav.querySelector('[data-addr="' + e.addr.replace(/["\\]/g, '\\$&') + '"]');
    if (!row) return;
    row.classList.add('is-active');
    var d = row.parentElement; while (d && d !== bookNav) { if (d.tagName === 'DETAILS') d.open = true; d = d.parentElement; }
    if (!V.isMobile()) { var rc = row.getBoundingClientRect(), nr = bookNav.getBoundingClientRect(); if (rc.top < nr.top || rc.bottom > nr.bottom) row.scrollIntoView({ block: 'center' }); }
  }
  function bookState(id) { V.state.books = V.state.books || {}; return V.state.books[id] = V.state.books[id] || {}; }

  /* ---------------------------------------------------------- the bar: where you are in the book */
  function barHtml(b, e) {
    var prev, next, here, k, list;
    if (e.kind === 'turn') {
      list = partEntries(b, e.part); k = list.indexOf(e); prev = list[k - 1]; next = list[k + 1];
      here = '<span class="book-bar__k">Message ' + esc(e.item.message) + ' of ' + list.length + '</span><span class="book-bar__t">' + esc(who(e.item.who, e.item)) + '</span>';
    } else if (e.kind === 'question') {
      list = b._flat.filter(function (x) { return x.kind === 'question'; }); k = list.indexOf(e); prev = list[k - 1]; next = list[k + 1];
      here = '<span class="book-bar__k">' + esc(partName(e.part)) + '</span><span class="book-bar__t">Question ' + esc(questionNumber(e.item)) + '</span>';
    } else {
      list = b._flat.filter(function (x) { return x.kind === 'place'; }); k = list.indexOf(e); prev = list[k - 1]; next = list[k + 1];
      here = '<span class="book-bar__k">' + esc(partName(e.part)) + (list.filter(function (x) { return x.part === e.part; }).length > 1 ? ' \u00b7 ' + (partEntries(b, e.part).indexOf(e) + 1) + ' of ' + partEntries(b, e.part).length : '') + '</span><span class="book-bar__t">' + esc(e.item.title) + '</span>';
    }
    var nav = function (x, cls, arrow) { return x ? '<a class="book-bar__nav ' + cls + '" href="#' + esc(x.addr) + '" title="' + esc(entryLabel(x)) + '">' + (arrow === 'prev' ? '<span aria-hidden="true">\u2190</span>' : '') + '<span class="book-bar__label">' + esc(shortLabel(x)) + '</span>' + (arrow === 'next' ? '<span aria-hidden="true">\u2192</span>' : '') + '</a>' : '<span class="book-bar__nav ' + cls + ' is-empty"></span>'; };
    return '<div class="book-bar__head"><span class="book-bar__kind">Book</span><a class="book-bar__title" href="#book:' + esc(b.id) + '">' + esc(b.title) + '</a>' +
      '<button type="button" class="book-bar__index" data-book-index>Index</button></div>' +
      '<div class="book-bar__row">' + nav(prev, 'book-bar__prev', 'prev') + '<div class="book-bar__here">' + here + '</div>' + nav(next, 'book-bar__next', 'next') + '</div>';
  }
  function shortLabel(e) {
    if (e.kind === 'turn') return 'Message ' + e.item.message + ' \u00b7 ' + who(e.item.who, e.item);
    if (e.kind === 'question') return 'Question ' + questionNumber(e.item);
    return e.item.title;
  }
  function showBar(html) { bookBar.innerHTML = html; bookBar.hidden = false; document.documentElement.style.setProperty('--book-bar-h', bookBar.offsetHeight + 'px'); }
  bookBar.addEventListener('click', function (ev) {
    if (ev.target.closest && ev.target.closest('[data-book-index]')) { var btn = $('mobile-menu-btn'); if (btn) btn.click(); }
  });

  /* ---------------------------------------------------------- entering and leaving a book */
  function enter(b) {
    if (builtNav !== b.id) buildNav(b);
    document.body.classList.add('is-book');
    bookNav.hidden = false; treeNav.hidden = true; if (search) search.hidden = true;
  }
  function leave() {
    current = null; hosting = null;
    document.body.classList.remove('is-book');
    bookNav.hidden = true; treeNav.hidden = false; if (search) search.hidden = false;
    bookBar.hidden = true; bookBar.innerHTML = '';
  }
  function remember(b, e) { var st = bookState(b.id); st.addr = e.addr; st.when = Date.now(); V.save(); }

  // the transcript page, when it is read inside the book, hands its own top index to the sidebar
  // the same rules the patch to scripts/build-claude-session-page.js carries; injected here until the page's build has them
  var IN_BOOK_CSS = '.bubble p:target{outline:0;box-shadow:-3px 0 0 var(--link);padding-left:12px;margin-left:-15px;border-radius:0}' +
    '.in-book .top .index{display:none}.in-book .top{margin-bottom:12px}.in-book .top h1{font-size:1.35em;margin-top:0}';
  // the author, 2 October 2026: the transcript pages keep their own light theme inside the book; no palette is injected
  function dressIframe() {
    try {
      var doc = iframe.contentDocument; if (!doc || !doc.documentElement) return;
      if (current && hostingKind() === 'turn') {
        doc.documentElement.classList.add('in-book');
        if (!doc.getElementById('egpt-in-book')) { var s = doc.createElement('style'); s.id = 'egpt-in-book'; s.textContent = IN_BOOK_CSS; (doc.head || doc.documentElement).appendChild(s); }
      } else doc.documentElement.classList.remove('in-book');
    } catch (e) { /* a page from another origin keeps its own look */ }
  }
  function hostingKind() { return current && current.entry ? current.entry.kind : ''; }
  iframe.addEventListener('load', dressIframe);

  /* ---------------------------------------------------------- open an address */
  function open(addr) {
    if (window.EGPTJournal) window.EGPTJournal.leave();
    if (addr.indexOf('shelf:') === 0) { openShelf(addr.slice(6)); return; }
    var rest = addr.slice(5), seg = rest.split('/'), id = seg[0], partId = seg[1] || '', ref = seg.slice(2).join('/');
    fetchBook(id).then(function (b) {
      enter(b);
      if (!partId) { current = { book: b, entry: null }; ownPage(coverHtml(b), b.title); bookBar.hidden = true; markNav(null); shelfmarkBook(b, null); return; }
      var part = partById(b, partId);
      if (!part) { notFound(b, addr); return; }
      var e = findEntry(b, part, ref);
      if (!e) { if (!ref && part.items && part.items.length && kindOfItem(part.items[0]) === 'question') { current = { book: b, entry: null }; ownPage(partHtml(b, part), part.title); bookBar.hidden = true; markNav(null); shelfmarkBook(b, null); return; } notFound(b, addr); return; }
      if (!ref && e.kind === 'question') { current = { book: b, entry: null }; ownPage(partHtml(b, part), part.title); bookBar.hidden = true; markNav(null); shelfmarkBook(b, null); return; }
      show(b, e, e.kind === 'turn' && /^m\d+-/.test(ref) ? ref : '');
    }).catch(function (err) { console.warn('reader.js: ' + err.message); leave(); rendered.innerHTML = '<div class="doc"><div class="notice"><p>This book is not in this bundle: <span class="mono">' + esc(addr) + '</span>.</p><p><a href="#">The library</a></p></div></div>'; V.showRendered(); V.el.landing.style.display = 'none'; document.body.classList.add('is-reading'); });
  }
  function notFound(b, addr) {
    current = { book: b, entry: null };
    ownPage('<div class="doc"><div class="notice"><p>There is no such place in this book: <span class="mono">' + esc(addr) + '</span>.</p><p><a href="#book:' + esc(b.id) + '">The book\u2019s cover</a></p></div></div>', b.title);
    bookBar.hidden = true;
  }
  function show(b, e, anchorInside) {
    current = { book: b, entry: e };
    remember(b, e); markNav(e);
    if (e.kind === 'question') { ownPage(questionHtml(b, e), 'Question ' + questionNumber(e.item) + ' \u00b7 ' + b.title); showBar(barHtml(b, e)); shelfmarkBook(b, e); return; }
    var sp = splitHref(e.href);
    if (anchorInside) sp.anchor = anchorInside;      // a place inside the turn: an answer, a verdict line
    if (!sp.path || !V.files[sp.path]) {
      ownPage('<div class="doc"><div class="notice"><p>' + esc(entryLabel(e)) + ' is a page this bundle does not hold yet: <span class="mono">' + esc(sp.path || '(no file)') + '</span>.</p><p>It enters the library when the file is committed and the site rebuilt.</p></div></div>', entryLabel(e));
      showBar(barHtml(b, e)); return;
    }
    hosting = e;
    if (V.currentPath() === sp.path && e.kind === 'turn') {           // the same page: move inside it, no reload
      try { iframe.contentWindow.location.replace('#' + (sp.anchor || '')); } catch (err) { iframe.src = V.rawUrl(sp.path) + (sp.anchor ? '#' + sp.anchor : ''); }
      decorate(sp.path, sp.anchor); hosting = null; return;
    }
    if (V.currentPath() === sp.path) { V.scrollToAnchor(sp.anchor); decorate(sp.path, sp.anchor); hosting = null; return; }
    V.navigate(sp.path, sp.anchor);
    hosting = null;
  }
  // after the viewer has rendered a document for the book: the bar, the shelf mark, the title
  function footNav(b, e) {
    var list = b._flat.filter(function (x) { return x.kind === e.kind; }), k = list.indexOf(e), prev = list[k - 1], next = list[k + 1];
    if (!prev && !next) return '';
    var side = function (x, cls, arrow) { return x ? '<a class="' + cls + '" href="#' + esc(x.addr) + '">' + (arrow === 'prev' ? '<span aria-hidden="true">\u2190</span>' : '') + '<span><small>' + esc(partName(x.part)) + '</small>' + esc(shortLabel(x)) + '</span>' + (arrow === 'next' ? '<span aria-hidden="true">\u2192</span>' : '') + '</a>' : '<span></span>'; };
    return '<nav class="book-pn" aria-label="Previous and next in the book">' + side(prev, 'book-pn__prev', 'prev') + side(next, 'book-pn__next', 'next') + '</nav>';
  }
  var footWatch = null;
  function watchFoot(b, e) {
    if (footWatch) { footWatch.disconnect(); footWatch = null; }
    var put = function () { var doc = rendered.querySelector('.doc'); if (!doc || doc.querySelector('.book-pn') || !current || current.entry !== e) return false; doc.insertAdjacentHTML('beforeend', footNav(b, e)); return true; };
    if (put()) return;
    footWatch = new MutationObserver(function () { if (put() && footWatch) { footWatch.disconnect(); footWatch = null; } });
    footWatch.observe(rendered, { childList: true, subtree: true });
    setTimeout(function () { if (footWatch) { footWatch.disconnect(); footWatch = null; } }, 15000);
  }
  function decorate(path, anchor) {
    var b = current.book, e = current.entry;
    showBar(barHtml(b, e));
    if (e.kind === 'place') watchFoot(b, e);
    V.el.spineBar.hidden = true;
    shelfmarkBook(b, e);
    document.title = entryLabel(e) + ' \u00b7 ' + b.title + ' \u2014 ' + V.data.site.brand;
    dressIframe();
    V.closeMobileSidebar();
  }
  function shelfmarkBook(b, e) {
    var html = '<a class="shelfmark__shelf" href="#book:' + esc(b.id) + '"><span class="shelfmark__no">\u25a0</span>' + esc(b.title) + '</a>';
    if (e) html += '<span class="shelfmark__sep">/</span><span class="shelfmark__dir">' + esc(e.part.title) + '</span><span class="shelfmark__sep">/</span><span class="shelfmark__file">' + esc(shortLabel(e)) + '</span>';
    V.el.shelfmark.innerHTML = html;
  }

  /* ---------------------------------------------------------- the viewer calls back after every document */
  function onNavigate(path, anchor, kind) {
    if (hosting) { decorate(path, anchor); return; }
    // a plain address: the reader is outside any book, or has stepped out of one by following a link
    if (current) { leave(); }
    markShelf(path);
    var inBooks = BOOKS.filter(function (s) { return s.paths.indexOf(path) >= 0; });
    if (!inBooks.length) { bookBar.hidden = true; bookBar.innerHTML = ''; return; }
    var s = inBooks[0];
    var target = '#book:' + s.id;
    var done = function (addr) {
      showBar('<div class="book-bar__head book-bar__head--slim"><span class="book-bar__kind">Book</span><span class="book-bar__in">This page is in <a class="book-bar__title" href="#book:' + esc(s.id) + '">' + esc(s.title) + '</a></span>' +
        '<a class="book-bar__open" href="' + esc(addr) + '">Read it in the book \u2192</a></div>');
    };
    if (cache[s.id]) { var e = entryForPath(cache[s.id], path, anchor); done(e ? '#' + e.addr : target); }
    else { done(target); fetchBook(s.id).then(function (b) { if (V.currentPath() !== path || current) return; var e2 = entryForPath(b, path, anchor); if (e2) done('#' + e2.addr); }, function () {}); }
  }

  /* ============================================================ the shelves: #shelf:<id>, from site-src/shelves.json */
  var SHELVES = V.data.shelves || [];
  // the shelf a document sits on: named as a place to start, or by its folder; when it is one shelf, the shelf mark says so
  function shelvesFor(path) {
    var named = SHELVES.filter(function (sh) { return (sh.start || []).concat(sh.guide ? [sh.guide] : []).some(function (p) { return p.split('#')[0] === path; }); });
    if (named.length) return named;
    return SHELVES.filter(function (sh) { return (sh.folders || []).some(function (d) { return path.indexOf(d + '/') === 0; }); });
  }
  function markShelf(path) {
    var on = shelvesFor(path), sm = V.el.shelfmark;
    var olds = treeNav.querySelectorAll('.tree-shelf.is-active'); for (var i = 0; i < olds.length; i++) olds[i].classList.remove('is-active');
    if (on.length !== 1 || !sm) return;
    sm.insertAdjacentHTML('afterbegin', '<a class="shelfmark__shelf shelfmark__onshelf" href="#shelf:' + esc(on[0].id) + '" title="The shelf this document is on">' + esc(on[0].title) + '</a><span class="shelfmark__sep">/</span>');
    var row = treeNav.querySelector('.tree-shelf[data-shelf="' + on[0].id.replace(/["\\]/g, '\\$&') + '"]'); if (row) row.classList.add('is-active');
  }
  function shelfById(id) { for (var i = 0; i < SHELVES.length; i++) if (SHELVES[i].id === id) return SHELVES[i]; return null; }
  function spineById(id) { var S = V.data.spines || []; for (var i = 0; i < S.length; i++) if (S[i].id === id) return S[i]; return null; }
  function moduleByDir(dir) { var M = V.data.modules || []; for (var i = 0; i < M.length; i++) if (M[i].dir === dir) return M[i]; return null; }
  function openShelf(id) {
    var sh = shelfById(id);
    if (current) leave();
    if (!sh) { ownPage('<div class="doc"><div class="notice"><p>There is no shelf <span class="mono">' + esc(id) + '</span> in this library.</p><p><a href="#">The library</a></p></div></div>', 'Shelf'); return; }
    var k = SHELVES.indexOf(sh), prev = SHELVES[k - 1], next = SHELVES[k + 1];
    var start = (sh.start || []).map(function (p) { var sp = splitHref(p); return '<li><a href="#' + esc(p) + '">' + esc(V.titleFor(sp.path)) + '</a><span class="shelf-page__ext">' + esc(V.extOf(sp.path)) + '</span></li>'; }).join('');
    var books = (sh.books || []).map(function (bid) { var s = summary(bid); return s ? '<a class="book-way" href="#book:' + esc(bid) + '"><span class="book-way__t">' + esc(s.title) + '</span><span class="book-way__l">' + esc(s.messages ? s.messages + ' messages, with an index' : 'a book, with an index') + '</span></a>' : ''; }).join('');
    var lists = (sh.lists || []).map(function (lid) { var sp = spineById(lid); if (!sp) return ''; var first = sp.stops[0].read[0];
      return '<a class="list-card" href="#' + esc(first) + '" data-spine="' + esc(sp.id) + '" style="--list-color:' + esc(sp.color || 'var(--accent)') + '"><span class="list-card__kind">Reading list</span><span class="list-card__title">' + esc(sp.title) + '</span><span class="list-card__blurb">' + esc(sp.blurb || '') + '</span><span class="list-card__meter" data-spine-meter="' + esc(sp.id) + '"><span class="list-card__count">' + sp.stops.length + ' stops</span></span></a>'; }).join('');
    var folders = (sh.folders || []).map(function (dir) { var m = moduleByDir(dir); if (!m) return ''; var full = m.entry ? m.dir + '/' + m.entry : ''; var mark = /^[0-9]{2}_/.test(m.dir) ? m.dir.slice(0, 2) : '\u00b7\u00b7';
      return '<a class="shelf-card" href="#' + esc(full || (m.dir + '/README.md')) + '"><span class="shelf-card__mark">' + esc(mark) + '</span><span class="shelf-card__body"><span class="shelf-card__name">' + esc(m.name || m.label) + '</span><span class="shelf-card__line">' + esc(m.line || '') + '</span><span class="shelf-card__dir">' + esc(m.dir) + '/</span></span></a>'; }).join('');
    var outside = (sh.outside || []).map(function (o) { return '<a class="book-way book-way--out" href="' + esc(o.href) + '" target="_blank" rel="noopener"><span class="book-way__t">' + esc(o.title) + ' \u2197</span><span class="book-way__l">' + esc(o.line || '') + '</span></a>'; }).join('');
    var html = '<div class="doc shelf-page">' +
      '<p class="eyebrow">Shelf ' + (k + 1) + ' of ' + SHELVES.length + '</p><h1 class="book-cover__title">' + esc(sh.title) + '</h1>' +
      (sh.line ? '<p class="shelf-page__line">' + esc(sh.line) + '</p>' : '') +
      (sh.question ? '<p class="shelf-page__q"><a href="index.html#q' + esc(String(sh.question.slide || 0)) + '" title="Asked on the front page, with its answer in the source\u2019s words">' + esc(sh.question.text) + '</a></p>' : '') +
      (start ? '<section class="shelf-page__sec"><h2>Start here</h2><ol class="shelf-page__start">' + start + '</ol></section>' : '') +
      (books || outside ? '<section class="shelf-page__sec"><h2>' + (books ? 'Read as a book' : 'Outside the library') + '</h2><div class="book-ways">' + books + outside + '</div></section>' : '') +
      (lists ? '<section class="shelf-page__sec"><h2>Reading lists on this shelf</h2><div class="list-grid">' + lists + '</div></section>' : '') +
      (folders ? '<section class="shelf-page__sec"><h2>The folders on this shelf</h2><div class="shelf-grid">' + folders + '</div></section>' : '') +
      '<nav class="book-pn" aria-label="Previous and next shelf">' + (prev ? '<a class="book-pn__prev" href="#shelf:' + esc(prev.id) + '"><span aria-hidden="true">\u2190</span><span><small>Shelf</small>' + esc(prev.title) + '</span></a>' : '<span></span>') + (next ? '<a class="book-pn__next" href="#shelf:' + esc(next.id) + '"><span><small>Shelf</small>' + esc(next.title) + '</span><span aria-hidden="true">\u2192</span></a>' : '<span></span>') + '</nav></div>';
    ownPage(html, sh.title);
    bookBar.hidden = true;
    V.el.shelfmark.innerHTML = '<a class="shelfmark__shelf" href="#">The library</a><span class="shelfmark__sep">/</span><span class="shelfmark__file">' + esc(sh.title) + '</span>';
    var act = treeNav.querySelector('.tree-shelf[data-shelf="' + id.replace(/["\\]/g, '\\$&') + '"]'); var olds = treeNav.querySelectorAll('.tree-shelf.is-active'); for (var i = 0; i < olds.length; i++) olds[i].classList.remove('is-active'); if (act) act.classList.add('is-active');
    if (window.EGPTViewer.updateMeters) window.EGPTViewer.updateMeters();
  }

  window.EGPTReader = { open: open, leave: leave, onNavigate: onNavigate, books: BOOKS, shelves: SHELVES };
})();
