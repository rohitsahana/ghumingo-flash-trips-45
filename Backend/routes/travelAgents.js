import express from 'express';
import TravelAgent from '../models/TravelAgent.js';
import TravelPlan from '../models/TravelPlan.js';
import Booking from '../models/Booking.js';

const router = express.Router();

// Validate Aadhar number format and checksum
function validateAadharNumber(aadharNumber) {
  // Remove spaces and check if it's exactly 12 digits
  const cleanAadhar = aadharNumber.replace(/\s/g, '');
  if (!/^\d{12}$/.test(cleanAadhar)) {
    return { isValid: false, error: 'Aadhar number must be exactly 12 digits' };
  }

  // Basic checksum validation (Verhoeff algorithm simplified)
  const digits = cleanAadhar.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    sum += digits[i] * (12 - i);
  }
  const checksum = (10 - (sum % 10)) % 10;
  
  if (digits[11] !== checksum) {
    return { isValid: false, error: 'Invalid Aadhar number checksum' };
  }

  return { isValid: true, cleanAadhar };
}

// Simulate OCR and UIDAI verification
function simulateVerification(aadharNumber, aadharCardImage) {
  // In a real implementation, this would:
  // 1. Use OCR to extract Aadhar number from image
  // 2. Call UIDAI API to verify the number
  // 3. Compare extracted number with provided number
  
  // For demo purposes, we'll simulate successful verification
  // if the image is present and number format is valid
  if (!aadharCardImage || !aadharCardImage.startsWith('data:image/')) {
    return { verified: false, error: 'Invalid Aadhar card image' };
  }

  // Simulate OCR extraction (in real implementation, this would extract from image)
  const extractedNumber = aadharNumber.replace(/\s/g, ''); // Simulate OCR result
  
  // Compare extracted number with provided number
  if (extractedNumber === aadharNumber.replace(/\s/g, '')) {
    return { verified: true, message: 'Aadhar verification successful' };
  } else {
    return { verified: false, error: 'Aadhar number does not match the uploaded image' };
  }
}

// Register as travel agent with Aadhar verification
router.post('/register', async (req, res) => {
  try {
    const {
      email,
      agencyName,
      contactPerson,
      phone,
      address,
      experience,
      specializations,
      description,
      website,
      license,
      aadharCardImage,
      aadharNumber
    } = req.body;

    // Check if already registered
    const existingAgent = await TravelAgent.findOne({ email });
    if (existingAgent) {
      return res.status(400).json({ error: 'Travel agent already registered with this email' });
    }

    // Validate Aadhar number
    const aadharValidation = validateAadharNumber(aadharNumber);
    if (!aadharValidation.isValid) {
      return res.status(400).json({ error: aadharValidation.error });
    }

    // Verify Aadhar card image
    if (!aadharCardImage || !aadharCardImage.startsWith('data:image/')) {
      return res.status(400).json({ error: 'Please upload a valid Aadhar card image' });
    }

    // Simulate verification process
    const verification = simulateVerification(aadharNumber, aadharCardImage);
    
    if (!verification.verified) {
      return res.status(400).json({ error: verification.error });
    }

    // Create new travel agent with automatic approval
    const travelAgent = new TravelAgent({
      email,
      agencyName,
      contactPerson,
      phone,
      address,
      experience: experience || 0,
      specializations: specializations ? specializations.split(',').map(s => s.trim()) : [],
      description,
      website,
      license,
      aadharCardImage,
      aadharNumber: aadharValidation.cleanAadhar,
      isVerified: true,
      isApproved: true,
      status: 'approved',
      verificationDate: new Date(),
      approvedDate: new Date()
    });

    await travelAgent.save();

    res.json({
      success: true,
      message: 'Travel agent registration successful! Your account has been verified and approved.',
      travelAgent: {
        id: travelAgent._id,
        email: travelAgent.email,
        agencyName: travelAgent.agencyName,
        status: travelAgent.status,
        isVerified: travelAgent.isVerified,
        isApproved: travelAgent.isApproved
      }
    });
  } catch (err) {
    console.error('Failed to register travel agent:', err);
    res.status(500).json({ error: 'Failed to register travel agent' });
  }
});

// Get travel agent status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const travelAgent = await TravelAgent.findOne({ email });
    
    if (!travelAgent) {
      return res.status(404).json({ error: 'Travel agent not found' });
    }

    res.json({
      email: travelAgent.email,
      agencyName: travelAgent.agencyName,
      status: travelAgent.status,
      isVerified: travelAgent.isVerified,
      isApproved: travelAgent.isApproved,
      memberSince: travelAgent.memberSince
    });
  } catch (err) {
    console.error('Failed to get travel agent status:', err);
    res.status(500).json({ error: 'Failed to get travel agent status' });
  }
});

