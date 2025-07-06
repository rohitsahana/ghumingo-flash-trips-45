require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const TravelPlan = require('./models/TravelPlan');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected!'))
  .catch(err => console.error('MongoDB connection error:', err));

// Get all travel plans
app.get('/api/travel-plans', async (req, res) => {
  const plans = await TravelPlan.find();
  res.json(plans);
});

// Add a new travel plan
app.post('/api/travel-plans', async (req, res) => {
  const plan = new TravelPlan(req.body);
  await plan.save();
  res.status(201).json(plan);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 