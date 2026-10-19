import { Link } from 'react-router-dom';
import { positionLabel, fullName } from '../../utils/formatters';

export const PlayerCard = ({ player, team, onDelete }) => {
  const { id, firstName, lastName, number, position, age, nationality, goals, assists } = player;

  return (
    <article className="card" aria-labelledby={`player-${id}`}>
      <h3 id={`player-${id}`} className="card__title">
        {firstName} {lastName}
      </h3>
      <p>
        <span className="badge">#{number}</span>
        <span className="badge badge--secondary">{positionLabel(position)}</span>
      </p>
      <p className="card__meta">Godine: {age}</p>
      <p className="card__meta">Država: {nationality || '—'}</p>
      {team && <p className="card__meta">Klub: {team.name}</p>}
      <p className="card__meta">
        ⚽ {goals ?? 0} golova · 🎯 {assists ?? 0} asistencija
      </p>

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        <Link to={`/players/${id}`} className="btn btn--primary btn--sm">
          Detalji
        </Link>
        <button
          type="button"
          className="btn btn--danger btn--sm"
          onClick={() => onDelete(player)}
          aria-label={`Obriši igrača ${fullName(player)}`}
        >
          Obriši
        </button>
      </div>
    </article>
  );
};
