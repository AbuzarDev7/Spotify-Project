const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: true, // Dynamically allow the origin that made the request
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(express.static('public'));

app.get("/", (req, res) => {
    res.send("<h1>Spotify Backend is Running! 🚀</h1>");
});

const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');
const playlistRoutes = require('./routes/playlist.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/auth', authRoutes);
app.use('/api/music', musicRoutes);
app.use('/api/playlist', playlistRoutes);
app.use('/api/user', userRoutes);


// 404 Handler to debug missing routes
app.use((req, res) => {
    console.log(`404 - Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ message: `Route ${req.method} ${req.url} not found` });
});

module.exports = app;