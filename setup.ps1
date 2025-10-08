# 🚀 PDAAS One-Click Setup Script (Windows PowerShell)
# This script will install Node.js, Yarn, dependencies, and get you ready to dev!

$ErrorActionPreference = "Stop"

Write-Host "🌟 Welcome to PDAAS Setup!" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""

# Function to print colored output
function Print-Success {
    param([string]$message)
    Write-Host "✓ $message" -ForegroundColor Green
}

function Print-Error {
    param([string]$message)
    Write-Host "✗ $message" -ForegroundColor Red
}

function Print-Info {
    param([string]$message)
    Write-Host "→ $message" -ForegroundColor Yellow
}

# Check if Node.js is installed
Print-Info "Checking Node.js version..."
try {
    $nodeVersion = (node --version).Substring(1).Split('.')[0]
    if ([int]$nodeVersion -ge 20 -and [int]$nodeVersion -lt 23) {
        Print-Success "Node.js $(node --version) is installed and compatible!"
    } else {
        Print-Error "Node.js version $(node --version) found, but we need v20.x"
        Print-Info "Please install Node.js 20 from https://nodejs.org/"
        exit 1
    }
} catch {
    Print-Error "Node.js is not installed"
    Print-Info "Please install Node.js 20 from https://nodejs.org/"
    Print-Info "Or use a version manager like nvm-windows or Volta"
    exit 1
}

# Check if Yarn is installed
Print-Info "Checking Yarn installation..."
try {
    $yarnVersion = (yarn --version).Split('.')[0]
    if ([int]$yarnVersion -eq 1) {
        Print-Success "Yarn Classic $(yarn --version) is installed!"
    } else {
        Print-Info "Found Yarn $yarnVersion but we need Yarn Classic (v1)"
        Print-Info "Installing Yarn Classic via Corepack..."
        corepack enable
        corepack prepare yarn@1.22.22 --activate
        Print-Success "Yarn Classic installed!"
    }
} catch {
    Print-Info "Installing Yarn Classic..."
    try {
        corepack enable
        corepack prepare yarn@1.22.22 --activate
        Print-Success "Yarn Classic installed via Corepack!"
    } catch {
        Print-Info "Corepack not available, using npm..."
        npm install -g yarn@1.22.22
        Print-Success "Yarn Classic installed via npm!"
    }
}

# Create .env file if it doesn't exist
Print-Info "Setting up environment variables..."
if (-not (Test-Path .env)) {
    Copy-Item .env.example .env
    Print-Success "Created .env file from .env.example"
    Print-Info "You can customize .env later if needed"
} else {
    Print-Success ".env file already exists"
}

# Install dependencies
Print-Info "Installing project dependencies (this may take a few minutes)..."
yarn install

Print-Success "Dependencies installed!"

Write-Host ""
Write-Host "================================" -ForegroundColor Cyan
Write-Host "🎉 Setup Complete!" -ForegroundColor Green
Write-Host "================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You're all set! To start developing:" -ForegroundColor White
Write-Host ""
Write-Host "  yarn dev" -ForegroundColor Yellow
Write-Host ""
Write-Host "The app will be available at:" -ForegroundColor White
Write-Host "  http://127.0.0.1:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Cyan
Write-Host ""

