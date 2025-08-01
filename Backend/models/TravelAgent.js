import mongoose from 'mongoose';

const travelAgentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  agencyName: {
    type: String,
    required: true
  },
  contactPerson: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  experience: {
    type: Number,
    default: 0
  },
  specializations: [{
    type: String
  }],
  description: {
    type: String
  },
  website: {
    type: String
  },
  license: {
    type: String
  },
  aadharCardImage: {
    type: String, // URL to stored image
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  verificationDate: {
    type: Date
  },
  approvedDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  rating: {
    type: Number,
    default: 0
  },
  totalBookings: {
    type: Number,
    default: 0
  },
  totalRevenue: {
    type: Number,
    default: 0
  },
  memberSince: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("TravelAgent", travelAgentSchema, "travel_agents"); 