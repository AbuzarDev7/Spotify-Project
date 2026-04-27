const userModal = require('../models/user.modal');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const { uploadToImageKit } = require('../services/storage.service');


const generateToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',

    });

    return token;
};

const register = async (req, res) => {
    try {
        console.log("Registration request body:", req.body);
        const { username, email, password, role } = req.body;


        // Basic check
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const userExists = await userModal.findOne({ $or: [{ email }, { username }] });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Role validation
        const validRoles = ['user', 'artist'];
        if (role && !validRoles.includes(role)) {
            return res.status(400).json({ message: "Invalid role. Must be 'user' or 'artist'" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        let avatarUrl = "";
        if (req.file) {
            try {
                const filePath = req.file.path;
                const fileBuffer = fs.readFileSync(filePath);
                const uploadResponse = await uploadToImageKit(fileBuffer, `avatar-${Date.now()}-${req.file.originalname}`);
                avatarUrl = uploadResponse.url;
                fs.unlinkSync(filePath); // Cleanup
            } catch (uploadError) {
                console.error("Avatar upload failed:", uploadError);
                // Continue registration without avatar or return error? 
                // Let's continue but log it. Or we could return error.
            }
        }

        const user = await userModal.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user",
            avatar: avatarUrl
        });


        const token = generateToken(res, user._id);

        res.status(201).json({
            message: "User registered successfully",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar
            },
            token
        });

    } catch (error) {
        res.status(500).json({ message: "Error registering user", error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await userModal.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // Optional: Check if role matches if provided in login
        if (role && user.role !== role) {
            return res.status(400).json({ message: `Access denied. You are registered as ${user.role}` });
        }

        const isMatch = await bcrypt.compare(password, user.password);


        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = generateToken(res, user._id);

        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            },
            token
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

module.exports = {
    register,
    login
};
