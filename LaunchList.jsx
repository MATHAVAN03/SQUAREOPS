import React, { useEffect, useState } from 'react';
import { fetchLaunches } from '../api';
import LaunchCard from './LaunchCard';
import Filters from './Filters';
import LaunchDetail from './LaunchDetail';

export default function LaunchList() {
  const [launches, setLaunches] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ search: '', year: '', successOnly: false });
  const [selectedLaunch, setSelectedLaunch] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem('favorites')) || [];
  });

  useEffect(() => {
    fetchLaunches()
      .then((res) => {
        setLaunches(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load launches');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let result = launches;

    if (filters.search) {
      result = result.filter((l) =>
        l.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.year) {
      result = result.filter((l) =>
        new Date(l.date_utc).getFullYear().toString() === filters.year
      );
    }

    if (filters.successOnly) {
      result = result.filter((l) => l.success);
    }

    setFiltered(result);
  }, [filters, launches]);

  const toggleFavorite = (id) => {
    let updated;
    if (favorites.includes(id)) {
      updated = favorites.filter((fav) => fav !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  if (loading) return <p>Loading launches...</p>;
  if (error) return <p>{error}</p>;
  if (filtered.length === 0) return <p>No launches match your filters.</p>;

  return (
    <div>
      <Filters filters={filters} setFilters={setFilters} />
      <div className="launch-grid">
        {filtered.map((launch) => (
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
    </div>
  );
}