import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { FiSearch } from 'react-icons/fi';
import { VscLibrary } from 'react-icons/vsc';
import { AiOutlinePlus } from 'react-icons/ai';
import { IoMdArrowForward } from 'react-icons/io';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <div className="sidebar-card">
        <ul className="sidebar-menu">
          <Link to="/">
            <li className={`sidebar-menu-item ${location.pathname === '/' ? 'active' : ''}`}>
              {location.pathname === '/' ? <GoHomeFill className="sidebar-icon" /> : <GoHome className="sidebar-icon" />}
              <span>Home</span>
            </li>
          </Link>
          <Link to="/search">
            <li className={`sidebar-menu-item ${location.pathname === '/search' ? 'active' : ''}`}>
              <FiSearch className="sidebar-icon" style={{ strokeWidth: location.pathname === '/search' ? '3' : '2' }} />
              <span>Search</span>
            </li>
          </Link>
        </ul>
      </div>

      <div className="sidebar-card" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div className="library-header">
          <div className="library-header-left">
            <VscLibrary className="sidebar-icon" />
            <span>Your Library</span>
          </div>
          <div className="library-actions">
            <button className="icon-btn">
              <AiOutlinePlus size={20} />
            </button>
            <button className="icon-btn">
              <IoMdArrowForward size={20} />
            </button>
          </div>
        </div>

        <div className="library-content">
          <div className="create-playlist-btn">
            <h4>Create your first playlist</h4>
            <p>It's easy, we'll help you</p>
            <button>Create playlist</button>
          </div>
          <div className="create-playlist-btn">
            <h4>Let's find some podcasts to follow</h4>
            <p>We'll keep you updated on new episodes</p>
            <button>Browse podcasts</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
