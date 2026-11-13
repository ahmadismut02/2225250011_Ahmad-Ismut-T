/* EksponenKu — penyimpanan lokal (localStorage), jadwal ulang (spaced repetition), aturan level.
   Semua data tetap di perangkat siswa. */
(function () {
  'use strict';
  var EK = (window.EK = window.EK || {});
  var KEY = 'eksponenku:v1';
  var DAY = 86400000;
  var INTERVALS = [1, 3, 7];
  var MAX_ATTEMPTS = 800;

  function fresh() {
    return {
      version: 1,
      profile: null,
      settings: { textScale: 1, theme: 'system', reduceMotion: false },
      units: {},
      attempts: [],
      review: {},
      modeling: {},
      missions: {},
      reflections: [],
      lastUnit: null
    };
  }

  var memory = null;
  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      if (raw) return Object.assign(fresh(), JSON.parse(raw));
    } catch (e) { /* penyimpanan tidak tersedia: pakai memori */ }
    return memory || fresh();
  }

  var state = load();

  function save() {
    memory = state;
    try { window.localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) { /* abaikan */ }
  }

  function startOfDay(t) { var d = new Date(t); d.setHours(0, 0, 0, 0); return d.getTime(); }

  function unit(id) {
    if (!state.units[id]) {
      state.units[id] = { lastSegment: 0, done: {}, solved: { dasar: {}, menengah: {}, tantangan: {} }, manualUnlock: {} };
    }
    return state.units[id];
  }

  var store = {
    get state() { return state; },
    save: save,
    reset: function () { state = fresh(); memory = null; try { window.localStorage.removeItem(KEY); } catch (e) {} },

    setProfile: function (p) { state.profile = p; save(); },
    setSetting: function (k, v) { state.settings[k] = v; save(); },

    unit: unit,
    markDone: function (unitId, section) { unit(unitId).done[section] = true; state.lastUnit = unitId; save(); },
    setLastSegment: function (unitId, idx) { unit(unitId).lastSegment = idx; state.lastUnit = unitId; save(); },

    /** Level terbuka jika level sebelumnya ≥ 80% soal sudah pernah dijawab benar, atau dibuka manual. */
    isUnlocked: function (unitId, level) {
      var L = EK.content.LEVELS;
      var i = L.indexOf(level);
      if (i <= 0) return true;
      var u = unit(unitId);
      if (u.manualUnlock[level]) return true;
      var prev = L[i - 1];
      var list = EK.content.exercisesOf(unitId, prev);
      if (!list.length) return true;
      var solved = list.filter(function (x) { return u.solved[prev][x.id]; }).length;
      return solved / list.length >= 0.8;
    },
    unlockManually: function (unitId, level) { unit(unitId).manualUnlock[level] = true; save(); },
    markSolved: function (unitId, level, exId) { unit(unitId).solved[level][exId] = true; save(); },
    solvedCount: function (unitId, level) {
      var u = unit(unitId);
      return EK.content.exercisesOf(unitId, level).filter(function (x) { return u.solved[level][x.id]; }).length;
    },

    recordAttempt: function (a) {
      a.t = a.t || Date.now();
      state.attempts.push(a);
      if (state.attempts.length > MAX_ATTEMPTS) state.attempts.splice(0, state.attempts.length - MAX_ATTEMPTS);
      save();
    },

    /* ---------- Latihan ulang: salah → besok; benar saat ulang → 3 hari; benar lagi → selesai ---------- */
    scheduleWrong: function (exId, now) {
      now = now || Date.now();
      state.review[exId] = { stage: 0, due: startOfDay(now) + INTERVALS[0] * DAY, streak: 0 };
      save();
    },
    reviewResult: function (exId, correct, now) {
      now = now || Date.now();
      var r = state.review[exId];
      if (!r) return;
      if (!correct) { state.review[exId] = { stage: 0, due: startOfDay(now) + INTERVALS[0] * DAY, streak: 0 }; save(); return; }
      r.streak += 1;
      if (r.streak >= 2) { delete state.review[exId]; save(); return; }
      r.stage = Math.min(r.stage + 1, INTERVALS.length - 1);
      r.due = startOfDay(now) + INTERVALS[r.stage] * DAY;
      save();
    },
    dueReviews: function (now) {
      now = now || Date.now();
      return Object.keys(state.review).filter(function (id) {
        return state.review[id].due <= now && EK.content.exerciseById[id];
      });
    },

    /* ---------- Pemodelan ---------- */
    modeling: function (id) {
      if (!state.modeling[id]) state.modeling[id] = { done: {}, attempts: 0, revealed: false, finished: false };
      return state.modeling[id];
    },
    saveModeling: save,

    mission: function (id) {
      if (!state.missions[id]) state.missions[id] = { answers: {} };
      return state.missions[id];
    },

    addReflection: function (r) { r.t = Date.now(); state.reflections.push(r); save(); },

    /* ---------- Statistik untuk halaman Kemajuan ---------- */
    propertyMastery: function () {
      var res = {};
      state.attempts.forEach(function (a) {
        if (!a.first || !a.props) return;
        a.props.forEach(function (p) {
          res[p] = res[p] || { right: 0, total: 0 };
          res[p].total += 1;
          if (a.correct) res[p].right += 1;
        });
      });
      return res;
    },
    modelingStepStats: function () {
      var res = {};
      state.attempts.forEach(function (a) {
        if (a.kind !== 'model-step' || !a.first) return;
        res[a.step] = res[a.step] || { right: 0, total: 0 };
        res[a.step].total += 1;
        if (a.correct) res[a.step].right += 1;
      });
      return res;
    },
    misconceptionCounts: function () {
      var res = {};
      state.attempts.forEach(function (a) { if (a.mis) res[a.mis] = (res[a.mis] || 0) + 1; });
      return res;
    }
  };

  EK.store = store;
})();
