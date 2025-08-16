import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { fetchComments, postComment } from '../api/comment';
import { useNavigate } from 'react-router-dom';
import ParticlesBackground from '../components/ParticleBackground';

export default function GameDetail() {
  const { id } = useParams();
  const [game, setGame] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchGameAndComments = async () => {
      try {
        // Fetch game data
        const res = await fetch(`http://localhost:5000/api/games/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const gameData = await res.json();
        setGame(gameData);

        // Fetch comments
        const fetchedComments = await fetchComments(id);
        setComments(fetchedComments);
      } catch (err) {
        console.error('Failed to load game or comments:', err);
      }
    };

    fetchGameAndComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const saved = await postComment(id, newComment);
      setComments((prev) => [...prev, saved]);
      setNewComment('');
    } catch (err) {
      console.error('Error posting comment:', err);
    }
  };

  if (!game) return <p>Loading...</p>;

  return (
    <div style={{ position: 'relative' }}>
      {/* Particles Background */}
      <ParticlesBackground
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0
        }}
      />

      {/* Main Content */}
      <div style={{ padding: '20px', textAlign: 'left', zIndex: 10, position: 'relative' }}>
        <Navbar />

        <h1>{game.name}</h1>
        <img src={game.iconUrl} alt={game.name} style={{ width: '200px' }} />
        <p>{game.description}</p>
        <p><strong>Developer:</strong> {game.Developer || 'Not Available'}</p>
        <p><strong>Platforms:</strong> {game.platforms || 'Not Available'}</p>
        <p><strong>Multiplayer:</strong> {game.isMultiplayer ? 'Yes' : 'No'}</p>
        <p><strong>Genres:</strong> {game.genres && game.genres.length ? game.genres.join(", ") : 'Not Available'}</p>
        <p><strong>Rating:</strong> {game.rating ?? 'Not Available'}</p>

        {/* YouTube Trailer */}
        {game.trailer ? (
          <div
            style={{
              marginTop: '20px',
              backgroundColor: '#000',
              padding: '10px',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${game.trailer.split('v=')[1]}`}
              title="Game Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ backgroundColor: '#000' }}
            ></iframe>
          </div>
        ) : (
          <p>No trailer available</p>
        )}

        <hr />

        <h2>Comments</h2>
        <form onSubmit={handleCommentSubmit} style={{ marginBottom: '20px' }}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows="3"
            style={{ width: '100%', padding: '10px', resize: 'none' }}
            placeholder="Write your comment..."
          />
          <button type="submit" style={{ marginTop: '10px' }}>Post Comment</button>
        </form>

        <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
          {comments.length === 0 && <li>No comments yet.</li>}
          {comments.map((comment) => (
            <li
              key={comment._id}
              style={{
                marginBottom: '10px',
                padding: '10px',
                background: 'rgb(19 19 19)',
                borderRadius: '5px'
              }}
            >
              <strong>{comment.username || 'Anonymous'}</strong>:<br />
              {comment.text}
              <div style={{ fontSize: '12px', color: '#555' }}>
                {new Date(comment.postedAt).toLocaleString()}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
