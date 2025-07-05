import express from 'express';
const router = express.Router();
import Story from "../models/Story.js" // Adjust the path as necessary

router.get('/', async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
    // console.log("Fetching stories from the database",stories);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stories' });
    //  console.log("Error fetching stories from the database:", err);
  }
});

export default router;  