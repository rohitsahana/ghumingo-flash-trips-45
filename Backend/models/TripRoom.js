// models/TripRoom.js
import mongoose from 'mongoose';

const tripRoomSchema = new mongoose.Schema({
  id: String,
  destination: String,
  dates: String,
  budget: String,
  spotsLeft: Number,
  totalSpots: Number,
  organizer: {
    name: String,
    avatar: String,
    rating: Number,
    verified: Boolean,
    completedTrips: Number,
  },
  vibe: [String],
  expiresIn: Number,
  price: Number,
  itinerary: [String],
  safetyFeatures: [String],
});

export default mongoose.model("TripRoom", tripRoomSchema, "triprooms");
