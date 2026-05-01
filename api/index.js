const app = require('../Backend/src/app');
const connectDb = require('../Backend/src/db/db');

// This is the Vercel serverless function entry point
module.exports = async (req, res) => {
    try {
        // Connect to MongoDB if not already connected
        await connectDb();
        
        // Handle the request using the Express app
        return app(req, res);
    } catch (error) {
        console.error("Vercel Function Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
