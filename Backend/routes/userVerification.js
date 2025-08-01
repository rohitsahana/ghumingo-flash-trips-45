import express from 'express';
import User from '../models/User.js';
import UserTripInterest from '../models/UserTripInterest.js';

const router = express.Router();

// Get user verification status
router.get('/status/:email', async (req, res) => {
  try {
    const { email } = req.params;
    let user = await User.findOne({ email });
    
    if (!user) {
      // Create new user if doesn't exist
      user = new User({
        email,
        name: email.split('@')[0],
        isVerified: false
      });
      await user.save();
    }
    
    res.json({
      email: user.email,
      name: user.name,
      isVerified: user.isVerified,
      memberSince: user.memberSince,
      lastActive: user.lastActive
    });
  } catch (err) {
    console.error('Failed to get user verification status:', err);
    res.status(500).json({ error: 'Failed to get verification status' });
  }
});

// Upload Aadhar card for verification
router.post('/upload-aadhar', async (req, res) => {
  try {
    const { email, aadharNumber, aadharCardImage } = req.body;
    
    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        name: email.split('@')[0],
        isVerified: false
      });
    }
    
    user.aadharNumber = aadharNumber;
    user.aadharCardImage = aadharCardImage;
    user.isVerified = true; // Auto-verify for demo, in production this would be reviewed by admin
    user.lastActive = new Date();
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Aadhar card uploaded successfully. You are now verified!',
      isVerified: true
    });
  } catch (err) {
    console.error('Failed to upload Aadhar card:', err);
    res.status(500).json({ error: 'Failed to upload Aadhar card' });
  }
});

// Request verification for a user (trip owner requests verification for interested user)
router.post('/request-verification', async (req, res) => {
  try {
    const { tripOwnerEmail, interestedUserEmail, tripId, tripType } = req.body;
    
    // Find the interested user
    let interestedUser = await User.findOne({ email: interestedUserEmail });
    if (!interestedUser) {
      interestedUser = new User({
        email: interestedUserEmail,
        name: interestedUserEmail.split('@')[0],
        isVerified: false
      });
    }
    
    // Add verification request to interested user
    interestedUser.verificationRequestedBy.push({
      tripOwnerId: tripOwnerEmail,
      tripId,
      tripType,
      status: 'pending'
    });
    
    await interestedUser.save();
    
    // Find the trip owner
    let tripOwner = await User.findOne({ email: tripOwnerEmail });
    if (!tripOwner) {
      tripOwner = new User({
        email: tripOwnerEmail,
        name: tripOwnerEmail.split('@')[0],
        isVerified: false
      });
    }
    
    // Add verification request to trip owner's record
    tripOwner.verificationRequestedFor.push({
      userId: interestedUserEmail,
      tripId,
      tripType,
      status: 'pending'
    });
    
    await tripOwner.save();
    
    res.json({
      success: true,
      message: 'Verification request sent successfully',
      notificationSent: true
    });
  } catch (err) {
    console.error('Failed to request verification:', err);
    res.status(500).json({ error: 'Failed to request verification' });
  }
});

// Get verification requests for a user
router.get('/requests/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.json({ requests: [] });
    }
    
    res.json({
      verificationRequestedBy: user.verificationRequestedBy || [],
      verificationRequestedFor: user.verificationRequestedFor || []
    });
  } catch (err) {
    console.error('Failed to get verification requests:', err);
    res.status(500).json({ error: 'Failed to get verification requests' });
  }
});

// Update verification request status
router.patch('/request/:requestId/status', async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, userEmail } = req.body;
    
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Update the specific request
    const request = user.verificationRequestedBy.find(r => r._id.toString() === requestId);
    if (request) {
      request.status = status;
      await user.save();
    }
    
    res.json({ success: true, status });
  } catch (err) {
    console.error('Failed to update verification request status:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

export default router; 