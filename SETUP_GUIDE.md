# 🚀 Quick Setup Guide

## First Time Setup

1. **Clone and navigate to project:**
   ```bash
   git clone <your-repo-url>
   cd ghumingo-flash-trips-45-1
   ```

2. **Install all dependencies:**
   ```bash
   npm run install:all
   ```

3. **Start both services:**
   ```bash
   npm run start:all
   ```

## Daily Development

### Option 1: One Command Start
```bash
npm run start:all
```

### Option 2: Manual Start
```bash
# Terminal 1 - Backend
npm run start:backend

# Terminal 2 - Frontend  
npm run start:frontend
```

### Option 3: Using Scripts
```bash
# Start both
./start.sh

# Stop both
./stop.sh
```

## Access Points
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:6080
- **Health Check**: http://localhost:6080/api/health

## Troubleshooting

### Port Already in Use
```bash
# Stop all services
npm run stop:all

# Or manually
lsof -i :6080 -i :8080
kill -9 <PID>
```

### Dependencies Issues
```bash
# Reinstall all dependencies
npm run install:all
```

### Backend Not Starting
```bash
cd Backend
npm install
npm start
```

### Frontend Not Starting
```bash
npm install
npm run dev
```

## Logs
- **Backend logs**: `tail -f backend.log`
- **Frontend logs**: `tail -f frontend.log`

## Environment Variables
Backend `.env` file should contain:
```env
PORT=6080
MONGODB_URI=mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
``` 