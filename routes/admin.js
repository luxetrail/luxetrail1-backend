const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Job = require('../models/Job');
const Application = require('../models/Application');

// ===== ADMIN LOGIN =====
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin@luxetrailco.xyz' && password === 'Admin123!') {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

// ===== VERIFY TOKEN =====
function verifyToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Unauthorized' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.admin = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// ===== GET ALL JOBS (ADMIN) =====
router.get('/jobs', verifyToken, async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== CREATE JOB =====
router.post('/jobs', verifyToken, async (req, res) => {
  try {
    const job = new Job(req.body);
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== UPDATE JOB =====
router.put('/jobs/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== DELETE JOB =====
router.delete('/jobs/:id', verifyToken, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== GET ALL APPLICATIONS =====
router.get('/applications', verifyToken, async (req, res) => {
  try {
    const apps = await Application.find().populate('jobId', 'title company').sort({ createdAt: -1 });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== UPDATE APPLICATION STATUS =====
router.put('/applications/:id', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const app = await Application.findById(req.params.id);
    if (!app) return res.status(404).json({ message: 'Application not found' });
    app.status.value = status;
    app.status.updatedAt = Date.now();
    await app.save();
    res.json(app);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ===== DASHBOARD STATS =====
router.get('/stats', verifyToken, async (req, res) => {
  try {
    const totalJobs = await Job.countDocuments();
    const totalApps = await Application.countDocuments();
    const pending = await Application.countDocuments({ 'status.value': 'new' });
    const approved = await Application.countDocuments({ 'status.value': 'approved' });
    res.json({ totalJobs, totalApps, pending, approved });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
