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
    
    // Validate Aadhar number format
    if (!aadharNumber || aadharNumber.length !== 12 || !/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({ 
        error: 'Invalid Aadhar number. Please enter a valid 12-digit number.' 
      });
    }

    // Validate Aadhar number checksum (basic validation)
    const digits = aadharNumber.split('').map(Number);
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      sum += digits[i] * (12 - i);
    }
    const checksum = (12 - (sum % 12)) % 12;
    
    if (checksum !== digits[11]) {
      return res.status(400).json({ 
        error: 'Invalid Aadhar number. Please check the number and try again.' 
      });
    }

    // Validate image
    if (!aadharCardImage || !aadharCardImage.startsWith('data:image/')) {
      return res.status(400).json({ 
        error: 'Please upload a valid Aadhar card image.' 
      });
    }

    // In a real application, you would:
    // 1. Upload image to cloud storage (AWS S3, Google Cloud Storage, etc.)
    // 2. Use OCR to extract Aadhar number from image
    // 3. Compare extracted number with provided number
    // 4. Verify with UIDAI API (if available)
    
    // For demo purposes, we'll simulate verification
    // In production, replace this with actual OCR and verification logic
    const isImageValid = aadharCardImage.length > 1000; // Basic check for valid image
    
    if (!isImageValid) {
      return res.status(400).json({ 
        error: 'Invalid image. Please upload a clear image of your Aadhar card.' 
      });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({
        email,
        name: email.split('@')[0],
        isVerified: false
      });
    }
    
    // Check if user is already verified
    if (user.isVerified) {
      return res.status(400).json({ 
        error: 'User is already verified.' 
      });
    }
    
    user.aadharNumber = aadharNumber;
    user.aadharCardImage = aadharCardImage;
    user.isVerified = true; // Auto-verify for demo, in production this would be reviewed by admin
    user.lastActive = new Date();
    
    await user.save();
    
    res.json({
      success: true,
      message: 'Aadhar card verified successfully! Your account is now verified and you can create trips.',
      isVerified: true
    });
  } catch (err) {
    console.error('Failed to upload Aadhar card:', err);
    res.status(500).json({ error: 'Failed to upload Aadhar card. Please try again.' });
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