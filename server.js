const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.log('❌ MongoDB error:', err));

// ===== HOME ROUTE =====
app.get('/', (req, res) => {
  res.json({ message: '🚀 Luxetrailco API is running!' });
});

// ===== JOBS ROUTE =====
app.get('/api/jobs', (req, res) => {
  res.json([
    { id: 1, title: "Senior React Developer", company: "TechCorp", location: "Remote", salary: "$80k - $120k" },
    { id: 2, title: "UX/UI Designer", company: "DesignStudio", location: "New York", salary: "$70k - $95k" }
  ]);
});

// ===== ADMIN LOGIN ROUTE =====
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@luxetrailco.xyz' && password === 'Admin123!') {
    res.json({ success: true, token: 'test-token-123' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// ===== SETTINGS ROUTE =====
app.get('/api/settings', (req, res) => {
  res.json({ 
    email: 'support@luxetrailco.xyz', 
    phone: '+123 456 7890', 
    address: '123 Main Street, City, Country' 
  });
});

// ===== START SERVER =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
