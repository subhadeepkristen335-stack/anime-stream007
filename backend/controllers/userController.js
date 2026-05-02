const WatchHistory = require('../models/WatchHistory');
const Like = require('../models/Like');
const Watchlist = require('../models/Watchlist');
const Comment = require('../models/Comment');

// Watch History
const saveWatchProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { episodeId, animeId, timeStampSeconds, duration } = req.body;

    if (!episodeId || !animeId) {
      return res.status(400).json({ message: 'episodeId and animeId required' });
    }

    const watchHistory = await WatchHistory.findOneAndUpdate(
      { userId, episodeId },
      { lastWatchedAt: new Date(), timeStampSeconds, duration },
      { upsert: true, new: true }
    );

    res.json({ message: 'Watch progress saved', watchHistory });
  } catch (error) {
    res.status(500).json({ message: 'Failed to save watch progress', error: error.message });
  }
};

const getWatchHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    const history = await WatchHistory.find({ userId })
      .populate('animeId', 'title posterUrl')
      .populate('episodeId', 'episodeNumber title')
      .sort({ lastWatchedAt: -1 });

    res.json(history);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch watch history', error: error.message });
  }
};

// Likes
const toggleLike = async (req, res) => {
  try {
    const userId = req.user.id;
    const { episodeId } = req.body;

    if (!episodeId) {
      return res.status(400).json({ message: 'episodeId required' });
    }

    const existingLike = await Like.findOne({ userId, episodeId });

    if (existingLike) {
      await Like.deleteOne({ _id: existingLike._id });
      return res.json({ message: 'Like removed', liked: false });
    }

    const like = new Like({ userId, episodeId });
    await like.save();
    res.json({ message: 'Episode liked', liked: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to toggle like', error: error.message });
  }
};

const getLikeCount = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const count = await Like.countDocuments({ episodeId });
    const userLiked = req.user ? await Like.findOne({ userId: req.user.id, episodeId }) : null;

    res.json({ count, userLiked: !!userLiked });
  } catch (error) {
    res.status(500).json({ message: 'Failed to get like count', error: error.message });
  }
};

// Watchlist
const addToWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { animeId } = req.body;

    if (!animeId) {
      return res.status(400).json({ message: 'animeId required' });
    }

    const watchlist = await Watchlist.findOneAndUpdate(
      { userId, animeId },
      { addedAt: new Date() },
      { upsert: true, new: true }
    );

    res.json({ message: 'Added to watchlist', watchlist });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add to watchlist', error: error.message });
  }
};

const removeFromWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { animeId } = req.params;

    await Watchlist.deleteOne({ userId, animeId });
    res.json({ message: 'Removed from watchlist' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to remove from watchlist', error: error.message });
  }
};

const getWatchlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const watchlist = await Watchlist.find({ userId })
      .populate('animeId')
      .sort({ addedAt: -1 });

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch watchlist', error: error.message });
  }
};

// Comments
const addComment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { episodeId, content } = req.body;

    if (!episodeId || !content) {
      return res.status(400).json({ message: 'episodeId and content required' });
    }

    const comment = new Comment({ userId, episodeId, content });
    await comment.save();
    await comment.populate('userId', 'username');

    res.status(201).json({ message: 'Comment added', comment });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
};

const getComments = async (req, res) => {
  try {
    const { episodeId } = req.params;
    const comments = await Comment.find({ episodeId })
      .populate('userId', 'username')
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch comments', error: error.message });
  }
};

module.exports = {
  saveWatchProgress,
  getWatchHistory,
  toggleLike,
  getLikeCount,
  addToWatchlist,
  removeFromWatchlist,
  getWatchlist,
  addComment,
  getComments
};
