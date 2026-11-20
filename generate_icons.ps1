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

    # Background gradient (#6C5CE7 -> #2D1BA4)
    $rect = New-Object System.Drawing.Rectangle(0, 0, $Size, $Size)
    $c1 = [System.Drawing.ColorTranslator]::FromHtml("#6C5CE7")
    $c2 = [System.Drawing.ColorTranslator]::FromHtml("#2D1BA4")
    $brush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($rect, $c1, $c2, 45.0)

    # Rounded rectangle squircle
    $radius = [int]($Size * 0.24)
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

    # Subtle inner border
    $innerPen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(60, 255, 255, 255), [float]($Size * 0.012))
    $g.DrawPath($innerPen, $gPath)

    # Center coords
    $cx = [float]($Size * 0.5)
    $cy = [float]($Size * 0.54)

    # 1. HIZ (SPEED): Cyan streaks on left
    $cyanPen1 = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#00CEC9"), [float]($Size * 0.024))
    $cyanPen1.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cyanPen1.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cyanPen2 = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#81ECEC"), [float]($Size * 0.028))
    $cyanPen2.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cyanPen2.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cyanPen3 = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#00CEC9"), [float]($Size * 0.020))
    $cyanPen3.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $cyanPen3.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $g.DrawLine($cyanPen1, [float]($Size * 0.12), [float]($Size * 0.30), [float]($Size * 0.34), [float]($Size * 0.30))
    $g.DrawLine($cyanPen2, [float]($Size * 0.09), [float]($Size * 0.38), [float]($Size * 0.28), [float]($Size * 0.38))
    $g.DrawLine($cyanPen3, [float]($Size * 0.14), [float]($Size * 0.46), [float]($Size * 0.25), [float]($Size * 0.46))

    # 2. KİTAP (BOOK): Open pages
    # Left page curve
    $lp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $lp.AddBezier(
        [float]($cx - $Size * 0.02), [float]($cy + $Size * 0.20),
        [float]($cx - $Size * 0.16), [float]($cy + $Size * 0.23),
        [float]($cx - $Size * 0.30), [float]($cy + $Size * 0.18),
        [float]($cx - $Size * 0.34), [float]($cy + $Size * 0.11)
    )
    $lp.AddBezier(
        [float]($cx - $Size * 0.34), [float]($cy + $Size * 0.11),
        [float]($cx - $Size * 0.33), [float]($cy - $Size * 0.18),
        [float]($cx - $Size * 0.20), [float]($cy - $Size * 0.12),
        [float]($cx - $Size * 0.02), [float]($cy - $Size * 0.13)
    )
    $lp.CloseFigure()
    $leftBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(240, 245, 245, 255))
    $g.FillPath($leftBrush, $lp)

    # Right page curve
    $rp = New-Object System.Drawing.Drawing2D.GraphicsPath
    $rp.AddBezier(
        [float]($cx + $Size * 0.02), [float]($cy + $Size * 0.20),
        [float]($cx + $Size * 0.16), [float]($cy + $Size * 0.23),
        [float]($cx + $Size * 0.30), [float]($cy + $Size * 0.18),
        [float]($cx + $Size * 0.34), [float]($cy + $Size * 0.11)
    )
    $rp.AddBezier(
        [float]($cx + $Size * 0.34), [float]($cy + $Size * 0.11),
        [float]($cx + $Size * 0.33), [float]($cy - $Size * 0.18),
        [float]($cx + $Size * 0.20), [float]($cy - $Size * 0.12),
        [float]($cx + $Size * 0.02), [float]($cy - $Size * 0.13)
    )
    $rp.CloseFigure()
    $rightBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.FillPath($rightBrush, $rp)

    # Book spine fold
    $spineBrush = New-Object System.Drawing.SolidBrush([System.Drawing.ColorTranslator]::FromHtml("#4834D4"))
    $g.FillRectangle($spineBrush, [float]($cx - $Size * 0.015), [float]($cy - $Size * 0.13), [float]($Size * 0.03), [float]($Size * 0.33))

    # Knowledge reading lines on pages
    $linePen = New-Object System.Drawing.Pen([System.Drawing.Color]::FromArgb(90, 108, 92, 231), [float]($Size * 0.02))
    $linePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $linePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $g.DrawLine($linePen, [float]($cx - $Size * 0.26), [float]($cy - $Size * 0.04), [float]($cx - $Size * 0.10), [float]($cy - $Size * 0.02))
    $g.DrawLine($linePen, [float]($cx - $Size * 0.26), [float]($cy + $Size * 0.04), [float]($cx - $Size * 0.13), [float]($cy + $Size * 0.06))

    $g.DrawLine($linePen, [float]($cx + $Size * 0.10), [float]($cy - $Size * 0.02), [float]($cx + $Size * 0.26), [float]($cy - $Size * 0.04))
    $g.DrawLine($linePen, [float]($cx + $Size * 0.13), [float]($cy + $Size * 0.06), [float]($cx + $Size * 0.26), [float]($cy + $Size * 0.04))

    # 3. OK (ARROW) + HIZ (SPEED): Supersonic Arrow
    $arrowPath = New-Object System.Drawing.Drawing2D.GraphicsPath
    $points = @(
        (New-Object System.Drawing.PointF([float]($cx), [float]($cy - $Size * 0.36))),
        (New-Object System.Drawing.PointF([float]($cx + $Size * 0.17), [float]($cy - $Size * 0.13))),
        (New-Object System.Drawing.PointF([float]($cx + $Size * 0.06), [float]($cy - $Size * 0.15))),
        (New-Object System.Drawing.PointF([float]($cx + $Size * 0.06), [float]($cy + $Size * 0.08))),
        (New-Object System.Drawing.PointF([float]($cx - $Size * 0.06), [float]($cy + $Size * 0.08))),
        (New-Object System.Drawing.PointF([float]($cx - $Size * 0.06), [float]($cy - $Size * 0.15))),
        (New-Object System.Drawing.PointF([float]($cx - $Size * 0.17), [float]($cy - $Size * 0.13)))
    )
    $arrowPath.AddPolygon($points)

    # Arrow Drop Shadow
    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(70, 15, 12, 49))
    $g.TranslateTransform(0, [float]($Size * 0.015))
    $g.FillPath($shadowBrush, $arrowPath)
    $g.TranslateTransform(0, [float](-$Size * 0.015))

    # Golden Gradient for Arrow
    $arrowRect = New-Object System.Drawing.Rectangle([int]($cx - $Size * 0.2), [int]($cy - $Size * 0.38), [int]($Size * 0.4), [int]($Size * 0.5))
    $gold1 = [System.Drawing.ColorTranslator]::FromHtml("#FFA502")
    $gold2 = [System.Drawing.ColorTranslator]::FromHtml("#FFD32A")
    $arrowBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush($arrowRect, $gold2, $gold1, 90.0)
    $g.FillPath($arrowBrush, $arrowPath)

    # White border around arrow
    $arrowPen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, [float]($Size * 0.016))
    $g.DrawPath($arrowPen, $arrowPath)

    # Arrow center ridge (3D speed line)
    $ridgePen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, [float]($Size * 0.014))
    $ridgePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $ridgePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawLine($ridgePen, [float]($cx), [float]($cy - $Size * 0.34), [float]($cx), [float]($cy + $Size * 0.07))

    # Cyan shockwave arc at arrow tip
    $wavePen = New-Object System.Drawing.Pen([System.Drawing.ColorTranslator]::FromHtml("#00CEC9"), [float]($Size * 0.02))
    $wavePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $wavePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $g.DrawArc($wavePen, [float]($cx - $Size * 0.10), [float]($cy - $Size * 0.42), [float]($Size * 0.20), [float]($Size * 0.12), 200, 140)

    # White energy star / point at crest
    $dotBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
    $dotRadius = [float]($Size * 0.018)
    $g.FillEllipse($dotBrush, [float]($cx - $dotRadius), [float]($cy - $Size * 0.41 - $dotRadius), [float]($dotRadius * 2), [float]($dotRadius * 2))

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
