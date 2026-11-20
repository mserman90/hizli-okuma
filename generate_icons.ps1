Add-Type -AssemblyName System.Drawing

function Create-AppIcon {
    param(
        [int]$Size,
        [string]$OutputPath
    )

    $bmp = New-Object System.Drawing.Bitmap($Size, $Size)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

    # Background gradient
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
    $c1 = [System.Drawing.ColorTranslator]::FromHtml("#6C5CE7")
    $c2 = [System.Drawing.ColorTranslator]::FromHtml("#00CEC9")
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 45.0)

    # Rounded rectangle path
    $radius = [int]($Size * 0.22)
    $diameter = $radius * 2
    $gPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $arcRect = New-Object System.Drawing.Rectangle(0, 0, $diameter, $diameter)
    $gPath.AddArc($arcRect, 180, 90)
    $arcRect.X = $Size - $diameter
    $gPath.AddArc($arcRect, 270, 90)
    $arcRect.Y = $Size - $diameter
    $gPath.AddArc($arcRect, 0, 90)
    $arcRect.X = 0
    $gPath.AddArc($arcRect, 90, 90)
    $gPath.CloseFigure()

    $g.FillPath($brush, $gPath)

    # Center coords
    $cx = [float]($Size * 0.5)
    $cy = [float]($Size * 0.54)

    # Open Book
    # Left page curve
    $lp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $lp.AddBezier(
        [float]($cx - $Size * 0.03), [float]($cy + $Size * 0.18),
        [float]($cx - $Size * 0.20), [float]($cy + $Size * 0.22),
        [float]($cx - $Size * 0.32), [float]($cy + $Size * 0.15),
        [float]($cx - $Size * 0.36), [float]($cy - $Size * 0.12)
    )
    $lp.AddBezier(
        [float]($cx - $Size * 0.36), [float]($cy - $Size * 0.12),
        [float]($cx - $Size * 0.28), [float]($cy - $Size * 0.18),
        [float]($cx - $Size * 0.15), [float]($cy - $Size * 0.12),
        [float]($cx - $Size * 0.03), [float]($cy - $Size * 0.06)
    )
    $lp.CloseFigure()
    $leftBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(235, 255, 255, 255))
    $g.FillPath($leftBrush, $lp)

    # Right page curve
    $rp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $rp.AddBezier(
        [float]($cx + $Size * 0.03), [float]($cy + $Size * 0.18),
        [float]($cx + $Size * 0.20), [float]($cy + $Size * 0.22),
        [float]($cx + $Size * 0.32), [float]($cy + $Size * 0.15),
        [float]($cx + $Size * 0.36), [float]($cy - $Size * 0.12)
    )
    $rp.AddBezier(
        [float]($cx + $Size * 0.36), [float]($cy - $Size * 0.12),
        [float]($cx + $Size * 0.28), [float]($cy - $Size * 0.18),
        [float]($cx + $Size * 0.15), [float]($cy - $Size * 0.12),
        [float]($cx + $Size * 0.03), [float]($cy - $Size * 0.06)
    )
    $rp.CloseFigure()
    $rightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.FillPath($rightBrush, $rp)

    # Lightning bolt in center (Speed symbol)
    $boltPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $points = @(
        (New-Object System.Drawing.PointF([float]($cx + $Size * 0.03), [float]($cy - $Size * 0.28))),
        (New-Object System.Drawing.PointF([float]($cx - $Size * 0.12), [float]($cy - $Size * 0.02))),
        (New-Object System.Drawing.PointF([float]($cx - $Size * 0.01), [float]($cy - $Size * 0.02))),
        (New-Object System.Drawing.PointF([float]($cx - $Size * 0.06), [float]($cy + $Size * 0.24))),
        (New-Object System.Drawing.PointF([float]($cx + $Size * 0.14), [float]($cy - $Size * 0.04))),
        (New-Object System.Drawing.PointF([float]($cx + $Size * 0.01), [float]($cy - $Size * 0.04)))
    )
    $boltPath.AddPolygon($points)

    # Golden yellow gradient for lightning bolt
    $boltRect = New-Object System.Drawing.Rectangle([int]($cx - $Size * 0.15), [int]($cy - $Size * 0.3), [int]($Size * 0.3), [int]($Size * 0.6))
    $gold1 = [System.Drawing.ColorTranslator]::FromHtml("#FDCB6E")
    $gold2 = [System.Drawing.ColorTranslator]::FromHtml("#E17055")
    $boltBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($boltRect, $gold1, $gold2, 45.0)

    # Shadow for bolt
    $boltShadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(60, 0, 0, 0))
    $g.TranslateTransform(2, 3)
    $g.FillPath($boltShadowBrush, $boltPath)
    $g.TranslateTransform(-2, -3)

    $g.FillPath($boltBrush, $boltPath)

    # White border around bolt
    $boltPen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, [float]($Size * 0.02))
    $g.DrawPath($boltPen, $boltPath)

    $g.Dispose()
    $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Host "Created $OutputPath ($Size x $Size)"
}

$dir = "C:\Users\murat.erman\.gemini\antigravity\scratch\hizli-okuma"
Create-AppIcon -Size 512 -OutputPath (Join-Path $dir "icon-512.png")
Create-AppIcon -Size 192 -OutputPath (Join-Path $dir "icon-192.png")
Create-AppIcon -Size 180 -OutputPath (Join-Path $dir "apple-touch-icon.png")
Create-AppIcon -Size 32  -OutputPath (Join-Path $dir "favicon.png")
