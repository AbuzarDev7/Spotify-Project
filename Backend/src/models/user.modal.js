const mongoose = require('mongoose');
const userScema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'artist'],
        default: 'user'
    },
    avatar: {
        type: String,
        default: ""
    },
    likedSongs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'music'
        }
    ],
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'users'
        }
    ]
})

const userModal = mongoose.model('users', userScema);

module.exports = userModal