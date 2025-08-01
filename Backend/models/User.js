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
  avatar: {
    type: String,
    default: null
  },
  location: {
    type: String,
    default: 'Unknown'
  },
  bio: {
    type: String,
    default: ''
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  aadharNumber: {
    type: String,
    required: function() { 
      // Only required if user is verified AND has gone through verification process
      return this.isVerified && this.aadharCardImage; 
    }
  },
  aadharCardImage: {
    type: String, // URL to stored image
    required: function() { 
      // Only required if user is verified AND has gone through verification process
      return this.isVerified && this.aadharNumber; 
    }
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
  // Profile statistics
  rating: {
    type: Number,
    default: 0
  },
  totalReviews: {
    type: Number,
    default: 0
  },
  completedTrips: {
    type: Number,
    default: 0
  },
  followers: {
    type: Number,
    default: 0
  },
  following: {
    type: Number,
    default: 0
  },
  // Profile preferences
  travelStyle: [{
    type: String
  }],
  languages: [{
    type: String
  }],
  interests: [{
    type: String
  }],
  // Trip history
  pastTrips: [{
    destination: String,
    date: String,
    duration: String,
    rating: Number,
    review: String,
    tripType: {
      type: String,
      enum: ['travel_post', 'trip_room', 'travel_plan'],
      default: 'travel_post'
    },
    tripId: String
  }],
  upcomingTrips: [{
    destination: String,
    date: String,
    lookingFor: String,
    tripType: {
      type: String,
      enum: ['travel_post', 'trip_room', 'travel_plan'],
      default: 'travel_post'
    },
    tripId: String
  }],
  // Reviews received from other users
  reviews: [{
    reviewerId: String,
    reviewerName: String,
    tripId: String,
    tripType: String,
    date: {
      type: Date,
      default: Date.now
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String
  }],
  // Safety and verification badges
  safetyBadges: [{
    type: String,
    enum: ['Verified', 'Trusted', 'Responsive', 'Experienced', 'Local Guide']
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

// Calculate average rating from reviews
userSchema.methods.calculateAverageRating = function() {
  if (this.reviews.length === 0) return 0;
  const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / this.reviews.length) * 10) / 10; // Round to 1 decimal
};

// Update user statistics
userSchema.methods.updateStats = function() {
  this.rating = this.calculateAverageRating();
  this.totalReviews = this.reviews.length;
  this.completedTrips = this.pastTrips.length;
  return this;
};

export default mongoose.model("User", userSchema, "users"); 