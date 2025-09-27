import React, { useEffect, useState } from 'react';
import { fetchLaunches } from '../api';
import LaunchCard from '../components/LaunchCard';
import LaunchDetail from '../components/LaunchDetail';

export default function Favorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });
  const [launches, setLaunches] = useState([]);
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaunches()
      .then((res) => {
        const favLaunches = res.data.filter((l) => favorites.includes(l.id));
        setLaunches(favLaunches);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [favorites]);

  const toggleFavorite = (id) => {
    const updated = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (loading) return <p>Loading favorites...</p>;
  if (launches.length === 0) return <p>No favorites saved yet.</p>;

  return (
    <main>
      <h1>⭐ Your Favorite Launches</h1>
      <div className="launch-grid">
        {launches.map((launch) => (
          <LaunchCard
            key={launch.id}
            launch={launch}
            onClick={() => setSelectedLaunch(launch)}
            isFavorite={favorites.includes(launch.id)}
            toggleFavorite={toggleFavorite}
          />
        ))}
      </div>
      {selectedLaunch && (
        <LaunchDetail
          launch={selectedLaunch}
          onClose={() => setSelectedLaunch(null)}
        />
      )}
    </main>
  );
}