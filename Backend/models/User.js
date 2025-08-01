import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  aadharNumber: {
    type: String,
    required: function() { return this.isVerified; }
  },
  aadharCardImage: {
    type: String, // URL to stored image
    required: function() { return this.isVerified; }
  },
  verificationRequestedBy: [{
    tripOwnerId: String,
    tripId: String,
    tripType: String,
    requestedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  verificationRequestedFor: [{
    userId: String,
    tripId: String,
    tripType: String,
    requestedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending'
    }
  }],
  memberSince: {
    type: Date,
    default: Date.now
  },
  lastActive: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("User", userSchema, "users"); 