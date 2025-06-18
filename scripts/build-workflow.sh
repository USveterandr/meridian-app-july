#!/bin/bash

echo "🚀 Meridian Build Workflow"
echo "=========================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Step 1: Pre-build check
print_status "Running pre-build check..."
if npm run pre-build; then
    print_success "Pre-build check passed"
else
    print_error "Pre-build check failed"
    exit 1
fi

# Step 2: Quick build
print_status "Starting quick build..."
if npm run quick-build; then
    print_success "Quick build completed"
else
    print_error "Quick build failed"
    exit 1
fi

# Step 3: Performance analysis
print_status "Running performance analysis..."
if npm run performance; then
    print_success "Performance analysis completed"
else
    print_warning "Performance analysis had issues (non-critical)"
fi

# Step 4: Final checks
print_status "Running final checks..."

if [ -d ".next" ]; then
    print_success "Build directory exists"
else
    print_error "Build directory missing"
    exit 1
fi

if [ -f ".next/build-manifest.json" ]; then
    print_success "Build manifest found"
else
    print_warning "Build manifest not found"
fi

print_success "🎉 Build workflow completed successfully!"
print_status "Your Meridian app is ready for deployment!"

echo ""
echo "📋 Next Steps:"
echo "  • Test the build locally: npm start"
echo "  • Deploy to AWS Amplify"
echo "  • Monitor performance metrics"
echo ""
