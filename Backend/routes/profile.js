// routes/profile.js
import express from 'express';
const router = express.Router();
import ProfileModel from '../models/Profile.js'; // Adjust the path as necessary
router.get('/', async (req, res) => {
  try {
    // Get the first profile or create a mock one
    const profile = await ProfileModel.findOne();
    if (!profile) {
      // Return mock profile if none exists
      res.json({
        name: 'Adventure Seeker',
        location: 'Mumbai, India',
        memberSince: '2024',
        rating: 4.8,
        completedTrips: 12,
        followers: 234,
        verified: true,
        bio: 'Passionate traveler and adventure seeker. Love exploring new places and meeting fellow travelers.',
        travelStyle: ['Adventure', 'Culture', 'Nature'],
        languages: ['English', 'Hindi'],
        interests: ['Trekking', 'Photography', 'Local Cuisine'],
        pastTrips: [
          { destination: 'Ladakh', date: '2024', rating: 5 },
          { destination: 'Goa', date: '2023', rating: 4 }
        ]
      });
    } else {
      res.json(profile);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const profile = await ProfileModel.findOne({ userId });
    if (!profile) {
      // Return mock profile for specific user
      res.json({
        name: 'Adventure Seeker',
        location: 'Mumbai, India',
        memberSince: '2024',
        rating: 4.8,
        completedTrips: 12,
        followers: 234,
        verified: true,
        bio: 'Passionate traveler and adventure seeker. Love exploring new places and meeting fellow travelers.',
        travelStyle: ['Adventure', 'Culture', 'Nature'],
        languages: ['English', 'Hindi'],
        interests: ['Trekking', 'Photography', 'Local Cuisine'],
        pastTrips: [
          { destination: 'Ladakh', date: '2024', rating: 5 },
          { destination: 'Goa', date: '2023', rating: 4 }
        ]
      });
    } else {
      res.json(profile);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
