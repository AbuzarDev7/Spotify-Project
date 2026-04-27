import React from 'react';
import { BiShuffle, BiSkipPrevious, BiPlay, BiSkipNext, BiRepeat } from 'react-icons/bi';
import { HiOutlineQueueList } from 'react-icons/hi2';
import { TbMicrophone2 } from 'react-icons/tb';
import { HiVolumeUp } from 'react-icons/hi';
import { MdOutlinePictureInPictureAlt } from 'react-icons/md';
import { AiOutlineHeart } from 'react-icons/ai';

import './Player.css';

const Player = () => {
  return (
    <div className="player">
      <div className="player-left">
        <img 
          src="https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=100" 
          alt="Album Art" 
          className="track-img" 
        />
        <div className="track-info">
          <div className="track-name">Midnight City</div>
          <div className="track-artist">M83</div>
        </div>
        <button className="control-btn" style={{ marginLeft: '8px' }}>
          <AiOutlineHeart size={18} />
        </button>
      </div>

      <div className="player-center">
        <div className="player-controls">
          <button className="control-btn"><BiShuffle size={20} /></button>
          <button className="control-btn"><BiSkipPrevious size={28} /></button>
          <button className="control-btn play-btn"><BiPlay size={24} style={{ marginLeft: '2px' }} /></button>
          <button className="control-btn"><BiSkipNext size={28} /></button>
          <button className="control-btn"><BiRepeat size={20} /></button>
        </div>
        <div className="progress-container">
          <span>1:12</span>
          <div className="progress-bar">
            <div className="progress-fill"></div>
            <div className="progress-handle"></div>
          </div>
          <span>4:03</span>
        </div>
      </div>

      <div className="player-right">
        <button className="control-btn"><MdOutlinePictureInPictureAlt size={18} /></button>
        <button className="control-btn"><TbMicrophone2 size={18} /></button>
        <button className="control-btn"><HiOutlineQueueList size={18} /></button>
        <div className="volume-container">
          <button className="control-btn"><HiVolumeUp size={20} /></button>
          <div className="volume-bar">
            <div className="volume-fill"></div>
            <div className="volume-handle"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Player;
