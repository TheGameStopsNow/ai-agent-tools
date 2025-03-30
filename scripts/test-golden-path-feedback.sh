#!/bin/bash

# Test script for Golden Path Feedback enhancements

echo "Testing Golden Path Feedback System..."

# Check if nodemailer is installed
if ! npm list | grep -q nodemailer; then
  echo "Installing nodemailer..."
  npm install nodemailer
fi

# Start the dev server in the background
echo "Starting development server..."
npm run dev &
SERVER_PID=$!

# Give the server time to start
sleep 5

# Test API endpoints
echo "Testing API endpoints..."

# Test trends API
echo "Testing trends API..."
curl -s http://localhost:3000/api/golden-path/trends?storyId=test-story-id&branchId=test-branch-id

# Test recommendations API
echo "Testing recommendations API..."
curl -s http://localhost:3000/api/golden-path/recommendations?storyId=test-story-id&branchId=test-branch-id

# Kill the server when done
echo "Shutting down server..."
kill $SERVER_PID

echo "Tests completed." 