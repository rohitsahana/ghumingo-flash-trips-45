#!/bin/bash

echo "🛑 Stopping Ghumingo Flash Trips..."
echo "==================================="

# Function to stop process by PID file
stop_process() {
    local pid_file=$1
    local service_name=$2
    
    if [ -f "$pid_file" ]; then
        local pid=$(cat "$pid_file")
        if ps -p $pid > /dev/null 2>&1; then
            echo "🛑 Stopping $service_name (PID: $pid)..."
            kill -9 $pid
            rm -f "$pid_file"
            echo "✅ $service_name stopped"
        else
            echo "⚠️  $service_name process not found, removing PID file"
            rm -f "$pid_file"
        fi
    else
        echo "⚠️  No PID file found for $service_name"
    fi
}

# Function to stop processes by port
stop_by_port() {
    local port=$1
    local service_name=$2
    
    if lsof -Pi :$port -sTCP:LISTEN -t >/dev/null ; then
        echo "🛑 Stopping $service_name on port $port..."
        lsof -ti :$port | xargs kill -9
        echo "✅ $service_name stopped"
    else
        echo "ℹ️  $service_name not running on port $port"
    fi
}

# Stop backend
stop_process "backend.pid" "Backend"
stop_by_port 6080 "Backend"

# Stop frontend
stop_process "frontend.pid" "Frontend"
stop_by_port 8080 "Frontend"

# Clean up log files
echo "🧹 Cleaning up log files..."
rm -f backend.log frontend.log

echo ""
echo "✅ All services stopped!"
echo "========================="
echo "To start again, run: ./start.sh"
echo "" 