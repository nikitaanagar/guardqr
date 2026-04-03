const router  = require('express').Router();
const QRCode  = require('qrcode');
const Profile = require('../models/Profile');
const protect = require('../middleware/authMiddleware');

router.get('/:profileId', protect, async (req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.profileId, owner: req.user._id });
    if (!profile) return res.status(404).json({ message: 'Not found' });

    const url = `${process.env.CLIENT_URL}/scan/${profile.qrToken}`;
    const dataUrl = await QRCode.toDataURL(url, { width: 300, margin: 2 });
    res.json({ qrDataUrl: dataUrl, scanUrl: url });
  } catch (e) { res.status(500).json({ message: e.message }); }
});

module.exports = router;