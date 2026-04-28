import React, { createContext, useState, useContext, useEffect } from 'react';

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songs, setSongs] = useState([]);

    const fetchSongs = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/music/all');
            const data = await response.json();
            setSongs(data);
        } catch (error) {
            console.error("Error fetching songs:", error);
        }
    };

    useEffect(() => {
        fetchSongs();
    }, []);

    const playSong = (song) => {
        setCurrentSong(song);
        setIsPlaying(true);
    };

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <MusicContext.Provider value={{ 
            currentSong, 
            isPlaying, 
            songs, 
            playSong, 
            togglePlay,
            setIsPlaying,
            fetchSongs
        }}>
            {children}
        </MusicContext.Provider>
    );
};

export const useMusic = () => useContext(MusicContext);
