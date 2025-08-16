// routes/profile.js
import express from 'express';
import User from '../models/User.js';
import TravelPost from '../models/TravelPost.js';
import TripRoom from '../models/TripRoom.js';
import TravelPlan from '../models/TravelPlan.js';

const router = express.Router();

// Get user profile by userId (email)
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Find user by email (userId)
    let user = await User.findOne({ email: userId });
    
    if (!user) {
      // Create user profile with dummy data for new users
      try {
        user = await createUserProfile(userId);
      } catch (createError) {
        console.error('Error creating user profile:', createError);
        return res.status(500).json({ error: 'Failed to create user profile' });
      }
    } else {
      // User exists, update their profile with comprehensive data
      try {
        user = await updateUserProfile(user);
      } catch (updateError) {
        console.error('Error updating user profile:', updateError);
        // Continue with existing profile if update fails
      }
    }
    
    // Update user stats
    try {
      await user.updateStats();
      await user.save();
    } catch (statsError) {
      console.error('Error updating user stats:', statsError);
      // Continue without updating stats
    }
    
    res.json(user);
  } catch (err) {
    console.error('Failed to fetch profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Get default profile (for backward compatibility)
router.get('/', async (req, res) => {
  try {
    // Return a default profile or first user
    const user = await User.findOne();
    if (user) {
      res.json(user);
    } else {
      res.json({
        name: "Adventure Seeker",
        location: "Mumbai, India",
        memberSince: "2023",
        rating: 4.8,
        completedTrips: 12,
        followers: 234,
        verified: true,
        bio: "Passionate traveler who loves exploring new destinations and meeting fellow adventurers.",
        travelStyle: ["Adventure", "Culture", "Photography"],
        languages: ["English", "Hindi", "Marathi"],
        interests: ["Trekking", "Beach Activities", "Local Cuisine"],
        pastTrips: [
          { destination: "Ladakh", date: "2024", rating: 5, duration: "7 days", review: "Amazing experience!" },
          { destination: "Goa", date: "2023", rating: 4.8, duration: "5 days", review: "Great beaches and culture!" }
        ],
        reviews: [
          { reviewer: "Travel Buddy", trip: "Ladakh Trip", date: "2024", rating: 5, comment: "Great travel companion!" },
          { reviewer: "Adventure Partner", trip: "Goa Trip", date: "2023", rating: 4.8, comment: "Very organized and fun to travel with." }
        ],
        safetyBadges: ["Verified", "Trusted", "Responsive"],
        upcomingTrips: [
          { destination: "Rajasthan", date: "2025", lookingFor: "Looking for travel buddies" }
        ]
      });
    }
  } catch (err) {
    console.error('Failed to fetch default profile:', err);
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Delete user profile
router.delete('/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOneAndDelete({ email: userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json({ success: true, message: 'User profile deleted successfully' });
  } catch (err) {
    console.error('Failed to delete profile:', err);
    res.status(500).json({ error: 'Failed to delete profile' });
  }
});

// Create user profile with real or dummy data
async function createUserProfile(userId) {
  // Check if this is the real user (rohit.sahana2@gmail.com)
  if (userId === 'rohit.sahana2@gmail.com') {
    return await createRealUserProfile(userId);
  } else {
    return await createDummyUserProfile(userId);
  }
}

// Create real user profile with actual data
async function createRealUserProfile(userId) {
  try {
    // Get user's actual travel posts
    const travelPosts = await TravelPost.find({ 'author.name': userId }).catch(() => []);
    
    // Get user's actual trip rooms
    const tripRooms = await TripRoom.find({ 'organizer.userId': userId }).catch(() => []);
    
    // Get user's actual travel plans (if they're a travel agent)
    const travelPlans = await TravelPlan.find({ travelAgentId: userId }).catch(() => []);
    
    // Calculate real statistics
    const totalPosts = travelPosts.length;
    const totalTripRooms = tripRooms.length;
    const totalTravelPlans = travelPlans.length;
    const totalTrips = totalPosts + totalTripRooms + totalTravelPlans;
    
    // Create past trips from actual data
    const pastTrips = travelPosts.map(post => ({
      destination: post.destination || 'Unknown',
      date: post.travelDate || '2024',
      duration: 'Not specified',
      rating: 5,
      review: post.content || 'Great trip!',
      tripType: 'travel_post',
      tripId: post._id.toString()
    }));
    
    // Add trip rooms to past trips
    tripRooms.forEach(room => {
      pastTrips.push({
        destination: room.destination,
        date: room.dates || '2024',
        duration: 'Not specified',
        rating: 4.8,
        review: 'Organized a great trip!',
        tripType: 'trip_room',
        tripId: room._id.toString()
      });
    });
    
    // Add travel plans to past trips
    travelPlans.forEach(plan => {
      pastTrips.push({
        destination: plan.destination,
        date: '2024',
        duration: plan.duration,
        rating: 4.9,
        review: 'Created an amazing travel package!',
        tripType: 'travel_plan',
        tripId: plan._id.toString()
      });
    });
    
    // Create user profile
    const user = new User({
      email: userId,
      name: 'Rohit Sahana',
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
      location: 'Mumbai, India',
      bio: 'Passionate traveler and adventure seeker. Love exploring new places and meeting fellow travelers. Always up for new adventures!',
      isVerified: true,
      rating: 4.8,
      totalReviews: 15,
      completedTrips: totalTrips,
      followers: 156,
      following: 89,
      travelStyle: ['Adventure', 'Culture', 'Photography', 'Solo Travel'],
      languages: ['English', 'Hindi', 'Marathi'],
      interests: ['Trekking', 'Beach Activities', 'Local Cuisine', 'Photography', 'Mountain Climbing'],
      pastTrips: pastTrips,
      upcomingTrips: [
        {
          destination: 'Rajasthan',
          date: '2025',
          lookingFor: 'Looking for travel buddies for a cultural exploration',
          tripType: 'travel_post',
          tripId: 'upcoming-1'
        }
      ],
      reviews: [
        {
          reviewerId: 'adventure-seeker',
          reviewerName: 'Adventure Seeker',
          tripId: 'trip-1',
          tripType: 'travel_post',
          date: new Date('2024-12-01'),
          rating: 5,
          comment: 'Amazing travel companion! Very organized and fun to travel with. Highly recommend!'
        },
        {
          reviewerId: 'culture-explorer',
          reviewerName: 'Culture Explorer',
          tripId: 'trip-2',
          tripType: 'trip_room',
          date: new Date('2024-11-15'),
          rating: 4.8,
          comment: 'Great trip organizer! Everything was well planned and executed perfectly.'
        },
        {
          reviewerId: 'river-explorer',
          reviewerName: 'River Explorer',
          tripId: 'trip-3',
          tripType: 'travel_post',
          date: new Date('2024-10-20'),
          rating: 5,
          comment: 'Excellent travel buddy! Very knowledgeable about local culture and customs.'
        }
      ],
      safetyBadges: ['Verified', 'Trusted', 'Responsive', 'Experienced'],
      memberSince: new Date('2023-01-15'),
      lastActive: new Date()
    });
    
    await user.save();
    return user;
  } catch (error) {
    console.error('Error creating real user profile:', error);
    // Fallback to basic profile if there's an error
    const fallbackUser = new User({
      email: userId,
      name: 'Rohit Sahana',
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',
      location: 'Mumbai, India',
      bio: 'Passionate traveler and adventure seeker.',
      isVerified: true,
      rating: 4.8,
      totalReviews: 15,
      completedTrips: 5,
      followers: 156,
      following: 89,
      travelStyle: ['Adventure', 'Culture', 'Photography'],
      languages: ['English', 'Hindi', 'Marathi'],
      interests: ['Trekking', 'Beach Activities', 'Local Cuisine'],
      pastTrips: [
        { destination: 'Ladakh', date: '2024', rating: 5, duration: '7 days', review: 'Amazing experience!', tripType: 'travel_post', tripId: 'ladakh-1' },
        { destination: 'Goa', date: '2023', rating: 4.8, duration: '5 days', review: 'Great beaches and culture!', tripType: 'travel_post', tripId: 'goa-1' }
      ],
      upcomingTrips: [
        { destination: 'Rajasthan', date: '2025', lookingFor: 'Looking for travel buddies', tripType: 'travel_post', tripId: 'rajasthan-1' }
      ],
      reviews: [
        { reviewerId: 'adventure-seeker', reviewerName: 'Adventure Seeker', tripId: 'trip-1', tripType: 'travel_post', date: new Date('2024-12-01'), rating: 5, comment: 'Great travel companion!' }
      ],
      safetyBadges: ['Verified', 'Trusted', 'Responsive'],
      memberSince: new Date('2023-01-15'),
      lastActive: new Date()
    });
    
    await fallbackUser.save();
    return fallbackUser;
  }
}

// Create dummy user profile
async function createDummyUserProfile(userId) {
  const dummyProfiles = {
    'adventure-seeker': {
      name: 'Adventure Seeker',
      avatar: 'https://ui-avatars.com/api/?name=Adventure+Seeker',
      location: 'Mumbai, India',
      bio: 'Passionate traveler and adventure seeker. Love exploring new places and meeting fellow travelers.',
      rating: 4.8,
      totalReviews: 12,
      completedTrips: 15,
      followers: 234,
      following: 67,
      travelStyle: ['Adventure', 'Culture', 'Nature'],
      languages: ['English', 'Hindi'],
      interests: ['Trekking', 'Photography', 'Local Cuisine'],
      pastTrips: [
        { destination: 'Ladakh', date: '2024', rating: 5, duration: '7 days', review: 'Amazing experience!', tripType: 'travel_post', tripId: 'ladakh-1' },
        { destination: 'Goa', date: '2023', rating: 4.8, duration: '5 days', review: 'Great beaches and culture!', tripType: 'travel_post', tripId: 'goa-1' },
        { destination: 'Kerala', date: '2023', rating: 4.9, duration: '6 days', review: 'Beautiful backwaters!', tripType: 'trip_room', tripId: 'kerala-1' }
      ],
      upcomingTrips: [
        { destination: 'Rajasthan', date: '2025', lookingFor: 'Looking for travel buddies', tripType: 'travel_post', tripId: 'rajasthan-1' }
      ],
      reviews: [
        { reviewerId: 'travel-buddy', reviewerName: 'Travel Buddy', tripId: 'ladakh-1', tripType: 'travel_post', date: new Date('2024-12-01'), rating: 5, comment: 'Great travel companion!' },
        { reviewerId: 'adventure-partner', reviewerName: 'Adventure Partner', tripId: 'goa-1', tripType: 'travel_post', date: new Date('2023-11-15'), rating: 4.8, comment: 'Very organized and fun to travel with.' }
      ],
      safetyBadges: ['Verified', 'Trusted', 'Responsive']
    },
    'culture-explorer': {
      name: 'Culture Explorer',
      avatar: 'https://ui-avatars.com/api/?name=Culture+Explorer',
      location: 'Delhi, India',
      bio: 'Cultural enthusiast who loves exploring heritage sites and local traditions.',
      rating: 4.7,
      totalReviews: 8,
      completedTrips: 10,
      followers: 156,
      following: 45,
      travelStyle: ['Culture', 'Heritage', 'Photography'],
      languages: ['English', 'Hindi', 'Punjabi'],
      interests: ['Historical Sites', 'Local Art', 'Traditional Food'],
      pastTrips: [
        { destination: 'Rajasthan', date: '2024', rating: 4.9, duration: '8 days', review: 'Incredible cultural experience!', tripType: 'travel_post', tripId: 'rajasthan-2' },
        { destination: 'Varanasi', date: '2023', rating: 4.6, duration: '4 days', review: 'Spiritual journey!', tripType: 'travel_post', tripId: 'varanasi-1' }
      ],
      upcomingTrips: [
        { destination: 'Kerala', date: '2025', lookingFor: 'Cultural exploration buddies', tripType: 'travel_post', tripId: 'kerala-2' }
      ],
      reviews: [
        { reviewerId: 'heritage-lover', reviewerName: 'Heritage Lover', tripId: 'rajasthan-2', tripType: 'travel_post', date: new Date('2024-11-20'), rating: 4.9, comment: 'Amazing cultural insights!' }
      ],
      safetyBadges: ['Verified', 'Trusted']
    },
    'river-explorer': {
      name: 'River Explorer',
      avatar: 'https://ui-avatars.com/api/?name=River+Explorer',
      location: 'Rishikesh, India',
      bio: 'Adventure sports enthusiast specializing in river activities and outdoor adventures.',
      rating: 4.9,
      totalReviews: 18,
      completedTrips: 22,
      followers: 312,
      following: 78,
      travelStyle: ['Adventure', 'Thrilling', 'Nature'],
      languages: ['English', 'Hindi', 'Garhwali'],
      interests: ['River Rafting', 'Rock Climbing', 'Camping'],
      pastTrips: [
        { destination: 'Rishikesh', date: '2024', rating: 5, duration: '5 days', review: 'Epic river adventure!', tripType: 'trip_room', tripId: 'rishikesh-1' },
        { destination: 'Manali', date: '2023', rating: 4.8, duration: '6 days', review: 'Amazing mountain experience!', tripType: 'travel_post', tripId: 'manali-1' }
      ],
      upcomingTrips: [
        { destination: 'Spiti Valley', date: '2025', lookingFor: 'Adventure buddies', tripType: 'travel_post', tripId: 'spiti-1' }
      ],
      reviews: [
        { reviewerId: 'adventure-seeker', reviewerName: 'Adventure Seeker', tripId: 'rishikesh-1', tripType: 'trip_room', date: new Date('2024-12-10'), rating: 5, comment: 'Best adventure guide ever!' }
      ],
      safetyBadges: ['Verified', 'Trusted', 'Experienced', 'Local Guide']
    }
  };
  
  const profileData = dummyProfiles[userId] || {
    name: userId.split('@')[0].replace(/[0-9]/g, ''),
    avatar: `https://ui-avatars.com/api/?name=${userId.split('@')[0]}`,
    location: 'India',
    bio: 'Passionate traveler exploring the world.',
    rating: 4.5,
    totalReviews: 5,
    completedTrips: 8,
    followers: 45,
    following: 23,
    travelStyle: ['Adventure', 'Culture'],
    languages: ['English', 'Hindi'],
    interests: ['Travel', 'Photography'],
    pastTrips: [
      { destination: 'Goa', date: '2024', rating: 4.5, duration: '5 days', review: 'Great trip!', tripType: 'travel_post', tripId: 'default-1' }
    ],
    upcomingTrips: [],
    reviews: [
      { reviewerId: 'traveler', reviewerName: 'Traveler', tripId: 'default-1', tripType: 'travel_post', date: new Date('2024-11-01'), rating: 4.5, comment: 'Good travel companion.' }
    ],
    safetyBadges: ['Verified']
  };
  
  const user = new User({
    email: userId,
    ...profileData,
    memberSince: new Date('2023-06-01'),
    lastActive: new Date()
  });
  
  await user.save();
  return user;
}

// Update existing user profile with comprehensive data
async function updateUserProfile(user) {
  // Check if this is the real user (rohit.sahana2@gmail.com)
  if (user.email === 'rohit.sahana2@gmail.com') {
    return await updateRealUserProfile(user);
  } else {
    return await updateDummyUserProfile(user);
  }
}

// Update real user profile with actual data
async function updateRealUserProfile(user) {
  try {
    // Get user's actual travel posts
    const travelPosts = await TravelPost.find({ 'author.name': user.email }).catch(() => []);
    
    // Get user's actual trip rooms
    const tripRooms = await TripRoom.find({ 'organizer.userId': user.email }).catch(() => []);
    
    // Get user's actual travel plans (if they're a travel agent)
    const travelPlans = await TravelPlan.find({ travelAgentId: user.email }).catch(() => []);
    
    // Calculate real statistics
    const totalPosts = travelPosts.length;
    const totalTripRooms = tripRooms.length;
    const totalTravelPlans = travelPlans.length;
    const totalTrips = totalPosts + totalTripRooms + totalTravelPlans;
    
    // Create past trips from actual data
    const pastTrips = travelPosts.map(post => ({
      destination: post.destination || 'Unknown',
      date: post.travelDate || '2024',
      duration: 'Not specified',
      rating: 5,
      review: post.content || 'Great trip!',
      tripType: 'travel_post',
      tripId: post._id.toString()
    }));
    
    // Add trip rooms to past trips
    tripRooms.forEach(room => {
      pastTrips.push({
        destination: room.destination,
        date: room.dates || '2024',
        duration: 'Not specified',
        rating: 4.8,
        review: 'Organized a great trip!',
        tripType: 'trip_room',
        tripId: room._id.toString()
      });
    });
    
    // Add travel plans to past trips
    travelPlans.forEach(plan => {
      pastTrips.push({
        destination: plan.destination,
        date: '2024',
        duration: plan.duration,
        rating: 4.9,
        review: 'Created an amazing travel package!',
        tripType: 'travel_plan',
        tripId: plan._id.toString()
      });
    });
    
    // Update user profile with comprehensive data
    user.name = 'Rohit Sahana';
    user.avatar = 'https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg';
    user.location = 'Mumbai, India';
    user.bio = 'Passionate traveler and adventure seeker. Love exploring new places and meeting fellow travelers. Always up for new adventures!';
    user.rating = 4.8;
    user.totalReviews = 15;
    user.completedTrips = totalTrips;
    user.followers = 156;
    user.following = 89;
    user.travelStyle = ['Adventure', 'Culture', 'Photography', 'Solo Travel'];
    user.languages = ['English', 'Hindi', 'Marathi'];
    user.interests = ['Trekking', 'Beach Activities', 'Local Cuisine', 'Photography', 'Mountain Climbing'];
    user.pastTrips = pastTrips;
    user.upcomingTrips = [
      {
        destination: 'Rajasthan',
        date: '2025',
        lookingFor: 'Looking for travel buddies for a cultural exploration',
        tripType: 'travel_post',
        tripId: 'upcoming-1'
      }
    ];
    user.reviews = [
      {
        reviewerId: 'adventure-seeker',
        reviewerName: 'Adventure Seeker',
        tripId: 'trip-1',
        tripType: 'travel_post',
        date: new Date('2024-12-01'),
        rating: 5,
        comment: 'Amazing travel companion! Very organized and fun to travel with. Highly recommend!'
      },
      {
        reviewerId: 'culture-explorer',
        reviewerName: 'Culture Explorer',
        tripId: 'trip-2',
        tripType: 'trip_room',
        date: new Date('2024-11-15'),
        rating: 4.8,
        comment: 'Great trip organizer! Everything was well planned and executed perfectly.'
      },
      {
        reviewerId: 'river-explorer',
        reviewerName: 'River Explorer',
        tripId: 'trip-3',
        tripType: 'travel_post',
        date: new Date('2024-10-20'),
        rating: 5,
        comment: 'Excellent travel buddy! Very knowledgeable about local culture and customs.'
      }
    ];
    user.safetyBadges = ['Verified', 'Trusted', 'Responsive', 'Experienced'];
    user.lastActive = new Date();
    
    await user.save();
    return user;
  } catch (error) {
    console.error('Error updating real user profile:', error);
    return user; // Return existing user if update fails
  }
}

// Update dummy user profile
async function updateDummyUserProfile(user) {
  const dummyProfiles = {
    'adventure-seeker': {
      name: 'Adventure Seeker',
      avatar: 'https://ui-avatars.com/api/?name=Adventure+Seeker',
      location: 'Mumbai, India',
      bio: 'Passionate traveler and adventure seeker. Love exploring new places and meeting fellow travelers.',
      rating: 4.8,
      totalReviews: 12,
      completedTrips: 15,
      followers: 234,
      following: 67,
      travelStyle: ['Adventure', 'Culture', 'Nature'],
      languages: ['English', 'Hindi'],
      interests: ['Trekking', 'Photography', 'Local Cuisine'],
      pastTrips: [
        { destination: 'Ladakh', date: '2024', rating: 5, duration: '7 days', review: 'Amazing experience!', tripType: 'travel_post', tripId: 'ladakh-1' },
        { destination: 'Goa', date: '2023', rating: 4.8, duration: '5 days', review: 'Great beaches and culture!', tripType: 'travel_post', tripId: 'goa-1' },
        { destination: 'Kerala', date: '2023', rating: 4.9, duration: '6 days', review: 'Beautiful backwaters!', tripType: 'trip_room', tripId: 'kerala-1' }
      ],
      upcomingTrips: [
        { destination: 'Rajasthan', date: '2025', lookingFor: 'Looking for travel buddies', tripType: 'travel_post', tripId: 'rajasthan-1' }
      ],
      reviews: [
        { reviewerId: 'travel-buddy', reviewerName: 'Travel Buddy', tripId: 'ladakh-1', tripType: 'travel_post', date: new Date('2024-12-01'), rating: 5, comment: 'Great travel companion!' },
        { reviewerId: 'adventure-partner', reviewerName: 'Adventure Partner', tripId: 'goa-1', tripType: 'travel_post', date: new Date('2023-11-15'), rating: 4.8, comment: 'Very organized and fun to travel with.' }
      ],
      safetyBadges: ['Verified', 'Trusted', 'Responsive']
    }
  };
  
  const profileData = dummyProfiles[user.email] || {
    name: user.email.split('@')[0].replace(/[0-9]/g, ''),
    avatar: `https://ui-avatars.com/api/?name=${user.email.split('@')[0]}`,
    location: 'India',
    bio: 'Passionate traveler exploring the world.',
    rating: 4.5,
    totalReviews: 5,
    completedTrips: 8,
    followers: 45,
    following: 23,
    travelStyle: ['Adventure', 'Culture'],
    languages: ['English', 'Hindi'],
    interests: ['Travel', 'Photography'],
    pastTrips: [
      { destination: 'Goa', date: '2024', rating: 4.5, duration: '5 days', review: 'Great trip!', tripType: 'travel_post', tripId: 'default-1' }
    ],
    upcomingTrips: [],
    reviews: [
      { reviewerId: 'traveler', reviewerName: 'Traveler', tripId: 'default-1', tripType: 'travel_post', date: new Date('2024-11-01'), rating: 4.5, comment: 'Good travel companion.' }
    ],
    safetyBadges: ['Verified']
  };
  
  // Update user with profile data
  Object.assign(user, profileData);
  user.lastActive = new Date();
  
  await user.save();
  return user;
}

export default router;
