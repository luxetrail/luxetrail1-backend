const express = require('express');
const router = express.Router();

// Submit application
router.post('/', async (req, res) => {
  try {
    const { fullName, email, phone, jobTitle } = req.body;
    
    if (!fullName || !email || !phone || !jobTitle) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Generate tracking number
    const tracking = 'LXT-' + Date.now().toString().slice(-6);
    
    res.status(201).json({
      success: true,
      trackingNumber: tracking,
      message: 'Application submitted successfully!'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Track application
router.get('/track/:trackingNumber', async (req, res) => {
  try {
    const { trackingNumber } = req.params;
    res.json({
      trackingNumber: trackingNumber,
      status: 'Under Review',
      submittedAt: new Date(),
      jobTitle: 'Senior React Developer',
      company: 'TechCorp'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;