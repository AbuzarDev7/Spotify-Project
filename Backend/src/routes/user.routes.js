const express = require('express');
const router = express.Router();
const { toggleLikeSong, getLikedSongs } = require('../controllers/user.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect);

router.post('/toggle-like', toggleLikeSong);
router.get('/liked-songs', getLikedSongs);

module.exports = router;
