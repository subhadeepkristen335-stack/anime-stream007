import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { animeAPI } from '../api/apiClient';
import './Home.css';

export default function Home() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAnimes();
  }, []);

  const fetchAnimes = async () => {
    try {
      const response = await animeAPI.getAllAnimes();
      setAnimes(response.data);
    } catch (err) {
      setError('Failed to load animes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;

  return (
    <div className="home">
      <h1>Anime Streaming</h1>
      <div className="animes-grid">
        {animes.map(anime => (
          <Link key={anime._id} to={`/anime/${anime._id}`} className="anime-card">
            <img src={anime.posterUrl || 'https://via.placeholder.com/200x300'} alt={anime.title} />
            <h3>{anime.title}</h3>
            <p className="episodes">{anime.totalEpisodes} Episodes</p>
            <p className="genres">{anime.genre?.join(', ')}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
