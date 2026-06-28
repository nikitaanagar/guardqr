const mongoose = require('mongoose');

const ScanLogSchema = new mongoose.Schema({
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  ip: {
    type: String,
  },
  latitude: {
    type: Number,
  },
  longitude: {
    type: Number,
  },
  approximateLocation: {
    type: String,
  },
  message: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('ScanLog', ScanLogSchema);