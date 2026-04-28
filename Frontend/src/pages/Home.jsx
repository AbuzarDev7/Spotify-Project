import React, { useEffect } from 'react';
import { BiPlay } from 'react-icons/bi';
import { useMusic } from '../context/MusicContext';
import './Home.css';

const Home = () => {
  const { songs, playSong, fetchSongs } = useMusic();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const load = async () => {
      await fetchSongs();
      setLoading(false);
    };
    load();
  }, []);

  if (loading) return <div className="loading-container">Loading music...</div>;

  return (
    <div className="home-container">
      <h1 className="home-header">Good afternoon</h1>
      
      <div className="section">
        <div className="section-header">
          <h2>Trending Music</h2>
          <span className="show-all">Show all</span>
        </div>
        <div className="items-grid">
          {songs && songs.length > 0 ? (
            songs.map((song) => (
              <div key={song._id} className="item-card" onClick={() => playSong(song)}>
                <div className="item-img-container">
                  <img src={song.thumbnail || 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=200'} alt={song.title} className="item-img" />
                  <button className="item-play-btn">
                    <BiPlay size={32} style={{ marginLeft: '2px' }} />
                  </button>
                </div>
                <div className="item-title">{song.title}</div>
                <div className="item-desc">{song.artist?.username || 'Unknown Artist'}</div>
              </div>
            ))
          ) : (
            <div className="no-music">No music found. Artists, start uploading!</div>
          )}
        </div>
      </div>

      <div className="section">
        <div className="section-header">
          <h2>Made for you</h2>
          <span className="show-all">Show all</span>
        </div>
        <div className="items-grid">
            <div className="item-card">
              <div className="item-img-container">
                <img src="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=300" alt="Chill" className="item-img" />
                <button className="item-play-btn">
                  <BiPlay size={32} style={{ marginLeft: '2px' }} />
                </button>
              </div>
              <div className="item-title">Chill Vibes</div>
              <div className="item-desc">Kick back and relax with these chill tunes.</div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
