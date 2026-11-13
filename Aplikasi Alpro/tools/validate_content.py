"""Memeriksa kebenaran dan kelengkapan konten EksponenKu dengan SymPy (perhitungan eksak).

Pemakaian (dari folder proyek):
    python tools/validate_content.py

Yang diperiksa:
- ID soal unik, rujukan sifat (P1..P7, S1) dan miskonsepsi (M.., MM..) ada.
- Kunci jawaban bisa dibaca; nilai ``expr`` (soal asli) sama dengan kunci.
- Jawaban salah yang terdaftar memang berbeda dari kunci.
- Soal pemodelan: model menghasilkan jawaban, tabel pola konsisten, tafsiran sama dengan hasil.
- Stimulus literasi memuat tiga level proses kognitif.
Keluar dengan kode 1 bila ada kesalahan.
"""
from __future__ import annotations

import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(ROOT))

from server.mathcheck import MathInputError, equivalent, is_scientific, normalize, parse, value  # noqa: E402

CONTENT_DIR = ROOT / "app" / "content"
LEVELS = {"dasar", "menengah", "tantangan"}
COG = {"pemahaman", "penerapan", "penalaran"}

errors: list[str] = []
warnings: list[str] = []


def err(msg: str) -> None:
    errors.append(msg)


def load_packs() -> list[dict]:
    packs = []
    for f in sorted(CONTENT_DIR.glob("*.js")):
        text = f.read_text(encoding="utf-8")
        start = text.index("EK.addContent(") + len("EK.addContent(")
        end = text.rindex(")")
        try:
            packs.append(json.loads(text[start:end]))
        except json.JSONDecodeError as exc:
            err(f"{f.name}: JSON tidak valid — {exc}")
    return packs


def correct_input(spec: dict, raw: str) -> bool:
    mode = spec.get("mode", "value")
    if mode == "exact":
        return normalize(raw) in {normalize(a) for a in [spec["answer"], *spec.get("accept", [])]}
    same = equivalent(raw, spec["answer"])
    if mode == "sci":
        return same and is_scientific(raw)
    if mode == "model":
        return same and ("^" in normalize(raw) or bool(parse(raw).free_symbols))
    return same


def check_strings(obj, where: str) -> None:
    if isinstance(obj, str):
        if obj.count("$") % 2:
            err(f"{where}: tanda $ tidak seimbang: {obj[:60]}")
    elif isinstance(obj, list):
        for x in obj:
            check_strings(x, where)
    elif isinstance(obj, dict):
        for x in obj.values():
            check_strings(x, where)


