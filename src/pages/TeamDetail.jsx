import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { teamService } from '../services/teamService';
import { playerService } from '../services/playerService';
import { Loader } from '../components/ui/Loader';
import { PlayerCard } from '../components/players/PlayerCard';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../hooks/useToast';

export const TeamDetail = () => {
  const { id } = useParams();
  const toast = useToast();

  const { data: team, loading, error } = useFetch(() => teamService.getById(id), [id]);
  const { data: players, refetch: refetchPlayers } = useFetch(
    () => playerService.getByTeam(id),
    [id]
  );

  const [toDelete, setToDelete] = useState(null);

  const handleDeletePlayer = async () => {
    try {
      await playerService.remove(toDelete.id);
      toast.success('Igrač obrisan');
      setToDelete(null);
      refetchPlayers();
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading) return <Loader />;
  if (error) {
    return (
      <p className="container" style={{ padding: '2rem' }} role="alert">
        Greška: {error}
      </p>
    );
  }
  if (!team) {
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <p>Klub nije pronađen.</p>
        <Link to="/teams" className="btn btn--secondary">
          ← Natrag
        </Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <Link to="/teams" className="btn btn--secondary" style={{ marginBottom: '1rem' }}>
        ← Natrag na klubove
      </Link>

      <div className="card">
        <h1>
          {team.logo} {team.name}
        </h1>
        <p className="card__meta">🏟️ {team.stadium || '—'}</p>
        <p className="card__meta">📍 {team.city}</p>
        <p className="card__meta">📅 Osnovan: {team.founded}</p>
      </div>

      <h2>Igrači ({players?.length || 0})</h2>

      {players?.length === 0 ? (
        <EmptyState icon="👤" message="Nema igrača u ovom klubu." />
      ) : (
        <div className="grid">
          {players.map((p) => (
            <PlayerCard key={p.id} player={p} team={team} onDelete={setToDelete} />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Brisanje igrača"
        message={`Obrisati igrača ${toDelete?.firstName} ${toDelete?.lastName}?`}
        onConfirm={handleDeletePlayer}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
};
