import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { animeAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './AdminUpload.css';

export default function AdminUpload() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [totalEpisodes, setTotalEpisodes] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (user?.role !== 'admin') {
    return (
      <div className="container">
        <p style={{ color: '#d32f2f', fontSize: '1.1rem' }}>
          Access denied. Admin privileges required.
        </p>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const genreArray = genre.split(',').map(g => g.trim()).filter(g => g);

      const response = await animeAPI.createAnime({
        title,
        description,
        genre: genreArray,
        posterUrl,
        totalEpisodes: parseInt(totalEpisodes) || 0
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(`/anime/${response.data.anime._id}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create anime');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-upload">
      <div className="admin-container">
        <h1>Create New Anime</h1>

        {success && <div className="success-message">Anime created successfully!</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Anime Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              disabled={loading}
              rows="5"
            ></textarea>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genres (comma-separated)</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                placeholder="Action, Adventure, Comedy"
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label>Total Episodes</label>
              <input
                type="number"
                value={totalEpisodes}
                onChange={(e) => setTotalEpisodes(e.target.value)}
                disabled={loading}
                min="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Poster Image URL</label>
            <input
              type="url"
              value={posterUrl}
              onChange={(e) => setPosterUrl(e.target.value)}
              placeholder="https://example.com/poster.jpg"
              disabled={loading}
            />
          </div>

          {posterUrl && (
            <div className="form-group">
              <label>Preview:</label>
              <img src={posterUrl} alt="Poster preview" className="poster-preview" />
            </div>
          )}

          <button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Anime'}
          </button>
        </form>
      </div>
    </div>
  );
}
