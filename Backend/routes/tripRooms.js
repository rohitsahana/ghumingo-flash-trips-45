// routes/tripRooms.js
import express from 'express';
import TripRoom from '../models/TripRoom.js';

const router = express.Router();

// GET all trip rooms
router.get('/', async (req, res) => {
  try {
    const rooms = await TripRoom.find();
    console.log("Fetching trip rooms from the database", rooms);
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trip rooms' });
  }
});

// GET single trip room by id
router.get('/:id', async (req, res) => {
  try {
    const room = await TripRoom.findOne({ id: req.params.id });
    if (!room) return res.status(404).json({ error: 'Not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch trip room' });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRoom = new TripRoom(req.body);
    const savedRoom = await newRoom.save();
    res.status(201).json(savedRoom);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
