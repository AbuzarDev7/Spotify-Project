import React, { useRef, useEffect, useState } from 'react';
import { BiShuffle, BiSkipPrevious, BiPlay, BiPause, BiSkipNext, BiRepeat } from 'react-icons/bi';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { TbMicrophone2 } from 'react-icons/tb';
import { HiVolumeUp } from 'react-icons/hi';
import { MdOutlinePictureInPictureAlt } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';
import { useMusic } from '../context/MusicContext';

import './Player.css';

const Player = () => {
  const { currentSong, isPlaying, togglePlay, setIsPlaying } = useMusic();
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error("Playback failed", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  if (!currentSong) return <div className="player-placeholder">Select a song to play</div>;

  return (
    <div className="player">
      <audio 
        ref={audioRef} 
        src={currentSong.url} 
        onTimeUpdate={onTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
      <div className="player-left">
        <img 
          src={currentSong.thumbnail || "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=100"} 
          alt="Album Art" 
          className="track-img" 
        />
        <div className="track-info">
          <div className="track-name">{currentSong.title}</div>
          <div className="track-artist">{currentSong.artist?.username || 'Artist'}</div>
        </div>
        <button className="control-btn" style={{ marginLeft: '8px' }}>
          <AiOutlineHeart size={18} />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn"><BiShuffle size={20} /></button>
          <button className="control-btn"><BiSkipPrevious size={28} /></button>
          <button className="control-btn play-btn" onClick={togglePlay}>
            {isPlaying ? <BiPause size={24} /> : <BiPlay size={24} style={{ marginLeft: '2px' }} />}
          </button>
          <button className="control-btn"><BiSkipNext size={28} /></button>
          <button className="control-btn"><BiRepeat size={20} /></button>
        </div>
        <div className="progress-container">
          <span>{formatTime(currentTime)}</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}></div>
            <div className="progress-handle" style={{ left: `${(currentTime / (duration || 1)) * 100}%` }}></div>
          </div>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      <div className="player-right">
        <button className="control-btn"><MdOutlinePictureInPictureAlt size={18} /></button>
        <button className="control-btn"><TbMicrophone2 size={18} /></button>
        <button className="control-btn"><HiOutlineQueueList size={18} /></button>
        <div className="volume-container">
          <button className="control-btn"><HiVolumeUp size={20} /></button>
          <div className="volume-bar">
            <div className="volume-fill" style={{ width: '80%' }}></div>
            <div className="volume-handle" style={{ left: '80%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
