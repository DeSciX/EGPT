/* ============================================================
   EGPT-Evidence library viewer — site.js
   The reading room: shelves (the collection's folders), reading lists (site-src/spine.json),
   and one document at a time, with its provenance beside it rather than in the reading line.
   Vanilla JS, no framework, no build step. Data: window.SITE_DATA (scripts/generate-site.js).
   ============================================================ */
(function () {
  'use strict';

  var DATA = window.SITE_DATA;
  if (!DATA) { console.warn('SITE_DATA not found — site.js cannot initialize.'); return; }
  if (!DATA.site || !DATA.site.raw_url || !DATA.site.repo_url) {
    throw new Error('SITE_DATA.site.raw_url and SITE_DATA.site.repo_url are required (set them in site-src/_meta.json)');
  }
  var RAW_BASE = DATA.site.raw_url;
  var REPO_BASE = DATA.site.repo_url;
  var FILES = {};
  for (var fi = 0; fi < (DATA.files || []).length; fi++) FILES[DATA.files[fi]] = true;
  var MODULES = DATA.modules || [];
  var SPINES = DATA.spines || [];
  var TITLES = DATA.titles || {};
  var currentPath = '';

  var $ = function (id) { return document.getElementById(id); };
  var treeNav = $('tree-nav'), landing = $('landing'), iframe = $('content-iframe'), rendered = $('content-rendered');
  var shelfmark = $('content-breadcrumb'), githubLink = $('content-github-link'), rawLink = $('content-raw-link');
  var sidebar = $('sidebar'), spineBar = $('spine-bar'), drawer = $('record-drawer'), filterInput = $('tree-filter');

  /* ============================================================ utilities */
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  function rawUrl(p) { return RAW_BASE + '/' + p.split('/').map(encodeURIComponent).join('/'); }
  function extOf(p) { var n = p.split('/').pop(); var k = n.lastIndexOf('.'); return k < 0 ? '' : n.slice(k + 1).toLowerCase(); }
  function baseName(p) { return p.split('/').pop(); }
  function humanName(p) { return baseName(p).replace(/\.[^.]+$/, '').replace(/_+/g, ' '); }
  function cssEsc(s) { return String(s).replace(/["\\]/g, '\\$&'); }
  function resolvePath(fromFile, href) {
    var base = fromFile.indexOf('/') >= 0 ? fromFile.slice(0, fromFile.lastIndexOf('/')) : '';
    var parts = (base ? base.split('/') : []).concat(href.split('/')), out = [];
    for (var i = 0; i < parts.length; i++) { var s = parts[i]; if (s === '' || s === '.') continue; if (s === '..') { out.pop(); continue; } out.push(s); }
    return out.join('/');
  }
  // GitHub's heading slugs, so "#a-dark-age-of-idiocy-…" in a link or a reading list lands on the heading
  function slug(t) { return String(t).trim().toLowerCase().replace(/[^\w\s\u00C0-\u024F-]/g, '').replace(/\s/g, '-'); }
  function moduleOf(p) { for (var i = 0; i < MODULES.length; i++) if (p.indexOf(MODULES[i].dir + '/') === 0) return MODULES[i]; return null; }
  function highlightLabel(p) {
    var m = moduleOf(p); if (!m) return '';
    for (var i = 0; i < (m.highlights || []).length; i++) if (m.dir + '/' + m.highlights[i].file === p) return m.highlights[i].label || '';
    return '';
  }
  function titleFor(p) { return TITLES[p] || highlightLabel(p) || humanName(p); }
  function whenDefined(name, ms) {
    return new Promise(function (resolve, reject) {
      var t0 = Date.now();
      (function poll() { if (typeof window[name] !== 'undefined') return resolve(window[name]); if (Date.now() - t0 > ms) return reject(new Error(name + ' did not load')); setTimeout(poll, 80); })();
    });
  }
  var scriptPromises = {};
  function loadScript(src, globalName) {
    if (typeof window[globalName] !== 'undefined') return Promise.resolve(window[globalName]);
    if (!scriptPromises[src]) scriptPromises[src] = new Promise(function (resolve, reject) {
      var s = document.createElement('script'); s.src = src; s.async = true;
      s.onload = function () { typeof window[globalName] !== 'undefined' ? resolve(window[globalName]) : reject(new Error(globalName + ' missing')); };
      s.onerror = function () { delete scriptPromises[src]; reject(new Error('could not load ' + src)); };
      document.head.appendChild(s);
    });
    return scriptPromises[src];
  }

  /* ============================================================ the reader's place (this browser only) */
  var STORE_KEY = 'egpt.library.v1';
  function load() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
  var state = load();
  state.visited = state.visited || {};
  function save() { try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* private window: the bar still works */ } }

  /* ============================================================ integrity data, fetched on demand */
  var checksums = null, quotes = null;
  function getChecksums() {
    if (!checksums) checksums = fetch(rawUrl('CHECKSUMS.txt')).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (t) {
      var map = {}; t.split('\n').forEach(function (l) { var m = l.match(/^([0-9a-f]{64})\s+(.+)$/); if (m) map[m[2]] = m[1]; }); return map;
    }).catch(function () { return {}; });
    return checksums;
  }
  function getQuotes() {
    if (!quotes) quotes = fetch(rawUrl('05_CORPUS/corpus/quotes.json')).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (j) {
      var byId = {}, byFile = {};
      (j.records || []).forEach(function (r) { byId[r.id] = r; var f = r.source && r.source.file; if (f) (byFile[f] = byFile[f] || []).push(r); });
      return { byId: byId, byFile: byFile };
    }).catch(function () { return { byId: {}, byFile: {} }; });
    return quotes;
  }

  /* ============================================================ reading lists */
  function stopPaths(stop) { return stop.read.map(function (r) { return r.split('#')[0]; }); }
  function spineById(id) { for (var i = 0; i < SPINES.length; i++) if (SPINES[i].id === id) return SPINES[i]; return null; }
  // a stop that names this exact heading wins over one that names the whole file
  function locate(spine, path, anchor) {
    var i;
    if (anchor) for (i = 0; i < spine.stops.length; i++) if (spine.stops[i].read.indexOf(path + '#' + anchor) >= 0) return i;
    for (i = 0; i < spine.stops.length; i++) if (stopPaths(spine.stops[i]).indexOf(path) >= 0) return i;
    return -1;
  }
  function listsContaining(path) { return SPINES.filter(function (s) { return locate(s, path) >= 0; }); }
  function queryList() { var m = location.search.match(/[?&]list=([^&]+)/); return m ? decodeURIComponent(m[1]) : ''; }
  function activeSpineFor(path) {
    var want = [queryList(), state.active];
    for (var i = 0; i < want.length; i++) { var s = want[i] && spineById(want[i]); if (s && locate(s, path) >= 0) return s; }
    return listsContaining(path)[0] || null;
  }
  function visitedOf(spine, st) { return ((state.visited[spine.id] || {})[st.id]) || []; }
  function markVisited(spine, i, path) {
    var v = state.visited[spine.id] = state.visited[spine.id] || {}, st = spine.stops[i];
    v[st.id] = v[st.id] || []; if (v[st.id].indexOf(path) < 0) v[st.id].push(path);
  }
  function stopDone(spine, st) { return visitedOf(spine, st).length > 0; }
  function doneCount(spine) { var n = 0; spine.stops.forEach(function (st) { if (stopDone(spine, st)) n++; }); return n; }
  function stopName(st) { return st.label && st.label !== st.title ? st.label : st.title; }
  function spineLink(spine, ref, cls, inner, title) {
    return '<a class="' + cls + '" href="' + esc('#' + ref) + '" data-spine="' + esc(spine.id) + '"' + (title ? ' title="' + esc(title) + '"' : '') + '>' + inner + '</a>';
  }

  function renderSpineBar(path, anchor) {
    var spine = activeSpineFor(path);
    if (!spine) { spineBar.hidden = true; spineBar.innerHTML = ''; return null; }
    var i = locate(spine, path, anchor), st = spine.stops[i];
    state.active = spine.id; state.last = { path: path, spine: spine.id };
    markVisited(spine, i, path); save();
    var prev = spine.stops[i - 1], next = spine.stops[i + 1];
    var dots = spine.stops.map(function (s, k) {
      var cls = 'spine-dot' + (k === i ? ' is-current' : '') + (stopDone(spine, s) ? ' is-done' : '');
      return spineLink(spine, s.read[0], cls, '<span class="visually-hidden">' + esc((k + 1) + '. ' + stopName(s)) + '</span>', (k + 1) + '. ' + stopName(s) + (s.question ? ' — ' + s.question : ''));
    }).join('');
    var reads = st.read.length > 1 ? '<ol class="spine-reads" aria-label="In this stop">' + st.read.map(function (r) {
      var p = r.split('#')[0], on = p === path, seen = visitedOf(spine, st).indexOf(p) >= 0;
      return '<li' + (on ? ' class="is-current" aria-current="page"' : '') + '>' + spineLink(spine, r, 'spine-read', (seen && !on ? '<span class="tick" aria-label="read">✓</span>' : '') + '<span class="spine-read__t">' + esc(titleFor(p)) + '</span><span class="spine-read__ext">' + esc(extOf(p)) + '</span>') + '</li>';
    }).join('') + '</ol>' : '';
    var others = listsContaining(path).filter(function (s) { return s.id !== spine.id; });
    var also = others.length ? '<span class="spine-also">Also on ' + others.map(function (s) { return spineLink(s, path, '', esc(s.short || s.title)); }).join(', ') + '</span>' : '';
    spineBar.style.setProperty('--list-color', spine.color || 'var(--accent)');
    spineBar.innerHTML =
      '<div class="spine-head">' +
        '<span class="spine-kind">Reading list</span>' + spineLink(spine, spine.stops[0].read[0], 'spine-title', esc(spine.title)) +
        '<span class="spine-count">Stop ' + (i + 1) + ' of ' + spine.stops.length + ' · ' + doneCount(spine) + ' read</span>' + also +
      '</div>' +
      '<div class="spine-track" role="navigation" aria-label="Stops on this reading list">' + dots + '</div>' +
      '<div class="spine-stop">' +
        (prev ? spineLink(spine, prev.read[0], 'spine-nav spine-nav--prev', '<span aria-hidden="true">←</span><span class="spine-nav__label">' + esc(stopName(prev)) + '</span>') : '<span class="spine-nav spine-nav--prev is-empty"></span>') +
        '<div class="spine-here"><span class="spine-here__title">' + esc(stopName(st)) + '</span>' +
          (st.question ? '<span class="spine-here__q">' + esc(st.question) + '</span>' : '') +
          (st.anchor ? '<span class="spine-here__anchor">' + esc(st.anchor) + '</span>' : '') + '</div>' +
        (next ? spineLink(spine, next.read[0], 'spine-nav spine-nav--next', '<span class="spine-nav__label">' + esc(stopName(next)) + '</span><span aria-hidden="true">→</span>') : '<span class="spine-nav spine-nav--next is-end">End of the list</span>') +
      '</div>' + reads;
    spineBar.hidden = false;
    return { spine: spine, index: i, stop: st };
  }

  /* ============================================================ sidebar: reading lists, the seven reasons, the shelves */
  function fileRow(p, label, extra) {
    var ext = extOf(p);
    return '<a class="tree-file" href="' + esc('#' + p) + '" data-path="' + esc(p) + '">' +
      '<span class="tree-file__name">' + esc(label || humanName(p)) + (extra || '') + '</span>' +
      (ext ? '<span class="tree-file__ext">' + esc(ext) + '</span>' : '') + '</a>';
  }
  function group(id, title, inner, cls) {
    return '<details class="tree-group' + (cls ? ' ' + cls : '') + '" data-group="' + esc(id) + '">' +
      '<summary>' + title + '</summary><div class="tree-group__body">' + inner + '</div></details>';
  }
  function listGroup(s) {
    var stops = s.stops.map(function (st, k) {
      return '<a class="tree-stop" href="' + esc('#' + st.read[0]) + '" data-spine="' + esc(s.id) + '" data-stop="' + esc(st.id) + '">' +
        '<span class="tree-stop__n">' + (k + 1) + '</span><span class="tree-stop__t">' + esc(stopName(st)) +
        (st.question ? '<small>' + esc(st.question) + '</small>' : '') + '</span></a>';
    }).join('');
    var head = '<span class="tree-dot" style="background:' + esc(s.color || 'var(--accent)') + '"></span><span class="tree-group__title">' + esc(s.title) + '</span><span class="tree-group__meta" data-spine-meter="' + esc(s.id) + '"></span>';
    return group('list:' + s.id, head, stops, 'tree-group--list');
  }
  function buildTree() {
    var lists = SPINES.filter(function (s) { return !s.idea; }), ideaLists = SPINES.filter(function (s) { return s.idea; });
    var SHELVES = DATA.shelves || [];
    var html = SHELVES.length ? '<p class="tree-heading">The shelves</p>' + SHELVES.map(function (sh, i) {
      return '<a class="tree-shelf" href="#shelf:' + esc(sh.id) + '" data-shelf="' + esc(sh.id) + '"><span class="tree-shelf__n">' + (i + 1 < 10 ? '0' : '') + (i + 1) + '</span><span class="tree-shelf__t">' + esc(sh.title) + '</span></a>';
    }).join('') : '';
    html += '<p class="tree-heading">Reading lists</p>' + lists.map(listGroup).join('');
    html += '<p class="tree-heading">You are here to…</p>' + ideaLists.map(listGroup).join('');
    html += '<p class="tree-heading">The folders</p>';
    html += MODULES.map(function (m) {
      var inner = '';
      if (m.highlights && m.highlights.length) inner += '<p class="tree-sub">Start here</p>' + m.highlights.map(function (h) { return fileRow(m.dir + '/' + h.file, h.label || humanName(h.file)); }).join('');
      (m.subsections || []).forEach(function (sub) {
        var rows = (sub.files || []).map(function (f) { return fileRow(m.dir + '/' + f, humanName(f)); }).join('');
        inner += sub.title === 'Files' ? '<p class="tree-sub">All files</p>' + rows
          : group('dir:' + m.dir + '/' + sub.title, '<span class="tree-folder">' + esc(sub.title) + '</span><span class="tree-group__meta">' + (sub.files || []).length + '</span>', rows, 'tree-group--folder');
      });
      var mark = /^[0-9]{2}_/.test(m.dir) ? m.dir.slice(0, 2) : '··';
      var head = '<span class="tree-mark">' + esc(mark) + '</span><span class="tree-group__title">' + esc(m.name || m.label) + '<small>' + esc(m.line || '') + '</small></span>';
      return group('shelf:' + m.dir, head, inner, 'tree-group--shelf');
    }).join('');
    html += '<div class="tree-results" id="tree-results" hidden></div>';
    treeNav.innerHTML = html;
    treeNav.addEventListener('toggle', function (e) {
      var d = e.target; if (!d.matches || !d.matches('details[data-group]')) return;
      state.open = state.open || {};
      if (d.open) state.open[d.getAttribute('data-group')] = 1; else delete state.open[d.getAttribute('data-group')];
      save();
    }, true);
    Object.keys(state.open || {}).forEach(function (g) { var d = treeNav.querySelector('details[data-group="' + cssEsc(g) + '"]'); if (d) d.open = true; });
  }
  function updateMeters() {
    SPINES.forEach(function (s) {
      var n = doneCount(s), els = document.querySelectorAll('[data-spine-meter="' + cssEsc(s.id) + '"]');
      for (var i = 0; i < els.length; i++) {
        if (els[i].classList.contains('list-card__meter')) {
          els[i].innerHTML = '<span class="meter" aria-hidden="true"><span style="width:' + Math.round(100 * n / s.stops.length) + '%"></span></span><span class="list-card__count">' + (n ? n + ' of ' + s.stops.length + ' stops read' : s.stops.length + ' stops') + '</span>';
        } else els[i].textContent = n ? n + '/' + s.stops.length : String(s.stops.length);
      }
    });
  }
  function openParents(el) { var d = el.parentElement; while (d && d !== treeNav) { if (d.tagName === 'DETAILS') d.open = true; d = d.parentElement; } }
  function isMobile() { return window.matchMedia && window.matchMedia('(max-width: 900px)').matches; }
  function markTree(path, loc) {
    var olds = treeNav.querySelectorAll('.is-active'); for (var i = 0; i < olds.length; i++) olds[i].classList.remove('is-active');
    var rows = treeNav.querySelectorAll('.tree-file[data-path="' + cssEsc(path) + '"]');
    for (var r = 0; r < rows.length; r++) { rows[r].classList.add('is-active'); if (!loc) openParents(rows[r]); }
    if (loc) {
      var stopEl = treeNav.querySelector('.tree-stop[data-spine="' + cssEsc(loc.spine.id) + '"][data-stop="' + cssEsc(loc.stop.id) + '"]');
      if (stopEl) { stopEl.classList.add('is-active'); openParents(stopEl); }
    }
    var marks = treeNav.querySelectorAll('.tree-stop');
    for (var k = 0; k < marks.length; k++) {
      var sp = spineById(marks[k].getAttribute('data-spine')), sid = marks[k].getAttribute('data-stop');
      var st = sp && sp.stops.filter(function (x) { return x.id === sid; })[0];
      marks[k].classList.toggle('is-done', !!(st && stopDone(sp, st)));
    }
    var act = treeNav.querySelector('.tree-stop.is-active') || treeNav.querySelector('.tree-file.is-active');
    if (act && !isMobile()) { var rc = act.getBoundingClientRect(), nr = treeNav.getBoundingClientRect(); if (rc.top < nr.top || rc.bottom > nr.bottom) act.scrollIntoView({ block: 'center' }); }
  }

  if (filterInput) filterInput.addEventListener('input', function () {
    var q = filterInput.value.trim().toLowerCase(), box = $('tree-results');
    var groups = treeNav.querySelectorAll('.tree-heading, details.tree-group');
    for (var i = 0; i < groups.length; i++) if (!groups[i].parentElement.closest('details')) groups[i].style.display = q ? 'none' : '';
    if (!q) { box.hidden = true; box.innerHTML = ''; return; }
    var hits = (DATA.files || []).filter(function (p) { return (p + ' ' + (TITLES[p] || '') + ' ' + highlightLabel(p)).toLowerCase().indexOf(q) >= 0; }).slice(0, 80);
    box.innerHTML = hits.length ? hits.map(function (p) { return fileRow(p, titleFor(p), '<small class="tree-file__path">' + esc(p) + '</small>'); }).join('')
      : '<p class="tree-empty">No file name or title matches “' + esc(filterInput.value) + '”.</p>';
    box.hidden = false;
  });

  /* ============================================================ the App Shell: the reader opens the librarian; the viewer never sets the view
     The shell's view is whatever it shows (share.json default_view, or the reader's own choice). The one
     control below asks the shell, through the served @descix/app-sdk bridge (DeSciXAppSDK.js), for the chat
     beside the document, and records what happened on <html data-descix-view> as
     "<outcome>:<mode set, or the bridge when none was>", the outcome being one of DeSciX.VIEW_OUTCOMES, and
     the view the shell showed at the press (DeSciX.view.get(), read then and only then) on data-descix-view-from.
     The page never calls view.subscribe (subscribing flips view.available() by itself).
     The control exists only where the bridge's documented surface says a shell is listening: DeSciX.ready()
     resolves { mode: 'shell' } and DeSciX.view.available() is true. No bridge on the page (a standalone copy),
     ready() rejecting or resolving any other mode, or no listening view: no control. */
  var VIEW_ATTR = 'data-descix-view';
  function askLibrarian(S) {
    var from = S.view.get();
    var r = S.requestView('SplitView', { fallback: 'Chat' }), outcomes = S.VIEW_OUTCOMES;
    var known = Object.keys(outcomes).some(function (k) { return outcomes[k] === r.outcome; });
    if (!known) throw new Error('DeSciX.requestView returned outcome ' + JSON.stringify(r.outcome) + ', not one of DeSciX.VIEW_OUTCOMES');
    document.documentElement.setAttribute(VIEW_ATTR, r.outcome + ':' + (r.mode || r.bridge));
    document.documentElement.setAttribute(VIEW_ATTR + '-detail', r.reason || '');
    document.documentElement.setAttribute(VIEW_ATTR + '-from', String(from));
    return r;
  }
  function mountLibrarian() {
    var S = window.DeSciX;
    if (!S || typeof S.ready !== 'function') return;          // no bridge on this page: standalone, no control
    S.ready().then(function (r) {
      if (!r || r.mode !== 'shell') return;                  // standalone, or framed with no readable shell
      if (typeof S.requestView !== 'function' || !S.VIEW_OUTCOMES || !S.view || typeof S.view.get !== 'function' || typeof S.view.available !== 'function') {
        throw new Error('DeSciXAppSDK.js lacks requestView/VIEW_OUTCOMES/view.get/view.available: the bundle must ship the @descix/app-sdk >= 0.6.0 bridge (scripts/build-frontpage.js, scripts.sdk)');
      }
      if (!S.view.available()) return;                       // a shell, but no host listening for a view
      var b = document.createElement('button');
      b.type = 'button'; b.className = 'toolbar-librarian'; b.id = 'ask-librarian';
      b.textContent = 'Ask the librarian'; b.title = 'Open the chat beside this document';
      b.addEventListener('click', function () { askLibrarian(S); });
      document.querySelector('#content-toolbar .toolbar-actions').prepend(b);
    }, function () { /* ready() rejected: the documented absence of a shell bus; no control */ });
  }

  /* ============================================================ navigation: #<path>, #<path>#<heading>, #record:<id> */
  function parseHash() {
    var h = location.hash.slice(1); try { h = decodeURIComponent(h); } catch (e) { /* keep raw */ }
    var k = h.indexOf('#'); return { path: k < 0 ? h : h.slice(0, k), anchor: k < 0 ? '' : h.slice(k + 1) };
  }
  function kindOf(p) {
    var ext = extOf(p);
    if (ext === 'md') return 'md';
    if (ext === 'html' || ext === 'htm') return 'html';
    if (ext === 'pdf') return 'pdf';
    if (/^(png|jpe?g|gif|svg|webp)$/.test(ext)) return 'image';
    if (ext === 'docx') return 'docx';
    if (/^(zip|jsonl|mp3|mp4|wav|xlsx|pptx|olean)$/.test(ext)) return 'download';
    if (/^(tsv|csv)$/.test(ext)) return 'table';
    return 'code';
  }
  function setToolbar(path) {
    githubLink.href = REPO_BASE + '/blob/main/' + path.split('/').map(encodeURIComponent).join('/');
    rawLink.href = rawUrl(path);
    githubLink.style.display = rawLink.style.display = '';
  }
  function navigate(path, anchor) {
    var kind = kindOf(path);
    if (window.EGPTJournal) window.EGPTJournal.onNavigate(path);      // the journal's article mode (site-assets/journal.js)
    currentPath = path;
    closeDrawer();
    landing.style.display = 'none';
    document.body.classList.add('is-reading');
    renderShelfmark(path);
    setToolbar(path);
    var loc = renderSpineBar(path, anchor);
    markTree(path, loc);
    updateMeters();
    document.title = titleFor(path) + ' — ' + DATA.site.brand;
    if (kind === 'html') showIframe(path, anchor);
    else {
      showRendered();
      if (kind === 'md' && window.EGPTJournal && window.EGPTJournal.owns(path)) window.EGPTJournal.render(path, anchor);
      else if (kind === 'md') renderMarkdown(path, anchor);
      else if (kind === 'pdf') renderPdf(path);
      else if (kind === 'image') renderImage(path);
      else if (kind === 'docx') renderDocx(path);
      else if (kind === 'download') renderDownload(path);
      else if (kind === 'table') renderTable(path);
      else renderCode(path);
    }
    if (!anchor) window.scrollTo(0, 0);
    closeMobileSidebar();
    if (window.EGPTReader) window.EGPTReader.onNavigate(path, anchor, kind);
  }
  function renderShelfmark(path) {
    var m = moduleOf(path), parts = path.split('/'), html = '';
    if (m) {
      var mark = /^[0-9]{2}_/.test(m.dir) ? m.dir.slice(0, 2) : '';
      html += '<a class="shelfmark__shelf" href="' + esc('#' + (m.entry ? m.dir + '/' + m.entry : path)) + '">' + (mark ? '<span class="shelfmark__no">' + esc(mark) + '</span>' : '') + esc(m.name || m.label) + '</a>';
      var rest = parts.slice(m.dir.split('/').length);
      for (var i = 0; i < rest.length - 1; i++) html += '<span class="shelfmark__sep">/</span><span class="shelfmark__dir">' + esc(rest[i]) + '</span>';
    } else html += '<span class="shelfmark__shelf">The collection</span>';
    html += '<span class="shelfmark__sep">/</span><span class="shelfmark__file" title="' + esc(path) + '">' + esc(baseName(path)) + '</span>';
    shelfmark.innerHTML = html;
  }
  function showIframe(path, anchor) {
    rendered.style.display = 'none'; rendered.innerHTML = '';
    iframe.src = rawUrl(path) + (anchor ? '#' + anchor : '');
    iframe.style.display = 'block';
  }
  function showRendered() { iframe.style.display = 'none'; iframe.src = 'about:blank'; rendered.style.display = 'block'; }
  function openHash() {
    var h = parseHash();
    if (!h.path) { goHome(); return; }
    // the reader (site-assets/reader.js) owns #book:<id>/… and #shelf:<id>
    if ((h.path.indexOf('book:') === 0 || h.path.indexOf('shelf:') === 0) && window.EGPTReader) { window.EGPTReader.open(h.path); return; }
    if (h.path.indexOf('record:') === 0) { openRecordPage(h.path.slice(7)); return; }
    if (!FILES[h.path] && !(window.EGPTJournal && window.EGPTJournal.owns(h.path))) {
      var readme = h.path.replace(/\/$/, '') + '/README.md';
      if (FILES[readme]) { location.replace('#' + readme); return; }
      console.warn('not in this bundle: ' + h.path); goHome(); return;
    }
    if (h.path === currentPath) { markTree(h.path, renderSpineBar(h.path, h.anchor)); updateMeters(); if (h.anchor) scrollToAnchor(h.anchor); return; }
    navigate(h.path, h.anchor);
  }
  window.addEventListener('hashchange', openHash);

  // a link that names a reading list makes it the active one
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-spine]');
    if (!a || !a.getAttribute('data-spine')) return;
    state.active = a.getAttribute('data-spine'); save();
    var h = parseHash(), target = (a.getAttribute('href') || '').slice(1).split('#')[0];
    if (target && target === h.path) { e.preventDefault(); currentPath = ''; if (a.getAttribute('href') !== location.hash) location.hash = a.getAttribute('href'); else openHash(); }
  }, true);
  // cards from the older landing carry data-nav-dir/data-nav-file
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[data-nav-dir]');
    if (!a || a.getAttribute('data-nav-file') === null) return;
    var d = a.getAttribute('data-nav-dir'), f = a.getAttribute('data-nav-file');
    e.preventDefault(); location.hash = '#' + (d ? d + '/' + f : f);
  });

  function goHome() {
    currentPath = '';
    if (window.EGPTReader) window.EGPTReader.leave();
    if (window.EGPTJournal) window.EGPTJournal.leave();
    if (location.hash) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { /* ignore */ } }
    document.body.classList.remove('is-reading');
    landing.style.display = '';
    iframe.style.display = 'none'; iframe.src = 'about:blank';
    rendered.style.display = 'none'; rendered.innerHTML = '';
    shelfmark.innerHTML = '<span class="shelfmark__shelf">The reading room</span>';
    githubLink.style.display = rawLink.style.display = 'none';
    spineBar.hidden = true;
    markTree('', null);
    renderResume();
    updateMeters();
    document.title = DATA.site.title;
  }
  function renderResume() {
    var box = $('rr-resume'); if (!box) return;
    var last = state.last, sp = last && spineById(last.spine), i = sp ? locate(sp, last.path) : -1;
    if (!sp || !FILES[last.path] || i < 0) { box.hidden = true; return; }
    box.innerHTML = '<span class="rr-resume__k">Where you left off</span>' + spineLink(sp, last.path, 'rr-resume__link', '<b>' + esc(sp.title) + '</b> · stop ' + (i + 1) + ' of ' + sp.stops.length + ' — ' + esc(titleFor(last.path)) + ' →');
    box.hidden = false;
  }

  /* ============================================================ provenance: beside the document, not in its reading line */
  function parseFrontMatter(text) {
    var m = text.match(/^\uFEFF?---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!m) return { meta: null, body: text };
    var meta = {}, key = null;
    m[1].split(/\r?\n/).forEach(function (l) {
      var kv = l.match(/^([A-Za-z_][\w-]*):\s*(.*)$/);
      if (kv) { key = kv[1]; meta[key] = kv[2].replace(/^"(.*)"$/, '$1').replace(/^'(.*)'$/, '$1'); }
      else if (key && /^\s+\S/.test(l)) meta[key] += ' ' + l.trim();
    });
    return { meta: meta, body: text.slice(m[0].length) };
  }
  function linkify(s) { return s.replace(/(https?:\/\/[^\s)<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>'); }
  function provenanceCard(path, meta) {
    var rows = '', order = ['author', 'date', 'source'];
    if (meta) {
      order.forEach(function (k) { if (meta[k]) rows += '<div><dt>' + esc(k) + '</dt><dd>' + linkify(esc(meta[k].replace(/--/g, '–'))) + '</dd></div>'; });
      Object.keys(meta).forEach(function (k) { if (order.indexOf(k) < 0 && k !== 'title' && meta[k]) rows += '<div><dt>' + esc(k.replace(/_/g, ' ')) + '</dt><dd>' + linkify(esc(meta[k])) + '</dd></div>'; });
    }
    rows += '<div><dt>held at</dt><dd class="mono">' + esc(path) + '</dd></div>';
    rows += '<div><dt>SHA-256</dt><dd class="mono break" data-sha-for="' + esc(path) + '">…</dd></div>';
    var summary = [meta && meta.author, meta && meta.date].filter(Boolean).join(', ');
    var html = '<details class="provenance">' +
      '<summary><span class="provenance__k">Provenance</span><span class="provenance__s">' + esc(summary || 'held in this collection') + '</span>' +
      '<span class="provenance__sha mono" data-sha-short-for="' + esc(path) + '"></span></summary>' +
      '<dl>' + rows + '</dl>' +
      '<p class="provenance__links"><a href="#RECORD_INDEX.md">Record index</a><a href="' + esc(rawUrl('CHECKSUMS.txt')) + '" target="_blank" rel="noopener">CHECKSUMS.txt</a><a href="' + esc(rawUrl(path)) + '" target="_blank" rel="noopener">The file itself</a><span class="mono">shasum -a 256 -c CHECKSUMS.txt</span></p>' +
      '</details>';
    getChecksums().then(function (map) {
      var sha = map[path], full = rendered.querySelector('[data-sha-for="' + cssEsc(path) + '"]'), short = rendered.querySelector('[data-sha-short-for="' + cssEsc(path) + '"]');
      if (full) full.textContent = sha || 'not in CHECKSUMS.txt at this build';
      if (short) short.textContent = sha ? 'sha ' + sha.slice(0, 10) : '';
    });
    return html;
  }

  /* ============================================================ markdown */
  var RECORD_RE = /^q-[a-z0-9][a-z0-9-]*-[0-9a-f]{8}$/;
  function renderMarkdown(path, anchor) {
    rendered.innerHTML = '<p class="loading">Loading…</p>';
    fetch(rawUrl(path)).then(function (res) { if (!res.ok) throw new Error(String(res.status)); return res.text(); })
      .then(function (text) {
        if (typeof marked === 'undefined') throw new Error('site-assets/marked.min.js did not load');
        if (path !== currentPath) return;
        var fm = parseFrontMatter(text);
        rendered.innerHTML = '<div class="doc">' + provenanceCard(path, fm.meta) + '<article class="markdown-body">' + marked.parse(fm.body) + '</article><footer class="doc-foot" id="doc-foot"></footer></div>';
        var art = rendered.querySelector('.markdown-body');
        if (fm.meta && fm.meta.title && !art.querySelector('h1')) art.insertAdjacentHTML('afterbegin', '<h1>' + esc(fm.meta.title) + '</h1>');
        headingIds(art);
        pairQuotations(art);
        recordChips(art);
        rebaseRelativeUrls(art, path);
        wrapTables(art);
        whenDefined('hljs', 8000).then(highlightCodeBlocks, function () {});
        if (art.querySelector('code.language-mermaid')) whenDefined('mermaid', 15000).then(initMermaidBlocks, function () {});
        heldRecordsNote(path);
        if (anchor) setTimeout(function () { scrollToAnchor(anchor); }, 30);
      })
      .catch(function () { if (path === currentPath) rendered.innerHTML = errorHtml(path); });
  }
  function errorHtml(path) {
    return '<div class="doc"><div class="notice"><p>This file could not be loaded here.</p><p><a href="' + esc(rawUrl(path)) + '" target="_blank" rel="noopener">Open the file itself</a> · <a href="' + esc(REPO_BASE + '/blob/main/' + path) + '" target="_blank" rel="noopener">View on GitHub</a></p></div></div>';
  }
  function heldRecordsNote(path) {
    getQuotes().then(function (q) {
      var foot = $('doc-foot'); if (!foot || path !== currentPath) return;
      var recs = q.byFile[path] || [];
      if (!recs.length) return;
      foot.innerHTML = '<p class="doc-foot__k">In the quotation corpus</p><p class="doc-foot__t">' + recs.length + ' record' + (recs.length > 1 ? 's are' : ' is') + ' drawn from this file.</p><p class="doc-foot__chips">' +
        recs.map(function (r) { return '<button class="record-chip" type="button" data-record="' + esc(r.id) + '" title="' + esc(r.quote.slice(0, 140)) + '">' + esc(r.quote.slice(0, 48)) + '…</button>'; }).join('') + '</p>';
    });
  }
  function headingIds(root) {
    var seen = {}, hs = root.querySelectorAll('h1,h2,h3,h4,h5,h6');
    for (var i = 0; i < hs.length; i++) {
      var id = hs[i].id || slug(hs[i].textContent), base = id, n = 1;
      while (seen[id]) id = base + '-' + (n++);
      seen[id] = 1; hs[i].id = id;
    }
  }
  function scrollToAnchor(a) {
    var el = document.getElementById(a) || document.getElementById(slug(a));
    if (el) { el.scrollIntoView({ block: 'start' }); el.classList.add('is-target'); setTimeout(function () { el.classList.remove('is-target'); }, 2400); }
  }
  // A quotation, its attribution and its record id are one thing in this collection: set them as one.
  var DASH_RE = /^\s*(?:[\u2014\u2013]|--)\s*/;
  function pairQuotations(root) {
    var bqs = root.querySelectorAll('blockquote');
    for (var i = 0; i < bqs.length; i++) {
      var bq = bqs[i];
      if (bq.closest('figure.quote') || (bq.parentElement && bq.parentElement.closest('blockquote'))) continue;
      var cap = null, lastP = bq.lastElementChild;
      if (lastP && lastP.tagName === 'P') {
        if (bq.children.length > 1 && DASH_RE.test(lastP.textContent) && /^\s*[\u2014\u2013]/.test(lastP.textContent)) { cap = lastP; }
        else {
          // "> …quote…\n> — Speaker" (one paragraph in Markdown)
          var parts = lastP.innerHTML.split(/\n\s*(?=[\u2014\u2013]\s)|<br>\s*(?=[\u2014\u2013]\s)/);
          if (parts.length > 1) { var tail = parts.pop(); lastP.innerHTML = parts.join('\n'); cap = document.createElement('p'); cap.innerHTML = tail; }
        }
      }
      // "> …quote…" then "— Speaker, Work … (record `q-…`)" as the next paragraph
      var next = bq.nextElementSibling;
      if (!cap && next && next.tagName === 'P' && /^\s*[\u2014\u2013]/.test(next.textContent)) cap = next;
      if (!cap) { bq.classList.add('quote--bare'); continue; }
      var fig = document.createElement('figure'); fig.className = 'quote';
      bq.parentNode.insertBefore(fig, bq); fig.appendChild(bq);
      if (cap.parentNode) cap.parentNode.removeChild(cap);
      var fc = document.createElement('figcaption');
      fc.innerHTML = '<span class="quote__by">' + cap.innerHTML.replace(DASH_RE, '') + '</span>';
      fig.appendChild(fc);
      var codes = fc.querySelectorAll('code'), ids = [];
      for (var c = 0; c < codes.length; c++) if (RECORD_RE.test(codes[c].textContent.trim())) ids.push(codes[c]);
      ids.forEach(function (code) {
        var id = code.textContent.trim(), prev = code.previousSibling, nxt = code.nextSibling;
        if (prev && prev.nodeType === 3) prev.textContent = prev.textContent.replace(/\s*\(\s*(?:corpus\s+)?records?:?\s*$/i, '').replace(/[,;]\s*$/, '');
        if (nxt && nxt.nodeType === 3) nxt.textContent = nxt.textContent.replace(/^\s*\)/, '');
        code.parentNode.removeChild(code);
        fc.insertAdjacentHTML('beforeend', '<button class="record-chip" type="button" data-record="' + esc(id) + '" title="Open the record ' + esc(id) + '">record</button>');
      });
    }
  }
  function recordChips(root) {
    var codes = root.querySelectorAll('code');
    for (var i = 0; i < codes.length; i++) {
      var t = codes[i].textContent.trim();
      if (!RECORD_RE.test(t) || codes[i].closest('pre') || codes[i].closest('figcaption')) continue;
      var b = document.createElement('button'); b.type = 'button'; b.className = 'record-chip record-chip--inline'; b.setAttribute('data-record', t); b.textContent = t;
      codes[i].parentNode.replaceChild(b, codes[i]);
    }
  }
  // Links inside a document become deep links (#<path>), so the reading list and the back button follow them.
  function rebaseRelativeUrls(root, fromFile) {
    var imgs = root.querySelectorAll('img[src]');
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('src');
      if (/^(https?:|data:|\/)/.test(src)) continue;
      var sp; try { sp = decodeURIComponent(src); } catch (e) { sp = src; }
      imgs[i].setAttribute('src', rawUrl(resolvePath(fromFile, sp)));
      imgs[i].setAttribute('loading', 'lazy');
    }
    var links = root.querySelectorAll('a[href]');
    for (var j = 0; j < links.length; j++) {
      var a = links[j], href = a.getAttribute('href');
      if (/^(mailto:|javascript:|\/)/.test(href)) continue;
      if (/^https?:/.test(href)) { a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener'); a.classList.add('is-external'); continue; }
      if (href.charAt(0) === '#') { a.setAttribute('href', '#' + fromFile + href); continue; }
      var hash = '', k = href.indexOf('#');
      if (k >= 0) { hash = href.slice(k); href = href.slice(0, k); }
      var target; try { target = resolvePath(fromFile, decodeURIComponent(href)); } catch (e) { target = resolvePath(fromFile, href); }
      if (!FILES[target] && FILES[target.replace(/\/$/, '') + '/README.md']) target = target.replace(/\/$/, '') + '/README.md';
      if (FILES[target]) a.setAttribute('href', '#' + target + hash);
      else { a.setAttribute('href', rawUrl(target) + hash); a.classList.add('is-unheld'); a.title = 'Not in this bundle'; }
    }
  }
  function wrapTables(root) {
    var ts = root.querySelectorAll('table');
    for (var i = 0; i < ts.length; i++) { if (ts[i].parentElement.classList.contains('table-wrap')) continue; var w = document.createElement('div'); w.className = 'table-wrap'; ts[i].parentNode.insertBefore(w, ts[i]); w.appendChild(ts[i]); }
  }
  function highlightCodeBlocks() {
    if (typeof hljs === 'undefined') return;
    var blocks = rendered.querySelectorAll('pre code');
    for (var i = 0; i < blocks.length; i++) {
      if (blocks[i].classList.contains('language-mermaid')) continue;
      if (blocks[i].classList.contains('language-lean') || blocks[i].classList.contains('language-lean4')) { blocks[i].innerHTML = highlightLean(blocks[i].textContent); blocks[i].classList.add('hljs'); continue; }
      try { hljs.highlightElement(blocks[i]); } catch (e) { /* plain */ }
    }
  }
  function initMermaidBlocks() {
    if (typeof mermaid === 'undefined') return;
    var bs = rendered.querySelectorAll('code.language-mermaid');
    for (var i = 0; i < bs.length; i++) { var pre = bs[i].closest('pre'); if (!pre) continue; var d = document.createElement('div'); d.className = 'mermaid'; d.textContent = bs[i].textContent; pre.parentNode.replaceChild(d, pre); }
    try { mermaid.initialize({ startOnLoad: false, theme: 'dark', securityLevel: 'loose' }); mermaid.run({ querySelector: '.markdown-body .mermaid' }); } catch (e) { /* plain */ }
  }

  /* ============================================================ records: the words, the citation, the hash */
  function recordHtml(r, asPage) {
    var s = r.source || {}, sp = r.speaker || {};
    var file = s.file ? (FILES[s.file] ? '<a href="#' + esc(s.file) + '">' + esc(s.file) + '</a>' : esc(s.file)) : '';
    var rows = [['speaker', esc(sp.name || sp.as_given || '')], ['work', esc(s.work || '')], ['locus', esc(s.locus || '')], ['date', esc(s.date || '')],
      ['held file', file], ['url', s.url ? '<a href="' + esc(s.url) + '" target="_blank" rel="noopener">' + esc(s.url) + '</a>' : ''],
      ['record', '<span class="mono">' + esc(r.id) + '</span>'], ['quote SHA-256', '<span class="mono break">' + esc(r.quote_sha256 || '') + '</span>']]
      .filter(function (x) { return x[1]; }).map(function (x) { return '<div><dt>' + x[0] + '</dt><dd>' + x[1] + '</dd></div>'; }).join('');
    return '<figure class="quote quote--record"><blockquote><p>' + esc(r.quote) + '</p></blockquote><figcaption><span class="quote__by">' + esc(sp.name || '') + (s.work ? ', ' + esc(s.work) : '') + (s.locus ? ', ' + esc(s.locus) : '') + '</span></figcaption></figure>' +
      '<dl class="record-meta">' + rows + '</dl>' +
      '<p class="record-links">' + (asPage ? '' : '<a href="#record:' + esc(r.id) + '">This record as a page</a>') + '<a href="#05_CORPUS/CORPUS_README.md">About the corpus</a><a href="#RECORD_INDEX.md">Record index</a></p>';
  }
  var lastFocus = null;
  function openRecord(id) {
    lastFocus = document.activeElement;
    drawer.innerHTML = '<div class="drawer__head"><p class="eyebrow" id="record-drawer-title">Corpus record</p><button class="drawer__close" type="button" aria-label="Close the record">×</button></div><div class="drawer__body"><p class="loading">Loading the record…</p></div>';
    drawer.hidden = false; document.body.classList.add('has-drawer');
    getQuotes().then(function (q) {
      var r = q.byId[id], body = drawer.querySelector('.drawer__body'); if (!body) return;
      body.innerHTML = r ? recordHtml(r, false) : '<p>The record <span class="mono">' + esc(id) + '</span> is not in 05_CORPUS/corpus/quotes.json at this build.</p>';
    });
    var btn = drawer.querySelector('.drawer__close'); btn.addEventListener('click', closeDrawer); btn.focus();
  }
  function closeDrawer() {
    if (drawer.hidden) return;
    drawer.hidden = true; drawer.innerHTML = ''; document.body.classList.remove('has-drawer');
    if (lastFocus && lastFocus.focus) try { lastFocus.focus(); } catch (e) { /* gone */ }
  }
  function openRecordPage(id) {
    currentPath = 'record:' + id; closeDrawer();
    landing.style.display = 'none'; document.body.classList.add('is-reading'); showRendered();
    shelfmark.innerHTML = '<a class="shelfmark__shelf" href="#05_CORPUS/CORPUS_README.md"><span class="shelfmark__no">05</span>The quotation corpus</a><span class="shelfmark__sep">/</span><span class="shelfmark__file">' + esc(id) + '</span>';
    githubLink.style.display = 'none'; rawLink.href = rawUrl('05_CORPUS/corpus/quotes.json'); rawLink.style.display = '';
    spineBar.hidden = true; markTree('', null);
    document.title = id + ' — ' + DATA.site.brand;
    rendered.innerHTML = '<p class="loading">Loading the record…</p>';
    getQuotes().then(function (q) {
      var r = q.byId[id];
      rendered.innerHTML = '<div class="doc"><header class="doc-head"><p class="doc-head__kind">Corpus record</p></header>' + (r ? recordHtml(r, true) : '<p>The record <span class="mono">' + esc(id) + '</span> is not in the corpus at this build.</p>') + '</div>';
    });
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-record]');
    if (b) { e.preventDefault(); openRecord(b.getAttribute('data-record')); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeDrawer(); closeMobileSidebar(); } });

  /* ============================================================ files that are not Markdown */
  function fileNote(path) { var h = highlightLabel(path); if (h && h !== titleFor(path)) return h; var m = moduleOf(path); return m ? (m.name || '') + (m.line ? ' — ' + m.line : '') : ''; }
  function fileHead(path, kindLabel, actionsHtml, note) {
    return '<header class="file-head"><div class="file-head__text"><p class="doc-head__kind">' + esc(kindLabel) + '</p><h1 class="doc-head__title">' + esc(titleFor(path)) + '</h1>' +
      (note ? '<p class="file-head__note">' + esc(note) + '</p>' : '') + '</div><div class="file-head__actions">' + (actionsHtml || '') + '</div></header>';
  }
  function actions(path) {
    return '<a class="btn btn-ghost btn-sm" href="' + esc(rawUrl(path)) + '" target="_blank" rel="noopener">Open the file ↗</a><a class="btn btn-ghost btn-sm" href="' + esc(rawUrl(path)) + '" download>Download</a>';
  }
  function renderPdf(path) {
    rendered.innerHTML = '<div class="doc doc--wide">' + fileHead(path, 'PDF', actions(path), fileNote(path)) + provenanceCard(path, null) +
      '<div class="pdf-view" id="pdf-view" aria-label="' + esc(titleFor(path)) + '"><p class="loading">Rendering the pages…</p></div><footer class="doc-foot" id="doc-foot"></footer></div>';
    heldRecordsNote(path);
    loadScript('site-assets/pdf.min.js', 'pdfjsLib').then(function (lib) {
      lib.GlobalWorkerOptions.workerSrc = 'site-assets/pdf.worker.min.js';
      return lib.getDocument({ url: rawUrl(path), isEvalSupported: false }).promise;
    }).then(function (pdf) {
      if (path !== currentPath) return;
      var view = $('pdf-view'); view.innerHTML = '';
      var count = document.createElement('p'); count.className = 'pdf-count'; count.textContent = pdf.numPages + ' page' + (pdf.numPages > 1 ? 's' : ''); view.appendChild(count);
      var io = 'IntersectionObserver' in window ? new IntersectionObserver(function (ents) {
        ents.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); drawPage(pdf, en.target, path); } });
      }, { rootMargin: '1200px 0px' }) : null;
      for (var n = 1; n <= pdf.numPages; n++) {
        var pg = document.createElement('div'); pg.className = 'pdf-page'; pg.setAttribute('data-page', n);
        pg.innerHTML = '<span class="pdf-page__n">' + n + '</span>'; view.appendChild(pg);
        if (io) io.observe(pg); else drawPage(pdf, pg, path);
      }
    }).catch(function (err) {
      if (path !== currentPath) return;
      var view = $('pdf-view'); if (!view) return;
      // the browser's own viewer, outside the sandbox, as the fallback
      view.innerHTML = '<iframe class="pdf-native" src="' + esc(rawUrl(path)) + '" title="' + esc(titleFor(path)) + '"></iframe><p class="file-head__note">If the pages do not show here, use “Open the file” above.</p>';
      console.warn('pdf.js: ' + (err && err.message));
    });
  }
  function drawPage(pdf, holder, path) {
    var n = +holder.getAttribute('data-page');
    pdf.getPage(n).then(function (page) {
      if (path !== currentPath) return;
      var w = Math.min(holder.clientWidth || 900, 1100), vp0 = page.getViewport({ scale: 1 }), scale = w / vp0.width;
      var ratio = Math.min(window.devicePixelRatio || 1, 2), vp = page.getViewport({ scale: scale * ratio });
      var c = document.createElement('canvas'); c.width = Math.floor(vp.width); c.height = Math.floor(vp.height);
      c.style.width = Math.floor(vp.width / ratio) + 'px'; c.style.height = Math.floor(vp.height / ratio) + 'px';
      c.setAttribute('role', 'img'); c.setAttribute('aria-label', 'Page ' + n);
      holder.classList.add('is-drawn'); holder.appendChild(c);
      return page.render({ canvasContext: c.getContext('2d'), viewport: vp }).promise;
    }).catch(function () { holder.insertAdjacentHTML('beforeend', '<p class="file-head__note">Page ' + n + ' could not be drawn.</p>'); });
  }
  function renderImage(path) {
    var label = highlightLabel(path);
    rendered.innerHTML = '<div class="doc doc--wide">' + fileHead(path, 'Image', actions(path), '') + provenanceCard(path, null) +
      '<figure class="image-view"><a href="' + esc(rawUrl(path)) + '" target="_blank" rel="noopener"><img src="' + esc(rawUrl(path)) + '" alt="' + esc(label || titleFor(path)) + '"></a>' +
      '<figcaption><span class="image-view__cap">' + esc(label || humanName(path)) + '</span><span class="image-view__src mono">' + esc(path) + '</span></figcaption></figure><footer class="doc-foot" id="doc-foot"></footer></div>';
    heldRecordsNote(path);
  }
  function renderDocx(path) {
    rendered.innerHTML = '<div class="doc">' + fileHead(path, 'Word document', '', fileNote(path)) + provenanceCard(path, null) +
      '<div class="docx-cards"><a class="doc-card" href="' + esc(rawUrl(path)) + '" download><span class="doc-icon" aria-hidden="true">W</span><span class="doc-text"><span class="doc-name">' + esc(baseName(path)) + '</span><span class="doc-kind">Word · download</span></span></a>' +
      '<button class="btn btn-ghost btn-sm" type="button" id="docx-preview">Show the text here</button></div>' +
      '<article class="markdown-body docx-text" id="docx-text" hidden></article><footer class="doc-foot" id="doc-foot"></footer></div>';
    heldRecordsNote(path);
    $('docx-preview').addEventListener('click', function () {
      var btn = this, box = $('docx-text'); btn.disabled = true; btn.textContent = 'Reading the document…';
      Promise.all([loadScript('site-assets/mammoth.browser.min.js', 'mammoth'), fetch(rawUrl(path)).then(function (r) { if (!r.ok) throw new Error(r.status); return r.arrayBuffer(); })])
        .then(function (x) { return x[0].convertToHtml({ arrayBuffer: x[1] }); })
        .then(function (res) {
          if (path !== currentPath) return;
          box.innerHTML = '<p class="docx-text__note">The text of the Word file, read in your browser. Its layout, headers and footers are the file’s own; the download is the document.</p>' + res.value;
          box.hidden = false; btn.remove(); headingIds(box); pairQuotations(box); recordChips(box); wrapTables(box);
        })
        .catch(function () { btn.disabled = false; btn.textContent = 'The text could not be read here; download the file'; });
    });
  }
  function renderDownload(path) {
    rendered.innerHTML = '<div class="doc">' + fileHead(path, extOf(path).toUpperCase() + ' file', actions(path), fileNote(path)) + provenanceCard(path, null) +
      '<div class="notice"><p>This file is data, held here byte for byte. Download it to open it.</p></div></div>';
  }
  function splitRow(l, sep) {
    if (sep === '\t') return l.split('\t');
    var out = [], cur = '', q = false;
    for (var i = 0; i < l.length; i++) { var c = l[i]; if (c === '"') { if (q && l[i + 1] === '"') { cur += '"'; i++; } else q = !q; } else if (c === ',' && !q) { out.push(cur); cur = ''; } else cur += c; }
    out.push(cur); return out;
  }
  function renderTable(path) {
    rendered.innerHTML = '<p class="loading">Loading…</p>';
    fetch(rawUrl(path)).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (t) {
      if (path !== currentPath) return;
      var sep = extOf(path) === 'tsv' ? '\t' : ',';
      var rows = t.replace(/\r/g, '').split('\n').filter(function (l) { return l.length; }).map(function (l) { return splitRow(l, sep); });
      var head = rows.shift() || [];
      var html = '<div class="table-wrap"><table><thead><tr>' + head.map(function (h) { return '<th>' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
        rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + esc(c) + '</td>'; }).join('') + '</tr>'; }).join('') + '</tbody></table></div>';
      rendered.innerHTML = '<div class="doc doc--wide">' + fileHead(path, extOf(path).toUpperCase() + ' · ' + rows.length + ' rows', actions(path), fileNote(path)) + provenanceCard(path, null) + '<article class="markdown-body markdown-body--table">' + html + '</article></div>';
    }).catch(function () { rendered.innerHTML = errorHtml(path); });
  }
  var LANG = { js: 'javascript', mjs: 'javascript', py: 'python', tex: 'latex', bib: 'latex', ts: 'typescript', sh: 'bash', zsh: 'bash', yml: 'yaml', yaml: 'yaml', json: 'json', css: 'css', c: 'c', h: 'c' };
  var KIND = { lean: 'Lean 4 source', tex: 'LaTeX source', bib: 'BibTeX', py: 'Python', js: 'JavaScript', mjs: 'JavaScript', json: 'JSON', txt: 'Text', sh: 'Shell script', html: 'HTML' };
  function renderCode(path) {
    var ext = extOf(path);
    rendered.innerHTML = '<p class="loading">Loading…</p>';
    fetch(rawUrl(path)).then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); }).then(function (text) {
      if (path !== currentPath) return;
      var lang = LANG[ext] || ext, body;
      if (ext === 'txt' || ext === '') body = '<pre class="text-view">' + esc(text) + '</pre>';
      else if (ext === 'lean') body = '<pre class="code-view"><code class="hljs language-lean">' + highlightLean(text) + '</code></pre>';
      else body = '<pre class="code-view"><code class="hljs">' + esc(text) + '</code></pre>';
      var lines = text.split('\n').length;
      rendered.innerHTML = '<div class="doc doc--wide">' + fileHead(path, (KIND[ext] || (ext ? ext.toUpperCase() : 'File')) + ' · ' + lines + ' lines', actions(path), fileNote(path)) + provenanceCard(path, null) + body + '<footer class="doc-foot" id="doc-foot"></footer></div>';
      heldRecordsNote(path);
      if (ext !== 'txt' && ext !== '' && ext !== 'lean') whenDefined('hljs', 8000).then(function (h) {
        var el = rendered.querySelector('pre.code-view code'); if (!el || path !== currentPath) return;
        try { el.innerHTML = (h.getLanguage && h.getLanguage(lang)) ? h.highlight(text, { language: lang }).value : h.highlightAuto(text).value; } catch (e) { /* plain */ }
      }, function () {});
    }).catch(function () { rendered.innerHTML = errorHtml(path); });
  }
  // Lean 4 has no highlight.js grammar here: comments, strings, keywords, types, numbers.
  var LEAN_KW = /^(theorem|lemma|def|abbrev|structure|class|instance|inductive|where|with|fun|let|have|show|from|by|at|if|then|else|match|do|namespace|end|section|variable|open|import|noncomputable|private|protected|axiom|example|calc|exact|intro|intros|apply|rw|simp|omega|decide|rfl|cases|induction|refine|constructor|unfold|obtain|use|linarith|norm_num|sorry|universe|set_option|mutual|deriving|extends|partial|macro|syntax|attribute|local|scoped|export|termination_by|decreasing_by|Type|Prop|Sort)$/;
  function highlightLean(src) {
    var out = '', i = 0, n = src.length;
    while (i < n) {
      var ch = src[i], two = src.slice(i, i + 2);
      if (two === '/-') { var j = src.indexOf('-/', i + 2); j = j < 0 ? n : j + 2; out += '<span class="hljs-comment">' + esc(src.slice(i, j)) + '</span>'; i = j; continue; }
      if (two === '--') { var e = src.indexOf('\n', i); e = e < 0 ? n : e; out += '<span class="hljs-comment">' + esc(src.slice(i, e)) + '</span>'; i = e; continue; }
      if (ch === '"') { var k = i + 1; while (k < n && src[k] !== '"') { if (src[k] === '\\') k++; k++; } k = Math.min(n, k + 1); out += '<span class="hljs-string">' + esc(src.slice(i, k)) + '</span>'; i = k; continue; }
      var m = /^[A-Za-z_\u03b1-\u03c9\u0391-\u03a9\u2115\u2124\u211d\u211a][\w'.\u03b1-\u03c9\u0391-\u03a9\u2115\u2124\u211d\u211a\u2080-\u2089!?]*/.exec(src.slice(i, i + 200));
      if (m) { var w = m[0]; out += LEAN_KW.test(w) ? '<span class="hljs-keyword">' + esc(w) + '</span>' : (/^[A-Z]/.test(w) ? '<span class="hljs-type">' + esc(w) + '</span>' : esc(w)); i += w.length; continue; }
      var num = /^\d+(\.\d+)?/.exec(src.slice(i, i + 40));
      if (num) { out += '<span class="hljs-number">' + num[0] + '</span>'; i += num[0].length; continue; }
      out += esc(ch); i++;
    }
    return out;
  }

  /* ============================================================ mobile sidebar */
  var backdrop = document.createElement('div'); backdrop.className = 'sidebar-backdrop'; document.body.appendChild(backdrop);
  function openMobileSidebar() { sidebar.classList.add('sidebar--open'); backdrop.classList.add('sidebar-backdrop--visible'); }
  function closeMobileSidebar() { sidebar.classList.remove('sidebar--open'); backdrop.classList.remove('sidebar-backdrop--visible'); }
  $('mobile-menu-btn').addEventListener('click', openMobileSidebar);
  $('sidebar-toggle').addEventListener('click', closeMobileSidebar);
  backdrop.addEventListener('click', closeMobileSidebar);
  var homeLink = document.querySelector('[data-home]');
  if (homeLink) homeLink.addEventListener('click', function (e) { e.preventDefault(); goHome(); });

  /* ============================================================ the viewer's surface for site-assets/reader.js */
  window.EGPTViewer = {
    data: DATA, files: FILES, titleFor: titleFor, kindOf: kindOf, esc: esc, slug: slug, rawUrl: rawUrl, extOf: extOf,
    parseHash: parseHash, navigate: navigate, scrollToAnchor: scrollToAnchor, closeDrawer: closeDrawer, VIEW_ATTR: VIEW_ATTR,
    isMobile: isMobile, closeMobileSidebar: closeMobileSidebar, markTree: markTree, renderShelfmark: renderShelfmark,
    showRendered: showRendered, state: state, save: save, updateMeters: updateMeters,
    parseFrontMatter: parseFrontMatter, headingIds: headingIds, rebaseRelativeUrls: rebaseRelativeUrls, wrapTables: wrapTables,
    setCurrentPath: function (p) { currentPath = p; }, currentPath: function () { return currentPath; },
    el: { rendered: rendered, iframe: iframe, landing: landing, treeNav: treeNav, spineBar: spineBar, shelfmark: shelfmark, sidebar: sidebar, githubLink: githubLink, rawLink: rawLink }
  };

  /* ============================================================ init */
  function init() {
    buildTree();
    mountLibrarian();
    if (location.hash.length > 1) openHash(); else goHome();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
