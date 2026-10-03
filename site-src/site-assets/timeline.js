/* ============================================================
   timeline.js — an evidence timeline, as an interactive article.
   One reusable component, driven by a timeline file (schema egpt.timeline/1, written by
   scripts/ledger-to-timeline.js from an evidence ledger):

     { title, dek, questions: [{ id, label, question, color }], notes: [{ year, title, text }],
       facts: [{ id, date, year, fact, evidence, source, url?, held?, tags: [question ids], note? }] }

   What a reader gets: the author's questions as a key (each a colour and a number; choosing one
   filters the timeline to the facts that bear on it); a strip showing where the facts fall across
   the years; the years and the facts in order; and, beside them, the evidence for the fact under
   the pointer or the keyboard focus: the quotation, its source, the author's note. A click pins
   it. On a phone the evidence opens under the fact.

     EGPTTimeline.mount(element, urlOrData, { linkHeld: path => href })

   No dependency, no build step. Cowork, 3 October 2026.
   ============================================================ */
(function () {
  'use strict';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function type(s) {   // quotation marks as type; _italic_ and *italic* from the ledger
    return esc(s).replace(/(^|[\s(\[—-])&quot;(?=\S)/g, '$1“').replace(/&quot;/g, '”').replace(/(^|[\s(\[—“-])'(?=\S)/g, '$1‘').replace(/'/g, '’')
      .replace(/(^|[\s(“])[*_]([^*_]+)[*_](?=[\s.,;:)”]|$)/g, '$1<em>$2</em>');
  }
  function mount(root, src, opts) {
    opts = opts || {};
    root.classList.add('tl'); root.innerHTML = '<p class="tl-loading">Loading the timeline…</p>';
    var got = typeof src === 'string' ? fetch(src).then(function (r) { if (!r.ok) throw new Error(String(r.status)); return r.json(); }) : Promise.resolve(src);
    return got.then(function (data) { build(root, data, opts); return data; }, function () { root.innerHTML = '<p class="tl-loading">The timeline could not be loaded.</p>'; });
  }
  function build(root, data, opts) {
    var Q = data.questions || [], qById = {}, facts = data.facts || [], byId = {};
    Q.forEach(function (q, i) { q.n = i + 1; qById[q.id] = q; });
    facts.forEach(function (f) { byId[f.id] = f; });
    var years = [], group = {};
    facts.forEach(function (f) { if (!group[f.year]) { group[f.year] = []; years.push(f.year); } group[f.year].push(f); });
    years.sort(function (a, b) { return (a || 1e9) - (b || 1e9); });      // year 0 = holdings of an archive, set last
    var real = years.filter(function (y) { return y; });
    var notes = (data.notes || []).slice().sort(function (a, b) { return a.year - b.year; });
    var active = '', pinned = '', shown = '';
    var wide = window.matchMedia ? window.matchMedia('(min-width: 1000px)') : { matches: true };

    function dots(f) { return (f.tags || []).map(function (t) { var q = qById[t]; return q ? '<span class="tl-dot" style="--c:' + esc(q.color) + '" title="' + esc(q.label) + '">' + q.n + '</span>' : ''; }).join(''); }
    function evidence(f) {
      var tags = (f.tags || []).map(function (t) { var q = qById[t]; return q ? '<button type="button" class="tl-tag" data-q="' + esc(q.id) + '" style="--c:' + esc(q.color) + '"><span class="tl-dot">' + q.n + '</span>' + esc(q.label) + '</button>' : ''; }).join('');
      var link = f.url ? '<a href="' + esc(f.url) + '" target="_blank" rel="noopener">Open the source ↗</a>' : '';
      if (f.held && opts.linkHeld) link += '<a href="' + esc(opts.linkHeld(f.held)) + '">Read it in the library</a>';
      return '<p class="tl-ev__date">' + esc(f.date) + '</p><p class="tl-ev__fact">' + type(f.fact) + '</p>' +
        (f.evidence ? '<blockquote class="tl-ev__quote">' + type(f.evidence) + '</blockquote>' : '') +
        (f.source ? '<p class="tl-ev__src">' + type(f.source) + '</p>' : '') + (link ? '<p class="tl-ev__links">' + link + '</p>' : '') +
        (f.note ? '<div class="tl-ev__note"><span>Author’s note</span><p>' + type(f.note) + '</p></div>' : '') +
        (tags ? '<p class="tl-ev__tags">' + tags + '</p>' : '');
    }
    var html = '';
    if (data.title && !opts.noTitle) html += '<h2 class="tl-title">' + esc(data.title) + '</h2>' + (data.dek ? '<p class="tl-dek">' + esc(data.dek) + '</p>' : '');
    html += '<div class="tl-key" role="group" aria-label="The questions; choose one to filter the timeline"><button type="button" class="tl-q tl-q--all is-on" data-q="" aria-pressed="true"><span class="tl-q__t">Every fact</span><span class="tl-q__n">' + facts.length + '</span></button>' +
      Q.map(function (q) { var n = facts.filter(function (f) { return (f.tags || []).indexOf(q.id) >= 0; }).length;
        return '<button type="button" class="tl-q" data-q="' + esc(q.id) + '" style="--c:' + esc(q.color) + '" aria-pressed="false"><span class="tl-dot">' + q.n + '</span><span class="tl-q__t">' + esc(q.question || q.label) + '</span><span class="tl-q__n">' + n + '</span></button>'; }).join('') + '</div>';
    html += '<div class="tl-map" aria-hidden="true"></div>';
    html += '<div class="tl-main"><ol class="tl-years">';
    var ni = 0;
    years.forEach(function (y) {
      while (ni < notes.length && notes[ni].year <= y) { var nt = notes[ni++]; html += '<li class="tl-note"><span class="tl-note__k">' + esc(nt.title || nt.year) + '</span><p>' + type(nt.text) + '</p></li>'; }
      html += '<li class="tl-year" data-year="' + y + '" id="' + esc((opts.idPrefix || 'y-') + y) + '"><h3 class="tl-year__n' + (y ? '' : ' tl-year__n--arch') + '">' + (y || 'In the archives') + '</h3><ol class="tl-facts">' + group[y].map(function (f) {
        var rest = f.date.replace(String(y), '').replace(/^[\s,.\u2013-]+|[\s,\u2013-]+$/g, '');
        var short = f.date === String(y) ? '' : (!y || /\d/.test(rest) ? f.date : rest);
        return '<li class="tl-fact" id="f-' + esc(f.id) + '" data-id="' + esc(f.id) + '" data-tags="' + esc((f.tags || []).join(' ')) + '" tabindex="0" role="button" aria-expanded="false">' +
          '<span class="tl-fact__dots">' + dots(f) + '</span><span class="tl-fact__body">' + (short && short.length < 34 ? '<span class="tl-fact__date">' + esc(short) + '</span>' : '') + '<span class="tl-fact__t">' + type(f.fact) + '</span></span>' +
          '<div class="tl-fact__ev" hidden></div></li>'; }).join('') + '</ol></li>';
    });
    html += '</ol><aside class="tl-pane" aria-live="polite"><div class="tl-pane__in"><p class="tl-pane__hint">Point at a fact to see the evidence for it. Click to keep it open.</p></div></aside></div>';
    root.innerHTML = html;

    var pane = root.querySelector('.tl-pane__in'), map = root.querySelector('.tl-map');
    function drawMap() {
      var lo = real[0], hi = real[real.length - 1], max = 1, count = {}, y;
      facts.forEach(function (f) { if (!active || (f.tags || []).indexOf(active) >= 0) count[f.year] = (count[f.year] || 0) + 1; });
      for (y = lo; y <= hi; y++) if ((count[y] || 0) > max) max = count[y];
      var c = active ? qById[active].color : 'var(--tl-accent)', bars = '';
      for (y = lo; y <= hi; y++) bars += '<a class="tl-map__y' + (y % 10 === 0 ? ' is-decade' : '') + '" href="#" data-year="' + y + '" title="' + y + (count[y] ? ': ' + count[y] : '') + '"' + (y % 10 === 0 ? ' data-label="' + y + '"' : '') + '><i style="height:' + (count[y] ? Math.max(8, Math.round(100 * count[y] / max)) : 0) + '%;background:' + c + '"></i></a>';
      map.innerHTML = bars;
    }
    function show(id, pin) {
      var f = byId[id]; if (!f) return;
      shown = id; if (pin !== undefined) pinned = pin ? id : '';
      pane.innerHTML = (pinned === id ? '<button type="button" class="tl-pane__unpin" data-unpin>Unpin ×</button>' : '') + evidence(f);
      var all = root.querySelectorAll('.tl-fact'); for (var i = 0; i < all.length; i++) { all[i].classList.toggle('is-shown', all[i].getAttribute('data-id') === id); all[i].classList.toggle('is-pinned', all[i].getAttribute('data-id') === pinned); }
    }
    function toggleInline(li) {
      var box = li.querySelector('.tl-fact__ev'), open = box.hidden;
      var olds = root.querySelectorAll('.tl-fact__ev:not([hidden])'); for (var i = 0; i < olds.length; i++) { olds[i].hidden = true; olds[i].parentElement.setAttribute('aria-expanded', 'false'); }
      if (open) { box.innerHTML = evidence(byId[li.getAttribute('data-id')]); box.hidden = false; li.setAttribute('aria-expanded', 'true'); }
    }
    function filter(q) {
      active = q === active ? '' : q;
      var btns = root.querySelectorAll('.tl-q'); for (var i = 0; i < btns.length; i++) { var on = btns[i].getAttribute('data-q') === active; btns[i].classList.toggle('is-on', on); btns[i].setAttribute('aria-pressed', on ? 'true' : 'false'); }
      var fs = root.querySelectorAll('.tl-fact'); for (var k = 0; k < fs.length; k++) fs[k].hidden = !!active && (' ' + fs[k].getAttribute('data-tags') + ' ').indexOf(' ' + active + ' ') < 0;
      var ys = root.querySelectorAll('.tl-year'); for (var j = 0; j < ys.length; j++) ys[j].hidden = !ys[j].querySelector('.tl-fact:not([hidden])');
      root.style.setProperty('--tl-active', active ? qById[active].color : 'var(--tl-accent)');
      drawMap();
    }
    root.addEventListener('click', function (e) {
      var t = e.target, el;
      if ((el = t.closest('[data-unpin]'))) { pinned = ''; show(shown); return; }
      if ((el = t.closest('.tl-q, .tl-tag'))) { filter(el.getAttribute('data-q')); if (el.classList.contains('tl-tag')) root.querySelector('.tl-key').scrollIntoView({ block: 'nearest' }); return; }
      if ((el = t.closest('.tl-map__y'))) { e.preventDefault(); var y = +el.getAttribute('data-year'), target = null, ys = root.querySelectorAll('.tl-year:not([hidden])');
        for (var i = 0; i < ys.length; i++) if (+ys[i].getAttribute('data-year') >= y) { target = ys[i]; break; }
        if (target) target.scrollIntoView({ block: 'start' }); return; }
      if (t.closest('a')) return;
      if ((el = t.closest('.tl-fact'))) { if (wide.matches) show(el.getAttribute('data-id'), pinned !== el.getAttribute('data-id')); else toggleInline(el); }
    });
    root.addEventListener('mouseover', function (e) { var el = e.target.closest && e.target.closest('.tl-fact'); if (el && wide.matches && !pinned && el.getAttribute('data-id') !== shown) show(el.getAttribute('data-id')); });
    root.addEventListener('focusin', function (e) { var el = e.target.closest && e.target.closest('.tl-fact'); if (el && wide.matches && !pinned) show(el.getAttribute('data-id')); });
    root.addEventListener('keydown', function (e) {
      var el = e.target.closest && e.target.closest('.tl-fact'); if (!el || e.target !== el) return;
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); el.click(); }
      if (e.key === 'Escape' && pinned) { pinned = ''; show(shown); }
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { var all = [].slice.call(root.querySelectorAll('.tl-fact:not([hidden])')), k = all.indexOf(el) + (e.key === 'ArrowDown' ? 1 : -1); if (all[k]) { e.preventDefault(); all[k].focus(); } }
    });
    drawMap();
    root.egptTimeline = { show: show, filter: filter, data: data };
    if (opts.open && byId[opts.open]) { show(opts.open, true); var li = document.getElementById('f-' + opts.open); if (li) { li.scrollIntoView({ block: 'center' }); if (!wide.matches) toggleInline(li); } }
  }
  window.EGPTTimeline = { mount: mount };
})();
