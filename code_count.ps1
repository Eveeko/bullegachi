# Script to count lines and characters in code files in the current working directory, excluding specific folders

# Get the current working directory
$Path = Get-Location

# Define file extensions to include
$fileExtensions = @('*.js', '*.ts', '*.html', '*.css', '*.json', '*.yaml', '*.yml')

# Define directories to exclude
$excludeDirs = @('node_modules', '.git', '.vscode')

# Function to check if a file is in an excluded directory
function IsInExcludedDirectory($file) {
    foreach ($dir in $excludeDirs) {
        if ($file.FullName -like "*\$dir\*") {
            return $true
        }
    }
    return $false
}

$totalLines = 0
$totalChars = 0

# Iterate through each file extension and get files
foreach ($ext in $fileExtensions) {
    $files = Get-ChildItem -Path $Path -Recurse -Filter $ext -File

    foreach ($file in $files) {
        if (-not (IsInExcludedDirectory $file)) {
            $content = Get-Content $file.FullName
            $totalLines += $content.Length
            $totalChars += ($content | Measure-Object -Character).Characters
        }
    }
}

Write-Output "Total lines: $totalLines"
Write-Output "Total characters: $totalChars"
