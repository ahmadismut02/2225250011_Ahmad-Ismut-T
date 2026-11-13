"""Server EksponenKu (Python + FastAPI).

Fungsi:
1. Menyajikan aplikasi web (folder ``app/``) — cukup satu perintah untuk menjalankan semuanya.
2. ``POST /api/verify`` — memeriksa kesetaraan dua ekspresi secara eksak dengan SymPy.
3. ``POST /api/model-story-problem`` — disiapkan untuk Asisten Pemodelan AI (Fase 2).

Menjalankan (dari folder proyek):
    python -m uvicorn server.main:app --reload --port 8000
lalu buka http://localhost:8000
"""
from __future__ import annotations

import mimetypes
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field

from .mathcheck import MAX_LEN, MathInputError, equivalent, is_scientific, normalize

ROOT = Path(__file__).resolve().parent.parent
APP_DIR = ROOT / "app"
VERSION = "0.1.1"

mimetypes.add_type("application/manifest+json", ".webmanifest")
mimetypes.add_type("text/javascript", ".js")

app = FastAPI(
    title="EksponenKu API",
    version=VERSION,
    docs_url="/api/docs",
    redoc_url=None,
    openapi_url="/api/openapi.json",
)


class VerifyRequest(BaseModel):
    a: str = Field(..., max_length=MAX_LEN, description="Ekspresi pertama, mis. 3*2^n")
    b: str = Field(..., max_length=MAX_LEN, description="Ekspresi kedua, mis. 2^n*3")


class VerifyResponse(BaseModel):
    equivalent: bool
    a: str
    b: str
    b_is_scientific: bool


@app.get("/api/health")
def health() -> dict:
    return {"status": "ok", "version": VERSION}


@app.post("/api/verify", response_model=VerifyResponse)
def verify(req: VerifyRequest) -> VerifyResponse:
    """Memeriksa apakah dua ekspresi setara (huruf diuji dengan beberapa nilai, secara eksak)."""
    try:
        same = equivalent(req.a, req.b)
    except MathInputError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    return VerifyResponse(equivalent=same, a=normalize(req.a), b=normalize(req.b), b_is_scientific=is_scientific(req.b))


@app.post("/api/model-story-problem")
def model_story_problem() -> JSONResponse:
    """Titik akhir Asisten Pemodelan AI (Fase 2). Belum aktif di MVP."""
    return JSONResponse(
        status_code=501,
        content={"detail": "Asisten Pemodelan AI direncanakan untuk Fase 2. Lihat docs/10-asisten-pemodelan-ai.md."},
    )


@app.get("/sw.js", include_in_schema=False)
def service_worker() -> FileResponse:
    # Service worker tidak boleh di-cache lama agar pembaruan aplikasi cepat sampai ke siswa.
    return FileResponse(APP_DIR / "sw.js", media_type="text/javascript", headers={"Cache-Control": "no-cache"})


app.mount("/", StaticFiles(directory=APP_DIR, html=True), name="app")
