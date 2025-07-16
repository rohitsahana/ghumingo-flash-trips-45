// routes/travelPosts.js
import express from 'express';
import TravelPosts from '../models/TravelPost.js'; // Adjust the path as necessary 
const router = express.Router();

router.get('/', async(req, res) => {
  try {
    const travelposts = await TravelPosts.find();
    res.json(travelposts);
    console.log("Fetching travel posts from the database", travelposts);
  } catch (err) {
    console.log("Error fetching travel posts from the database:", err);
    res.status(500).json({ error: 'Failed to fetch travel posts',err });
  }
});


router.post("/", async (req, res) => {
  try {
    const user = req.user || {
      name: "Guest User",
      avatar: "https://ui-avatars.com/api/?name=Guest",
    };
    console.log("Received post request with body:", req.user);
    const author = {
      name: user.name || "Guest User",
      avatar: user.avatar || "https://ui-avatars.com/api/?name=Guest",
      verified: true,
      location: req.body.location || "Unknown"
    };

    const newPost = new TravelPosts({
      ...req.body,
    //   author: author
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Failed to save post:", err.message);
    res.status(500).json({ error: err.message });
  }
});



export default router;
