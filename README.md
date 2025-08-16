# Ghumingo Flash Trips - Travel Community Platform

A full-stack travel community platform built with React (Frontend) and Node.js/Express (Backend) with MongoDB database.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB Atlas account (or local MongoDB)

### Project Structure
```
ghumingo-flash-trips-45-1/
├── Backend/          # Node.js/Express API server
├── src/             # React frontend application
├── package.json     # Frontend dependencies
└── README.md        # This file
```

## 📋 Setup Instructions

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd ghumingo-flash-trips-45-1
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create .env file (if not exists)
# The .env file should contain:
PORT=6080
MONGODB_URI=mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080

# Start the backend server
npm start
```

### 3. Frontend Setup
```bash
# Navigate back to root directory
cd ..

# Install frontend dependencies
npm install

# Start the frontend development server
npm run dev
```

## 🔄 How to Start After Closing Cursor

### Option 1: Manual Start (Recommended for development)

#### Start Backend:
```bash
# Open terminal in project root
cd Backend
npm start
```

#### Start Frontend (in a new terminal):
```bash
# Open another terminal in project root
npm run dev
```

### Option 2: Using the Startup Script

I've created a startup script for convenience:

```bash
# Make the script executable (first time only)
chmod +x start.sh

# Run both backend and frontend
./start.sh
```

### Option 3: Using npm scripts (if added to root package.json)

```bash
# Start both services
npm run start:all
```

## 🌐 Access Points

- **Frontend**: http://localhost:8080
- **Backend API**: 
- **Health Check**: /api/health

## 📡 API Endpoints

### Available Routes:
- `GET /api/health` - Health check
- `GET /api/profile` - User profiles
- `GET /api/stories` - Travel stories
- `GET /api/travelposts` - Travel posts
- `GET /api/triprooms` - Trip rooms
- `GET /api/user-trip-interests` - User trip interests
- `GET /api/user-verification` - User verification
- `GET /api/travel-agents` - Travel agents
- `GET /api/bookings` - Bookings

## 🔧 Troubleshooting

### Backend Issues:
1. **Port already in use**: Kill the process using port 6080
   ```bash
   lsof -i :6080
   kill -9 <PID>
   ```

2. **MongoDB connection failed**: Check your `.env` file and MongoDB Atlas connection string

3. **Dependencies missing**: Run `npm install` in the Backend directory

### Frontend Issues:
1. **Port already in use**: The frontend will automatically use the next available port
2. **Dependencies missing**: Run `npm install` in the root directory

## 📝 Environment Variables

### Backend (.env in Backend directory):
```env
PORT=6080
MONGODB_URI=mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/
NODE_ENV=development
CORS_ORIGIN=http://localhost:8080
```

## 🛠️ Development

### Backend Development:
- Server runs on port 6080
- Auto-restart on file changes (if using nodemon)
- MongoDB connection with error handling
- CORS configured for frontend

### Frontend Development:
- Vite dev server on port 8080
- Hot module replacement
- TypeScript support
- Tailwind CSS for styling

## 📦 Dependencies

### Backend Dependencies:
- Express.js
- MongoDB/Mongoose
- CORS
- dotenv
- body-parser

### Frontend Dependencies:
- React
- TypeScript
- Vite
- Tailwind CSS
- Shadcn/ui components

## 🚀 Deployment

### Backend Deployment:
1. Set production environment variables
2. Use PM2 or similar process manager
3. Configure reverse proxy (nginx)

### Frontend Deployment:
1. Build the project: `npm run build`
2. Deploy to Vercel, Netlify, or similar

## 📞 Support

If you encounter any issues:
1. Check the console logs for both backend and frontend
2. Verify all environment variables are set correctly
3. Ensure MongoDB connection is working
4. Check if all dependencies are installed

---

**Happy Coding! 🎉**
