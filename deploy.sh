#!/bin/bash

# Production Build and Deployment Script
# This script handles building and deploying the Meridian Real Estate app
# for web (Cloudflare Workers) and mobile (iOS/Android) platforms

set -e  # Exit on any error

# Colors for output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e \"${BLUE}[INFO]${NC} $1\"
}

print_success() {
    echo -e \"${GREEN}[SUCCESS]${NC} $1\"
}

print_warning() {
    echo -e \"${YELLOW}[WARNING]${NC} $1\"
}

print_error() {
    echo -e \"${RED}[ERROR]${NC} $1\"
}

# Configuration
APP_NAME=\"Meridian Real Estate\"
APP_ID=\"com.meridian.rd\"
VERSION=$(node -p \"require('./package.json').version\")
BUILD_DIR=\"out\"
ANDROID_DIR=\"android\"
IOS_DIR=\"ios\"

print_status \"Starting deployment process for $APP_NAME v$VERSION\"

# Check prerequisites
check_prerequisites() {
    print_status \"Checking prerequisites...\"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        print_error \"Node.js is not installed\"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error \"npm is not installed\"
        exit 1
    fi
    
    # Check Capacitor CLI
    if ! command -v cap &> /dev/null; then
        print_warning \"Capacitor CLI not found, installing...\"
        npm install -g @capacitor/cli
    fi
    
    print_success \"Prerequisites check completed\"
}

# Install dependencies
install_dependencies() {
    print_status \"Installing dependencies...\"
    npm ci --only=production
    print_success \"Dependencies installed\"
}

# Run security audit
security_audit() {
    print_status \"Running security audit...\"
    npm audit --audit-level high || {
        print_warning \"Security vulnerabilities found. Consider running 'npm audit fix'\"
    }
    print_success \"Security audit completed\"
}

# Run linting
run_linting() {
    print_status \"Running linting...\"
    npm run lint || {
        print_error \"Linting failed. Please fix the issues before deploying.\"
        exit 1
    }
    print_success \"Linting passed\"
}

# Build for web
build_web() {
    print_status \"Building for web deployment...\"
    
    # Clean previous build
    rm -rf .next $BUILD_DIR
    
    # Build the application
    NODE_ENV=production npm run build
    
    # Export static files
    npm run build:static
    
    print_success \"Web build completed\"
}

# Deploy to Cloudflare Workers
deploy_cloudflare() {
    print_status \"Deploying to Cloudflare Workers...\"
    
    if ! command -v wrangler &> /dev/null; then
        print_warning \"Wrangler CLI not found, installing...\"
        npm install -g wrangler
    fi
    
    # Deploy to Cloudflare Pages
    wrangler pages deploy $BUILD_DIR --project-name meridian-real-estate
    
    print_success \"Deployed to Cloudflare Workers\"
}

# Build for mobile
build_mobile() {
    print_status \"Building for mobile deployment...\"
    
    # Ensure web build exists
    if [ ! -d \"$BUILD_DIR\" ]; then
        print_error \"Web build not found. Run web build first.\"
        exit 1
    fi
    
    # Sync with Capacitor
    npx cap sync
    
    print_success \"Mobile build prepared\"
}

# Build iOS
build_ios() {
    if [ \"$OSTYPE\" != \"darwin\"* ]; then
        print_warning \"iOS build requires macOS. Skipping iOS build.\"
        return
    fi
    
    print_status \"Building iOS app...\"
    
    # Check if Xcode is installed
    if ! command -v xcodebuild &> /dev/null; then
        print_error \"Xcode is not installed. Please install Xcode to build iOS app.\"
        return
    fi
    
    # Open Xcode project for manual build
    print_status \"Opening Xcode project. Please build manually for App Store submission.\"
    npx cap open ios
    
    print_success \"iOS project opened in Xcode\"
}

# Build Android
build_android() {
    print_status \"Building Android app...\"
    
    # Check if Android Studio/Gradle is available
    if [ -d \"$ANDROID_DIR\" ]; then
        cd $ANDROID_DIR
        
        # Build debug APK for testing
        if command -v ./gradlew &> /dev/null; then
            ./gradlew assembleDebug
            print_success \"Android debug APK built successfully\"
        else
            print_warning \"Gradle wrapper not found. Opening Android Studio.\"
            cd ..
            npx cap open android
        fi
        
        cd ..
    else
        print_error \"Android directory not found. Run 'npx cap add android' first.\"
    fi
}

# Performance optimization
run_performance_optimization() {
    print_status \"Running performance optimization...\"
    
    if [ -f \"scripts/optimize-performance.js\" ]; then
        node scripts/optimize-performance.js
    else
        print_warning \"Performance optimization script not found\"
    fi
    
    print_success \"Performance optimization completed\"
}

# Generate build report
generate_build_report() {
    print_status \"Generating build report...\"
    
    BUILD_REPORT=\"build-report-$(date +%Y%m%d-%H%M%S).md\"
    
    cat > $BUILD_REPORT << EOF
# Build Report - $APP_NAME v$VERSION

**Build Date:** $(date)
**Build Environment:** $(uname -a)
**Node Version:** $(node --version)
**npm Version:** $(npm --version)

## Build Statistics

$(if [ -f \"build-stats.json\" ]; then cat build-stats.json; else echo \"Build statistics not available\"; fi)

## Web Build
- Build Directory: $BUILD_DIR
- Build Size: $(if [ -d \"$BUILD_DIR\" ]; then du -sh $BUILD_DIR | cut -f1; else echo \"N/A\"; fi)

## Mobile Build
- iOS: $(if [ -d \"$IOS_DIR\" ]; then echo \"✅ Ready\"; else echo \"❌ Not configured\"; fi)
- Android: $(if [ -d \"$ANDROID_DIR\" ]; then echo \"✅ Ready\"; else echo \"❌ Not configured\"; fi)

## Security
- Audit Status: $(npm audit --audit-level high > /dev/null 2>&1 && echo \"✅ Passed\" || echo \"⚠️ Issues found\")
- Linting Status: $(npm run lint > /dev/null 2>&1 && echo \"✅ Passed\" || echo \"❌ Failed\")

## Deployment
- Cloudflare Workers: $(if command -v wrangler &> /dev/null; then echo \"✅ Ready\"; else echo \"❌ Not configured\"; fi)
- iOS App Store: $(if [ \"$OSTYPE\" = \"darwin\"* ] && command -v xcodebuild &> /dev/null; then echo \"✅ Ready\"; else echo \"❌ Not available\"; fi)
- Google Play Store: $(if [ -d \"$ANDROID_DIR\" ]; then echo \"✅ Ready\"; else echo \"❌ Not configured\"; fi)

EOF
    
    print_success \"Build report generated: $BUILD_REPORT\"
}

# Main deployment function
main() {
    local DEPLOY_TARGET=${1:-\"all\"}
    
    case $DEPLOY_TARGET in
        \"web\")
            print_status \"Deploying web only...\"
            check_prerequisites
            install_dependencies
            security_audit
            run_linting
            build_web
            run_performance_optimization
            deploy_cloudflare
            ;;
        \"mobile\")
            print_status \"Building mobile apps only...\"
            check_prerequisites
            install_dependencies
            security_audit
            run_linting
            build_web
            build_mobile
            build_ios
            build_android
            ;;
        \"ios\")
            print_status \"Building iOS app only...\"
            check_prerequisites
            install_dependencies
            build_web
            build_mobile
            build_ios
            ;;
        \"android\")
            print_status \"Building Android app only...\"
            check_prerequisites
            install_dependencies
            build_web
            build_mobile
            build_android
            ;;
        \"all\")
            print_status \"Full deployment process...\"
            check_prerequisites
            install_dependencies
            security_audit
            run_linting
            build_web
            run_performance_optimization
            deploy_cloudflare
            build_mobile
            build_ios
            build_android
            ;;
        *)
            print_error \"Invalid deployment target: $DEPLOY_TARGET\"
            echo \"Usage: $0 [web|mobile|ios|android|all]\"
            exit 1
            ;;
    esac
    
    generate_build_report
    print_success \"Deployment process completed successfully! 🚀\"
}

# Run main function with provided arguments
main \"$@\""