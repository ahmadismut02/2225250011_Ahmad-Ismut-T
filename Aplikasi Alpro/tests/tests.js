/* EksponenKu — uji otomatis di browser.
   Buka tests/run-tests.html di browser, atau jalankan tanpa layar:
   msedge --headless --disable-gpu --dump-dom "file:///.../tests/run-tests.html"  */
window.addEventListener('load', function () {
  'use strict';
  var EK = window.EK, M = EK.math, G = EK.grader, C = EK.content, S = EK.store;
  var results = { pass: 0, fail: 0, lines: [] };

  function ok(cond, name, detail) {
    if (cond) results.pass += 1;
    else { results.fail += 1; results.lines.push('GAGAL: ' + name + (detail ? ' — ' + detail : '')); }
  }
  function section(t) { results.lines.push('\n## ' + t); }
  function tryRun(name, fn) { try { fn(); } catch (e) { ok(false, name, 'error: ' + (e && e.message) + (e && e.stack ? '\n' + e.stack.split('\n').slice(0, 3).join('\n') : '')); } }

  /* ---------- 1. Mesin matematika & grader ---------- */
  section('Mesin matematika & penilai');
  tryRun('math', function () {
    ok(M.valueOf('2^3*2^4') === 128, '2^3*2^4 = 128');
    ok(M.valueOf('-3^2') === -9, '-3^2 = -9');
    ok(M.valueOf('(-3)^2') === 9, '(-3)^2 = 9');
    ok(M.valueOf('2^-3') === 0.125, '2^-3 = 1/8');
    ok(M.valueOf('2^3^2') === 512, 'pangkat asosiatif kanan');
    ok(M.eqNum(M.valueOf('(2/3)^2'), 4 / 9), '(2/3)^2');
    ok(M.valueOf('3.000.000') === 3000000, 'pemisah ribuan');
    ok(M.valueOf('0,005') === 0.005, 'koma desimal');
    ok(M.valueOf('2⁷') === 128, 'superskrip');
    ok(M.valueOf('3×2^6') === 192, 'tanda ×');
    ok(M.valueOf('8÷2') === 4, 'tanda ÷');
    ok(M.equivalent('3*2^n', '2^n*3'), 'setara dengan variabel');
    ok(!M.equivalent('3*2^n', '3+2*n'), 'model linear tidak setara');
    ok(M.equivalent('64*(1/2)^n', '64/2^n'), 'setara pecahan');
    ok(M.isScientific('4,5 × 10^4') && !M.isScientific('45*10^3') && M.isScientific('7.5*10^-7'), 'notasi ilmiah');
    var threw = false; try { M.parse('2^^3'); } catch (e) { threw = true; } ok(threw, 'input rusak ditolak');
    threw = false; try { M.valueOf('alert(1)'); } catch (e) { threw = true; } ok(threw, 'teks berupa kode tidak pernah dijalankan dan ditolak');
    threw = false; try { M.parse('a;b'); } catch (e) { threw = true; } ok(threw, 'tanda asing ditolak');
  });
  tryRun('grader', function () {
    var ex = { answer: '2^7', mode: 'exact', wrong: [{ answer: '2^12', mis: 'M02' }] };
    ok(G.gradeInput(ex, '2^7').status === 'correct', 'exact benar');
    ok(G.gradeInput(ex, '2⁷').status === 'correct', 'exact superskrip');
    var r = G.gradeInput(ex, '128'); ok(r.status === 'wrong' && r.formOnly, 'nilai benar bentuk salah');
    r = G.gradeInput(ex, '2^12'); ok(r.mis === 'M02', 'miskonsepsi M02');
    ok(G.gradeInput(ex, '').status === 'empty', 'kosong');
    ok(G.gradeInput(ex, '2^').status === 'invalid', 'tidak valid');
    var v = { answer: '4/9', mode: 'value', wrong: [{ answer: '4/3', mis: 'M07' }] };
    ok(G.gradeInput(v, '8/18').status === 'correct', 'pecahan senilai');
    ok(G.gradeInput(v, '0,44').status === 'wrong', 'desimal dibulatkan ditolak');
    ok(G.gradeInput(v, '4/3').mis === 'M07', 'M07');
    var md = { answer: '3*2^n', mode: 'model', wrong: [{ answer: '3+2*n', mis: 'MM02' }, { answer: '2^n', mis: 'MM03' }] };
    ok(G.gradeInput(md, '3×2^n').status === 'correct', 'model benar');
    ok(G.gradeInput(md, '2^n*3').status === 'correct', 'model urutan lain');
    ok(G.gradeInput(md, '3+2n').mis === 'MM02', 'model linear MM02');
    ok(G.gradeInput(md, '2^n').mis === 'MM03', 'lupa nilai awal MM03');
    var md2 = { answer: '32*2^10', mode: 'model' };
    r = G.gradeInput(md2, '32768'); ok(r.status === 'wrong' && r.formOnly, 'model wajib berpangkat');
    var sc = { answer: '2*10^3', mode: 'sci' };
    ok(G.gradeInput(sc, '2 × 10^3').status === 'correct', 'sci benar');
    ok(G.gradeInput(sc, '20*10^2').formOnly, 'sci bentuk salah');
    ok(G.gradeMulti({ correct: [0, 2] }, [2, 0]).status === 'correct', 'multi benar');
    ok(G.gradeMulti({ correct: [0, 2] }, [0]).status === 'wrong', 'multi kurang');
    ok(G.gradeTrueFalse({ truth: false, reason: 0 }, false, 0).status === 'correct', 'tfr');
  });
  tryRun('scheduler', function () {
    var now = new Date(2026, 10, 12, 10).getTime();
    S.scheduleWrong('u1-x1', now);
    ok(S.dueReviews(now).indexOf('u1-x1') < 0, 'belum jatuh tempo hari ini');
    var tomorrow = now + 86400000;
    ok(S.dueReviews(tomorrow).indexOf('u1-x1') >= 0, 'jatuh tempo besok');
    S.reviewResult('u1-x1', true, tomorrow);
    ok(S.dueReviews(tomorrow + 86400000).indexOf('u1-x1') < 0, 'diundur 3 hari');
    S.reviewResult('u1-x1', true, tomorrow + 3 * 86400000);
    ok(!S.state.review['u1-x1'], 'keluar dari daftar setelah 2x benar');
  });

  /* ---------- 2. Kebenaran konten ---------- */
  section('Konten');
  var ids = {};
  function refMis(code, where) { if (code && /^MM?\d+$/.test(code)) ok(!!C.misconceptions[code], 'miskonsepsi ada: ' + code, where); }
  function dollarsBalanced(s, where) { if (typeof s === 'string') ok((s.split('$').length - 1) % 2 === 0, 'tanda $ seimbang', where + ': ' + s); }
  function walkStrings(obj, where) {
    if (typeof obj === 'string') { dollarsBalanced(obj, where); try { M.renderText(obj); } catch (e) { ok(false, 'render', where); } return; }
    if (Array.isArray(obj)) obj.forEach(function (x) { walkStrings(x, where); });
    else if (obj && typeof obj === 'object') Object.keys(obj).forEach(function (k) { walkStrings(obj[k], where); });
  }
  ok(C.units.length === 8, '8 unit termuat', C.units.length);
  C.units.forEach(function (u) {
    walkStrings(u, u.id);
    (u.examples || []).forEach(function (ex, i) {
      ex.steps.forEach(function (s) { if (s.prop) ok(!!C.properties[s.prop], 'sifat ada', u.id + ' contoh ' + i); });
    });
    u.exercises.forEach(function (x) {
      var w = x.id;
      ok(!ids[x.id], 'id unik', w); ids[x.id] = true;
      ok(C.LEVELS.indexOf(x.level) >= 0, 'level valid', w);
      ok(!!x.explanation, 'ada pembahasan', w);
      (x.props || []).forEach(function (p) { ok(!!C.properties[p], 'sifat ada', w + ' ' + p); });
      if (x.level !== 'dasar') ok((x.hints || []).length >= 2, 'petunjuk >= 2 untuk ' + x.level, w);
      if (x.type === 'input') {
        tryRun(w, function () {
          M.parse(x.answer);
          ok(G.gradeInput(x, x.answer).status === 'correct', 'kunci dinilai benar', w);
          if (x.expr) ok(M.eqNum(M.valueOf(x.expr, { a: 2 }), M.valueOf(x.answer, { a: 2 })), 'nilai expr = kunci', w + ' ' + x.expr + ' vs ' + x.answer);
          (x.wrong || []).forEach(function (wr) {
            refMis(wr.mis, w);
            var r = G.gradeInput(x, wr.answer);
            ok(r.status === 'wrong', 'jawaban salah tidak dinilai benar', w + ' ' + wr.answer);
            if (wr.mis) ok(r.mis === wr.mis, 'miskonsepsi terdeteksi', w + ' ' + wr.answer + ' → ' + r.mis);
          });
        });
      } else if (x.type === 'mcq') {
        ok(x.correct >= 0 && x.correct < x.options.length, 'indeks benar valid', w);
        Object.keys(x.optionFeedback || {}).forEach(function (k) { refMis(x.optionFeedback[k], w); ok(+k !== x.correct, 'umpan balik bukan untuk kunci', w); });
      } else if (x.type === 'choose-property') {
        ok(x.options.indexOf(x.correct) >= 0, 'sifat kunci ada di pilihan', w);
      } else ok(false, 'tipe soal dikenal', w + ' ' + x.type);
    });
  });
  C.propertyList.forEach(function (p) { refMis(p.mistake, p.id); walkStrings(p, p.id); });

  var types = {};
  C.modeling.forEach(function (p) {
    var w = p.id;
    types[p.type] = (types[p.type] || 0) + 1;
    walkStrings(p, w);
    tryRun(w, function () {
      p.understand.known.forEach(function (k) { M.parse(k.answer); });
      ok(p.understand.asked.correct < p.understand.asked.options.length, 'ditanya valid', w);
      var hasN = !!M.varsOf(M.parse(p.model.answer)).n;
      var modelVal = hasN ? M.valueOf(p.model.answer, { n: M.valueOf(p.solve.n.answer) }) : M.valueOf(p.model.answer);
      var target = M.valueOf(p.solve.modelValue || p.solve.answer);
      ok(M.eqNum(modelVal, target), 'model menghasilkan jawaban', w + ': ' + modelVal + ' vs ' + target);
      if (p.model.table && hasN) ok(M.eqNum(M.valueOf(p.model.answer, { n: +p.model.table.ask.label }), M.valueOf(p.model.table.ask.answer)), 'baris tabel pola konsisten', w);
      ok(G.gradeInput({ answer: p.model.answer, mode: 'model', wrong: p.model.wrong }, p.model.answer).status === 'correct', 'model kunci benar', w);
      (p.model.wrong || []).forEach(function (wr) {
        refMis(wr.mis, w);
        var r = G.gradeInput({ answer: p.model.answer, mode: 'model', wrong: p.model.wrong }, wr.answer);
        ok(r.status === 'wrong', 'model salah ditolak', w + ' ' + wr.answer);
      });
      (p.solve.wrong || []).forEach(function (wr) { refMis(wr.mis, w); ok(G.gradeInput(p.solve, wr.answer).status === 'wrong', 'jawaban salah ditolak', w + ' ' + wr.answer); });
      ok(M.eqNum(M.valueOf(p.interpret.answer), M.valueOf(p.solve.answer)), 'tafsiran = hasil', w);
      Object.keys(p.check.optionFeedback || {}).forEach(function (k) { refMis(p.check.optionFeedback[k], w); });
    });
  });
  ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'].forEach(function (t) { ok(types[t] >= 1, 'tipe ' + t + ' tersedia'); });
  Object.keys(C.stimuli).forEach(function (id) {
    var s = C.stimuli[id];
    walkStrings(s, id);
    var levels = {};
    s.questions.forEach(function (q) {
      levels[q.level] = true;
      if (q.type === 'input') ok(G.gradeInput(q, q.answer).status === 'correct', 'kunci literasi', q.id);
      if (q.type === 'multi') ok(q.correct.every(function (i) { return i < q.options.length; }), 'multi valid', q.id);
      if (q.type === 'tfr') ok(q.reason < q.reasons.length, 'alasan valid', q.id);
    });
    ok(levels.pemahaman && levels.penerapan && levels.penalaran, 'tiga level proses kognitif', id);
  });

  /* ---------- 3. Simulasi siswa (end-to-end) ---------- */
  section('Simulasi siswa');
  var view = document.getElementById('view');
  function nav(hash) { history.replaceState(null, '', hash); EK.app.route(); }
  function $(sel) { return view.querySelector(sel); }
  function setVal(id, v) { var el = view.querySelector('#' + id); if (!el) throw new Error('input #' + id + ' tidak ada'); el.value = v; }
  function pick(group, i) {
    var b = view.querySelector('[data-group="' + group + '"] .opt[data-i="' + i + '"]');
    if (!b) throw new Error('opsi ' + group + ':' + i + ' tidak ada');
    b.click();
  }
  function submit(form) { form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true })); }

  tryRun('onboarding', function () {
    nav('#/');
    ok(!!$('#onb'), 'layar onboarding tampil');
    setVal('nick', 'Uji');
    submit($('#onb'));
    nav('#/');
    ok(/Selamat (pagi|siang|sore|malam),\s*Uji/.test(view.textContent), 'beranda menyapa sesuai waktu');
    ok(view.querySelectorAll('.tile').length === 8, '8 menu ikon di beranda');
    ok(document.body.classList.contains('is-home') && document.getElementById('top').hidden, 'pita biru beranda, header disembunyikan');
    var q = view.querySelector('#q'); q.value = 'pecahan'; q.dispatchEvent(new Event('input', { bubbles: true }));
    ok(view.querySelectorAll('.results .res').length > 0, 'pencarian menemukan "pecahan"');
    view.querySelector('[data-help]').click();
    ok(!document.getElementById('sheet').hidden && /Cara menulis jawaban/.test(document.getElementById('sheet-body').textContent), 'lembar bantuan terbuka');
    nav('#/belajar');
    ok(view.querySelectorAll('.unit-card').length === 8, '8 kartu unit di halaman Materi');
    ok(!document.body.classList.contains('is-home') && !document.getElementById('top').hidden, 'header kembali tampil di halaman lain');
  });

  C.units.forEach(function (u) {
    tryRun('halaman ' + u.id, function () {
      nav('#/unit/' + u.id); ok(!!$('.step-list'), 'halaman unit', u.id);
      nav('#/unit/' + u.id + '/materi');
      for (var i = 0; i < u.segments.length; i++) { var nb = $('[data-next]'); if (!nb) break; nb.click(); }
      ok(S.unit(u.id).done.materi, 'materi selesai', u.id);
      if (u.examples.length) {
        nav('#/unit/' + u.id + '/contoh');
        var guard = 0;
        while (guard++ < 200) {
          var askForm = $('[data-ask]');
          if (askForm) { askForm.querySelector('[data-reveal]').click(); continue; }
          var st = $('[data-step]'); if (st && !st.disabled) { st.click(); continue; }
          var whyBtn = $('[data-why-check]');
          if (whyBtn && !whyBtn.hidden) {
            var exIdx = +(/Contoh (\d+)/.exec(view.textContent)[1]) - 1;
            pick('why', u.examples[exIdx].why.correct); whyBtn.click();
          }
          var nx = $('[data-next-ex]'); if (nx && !nx.disabled) { var last = /Selesai/.test(nx.textContent); nx.click(); if (last) break; continue; }
          break;
        }
        ok(S.unit(u.id).done.contoh, 'contoh selesai', u.id);
      }
    });
    C.LEVELS.forEach(function (lv) {
      var list = C.exercisesOf(u.id, lv);
      if (!list.length) return;
      tryRun('latihan ' + u.id + ' ' + lv, function () {
        nav('#/unit/' + u.id + '/latihan/' + lv);
        if ($('[data-unlock]')) { ok(false, 'level terbuka otomatis setelah level sebelumnya benar semua', u.id + ' ' + lv); $('[data-unlock]').click(); }
        for (var i = 0; i < list.length; i++) {
          var form = $('[data-ex]');
          var ex = C.exerciseById[form.getAttribute('data-exid')];
          if (ex.type === 'input') setVal('ans', ex.answer);
          else if (ex.type === 'mcq') pick('opt', ex.correct);
          else pick('opt', ex.options.indexOf(ex.correct));
          submit(form);
          ok(!!view.querySelector('.fb.ok'), 'jawaban kunci dinilai benar di layar', ex.id + ' → ' + (view.querySelector('.fb') || {}).textContent);
          $('[data-next]').click();
        }
        ok(/Latihan selesai/.test(view.textContent), 'ringkasan latihan', u.id + ' ' + lv);
      });
    });
  });

  tryRun('latihan dengan jawaban salah', function () {
    nav('#/unit/u2/latihan/dasar');
    var form = $('[data-ex]');
    var ex = C.exerciseById[form.getAttribute('data-exid')];
    if (ex.type === 'input') { setVal('ans', ex.wrong[0].answer); submit(form); ok(!!view.querySelector('.fb.no'), 'umpan balik belum tepat tampil'); }
    else { pick('opt', ex.type === 'mcq' ? (ex.correct + 1) % ex.options.length : (ex.options.indexOf(ex.correct) + 1) % ex.options.length); submit(form); ok(!!view.querySelector('.fb.no'), 'umpan balik belum tepat tampil (pilihan)'); }
    ok(!!S.state.review[ex.id], 'soal salah masuk latihan ulang');
  });

  C.modeling.forEach(function (p) {
    tryRun('lab ' + p.id, function () {
      nav('#/lab/' + p.id);
      var guard = 0;
      while (guard++ < 30 && !/Kelima langkah selesai/.test(view.textContent)) {
        var form = $('[data-step-form]');
        if (!form) { $('[data-continue]').click(); continue; }
        var cur = view.querySelector('.stepper li.cur .t').textContent;
        if (cur === 'Pahami') {
          p.understand.known.forEach(function (k, i) { setVal('kn' + i, k.answer); });
          pick('asked', p.understand.asked.correct);
          if (p.understand.irrelevant) pick('irr', p.understand.irrelevant.correct);
        } else if (cur === 'Buat Model') {
          if (p.model.table) setVal('tbl', p.model.table.ask.answer);
          setVal('mdl', p.model.answer);
        } else if (cur === 'Selesaikan') {
          if (p.solve.n) setVal('sn', p.solve.n.answer);
          setVal('sv', p.solve.answer);
        } else if (cur === 'Tafsirkan') {
          setVal('ip', p.interpret.answer);
        } else {
          pick('chk', p.check.correct);
        }
        submit(form);
        ok(!!view.querySelector('.fb.ok'), 'langkah ' + cur + ' benar', p.id + ' → ' + (view.querySelector('.fb') || {}).textContent);
        if (!view.querySelector('.fb.ok')) break;
        $('[data-continue]').click();
      }
      ok(/Kelima langkah selesai/.test(view.textContent), 'lab selesai', p.id);
    });
  });
  tryRun('lab salah model', function () {
    S.state.modeling['m-bola'] = undefined; delete S.state.modeling['m-bola'];
    nav('#/lab/m-bola');
    var p = C.modelingById['m-bola'];
    p.understand.known.forEach(function (k, i) { setVal('kn' + i, k.answer); });
    pick('asked', 0); pick('irr', 0); submit($('[data-step-form]')); $('[data-continue]').click();
    setVal('tbl', '8'); setVal('mdl', '64*2^n'); submit($('[data-step-form]'));
    ok(/berkurang/.test(view.querySelector('.fb.no').textContent), 'umpan balik MM04 pada model');
    ok(!$('[data-full]').disabled, 'pemodelan lengkap terbuka setelah mencoba');
  });

  Object.keys(C.stimuli).forEach(function (id) {
    tryRun('misi ' + id, function () {
      var s = C.stimuli[id];
      nav('#/misi/' + id);
      s.questions.forEach(function (q, i) {
        var form = view.querySelector('[data-q="' + i + '"]');
        if (q.type === 'input') setVal('q' + i + 'in', q.answer);
        if (q.type === 'multi') q.correct.forEach(function (c) { pick('q' + i, c); });
        if (q.type === 'tfr') { pick('q' + i + 'tf', q.truth ? 0 : 1); pick('q' + i + 'rs', q.reason); }
        submit(form);
        ok(!!form.querySelector('.fb.ok'), 'soal literasi benar', q.id);
      });
      ok(/Misi selesai/.test(view.textContent), 'misi selesai', id);
    });
  });

  tryRun('halaman lain', function () {
    nav('#/unit/u1/refleksi'); pick('effort', 4); submit($('[data-refl]'));
    ok(S.unit('u1').done.refleksi, 'refleksi tersimpan');
    ['#/', '#/belajar', '#/misi', '#/kemajuan', '#/sifat', '#/pengaturan', '#/pasang', '#/ulang', '#/lab', '#/unit/u8/soal-cerita', '#/tidak-ada'].forEach(function (h) {
      nav(h); ok(view.innerHTML.length > 50 && !/Terjadi kesalahan/.test(document.getElementById('top').textContent), 'halaman tampil', h);
    });
    view.querySelector('[data-prop]') ? view.querySelector('[data-prop]').click() : null;
    document.querySelector('[data-open-cards]').click();
    ok(!document.getElementById('sheet').hidden && /Sifat 5/.test(document.getElementById('sheet-body').textContent), 'Kartu Sifat terbuka');
  });

  var out = document.getElementById('out');
  out.textContent = 'HASIL: ' + results.pass + ' lulus, ' + results.fail + ' gagal\n' + results.lines.join('\n');
  document.title = (results.fail ? 'GAGAL ' : 'LULUS ') + results.pass + '/' + (results.pass + results.fail);
});
