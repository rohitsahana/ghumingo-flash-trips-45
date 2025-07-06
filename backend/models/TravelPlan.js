const mongoose = require('mongoose');

const travelPlanSchema = new mongoose.Schema({
  title: String,
  destination: String,
  duration: String,
  cost: Object,
  itinerary: Array,
  hotels: Array,
  contact: Object,
  groupSize: Object,
  startDate: String,
  endDate: String,
  image: String,
  tags: Array,
  description: String,
  highlights: Array,
  requirements: Array,
  included: Array,
  notIncluded: Array,
});

module.exports = mongoose.model('TravelPlan', travelPlanSchema); 