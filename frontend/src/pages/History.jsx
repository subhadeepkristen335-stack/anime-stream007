import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './UserProfile.css';

export default function History() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      fetchHistory();
    }
  }, [user]);

  const fetchHistory = async () => {
    try {
      const response = await userAPI.getWatchHistory();
      setHistory(response.data);
    } catch (err) {
      setError('Failed to load watch history');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <p>Please <Link to="/login">login</Link> to view your watch history</p>
      </div>
    );
  }

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="profile-page">
      <h1>Watch History</h1>

      {error && <div className="error-message">{error}</div>}

      {history.length === 0 ? (
        <div className="empty-state">
          <p>No watch history yet</p>
          <Link to="/">Start Watching</Link>
        </div>
      ) : (
        <div className="history-list">
          {history.map(item => (
            <Link
              key={item._id}
              to={`/watch/${item.episodeId._id}`}
              className="history-item"
            >
              <div className="history-info">
                <h3>{item.animeId.title}</h3>
                <p className="episode">Episode {item.episodeId.episodeNumber}: {item.episodeId.title}</p>
                <p className="timestamp">
                  Last watched: {new Date(item.lastWatchedAt).toLocaleDateString()}
                  {item.timeStampSeconds && ` at ${Math.floor(item.timeStampSeconds / 60)}:${String(item.timeStampSeconds % 60).padStart(2, '0')}`}
                </p>
              </div>
              {item.animeId.posterUrl && (
                <img
                  src={item.animeId.posterUrl}
                  alt={item.animeId.title}
                  className="history-thumbnail"
                />
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
