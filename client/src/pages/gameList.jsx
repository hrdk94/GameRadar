import { useEffect, useState } from 'react';

export default function GameList() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/games');
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error('Error fetching games:', err);
      }
    };

    fetchGames();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>All Games</h1>
      <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left' }}>
        {games.map((game) => (
          <li
            key={game._id}
            style={{
              marginBottom: '30px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img
              src={game.iconUrl}
              alt={game.name}
              style={{ width: '100px', marginRight: '20px' }}
            />
            <div>
              <h3>{game.name}</h3>
              <p>{game.description?.slice(0, 200)}...</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
