const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Profile = require('../models/Profile');

// @route   POST api/profile
// @desc    Create a new profile
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const newProfile = new Profile({
      ...req.body,
      user: req.user.id
    });
    const profile = await newProfile.save();
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile
// @desc    Get all profiles for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const profiles = await Profile.find({ user: req.user.id }).sort({ date: -1 });
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/public/:id
// @desc    Get profile by ID (Public scan)
// @access  Public
router.get('/public/:id', async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    // Check privacy toggle - we send hidePhone boolean and frontend will handle it
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile/:id
// @desc    Update profile
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    let profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Make sure user owns profile
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    profile = await Profile.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile/:id
// @desc    Delete profile
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id);
    if (!profile) return res.status(404).json({ msg: 'Profile not found' });

    // Make sure user owns profile
    if (profile.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Profile.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Profile removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;