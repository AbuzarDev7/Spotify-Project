const express = require('express');
const router = express.Router();
const { addMusic, getAllMusic, getMusicById, uploadMusic, getMyMusic, searchMusic } = require('../controllers/music.controller');
const upload = require('../middlewares/multer.middleware');
const { protect, isArtist } = require('../middlewares/auth.middleware');

// Public routes
router.get('/all', getAllMusic);
router.get('/search', searchMusic);
router.get('/:id', getMusicById);

// Protected routes (Logged in users only)
router.get('/my-music', protect, isArtist, getMyMusic);

// Artist only routes
router.post('/add', protect, isArtist, addMusic);
router.post('/upload', protect, isArtist, upload.fields([
    { name: 'song', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 }
]), uploadMusic);

module.exports = router;
