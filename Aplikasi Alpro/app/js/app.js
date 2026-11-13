/* EksponenKu — antarmuka (router + tampilan). JavaScript murni, tanpa build. */
(function () {
  'use strict';
  var EK = window.EK;
  var M = EK.math, C = EK.content, S = EK.store, G = EK.grader;
  var R = M.renderText, esc = M.esc;

  var VERSION = '0.1.1';
  var STEP_KEYS = ['understand', 'model', 'solve', 'interpret', 'check'];
  var STEP_LABEL = { understand: 'Pahami', model: 'Buat Model', solve: 'Selesaikan', interpret: 'Tafsirkan', check: 'Periksa' };
  var STEP_NUM = { understand: '①', model: '②', solve: '③', interpret: '④', check: '⑤' };
  var STEP_GUIDE = {
    understand: 'Apa yang diketahui? Apa yang ditanya? Informasi mana yang tidak perlu?',
    model: 'Apa yang berulang? Dikali berapa setiap kali? Ada berapa kali?',
    solve: 'Sifat bilangan berpangkat mana yang dipakai?',
    interpret: 'Apa arti angka ini di dalam soal? Apa satuannya?',
    check: 'Apakah jawabannya masuk akal? Bisakah dicek dengan cara lain?'
  };
  var COG_LABEL = { pemahaman: 'Pemahaman', penerapan: 'Penerapan', penalaran: 'Penalaran' };

  var els = {};
  var installEvt = null;
  var uid = 0;

  /* ================= util ================= */
  function nextId(p) { uid += 1; return (p || 'f') + uid; }
  function shuffle(a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }
  function propName(id) { return id === 'S1' ? 'Strategi samakan basis' : 'Sifat ' + id.slice(1); }
  function propChip(id) {
    if (!id || !C.properties[id]) return '';
    return '<button type="button" class="chip" data-prop="' + id + '">' + esc(propName(id)) + '</button>';
  }
  function isStandalone() {
    return (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) || window.navigator.standalone === true;
  }
  function isIOS() {
    var ua = navigator.userAgent || '';
    return /iphone|ipad|ipod/i.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }
  function toast(msg) {
    els.toast.textContent = msg;
    els.toast.hidden = false;
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { els.toast.hidden = true; }, 2600);
  }
  function tableHtml(t) {
    if (!t) return '';
    return '<div class="tbl-wrap"><table class="tbl"><thead><tr>' + t.head.map(function (h) { return '<th scope="col">' + R(h) + '</th>'; }).join('') +
      '</tr></thead><tbody>' + t.rows.map(function (r) {
        return '<tr>' + r.map(function (c) { return '<td>' + R(c) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table></div>';
  }

  /* ---------- komponen input jawaban ---------- */
  function answerInput(id, opts) {
    opts = opts || {};
    return '<div class="answer">' +
      (opts.label ? '<label class="lbl" for="' + id + '">' + R(opts.label) + '</label>' : '') +
      '<div class="answer-row">' + (opts.prefix ? '<span class="prefix">' + R(opts.prefix) + '</span>' : '') +
      '<input id="' + id + '" class="ans" type="text" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" ' +
      'enterkeyhint="done" placeholder="' + esc(opts.placeholder || 'Tulis jawabanmu') + '" aria-describedby="' + id + '-pv">' +
      (opts.suffix ? '<span class="suffix">' + esc(opts.suffix) + '</span>' : '') + '</div>' +
      '<div class="preview" id="' + id + '-pv" aria-live="polite"></div>' +
      (opts.noKeys ? '' : '<div class="keys" data-for="' + id + '" aria-label="Tombol bantu menulis">' +
        ['^', '/', '(', ')', '−', '×', ','].map(function (k) {
          return '<button type="button" data-k="' + k + '" aria-label="' + ({ '^': 'pangkat', '/': 'per', '(': 'kurung buka', ')': 'kurung tutup', '−': 'minus', '×': 'kali', ',': 'koma' })[k] + '">' + k + '</button>';
        }).join('') + '</div>') +
      '</div>';
  }

  function choiceGroup(group, options, opts) {
    opts = opts || {};
    var order = opts.order || options.map(function (_, i) { return i; });
    return '<div class="choices' + (opts.inline ? ' inline' : '') + '" data-group="' + group + '"' + (opts.multi ? ' data-multi="1"' : '') +
      ' role="' + (opts.multi ? 'group' : 'radiogroup') + '"' + (opts.label ? ' aria-label="' + esc(opts.label) + '"' : '') + '>' +
      order.map(function (i) {
        return '<button type="button" class="opt" data-i="' + i + '" role="' + (opts.multi ? 'checkbox' : 'radio') + '" aria-checked="false">' +
          '<span class="mark" aria-hidden="true"></span><span>' + R(options[i]) + '</span></button>';
      }).join('') + '</div>';
  }
  function readChoice(root, group) {
    var g = root.querySelector('[data-group="' + group + '"]');
    if (!g) return null;
    var sel = Array.prototype.map.call(g.querySelectorAll('.opt.sel'), function (b) { return +b.getAttribute('data-i'); });
    return g.hasAttribute('data-multi') ? sel : (sel.length ? sel[0] : null);
  }
  function lockGroup(root, group) {
    var g = root.querySelector('[data-group="' + group + '"]');
    if (g) { g.classList.add('locked'); Array.prototype.forEach.call(g.querySelectorAll('button'), function (b) { b.disabled = true; }); }
  }

  function feedbackHtml(res, extra) {
    if (!res) return '';
    if (res.status === 'correct') {
      return '<div class="fb ok" role="status"><strong>✓ Benar!</strong>' + (extra ? '<div>' + R(extra) + '</div>' : '') + '</div>';
    }
    if (res.status === 'empty' || res.status === 'invalid') {
      return '<div class="fb info" role="status">' + R(res.feedback) + '</div>';
    }
    return '<div class="fb no" role="status"><strong>↻ Belum tepat.</strong><div>' + R(res.feedback) + '</div></div>';
  }

  /** Petunjuk bertingkat: dibuka satu per satu. "@contoh:N" membuka contoh soal ke-N. */
  function mountHints(container, hints, unitId, onUse) {
    if (!container) return;
    var shown = 0;
    hints = hints || [];
    function draw() {
      container.innerHTML = (shown ? '<ol class="hints">' + hints.slice(0, shown).map(function (h) {
        var m = /^@contoh:(\d+)$/.exec(h);
        return '<li>' + (m ? '<button type="button" class="link" data-example="' + unitId + ':' + m[1] + '">Lihat contoh soal yang mirip</button>' : R(h)) + '</li>';
      }).join('') + '</ol>' : '') +
        (shown < hints.length ? '<button type="button" class="btn ghost small" data-hint-next>' + (shown ? 'Petunjuk berikutnya' : 'Butuh petunjuk?') + '</button>' : '');
      var b = container.querySelector('[data-hint-next]');
      if (b) b.addEventListener('click', function () { shown += 1; if (onUse) onUse(shown); draw(); });
    }
    if (!hints.length) { container.innerHTML = ''; return; }
    draw();
  }

  /* ================= lembar (sheet) ================= */
  function openSheet(title, html, onMount) {
    els.sheetTitle.textContent = title;
    els.sheetBody.innerHTML = html;
    els.sheet.hidden = false;
    document.body.classList.add('no-scroll');
    els.sheetClose.focus();
    if (onMount) onMount(els.sheetBody);
  }
  function closeSheet() {
    els.sheet.hidden = true;
    document.body.classList.remove('no-scroll');
  }

  function propertyCardHtml(p) {
    var mis = C.misconceptions[p.mistake];
    return '<article class="card prop" id="card-' + p.id + '"><h3>' + esc(propName(p.id)) + ' · ' + esc(p.name) + '</h3>' +
      '<p class="formula">' + R(p.formula) + '</p>' +
      '<p><strong>Gunakan jika:</strong> ' + R(p.when) + '</p>' +
      '<p class="muted">Contoh: ' + R(p.example) + '</p>' +
      (mis ? '<p class="warn"><strong>Hati-hati:</strong> ' + R(mis.feedback) + '</p>' : '') + '</article>';
  }
  function decisionTreeHtml() {
    return '<article class="card"><h3>Pohon keputusan: sifat mana yang dipakai?</h3><ul class="tree">' +
      '<li>Ada <strong>kurung yang dipangkatkan</strong> $( … )^n$?<ul>' +
      '<li>Isinya bilangan berpangkat → kalikan pangkat (' + propName('P3') + ')</li>' +
      '<li>Isinya perkalian → pangkatkan tiap faktor (' + propName('P4') + ')</li>' +
      '<li>Isinya pecahan → pangkatkan pembilang dan penyebut (' + propName('P5') + ')</li></ul></li>' +
      '<li>Ada <strong>perkalian/pembagian</strong> bilangan berpangkat?<ul>' +
      '<li>Basis sama → × jumlahkan pangkat, ÷ kurangkan pangkat (' + propName('P1') + ', ' + propName('P2') + ')</li>' +
      '<li>Basis berbeda → bisa disamakan? Uraikan ke faktor prima (Strategi). Pangkatnya sama? Gunakan $(ab)^n$.</li></ul></li>' +
      '<li>Ada <strong>pangkat 0 atau negatif</strong>? → $a^0 = 1$, $a^{-n} = [1/a^n]$ (' + propName('P6') + ', ' + propName('P7') + ')</li>' +
      '<li>Ada <strong>penjumlahan/pengurangan</strong>? → hitung nilainya masing-masing dulu.</li></ul></article>';
  }
  function cardsHtml() {
    return decisionTreeHtml().replace(/\$([^$]+)\$/g, function (m) { return R(m); }) +
      C.propertyList.map(propertyCardHtml).join('');
  }
  function openCards(focusId) {
    openSheet('Kartu Sifat', cardsHtml(), function (body) {
      if (focusId) {
        var el = body.querySelector('#card-' + focusId);
        if (el) { el.classList.add('focus'); el.scrollIntoView({ block: 'start' }); }
      }
    });
  }
  function exampleFullHtml(ex) {
    return '<article class="card"><p class="prompt">' + R(ex.prompt) + '</p><ol class="steps">' +
      ex.steps.map(function (s) { return '<li>' + R(s.text) + ' ' + propChip(s.prop) + '</li>'; }).join('') + '</ol></article>';
  }
  function openExample(unitId, idx) {
    var u = C.unitById[unitId];
    var ex = u && u.examples[idx || 0];
    if (!ex) return;
    openSheet('Contoh soal', exampleFullHtml(ex));
  }

  /* ================= kerangka & router ================= */
  function header(view) {
    var back = view.back ? '<a class="icon-btn" href="' + view.back + '" aria-label="Kembali">←</a>' : '<span class="brand" aria-hidden="true">xⁿ</span>';
    els.header.innerHTML = back + '<h1 id="page-title" tabindex="-1">' + esc(view.title) + '</h1>' +
      '<button type="button" class="icon-btn text" data-open-cards aria-label="Buka Kartu Sifat">Sifat</button>';
  }
  function show(view) {
    header(view);
    els.header.hidden = !!view.home;
    document.body.classList.toggle('is-home', !!view.home);
    if (view.home) els.header.innerHTML = '';
    els.main.innerHTML = view.html || '';
    els.tabs.hidden = !view.tab;
    Array.prototype.forEach.call(els.tabs.querySelectorAll('a'), function (a) {
      if (a.getAttribute('data-tab') === view.tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    document.title = view.title + ' · EksponenKu';
    window.scrollTo(0, 0);
    if (view.mount) view.mount(els.main);
    var h = document.getElementById('page-title');
    if (h && route.count > 1) h.focus({ preventScroll: true });
  }

  function route() {
    route.count = (route.count || 0) + 1;
    closeSheet();
    var parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
    if (!S.state.profile && parts[0] !== 'pasang') return show(onboardingView());
    var p0 = parts[0];
    try {
      if (!p0) return show(homeView());
      if (p0 === 'unit' && C.unitById[parts[1]]) {
        var u = parts[1];
        if (!parts[2]) return show(unitView(u));
        if (parts[2] === 'materi') return show(lessonView(u));
        if (parts[2] === 'contoh') return show(examplesView(u));
        if (parts[2] === 'latihan' && C.LEVELS.indexOf(parts[3]) >= 0) return show(practiceView({ unitId: u, level: parts[3] }));
        if (parts[2] === 'soal-cerita') return show(modelingListView(u));
        if (parts[2] === 'refleksi') return show(reflectionView(u));
      }
      if (p0 === 'belajar') return show(belajarView());
      if (p0 === 'misi' && !parts[1]) return show(missionListView());
      if (p0 === 'lab' && !parts[1]) return show(modelingListView('u8', true));
      if (p0 === 'lab' && C.modelingById[parts[1]]) return show(labView(parts[1]));
      if (p0 === 'misi' && C.stimuli[parts[1]]) return show(missionView(parts[1]));
      if (p0 === 'ulang') return show(practiceView({ review: true }));
      if (p0 === 'kemajuan') return show(progressView());
      if (p0 === 'sifat') return show({ title: 'Kartu Sifat', tab: 'sifat', html: cardsHtml() });
      if (p0 === 'pengaturan') return show(settingsView());
      if (p0 === 'pasang') return show(installView());
    } catch (e) {
      console.error(e);
      return show({ title: 'Terjadi kesalahan', back: '#/', html: '<div class="card"><p>Halaman ini belum bisa ditampilkan.</p><a class="btn primary" href="#/">Kembali ke Beranda</a></div>' });
    }
    show({ title: 'Tidak ditemukan', back: '#/', html: '<div class="card"><p>Halaman tidak ditemukan.</p><a class="btn primary" href="#/">Kembali ke Beranda</a></div>' });
  }

  /* ================= onboarding ================= */
  function onboardingView() {
    return {
      title: 'Selamat datang',
      html: '<section class="card hero"><div class="logo" aria-hidden="true">x<sup>n</sup></div>' +
        '<h2>EksponenKu</h2><p>Belajar bilangan berpangkat langkah demi langkah, lalu memakainya untuk memodelkan soal cerita.</p>' +
        '<ul class="bullets"><li>Materi singkat dan contoh soal bertahap</li><li>Latihan dengan petunjuk dan umpan balik</li><li>Lab Pemodelan: dari soal cerita menjadi model matematika</li></ul></section>' +
        '<form class="card" id="onb"><label class="lbl" for="nick">Nama panggilan</label>' +
        '<input id="nick" class="field" maxlength="20" autocomplete="nickname" required placeholder="Misalnya: Raka">' +
        '<label class="lbl" for="grade">Kelas</label><select id="grade" class="field"><option value="7">Kelas 7</option><option value="8">Kelas 8</option><option value="9" selected>Kelas 9</option></select>' +
        '<p class="muted small">Cukup nama panggilan saja. Datamu hanya tersimpan di perangkat ini.</p>' +
        '<button class="btn primary block" type="submit">Mulai belajar</button></form>',
      mount: function (root) {
        root.querySelector('#onb').addEventListener('submit', function (e) {
          e.preventDefault();
          var nick = root.querySelector('#nick').value.trim().slice(0, 20);
          if (!nick) return;
          S.setProfile({ nickname: nick, grade: +root.querySelector('#grade').value, createdAt: Date.now() });
          go('#/');
        });
      }
    };
  }

  /* ================= beranda ================= */
  function unitSections(u) {
    var s = [];
    if (u.segments && u.segments.length) s.push('materi');
    if (u.examples && u.examples.length) s.push('contoh');
    C.LEVELS.forEach(function (l) { if (C.exercisesOf(u.id, l).length) s.push('latihan-' + l); });
    if (C.modelingOf(u.id).length) s.push('cerita');
    if (u.mission) s.push('misi');
    s.push('refleksi');
    return s;
  }
  function unitProgress(u) {
    var secs = unitSections(u);
    var done = S.unit(u.id).done;
    var n = secs.filter(function (k) { return done[k]; }).length;
    return { done: n, total: secs.length };
  }
  function bar(ratio, label) {
    return '<div class="bar" role="img" aria-label="' + esc(label || '') + '"><i style="width:' + Math.round(Math.max(0, Math.min(1, ratio)) * 100) + '%"></i></div>';
  }
  function dots(n) { var s = ''; for (var i = 1; i <= 3; i++) s += '<i class="' + (i <= n ? 'on' : '') + '"></i>'; return '<span class="dots" aria-label="Tingkat kesulitan ' + n + ' dari 3">' + s + '</span>'; }

  function unitListHtml() {
    return '<ol class="unit-list">' + C.units.map(function (u) {
      var pr = unitProgress(u);
      return '<li><a class="card unit-card" href="#/unit/' + u.id + '"><span class="num" aria-hidden="true">' + u.order + '</span>' +
        '<span class="u-body"><strong>' + esc(u.title) + '</strong><span class="muted small">' + R(u.subtitle) + '</span>' +
        bar(pr.done / pr.total, pr.done + ' dari ' + pr.total + ' bagian selesai') + '</span>' + dots(u.difficulty) + '</a></li>';
    }).join('') + '</ol>';
  }

  function belajarView() {
    return { title: 'Materi', back: '#/', html: '<p class="muted">Pelajari berurutan dari Unit 1. Titik ungu menunjukkan tingkat kesulitan.</p>' + unitListHtml() };
  }

  function missionListView() {
    var list = Object.keys(C.stimuli).map(function (id) { return C.stimuli[id]; });
    list.sort(function (a, b) { return C.unitById[a.unit].order - C.unitById[b.unit].order; });
    return {
      title: 'Misi Literasi', back: '#/',
      html: '<section class="card hero left"><h2>Misi Literasi</h2><p class="muted">Baca bacaan singkat, lalu jawab soal pemahaman, penerapan, dan penalaran, seperti soal AKM.</p></section><ol class="step-list">' +
        list.map(function (s, i) {
          var done = S.unit(s.unit).done.misi;
          return '<li><a class="card row-card step-row' + (done ? ' done' : '') + '" href="#/misi/' + s.id + '"><span class="num" aria-hidden="true">' + (i + 1) + '</span>' +
            '<span class="u-body"><strong>' + esc(s.title) + '</strong><span class="muted small">Unit ' + C.unitById[s.unit].order + ' · ' + esc(s.context) + ' · ' + s.questions.length + ' soal</span></span>' +
            '<span class="state">' + (done ? '✓' : '') + '</span></a></li>';
        }).join('') + '</ol>'
    };
  }

  /* ---------- poin belajar pribadi (tanpa peringkat, tanpa perbandingan) ---------- */
  function learningStats() {
    var sections = 0, right = 0, models = 0;
    Object.keys(S.state.units).forEach(function (id) {
      var d = S.state.units[id].done;
      sections += Object.keys(d).filter(function (k) { return d[k]; }).length;
    });
    S.state.attempts.forEach(function (a) { if (a.first && a.correct) right += 1; });
    Object.keys(S.state.modeling).forEach(function (id) { if (S.state.modeling[id] && S.state.modeling[id].finished) models += 1; });
    var points = sections * 10 + right * 2 + models * 15;
    return { sections: sections, right: right, points: points, level: Math.floor(points / 100) + 1, inLevel: points % 100 };
  }
  function partOfDay() {
    var h = new Date().getHours();
    return h < 10 ? 'pagi' : h < 15 ? 'siang' : h < 18 ? 'sore' : 'malam';
  }
  var TIPS = [
    'Belajar sedikit tetapi rutin lebih kuat daripada banyak tetapi jarang.',
    'Jawaban belum tepat itu bagian dari belajar. Baca umpan baliknya, lalu coba lagi.',
    'Bingung memilih sifat? Buka Kartu Sifat dan ikuti pohon keputusannya.',
    'Sebelum menjawab soal cerita, cari dulu apa yang diketahui dan apa yang ditanya.',
    'Selesai menghitung? Periksa: apakah jawabanmu masuk akal di dunia nyata?',
    'Coba jelaskan materi ke teman. Itu cara ampuh untuk makin paham.',
    'Pecahan dipangkatkan? Ingat, pembilang dan penyebut sama-sama dipangkatkan.'
  ];

  function searchIndex() {
    var plain = function (s) { return String(s || '').replace(/[$*\[\]{}^]/g, '').toLowerCase(); };
    var items = [];
    C.units.forEach(function (u) {
      items.push({ text: plain(u.title + ' ' + u.subtitle + ' ' + u.objectives.join(' ')), label: 'Unit ' + u.order + ' · ' + u.title, sub: u.subtitle, href: '#/unit/' + u.id });
      u.segments.forEach(function (s) { items.push({ text: plain(s.title + ' ' + s.body), label: s.title, sub: 'Materi Unit ' + u.order, href: '#/unit/' + u.id + '/materi' }); });
    });
    C.propertyList.forEach(function (p) { items.push({ text: plain(propName(p.id) + ' ' + p.name + ' ' + p.when), label: propName(p.id) + ' · ' + p.name, sub: 'Kartu Sifat', prop: p.id }); });
    C.modeling.forEach(function (m) { items.push({ text: plain(m.title + ' ' + m.text + ' soal cerita pemodelan ' + C.TYPE_LABEL[m.type]), label: m.title, sub: 'Lab Pemodelan · ' + C.TYPE_LABEL[m.type], href: '#/lab/' + m.id }); });
    Object.keys(C.stimuli).forEach(function (id) { var s = C.stimuli[id]; items.push({ text: plain(s.title + ' ' + s.body + ' literasi'), label: s.title, sub: 'Misi Literasi', href: '#/misi/' + id }); });
    return items;
  }

  function homeView() {
    var prof = S.state.profile;
    var due = S.dueReviews().length;
    var last = S.state.lastUnit && C.unitById[S.state.lastUnit];
    var st = learningStats();
    var unitsDone = C.units.filter(function (u) { var p = unitProgress(u); return p.done === p.total; }).length;
    var tip = TIPS[Math.floor(Date.now() / 86400000) % TIPS.length];
    var tiles = [
      ['#/belajar', 'book', 'Materi', 1],
      ['#/ulang', 'repeat', 'Latihan Ulang', 2, due],
      ['#/lab', 'flask', 'Lab Pemodelan', 3],
      ['#/misi', 'news', 'Misi Literasi', 4],
      ['#/sifat', 'cards', 'Kartu Sifat', 2],
      ['#/kemajuan', 'chart', 'Kemajuan', 1],
      ['#/pasang', 'phone', 'Pasang Aplikasi', 4],
      ['#/pengaturan', 'gear', 'Pengaturan', 3]
    ];
    var html = '<section class="card profile-card">' +
      '<div class="pc-top"><div class="avatar" aria-hidden="true">' + esc(prof.nickname.charAt(0).toUpperCase()) + '</div>' +
      '<div class="pc-info"><div class="muted">Selamat ' + partOfDay() + ',</div><h1 class="pc-name" id="page-title" tabindex="-1">' + esc(prof.nickname) + '</h1>' +
      '<div class="pc-stats"><span class="stat s-ok">' + EK.icon('check') + st.sections + ' bagian</span><span class="stat s-star">' + EK.icon('star') + st.right + ' benar</span></div></div></div>' +
      '<div class="lvl"><strong>Level ' + st.level + '</strong><span class="muted">' + st.inLevel + ' / 100 poin</span></div>' +
      bar(st.inLevel / 100, 'Poin belajar') +
      '<div class="search"><label class="sr" for="q">Cari materi</label><input id="q" type="search" autocomplete="off" placeholder="Mau belajar apa ' + partOfDay() + ' ini?">' + EK.icon('search') + '</div>' +
      '<div data-results></div></section>' +
      '<nav class="tiles" aria-label="Menu">' + tiles.map(function (t) {
        return '<a class="tile" href="' + t[0] + '"><span class="blob b' + t[3] + '">' + EK.icon(t[1]) + (t[4] ? '<span class="tile-badge" aria-label="' + t[4] + ' soal">' + t[4] + '</span>' : '') + '</span><span class="tile-label">' + t[2] + '</span></a>';
      }).join('') + '</nav>';
    if (last) {
      var pr = unitProgress(last);
      html += '<a class="card row-card continue" href="#/unit/' + last.id + '"><span class="blob b3 small-blob">' + EK.icon('path') + '</span><div class="u-body"><span class="muted small">Lanjutkan belajar</span><strong>Unit ' + last.order + ' · ' + esc(last.title) + '</strong>' + bar(pr.done / pr.total, '') + '</div><span aria-hidden="true">→</span></a>';
    }
    html += '<section class="card motivate"><div><h2>Ayo ' + esc(prof.nickname) + ', semangat!</h2><p>' + R(tip) + '</p></div>' +
      '<div class="mini-cal" aria-label="' + unitsDone + ' dari ' + C.units.length + ' unit selesai"><span>UNIT</span><b>' + unitsDone + '/' + C.units.length + '</b><span>selesai</span></div></section>' +
      '<button type="button" class="fab" data-help aria-label="Bantuan">' + EK.icon('help') + '</button>';
    return {
      title: 'Beranda', tab: 'home', home: true, html: html,
      mount: function (root) {
        var idx = null;
        var q = root.querySelector('#q');
        var out = root.querySelector('[data-results]');
        q.addEventListener('input', function () {
          var v = q.value.trim().toLowerCase();
          if (v.length < 2) { out.innerHTML = ''; return; }
          idx = idx || searchIndex();
          var words = v.split(/\s+/);
          var hits = idx.filter(function (it) { return words.every(function (w) { return it.text.indexOf(w) >= 0; }); }).slice(0, 6);
          out.innerHTML = hits.length ? '<ul class="results">' + hits.map(function (h) {
            var inner = '<strong>' + esc(h.label) + '</strong><span class="muted small">' + R(h.sub) + '</span>';
            return '<li>' + (h.prop ? '<button type="button" class="res" data-prop="' + h.prop + '">' + inner + '</button>' : '<a class="res" href="' + h.href + '">' + inner + '</a>') + '</li>';
          }).join('') + '</ul>' : '<p class="muted small">Tidak ditemukan. Coba kata lain, misalnya "pecahan" atau "bakteri".</p>';
        });
        root.querySelector('[data-help]').addEventListener('click', openHelp);
      }
    };
  }

  function openHelp() {
    var rows = [['Pangkat', '2^5'], ['Pangkat negatif', '2^-3'], ['Pecahan', '4/9'], ['Desimal (pakai koma)', '0,5'], ['Notasi ilmiah', '3 × 10^6'], ['Model dengan n', '3*2^n']];
    openSheet('Bantuan', '<article class="card"><h3>Cara menulis jawaban</h3><div class="tbl-wrap"><table class="tbl"><thead><tr><th scope="col">Bentuk</th><th scope="col">Ketik</th><th scope="col">Terbaca</th></tr></thead><tbody>' +
      rows.map(function (r) { return '<tr><td>' + r[0] + '</td><td><code>' + esc(r[1]) + '</code></td><td>' + M.previewInput(r[1]) + '</td></tr>'; }).join('') +
      '</tbody></table></div><p class="small">Gunakan tombol <code>^</code> untuk pangkat. Di bawah kolom jawaban muncul tulisan "Terbaca: ..." agar kamu yakin jawabanmu dibaca dengan benar.</p></article>' +
      '<article class="card"><h3>Saat bingung</h3><ul class="bullets"><li>Tekan <strong>Butuh petunjuk?</strong>. Petunjuk dibuka satu per satu dan tidak mengurangi nilaimu.</li>' +
      '<li>Buka <strong>Kartu Sifat</strong> untuk melihat sifat mana yang cocok.</li><li>Di soal cerita, pakai <strong>Sorot bilangan</strong> untuk menemukan informasi penting.</li></ul>' +
      '<button type="button" class="btn" data-open-cards>Buka Kartu Sifat</button></article>');
  }

  /* ================= unit ================= */
  function unitView(id) {
    var u = C.unitById[id];
    var st = S.unit(id);
    var done = st.done;
    function row(href, num, title, sub, isDone, extra) {
      return '<li><a class="card row-card step-row' + (isDone ? ' done' : '') + '" href="' + href + '"><span class="num" aria-hidden="true">' + num + '</span>' +
        '<span class="u-body"><strong>' + title + '</strong><span class="muted small">' + sub + '</span></span>' +
        '<span class="state" aria-label="' + (isDone ? 'selesai' : 'belum') + '">' + (isDone ? '✓' : '') + '</span></a>' + (extra || '') + '</li>';
    }
    var n = 0, rows = '';
    if (u.segments.length) rows += row('#/unit/' + id + '/materi', ++n, 'Materi', u.segments.length + ' bagian singkat', done.materi);
    if (u.examples.length) rows += row('#/unit/' + id + '/contoh', ++n, 'Contoh soal', u.examples.length + ' contoh bertahap', done.contoh);
    C.LEVELS.forEach(function (l) {
      var list = C.exercisesOf(id, l);
      if (!list.length) return;
      var unlocked = S.isUnlocked(id, l);
      var solved = S.solvedCount(id, l);
      rows += row('#/unit/' + id + '/latihan/' + l, ++n, 'Latihan ' + C.LEVEL_LABEL[l] + (unlocked ? '' : ' <span class="lock" aria-label="terkunci">🔒</span>'),
        unlocked ? solved + ' dari ' + list.length + ' soal sudah benar' : 'Selesaikan 80% level sebelumnya, atau buka langsung', done['latihan-' + l]);
    });
    var cerita = C.modelingOf(id);
    if (cerita.length) rows += row('#/unit/' + id + '/soal-cerita', ++n, id === 'u8' ? 'Lab Pemodelan' : 'Soal cerita', cerita.length + ' soal · siklus 5 langkah', done.cerita);
    if (u.mission) {
      var stim = C.stimuli[u.mission];
      rows += row('#/misi/' + u.mission, ++n, 'Misi Literasi', esc(stim.title) + ' · ' + esc(stim.context), done.misi);
    }
    rows += row('#/unit/' + id + '/refleksi', ++n, 'Refleksi', 'Seberapa berat unit ini bagimu?', done.refleksi);
    return {
      title: 'Unit ' + u.order,
      back: '#/belajar',
      html: '<section class="card hero left"><h2>' + esc(u.title) + '</h2><p class="muted">' + R(u.subtitle) + '</p>' +
        '<p class="small"><strong>Setelah unit ini, kamu bisa:</strong></p><ul class="bullets">' + u.objectives.map(function (o) { return '<li>' + R(o) + '</li>'; }).join('') + '</ul>' +
        (u.properties.length ? '<p class="small">Sifat yang dipelajari: ' + u.properties.map(propChip).join(' ') + '</p>' : '') + '</section>' +
        '<ol class="step-list">' + rows + '</ol>',
      mount: function () { S.state.lastUnit = id; S.save(); }
    };
  }

  /* ================= materi ================= */
  function lessonView(id) {
    var u = C.unitById[id];
    var idx = Math.min(S.unit(id).lastSegment || 0, u.segments.length - 1);
    var view = { title: 'Materi · Unit ' + u.order, back: '#/unit/' + id, html: '' };
    view.mount = function (root) {
      function draw() {
        var seg = u.segments[idx];
        root.innerHTML = '<div class="progress-line"><span class="small muted">Bagian ' + (idx + 1) + ' dari ' + u.segments.length + '</span>' + bar((idx + 1) / u.segments.length, '') + '</div>' +
          '<article class="card segment"><h2>' + esc(seg.title) + '</h2><p>' + R(seg.body) + '</p>' + tableHtml(seg.table) +
          (seg.key ? '<div class="key"><span class="key-label">Ide kunci</span>' + R(seg.key) + '</div>' : '') + '</article>' +
          '<div class="actions"><button class="btn ghost" data-prev ' + (idx === 0 ? 'disabled' : '') + '>Kembali</button>' +
          '<button class="btn primary" data-next>' + (idx === u.segments.length - 1 ? 'Selesai' : 'Lanjut') + '</button></div>';
        root.querySelector('[data-prev]').addEventListener('click', function () { idx -= 1; S.setLastSegment(id, idx); draw(); window.scrollTo(0, 0); });
        root.querySelector('[data-next]').addEventListener('click', function () {
          if (idx < u.segments.length - 1) { idx += 1; S.setLastSegment(id, idx); draw(); window.scrollTo(0, 0); return; }
          S.markDone(id, 'materi');
          S.setLastSegment(id, 0);
          toast('Materi selesai. Ayo lihat contoh soalnya!');
          go(u.examples.length ? '#/unit/' + id + '/contoh' : '#/unit/' + id);
        });
      }
      draw();
    };
    return view;
  }

  /* ================= contoh soal bertahap ================= */
  function examplesView(id) {
    var u = C.unitById[id];
    var exIdx = 0, shown = 1, askOk = {}, whyOk = false;
    var view = { title: 'Contoh Soal · Unit ' + u.order, back: '#/unit/' + id, html: '' };
    view.mount = function (root) {
      function draw() {
        var ex = u.examples[exIdx];
        var cur = ex.steps[shown - 1];
        var pendingAsk = cur && cur.ask && !askOk[shown - 1];
        var allShown = shown >= ex.steps.length && !pendingAsk;
        var html = '<div class="progress-line"><span class="small muted">Contoh ' + (exIdx + 1) + ' dari ' + u.examples.length + '</span>' + bar((exIdx + 1) / u.examples.length, '') + '</div>' +
          '<article class="card"><p class="prompt">' + R(ex.prompt) + '</p><ol class="steps">';
        ex.steps.slice(0, shown).forEach(function (s, i) {
          var hide = s.ask && !askOk[i];
          html += '<li class="' + (i === shown - 1 ? 'new' : '') + '">' + (hide ? '<span class="muted">Coba isi langkah ini sendiri:</span>' : R(s.text)) + ' ' + propChip(s.prop) + '</li>';
        });
        html += '</ol>';
        if (pendingAsk) {
          html += '<form class="ask" data-ask>' + answerInput('ask-in', { label: cur.ask.prompt }) + '<div data-fb></div>' +
            '<div class="row-btns"><button class="btn primary" type="submit">Periksa</button><button class="btn ghost" type="button" data-reveal hidden>Tunjukkan jawabannya</button></div></form>';
        }
        if (allShown && ex.why) {
          html += '<div class="why"><p><strong>Pikirkan:</strong> ' + R(ex.why.question) + '</p>' + choiceGroup('why', ex.why.options, { order: shuffle(ex.why.options.map(function (_, i) { return i; })) }) +
            '<div data-why-fb></div><button class="btn small" data-why-check ' + (whyOk ? 'hidden' : '') + '>Periksa</button></div>';
        }
        html += '</article><div class="actions">';
        if (!allShown) html += '<button class="btn primary" data-step ' + (pendingAsk ? 'disabled' : '') + '>Langkah berikutnya</button>';
        else html += '<button class="btn primary" data-next-ex ' + (ex.why && !whyOk ? 'disabled' : '') + '>' + (exIdx < u.examples.length - 1 ? 'Contoh berikutnya' : 'Selesai, lanjut latihan') + '</button>';
        html += '</div>';
        root.innerHTML = html;

        var stepBtn = root.querySelector('[data-step]');
        if (stepBtn) stepBtn.addEventListener('click', function () { shown += 1; draw(); });
        var form = root.querySelector('[data-ask]');
        if (form) {
          var tries = 0;
          form.addEventListener('submit', function (e) {
            e.preventDefault();
            var res = G.gradeInput(cur.ask, form.querySelector('#ask-in').value);
            form.querySelector('[data-fb]').innerHTML = feedbackHtml(res);
            if (res.status === 'correct') { askOk[shown - 1] = true; setTimeout(draw, 700); }
            else if (res.status === 'wrong') { tries += 1; if (tries >= 1) form.querySelector('[data-reveal]').hidden = false; }
          });
          form.querySelector('[data-reveal]').addEventListener('click', function () { askOk[shown - 1] = true; draw(); });
        }
        var wc = root.querySelector('[data-why-check]');
        if (wc) wc.addEventListener('click', function () {
          var res = G.gradeChoice({ correct: ex.why.correct }, readChoice(root, 'why'));
          if (res.status === 'wrong') res.feedback = 'Belum tepat. Lihat lagi langkah-langkahnya.';
          root.querySelector('[data-why-fb]').innerHTML = feedbackHtml(res);
          if (res.status === 'correct') { whyOk = true; lockGroup(root, 'why'); wc.hidden = true; root.querySelector('[data-next-ex]').disabled = false; }
        });
        var nx = root.querySelector('[data-next-ex]');
        if (nx) nx.addEventListener('click', function () {
          if (exIdx < u.examples.length - 1) { exIdx += 1; shown = 1; askOk = {}; whyOk = false; draw(); window.scrollTo(0, 0); return; }
          S.markDone(id, 'contoh');
          go(C.exercisesOf(id, 'dasar').length ? '#/unit/' + id + '/latihan/dasar' : '#/unit/' + id);
        });
      }
      draw();
    };
    return view;
  }

  /* ================= latihan bertingkat & latihan ulang ================= */
  function practiceView(opt) {
    var review = !!opt.review;
    var unitId = opt.unitId, level = opt.level;
    var u = unitId && C.unitById[unitId];
    var title = review ? 'Latihan Ulang' : 'Latihan ' + C.LEVEL_LABEL[level] + ' · Unit ' + u.order;
    var back = review ? '#/' : '#/unit/' + unitId;

    if (!review && !S.isUnlocked(unitId, level)) {
      return {
        title: title, back: back,
        html: '<div class="card"><h2>Level ini masih terkunci</h2><p>Level ini terbuka otomatis setelah 80% soal di level sebelumnya kamu jawab dengan benar. Kamu juga boleh membukanya sekarang.</p>' +
          '<div class="row-btns"><button class="btn primary" data-unlock>Buka level ini</button><a class="btn ghost" href="' + back + '">Kembali</a></div></div>',
        mount: function (root) {
          root.querySelector('[data-unlock]').addEventListener('click', function () { S.unlockManually(unitId, level); route(); });
        }
      };
    }

    var queue = review ? shuffle(S.dueReviews().map(function (id) { return C.exerciseById[id]; })) : shuffle(C.exercisesOf(unitId, level));
    var idx = 0, firstRight = 0, wrongStreak = 0;
    var view = { title: title, back: back, html: '' };

    view.mount = function (root) {
      if (!queue.length) {
        root.innerHTML = '<div class="card"><h2>' + (review ? 'Tidak ada soal untuk diulang hari ini' : 'Belum ada soal') + '</h2><p class="muted">' +
          (review ? 'Soal yang belum tepat akan muncul lagi besok untuk diulang.' : '') + '</p><a class="btn primary" href="' + back + '">Kembali</a></div>';
        return;
      }
      function summary() {
        if (!review) S.markDone(unitId, 'latihan-' + level);
        var nextLevel = !review && C.LEVELS[C.LEVELS.indexOf(level) + 1];
        var hasNext = nextLevel && C.exercisesOf(unitId, nextLevel).length;
        root.innerHTML = '<div class="card center"><h2>Latihan selesai</h2><p>Kamu menjawab benar <strong>' + firstRight + ' dari ' + queue.length + '</strong> soal pada percobaan pertama.</p>' +
          '<p class="muted small">Soal yang belum tepat akan muncul lagi di Latihan Ulang besok.</p>' +
          '<div class="col-btns">' + (hasNext && S.isUnlocked(unitId, nextLevel) ? '<a class="btn primary" href="#/unit/' + unitId + '/latihan/' + nextLevel + '">Lanjut ke Level ' + C.LEVEL_LABEL[nextLevel] + '</a>' : '') +
          '<button class="btn" data-again>Ulangi latihan ini</button><a class="btn ghost" href="' + back + '">Kembali</a></div></div>';
        root.querySelector('[data-again]').addEventListener('click', function () { route(); });
      }

      function draw() {
        if (idx >= queue.length) return summary();
        var ex = queue[idx];
        var exUnit = C.unitById[ex.unit];
        var tries = 0, hintsUsed = 0, finished = false, firstDone = false;
        var html = '<div class="progress-line"><span class="small muted">Soal ' + (idx + 1) + ' dari ' + queue.length + (review ? ' · Unit ' + exUnit.order : '') +
          '</span><span class="badge lvl-' + ex.level + '">' + C.LEVEL_LABEL[ex.level] + '</span>' + bar((idx + 1) / queue.length, '') + '</div>' +
          '<form class="card exercise" data-ex data-exid="' + ex.id + '"><p class="prompt">' + R(ex.prompt) + '</p>';
        if (ex.type === 'input') html += answerInput('ans');
        else if (ex.type === 'mcq') html += choiceGroup('opt', ex.options, { order: shuffle(ex.options.map(function (_, i) { return i; })), label: 'Pilihan jawaban' });
        else if (ex.type === 'choose-property') {
          html += choiceGroup('opt', ex.options.map(function (pid) { var p = C.properties[pid]; return '**' + propName(pid) + '** · ' + p.name + ' — ' + p.formula; }), { label: 'Pilih sifat' });
        }
        html += '<div data-fb></div><div data-hints class="hint-area"></div>' +
          '<div data-suggest></div>' +
          '<div class="actions"><button type="button" class="btn ghost" data-explain hidden>Lihat pembahasan</button>' +
          '<button type="submit" class="btn primary" data-check>Periksa</button>' +
          '<button type="button" class="btn primary" data-next hidden>' + (idx < queue.length - 1 ? 'Soal berikutnya' : 'Lihat hasil') + '</button></div></form>';
        root.innerHTML = html;

        var form = root.querySelector('[data-ex]');
        var fb = root.querySelector('[data-fb]');
        mountHints(root.querySelector('[data-hints]'), ex.hints, ex.unit, function (n) { hintsUsed = n; });

        function finish(correct, res) {
          finished = true;
          root.querySelector('[data-check]').hidden = true;
          root.querySelector('[data-explain]').hidden = true;
          var nb = root.querySelector('[data-next]');
          nb.hidden = false;
          nb.focus();
          if (correct) fb.innerHTML = feedbackHtml({ status: 'correct' }, ex.explanation);
          else fb.innerHTML = feedbackHtml(res) + '<div class="fb info"><strong>Pembahasan:</strong> ' + R(ex.explanation) + '</div>';
          var inp = root.querySelector('#ans'); if (inp) inp.readOnly = true;
          lockGroup(root, 'opt');
        }

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          if (finished) return;
          var res;
          if (ex.type === 'input') res = G.gradeInput(ex, root.querySelector('#ans').value);
          else if (ex.type === 'mcq') res = G.gradeChoice(ex, readChoice(root, 'opt'));
          else {
            var pick = readChoice(root, 'opt');
            res = G.gradeChoice({ correct: ex.options.indexOf(ex.correct), optionFeedback: {} }, pick);
            if (res.status === 'wrong') {
              var p = C.properties[ex.options[pick]];
              res.feedback = propName(p.id) + ' dipakai jika: ' + p.when;
            }
          }
          if (res.status === 'empty' || res.status === 'invalid') { fb.innerHTML = feedbackHtml(res); return; }
          var ok = res.status === 'correct';
          if (!firstDone) {
            firstDone = true;
            S.recordAttempt({ kind: 'exercise', ex: ex.id, unit: ex.unit, props: ex.props, correct: ok, mis: res.mis, hints: hintsUsed, first: true });
            if (review) S.reviewResult(ex.id, ok);
            else if (!ok) S.scheduleWrong(ex.id);
            if (ok) { firstRight += 1; wrongStreak = 0; } else wrongStreak += 1;
          }
          if (ok) {
            S.markSolved(ex.unit, ex.level, ex.id);
            finish(true);
            return;
          }
          tries += 1;
          fb.innerHTML = feedbackHtml(res);
          root.querySelector('[data-explain]').hidden = false;
          if (wrongStreak >= 2 && exUnit.examples.length) {
            root.querySelector('[data-suggest]').innerHTML = '<div class="fb info">Sepertinya soal ini masih sulit. Mau lihat contoh soal yang mirip dulu? ' +
              '<button type="button" class="link" data-example="' + ex.unit + ':0">Lihat contoh</button></div>';
          }
          var inp = root.querySelector('#ans'); if (inp) { inp.focus(); inp.select(); }
          if (tries >= 3) finish(false, res);
        });
        root.querySelector('[data-explain]').addEventListener('click', function () { finish(false, { status: 'wrong', feedback: 'Tidak apa-apa. Pelajari pembahasannya, lalu coba soal berikutnya.' }); });
        root.querySelector('[data-next]').addEventListener('click', function () { idx += 1; draw(); window.scrollTo(0, 0); });
      }
      draw();
    };
    return view;
  }

  /* ================= daftar soal cerita / Lab Pemodelan ================= */
  function modelingListView(unitId, asTab) {
    var list = C.modelingOf(unitId).slice();
    var order = { contoh: 0, rumpang: 1, terbimbing: 2 };
    list.sort(function (a, b) { return order[a.stage] - order[b.stage]; });
    var u = C.unitById[unitId];
    var html = '<section class="card hero left"><h2>' + (unitId === 'u8' ? 'Lab Pemodelan' : 'Soal cerita · ' + esc(u.title)) + '</h2>' +
      '<p class="muted">Setiap soal cerita dikerjakan dengan 5 langkah: ' + STEP_KEYS.map(function (k) { return STEP_NUM[k] + ' ' + STEP_LABEL[k]; }).join(' → ') + '.</p>' +
      (unitId === 'u8' && !S.unit('u8').done.materi ? '<a class="btn small" href="#/unit/u8/materi">Pelajari dulu 5 langkahnya</a>' : '') + '</section><ol class="step-list">' +
      list.map(function (m, i) {
        var st = S.state.modeling[m.id];
        var fin = st && st.finished;
        return '<li><a class="card row-card step-row' + (fin ? ' done' : '') + '" href="#/lab/' + m.id + '"><span class="num" aria-hidden="true">' + (i + 1) + '</span>' +
          '<span class="u-body"><strong>' + esc(m.title) + '</strong><span class="muted small">' + m.type + ' · ' + esc(C.TYPE_LABEL[m.type]) + ' · ' + esc(C.STAGE_LABEL[m.stage]) + '</span></span>' +
          '<span class="state">' + (fin ? '✓' : '') + '</span></a></li>';
      }).join('') + '</ol>';
    return { title: asTab ? 'Lab Pemodelan' : 'Soal Cerita', tab: asTab ? 'lab' : null, back: asTab ? null : '#/unit/' + unitId, html: html };
  }

  /* ================= Lab Pemodelan 5 langkah ================= */
  function filledStep(p, step) {
    if (step === 'understand') {
      var u = p.understand;
      return '<dl class="dl"><dt>Diketahui</dt><dd><ul>' + u.known.map(function (k) { return '<li>' + R(k.label) + ': <strong>' + M.previewInput(k.answer) + '</strong> ' + esc(k.unit || '') + '</li>'; }).join('') + '</ul></dd>' +
        '<dt>Ditanya</dt><dd>' + R(u.asked.options[u.asked.correct]) + '</dd>' +
        (u.irrelevant ? '<dt>Tidak diperlukan</dt><dd>' + R(u.irrelevant.options[u.irrelevant.correct]) + '</dd>' : '') + '</dl>';
    }
    if (step === 'model') {
      var md = p.model, t = md.table;
      var tbl = t ? tableHtml({ head: t.head, rows: t.rows.concat([[t.ask.label, t.ask.answer]]) }) : '';
      return tbl + '<p class="model-line"><strong>' + esc(md.lhs) + ' = ' + M.previewInput(md.answer) + '</strong></p><p>' + R(md.explanation) + '</p>';
    }
    if (step === 'solve') {
      return '<ol class="steps">' + p.solve.steps.map(function (s) { return '<li>' + R(s) + '</li>'; }).join('') + '</ol>';
    }
    if (step === 'interpret') {
      return '<p class="model-line">' + R(p.interpret.before) + ' <strong>' + M.previewInput(p.interpret.answer) + '</strong> ' + R(p.interpret.after) + '</p>';
    }
    return '<p>' + R(p.check.question) + '</p><p><strong>' + R(p.check.options[p.check.correct]) + '</strong></p>';
  }
  function fullSolutionHtml(p) {
    return '<article class="card"><p>' + R(p.text) + '</p></article>' + STEP_KEYS.map(function (k) {
      return '<article class="card"><h3>' + STEP_NUM[k] + ' ' + STEP_LABEL[k] + '</h3>' + filledStep(p, k) + '</article>';
    }).join('');
  }

  function labView(id) {
    var p = C.modelingById[id];
    var st = S.modeling(id);
    var highlight = true;
    var interactive = function (k) { return p.stage === 'terbimbing' || (p.stage === 'rumpang' && k === 'model') || k === 'check'; };
    var current = STEP_KEYS.filter(function (k) { return !st.done[k]; })[0] || 'check';
    var firstChecked = {};
    var all = C.modelingOf('u8');
    var back = p.unit === 'u8' ? '#/lab' : '#/unit/' + p.unit + '/soal-cerita';
    var view = { title: p.title, back: back, html: '' };

    view.mount = function (root) {
      function stepper() {
        return '<ol class="stepper" aria-label="Langkah pemodelan">' + STEP_KEYS.map(function (k) {
          var cls = st.done[k] ? 'done' : (k === current && !st.finished ? 'cur' : '');
          return '<li class="' + cls + '"' + (k === current ? ' aria-current="step"' : '') + '><span class="n">' + STEP_NUM[k] + '</span><span class="t">' + STEP_LABEL[k] + '</span></li>';
        }).join('') + '</ol>';
      }
      function problemCard() {
        return '<article class="card problem"><div class="problem-head"><span class="badge">' + p.type + ' · ' + esc(C.TYPE_LABEL[p.type]) + '</span>' +
          '<button type="button" class="btn ghost small" data-hl aria-pressed="' + highlight + '">' + (highlight ? 'Matikan sorotan' : 'Sorot bilangan') + '</button></div>' +
          '<p class="story">' + R(p.text, { highlight: highlight }) + '</p></article>';
      }

      function draw() {
        if (st.finished) return done();
        var k = current;
        var html = stepper() + problemCard() + '<section class="card step-card"><h2>' + STEP_NUM[k] + ' ' + STEP_LABEL[k] + '</h2><p class="guide">' + esc(STEP_GUIDE[k]) + '</p>';
        if (!interactive(k)) {
          html += '<div class="filled">' + filledStep(p, k) + '</div><div class="actions"><button class="btn primary" data-continue>Lanjut</button></div>';
        } else {
          html += '<form data-step-form>' + stepForm(k) + '<div data-fb></div><div data-hints class="hint-area"></div>' +
            '<div class="actions"><button type="submit" class="btn primary" data-check>Periksa</button><button type="button" class="btn primary" data-continue hidden>Lanjut ke langkah berikutnya</button></div></form>';
        }
        html += '</section><div class="center"><button class="btn ghost small" data-full ' + (st.attempts > 0 || p.stage === 'contoh' ? '' : 'disabled') + '>Lihat Pemodelan Lengkap</button>' +
          (st.attempts > 0 || p.stage === 'contoh' ? '' : '<p class="muted small">Tersedia setelah kamu mencoba minimal satu langkah.</p>') + '</div>';
        root.innerHTML = html;

        root.querySelector('[data-hl]').addEventListener('click', function () { highlight = !highlight; draw(); });
        root.querySelector('[data-full]').addEventListener('click', function () { st.revealed = true; S.saveModeling(); openSheet('Pemodelan lengkap', fullSolutionHtml(p)); });
        var cont = root.querySelector('[data-continue]');
        if (!interactive(k)) {
          cont.addEventListener('click', function () { completeStep(k); });
          return;
        }
        mountHints(root.querySelector('[data-hints]'), (p.hints && p.hints[k]) || [], p.unit);
        root.querySelector('[data-step-form]').addEventListener('submit', function (e) {
          e.preventDefault();
          var res = checkStep(k, root);
          if (!res) return;
          st.attempts += 1;
          S.saveModeling();
          root.querySelector('[data-full]').disabled = false;
          if (!firstChecked[k]) {
            firstChecked[k] = true;
            S.recordAttempt({ kind: 'model-step', model: p.id, step: k, correct: res.status === 'correct', mis: res.mis, first: true });
          }
          var extra = k === 'model' ? p.model.explanation : (k === 'solve' ? p.solve.steps.join(' → ') : '');
          root.querySelector('[data-fb]').innerHTML = feedbackHtml(res, extra);
          if (res.status === 'correct') {
            root.querySelector('[data-check]').hidden = true;
            cont.hidden = false;
            cont.focus();
            Array.prototype.forEach.call(root.querySelectorAll('[data-step-form] .ans'), function (i) { i.readOnly = true; });
            ['asked', 'irr', 'chk'].forEach(function (g) { lockGroup(root, g); });
          }
        });
        cont.addEventListener('click', function () { completeStep(k); });
      }

      function completeStep(k) {
        st.done[k] = true;
        var i = STEP_KEYS.indexOf(k);
        if (i === STEP_KEYS.length - 1) { st.finished = true; }
        else current = STEP_KEYS[i + 1];
        S.saveModeling();
        if (st.finished) {
          var list = C.modelingOf(p.unit);
          if (list.every(function (m) { return S.state.modeling[m.id] && S.state.modeling[m.id].finished; })) S.markDone(p.unit, 'cerita');
          if (all.every(function (m) { return S.state.modeling[m.id] && S.state.modeling[m.id].finished; })) S.markDone('u8', 'cerita');
        }
        draw();
        window.scrollTo(0, 0);
      }

      function done() {
        var list = C.modelingOf(p.unit === 'u8' ? 'u8' : p.unit);
        var pos = list.indexOf(p);
        var next = list[pos + 1];
        root.innerHTML = stepper() + '<section class="card center"><h2>Kelima langkah selesai!</h2><p>Kamu sudah memahami soal, membuat model, menyelesaikannya, menafsirkan hasilnya, dan memeriksanya.</p>' +
          '<div class="col-btns">' + (next ? '<a class="btn primary" href="#/lab/' + next.id + '">Soal berikutnya: ' + esc(next.title) + '</a>' : '') +
          '<button class="btn" data-full>Lihat pemodelan lengkap</button><button class="btn ghost" data-redo>Kerjakan ulang</button><a class="btn ghost" href="' + back + '">Kembali ke daftar</a></div></section>';
        root.querySelector('[data-full]').addEventListener('click', function () { openSheet('Pemodelan lengkap', fullSolutionHtml(p)); });
        root.querySelector('[data-redo]').addEventListener('click', function () {
          st.done = {}; st.finished = false; current = 'understand'; firstChecked = {}; S.saveModeling(); draw();
        });
      }

      draw();
    };

    function stepForm(k) {
      var h = '';
      if (k === 'understand') {
        var u = p.understand;
        h += '<fieldset><legend>Diketahui</legend>' + u.known.map(function (kn, i) {
          return answerInput('kn' + i, { label: kn.label, suffix: kn.unit, placeholder: 'isi bilangannya', noKeys: !/[\^\/]/.test(kn.answer) }) + '<span class="mark-slot" id="kn' + i + '-mk"></span>';
        }).join('') + '</fieldset>';
        h += '<fieldset><legend>Ditanya</legend>' + choiceGroup('asked', u.asked.options, { order: shuffle(u.asked.options.map(function (_, i) { return i; })) }) + '</fieldset>';
        if (u.irrelevant) h += '<fieldset><legend>Kalimat mana yang tidak diperlukan untuk menjawab?</legend>' + choiceGroup('irr', u.irrelevant.options, { order: shuffle(u.irrelevant.options.map(function (_, i) { return i; })) }) + '</fieldset>';
      } else if (k === 'model') {
        var t = p.model.table;
        if (t) {
          h += '<div class="tbl-wrap"><table class="tbl"><caption>Tabel pola</caption><thead><tr>' + t.head.map(function (x) { return '<th scope="col">' + R(x) + '</th>'; }).join('') + '</tr></thead><tbody>' +
            t.rows.map(function (r) { return '<tr>' + r.map(function (c) { return '<td>' + R(c) + '</td>'; }).join('') + '</tr>'; }).join('') +
            '<tr><td>' + esc(t.ask.label) + '</td><td><input id="tbl" class="ans small-in" type="text" inputmode="decimal" autocomplete="off" aria-label="Nilai untuk baris ' + esc(t.ask.label) + '" placeholder="?"></td></tr></tbody></table></div>';
        }
        h += answerInput('mdl', { label: p.model.prompt, prefix: p.model.lhs + ' =', placeholder: 'contoh: 5*2^n' });
      } else if (k === 'solve') {
        if (p.solve.n) h += answerInput('sn', { label: p.solve.n.prompt, placeholder: 'n', noKeys: true });
        h += answerInput('sv', { label: p.solve.prompt });
      } else if (k === 'interpret') {
        h += '<p class="model-line">' + R(p.interpret.before) + '</p>' + answerInput('ip', { placeholder: 'isi bilangannya', noKeys: true }) + '<p class="model-line">' + R(p.interpret.after) + '</p>';
      } else if (k === 'check') {
        h += '<p>' + R(p.check.question) + '</p>' + choiceGroup('chk', p.check.options, { order: shuffle(p.check.options.map(function (_, i) { return i; })) });
      }
      return h;
    }

    function checkStep(k, root) {
      function val(id) { var el = root.querySelector('#' + id); return el ? el.value : ''; }
      if (k === 'understand') {
        var u = p.understand, allOk = true, firstWrong = null, empty = false;
        u.known.forEach(function (kn, i) {
          var r = G.gradeInput({ answer: kn.answer, mode: 'value' }, val('kn' + i));
          var mk = root.querySelector('#kn' + i + '-mk');
          if (r.status === 'empty') empty = true;
          if (r.status !== 'correct') { allOk = false; if (!firstWrong) firstWrong = kn.label; }
          mk.textContent = r.status === 'correct' ? '✓' : (r.status === 'empty' ? '' : '↻ periksa lagi');
          mk.className = 'mark-slot ' + (r.status === 'correct' ? 'ok' : 'no');
        });
        var a = readChoice(root, 'asked');
        var ir = u.irrelevant ? readChoice(root, 'irr') : 0;
        if (empty || a == null || ir == null) return { status: 'empty', feedback: 'Lengkapi semua isian dan pilihan dulu.' };
        if (a !== u.asked.correct) { allOk = false; }
        if (u.irrelevant && ir !== u.irrelevant.correct) { allOk = false; }
        if (allOk) return { status: 'correct' };
        var msg = [];
        if (firstWrong) msg.push('Periksa lagi bilangan pada isian "' + firstWrong + '".');
        if (a !== u.asked.correct) msg.push('Baca lagi kalimat tanya di akhir soal.');
        if (u.irrelevant && ir !== u.irrelevant.correct) msg.push('Kalimat yang kamu pilih justru diperlukan. Cari kalimat yang tidak memengaruhi jawaban.');
        return { status: 'wrong', feedback: msg.join(' ') };
      }
      if (k === 'model') {
        if (p.model.table) {
          var tr = G.gradeInput({ answer: p.model.table.ask.answer, mode: 'value' }, val('tbl'));
          if (tr.status === 'empty') return { status: 'empty', feedback: 'Isi dulu baris kosong pada tabel pola.' };
          if (tr.status !== 'correct') return { status: 'wrong', feedback: 'Baris tabel belum tepat. Lihat baris sebelumnya: setiap baris dikali berapa?' };
        }
        return G.gradeInput({ answer: p.model.answer, mode: 'model', wrong: p.model.wrong }, val('mdl'));
      }
      if (k === 'solve') {
        if (p.solve.n) {
          var rn = G.gradeInput({ answer: p.solve.n.answer, mode: 'value', wrong: p.solve.n.wrong }, val('sn'));
          if (rn.status !== 'correct') { if (rn.status === 'wrong' && !p.solve.n.wrong) rn.feedback = 'Nilai n belum tepat. n adalah banyaknya kejadian (langkah).'; return rn; }
        }
        return G.gradeInput({ answer: p.solve.answer, mode: p.solve.mode || 'value', accept: p.solve.accept, wrong: p.solve.wrong, formHint: p.solve.formHint }, val('sv'));
      }
      if (k === 'interpret') {
        var raw = val('ip').replace(/[a-zA-Z³²]+\.?/g, ' ').trim();
        var ri = G.gradeInput({ answer: p.interpret.answer, mode: 'value' }, raw);
        if (ri.status === 'wrong') ri.feedback = 'Bilangan dalam kalimat belum sesuai dengan hasil langkah ③.';
        return ri;
      }
      return G.gradeChoice(p.check, readChoice(root, 'chk'));
    }

    return view;
  }

  /* ================= Misi Literasi ================= */
  function missionView(id) {
    var s = C.stimuli[id];
    var u = C.unitById[s.unit];
    var mst = S.mission(id);
    var view = {
      title: 'Misi Literasi',
      back: '#/unit/' + s.unit,
      html: '<details class="card stimulus" open><summary><span class="badge">' + esc(s.context) + '</span> Bacaan: <strong>' + esc(s.title) + '</strong></summary>' +
        '<p>' + R(s.body) + '</p>' + tableHtml(s.table) + '<p class="muted small">Sumber data: ' + esc(s.source) + '</p></details>' +
        s.questions.map(function (q, i) {
          var h = '<form class="card q" data-q="' + i + '"><div class="progress-line"><span class="small muted">Soal ' + (i + 1) + ' dari ' + s.questions.length + '</span><span class="badge cog">' + COG_LABEL[q.level] + '</span></div>';
          if (q.type === 'input') h += '<p class="prompt">' + R(q.prompt) + '</p>' + answerInput('q' + i + 'in');
          if (q.type === 'multi') h += '<p class="prompt">' + R(q.prompt) + '</p>' + choiceGroup('q' + i, q.options, { multi: true });
          if (q.type === 'tfr') {
            h += '<p class="prompt">Pernyataan: <em>' + R(q.statement) + '</em></p><p class="small"><strong>Apakah pernyataan itu benar?</strong></p>' +
              choiceGroup('q' + i + 'tf', ['Benar', 'Salah'], { inline: true }) + '<p class="small"><strong>Pilih alasannya:</strong></p>' +
              choiceGroup('q' + i + 'rs', q.reasons, { order: shuffle(q.reasons.map(function (_, j) { return j; })) });
          }
          return h + '<div data-fb></div><div class="actions"><button type="submit" class="btn primary">Periksa</button></div></form>';
        }).join('') + '<div data-mission-end></div>',
      mount: function (root) {
        var tries = {};
        Array.prototype.forEach.call(root.querySelectorAll('[data-q]'), function (form) {
          var i = +form.getAttribute('data-q');
          var q = s.questions[i];
          form.addEventListener('submit', function (e) {
            e.preventDefault();
            var res;
            if (q.type === 'input') res = G.gradeInput(q, form.querySelector('#q' + i + 'in').value);
            else if (q.type === 'multi') res = G.gradeMulti(q, readChoice(form, 'q' + i));
            else {
              var tf = readChoice(form, 'q' + i + 'tf');
              res = G.gradeTrueFalse(q, tf == null ? null : tf === 0, readChoice(form, 'q' + i + 'rs'));
            }
            if (res.status === 'empty' || res.status === 'invalid') { form.querySelector('[data-fb]').innerHTML = feedbackHtml(res); return; }
            tries[i] = (tries[i] || 0) + 1;
            if (tries[i] === 1) {
              mst.answers[q.id] = { correct: res.status === 'correct', level: q.level };
              S.recordAttempt({ kind: 'literacy', q: q.id, level: q.level, correct: res.status === 'correct', first: true });
            }
            var end = res.status === 'correct' || tries[i] >= 2;
            form.querySelector('[data-fb]').innerHTML = feedbackHtml(res, res.status === 'correct' ? q.explanation : '') +
              (end && res.status !== 'correct' ? '<div class="fb info"><strong>Pembahasan:</strong> ' + R(q.explanation) + '</div>' : '');
            if (end) {
              form.querySelector('button[type=submit]').hidden = true;
              Array.prototype.forEach.call(form.querySelectorAll('.choices'), function (g) { lockGroup(form, g.getAttribute('data-group')); });
              var inp = form.querySelector('.ans'); if (inp) inp.readOnly = true;
              mst.answers[q.id].ended = true;
              S.save();
              checkEnd();
            }
          });
        });
        function checkEnd() {
          var all = s.questions.every(function (q) { return mst.answers[q.id] && mst.answers[q.id].ended; });
          if (!all) return;
          S.markDone(s.unit, 'misi');
          var byLevel = {};
          s.questions.forEach(function (q) {
            byLevel[q.level] = byLevel[q.level] || { r: 0, n: 0 };
            byLevel[q.level].n += 1;
            if (mst.answers[q.id].correct) byLevel[q.level].r += 1;
          });
          root.querySelector('[data-mission-end]').innerHTML = '<section class="card center"><h2>Misi selesai!</h2><p>Benar pada percobaan pertama:</p><ul class="plain">' +
            Object.keys(byLevel).map(function (l) { return '<li>' + COG_LABEL[l] + ': ' + byLevel[l].r + ' dari ' + byLevel[l].n + '</li>'; }).join('') + '</ul>' +
            '<div class="col-btns"><a class="btn primary" href="#/unit/' + u.id + '/refleksi">Lanjut ke refleksi</a><a class="btn ghost" href="#/unit/' + u.id + '">Kembali ke unit</a></div></section>';
        }
        mst.answers = {};
      }
    };
    return view;
  }

  /* ================= refleksi ================= */
  function reflectionView(id) {
    var u = C.unitById[id];
    var notes = ['Aku paham kapan memakai sifat-sifat di unit ini', 'Aku masih bingung memilih sifat yang tepat', 'Aku perlu latihan lagi', 'Aku bisa menjelaskan materi ini ke teman'];
    var scale = [];
    for (var i = 1; i <= 9; i++) scale.push(String(i));
    return {
      title: 'Refleksi · Unit ' + u.order,
      back: '#/unit/' + id,
      html: '<form class="card" data-refl><h2>Seberapa besar usaha berpikirmu di unit ini?</h2>' +
        '<div class="scale-labels small muted"><span>1 = sangat ringan</span><span>9 = sangat berat</span></div>' +
        choiceGroup('effort', scale, { inline: true, label: 'Skala usaha mental 1 sampai 9' }) +
        '<h3>Pilih yang sesuai dengan dirimu (boleh lebih dari satu)</h3>' + choiceGroup('notes', notes, { multi: true }) +
        '<div data-fb></div><div class="actions"><button class="btn primary" type="submit">Simpan refleksi</button></div></form>',
      mount: function (root) {
        root.querySelector('[data-refl]').addEventListener('submit', function (e) {
          e.preventDefault();
          var eff = readChoice(root, 'effort');
          if (eff == null) { root.querySelector('[data-fb]').innerHTML = feedbackHtml({ status: 'empty', feedback: 'Pilih angka 1 sampai 9 dulu.' }); return; }
          var picked = readChoice(root, 'notes').map(function (i) { return notes[i]; });
          S.addReflection({ unit: id, effort: eff + 1, notes: picked });
          S.markDone(id, 'refleksi');
          toast('Refleksi tersimpan. Terima kasih!');
          go('#/unit/' + id);
        });
      }
    };
  }

  /* ================= kemajuan ================= */
  function level(stat) {
    if (!stat || !stat.total) return { label: 'Belum dicoba', r: 0 };
    var r = stat.right / stat.total;
    return { label: r >= 0.8 ? 'Kuat' : r >= 0.5 ? 'Berkembang' : 'Mulai', r: r };
  }
  function progressView() {
    var pm = S.propertyMastery();
    var ms = S.modelingStepStats();
    var mis = S.misconceptionCounts();
    var topMis = Object.keys(mis).sort(function (a, b) { return mis[b] - mis[a]; }).slice(0, 3);
    var refl = S.state.reflections.slice(-5).reverse();
    var due = S.dueReviews().length;
    var html = '<section class="card"><h2>Unit</h2><ul class="plain">' + C.units.map(function (u) {
      var pr = unitProgress(u);
      return '<li class="prog-row"><span>' + u.order + '. ' + esc(u.title) + '</span>' + bar(pr.done / pr.total, pr.done + ' dari ' + pr.total + ' bagian') + '<span class="small muted">' + pr.done + '/' + pr.total + '</span></li>';
    }).join('') + '</ul></section>';
    html += '<section class="card"><h2>Penguasaan sifat</h2><p class="muted small">Berdasarkan jawaban pada percobaan pertama.</p><ul class="plain">' + C.propertyList.map(function (p) {
      var lv = level(pm[p.id]);
      return '<li class="prog-row"><span>' + propChip(p.id) + '</span>' + bar(lv.r, lv.label) + '<span class="small">' + lv.label + '</span></li>';
    }).join('') + '</ul></section>';
    html += '<section class="card"><h2>Langkah pemodelan</h2><ul class="plain">' + STEP_KEYS.map(function (k) {
      var lv = level(ms[k]);
      return '<li class="prog-row"><span>' + STEP_NUM[k] + ' ' + STEP_LABEL[k] + '</span>' + bar(lv.r, lv.label) + '<span class="small">' + lv.label + '</span></li>';
    }).join('') + '</ul></section>';
    if (topMis.length) {
      html += '<section class="card"><h2>Yang perlu diperhatikan</h2><ul class="plain">' + topMis.map(function (id) {
        var m = C.misconceptions[id];
        return m ? '<li class="tip"><strong>' + esc(m.label) + '</strong><div class="small">' + R(m.feedback) + '</div></li>' : '';
      }).join('') + '</ul></section>';
    }
    html += '<section class="card"><h2>Latihan ulang</h2><p>' + (due ? due + ' soal siap diulang hari ini.' : 'Tidak ada soal untuk diulang hari ini.') + '</p>' +
      (due ? '<a class="btn primary" href="#/ulang">Mulai latihan ulang</a>' : '') + '</section>';
    if (refl.length) {
      html += '<section class="card"><h2>Refleksi terakhir</h2><ul class="plain">' + refl.map(function (r) {
        return '<li>Unit ' + C.unitById[r.unit].order + ': usaha berpikir ' + r.effort + ' dari 9</li>';
      }).join('') + '</ul></section>';
    }
    return { title: 'Kemajuan', tab: 'progress', html: html };
  }

  /* ================= pengaturan ================= */
  function applySettings() {
    var st = S.state.settings;
    document.documentElement.style.fontSize = (st.textScale * 100) + '%';
    if (st.theme === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', st.theme);
    document.documentElement.classList.toggle('reduce-motion', !!st.reduceMotion);
  }
  function settingsView() {
    var st = S.state.settings, prof = S.state.profile;
    function seg(name, opts, cur) {
      return '<div class="seg" role="radiogroup">' + opts.map(function (o) {
        return '<button type="button" role="radio" aria-checked="' + (o[0] === cur) + '" class="' + (o[0] === cur ? 'on' : '') + '" data-set="' + name + '" data-val="' + o[0] + '">' + o[1] + '</button>';
      }).join('') + '</div>';
    }
    return {
      title: 'Pengaturan', tab: 'settings',
      html: '<form class="card" data-prof><h2>Profil</h2><label class="lbl" for="nick">Nama panggilan</label><input id="nick" class="field" maxlength="20" value="' + esc(prof.nickname) + '">' +
        '<label class="lbl" for="grade">Kelas</label><select id="grade" class="field">' + [7, 8, 9].map(function (g) { return '<option value="' + g + '"' + (g === prof.grade ? ' selected' : '') + '>Kelas ' + g + '</option>'; }).join('') + '</select>' +
        '<button class="btn" type="submit">Simpan profil</button></form>' +
        '<section class="card"><h2>Tampilan</h2><p class="lbl">Ukuran teks</p>' + seg('textScale', [[1, 'Normal'], [1.15, 'Besar'], [1.3, 'Sangat besar']], st.textScale) +
        '<p class="lbl">Tema</p>' + seg('theme', [['system', 'Ikuti perangkat'], ['light', 'Terang'], ['dark', 'Gelap']], st.theme) +
        '<label class="check"><input type="checkbox" id="rm"' + (st.reduceMotion ? ' checked' : '') + '> Kurangi animasi</label></section>' +
        '<section class="card"><h2>Aplikasi</h2><a class="btn" href="#/pasang">Cara memasang aplikasi</a></section>' +
        '<section class="card"><h2>Data</h2><p class="muted small">Semua data belajarmu hanya tersimpan di perangkat ini.</p>' +
        '<div class="col-btns"><button class="btn" data-export>Unduh data belajar (JSON)</button><button class="btn danger" data-reset>Hapus semua data</button></div>' +
        '<div data-confirm hidden class="fb no"><p><strong>Yakin ingin menghapus semua data?</strong> Kemajuan belajar tidak dapat dikembalikan.</p>' +
        '<div class="row-btns"><button class="btn danger" data-reset-yes>Ya, hapus</button><button class="btn ghost" data-reset-no>Batal</button></div></div></section>' +
        '<p class="center muted small">EksponenKu versi ' + VERSION + '</p>',
      mount: function (root) {
        root.querySelector('[data-prof]').addEventListener('submit', function (e) {
          e.preventDefault();
          var nick = root.querySelector('#nick').value.trim().slice(0, 20);
          if (!nick) return;
          prof.nickname = nick; prof.grade = +root.querySelector('#grade').value; S.setProfile(prof); toast('Profil tersimpan.');
        });
        Array.prototype.forEach.call(root.querySelectorAll('[data-set]'), function (b) {
          b.addEventListener('click', function () {
            var name = b.getAttribute('data-set'), v = b.getAttribute('data-val');
            S.setSetting(name, name === 'textScale' ? +v : v);
            applySettings();
            route();
          });
        });
        root.querySelector('#rm').addEventListener('change', function (e) { S.setSetting('reduceMotion', e.target.checked); applySettings(); });
        root.querySelector('[data-export]').addEventListener('click', function () {
          var blob = new Blob([JSON.stringify(S.state, null, 2)], { type: 'application/json' });
          var a = document.createElement('a');
          a.href = URL.createObjectURL(blob);
          a.download = 'eksponenku-data.json';
          document.body.appendChild(a); a.click(); a.remove();
        });
        var conf = root.querySelector('[data-confirm]');
        root.querySelector('[data-reset]').addEventListener('click', function () { conf.hidden = false; });
        root.querySelector('[data-reset-no]').addEventListener('click', function () { conf.hidden = true; });
        root.querySelector('[data-reset-yes]').addEventListener('click', function () { S.reset(); applySettings(); go('#/'); });
      }
    };
  }

  /* ================= pasang aplikasi ================= */
  function installView() {
    var html = '<section class="card hero left"><h2>Pasang EksponenKu</h2><p>EksponenKu dapat dipasang langsung dari browser, <strong>tanpa Play Store atau App Store</strong>. Setelah dipasang, aplikasi muncul sebagai ikon dan bisa dipakai tanpa internet.</p>' +
      (isStandalone() ? '<div class="fb ok">✓ Aplikasi sudah terpasang di perangkat ini.</div>' : '') +
      (installEvt ? '<button class="btn primary block" data-install>Pasang sekarang</button>' : '') + '</section>' +
      '<section class="card"><h3>Android (Chrome)</h3><ol><li>Buka alamat aplikasi di Chrome.</li><li>Ketuk menu ⋮, lalu pilih <strong>Instal aplikasi</strong> atau <strong>Tambahkan ke layar utama</strong>.</li></ol>' +
      '<div data-apk></div></section>' +
      '<section class="card"><h3>iPhone / iPad (Safari)</h3><ol><li>Buka alamat aplikasi di <strong>Safari</strong>.</li><li>Ketuk tombol <strong>Bagikan</strong> (kotak dengan panah ke atas).</li><li>Pilih <strong>Tambahkan ke Layar Utama</strong>, lalu ketuk <strong>Tambah</strong>.</li></ol></section>' +
      '<section class="card"><h3>Windows / Mac (Chrome atau Edge)</h3><ol><li>Buka alamat aplikasi.</li><li>Klik ikon <strong>Instal</strong> di ujung kanan kolom alamat, atau buka menu lalu pilih <strong>Instal EksponenKu</strong>.</li></ol>' +
      '<p class="muted small">Di Mac dengan Safari: menu <strong>File → Tambahkan ke Dock</strong>.</p></section>';
    return {
      title: 'Pasang Aplikasi', back: S.state.profile ? '#/pengaturan' : '#/', html: html,
      mount: function (root) {
        var b = root.querySelector('[data-install]');
        if (b) b.addEventListener('click', function () {
          installEvt.prompt();
          installEvt.userChoice.then(function () { installEvt = null; route(); });
        });
        if (location.protocol.indexOf('http') === 0 && window.fetch) {
          fetch('downloads/EksponenKu.apk', { method: 'HEAD' }).then(function (r) {
            if (r.ok) root.querySelector('[data-apk]').innerHTML = '<p>Atau unduh file APK, lalu buka file itu untuk memasang. Jika diminta, izinkan pemasangan dari sumber ini.</p><a class="btn" href="downloads/EksponenKu.apk" download>Unduh APK Android</a>';
          }).catch(function () { });
        }
      }
    };
  }

  /* ================= inisialisasi ================= */
  function globalHandlers() {
    document.addEventListener('click', function (e) {
      var t = e.target;
      var opt = t.closest('.opt');
      if (opt && !opt.disabled) {
        var g = opt.closest('[data-group]');
        if (g && !g.classList.contains('locked')) {
          if (g.hasAttribute('data-multi')) {
            opt.classList.toggle('sel');
            opt.setAttribute('aria-checked', opt.classList.contains('sel'));
          } else {
            Array.prototype.forEach.call(g.querySelectorAll('.opt'), function (b) { b.classList.remove('sel'); b.setAttribute('aria-checked', 'false'); });
            opt.classList.add('sel');
            opt.setAttribute('aria-checked', 'true');
          }
        }
        return;
      }
      var key = t.closest('.keys button');
      if (key) {
        var inp = document.getElementById(key.parentNode.getAttribute('data-for'));
        if (inp && !inp.readOnly) {
          var k = key.getAttribute('data-k');
          var s = inp.selectionStart == null ? inp.value.length : inp.selectionStart;
          var en = inp.selectionEnd == null ? s : inp.selectionEnd;
          inp.value = inp.value.slice(0, s) + k + inp.value.slice(en);
          inp.focus();
          inp.setSelectionRange(s + k.length, s + k.length);
          inp.dispatchEvent(new Event('input', { bubbles: true }));
        }
        return;
      }
      var prop = t.closest('[data-prop]');
      if (prop) { openCards(prop.getAttribute('data-prop')); return; }
      if (t.closest('[data-open-cards]')) { openCards(); return; }
      var exb = t.closest('[data-example]');
      if (exb) { var pr = exb.getAttribute('data-example').split(':'); openExample(pr[0], +pr[1]); return; }
      if (t === els.sheet || t.closest('[data-close-sheet]')) closeSheet();
    });
    document.addEventListener('input', function (e) {
      if (e.target.classList && e.target.classList.contains('ans')) {
        var pv = document.getElementById(e.target.id + '-pv');
        if (pv) pv.innerHTML = e.target.value ? 'Terbaca: ' + M.previewInput(e.target.value) : '';
      }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !els.sheet.hidden) closeSheet(); });
  }

  function init() {
    els.header = document.getElementById('top');
    els.main = document.getElementById('view');
    els.tabs = document.getElementById('tabs');
    els.sheet = document.getElementById('sheet');
    els.sheetTitle = document.getElementById('sheet-title');
    els.sheetBody = document.getElementById('sheet-body');
    els.sheetClose = document.getElementById('sheet-close');
    els.toast = document.getElementById('toast');
    var tabIcons = { home: 'home', lab: 'flask', progress: 'chart', sifat: 'cards', settings: 'gear' };
    Array.prototype.forEach.call(els.tabs.querySelectorAll('a[data-tab]'), function (a) {
      var sp = a.querySelector('span');
      if (sp) sp.innerHTML = EK.icon(tabIcons[a.getAttribute('data-tab')]);
    });
    applySettings();
    globalHandlers();
    window.addEventListener('hashchange', route);
    window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); installEvt = e; if (!location.hash || location.hash === '#/') route(); });
    window.addEventListener('appinstalled', function () { installEvt = null; toast('Aplikasi berhasil dipasang.'); });
    if ('serviceWorker' in navigator && location.protocol.indexOf('http') === 0) {
      navigator.serviceWorker.register('sw.js').catch(function () { });
    }
    route();
  }

  EK.app = { init: init, route: route, VERSION: VERSION };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
