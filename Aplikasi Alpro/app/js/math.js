/* EksponenKu — mesin matematika: normalisasi input, parser aman, evaluasi, dan render notasi.
   Tidak memakai eval(). Semua fungsi murni (tanpa DOM). */
(function () {
  'use strict';
  var EK = (window.EK = window.EK || {});

  var SUP = { '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4', '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9', '⁻': '-' };

  /** Menyeragamkan tulisan siswa: superskrip, ×, ÷, koma desimal, pemisah ribuan, spasi. */
  function normalize(raw) {
    var s = String(raw == null ? '' : raw).trim().toLowerCase();
    s = s.replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, function (m) {
      return '^(' + m.split('').map(function (c) { return SUP[c]; }).join('') + ')';
    });
    s = s.replace(/[×·∙]/g, '*').replace(/[÷:]/g, '/').replace(/[−–—]/g, '-');
    s = s.replace(/\s+/g, '');
    // pemisah ribuan gaya Indonesia: 3.000.000 → 3000000 (hanya jika tidak diawali 0)
    s = s.replace(/(^|[^\d.,])([1-9]\d{0,2}(?:\.\d{3})+)(?![\d,.])/g, function (m, pre, num) {
      return pre + num.replace(/\./g, '');
    });
    s = s.replace(/,/g, '.');
    s = s.replace(/[{[]/g, '(').replace(/[}\]]/g, ')');
    s = s.replace(/(\d)x(?=\d)/g, '$1*');
    s = s.replace(/\^\((-?\d+(?:\.\d+)?)\)/g, '^$1');
    return s;
  }

  function MathError(msg) { this.message = msg; }

  function tokenize(s) {
    var tokens = [];
    var i = 0;
    while (i < s.length) {
      var c = s[i];
      if (/[0-9.]/.test(c)) {
        var j = i;
        while (j < s.length && /[0-9.]/.test(s[j])) j++;
        var num = s.slice(i, j);
        if (!/^(\d+\.?\d*|\.\d+)$/.test(num)) throw new MathError('Penulisan angka tidak dikenali: ' + num);
        tokens.push({ t: 'num', v: parseFloat(num) });
        i = j;
        continue;
      }
      if (/[a-z]/.test(c)) { tokens.push({ t: 'var', v: c }); i++; continue; }
      if ('+-*/^()'.indexOf(c) >= 0) { tokens.push({ t: c }); i++; continue; }
      throw new MathError('Tanda "' + c + '" tidak dikenali.');
    }
    return tokens;
  }

  /** Parser recursive-descent. Pangkat bersifat asosiatif kanan; -3^2 = -(3^2). */
  function parse(raw) {
    var s = normalize(raw);
    if (!s) throw new MathError('Jawaban masih kosong.');
    if (s.length > 120) throw new MathError('Jawaban terlalu panjang.');
    var tk = tokenize(s);
    var pos = 0;
    function peek() { return tk[pos]; }
    function eat(t) {
      var p = tk[pos];
      if (!p || p.t !== t) throw new MathError('Penulisan belum lengkap. Periksa tanda kurung atau operasinya.');
      pos++;
      return p;
    }
    function expr() {
      var node = term();
      while (peek() && (peek().t === '+' || peek().t === '-')) {
        var op = tk[pos++].t;
        node = { k: 'bin', op: op, l: node, r: term() };
      }
      return node;
    }
    function term() {
      var node = unary();
      for (;;) {
        var p = peek();
        if (p && (p.t === '*' || p.t === '/')) {
          pos++;
          node = { k: 'bin', op: p.t, l: node, r: unary() };
        } else if (p && (p.t === 'var' || p.t === '(' || p.t === 'num')) {
          // perkalian tersirat: 3n, 2(3), (2)(3)
          node = { k: 'bin', op: '*', l: node, r: power() };
        } else break;
      }
      return node;
    }
    function unary() {
      var p = peek();
      if (p && p.t === '-') { pos++; return { k: 'neg', a: unary() }; }
      if (p && p.t === '+') { pos++; return unary(); }
      return power();
    }
    function power() {
      var base = primary();
      if (peek() && peek().t === '^') {
        pos++;
        return { k: 'bin', op: '^', l: base, r: unary() };
      }
      return base;
    }
    function primary() {
      var p = peek();
      if (!p) throw new MathError('Penulisan belum lengkap.');
      if (p.t === 'num') { pos++; return { k: 'num', v: p.v }; }
      if (p.t === 'var') { pos++; return { k: 'var', v: p.v }; }
      if (p.t === '(') { pos++; var e = expr(); eat(')'); return e; }
      throw new MathError('Penulisan belum lengkap. Periksa tanda kurung atau operasinya.');
    }
    var ast = expr();
    if (pos < tk.length) throw new MathError('Ada bagian yang tidak dikenali. Periksa lagi penulisanmu.');
    return ast;
  }

  function evaluate(ast, env) {
    switch (ast.k) {
      case 'num': return ast.v;
      case 'var':
        if (!env || !(ast.v in env)) throw new MathError('Ada huruf "' + ast.v + '" yang belum diketahui nilainya.');
        return env[ast.v];
      case 'neg': return -evaluate(ast.a, env);
      case 'bin':
        var a = evaluate(ast.l, env), b = evaluate(ast.r, env);
        switch (ast.op) {
          case '+': return a + b;
          case '-': return a - b;
          case '*': return a * b;
          case '/': return a / b;
          case '^':
            if (Math.abs(b) > 400) return b > 0 ? Infinity : 0;
            return Math.pow(a, b);
        }
    }
    throw new MathError('Ekspresi tidak dikenali.');
  }

  function varsOf(ast, set) {
    set = set || {};
    if (ast.k === 'var') set[ast.v] = true;
    if (ast.k === 'neg') varsOf(ast.a, set);
    if (ast.k === 'bin') { varsOf(ast.l, set); varsOf(ast.r, set); }
    return set;
  }

  function hasPower(ast) {
    if (ast.k === 'bin') return ast.op === '^' || hasPower(ast.l) || hasPower(ast.r);
    if (ast.k === 'neg') return hasPower(ast.a);
    return false;
  }

  function eqNum(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number' || isNaN(a) || isNaN(b)) return false;
    if (!isFinite(a) || !isFinite(b)) return a === b;
    return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
  }

  var SAMPLES = [1, 2, 3, 4, 7];

  /** Apakah dua ekspresi setara? Huruf (mis. n, a) diuji dengan beberapa nilai. */
  function equivalent(a, b) {
    var A = typeof a === 'string' ? parse(a) : a;
    var B = typeof b === 'string' ? parse(b) : b;
    var vars = Object.keys(Object.assign(varsOf(A), varsOf(B)));
    if (!vars.length) return eqNum(evaluate(A), evaluate(B));
    for (var i = 0; i < SAMPLES.length; i++) {
      var env = {};
      vars.forEach(function (v, k) { env[v] = SAMPLES[i] + k * 0.5; });
      if (!eqNum(evaluate(A, env), evaluate(B, env))) return false;
    }
    return true;
  }

  function valueOf(str, env) { return evaluate(parse(str), env); }

  /** Bentuk notasi ilmiah a*10^n dengan 1 ≤ |a| < 10 (atau 10^n saja). */
  function isScientific(raw) {
    var s = normalize(raw);
    var m = /^(-?\d+(?:\.\d+)?)\*10\^(-?\d+)$/.exec(s);
    if (m) { var a = Math.abs(parseFloat(m[1])); return a >= 1 && a < 10; }
    return /^10\^(-?\d+)$/.test(s);
  }

  /* ---------- Render notasi matematika ringan ----------
     Di dalam $...$: a^b atau a^{...} → pangkat; [p/q] → pecahan bertingkat. */
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function matchClose(s, i, open, close) {
    var depth = 0;
    for (var j = i; j < s.length; j++) {
      if (s[j] === open) depth++;
      else if (s[j] === close) { depth--; if (depth === 0) return j; }
    }
    return -1;
  }

  function splitTop(s, ch) {
    var d = 0;
    for (var i = 0; i < s.length; i++) {
      var c = s[i];
      if (c === '[' || c === '{' || c === '(') d++;
      else if (c === ']' || c === '}' || c === ')') d--;
      else if (c === ch && d === 0) return i;
    }
    return -1;
  }

  function renderExpr(s) {
    var out = '';
    var i = 0;
    while (i < s.length) {
      var c = s[i];
      if (c === '[') {
        var j = matchClose(s, i, '[', ']');
        if (j > 0) {
          var inner = s.slice(i + 1, j);
          var k = splitTop(inner, '/');
          if (k >= 0) {
            out += '<span class="fr"><span class="nu">' + renderExpr(inner.slice(0, k).trim()) +
              '</span><span class="de">' + renderExpr(inner.slice(k + 1).trim()) + '</span></span>';
          } else {
            out += '[' + renderExpr(inner) + ']';
          }
          i = j + 1;
          continue;
        }
      }
      if (c === '^') {
        var content;
        if (s[i + 1] === '{') {
          var e = matchClose(s, i + 1, '{', '}');
          if (e < 0) e = s.length;
          content = s.slice(i + 2, e);
          i = e + 1;
        } else if (s[i + 1] === '(') {
          var e2 = matchClose(s, i + 1, '(', ')');
          if (e2 < 0) e2 = s.length - 1;
          content = s.slice(i + 2, e2);
          i = e2 + 1;
        } else {
          var m = /^-?[0-9a-z.]+/i.exec(s.slice(i + 1));
          content = m ? m[0] : '';
          i += 1 + content.length;
        }
        out += '<sup>' + renderExpr(content) + '</sup>';
        continue;
      }
      if (c === '-') { out += '−'; i++; continue; }
      if (c === '*') { out += '×'; i++; continue; }
      out += esc(c);
      i++;
    }
    return out;
  }

  /** Teks bacaan untuk pembaca layar. */
  function spoken(s) {
    return s.replace(/\[([^\[\]]+)\/([^\[\]]+)\]/g, '$1 per $2')
      .replace(/\^\{([^}]*)\}/g, ' pangkat $1 ')
      .replace(/\^(-?[0-9a-z]+)/gi, ' pangkat $1 ')
      .replace(/-/g, ' minus ').replace(/×/g, ' kali ').replace(/÷/g, ' bagi ')
      .replace(/\s+/g, ' ').trim();
  }

  var NUM_RE = /(\d+(?:[.,]\d+)?(?:\s?(?:menit|jam|cm|mm|mg|gram|GB|MB|KB|byte|orang|bakteri|hari|angka|foto|kali))?)/g;

  /** Render teks campuran: **tebal** dan $matematika$. Opsi highlight menyorot bilangan. */
  function renderText(text, opts) {
    opts = opts || {};
    var parts = String(text || '').split('$');
    var html = '';
    for (var p = 0; p < parts.length; p++) {
      if (p % 2 === 1) {
        html += '<span class="m" role="math" aria-label="' + esc(spoken(parts[p])) + '"><span aria-hidden="true">' +
          renderExpr(parts[p]) + '</span></span>';
      } else {
        var t = esc(parts[p]).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        if (opts.highlight) t = t.replace(NUM_RE, '<mark>$1</mark>');
        html += t;
      }
    }
    return html;
  }

  /** Pratinjau input siswa (tanpa pecahan bertingkat). */
  function previewInput(raw) {
    var s = String(raw || '').replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+/g, function (m) {
      return '^{' + m.split('').map(function (c) { return SUP[c]; }).join('') + '}';
    });
    return renderExpr(s.replace(/\[/g, '(').replace(/\]/g, ')'));
  }

  EK.math = {
    normalize: normalize,
    parse: parse,
    evaluate: evaluate,
    valueOf: valueOf,
    equivalent: equivalent,
    eqNum: eqNum,
    hasPower: hasPower,
    varsOf: varsOf,
    isScientific: isScientific,
    renderExpr: renderExpr,
    renderText: renderText,
    previewInput: previewInput,
    esc: esc,
    MathError: MathError
  };
})();
