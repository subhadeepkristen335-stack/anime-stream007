const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
  addedAt: { type: Date, default: Date.now }
});

watchlistSchema.index({ userId: 1, animeId: 1 }, { unique: true });

module.exports = mongoose.model('Watchlist', watchlistSchema);
