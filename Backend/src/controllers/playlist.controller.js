const Playlist = require('../models/playlist.modal');

const createPlaylist = async (req, res) => {
    try {
        const { name, description, thumbnail } = req.body;
        const userId = req.user._id;

        const playlist = await Playlist.create({
            name,
            description,
            thumbnail,
            user: userId
        });

        res.status(201).json({ message: "Playlist created successfully", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error creating playlist", error: error.message });
    }
};

const getUserPlaylists = async (req, res) => {
    try {
        const userId = req.user._id;
        const playlists = await Playlist.find({ user: userId }).populate('songs');
        res.status(200).json(playlists);
    } catch (error) {
        res.status(500).json({ message: "Error fetching playlists", error: error.message });
    }
};

const addSongToPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const userId = req.user._id;

        const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or unauthorized" });
        }

        if (playlist.songs.includes(songId)) {
            return res.status(400).json({ message: "Song already in playlist" });
        }

        playlist.songs.push(songId);
        await playlist.save();

        res.status(200).json({ message: "Song added to playlist", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error adding song to playlist", error: error.message });
    }
};

const removeSongFromPlaylist = async (req, res) => {
    try {
        const { playlistId, songId } = req.body;
        const userId = req.user._id;

        const playlist = await Playlist.findOne({ _id: playlistId, user: userId });
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or unauthorized" });
        }

        playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
        await playlist.save();

        res.status(200).json({ message: "Song removed from playlist", playlist });
    } catch (error) {
        res.status(500).json({ message: "Error removing song from playlist", error: error.message });
    }
};

const deletePlaylist = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        const playlist = await Playlist.findOneAndDelete({ _id: id, user: userId });
        if (!playlist) {
            return res.status(404).json({ message: "Playlist not found or unauthorized" });
        }

        res.status(200).json({ message: "Playlist deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting playlist", error: error.message });
    }
};

module.exports = {
    createPlaylist,
    getUserPlaylists,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist
};
