#!/bin/bash

echo "🔄 Preparing to merge v0 project with GitHub repository..."

# Step 1: Create a backup of current working directory
echo "📁 Creating backup of current state..."
cp -r . ../meridian-backup-$(date +%Y%m%d-%H%M%S) || echo "Backup creation skipped"

# Step 2: Initialize git if not already done
echo "🔧 Setting up git configuration..."
git init || echo "Git already initialized"

# Step 3: Add your GitHub repository as remote
echo "🌐 Adding GitHub remote..."
git remote add origin https://github.com/USveterandr/meridian-app-june.git || echo "Remote already exists"

# Step 4: Fetch latest from GitHub
echo "📥 Fetching latest from GitHub..."
git fetch origin || echo "Fetch completed"

# Step 5: Check current branch and create merge strategy
echo "🌿 Checking branch status..."
git branch -a

echo "✅ Merge preparation complete!"
echo "📋 Next steps:"
echo "1. Review the files that will be merged"
echo "2. Commit current v0 changes"
echo "3. Merge with GitHub repository"
echo "4. Push updates to trigger deployment"
