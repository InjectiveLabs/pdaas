#!/bin/bash

# 🚀 PDAAS One-Click Setup Script
# This script will install Node.js, Yarn, dependencies, and get you ready to dev!

set -e  # Exit on any error

echo "🌟 Welcome to PDAAS Setup!"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓${NC} $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

print_info() {
    echo -e "${YELLOW}→${NC} $1"
}

# Check if Node.js 20 is installed
print_info "Checking Node.js version..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -ge 20 ] && [ "$NODE_VERSION" -lt 23 ]; then
        print_success "Node.js $(node -v) is installed and compatible!"
    else
        print_error "Node.js version $(node -v) found, but we need v20.x"
        print_info "Installing Node.js 20..."
        
        # Try to install via nvm if available
        if command -v nvm &> /dev/null; then
            nvm install 20
            nvm use 20
            print_success "Node.js 20 installed via nvm!"
        else
            print_error "Please install Node.js 20 manually from https://nodejs.org/"
            print_info "Or install nvm first: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
            exit 1
        fi
    fi
else
    print_error "Node.js is not installed"
    
    # Try to install via nvm if available
    if [ -f "$HOME/.nvm/nvm.sh" ]; then
        print_info "Found nvm, installing Node.js 20..."
        source "$HOME/.nvm/nvm.sh"
        nvm install 20
        nvm use 20
        print_success "Node.js 20 installed via nvm!"
    else
        print_error "Please install Node.js 20 first!"
        print_info "Easiest way: Install nvm and run this script again"
        print_info "curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
        print_info "Then restart your terminal and run this script again"
        exit 1
    fi
fi

# Check if Yarn is installed
print_info "Checking Yarn installation..."
if command -v yarn &> /dev/null; then
    YARN_VERSION=$(yarn --version | cut -d'.' -f1)
    if [ "$YARN_VERSION" -eq 1 ]; then
        print_success "Yarn Classic $(yarn --version) is installed!"
    else
        print_info "Found Yarn $YARN_VERSION but we need Yarn Classic (v1)"
        print_info "Installing Yarn Classic via Corepack..."
        corepack enable
        corepack prepare yarn@1.22.22 --activate
        print_success "Yarn Classic installed!"
    fi
else
    print_info "Installing Yarn Classic..."
    if command -v corepack &> /dev/null; then
        corepack enable
        corepack prepare yarn@1.22.22 --activate
        print_success "Yarn Classic installed via Corepack!"
    else
        print_info "Corepack not available, using npm..."
        npm install -g yarn@1.22.22
        print_success "Yarn Classic installed via npm!"
    fi
fi

# Create .env file if it doesn't exist
print_info "Setting up environment variables..."
if [ ! -f .env ]; then
    cp .env.example .env
    print_success "Created .env file from .env.example"
    print_info "You can customize .env later if needed"
else
    print_success ".env file already exists"
fi

# Install dependencies
print_info "Installing project dependencies (this may take a few minutes)..."
yarn install

print_success "Dependencies installed!"

echo ""
echo "================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "================================"
echo ""
echo "You're all set! To start developing:"
echo ""
echo -e "  ${YELLOW}yarn dev${NC}"
echo ""
echo "The app will be available at:"
echo -e "  ${YELLOW}http://127.0.0.1:3000${NC}"
echo ""
echo "Happy coding! 🚀"
echo ""

