const userModal = require('../models/user.modal');

const toggleLikeSong = async (req, res) => {
    try {
        const { songId } = req.body;
        const userId = req.user._id;

        const user = await userModal.findById(userId);
        const isLiked = user.likedSongs.includes(songId);

        if (isLiked) {
            user.likedSongs = user.likedSongs.filter(id => id.toString() !== songId);
            await user.save();
            return res.status(200).json({ message: "Song unliked", likedSongs: user.likedSongs });
        } else {
            user.likedSongs.push(songId);
            await user.save();
            return res.status(200).json({ message: "Song liked", likedSongs: user.likedSongs });
        }
    } catch (error) {
        res.status(500).json({ message: "Error toggling like", error: error.message });
    }
};

const getLikedSongs = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModal.findById(userId).populate({
            path: 'likedSongs',
            populate: { path: 'artist', select: 'username' }
        });
        res.status(200).json(user.likedSongs);
    } catch (error) {
        res.status(500).json({ message: "Error fetching liked songs", error: error.message });
    }
};

const followArtist = async (req, res) => {
    try {
        const { artistId } = req.body;
        const userId = req.user._id;

        if (userId.toString() === artistId) {
            return res.status(400).json({ message: "You cannot follow yourself" });
        }

        const user = await userModal.findById(userId);
        const artist = await userModal.findById(artistId);

        if (!artist || artist.role !== 'artist') {
            return res.status(404).json({ message: "Artist not found" });
        }

        const isFollowing = user.following.includes(artistId);

        if (isFollowing) {
            user.following = user.following.filter(id => id.toString() !== artistId);
            artist.followers = artist.followers.filter(id => id.toString() !== userId.toString());
        } else {
            user.following.push(artistId);
            artist.followers.push(userId);
        }

        await user.save();
        await artist.save();

        res.status(200).json({ 
            message: isFollowing ? "Unfollowed" : "Followed", 
            following: user.following 
        });
    } catch (error) {
        res.status(500).json({ message: "Error following artist", error: error.message });
    }
};

const getArtistProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const artist = await userModal.findById(id).select('-password');
        
        if (!artist || artist.role !== 'artist') {
            return res.status(404).json({ message: "Artist not found" });
        }

        const songs = await require('../models/music.modal').find({ artist: id });

        res.status(200).json({ artist, songs });
    } catch (error) {
        res.status(500).json({ message: "Error fetching profile", error: error.message });
    }
};

const becomeArtist = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await userModal.findById(userId);

        if (user.role === 'artist') {
            return res.status(400).json({ message: "You are already an artist" });
        }

        user.role = 'artist';
        await user.save();

        res.status(200).json({ 
            message: "Success! You are now an artist", 
            user: {
                _id: user._id,
                username: user.username,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating role", error: error.message });
    }
};

module.exports = {
    toggleLikeSong,
    getLikedSongs,
    followArtist,
    getArtistProfile,
    becomeArtist
};
