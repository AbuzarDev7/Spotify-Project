import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { GoDownload } from 'react-icons/go';
import { FaRegUser } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  
  // Basic auth state
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (e.target.scrollTop > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  return (
    <div className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-arrows">
        <button className="arrow-btn" onClick={() => navigate(-1)}>
          <IoIosArrowBack size={20} />
        </button>
        <button className="arrow-btn" onClick={() => navigate(1)}>
          <IoIosArrowForward size={20} />
        </button>
      </div>
      
      <div className="nav-actions">
        {user ? (
          <>
            <button className="explore-premium-btn">Explore Premium</button>
            <button className="install-app-btn">
              <GoDownload size={18} />
              <span>Install App</span>
            </button>
            <button className="profile-btn" title={user.username}>
              <FaRegUser size={16} color="#fff" />
            </button>
            <button className="auth-action-btn" onClick={handleLogout}>Log out</button>
          </>
        ) : (
          <>
            <button className="auth-action-btn ghost" onClick={() => navigate('/signup')}>Sign up</button>
            <button className="auth-action-btn primary" onClick={() => navigate('/login')}>Log in</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
