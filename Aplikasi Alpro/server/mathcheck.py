"""Pemeriksa matematika yang aman untuk EksponenKu.

Parser recursive-descent buatan sendiri yang membangun ekspresi SymPy secara eksak.
Tidak memakai ``eval`` maupun ``sympy.parse_expr`` (keduanya menjalankan kode),
sehingga aman untuk input dari siswa. Aturannya sama dengan ``app/js/math.js``.
"""
from __future__ import annotations

import re
from typing import Dict, List, Optional

import sympy as sp

MAX_LEN = 120
MAX_EXP = 400
SAMPLES = (1, 2, 3, 4, 7)

_SUP = str.maketrans("⁰¹²³⁴⁵⁶⁷⁸⁹⁻", "0123456789-")


class MathInputError(ValueError):
    """Input tidak dapat dibaca sebagai ekspresi matematika."""


def normalize(raw: object) -> str:
    """Menyeragamkan tulisan: superskrip, ×, ÷, koma desimal, pemisah ribuan, spasi."""
    s = str(raw if raw is not None else "").strip().lower()
    s = re.sub(r"[⁰¹²³⁴⁵⁶⁷⁸⁹⁻]+", lambda m: "^(" + m.group(0).translate(_SUP) + ")", s)
    s = re.sub(r"[×·∙]", "*", s)
    s = re.sub(r"[÷:]", "/", s)
    s = re.sub(r"[−–—]", "-", s)
    s = re.sub(r"\s+", "", s)
    s = re.sub(
        r"(^|[^\d.,])([1-9]\d{0,2}(?:\.\d{3})+)(?![\d,.])",
        lambda m: m.group(1) + m.group(2).replace(".", ""),
        s,
    )
    s = s.replace(",", ".")
    s = re.sub(r"[{\[]", "(", s)
    s = re.sub(r"[}\]]", ")", s)
    s = re.sub(r"(\d)x(?=\d)", r"\1*", s)
    s = re.sub(r"\^\((-?\d+(?:\.\d+)?)\)", r"^\1", s)
    return s


def _tokenize(s: str) -> List[tuple]:
    tokens: List[tuple] = []
    i = 0
    while i < len(s):
        c = s[i]
        if c.isdigit() or c == ".":
            j = i
            while j < len(s) and (s[j].isdigit() or s[j] == "."):
                j += 1
            num = s[i:j]
            if not re.fullmatch(r"\d+\.?\d*|\.\d+", num):
                raise MathInputError(f"Penulisan angka tidak dikenali: {num}")
            tokens.append(("num", num))
            i = j
            continue
        if "a" <= c <= "z":
            tokens.append(("var", c))
            i += 1
            continue
        if c in "+-*/^()":
            tokens.append((c, c))
            i += 1
            continue
        raise MathInputError(f'Tanda "{c}" tidak dikenali.')
    return tokens


class _Parser:
    def __init__(self, tokens: List[tuple]):
        self.tk = tokens
        self.pos = 0

    def peek(self) -> Optional[tuple]:
        return self.tk[self.pos] if self.pos < len(self.tk) else None

    def eat(self, kind: str) -> tuple:
        p = self.peek()
        if not p or p[0] != kind:
            raise MathInputError("Penulisan belum lengkap. Periksa tanda kurung atau operasinya.")
        self.pos += 1
        return p

    def expr(self):
        node = self.term()
        while self.peek() and self.peek()[0] in "+-":
            op = self.tk[self.pos][0]
            self.pos += 1
            rhs = self.term()
            node = node + rhs if op == "+" else node - rhs
        return node

    def term(self):
        node = self.unary()
        while True:
            p = self.peek()
            if p and p[0] in ("*", "/"):
                self.pos += 1
                rhs = self.unary()
                if p[0] == "/" and rhs == 0:
                    raise MathInputError("Pembagian dengan nol tidak terdefinisi.")
                node = node * rhs if p[0] == "*" else node / rhs
            elif p and p[0] in ("var", "(", "num"):
                node = node * self.power()  # perkalian tersirat: 3n, 2(3)
            else:
                return node

    def unary(self):
        p = self.peek()
        if p and p[0] == "-":
            self.pos += 1
            return -self.unary()
        if p and p[0] == "+":
            self.pos += 1
            return self.unary()
        return self.power()

    def power(self):
        base = self.primary()
        if self.peek() and self.peek()[0] == "^":
            self.pos += 1
            exp = self.unary()
            if exp.is_number and abs(exp) > MAX_EXP:
                raise MathInputError("Pangkatnya terlalu besar.")
            if base == 0 and exp.is_number and exp <= 0:
                raise MathInputError("0 dengan pangkat nol atau negatif tidak terdefinisi.")
            return sp.Pow(base, exp)
        return base

    def primary(self):
        p = self.peek()
        if not p:
            raise MathInputError("Penulisan belum lengkap.")
        if p[0] == "num":
            self.pos += 1
            return sp.Rational(p[1])
        if p[0] == "var":
            self.pos += 1
            return sp.Symbol(p[1])
        if p[0] == "(":
            self.pos += 1
            e = self.expr()
            self.eat(")")
            return e
        raise MathInputError("Penulisan belum lengkap. Periksa tanda kurung atau operasinya.")


def parse(raw: object) -> sp.Expr:
    """Mengubah teks menjadi ekspresi SymPy eksak. Melempar MathInputError bila tidak valid."""
    s = normalize(raw)
    if not s:
        raise MathInputError("Jawaban masih kosong.")
    if len(s) > MAX_LEN:
        raise MathInputError("Jawaban terlalu panjang.")
    parser = _Parser(_tokenize(s))
    expr = parser.expr()
    if parser.pos < len(parser.tk):
        raise MathInputError("Ada bagian yang tidak dikenali. Periksa lagi penulisanmu.")
    return expr


def value(raw: object, env: Optional[Dict[str, object]] = None) -> sp.Expr:
    """Nilai eksak sebuah ekspresi. ``env`` mengisi huruf, mis. {"n": 6}."""
    e = parse(raw)
    if env:
        e = e.subs({sp.Symbol(k): sp.Rational(str(v)) for k, v in env.items()})
    return e


def equivalent(a: object, b: object) -> bool:
    """Apakah dua ekspresi bernilai sama? Huruf diuji dengan beberapa nilai secara eksak."""
    ea = parse(a) if not isinstance(a, sp.Basic) else a
    eb = parse(b) if not isinstance(b, sp.Basic) else b
    symbols = sorted(ea.free_symbols | eb.free_symbols, key=lambda x: x.name)
    if not symbols:
        return sp.simplify(ea - eb) == 0
    for v in SAMPLES:
        subs = {s: sp.Rational(v) + sp.Rational(k, 2) for k, s in enumerate(symbols)}
        if sp.simplify(ea.subs(subs) - eb.subs(subs)) != 0:
            return False
    return True


def has_power(raw: object) -> bool:
    return "^" in normalize(raw)


def is_scientific(raw: object) -> bool:
    """Bentuk a*10^n dengan 1 ≤ |a| < 10, atau 10^n."""
    s = normalize(raw)
    m = re.fullmatch(r"(-?\d+(?:\.\d+)?)\*10\^(-?\d+)", s)
    if m:
        a = abs(float(m.group(1)))
        return 1 <= a < 10
    return re.fullmatch(r"10\^(-?\d+)", s) is not None