def main() -> int:
    packs = load_packs()
    props, mis, units, modeling, stimuli = {}, {}, [], [], []
    for p in packs:
        props.update({x["id"]: x for x in p.get("properties", [])})
        mis.update({x["id"]: x for x in p.get("misconceptions", [])})
        units += p.get("units", [])
        modeling += p.get("modeling", [])
        stimuli += p.get("stimuli", [])

    def ref_mis(code, where):
        if isinstance(code, str) and code[:1] == "M" and code[1:].lstrip("M").isdigit() and code not in mis:
            err(f"{where}: miskonsepsi {code} tidak ada")

    ids: set[str] = set()
    n_ex = 0
    for u in units:
        check_strings(u, u["id"])
        for ex in u.get("examples", []):
            for s in ex["steps"]:
                if s.get("prop") and s["prop"] not in props:
                    err(f"{u['id']}: sifat {s['prop']} tidak ada")
        for x in u.get("exercises", []):
            n_ex += 1
            w = x["id"]
            if w in ids:
                err(f"{w}: ID ganda")
            ids.add(w)
            if x["level"] not in LEVELS:
                err(f"{w}: level tidak valid")
            for p in x.get("props", []):
                if p not in props:
                    err(f"{w}: sifat {p} tidak ada")
            if x["level"] != "dasar" and len(x.get("hints", [])) < 2:
                warnings.append(f"{w}: petunjuk kurang dari 2")
            if x["type"] == "input":
                try:
                    if not correct_input(x, x["answer"]):
                        err(f"{w}: kunci tidak dinilai benar")
                    if x.get("expr") and not equivalent(x["expr"], x["answer"]):
                        err(f"{w}: nilai expr {x['expr']} ≠ kunci {x['answer']}")
                    for wr in x.get("wrong", []):
                        ref_mis(wr.get("mis"), w)
                        if correct_input(x, wr["answer"]):
                            err(f"{w}: jawaban salah {wr['answer']} justru dinilai benar")
                except MathInputError as exc:
                    err(f"{w}: {exc}")
            elif x["type"] == "mcq":
                if not 0 <= x["correct"] < len(x["options"]):
                    err(f"{w}: indeks kunci tidak valid")
                for k, v in x.get("optionFeedback", {}).items():
                    ref_mis(v, w)
                    if int(k) == x["correct"]:
                        err(f"{w}: umpan balik salah dipasang pada kunci")
            elif x["type"] == "choose-property":
                if x["correct"] not in x["options"]:
                    err(f"{w}: sifat kunci tidak ada di pilihan")
            else:
                err(f"{w}: tipe soal {x['type']} tidak dikenal")

    types = {}
    for p in modeling:
        w = p["id"]
        check_strings(p, w)
        types[p["type"]] = types.get(p["type"], 0) + 1
        try:
            for k in p["understand"]["known"]:
                parse(k["answer"])
            model = parse(p["model"]["answer"])
            has_n = any(s.name == "n" for s in model.free_symbols)
            got = value(p["model"]["answer"], {"n": p["solve"]["n"]["answer"]}) if has_n else value(p["model"]["answer"])
            target = value(p["solve"].get("modelValue") or p["solve"]["answer"])
            if not equivalent(got, target):
                err(f"{w}: model menghasilkan {got}, seharusnya {target}")
            tbl = p["model"].get("table")
            if tbl and has_n and not equivalent(value(p["model"]["answer"], {"n": tbl["ask"]["label"]}), parse(tbl["ask"]["answer"])):
                err(f"{w}: baris tabel pola tidak konsisten dengan model")
            for wr in p["model"].get("wrong", []):
                ref_mis(wr.get("mis"), w)
                if correct_input({"answer": p["model"]["answer"], "mode": "model"}, wr["answer"]):
                    err(f"{w}: model salah {wr['answer']} justru dinilai benar")
            if not equivalent(p["interpret"]["answer"], p["solve"]["answer"]):
                err(f"{w}: tafsiran berbeda dengan hasil")
            for v in p["check"].get("optionFeedback", {}).values():
                ref_mis(v, w)
        except (MathInputError, KeyError) as exc:
            err(f"{w}: {exc!r}")
    for t in ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8"]:
        if types.get(t, 0) < 1:
            err(f"Tipe soal cerita {t} belum ada")
        elif types[t] < 2:
            warnings.append(f"Tipe {t} baru {types[t]} soal (target MVP: 2)")

    for s in stimuli:
        check_strings(s, s["id"])
        levels = {q["level"] for q in s["questions"]}
        if not COG <= levels:
            err(f"{s['id']}: belum memuat ketiga level proses kognitif")
        for q in s["questions"]:
            if q["type"] == "input" and not correct_input(q, q["answer"]):
                err(f"{q['id']}: kunci tidak dinilai benar")

    print(f"Unit: {len(units)} | Soal latihan: {n_ex} | Soal pemodelan: {len(modeling)} | Stimulus: {len(stimuli)}")
    for wmsg in warnings:
        print("PERINGATAN:", wmsg)
    for e in errors:
        print("KESALAHAN:", e)
    print("Hasil:", "LULUS" if not errors else f"{len(errors)} kesalahan")
    return 1 if errors else 0


if __name__ == "__main__":
    sys.exit(main())
