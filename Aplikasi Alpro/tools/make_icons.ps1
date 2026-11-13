# Membuat ikon PNG aplikasi (tanpa alat tambahan, memakai System.Drawing bawaan Windows).
# Jalankan dari folder proyek:  powershell -ExecutionPolicy Bypass -File tools\make_icons.ps1
Add-Type -AssemblyName System.Drawing
$out = Join-Path $PSScriptRoot "..\app\icons"
New-Item -ItemType Directory -Force $out | Out-Null

function New-Icon([int]$size, [string]$file, [bool]$maskable) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = 'AntiAlias'
  $g.TextRenderingHint = 'AntiAliasGridFit'
  $g.Clear([System.Drawing.Color]::Transparent)
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#3B6EA5'))
  if ($maskable) {
    $g.FillRectangle($bg, 0, 0, $size, $size)
    $scale = 0.62
  } else {
    $r = [int]($size * 0.22)
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $d = $r * 2
    $path.AddArc(0, 0, $d, $d, 180, 90)
    $path.AddArc($size - $d, 0, $d, $d, 270, 90)
    $path.AddArc($size - $d, $size - $d, $d, $d, 0, 90)
    $path.AddArc(0, $size - $d, $d, $d, 90, 90)
    $path.CloseFigure()
    $g.FillPath($bg, $path)
    $scale = 0.8
  }
  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
  $lilac = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#F1DDFB'))
  $fontBig = New-Object System.Drawing.Font 'Georgia', ([single]($size * 0.72 * $scale)), ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Pixel)
  $fontSup = New-Object System.Drawing.Font 'Georgia', ([single]($size * 0.40 * $scale)), ([System.Drawing.FontStyle]::Italic), ([System.Drawing.GraphicsUnit]::Pixel)
  $cx = $size / 2
  $g.DrawString('x', $fontBig, $white, [single]($cx - $size * 0.46 * $scale), [single]($size / 2 - $size * 0.50 * $scale))
  $g.DrawString('n', $fontSup, $lilac, [single]($cx + $size * 0.02 * $scale), [single]($size / 2 - $size * 0.56 * $scale))
  $bmp.Save((Join-Path $out $file), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

New-Icon 192 'icon-192.png' $false
New-Icon 512 'icon-512.png' $false
New-Icon 512 'icon-maskable-512.png' $true
New-Icon 180 'apple-touch-icon.png' $true
Get-ChildItem $out | Select-Object Name, Length
