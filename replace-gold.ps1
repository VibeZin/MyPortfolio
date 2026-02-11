$files = Get-ChildItem -Path "c:\Users\Shabab Ahmed\Downloads\portfolio-234" -Include *.tsx,*.ts,*.jsx,*.js,*.css -Recurse -Exclude node_modules

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    $modified = $false
    
    # Replace all gold color references
    if ($content -match 'var\(--gold\)') {
        $content = $content -replace 'var\(--gold\)','var(--silver)'
        $modified = $true
    }
    if ($content -match 'var\(--gold-light\)') {
        $content = $content -replace 'var\(--gold-light\)','var(--silver-light)'
        $modified = $true
    }
    if ($content -match 'var\(--gold-dim\)') {
        $content = $content -replace 'var\(--gold-dim\)','var(--silver-dark)'
        $modified = $true
    }
    if ($content -match 'var\(--gold-glow\)') {
        $content = $content -replace 'var\(--gold-glow\)','var(--silver-glow)'
        $modified = $true
    }
    if ($content -match '#D4AF37') {
        $content = $content -replace '#D4AF37','#c0c0c0'
        $modified = $true
    }
    if ($content -match '#F4C430') {
        $content = $content -replace '#F4C430','#e8e8e8'
        $modified = $true
    }
    if ($content -match '#AA8C2C') {
        $content = $content -replace '#AA8C2C','#808080'
        $modified = $true
    }
    
    if ($modified) {
        Set-Content -Path $file.FullName -Value $content -NoNewline
        Write-Host "Updated: $($file.FullName)"
    }
}

Write-Host "Replacement complete!"
