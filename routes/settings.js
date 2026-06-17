const express = require('express');
const router = express.Router();
const Settings = require('../models/Settings');

// GET settings (public)
router.get('/', async (req, res) => {
  try {
    let settings = await Settings.findOne({ key: 'contact' });
    if (!settings) {
      settings = await Settings.create({ 
        key: 'contact', 
        value: { 
          email: 'support@luxetrailco.xyz', 
          phone: '+123 456 7890', 
          address: '123 Main Street, City, Country' 
        }
      });
    }
    res.json(settings.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST settings (admin only)
router.post('/', async (req, res) => {
  try {
    const { email, phone, address } = req.body;
    let settings = await Settings.findOne({ key: 'contact' });
    if (settings) {
      settings.value = { email, phone, address };
      await settings.save();
    } else {
      settings = await Settings.create({ key: 'contact', value: { email, phone, address } });
    }
    res.json(settings.value);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
