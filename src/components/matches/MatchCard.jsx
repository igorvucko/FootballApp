import { formatDate } from '../../utils/formatters';

export const MatchCard = ({ match, homeTeam, awayTeam, onDelete, onEdit }) => {
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

      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
        {onEdit && (
          <button
            type="button"
            className="btn btn--warning btn--sm"
            onClick={() => onEdit(match)}
            aria-label={`Uredi utakmicu ${homeTeam?.name} - ${awayTeam?.name}`}
          >
            Uredi
          </button>
        )}
        {onDelete && (
          <button
            type="button"
            className="btn btn--danger btn--sm"
            onClick={() => onDelete(match)}
            aria-label={`Obriši utakmicu ${homeTeam?.name} - ${awayTeam?.name}`}
          >
            Obriši
          </button>
        )}
      </div>
    </article>
  );
};
