const express = require('express');
const router = express.Router();
const { 
    createPlaylist, 
    getUserPlaylists, 
    addSongToPlaylist, 
    removeSongFromPlaylist, 
    deletePlaylist 
} = require('../controllers/playlist.controller');
const { protect } = require('../middlewares/auth.middleware');

router.use(protect); // All playlist routes require login

router.post('/create', createPlaylist);
router.get('/my-playlists', getUserPlaylists);
router.post('/add-song', addSongToPlaylist);
router.post('/remove-song', removeSongFromPlaylist);
router.delete('/:id', deletePlaylist);

module.exports = router;
