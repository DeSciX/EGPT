/* ============================================================
   EGPT Course Site — site.js
   Two-panel SPA: sidebar tree nav + main content frame
   Vanilla JS, no framework, no build step
   ============================================================ */

(function () {
  'use strict';

  var DATA = window.SITE_DATA;
  if (!DATA) {
    console.warn('SITE_DATA not found — site.js cannot initialize.');
    return;
  }

  if (!DATA.site || !DATA.site.raw_url || !DATA.site.repo_url) {
    throw new Error('SITE_DATA.site.raw_url and SITE_DATA.site.repo_url are required (set them in site-src/_meta.json)');
  }
  var RAW_BASE = DATA.site.raw_url;   // "." = the files are served beside index.html
  var REPO_BASE = DATA.site.repo_url;
  var FILES = {};                     // every path in the bundle, for link resolution
  for (var fi = 0; fi < (DATA.files || []).length; fi++) FILES[DATA.files[fi]] = true;
  var currentPath = '';               // the file being shown, bundle-relative

  // POSIX-style join + normalize for bundle paths ("a/b" + "../c.md" -> "a/c.md").
  function resolvePath(fromFile, href) {
    var base = fromFile.indexOf('/') >= 0 ? fromFile.slice(0, fromFile.lastIndexOf('/')) : '';
    var parts = (base ? base.split('/') : []).concat(href.split('/'));
    var out = [];
    for (var i = 0; i < parts.length; i++) {
      var seg = parts[i];
      if (seg === '' || seg === '.') continue;
      if (seg === '..') { out.pop(); continue; }
      out.push(seg);
    }
    return out.join('/');
  }
  function splitDirFile(fullPath) {
    var k = fullPath.lastIndexOf('/');
    return k < 0 ? ['', fullPath] : [fullPath.slice(0, k), fullPath.slice(k + 1)];
  }

  // DOM refs
  var treeNav = document.getElementById('tree-nav');
  var landing = document.getElementById('landing');
  var iframe = document.getElementById('content-iframe');
  var rendered = document.getElementById('content-rendered');
  var breadcrumb = document.getElementById('content-breadcrumb');
  var githubLink = document.getElementById('content-github-link');
  var sidebar = document.getElementById('sidebar');
  var sidebarToggle = document.getElementById('sidebar-toggle');
  var mobileMenuBtn = document.getElementById('mobile-menu-btn');
  var homeLink = document.querySelector('[data-home]');

  // Create backdrop element for mobile sidebar
  var backdrop = document.createElement('div');
  backdrop.className = 'sidebar-backdrop';
  document.body.appendChild(backdrop);

  /* ============================================================
     TREE BUILDING
     ============================================================ */

  function buildTree() {
    if (!DATA.modules || !DATA.modules.length) {
      treeNav.innerHTML = '<p style="padding:1rem;opacity:0.5;font-size:0.8rem">No modules found.</p>';
      return;
    }

    var html = '';

    for (var i = 0; i < DATA.modules.length; i++) {
      var mod = DATA.modules[i];
      var primaryIdea = (mod.primary_ideas && mod.primary_ideas.length) ? mod.primary_ideas[0].toLowerCase() : 'id1';

      html += '<div class="tree-node tree-node--module" data-dir="' + esc(mod.dir) + '">';
      html += '<div class="tree-toggle" tabindex="0" role="button" aria-expanded="false" data-expanded="false">';
      html += '<span class="tree-arrow">&#9656;</span>'; // ▸
      html += '<span class="tree-dot" style="background:var(--' + esc(primaryIdea) + '-color)"></span>';
      html += '<span class="tree-label">' + esc(mod.label) + '</span>';
      html += '</div>';
      html += '<div class="tree-children" style="display:none">';

      // Highlights section
      if (mod.highlights && mod.highlights.length) {
        html += '<div class="tree-node tree-node--section">';
        html += '<div class="tree-toggle" tabindex="0" role="button" aria-expanded="false" data-expanded="false">';
        html += '<span class="tree-arrow">&#9656;</span>';
        html += '<span class="tree-label">&#9733; Highlights</span>'; // ★
        html += '</div>';
        html += '<div class="tree-children" style="display:none">';
        for (var h = 0; h < mod.highlights.length; h++) {
          var hl = mod.highlights[h];
          var hfname = hl.file.split('/').pop();
          html += '<div class="tree-node tree-node--file" tabindex="0" role="button" data-dir="' + esc(mod.dir) + '" data-file="' + esc(hl.file) + '">';
          html += '<span class="tree-label" title="' + esc(hl.label || hfname) + '">' + esc(hfname) + '</span>';
          html += '</div>';
        }
        html += '</div></div>';
      }

      // Subsections
      if (mod.subsections) {
        for (var s = 0; s < mod.subsections.length; s++) {
          var sub = mod.subsections[s];
          html += '<div class="tree-node tree-node--section">';
          html += '<div class="tree-toggle" tabindex="0" role="button" aria-expanded="false" data-expanded="false">';
          html += '<span class="tree-arrow">&#9656;</span>';
          html += '<span class="tree-label">' + esc(sub.title) + '</span>';
          html += '</div>';
          html += '<div class="tree-children" style="display:none">';
          if (sub.files) {
            for (var f = 0; f < sub.files.length; f++) {
              var fname = sub.files[f].split('/').pop();
              html += '<div class="tree-node tree-node--file" tabindex="0" role="button" data-dir="' + esc(mod.dir) + '" data-file="' + esc(sub.files[f]) + '">';
              html += '<span class="tree-label">' + esc(fname) + '</span>';
              html += '</div>';
            }
          }
          html += '</div></div>';
        }
      }

      html += '</div></div>'; // close tree-children and tree-node--module
    }

    treeNav.innerHTML = html;
    attachTreeListeners();
  }

  function attachTreeListeners() {
    treeNav.addEventListener('click', handleTreeClick);
    treeNav.addEventListener('keydown', handleTreeKeydown);
  }

  function handleTreeClick(e) {
    // Toggle expand/collapse
    var toggle = e.target.closest('.tree-toggle');
    if (toggle) {
      toggleNode(toggle);
      return;
    }

    // File click
    var fileNode = e.target.closest('.tree-node--file');
    if (fileNode) {
      var dir = fileNode.getAttribute('data-dir');
      var file = fileNode.getAttribute('data-file');
      navigateTo(dir, file);
      markActive(fileNode);
    }
  }

  function handleTreeKeydown(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;

    var toggle = e.target.closest('.tree-toggle');
    if (toggle) {
      e.preventDefault();
      toggleNode(toggle);
      return;
    }

    var fileNode = e.target.closest('.tree-node--file');
    if (fileNode) {
      e.preventDefault();
      var dir = fileNode.getAttribute('data-dir');
      var file = fileNode.getAttribute('data-file');
      navigateTo(dir, file);
      markActive(fileNode);
    }
  }

  function toggleNode(toggle) {
    var children = toggle.nextElementSibling;
    if (!children) return;
    var arrow = toggle.querySelector('.tree-arrow');
    var isExpanded = toggle.getAttribute('data-expanded') === 'true';

    toggle.setAttribute('data-expanded', String(!isExpanded));
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    children.style.display = isExpanded ? 'none' : 'block';
    if (arrow) {
      arrow.innerHTML = isExpanded ? '&#9656;' : '&#9662;'; // ▸ or ▾
    }
  }

  function markActive(fileNode) {
    var prev = treeNav.querySelectorAll('.tree-node--active');
    for (var i = 0; i < prev.length; i++) {
      prev[i].classList.remove('tree-node--active');
    }
    fileNode.classList.add('tree-node--active');
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */

  function navigateTo(moduleDir, filePath) {
    var fullPath = moduleDir ? (moduleDir + '/' + filePath) : filePath;
    var ext = filePath.split('.').pop().toLowerCase();
    currentPath = fullPath;
    if (location.hash.slice(1) !== fullPath) {
      try { history.replaceState(null, '', '#' + fullPath); } catch (e) { location.hash = fullPath; }
    }
    if (window.scrollTo) window.scrollTo(0, 0);

    // Hide landing, prepare content area
    landing.style.display = 'none';

    // Update breadcrumb
    var parts = fullPath.split('/');
    breadcrumb.textContent = parts.join(' / ');

    // Update GitHub link
    githubLink.href = REPO_BASE + '/blob/main/' + fullPath;
    githubLink.style.display = '';

    // Route by file type
    if (ext === 'html' || ext === 'htm') {
      showIframe(fullPath);
    } else if (ext === 'pdf' || ext === 'png' || ext === 'jpg' || ext === 'jpeg' || ext === 'svg') {
      showIframe(fullPath);
    } else if (ext === 'md') {
      showRendered();
      fetchAndRenderMarkdown(fullPath);
    } else if (ext === 'docx' || ext === 'jsonl' || ext === 'zip') {
      showRendered();
      rendered.innerHTML = '<p class="loading">' + escapeHtml(fullPath) + ' is not viewable here: <a href="' + RAW_BASE + '/' + encodeURI(fullPath) + '" download>download it</a>.</p>';
    } else {
      // Source code
      showRendered();
      fetchAndRenderCode(fullPath, ext);
    }

    // Close mobile sidebar
    closeMobileSidebar();
  }

  function showIframe(src) {
    iframe.src = src;
    iframe.style.display = 'block';
    rendered.style.display = 'none';
  }

  function showRendered() {
    iframe.style.display = 'none';
    iframe.src = 'about:blank';
    rendered.style.display = 'block';
  }

  /* ============================================================
     CONTENT RENDERING
     ============================================================ */

  function fetchAndRenderMarkdown(path) {
    rendered.innerHTML = '<p class="loading">Loading...</p>';

    fetch(RAW_BASE + '/' + path)
      .then(function (res) {
        if (!res.ok) throw new Error(String(res.status));
        return res.text();
      })
      .then(function (text) {
        if (typeof marked === 'undefined') throw new Error('site-assets/marked.min.js did not load');
        rendered.innerHTML = '<article class="markdown-body">' + marked.parse(text) + '</article>';
        rebaseRelativeUrls(rendered, path);
        whenDefined('hljs', 8000).then(highlightCodeBlocks, function () {});
        if (rendered.querySelector('code.language-mermaid')) whenDefined('mermaid', 15000).then(initMermaidBlocks, function () {});
      })
      .catch(function (e) {
        rendered.innerHTML = '<p class="error">Could not load file. <a href="' + REPO_BASE + '/blob/main/' + escapeHtml(path) + '" target="_blank">View on GitHub</a></p>';
      });
  }

  function rebaseRelativeUrls(root, fromFile) {
    var imgs = root.querySelectorAll('img[src]');
    for (var i = 0; i < imgs.length; i++) {
      var src = imgs[i].getAttribute('src');
      if (/^(https?:|data:|\/)/.test(src)) continue;
      imgs[i].setAttribute('src', RAW_BASE + '/' + resolvePath(fromFile, src));
    }
    var links = root.querySelectorAll('a[href]');
    for (var j = 0; j < links.length; j++) {
      var href = links[j].getAttribute('href');
      if (/^(https?:|mailto:|javascript:|#|\/)/.test(href)) continue;
      var hash = '';
      var k = href.indexOf('#');
      if (k >= 0) { hash = href.slice(k); href = href.slice(0, k); }
      var target = resolvePath(fromFile, decodeURIComponent(href));
      links[j].setAttribute('data-bundle-path', target);
      links[j].setAttribute('href', RAW_BASE + '/' + encodeURI(target) + hash);
    }
  }

  // Resolves once window[name] exists (the CDN loader stubs append their script tags asynchronously).
  function whenDefined(name, timeoutMs) {
    return new Promise(function (resolve, reject) {
      var start = Date.now();
      (function poll() {
        if (typeof window[name] !== 'undefined') return resolve(window[name]);
        if (Date.now() - start > timeoutMs) return reject(new Error(name + ' did not load'));
        setTimeout(poll, 100);
      })();
    });
  }

  function fetchAndRenderCode(path, lang) {
    rendered.innerHTML = '<p class="loading">Loading...</p>';

    Promise.all([fetch(RAW_BASE + '/' + path), whenDefined('hljs', 8000).catch(function () { return null; })])
      .then(function (r) {
        var res = r[0];
        if (!res.ok) throw new Error(String(res.status));
        return res.text();
      })
      .then(function (text) {
        var langMap = { lean: 'plaintext', js: 'javascript', py: 'python', tex: 'latex', ts: 'typescript', sh: 'bash', zsh: 'bash', yml: 'yaml', json: 'json', css: 'css' };
        var hljsLang = langMap[lang] || lang;
        var highlighted;

        if (typeof hljs !== 'undefined' && hljs.getLanguage && hljs.getLanguage(hljsLang)) {
          highlighted = hljs.highlight(text, { language: hljsLang }).value;
        } else if (typeof hljs !== 'undefined' && hljs.highlightAuto) {
          highlighted = hljs.highlightAuto(text).value;
        } else {
          highlighted = escapeHtml(text);
        }

        rendered.innerHTML = '<pre class="code-view"><code class="hljs">' + highlighted + '</code></pre>';
      })
      .catch(function (e) {
        rendered.innerHTML = '<p class="error">Could not load file. <a href="' + REPO_BASE + '/blob/main/' + escapeHtml(path) + '" target="_blank">View on GitHub</a></p>';
      });
  }

  function highlightCodeBlocks() {
    if (typeof hljs === 'undefined') return;
    var blocks = rendered.querySelectorAll('pre code');
    for (var i = 0; i < blocks.length; i++) {
      // Skip mermaid blocks
      if (blocks[i].classList.contains('language-mermaid')) continue;
      try {
        hljs.highlightElement(blocks[i]);
      } catch (e) { /* ignore */ }
    }
  }

  function initMermaidBlocks() {
    if (typeof mermaid === 'undefined') return;
    // Find mermaid code blocks and convert them
    var mermaidBlocks = rendered.querySelectorAll('code.language-mermaid');
    for (var i = 0; i < mermaidBlocks.length; i++) {
      var pre = mermaidBlocks[i].closest('pre');
      if (!pre) continue;
      var div = document.createElement('div');
      div.className = 'mermaid';
      div.textContent = mermaidBlocks[i].textContent;
      pre.parentNode.replaceChild(div, pre);
    }
    try {
      mermaid.run({ querySelector: '.markdown-body .mermaid' });
    } catch (e) { /* ignore */ }
  }

  /* ============================================================
     INTERNAL LINK INTERCEPTION
     Intercept clicks on links with data-nav-dir/data-nav-file
     so they route through the SPA instead of downloading raw files
     ============================================================ */

  document.addEventListener('click', function (e) {
    // 1. Explicit data-nav-dir/data-nav-file attributes (highest priority)
    var link = e.target.closest('a[data-nav-dir]');
    if (link) {
      var dir = link.getAttribute('data-nav-dir');
      var file = link.getAttribute('data-nav-file');
      if (dir !== null && file !== null) {
        e.preventDefault();
        navigateTo(dir, file);
        return;
      }
    }

    // 2. Internal file links (relative paths to viewable files)
    //    Intercept so they render in the SPA viewer instead of downloading
    var anchor = e.target.closest('a[href]');
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (!href) return;

    // Skip external links, anchors, javascript:, and already-handled links
    if (href.startsWith('http') || href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:')) return;
    // Skip links that explicitly open in new tab
    if (anchor.getAttribute('target') === '_blank') return;

    // Match internal file paths with viewable extensions
    var viewableExts = /\.(lean|md|js|ts|py|json|yml|yaml|css|tex|sh|zsh|txt|html|htm|pdf|png|jpg|jpeg|svg|tsv|c|h|bib|mjs)(#.*)?$/i;
    if (!viewableExts.test(href)) return;

    e.preventDefault();
    var bundlePath = anchor.getAttribute('data-bundle-path') || resolvePath(currentPath, decodeURIComponent(href.split('#')[0]));
    var df = splitDirFile(bundlePath);
    navigateTo(df[0], df[1]);
  });

  // A link to a directory in the bundle opens that directory's README.
  document.addEventListener('click', function (e) {
    var anchor = e.target.closest('a[href]');
    if (!anchor) return;
    var href = anchor.getAttribute('href');
    if (!href || /^(https?:|mailto:|javascript:|#)/.test(href) || anchor.getAttribute('target') === '_blank') return;
    if (!/\/$/.test(href)) return;
    var dir = anchor.getAttribute('data-bundle-path') || resolvePath(currentPath, decodeURIComponent(href));
    dir = dir.replace(/\/$/, '');
    if (FILES[dir + '/README.md']) {
      e.preventDefault();
      navigateTo(dir, 'README.md');
    }
  });

  // Deep links: #<bundle path> opens that file; the hash is written by navigateTo.
  function openHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (!h) { goHome(); return; }
    if (!FILES[h]) { console.warn('not in this bundle: ' + h); goHome(); return; }
    if (h === currentPath) return;
    var df = splitDirFile(h);
    navigateTo(df[0], df[1]);
    var node = treeNav.querySelector('.tree-node--file[data-dir="' + df[0].replace(/"/g, '&quot;') + '"][data-file="' + df[1].replace(/"/g, '&quot;') + '"]');
    if (node) markActive(node);
  }
  window.addEventListener('hashchange', openHash);

  /* ============================================================
     HOME / LANDING
     ============================================================ */

  function goHome() {
    currentPath = '';
    if (location.hash) { try { history.replaceState(null, '', location.pathname + location.search); } catch (e) { location.hash = ''; } }
    landing.style.display = '';
    iframe.style.display = 'none';
    iframe.src = 'about:blank';
    rendered.style.display = 'none';
    rendered.innerHTML = '';
    breadcrumb.textContent = '';
    githubLink.style.display = 'none';

    var prev = treeNav.querySelectorAll('.tree-node--active');
    for (var i = 0; i < prev.length; i++) {
      prev[i].classList.remove('tree-node--active');
    }
  }

  if (homeLink) {
    homeLink.addEventListener('click', function (e) {
      e.preventDefault();
      goHome();
    });
  }

  /* ============================================================
     MOBILE SIDEBAR
     ============================================================ */

  function openMobileSidebar() {
    sidebar.classList.add('sidebar--open');
    backdrop.classList.add('sidebar-backdrop--visible');
  }

  function closeMobileSidebar() {
    sidebar.classList.remove('sidebar--open');
    backdrop.classList.remove('sidebar-backdrop--visible');
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function () {
      openMobileSidebar();
    });
  }

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', function () {
      closeMobileSidebar();
    });
  }

  backdrop.addEventListener('click', function () {
    closeMobileSidebar();
  });

  /* ============================================================
     PERSONA TABS (landing page)
     ============================================================ */

  function initPersonaTabs() {
    var containers = document.querySelectorAll('.do-this-first');
    for (var c = 0; c < containers.length; c++) {
      (function (container) {
        var tabs = container.querySelectorAll('.persona-tab');
        var panes = container.querySelectorAll('.persona-content');

        for (var t = 0; t < tabs.length; t++) {
          tabs[t].addEventListener('click', function () {
            var target = this.getAttribute('data-persona');

            for (var j = 0; j < tabs.length; j++) { tabs[j].classList.remove('active'); }
            for (var j = 0; j < panes.length; j++) { panes[j].classList.remove('active'); }

            this.classList.add('active');
            var pane = container.querySelector('.persona-content[data-persona="' + target + '"]');
            if (pane) pane.classList.add('active');
          });
        }

        // Auto-activate first tab
        if (!container.querySelector('.persona-tab.active') && tabs.length > 0) {
          tabs[0].click();
        }
      })(containers[c]);
    }
  }

  function initPersonaGroups() {
    var groups = document.querySelectorAll('.persona-group');
    for (var g = 0; g < groups.length; g++) {
      (function (group) {
        var groupTabs = group.querySelectorAll('.persona-tab');
        for (var t = 0; t < groupTabs.length; t++) {
          groupTabs[t].addEventListener('click', function () {
            var groupName = this.getAttribute('data-group');
            if (!groupName) return;

            var container = group.closest('.do-this-first');
            if (!container) return;

            for (var j = 0; j < groupTabs.length; j++) { groupTabs[j].classList.remove('active'); }
            this.classList.add('active');

            var personaTabs = container.querySelectorAll('.persona-tab[data-in-group]');
            for (var p = 0; p < personaTabs.length; p++) {
              if (personaTabs[p].getAttribute('data-in-group') === groupName) {
                personaTabs[p].style.display = '';
              } else {
                personaTabs[p].style.display = 'none';
                var pane = container.querySelector('.persona-content[data-persona="' + personaTabs[p].getAttribute('data-persona') + '"]');
                if (pane) pane.classList.remove('active');
                personaTabs[p].classList.remove('active');
              }
            }

            var firstVisible = container.querySelector('.persona-tab[data-in-group="' + groupName + '"]');
            if (firstVisible && !container.querySelector('.persona-tab[data-in-group="' + groupName + '"].active')) {
              firstVisible.click();
            }
          });
        }
      })(groups[g]);
    }
  }

  /* ============================================================
     MERMAID INITIALIZATION
     ============================================================ */

  function initMermaid() {
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'neutral',
        securityLevel: 'loose',
        flowchart: { useMaxWidth: true, htmlLabels: true }
      });
    }
  }

  /* ============================================================
     CAROUSEL (landing page)
     ============================================================ */

  function initCarousel() {
    var carousel = document.getElementById('carousel');
    if (!carousel) return;

    var track = document.getElementById('carousel-track');
    var cards = track.querySelectorAll('.carousel-card');
    var dots = carousel.querySelectorAll('.carousel-dot');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    var current = 0;
    var isFullscreen = false;

    // Fullscreen first visit
    if (!localStorage.getItem('carouselSeen')) {
      carousel.classList.add('carousel--fullscreen');
      isFullscreen = true;
      // Add skip button
      var skipBtn = document.createElement('button');
      skipBtn.className = 'carousel-skip';
      skipBtn.textContent = 'Skip intro \u2192';
      skipBtn.addEventListener('click', dismissFullscreen);
      carousel.appendChild(skipBtn);
    }

    function dismissFullscreen() {
      if (!isFullscreen) return;
      isFullscreen = false;
      localStorage.setItem('carouselSeen', 'true');
      carousel.classList.remove('carousel--fullscreen');
      var skip = carousel.querySelector('.carousel-skip');
      if (skip) skip.remove();
    }

    function goTo(index) {
      if (index < 0) return;
      // On last card next click in fullscreen → dismiss
      if (index >= cards.length) {
        if (isFullscreen) dismissFullscreen();
        return;
      }

      // Deactivate old card, unload its iframe
      cards[current].classList.remove('active');
      var oldIframe = cards[current].querySelector('.carousel-iframe');
      if (oldIframe) oldIframe.src = 'about:blank';
      if (dots[current]) dots[current].classList.remove('active');

      // Activate new card
      current = index;
      cards[current].classList.add('active');
      if (dots[current]) dots[current].classList.add('active');

      // Lazy-load the new card's iframe
      var newIframe = cards[current].querySelector('.carousel-iframe');
      if (newIframe) {
        var targetSrc = newIframe.getAttribute('data-carousel-src');
        if (targetSrc && newIframe.src !== targetSrc && !newIframe.src.endsWith(targetSrc)) {
          newIframe.src = targetSrc;
        }
      }

      // Update arrow disabled states
      if (prevBtn) prevBtn.disabled = (current === 0);
      if (nextBtn) nextBtn.disabled = (!isFullscreen && current === cards.length - 1);
    }

    // Initialize: load first card's iframe
    goTo(0);

    if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

    for (var d = 0; d < dots.length; d++) {
      (function (idx) {
        dots[idx].addEventListener('click', function () { goTo(idx); });
      })(d);
    }

    // Keyboard navigation
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(current - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); goTo(current + 1); }
    });

    // Visual overlay click → navigate to demo
    var overlays = carousel.querySelectorAll('.carousel-visual-overlay');
    for (var o = 0; o < overlays.length; o++) {
      overlays[o].addEventListener('click', function (e) {
        e.stopPropagation();
        var visual = this.parentElement;
        var dir = visual.getAttribute('data-click-dir');
        var file = visual.getAttribute('data-click-file');
        if (dir && file) {
          dismissFullscreen();
          navigateTo(dir, file);
        }
      });
    }

    // Dismiss fullscreen when SPA navigation hides the landing panel
    var observer = new MutationObserver(function () {
      if (landing && landing.style.display === 'none' && isFullscreen) {
        dismissFullscreen();
      }
    });
    if (landing) observer.observe(landing, { attributes: true, attributeFilter: ['style'] });
  }

  /* ============================================================
     UTILITIES
     ============================================================ */

  function escapeHtml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function esc(s) {
    // Escape for safe insertion into HTML attributes
    return String(s || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ============================================================
     INITIALIZATION
     ============================================================ */

  function init() {
    buildTree();
    initCarousel();
    initPersonaTabs();
    initPersonaGroups();
    initMermaid();

    // Hide GitHub link initially (shown on navigate)
    if (githubLink) githubLink.style.display = 'none';
    if (location.hash) openHash();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
