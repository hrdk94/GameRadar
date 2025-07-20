import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function GameDetail() {
  const { id } = useParams(); 
  const [game, setGame] = useState(null);

  useEffect(() => {
    const fetchGame = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/games/${id}`);
        const data = await res.json();
        setGame(data);
      } catch (err) {
        console.error('Failed to fetch game:', err);
      }
    };

    fetchGame();
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h1>{game.name}</h1>
      <img src={game.iconUrl} alt={game.name} style={{ width: '200px' }} />
      <p>{game.description}</p>
      <p><strong>Developer:</strong> {game.Developer || 'N/A'}</p>
      <p><strong>Platforms:</strong> {game.platforms || 'N/A'}</p>
      <p><strong>Multiplayer:</strong> {game.isMultiplayer ? 'Yes' : 'No'}</p>
    </div>
  );
}
