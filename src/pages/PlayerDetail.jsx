import { useParams, Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { playerService } from '../services/playerService';
import { teamService } from '../services/teamService';
import { matchService } from '../services/matchService';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { positionLabel, formatDate, fullName } from '../utils/formatters';

export const PlayerDetail = () => {
  const { id } = useParams();

  const { data: player, loading, error } = useFetch(() => playerService.getById(id), [id]);
  const { data: team } = useFetch(
    () => (player ? teamService.getById(player.teamId) : Promise.resolve(null)),
    [player?.teamId]
  );
  const { data: playerMatches } = useFetch(
    () => matchService.getMatchesForPlayer(id),
    [id]
  );
  const { data: allMatches } = useFetch(() => matchService.getAll());
  const { data: allTeams } = useFetch(() => teamService.getAll());

  if (loading) return <Loader />;
  if (error) {
    return (
      <p className="container" style={{ padding: '2rem' }} role="alert">
        Greška: {error}
      </p>
    );
  }
  if (!player) {
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <p>Igrač nije pronađen.</p>
        <Link to="/players" className="btn btn--secondary">
          ← Natrag
        </Link>
      </div>
    );
  }

  const teamsMap = (allTeams || []).reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {});

  const matchesMap = (allMatches || []).reduce((acc, m) => {
    acc[m.id] = m;
    return acc;
  }, {});

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <Link to="/players" className="btn btn--secondary" style={{ marginBottom: '1rem' }}>
        ← Natrag na igrače
      </Link>

      <div className="card">
        <h1>{fullName(player)}</h1>
        <p>
          <span className="badge">#{player.number}</span>
          <span className="badge badge--secondary">{positionLabel(player.position)}</span>
        </p>
        <p className="card__meta">Godine: {player.age}</p>
        <p className="card__meta">Državljanstvo: {player.nationality || '—'}</p>
        {team && (
          <p className="card__meta">
            Klub:{' '}
            <Link to={`/teams/${team.id}`}>{team.name}</Link>
          </p>
        )}
        <hr style={{ border: 'none', borderTop: '1px solid #dee2e6', margin: '1rem 0' }} />
        <p>⚽ Golovi: <strong>{player.goals ?? 0}</strong></p>
        <p>🎯 Asistencije: <strong>{player.assists ?? 0}</strong></p>
        {player.notes && <p className="card__meta">📝 {player.notes}</p>}
      </div>

      <h2>Utakmice u kojima je nastupio ({playerMatches?.length || 0})</h2>
      {playerMatches?.length === 0 ? (
        <EmptyState icon="📊" message="Nema zabilježenih nastupa." />
      ) : (
        <ul className="player-match-list">
          {(playerMatches || []).map((pm) => {
            const match = matchesMap[pm.matchId];
            if (!match) return null;
            const home = teamsMap[match.homeTeamId];
            const away = teamsMap[match.awayTeamId];
            return (
              <li key={pm.id}>
                <span>
                  {home?.name} {match.homeScore}:{match.awayScore} {away?.name} ·{' '}
                  {formatDate(match.date)}
                </span>
                <span className="badge">{pm.minutesPlayed} min</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
