const mongoose = require('mongoose');

const watchHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  episodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
  animeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime', required: true },
  lastWatchedAt: { type: Date, default: Date.now },
  timeStampSeconds: { type: Number, default: 0 },
  duration: { type: Number }
});

watchHistorySchema.index({ userId: 1, episodeId: 1 }, { unique: true });

module.exports = mongoose.model('WatchHistory', watchHistorySchema);
