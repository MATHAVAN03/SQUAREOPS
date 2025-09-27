export default function LaunchDetail({ launch, onClose }) {
  return (
    <div className="modal">
      <button onClick={onClose}>Close</button>
      <img src={launch.links.patch.large} alt="Mission patch" />
      <h2>{launch.name}</h2>
      <p>{launch.details || 'No details available.'}</p>
      <div className="links">
        {launch.links.article && <a href={launch.links.article}>Article</a>}
        {launch.links.wikipedia && <a href={launch.links.wikipedia}>Wikipedia</a>}
        {launch.links.webcast && <a href={launch.links.webcast}>Webcast</a>}
      </div>
    </div>
  );
}