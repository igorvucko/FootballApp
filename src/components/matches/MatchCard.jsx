import { formatDate } from '../../utils/formatters';

export const MatchCard = ({ match, homeTeam, awayTeam, onDelete }) => {
  const { id, homeScore, awayScore, competition, date, stadium } = match;

  return (
    <article className="card" aria-labelledby={`match-${id}`}>
      <h3 id={`match-${id}`} className="card__title">
        {homeTeam?.name || '???'}{' '}
        <span className="score">
          {homeScore} : {awayScore}
        </span>{' '}
        {awayTeam?.name || '???'}
      </h3>
      <p className="card__meta">🏆 {competition}</p>
      <p className="card__meta">📅 {formatDate(date)}</p>
      <p className="card__meta">🏟️ {stadium || '—'}</p>

      <div style={{ marginTop: '1rem' }}>
        <button
          type="button"
          className="btn btn--danger btn--sm"
          onClick={() => onDelete(match)}
          aria-label={`Obriši utakmicu ${homeTeam?.name} - ${awayTeam?.name}`}
        >
          Obriši
        </button>
      </div>
    </article>
  );
};
