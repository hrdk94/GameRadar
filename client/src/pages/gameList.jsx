import { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
import ParticlesBackground from '../components/ParticleBackground';

export default function GameList() {
  const [games, setGames] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');

    const fetchGames = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/games?page=${page}&limit=50&search=${encodeURIComponent(search)}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!res.ok) throw new Error("Failed to fetch games");

        const data = await res.json();
        setGames(data.games || []);
        setTotalPages(data.totalPages || 1);

        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.error('Error fetching games:', err);
      }
    };

    fetchGames();
  }, [page, search]);

  return (
    <div>
      <ParticlesBackground />
      <div style={{ padding: '20px', position: 'relative', zIndex: 1 }}>
        <Navbar />

        {/* Search + Pagination */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: '20px 0'
        }}>
          {/* Search bar */}
          <input
             type="text"
  placeholder="Search games..."
  value={search}
  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
  style={{
    flex: 1,
    padding: '10px 15px',
    borderRadius: '8px',
    border: '2px solid #1b2c4fff',
    backgroundColor: '#191308',
    color: '#59D2FE',
    outline: 'none',
    fontWeight: '500',
    fontSize: '16px',
    marginRight:"5px"
  }}
/>

          {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
        </div>

        <h1 style={{ textAlign: 'center', margin: '20px 0' }}>ALL GAMES</h1>

        {/* Game list */}
        <ul style={{ listStyle: 'none', padding: 0, textAlign: 'left', zIndex: 10 }}>
          {games.map((game) => (
            <li key={game._id} style={{ marginBottom: '30px', display: 'flex', alignItems: 'center' }}>
              <img src={game.iconUrl} alt={game.name} style={{ width: '100px', marginRight: '20px' }} />
              <div>
                <Link to={`/games/${game._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <h3>{game.name}</h3>
                </Link>
                <p>{game.description?.slice(0, 200)}...</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent:"center", gap: '12px' }}>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
            <span>Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Next</button>
          </div>
    </div>
  );
};
