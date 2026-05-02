import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { episodeAPI, userAPI } from '../api/apiClient';
import { useAuth } from '../context/AuthContext';
import './Watch.css';

export default function Watch() {
  const { episodeId } = useParams();
  const { user } = useAuth();
  const [episode, setEpisode] = useState(null);
  const [comments, setComments] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [userLiked, setUserLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEpisodeDetails();
    fetchComments();
    fetchLikeCount();
  }, [episodeId]);

  useEffect(() => {
    if (!user || !episode) return;

    const saveProgress = async () => {
      try {
        await userAPI.saveWatchProgress(
          episodeId,
          episode.animeId,
          0,
          0
        );
      } catch (err) {
        console.error('Failed to save progress:', err);
      }
    };

    const interval = setInterval(saveProgress, 10000);
    window.addEventListener('beforeunload', saveProgress);

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', saveProgress);
    };
  }, [user, episode, episodeId]);

  const fetchEpisodeDetails = async () => {
    try {
      const response = await episodeAPI.getEpisodeById(episodeId);
      setEpisode(response.data);
    } catch (err) {
      setError('Failed to load episode');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await userAPI.getComments(episodeId);
      setComments(response.data);
    } catch (err) {
      console.error('Failed to load comments:', err);
    }
  };

  const fetchLikeCount = async () => {
    try {
      const response = await userAPI.getLikeCount(episodeId);
      setLikeCount(response.data.count);
      setUserLiked(response.data.userLiked);
    } catch (err) {
      console.error('Failed to load likes:', err);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('Please login to comment');
      return;
    }

    if (!newComment.trim()) return;

    try {
      await userAPI.addComment(episodeId, newComment);
      setNewComment('');
      fetchComments();
    } catch (err) {
      alert('Failed to add comment');
    }
  };

  const handleToggleLike = async () => {
    if (!user) {
      alert('Please login to like');
      return;
    }

    try {
      await userAPI.toggleLike(episodeId);
      fetchLikeCount();
    } catch (err) {
      alert('Failed to toggle like');
    }
  };

  if (loading) return <div className="container">Loading...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!episode) return <div className="container">Episode not found</div>;

  return (
    <div className="watch-page">
      <div className="video-container">
        <iframe
          width="100%"
          height="600"
          src={`https://www.youtube.com/embed/${episode.youtubeVideoId}`}
          title={episode.title}
          allowFullScreen
        ></iframe>
      </div>

      <div className="watch-content">
        <div className="episode-info">
          <h1>Episode {episode.episodeNumber}: {episode.title}</h1>
          {episode.description && <p className="description">{episode.description}</p>}
          <div className="actions">
            <button
              className={`btn-like ${userLiked ? 'liked' : ''}`}
              onClick={handleToggleLike}
            >
              ♥ {likeCount} Likes
            </button>
          </div>
        </div>

        <div className="comments-section">
          <h2>Comments ({comments.length})</h2>

          {user && (
            <form className="comment-form" onSubmit={handleAddComment}>
              <input
                type="text"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                required
              />
              <button type="submit">Post</button>
            </form>
          )}

          {!user && <p className="login-prompt"><a href="/login">Login</a> to comment</p>}

          <div className="comments-list">
            {comments.map(comment => (
              <div key={comment._id} className="comment">
                <strong>{comment.userId?.username || 'User'}</strong>
                <p>{comment.content}</p>
                <small>{new Date(comment.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
