# Menjalankan uji otomatis di Microsoft Edge tanpa layar (headless). Tidak perlu Node atau Python.
# Pemakaian:  powershell -ExecutionPolicy Bypass -File tools\run_tests.ps1
$edge = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $edge) { Write-Error "Edge/Chrome tidak ditemukan."; exit 2 }

$page = (Resolve-Path (Join-Path $PSScriptRoot "..\tests\run-tests.html")).Path
$url = "file:///" + ($page -replace '\\', '/')
$profileDir = Join-Path $env:TEMP ("ek-test-" + [guid]::NewGuid())
$dom = & $edge --headless=new --disable-gpu --no-first-run --user-data-dir="$profileDir" --allow-file-access-from-files --dump-dom $url 2>$null | Out-String
Remove-Item -Recurse -Force $profileDir -ErrorAction SilentlyContinue

$m = [regex]::Match($dom, '<pre id="out">([\s\S]*?)</pre>')
if (-not $m.Success) { Write-Output "Tidak bisa membaca hasil uji."; exit 2 }
$text = [System.Net.WebUtility]::HtmlDecode($m.Groups[1].Value)
Write-Output $text
if ($text -match 'HASIL: \d+ lulus, 0 gagal') { exit 0 } else { exit 1 }
