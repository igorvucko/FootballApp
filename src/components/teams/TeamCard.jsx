import { Link } from 'react-router-dom';

export const TeamCard = ({ team, playerCount = 0, onDelete, onEdit }) => {
  const { id, name, logo, stadium, city, founded } = team;

  return (
    <article className="card" aria-labelledby={`team-${id}`}>
      <h3 id={`team-${id}`} className="card__title">
        {logo} {name}
      </h3>
      <p className="card__meta">🏟️ {stadium || '—'}</p>
      <p className="card__meta">📍 {city}</p>
      <p className="card__meta">📅 Osnovan: {founded}</p>
      <p className="card__meta">👥 Igrača: {playerCount}</p>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <Link to={`/teams/${id}`} className="btn btn--primary btn--sm">
          Detalji
        </Link>
        <button type="button" className="btn btn--warning btn--sm" onClick={() => onEdit(team)}>
          Uredi
        </button>
        <button
          type="button"
          className="btn btn--danger btn--sm"
          onClick={() => onDelete(team)}
          aria-label={`Obriši klub ${name}`}
        >
          Obriši
        </button>
      </div>
    </article>
  );
};
