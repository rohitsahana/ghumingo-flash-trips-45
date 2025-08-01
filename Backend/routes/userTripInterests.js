import express from 'express';
import UserTripInterest from '../models/UserTripInterest.js';
import TravelPlan from '../models/TravelPlan.js';
import TripRoom from '../models/TripRoom.js';
import TravelPost from '../models/TravelPost.js';

const router = express.Router();

// Get all interests for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const interests = await UserTripInterest.find({ userId }).sort({ appliedAt: -1 });
    
    // Populate trip details for each interest
    const interestsWithDetails = await Promise.all(
      interests.map(async (interest) => {
        let tripDetails = null;
        
        switch (interest.tripType) {
          case 'travel_plan':
            tripDetails = await TravelPlan.findById(interest.tripId);
            break;
          case 'trip_room':
            tripDetails = await TripRoom.findById(interest.tripId);
            break;
          case 'travel_post':
            tripDetails = await TravelPost.findById(interest.tripId);
            break;
        }
        
        return {
          ...interest.toObject(),
          tripDetails
        };
      })
    );
    
    res.json(interestsWithDetails);
  } catch (err) {
    console.error('Failed to fetch user interests:', err);
    res.status(500).json({ error: 'Failed to fetch user interests' });
  }
});

// Show interest in a trip
router.post('/', async (req, res) => {
  try {
    const { userId, tripId, tripType, organizerId, message } = req.body;
    
    const newInterest = new UserTripInterest({
      userId,
      tripId,
      tripType,
      organizerId,
      message: message || ''
    });
    
    const savedInterest = await newInterest.save();
    res.status(201).json(savedInterest);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).json({ error: 'You have already shown interest in this trip' });
    } else {
      console.error('Failed to save interest:', err);
      res.status(500).json({ error: 'Failed to save interest' });
    }
  }
});

// Update interest status (for organizers)
router.patch('/:interestId/status', async (req, res) => {
  try {
    const { interestId } = req.params;
    const { status } = req.body;
    
    const interest = await UserTripInterest.findById(interestId);
    if (!interest) {
      return res.status(404).json({ error: 'Interest not found' });
    }
    
    interest.status = status;
    interest.respondedAt = new Date();
    await interest.save();
    
    res.json(interest);
  } catch (err) {
    console.error('Failed to update interest status:', err);
    res.status(500).json({ error: 'Failed to update interest status' });
  }
});

// Get interests for a specific trip (for organizers)
router.get('/trip/:tripId', async (req, res) => {
  try {
    const { tripId } = req.params;
    const interests = await UserTripInterest.find({ tripId }).sort({ appliedAt: -1 });
    res.json(interests);
  } catch (err) {
    console.error('Failed to fetch trip interests:', err);
    res.status(500).json({ error: 'Failed to fetch trip interests' });
  }
});

export default router; 