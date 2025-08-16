#!/bin/bash

echo "🚀 Starting Ghumingo Flash Trips..."
echo "=================================="

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use. Stopping existing process..."
        lsof -ti :$1 | xargs kill -9
        sleep 2
    fi
}

# Function to start backend
start_backend() {
    echo "🔧 Starting Backend Server..."
    cd Backend
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing backend dependencies..."
        npm install
    fi
    
    # Check if .env exists
    if [ ! -f ".env" ]; then
        echo "⚠️  .env file not found in Backend directory. Creating default..."
        cat > .env << EOF
PORT=6080
MONGODB_URI=mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
EOF
    fi
    
    # Check if port 6080 is available
    check_port 6080
    
    # Start backend in background
    nohup npm start > ../backend.log 2>&1 &
    BACKEND_PID=$!
    echo $BACKEND_PID > ../backend.pid
    
    cd ..
    echo "✅ Backend started with PID: $BACKEND_PID"
}

# Function to start frontend
start_frontend() {
    echo "🎨 Starting Frontend Server..."
    
    # Check if node_modules exists
    if [ ! -d "node_modules" ]; then
        echo "📦 Installing frontend dependencies..."
        npm install
    fi
    
    # Check if port 8080 is available
    check_port 8080
    
    # Start frontend in background
    nohup npm run dev > frontend.log 2>&1 &
    FRONTEND_PID=$!
    echo $FRONTEND_PID > frontend.pid
    
    echo "✅ Frontend started with PID: $FRONTEND_PID"
}

# Function to wait for services to be ready
wait_for_services() {
    echo "⏳ Waiting for services to be ready..."
    
    # Wait for backend
    echo "🔍 Checking backend health..."
    for i in {1..30}; do
        if curl -s /api/health > /dev/null; then
            echo "✅ Backend is ready!"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "❌ Backend failed to start within 30 seconds"
            exit 1
        fi
        sleep 1
    done
    
    # Wait for frontend
    echo "🔍 Checking frontend health..."
    for i in {1..30}; do
        if curl -s http://localhost:8080 > /dev/null; then
            echo "✅ Frontend is ready!"
            break
        fi
        if [ $i -eq 30 ]; then
            echo "❌ Frontend failed to start within 30 seconds"
            exit 1
        fi
        sleep 1
    done
}

# Function to show status
show_status() {
    echo ""
    echo "🎉 All services are running!"
    echo "============================"
    echo "🌐 Frontend: http://localhost:8080"
    echo "🔧 Backend:  "
    echo "📊 Health:   /api/health"
    echo ""
    echo "📝 Logs:"
    echo "  Backend:  tail -f backend.log"
    echo "  Frontend: tail -f frontend.log"
    echo ""
    echo "🛑 To stop all services: ./stop.sh"
    echo ""
}

# Main execution
main() {
    # Check if we're in the right directory
    if [ ! -d "Backend" ] || [ ! -f "package.json" ]; then
        echo "❌ Please run this script from the project root directory"
        exit 1
    fi
    
    # Start services
    start_backend
    sleep 3
    start_frontend
    sleep 3
    
    # Wait for services to be ready
    wait_for_services
    
    # Show status
    show_status
}

# Run main function
main 