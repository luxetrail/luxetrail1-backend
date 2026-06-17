const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Admin login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Simple check (replace with real DB check later)
    if (email === 'admin@luxetrailco.xyz' && password === 'Admin123!') {
      const token = jwt.sign(
        { email, role: 'admin' },
        process.env.JWT_SECRET || 'secret',
        { expiresIn: '7d' }
      );
      res.json({ success: true, token, message: 'Login successful!' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dashboard stats
router.get('/stats', async (req, res) => {
  try {
    res.json({
      totalJobs: 247,
      totalApplications: 1284,
      pendingReview: 89,
      approved: 156
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;