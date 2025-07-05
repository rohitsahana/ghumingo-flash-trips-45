// routes/profile.js
import express from 'express';
const router = express.Router();
import ProfileModel from '../models/Profile.js'; // Adjust the path as necessary
router.get('/', async (req, res) => {
  const { userId } = req.params;

  try {
    // Replace with actual MongoDB fetch logic
    const profile = await ProfileModel.findOne();
    if (!profile) return res.status(404).json({ error: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
