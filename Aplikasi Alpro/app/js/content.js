/* EksponenKu — registri konten. File di folder content/ memanggil EK.addContent({...}). */
(function () {
  'use strict';
  var EK = (window.EK = window.EK || {});
  var C = (EK.content = { units: [], unitById: {}, properties: {}, propertyList: [], misconceptions: {}, modeling: [], modelingById: {}, stimuli: {}, exerciseById: {} });

  EK.addContent = function (pack) {
    (pack.properties || []).forEach(function (p) { C.properties[p.id] = p; C.propertyList.push(p); });
    (pack.misconceptions || []).forEach(function (m) { C.misconceptions[m.id] = m; });
    (pack.units || []).forEach(function (u) {
      C.units.push(u);
      C.unitById[u.id] = u;
      (u.exercises || []).forEach(function (x) { x.unit = u.id; C.exerciseById[x.id] = x; });
    });
    C.units.sort(function (a, b) { return a.order - b.order; });
    (pack.modeling || []).forEach(function (m) { C.modeling.push(m); C.modelingById[m.id] = m; });
    (pack.stimuli || []).forEach(function (s) { C.stimuli[s.id] = s; });
  };

  C.LEVELS = ['dasar', 'menengah', 'tantangan'];
  C.LEVEL_LABEL = { dasar: 'Dasar', menengah: 'Menengah', tantangan: 'Tantangan' };
  C.TYPE_LABEL = {
    T1: 'Pertumbuhan berlipat', T2: 'Berkurang sebagian', T3: 'Satuan besar/kecil', T4: 'Luas & volume',
    T5: 'Berapa kali lipat', T6: 'Mencari banyak langkah', T7: 'Banyak kemungkinan', T8: 'Multi-langkah'
  };
  C.STAGE_LABEL = { contoh: 'Contoh lengkap', rumpang: 'Model rumpang', terbimbing: 'Terbimbing' };

  C.exercisesOf = function (unitId, level) {
    var u = C.unitById[unitId];
    return (u ? u.exercises : []).filter(function (x) { return !level || x.level === level; });
  };
  C.modelingOf = function (unitId) {
    if (unitId === 'u8') return C.modeling.slice();
    return C.modeling.filter(function (m) { return m.unit === unitId; });
  };
})();
