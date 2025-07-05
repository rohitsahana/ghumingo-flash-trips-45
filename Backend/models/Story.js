// models/Story.js
import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  author: String,
  location: String,
  title: String,
  content: String,
  image: String,
  likes: Number,
  comments: Number,
  isLiked: Boolean,
  lookingFor: String,
  travelStyle: [String],
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Story", storySchema, "story"); // ← third param sets collection name explicitly
