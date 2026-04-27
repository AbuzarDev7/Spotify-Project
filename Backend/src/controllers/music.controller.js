const musicModal = require('../models/music.modal');
const fs = require('fs');
const { uploadToImageKit } = require('../services/storage.service');



const addMusic = async (req, res) => {
    try {
        const { title, url } = req.body;
        const artistId = req.user._id; // Get artist from authenticated user

        if (!title || !url) {
            return res.status(400).json({ message: "Title and URL are required" });
        }

        const music = await musicModal.create({
            title,
            url,
            artist: artistId
        });

        res.status(201).json({
            message: "Music added successfully",
            music
        });
    } catch (error) {
        res.status(500).json({ message: "Error adding music", error: error.message });
    }
};

const getAllMusic = async (req, res) => {
    try {
        const musicList = await musicModal.find().populate('artist', 'username email');
        res.status(200).json(musicList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching music", error: error.message });
    }
};

const getMusicById = async (req, res) => {
    try {
        const music = await musicModal.findById(req.params.id).populate('artist', 'username email');
        if (!music) {
            return res.status(404).json({ message: "Music not found" });
        }
        res.status(200).json(music);
    } catch (error) {
        res.status(500).json({ message: "Error fetching music", error: error.message });
    }
};

const uploadMusic = async (req, res) => {
    try {
        if (!req.files || (!req.files['song'] && !req.files['thumbnail'])) {
            return res.status(400).json({ message: "No files uploaded. Please upload a song and optionally a thumbnail." });
        }

        const { title } = req.body;
        const artistId = req.user._id; // Get artist from authenticated user

        if (!title) {
            // Cleanup uploaded files if validation fails
            if (req.files['song']) fs.unlinkSync(req.files['song'][0].path);
            if (req.files['thumbnail']) fs.unlinkSync(req.files['thumbnail'][0].path);
            return res.status(400).json({ message: "Title is required" });
        }

        let songUrl = "";
        let thumbnailUrl = "";

        // Upload song
        if (req.files['song']) {
            const songPath = req.files['song'][0].path;
            const songBuffer = fs.readFileSync(songPath);
            const songUpload = await uploadToImageKit(songBuffer, `song-${Date.now()}-${req.files['song'][0].originalname}`);
            songUrl = songUpload.url;
            fs.unlinkSync(songPath);
        }

        // Upload thumbnail
        if (req.files['thumbnail']) {
            const thumbPath = req.files['thumbnail'][0].path;
            const thumbBuffer = fs.readFileSync(thumbPath);
            const thumbUpload = await uploadToImageKit(thumbBuffer, `thumb-${Date.now()}-${req.files['thumbnail'][0].originalname}`);
            thumbnailUrl = thumbUpload.url;
            fs.unlinkSync(thumbPath);
        }

        // Save to Database
        const music = await musicModal.create({
            title,
            url: songUrl,
            thumbnail: thumbnailUrl,
            artist: artistId
        });

        res.status(201).json({
            message: "Music uploaded and saved successfully",
            music
        });
    } catch (error) {
        // Cleanup on error
        if (req.files) {
            if (req.files['song']) try { fs.unlinkSync(req.files['song'][0].path); } catch (e) {}
            if (req.files['thumbnail']) try { fs.unlinkSync(req.files['thumbnail'][0].path); } catch (e) {}
        }
        res.status(500).json({ message: "Upload failed", error: error.message });
    }
};

const getMyMusic = async (req, res) => {
    try {
        const artistId = req.user._id;
        const musicList = await musicModal.find({ artist: artistId });
        res.status(200).json(musicList);
    } catch (error) {
        res.status(500).json({ message: "Error fetching your music", error: error.message });
    }
};

const searchMusic = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const music = await musicModal.find({
            $or: [
                { title: { $regex: query, $options: 'i' } }
            ]
        }).populate('artist', 'username');

        res.status(200).json(music);
    } catch (error) {
        res.status(500).json({ message: "Search failed", error: error.message });
    }
};

module.exports = {
    addMusic,
    getAllMusic,
    getMusicById,
    uploadMusic,
    getMyMusic,
    searchMusic
};

