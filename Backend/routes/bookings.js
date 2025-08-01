import express from 'express';
import Booking from '../models/Booking.js';
import TravelPlan from '../models/TravelPlan.js';
import TravelAgent from '../models/TravelAgent.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    const {
      travelPlanId,
      travelAgentId,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      numberOfTravelers,
      totalAmount,
      travelDate,
      specialRequirements,
      paymentMethod
    } = req.body;

    // Verify travel plan exists and is active
    const travelPlan = await TravelPlan.findById(travelPlanId);
    if (!travelPlan || !travelPlan.isActive) {
      return res.status(404).json({ error: 'Travel plan not found or inactive' });
    }

    // Verify travel agent is approved
    const travelAgent = await TravelAgent.findOne({ email: travelAgentId });
    if (!travelAgent || !travelAgent.isApproved) {
      return res.status(403).json({ error: 'Travel agent not approved' });
    }

    // Check if travel plan has available spots
    if (travelPlan.currentBookings + numberOfTravelers > travelPlan.maxTravelers) {
      return res.status(400).json({ error: 'Not enough spots available for this travel plan' });
    }

    // Create booking
    const booking = new Booking({
      travelPlanId,
      travelAgentId,
      customerId,
      customerName,
      customerEmail,
      customerPhone,
      numberOfTravelers,
      totalAmount,
      travelDate,
      specialRequirements,
      paymentMethod
    });

    await booking.save();

    // Update travel plan booking count
    await TravelPlan.findByIdAndUpdate(travelPlanId, {
      $inc: { currentBookings: numberOfTravelers }
    });

    res.json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (err) {
    console.error('Failed to create booking:', err);
    res.status(500).json({ error: 'Failed to create booking' });
  }
});

// Get customer's bookings
router.get('/customer/:customerId', async (req, res) => {
  try {
    const { customerId } = req.params;
    const bookings = await Booking.find({ customerId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Failed to get customer bookings:', err);
    res.status(500).json({ error: 'Failed to get customer bookings' });
  }
});

// Get booking details
router.get('/:bookingId', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const booking = await Booking.findOne({ bookingId });
    
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Get travel plan details
    const travelPlan = await TravelPlan.findById(booking.travelPlanId);
    
    res.json({
      booking,
      travelPlan
    });
  } catch (err) {
    console.error('Failed to get booking details:', err);
    res.status(500).json({ error: 'Failed to get booking details' });
  }
});

// Update payment status
router.patch('/:bookingId/payment', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { paymentStatus, paymentDetails } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      { 
        paymentStatus, 
        paymentDetails,
        updatedAt: new Date() 
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // If payment is successful, update travel agent revenue
    if (paymentStatus === 'paid') {
      await TravelAgent.findOneAndUpdate(
        { email: booking.travelAgentId },
        { $inc: { totalRevenue: booking.totalAmount, totalBookings: 1 } }
      );
    }

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      booking
    });
  } catch (err) {
    console.error('Failed to update payment status:', err);
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Cancel booking
router.patch('/:bookingId/cancel', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { reason } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      { 
        bookingStatus: 'cancelled',
        updatedAt: new Date() 
      },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Update travel plan booking count
    await TravelPlan.findByIdAndUpdate(booking.travelPlanId, {
      $inc: { currentBookings: -booking.numberOfTravelers }
    });

    res.json({
      success: true,
      message: 'Booking cancelled successfully',
      booking
    });
  } catch (err) {
    console.error('Failed to cancel booking:', err);
    res.status(500).json({ error: 'Failed to cancel booking' });
  }
});

export default router; 