"""Uji server Python. Jalankan dari folder proyek:  python -m pytest tests"""
import pytest
from fastapi.testclient import TestClient

from server.main import app
from server.mathcheck import MathInputError, equivalent, is_scientific, normalize, parse

client = TestClient(app)


@pytest.mark.parametrize(
    "a,b,same",
    [
        ("2^3*2^4", "2^7", True),
        ("2⁷", "128", True),
        ("3×2^n", "2^n*3", True),
        ("3*2^n", "3+2*n", False),
        ("64*(1/2)^n", "64/2^n", True),
        ("(2/3)^2", "8/18", True),
        ("-3^2", "-9", True),
        ("(-3)^2", "9", True),
        ("2^-3", "1/8", True),
        ("3.000.000", "3*10^6", True),
        ("0,005", "5*10^-3", True),
    ],
)
def test_equivalent(a, b, same):
    assert equivalent(a, b) is same


def test_normalize():
    assert normalize(" 2 × 10³ ") == "2*10^3"


def test_scientific():
    assert is_scientific("4,5 × 10^4")
    assert not is_scientific("45*10^3")


@pytest.mark.parametrize("bad", ["", "2^", "a;b", "9^9999", "__class__", "os.system('x')", "(2+3"])
def test_rejects_bad_input(bad):
    with pytest.raises(MathInputError):
        parse(bad)


def test_code_is_never_executed():
    # Huruf hanya menjadi simbol matematika; tidak ada yang dijalankan sebagai kode.
    expr = parse("import os")
    assert {s.name for s in expr.free_symbols} <= set("importos")


def test_api_verify():
    r = client.post("/api/verify", json={"a": "3*2^n", "b": "2^n*3"})
    assert r.status_code == 200 and r.json()["equivalent"] is True
    r = client.post("/api/verify", json={"a": "2^", "b": "1"})
    assert r.status_code == 422


def test_api_health_and_static():
    assert client.get("/api/health").json()["status"] == "ok"
    assert "EksponenKu" in client.get("/").text
    assert client.post("/api/model-story-problem").status_code == 501
