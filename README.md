# 🎵 Spotify Clone - MERN Stack

A full-stack Spotify clone built using the MERN stack (MongoDB, Express, React, Node.js). This project features user authentication, music streaming, music uploads, and playlist management with a modern, responsive UI.

## ✨ Features

- **🔐 User Authentication**: 
  - Secure Login and Signup using JWT and bcrypt.
  - Google OAuth integration via Passport.js.
  - Protected routes for authenticated users.
- **🎶 Music Streaming**:
  - Real-time music playback with a custom player.
  - Explore music tracks uploaded by users.
- **📤 Music Management**:
  - Upload music files and cover images.
  - Integration with **ImageKit** for optimized cloud storage.
- **📂 Playlists**:
  - Create and manage personalized playlists.
- **📱 Responsive Design**:
  - Fully responsive UI built with modern CSS and React.
- **🚀 Deployment Ready**:
  - Optimized for deployment on Vercel.

## 🛠️ Tech Stack

**Frontend:**
- React.js (Vite)
- CSS3 (Vanilla)
- React Router DOM
- Context API (State Management)
- Axios (API Calls)

**Backend:**
- Node.js
- Express.js
- MongoDB (Mongoose)
- Passport.js (Authentication Strategies)
- JWT (JSON Web Tokens)
- Multer & ImageKit (File Handling)

## 🚀 Getting Started

### Prerequisites

- Node.js installed
- MongoDB Atlas account
- ImageKit account (for uploads)
- Google Cloud Console account (for Google Auth)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbuzarDev7/Spotify-Project.git
   cd Spotify-Project
   ```

2. **Backend Setup:**
   - Navigate to the `Backend` folder:
     ```bash
     cd Backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `Backend` directory and add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     IMAGEKIT_PUBLIC_KEY=your_public_key
     IMAGEKIT_PRIVATE_KEY=your_private_key
     IMAGEKIT_URL_ENDPOINT=your_url_endpoint
     GOOGLE_CLIENT_ID=your_google_id
     GOOGLE_CLIENT_SECRET=your_google_secret
     CLIENT_URL=http://localhost:5173
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup:**
   - Navigate to the `Frontend` folder:
     ```bash
     cd ../Frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

## 📁 Project Structure

```text
Spotify-Project/
├── Backend/            # Express server and API logic
│   ├── src/
│   │   ├── config/     # Configurations (Passport, DB)
│   │   ├── controllers/# Route handlers
│   │   ├── models/     # Mongoose schemas
│   │   ├── routes/     # API endpoints
│   │   └── utils/      # Helper functions
├── Frontend/           # React application (Vite)
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── context/    # State management
│   │   ├── pages/      # Application views
│   │   └── assets/     # Static images/icons
├── api/                # Vercel serverless entry point
└── package.json        # Root configuration
```

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## 📝 License

This project is licensed under the MIT License.

---
Developed with ❤️ by [Abuzar](https://github.com/AbuzarDev7)
