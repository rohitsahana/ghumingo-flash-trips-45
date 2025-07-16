import mongoose from 'mongoose';

const travelPostSchema = new mongoose.Schema({
  author: {
    name: String,
    avatar: String,
    verified: Boolean,
    location: String
  },
  content: String,
  image: String,
  destination: String,
  travelDate: String,
  likes: Number,
  comments: Number,
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('TravelPost', travelPostSchema, 'travelposts');
