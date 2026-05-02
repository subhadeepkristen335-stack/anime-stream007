const Episode = require('../models/Episode');
const Anime = require('../models/Anime');

const uploadEpisode = async (req, res) => {
  try {
    const animeId = req.params.id || req.body.animeId;
    const { episodeNumber, title, youtubeVideoId, description } = req.body;

    if (!animeId || !episodeNumber || !title || !youtubeVideoId) {
      return res.status(400).json({ message: 'animeId, episodeNumber, title, and youtubeVideoId required' });
    }

    const anime = await Anime.findById(animeId);
    if (!anime) {
      return res.status(404).json({ message: 'Anime not found' });
    }

    const episode = new Episode({
      animeId,
      episodeNumber,
      title,
      youtubeVideoId,
      description
    });

    await episode.save();

    if (episodeNumber > anime.totalEpisodes) {
      anime.totalEpisodes = episodeNumber;
      await anime.save();
    }

    res.status(201).json({ message: 'Episode uploaded', episode });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload episode', error: error.message });
  }
};

const getEpisodeById = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findById(id).populate('animeId');

    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    res.json(episode);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch episode', error: error.message });
  }
};

const deleteEpisode = async (req, res) => {
  try {
    const { id } = req.params;
    const episode = await Episode.findByIdAndDelete(id);

    if (!episode) {
      return res.status(404).json({ message: 'Episode not found' });
    }

    res.json({ message: 'Episode deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete episode', error: error.message });
  }
};

module.exports = {
  uploadEpisode,
  getEpisodeById,
  deleteEpisode
};
