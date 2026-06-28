const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Profile = require('../models/Profile');
const ScanLog = require('../models/ScanLog');

// @route   GET api/admin/stats
// @desc    Get global statistics for dashboard
// @access  Private/Admin
router.get('/stats', [auth, admin], async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProfiles = await Profile.countDocuments();
    const paidProfiles = await Profile.countDocuments({ paid: true });
    const totalScans = await ScanLog.countDocuments();

    res.json({
      totalUsers,
      totalProfiles,
      paidProfiles,
      totalScans
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/users
// @desc    Get all users
// @access  Private/Admin
router.get('/users', [auth, admin], async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/users/:id
// @desc    Delete a user and their associated profiles/scans
// @access  Private/Admin
router.delete('/users/:id', [auth, admin], async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    // Find profiles to delete their scan logs
    const profiles = await Profile.find({ user: req.params.id });
    const profileIds = profiles.map(p => p._id);

    await ScanLog.deleteMany({ profile: { $in: profileIds } });
    await Profile.deleteMany({ user: req.params.id });
    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: 'User and all associated profiles/scans deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/profiles
// @desc    Get all profiles
// @access  Private/Admin
router.get('/profiles', [auth, admin], async (req, res) => {
  try {
    const profiles = await Profile.find()
      .populate('user', ['name', 'email'])
      .sort({ createdAt: -1 });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/admin/profiles/:id/payment
// @desc    Toggle profile payment status
// @access  Private/Admin
router.put('/profiles/:id/payment', [auth, admin], async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    profile.paid = !profile.paid;
    await profile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/admin/profiles/:id
// @desc    Delete profile and associated scans
// @access  Private/Admin
router.delete('/profiles/:id', [auth, admin], async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    await ScanLog.deleteMany({ profile: req.params.id });
    await Profile.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Profile and associated scan logs deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/admin/scans
// @desc    Get all scan logs globally
// @access  Private/Admin
router.get('/scans', [auth, admin], async (req, res) => {
  try {
    const scans = await ScanLog.find()
      .populate({
        path: 'profile',
        select: ['name', 'type'],
        populate: { path: 'user', select: ['name', 'email'] }
      })
      .sort({ createdAt: -1 });
    res.json(scans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
