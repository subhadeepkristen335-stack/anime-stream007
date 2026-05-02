import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  register: (email, username, password) =>
    api.post('/auth/register', { email, username, password }),
  login: (email, password) =>
    api.post('/auth/login', { email, password })
};

export const animeAPI = {
  getAllAnimes: () => api.get('/animes'),
  getAnimeById: (id) => api.get(`/animes/${id}`),
  createAnime: (data) => api.post('/animes', data),
  updateAnime: (id, data) => api.put(`/animes/${id}`, data),
  deleteAnime: (id) => api.delete(`/animes/${id}`),
  uploadEpisode: (animeId, data) => api.post(`/animes/${animeId}/episodes`, data),
  deleteEpisode: (id) => api.delete(`/animes/episodes/${id}`)
};

export const episodeAPI = {
  getEpisodeById: (id) => api.get(`/animes/episodes/${id}`)
};

export const userAPI = {
  saveWatchProgress: (episodeId, animeId, timeStampSeconds, duration) =>
    api.post('/user/watch-history', { episodeId, animeId, timeStampSeconds, duration }),
  getWatchHistory: () => api.get('/user/watch-history'),
  toggleLike: (episodeId) => api.post(`/user/episodes/${episodeId}/like`, {}),
  getLikeCount: (episodeId) => api.get(`/user/episodes/${episodeId}/likes`),
  addToWatchlist: (animeId) => api.post('/user/watchlist', { animeId }),
  removeFromWatchlist: (animeId) => api.delete(`/user/watchlist/${animeId}`),
  getWatchlist: () => api.get('/user/watchlist'),
  addComment: (episodeId, content) => api.post(`/user/episodes/${episodeId}/comments`, { content }),
  getComments: (episodeId) => api.get(`/user/episodes/${episodeId}/comments`)
};

export default api;
