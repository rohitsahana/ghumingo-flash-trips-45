import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import profileRoutes from './routes/profile.js';
import storiesRoutes from './routes/stories.js';
import travelPostsRoutes from './routes/travelPosts.js';
import tripRoomsRoutes from './routes/tripRooms.js';
import userTripInterestRoutes from './routes/userTripInterests.js';
import userVerificationRoutes from './routes/userVerification.js';
import travelAgentRoutes from './routes/travelAgents.js';
import bookingRoutes from './routes/bookings.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Increase body parser limit for large image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Configure CORS properly
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Connect to MongoDB with better error handling
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || "mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/";
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB successfully');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  }
};

// Initialize database connection
connectDB();

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/travelposts', travelPostsRoutes);
app.use('/api/triprooms', tripRoomsRoutes);
app.use('/api/user-trip-interests', userTripInterestRoutes);
app.use('/api/user-verification', userVerificationRoutes);
app.use('/api/travel-agents', travelAgentRoutes);
app.use('/api/bookings', bookingRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
}); 