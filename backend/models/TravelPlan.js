import mongoose from 'mongoose';

const travelPlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  cost: {
    amount: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'INR'
    }
  },
  itinerary: [{
    day: String,
    activities: [String]
  }],
  inclusions: [String],
  exclusions: [String],
  highlights: [String],
  images: [String],
  travelAgentId: {
    type: String,
    required: true
  },
  travelAgentName: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxTravelers: {
    type: Number,
    default: 20
  },
  currentBookings: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  views: {
    type: Number,
    default: 0
  },
  tags: [String],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("TravelPlan", travelPlanSchema, "travel_plans"); 