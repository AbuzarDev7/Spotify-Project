import React from 'react';
import { BiPlay } from 'react-icons/bi';
import './Home.css';

const quickPicks = [
  { id: 1, title: 'Liked Songs', img: 'https://misc.scdn.co/liked-songs/liked-songs-64.png' },
  { id: 2, title: 'Top Hits', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200' },
  { id: 3, title: 'Daily Mix 1', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=200' },
  { id: 4, title: 'Discover Weekly', img: 'https://images.unsplash.com/photo-1493225457124-a1a2a5bb0b95?auto=format&fit=crop&q=80&w=200' },
  { id: 5, title: 'Lofi Beats', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=200' },
  { id: 6, title: 'Rock Classics', img: 'https://images.unsplash.com/photo-1511735111819-9a3f7709049c?auto=format&fit=crop&q=80&w=200' },
];

const featuredPlaylists = [
  { id: 1, title: 'Chill Vibes', desc: 'Kick back and relax with these chill tunes.', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=300' },
  { id: 2, title: 'Workout Energy', desc: 'High energy beats to keep you moving.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=300' },
  { id: 3, title: 'Focus Flow', desc: 'Instrumental music to help you concentrate.', img: 'https://images.unsplash.com/photo-1456324504439-367ceee54532?auto=format&fit=crop&q=80&w=300' },
  { id: 4, title: 'Late Night Drive', desc: 'The perfect soundtrack for a midnight ride.', img: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=300' },
  { id: 5, title: 'Acoustic Morning', desc: 'Start your day with gentle acoustic strings.', img: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=300' }
];

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-header">Good afternoon</h1>
      
      <div className="quick-picks-grid">
        {quickPicks.map((item) => (
          <div key={item.id} className="quick-pick-card">
            <img src={item.img} alt={item.title} className="quick-img" />
            <div className="quick-title">{item.title}</div>
            <button className="quick-play-btn">
              <BiPlay size={32} style={{ marginLeft: '2px' }} />
            </button>
          </div>
        ))}
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Made for you</h2>
          <span className="show-all">Show all</span>
        </div>
        <div className="items-grid">
          {featuredPlaylists.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-img-container">
                <img src={item.img} alt={item.title} className="item-img" />
                <button className="item-play-btn">
                  <BiPlay size={32} style={{ marginLeft: '2px' }} />
                </button>
              </div>
              <div className="item-title">{item.title}</div>
              <div className="item-desc">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Your top mixes</h2>
          <span className="show-all">Show all</span>
        </div>
        <div className="items-grid">
          {featuredPlaylists.slice().reverse().map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-img-container">
                <img src={item.img} alt={item.title} className="item-img" style={{ borderRadius: '50%' }} />
                <button className="item-play-btn">
                  <BiPlay size={32} style={{ marginLeft: '2px' }} />
                </button>
              </div>
              <div className="item-title">{item.title}</div>
              <div className="item-desc">Catch up on the latest from your favorites.</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
