import mongoose from 'mongoose';

const userTripInterestSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  tripId: {
    type: String,
    required: true
  },
  tripType: {
    type: String,
    enum: ['travel_plan', 'trip_room', 'travel_post'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'waiting_for_approval'],
    default: 'pending'
  },
  appliedAt: {
    type: Date,
    default: Date.now
  },
  respondedAt: {
    type: Date
  },
  message: {
    type: String,
    default: ''
  },
  organizerId: {
    type: String,
    required: true
  }
});

// Compound index to ensure one user can only show interest once per trip
userTripInterestSchema.index({ userId: 1, tripId: 1 }, { unique: true });

export default mongoose.model("UserTripInterest", userTripInterestSchema, "user_trip_interests"); 