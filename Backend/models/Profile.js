// models/Profile.js
import mongoose from 'mongoose';
const profileSchema = new mongoose.Schema({
  userId: String,
  name: String,
  location: String,
  memberSince: String,
  rating: Number,
  completedTrips: Number,
  followers: Number,
  following: Number,
  verified: Boolean,
  bio: String,
  travelStyle: [String],
  languages: [String],
  interests: [String],
  pastTrips: [Object],
  reviews: [Object],
  safetyBadges: [String],
  upcomingTrips: [Object]
});

export default mongoose.model("Profile", profileSchema,"profile");
