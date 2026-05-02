import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { animeAPI, userAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './AnimeDetail.css';

export default function AnimeDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const [anime, setAnime] = useState(null);
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inWatchlist, setInWatchlist] = useState(false);

  useEffect(() => {
    fetchAnimeDetails();
  }, [id]);

  const fetchAnimeDetails = async () => {
    try {
      const response = await animeAPI.getAnimeById(id);
      setAnime(response.data);
      setEpisodes(response.data.episodes || []);
    } catch (err) {
      setError('Failed to load anime details');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToWatchlist = async () => {
    if (!user) {
      alert('Please login to add to watchlist');
      return;
    }

    try {
      await userAPI.addToWatchlist(id);
      setInWatchlist(true);
    } catch (err) {
      alert('Failed to add to watchlist');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!anime) return <div className="container">Anime not found</div>;

  return (
    <div className="anime-detail">
      <div className="anime-header">
        <img
          src={anime.posterUrl || 'https://via.placeholder.com/300x400'}
          alt={anime.title}
          className="poster"
        />
        <div className="anime-info">
          <h1>{anime.title}</h1>
          <p className="description">{anime.description}</p>
          <div className="meta">
            <span className="genre">{anime.genre?.join(', ')}</span>
            <span className="episodes">{anime.totalEpisodes} Episodes</span>
          </div>
          {user && (
            <button
              className={`btn-watchlist ${inWatchlist ? 'added' : ''}`}
              onClick={handleAddToWatchlist}
              disabled={inWatchlist}
            >
              {inWatchlist ? '+ Added to Watchlist' : '+ Add to Watchlist'}
            </button>
          )}
          {user?.role === 'admin' && (
            <Link to={`/admin/upload-episode/${id}`} className="btn-upload-episode">
              📺 Upload Episode
            </Link>
          )}
        </div>
      </div>

      <div className="episodes-section">
        <h2>Episodes</h2>
        <div className="episodes-list">
          {episodes.map(episode => (
            <a
              key={episode._id}
              href={`/watch/${episode._id}`}
              className="episode-item"
            >
              <span className="episode-number">Episode {episode.episodeNumber}</span>
              <span className="episode-title">{episode.title}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
