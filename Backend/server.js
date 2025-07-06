import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://Preet:dejavu@preetsingh.a0rfk.mongodb.net/")
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Mongo error:', err));

import storyRoutes from './routes/stories.js';
import profileRoutes from './routes/profile.js' // Adjust the path as necessary
app.use('/api/stories', storyRoutes);
app.use('/api/profile', profileRoutes);
const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));