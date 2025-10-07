#!/bin/bash

# Deploy script for MLNomadpy Portfolio
# This script builds the Vue.js application and copies necessary files to the root

set -e

echo "🚀 Starting deployment process..."

# Navigate to vue-app directory
cd vue-app

echo "📦 Installing dependencies..."
npm ci

echo "✨ Running linter..."
npm run lint

echo "🧪 Running tests..."
npm test

echo "🏗️  Building application..."
npm run build

# Go back to root
cd ..

echo "📋 Copying static files to dist..."
cp -f robots.txt dist/ || echo "⚠️  robots.txt not found"
cp -f sitemap.xml dist/ || echo "⚠️  sitemap.xml not found"
cp -f CNAME dist/ || echo "⚠️  CNAME not found"
cp -f favicon.ico dist/ || echo "⚠️  favicon.ico not found"

echo "✅ Deployment build complete!"
echo "📁 Built files are in the dist/ directory"
echo ""
echo "To deploy manually:"
echo "1. Copy contents of dist/ to your web server"
echo "2. Or use GitHub Pages by pushing dist/ contents to gh-pages branch"
