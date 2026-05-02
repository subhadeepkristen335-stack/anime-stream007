import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { animeAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './AdminUpload.css';

export default function AdminUploadEpisode() {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [title, setTitle] = useState('');
  const [youtubeVideoId, setYoutubeVideoId] = useState('');
  const [description, setDescription] = useState('');
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
      await animeAPI.uploadEpisode(animeId, {
        animeId,
        episodeNumber: parseInt(episodeNumber),
        title,
        youtubeVideoId,
        description
      });

      setSuccess(true);
      setTimeout(() => {
        navigate(`/anime/${animeId}`);
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload episode');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-upload">
      <div className="admin-container">
        <h1>Upload Episode</h1>

        {success && <div className="success-message">Episode uploaded successfully!</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Episode Number *</label>
              <input
                type="number"
                value={episodeNumber}
                onChange={(e) => setEpisodeNumber(e.target.value)}
                required
                disabled={loading}
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Episode Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="form-group">
            <label>YouTube Video ID (unlisted) *</label>
            <input
              type="text"
              value={youtubeVideoId}
              onChange={(e) => setYoutubeVideoId(e.target.value)}
              placeholder="dQw4w9WgXcQ"
              required
              disabled={loading}
              pattern="[A-Za-z0-9_-]{11}"
              title="Must be a valid YouTube video ID"
            />
            <small>Find the video ID in the YouTube URL (after v=)</small>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={loading}
              rows="4"
              placeholder="Episode synopsis or notes..."
            ></textarea>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? 'Uploading...' : 'Upload Episode'}
          </button>
        </form>
      </div>
    </div>
  );
}
