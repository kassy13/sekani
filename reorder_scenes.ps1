# Read the entire file
$content = Get-Content index.html -Raw

# Split into sections
$lines = Get-Content index.html

# Extract sections (0-indexed, so subtract 1 from line numbers)
$before = $lines[0..208] -join "`n"
$scene6 = $lines[209..229] -join "`n"
# Skip scene 5 (lines 230-284)
$scene4 = $lines[285..473] -join "`n"
$scene3 = $lines[474..502] -join "`n"
$scene2 = $lines[503..631] -join "`n"
$scene1 = $lines[632..($lines.Count-1)] -join "`n"

# Rebuild in new order: 1, 2, 3, 6, 4
$newContent = @"
$before
                <!-- ══ SCENE 1 — CINEMATIC GIFT INTRO ══ -->
$($scene1.Substring($scene1.IndexOf('<div')))
"@

# Remove the duplicate scene 1 comment
$newContent = $newContent -replace '<!-- ══ SCENE 1 — CINEMATIC GIFT INTRO ══ -->\s+<!-- ══ SCENE 1 — CINEMATIC GIFT INTRO ══ -->', '<!-- ══ SCENE 1 — CINEMATIC GIFT INTRO ══ -->'

# Write back
$newContent | Set-Content index_new.html -NoNewline
Write-Host "Created index_new.html with reordered scenes"
