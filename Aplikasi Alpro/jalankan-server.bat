@echo off
rem Menjalankan EksponenKu di http://localhost:8000 (klik dua kali file ini).
rem Tutup jendela ini untuk menghentikan server.
cd /d "%~dp0"

if not exist ".venv\Scripts\python.exe" (
  echo Menyiapkan lingkungan Python untuk pertama kali...
  py -m venv .venv || python -m venv .venv
  if not exist ".venv\Scripts\python.exe" (
    echo Python belum terpasang. Pasang dari https://www.python.org lalu jalankan lagi file ini.
    pause
    exit /b 1
  )
  ".venv\Scripts\python.exe" -m pip install --disable-pip-version-check -r server\requirements.txt
)

echo.
echo EksponenKu berjalan di http://localhost:8000
echo Biarkan jendela ini terbuka selama aplikasi dipakai.
echo.
start "" http://localhost:8000
".venv\Scripts\python.exe" -m uvicorn server.main:app --host 127.0.0.1 --port 8000
pause
