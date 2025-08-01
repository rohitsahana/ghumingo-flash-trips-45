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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 6080;

// Increase body parser limit for large image uploads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/")
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/stories', storiesRoutes);
app.use('/api/travelposts', travelPostsRoutes);
app.use('/api/triprooms', tripRoomsRoutes);
app.use('/api/user-trip-interests', userTripInterestRoutes);
app.use('/api/user-verification', userVerificationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 