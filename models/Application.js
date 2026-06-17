const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  trackingNumber: { type: String, unique: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  jobTitle: String,
  status: { type: String, default: 'New' },
  submittedAt: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
