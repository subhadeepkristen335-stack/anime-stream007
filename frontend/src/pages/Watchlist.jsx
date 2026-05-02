import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

export default function Watchlist() {
  const { user } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchWatchlist();
    }
  }, [user]);

  const fetchWatchlist = async () => {
    try {
      const response = await userAPI.getWatchlist();
      setWatchlist(response.data);
    } catch (err) {
      setError('Failed to load watchlist');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (animeId) => {
    try {
      await userAPI.removeFromWatchlist(animeId);
      setWatchlist(watchlist.filter(w => w.animeId._id !== animeId));
    } catch (err) {
      alert('Failed to remove from watchlist');
    }
  };

  if (!user) {
    return (
      <div className="container">
        <p>Please <Link to="/login">login</Link> to view your watchlist</p>
      </div>
    );
  }

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="profile-page">
      <h1>My Watchlist</h1>

      {error && <div className="error-message">{error}</div>}

      {watchlist.length === 0 ? (
        <div className="empty-state">
          <p>Your watchlist is empty</p>
          <Link to="/">Browse Animes</Link>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map(item => (
            <div key={item.animeId._id} className="watchlist-card">
              <img
                src={item.animeId.posterUrl || 'https://via.placeholder.com/150x200'}
                alt={item.animeId.title}
              />
              <h3>{item.animeId.title}</h3>
              <p className="episodes">{item.animeId.totalEpisodes} Episodes</p>
              <div className="card-actions">
                <Link to={`/anime/${item.animeId._id}`} className="btn-view">
                  View
                </Link>
                <button
                  className="btn-remove"
                  onClick={() => handleRemove(item.animeId._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