// Get travel agent dashboard data
router.get('/dashboard/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const travelAgent = await TravelAgent.findOne({ email });
    
    if (!travelAgent) {
      return res.status(404).json({ error: 'Travel agent not found' });
    }

    if (!travelAgent.isApproved) {
      return res.status(403).json({ error: 'Travel agent not yet approved' });
    }

    // Get travel plans
    const travelPlans = await TravelPlan.find({ travelAgentId: email });
    
    // Get bookings
    const bookings = await Booking.find({ travelAgentId: email });
    
    // Calculate stats
    const stats = {
      totalPackages: travelPlans.length,
      activePackages: travelPlans.filter(plan => plan.isActive).length,
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((sum, booking) => {
        return sum + (booking.paymentStatus === 'paid' ? booking.totalAmount : 0);
      }, 0)
    };

    res.json({
      travelAgent,
      stats,
      travelPlans,
      recentBookings: bookings.slice(0, 10) // Last 10 bookings
    });
  } catch (err) {
    console.error('Failed to get dashboard data:', err);
    res.status(500).json({ error: 'Failed to get dashboard data' });
  }
});

// Create travel plan
router.post('/travel-plans', async (req, res) => {
  try {
    const {
      title,
      description,
      destination,
      duration,
      cost,
      itinerary,
      inclusions,
      exclusions,
      highlights,
      images,
      travelAgentId,
      travelAgentName,
      maxTravelers,
      tags
    } = req.body;

    // Verify travel agent is approved
    const travelAgent = await TravelAgent.findOne({ email: travelAgentId });
    if (!travelAgent || !travelAgent.isApproved) {
      return res.status(403).json({ error: 'Travel agent not approved' });
    }

    const travelPlan = new TravelPlan({
      title,
      description,
      destination,
      duration,
      cost,
      itinerary,
      inclusions: inclusions || [],
      exclusions: exclusions || [],
      highlights: highlights || [],
      images: images || [],
      travelAgentId,
      travelAgentName,
      maxTravelers: maxTravelers || 20,
      tags: tags || []
    });

    await travelPlan.save();

    res.json({
      success: true,
      message: 'Travel plan created successfully',
      travelPlan
    });
  } catch (err) {
    console.error('Failed to create travel plan:', err);
    res.status(500).json({ error: 'Failed to create travel plan' });
  }
});

// Get travel agent's travel plans
router.get('/travel-plans/:travelAgentId', async (req, res) => {
  try {
    const { travelAgentId } = req.params;
    const travelPlans = await TravelPlan.find({ travelAgentId });
    res.json(travelPlans);
  } catch (err) {
    console.error('Failed to get travel plans:', err);
    res.status(500).json({ error: 'Failed to get travel plans' });
  }
});

// Update travel plan
router.put('/travel-plans/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const updateData = req.body;
    updateData.updatedAt = new Date();

    const travelPlan = await TravelPlan.findByIdAndUpdate(planId, updateData, { new: true });
    
    if (!travelPlan) {
      return res.status(404).json({ error: 'Travel plan not found' });
    }

    res.json({
      success: true,
      message: 'Travel plan updated successfully',
      travelPlan
    });
  } catch (err) {
    console.error('Failed to update travel plan:', err);
    res.status(500).json({ error: 'Failed to update travel plan' });
  }
});

// Delete travel plan
router.delete('/travel-plans/:planId', async (req, res) => {
  try {
    const { planId } = req.params;
    const travelPlan = await TravelPlan.findByIdAndDelete(planId);
    
    if (!travelPlan) {
      return res.status(404).json({ error: 'Travel plan not found' });
    }

    res.json({
      success: true,
      message: 'Travel plan deleted successfully'
    });
  } catch (err) {
    console.error('Failed to delete travel plan:', err);
    res.status(500).json({ error: 'Failed to delete travel plan' });
  }
});

// Get travel agent's bookings
router.get('/bookings/:travelAgentId', async (req, res) => {
  try {
    const { travelAgentId } = req.params;
    const bookings = await Booking.find({ travelAgentId }).sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    console.error('Failed to get bookings:', err);
    res.status(500).json({ error: 'Failed to get bookings' });
  }
});

// Update booking status
router.patch('/bookings/:bookingId/status', async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { bookingStatus } = req.body;

    const booking = await Booking.findOneAndUpdate(
      { bookingId },
      { bookingStatus, updatedAt: new Date() },
      { new: true }
    );

    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({
      success: true,
      message: 'Booking status updated successfully',
      booking
    });
  } catch (err) {
    console.error('Failed to update booking status:', err);
    res.status(500).json({ error: 'Failed to update booking status' });
  }
});

export default router; 