const express = require('express');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');
const {
  createAnime,
  updateAnime,
  deleteAnime,
  getAllAnimes,
  getAnimeById
} = require('../controllers/animeController');
const {
  uploadEpisode,
  getEpisodeById,
  deleteEpisode
} = require('../controllers/episodeController');

const router = express.Router();

// Public anime routes
router.get('/', getAllAnimes);
router.get('/:id', getAnimeById);

// Admin anime routes
router.post('/', authenticateToken, authorizeAdmin, createAnime);
router.put('/:id', authenticateToken, authorizeAdmin, updateAnime);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteAnime);

// Episode routes
router.post('/:id/episodes', authenticateToken, authorizeAdmin, uploadEpisode);
router.get('/episodes/:id', getEpisodeById);
router.delete('/episodes/:id', authenticateToken, authorizeAdmin, deleteEpisode);

module.exports = router;
