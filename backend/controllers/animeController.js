const Anime = require('../models/Anime');
const Episode = require('../models/Episode');

const createAnime = async (req, res) => {
  try {
    const { title, description, genre, posterUrl, totalEpisodes } = req.body;

    if (!title || !description) {
      return res.status(400).json({ message: 'Title and description required' });
    }

    const anime = new Anime({
      title,
      description,
      genre: genre || [],
      posterUrl,
      totalEpisodes: totalEpisodes || 0
    });

    await anime.save();
    res.status(201).json({ message: 'Anime created', anime });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create anime', error: error.message });
  }
};

const updateAnime = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    updates.updatedAt = new Date();

    const anime = await Anime.findByIdAndUpdate(id, updates, { new: true });
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    res.json({ message: 'Anime updated', anime });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update anime', error: error.message });
  }
};

const deleteAnime = async (req, res) => {
  try {
    const { id } = req.params;

    await Anime.findByIdAndDelete(id);
    await Episode.deleteMany({ animeId: id });

    res.json({ message: 'Anime deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete anime', error: error.message });
  }
};

const getAllAnimes = async (req, res) => {
  try {
    const animes = await Anime.find().sort({ createdAt: -1 });
    res.json(animes);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch animes', error: error.message });
  }
};

const getAnimeById = async (req, res) => {
  try {
    const { id } = req.params;
    const anime = await Anime.findById(id);

    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    const episodes = await Episode.find({ animeId: id }).sort({ episodeNumber: 1 });
    res.json({ ...anime.toObject(), episodes });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch anime', error: error.message });
  }
};

module.exports = {
  createAnime,
  updateAnime,
  deleteAnime,
  getAllAnimes,
  getAnimeById
};
