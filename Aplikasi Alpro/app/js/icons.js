/* EksponenKu — ikon SVG buatan sendiri (garis + aksen lembut). EK.icon(nama, kelas). */
(function () {
  'use strict';
  var EK = (window.EK = window.EK || {});
  // Setiap ikon: bentuk aksen (fill lembut) + garis (stroke). Ukuran dasar 24×24.
  var P = {
    home: ['<path class="ac" d="M6 11.5 12 7l6 4.5V20H6z"/>', '<path d="M3 11 12 4l9 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>'],
    book: ['<path class="ac" d="M6 4h11v13H6z"/>', '<path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v15H7.5A2.5 2.5 0 0 0 5 20.5z"/><path d="M5 20.5A2.5 2.5 0 0 1 7.5 18H19v3H7.5"/><path d="M9 7.5h6M9 11h4"/>'],
    repeat: ['<circle class="ac" cx="12" cy="12" r="5"/>', '<path d="M4.5 11a7.5 7.5 0 0 1 13.2-4.2L19.5 9"/><path d="M19.5 4v5h-5"/><path d="M19.5 13a7.5 7.5 0 0 1-13.2 4.2L4.5 15"/><path d="M4.5 20v-5h5"/>'],
    flask: ['<path class="ac" d="M7.2 15h9.6l2 3.6a1.6 1.6 0 0 1-1.4 2.4H6.6a1.6 1.6 0 0 1-1.4-2.4z"/>', '<path d="M9 3h6"/><path d="M10 3v6.2L5.2 18.6A1.6 1.6 0 0 0 6.6 21h10.8a1.6 1.6 0 0 0 1.4-2.4L14 9.2V3"/><path d="M7.4 15h9.2"/>'],
    news: ['<path class="ac" d="M7 6h9v5H7z"/>', '<rect x="4" y="3" width="15" height="18" rx="2"/><path d="M7 6h9v5H7zM7 14h9M7 17.5h6"/><path d="M19 8h1.5v10.5A2.5 2.5 0 0 1 18 21"/>'],
    cards: ['<rect class="ac" x="4" y="7" width="11" height="14" rx="2"/>', '<rect x="3" y="6" width="12" height="15" rx="2"/><path d="M7 3h11a2 2 0 0 1 2 2v13"/><path d="M6.5 11h5M6.5 15h3"/>'],
    chart: ['<path class="ac" d="M10 9h4v11h-4z"/>', '<path d="M3 20.5h18"/><rect x="4" y="12" width="4" height="8" rx="1"/><rect x="10" y="7" width="4" height="13" rx="1"/><rect x="16" y="3.5" width="4" height="16.5" rx="1"/>'],
    phone: ['<rect class="ac" x="8" y="5" width="8" height="12" rx="1"/>', '<rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M12 7v6.5M9.5 11l2.5 2.5 2.5-2.5M10.5 18.5h3"/>'],
    gear: ['<circle class="ac" cx="12" cy="12" r="3.2"/>', '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.6M12 18.9v2.6M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M2.5 12h2.6M18.9 12h2.6M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/><circle cx="12" cy="12" r="6.4"/>'],
    search: ['', '<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.3-4.3"/>'],
    help: ['', '<path d="M9.2 9.3a2.9 2.9 0 1 1 4 2.7c-.8.4-1.2 1-1.2 1.9v.4"/><path d="M12 17.6h.01"/>'],
    check: ['', '<circle cx="12" cy="12" r="9"/><path d="m8 12.2 2.7 2.7L16.2 9.4"/>'],
    star: ['', '<path d="m12 3.5 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.2-4.1 5.8-.8z"/>'],
    path: ['<circle class="ac" cx="6" cy="18" r="2.5"/>', '<circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M8.5 18H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.5"/>']
  };
  EK.icon = function (name, cls) {
    var p = P[name] || P.help;
    return '<svg class="ic ' + (cls || '') + '" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + p[0] + p[1] + '</svg>';
  };
})();
