#!/bin/bash

# Ghumingo Flash Trips - Startup Script
# This script starts both frontend and backend servers with proper error handling

echo "🚀 Starting Ghumingo Flash Trips..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

# Function to check if port is available
check_port() {
    local port=$1
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "❌ Port $port is already in use. Please stop the service using port $port first."
        return 1
    fi
    return 0
}

# Check if ports are available
echo "🔍 Checking port availability..."
if ! check_port 8080; then
    exit 1
fi

if ! check_port 6080; then
    exit 1
fi

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd "$(dirname "$0")"
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install frontend dependencies"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd Backend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install backend dependencies"
    exit 1
fi

cd ..

# Create environment files if they don't exist
echo "🔧 Setting up environment files..."

# Frontend .env
if [ ! -f .env ]; then
    cat > .env << EOF
VITE_API_URL=http://localhost:6080
VITE_SUPABASE_URL=https://wmgsraawxxmsvzrtpjds.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtZ3NyYWF3eHhtc3Z6cnRwamRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MTA4NjUsImV4cCI6MjA2NzE4Njg2NX0.YKtnJcaxzJ24TL09s7oepByxlG_r78xWF6DItoVrd5U
EOF
    echo "✅ Created frontend .env file"
fi

# Backend .env
if [ ! -f Backend/.env ]; then
    cat > Backend/.env << EOF
PORT=6080
MONGODB_URI=mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
EOF
    echo "✅ Created backend .env file"
fi

# Function to start backend server
start_backend() {
    echo "🔧 Starting backend server..."
    cd Backend
    npm start &
    BACKEND_PID=$!
    cd ..
    
    # Wait a moment for backend to start
    sleep 3
    
    # Check if backend is running
    if curl -s http://localhost:6080/api/health > /dev/null; then
        echo "✅ Backend server is running on http://localhost:6080"
        return 0
    else
        echo "❌ Backend server failed to start"
        return 1
    fi
}

# Function to start frontend server
start_frontend() {
    echo "🔧 Starting frontend server..."
    npm run dev &
    FRONTEND_PID=$!
    
    # Wait a moment for frontend to start
    sleep 5
    
    # Check if frontend is running
    if curl -s http://localhost:8080 > /dev/null; then
        echo "✅ Frontend server is running on http://localhost:8080"
        return 0
    else
        echo "❌ Frontend server failed to start"
        return 1
    fi
}

# Start backend first
if start_backend; then
    # Start frontend
    if start_frontend; then
        echo ""
        echo "🎉 Ghumingo Flash Trips is now running!"
        echo ""
        echo "📱 Frontend: http://localhost:8080"
        echo "🔧 Backend:  http://localhost:6080"
        echo "🏥 Health:   http://localhost:6080/api/health"
        echo ""
        echo "Press Ctrl+C to stop both servers"
        echo ""
        
        # Wait for user to stop
        wait
    else
        echo "❌ Failed to start frontend server"
        kill $BACKEND_PID 2>/dev/null
        exit 1
    fi
else
    echo "❌ Failed to start backend server"
    exit 1
fi 