# export-leaf-folders.ps1
# Outputs leaf folders and their files, plus root files, into a timestamped text file

$root = "C:\Users\harle\OneDrive\Documents\GitHub\The-Peoples-Branch"
$timestamp = Get-Date -Format "yyyy-MM-dd_HH-mm-ss"
$outputPath = "$root\leaf-directory-files_$timestamp.txt"
$output = @()

# Include root folder and its files
$output += "📁 $root"
$rootFiles = Get-ChildItem -Path $root -File
foreach ($file in $rootFiles) {
    $output += "    📄 $($file.Name)"
}
$output += ""

# Find all leaf directories (no subfolders)
$leafDirs = Get-ChildItem -Path $root -Recurse -Directory | Where-Object {
    (Get-ChildItem $_.FullName -Directory).Count -eq 0
}

# Add each leaf folder and its files
foreach ($dir in $leafDirs) {
    $output += "📁 $($dir.FullName)"
    $files = Get-ChildItem $dir.FullName -File
    foreach ($file in $files) {
        $output += "    📄 $($file.Name)"
    }
    $output += ""
}

# Write to file
$output | Out-File -FilePath $outputPath -Encoding UTF8
Write-Output "✅ Snapshot saved to: $outputPath"
