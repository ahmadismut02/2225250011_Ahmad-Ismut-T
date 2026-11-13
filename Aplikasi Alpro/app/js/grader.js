/* EksponenKu — penilai jawaban. Murni (tanpa DOM, tanpa penyimpanan).
   Mode: value (nilai sama), exact (bentuk diminta), sci (notasi ilmiah), model (setara + berbentuk pangkat). */
(function () {
  'use strict';
  var EK = (window.EK = window.EK || {});
  var M = EK.math;

  var GENERIC_WRONG = 'Belum tepat. Periksa lagi langkahmu, atau buka petunjuk.';
  var FORM_HINT = {
    exact: 'Nilainya sudah benar, tetapi tuliskan dalam bentuk yang diminta.',
    sci: 'Nilainya sudah benar, tetapi belum dalam notasi ilmiah. Bentuknya $a × 10^n$ dengan 1 ≤ a < 10.',
    model: 'Nilainya sudah benar, tetapi tuliskan modelnya dalam bentuk berpangkat (gunakan tanda ^).'
  };

  function misFeedback(id) {
    var m = EK.content && EK.content.misconceptions[id];
    return m ? m.feedback : GENERIC_WRONG;
  }

  /** Umpan balik dari kode miskonsepsi (M.., MM..) atau teks bebas. */
  function feedbackFor(entry) {
    if (!entry) return GENERIC_WRONG;
    if (typeof entry === 'string') return /^MM?\d+$/.test(entry) ? misFeedback(entry) : entry;
    if (entry.mis) return misFeedback(entry.mis);
    return entry.feedback || GENERIC_WRONG;
  }

  function safeParse(raw) {
    try { return { ast: M.parse(raw) }; } catch (e) { return { error: e.message || 'Penulisan belum dikenali.' }; }
  }

  function sameValue(astA, astB) {
    try { return M.equivalent(astA, astB); } catch (e) { return false; }
  }

  /**
   * Menilai satu jawaban isian.
   * spec: { answer, mode, accept?, wrong?, formHint? }
   * hasil: { status: 'empty'|'invalid'|'correct'|'wrong', feedback, mis?, formOnly? }
   */
  function gradeInput(spec, raw) {
    if (raw == null || String(raw).trim() === '') return { status: 'empty', feedback: 'Tulis jawabanmu dulu.' };
    var mode = spec.mode || 'value';
    var input = safeParse(raw);
    if (input.error) return { status: 'invalid', feedback: input.error };

    var norm = M.normalize(raw);
    var correctAst = M.parse(spec.answer);
    var accepted = [spec.answer].concat(spec.accept || []).map(M.normalize);
    var valueOk = sameValue(input.ast, correctAst);
    var correct = false;

    if (mode === 'exact') correct = accepted.indexOf(norm) >= 0;
    else if (mode === 'sci') correct = valueOk && M.isScientific(raw);
    else if (mode === 'model') correct = valueOk && (M.hasPower(input.ast) || Object.keys(M.varsOf(input.ast)).length > 0);
    else correct = valueOk;

    if (correct) return { status: 'correct' };

    var wrong = spec.wrong || [];
    // 1) cocokkan tulisan persis dengan jawaban salah yang dikenal
    for (var i = 0; i < wrong.length; i++) {
      if (M.normalize(wrong[i].answer) === norm) return { status: 'wrong', mis: wrong[i].mis, feedback: feedbackFor(wrong[i]) };
    }
    // 2) nilai benar tetapi bentuk belum sesuai
    if (valueOk) return { status: 'wrong', formOnly: true, feedback: spec.formHint || FORM_HINT[mode] || GENERIC_WRONG };
    // 3) nilai sama dengan jawaban salah yang dikenal
    for (var k = 0; k < wrong.length; k++) {
      var w = safeParse(wrong[k].answer);
      if (!w.error && sameValue(input.ast, w.ast)) return { status: 'wrong', mis: wrong[k].mis, feedback: feedbackFor(wrong[k]) };
    }
    return { status: 'wrong', feedback: GENERIC_WRONG };
  }

  /** Pilihan ganda: correct = indeks; optionFeedback = { indeks: kode/teks }. */
  function gradeChoice(spec, index) {
    if (index == null) return { status: 'empty', feedback: 'Pilih salah satu jawaban dulu.' };
    if (index === spec.correct) return { status: 'correct' };
    var fb = spec.optionFeedback && spec.optionFeedback[String(index)];
    var mis = typeof fb === 'string' && /^MM?\d+$/.test(fb) ? fb : undefined;
    return { status: 'wrong', mis: mis, feedback: feedbackFor(fb) };
  }

  /** Pilihan ganda kompleks: semua jawaban benar harus dipilih, tanpa yang salah. */
  function gradeMulti(spec, indexes) {
    if (!indexes || !indexes.length) return { status: 'empty', feedback: 'Pilih minimal satu pernyataan.' };
    var want = spec.correct.slice().sort().join(',');
    var got = indexes.slice().sort().join(',');
    if (want === got) return { status: 'correct' };
    var missing = spec.correct.filter(function (i) { return indexes.indexOf(i) < 0; }).length;
    var extra = indexes.filter(function (i) { return spec.correct.indexOf(i) < 0; }).length;
    var parts = [];
    if (extra) parts.push(extra + ' pilihanmu belum tepat');
    if (missing) parts.push('masih ada ' + missing + ' pernyataan benar yang belum dipilih');
    return { status: 'wrong', feedback: 'Belum tepat: ' + parts.join(', dan ') + '.' };
  }

  /** Benar/Salah + alasan. */
  function gradeTrueFalse(spec, truth, reason) {
    if (truth == null || reason == null) return { status: 'empty', feedback: 'Pilih Benar/Salah, lalu pilih alasannya.' };
    if (truth === spec.truth && reason === spec.reason) return { status: 'correct' };
    if (truth === spec.truth) return { status: 'wrong', feedback: 'Pilihan Benar/Salah-mu tepat, tetapi alasannya belum tepat.' };
    return { status: 'wrong', feedback: 'Belum tepat. Hitung nilai kedua bagian, lalu bandingkan.' };
  }

  EK.grader = {
    gradeInput: gradeInput,
    gradeChoice: gradeChoice,
    gradeMulti: gradeMulti,
    gradeTrueFalse: gradeTrueFalse,
    feedbackFor: feedbackFor,
    GENERIC_WRONG: GENERIC_WRONG
  };
})();
