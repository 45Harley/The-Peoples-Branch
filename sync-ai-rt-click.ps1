
# basic-directory-list.ps1
# Lists all files in the current directory and subdirectories

$root = Get-Location
$date = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$outputFile = "leaf-directory-files_$date.txt"

Get-ChildItem -Recurse -File |
    ForEach-Object {
        $relativePath = $_.FullName.Replace($root.Path + "\", "")
        "FILE: $relativePath"
    } | Out-File -Encoding UTF8 $outputFile

Write-Host "`n✅ Snapshot saved as $outputFile"
