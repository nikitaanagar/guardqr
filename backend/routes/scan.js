const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const ScanLog = require('../models/ScanLog');
const Profile = require('../models/Profile');
const geolocate = require('../utils/geolocate');
const { sendAlertSMS, sendAlertCall } = require('../utils/sms');
const User = require('../models/User');

// @route   POST api/scan/:profileId
// @desc    Record a scan and send alert
// @access  Public
router.post('/:profileId', async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    
    let approxLocation = 'Location not provided';

    if (latitude && longitude) {
      approxLocation = `GPS: ${latitude}, ${longitude}`;
    } else {
      const geo = geolocate(ip);
      if (geo) {
        approxLocation = `IP Based: ${geo.city}, ${geo.region}, ${geo.country}`;
      }
    }

    const newScan = new ScanLog({
      profile: req.params.profileId,
      ip,
      latitude,
      longitude,
      approximateLocation: approxLocation
    });

    const scan = await newScan.save();

    // Fetch Profile and Owner to send Email
    const profile = await Profile.findById(req.params.profileId).populate('user', ['email', 'name']);
    
    if (profile && profile.user && profile.user.email) {
      const timeStr = new Date().toLocaleString();
      let mapsLink = '';
      if (latitude && longitude) {
        mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;
      }

      const smsMessage = `your "${profile.name}" is not safe. click on location: ${mapsLink || approxLocation}`;
      const callMessage = `Emergency Alert! Your ${profile.type} named ${profile.name} has just been scanned. Please check your text messages immediately for their location coordinates.`;
      
      if (profile.emergencyContactPhone) {
        await sendAlertSMS(profile.emergencyContactPhone, smsMessage);
        await sendAlertCall(profile.emergencyContactPhone, callMessage);
      }
    }

    res.json(scan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/scan/history
// @desc    Get scan history for user
// @access  Private
router.get('/history', auth, async (req, res) => {
  try {
    // 1. Get all profiles for this user
    const profiles = await Profile.find({ user: req.user.id });
    const profileIds = profiles.map(p => p.id);

    // 2. Find scan logs for these profiles
    const scans = await ScanLog.find({ profile: { $in: profileIds } })
      .populate('profile', ['name', 'type'])
      .sort({ createdAt: -1 });

    res.json(scans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;