const mongoose = require('mongoose');

const episodeSchema = new mongoose.Schema({
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
  episodeNumber: { type: Number, required: true },
  title: { type: String, required: true },
  youtubeVideoId: { type: String, required: true },
  description: { type: String },
  uploadedAt: { type: Date, default: Date.now }
});

episodeSchema.index({ animeId: 1, episodeNumber: 1 }, { unique: true });

module.exports = mongoose.model('Episode', episodeSchema);
