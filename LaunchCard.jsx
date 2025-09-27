export default function LaunchCard({ launch, onClick, isFavorite, toggleFavorite }) {
  return (
    <div className="card" onClick={() => onClick(launch)}>
      <img src={launch.links.patch.small} alt={`${launch.name} patch`} />
      <h3>{launch.name}</h3>
      <p>{new Date(launch.date_utc).toLocaleDateString()}</p>
      <button onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(launch.id);
      }}>
        {isFavorite ? '★' : '☆'}
      </button>
    </div>
  );
}