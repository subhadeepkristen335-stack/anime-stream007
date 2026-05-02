const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  episodeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Episode', required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

commentSchema.index({ episodeId: 1, createdAt: -1 });

module.exports = mongoose.model('Comment', commentSchema);
