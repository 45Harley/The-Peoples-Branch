# launch-server.ps1
param (
  [int]$Port = 8000
)

$Url = "http://localhost:$Port/"

Write-Host "🚀 Starting local server for Watchtower Dashboard..."
Write-Host "🌐 Serving at $Url"
Write-Host "Root directory: $PWD"

Start-Process $Url
python3 -m http.server $Port
