const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const {
  saveWatchProgress,
  getWatchHistory,
  toggleLike,
  getLikeCount,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  addComment,
  getComments
} = require('../controllers/userController');

const router = express.Router();

// Watch history
router.post('/watch-history', authenticateToken, saveWatchProgress);
router.get('/watch-history', authenticateToken, getWatchHistory);

// Likes
router.post('/episodes/:id/like', authenticateToken, toggleLike);
router.get('/episodes/:id/likes', (req, res, next) => {
  if (req.headers.authorization) {
    return authenticateToken(req, res, next);
  }
  next();
}, getLikeCount);

// Watchlist
router.post('/watchlist', authenticateToken, addToWatchlist);
router.get('/watchlist', authenticateToken, getWatchlist);
router.delete('/watchlist/:animeId', authenticateToken, removeFromWatchlist);

// Comments
router.post('/episodes/:id/comments', authenticateToken, addComment);
router.get('/episodes/:id/comments', getComments);

module.exports = router;
