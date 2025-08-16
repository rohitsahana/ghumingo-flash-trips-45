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

// Join a trip room
router.post("/:id/join", async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, action } = req.body;
    
    const room = await TripRoom.findOne({ id: id });
    if (!room) {
      return res.status(404).json({ error: 'Trip room not found' });
    }
    
    if (action === 'join' && room.spotsLeft > 0) {
      room.spotsLeft = room.spotsLeft - 1;
      await room.save();
      res.json({ success: true, spotsLeft: room.spotsLeft });
    } else {
      res.status(400).json({ error: 'No spots left or invalid action' });
    }
  } catch (err) {
    console.error('Failed to join room:', err);
    res.status(500).json({ error: err.message });
  }
});

export default router;
