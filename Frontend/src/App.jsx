import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

// We will create these components soon
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AddMusic from './pages/AddMusic';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/add-music" element={<AddMusic />} />
              {/* Add more routes later like /search, /library, /playlist/:id */}
            </Routes>
          </div>
        </div>
        <div className="player-container">
          <Player />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
