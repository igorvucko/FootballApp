import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { teamService } from '../services/teamService';
import { playerService } from '../services/playerService';
import { TeamCard } from '../components/teams/TeamCard';
import { TeamForm } from '../components/teams/TeamForm';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../hooks/useToast';

export const Teams = () => {
  const toast = useToast();
  const { data: teams, loading, error, refetch } = useFetch(() => teamService.getAll());
  const { data: players } = useFetch(() => playerService.getAll());

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);

  const playersByTeam = (teams || []).reduce((acc, team) => {
    acc[team.id] = (players || []).filter((p) => String(p.teamId) === String(team.id)).length;
    return acc;
  }, {});

  const handleSubmit = async (teamData) => {
    try {
      if (editing) {
        await teamService.update(editing.id, { ...editing, ...teamData });
        toast.success('Klub je uspješno ažuriran');
      } else {
        await teamService.create(teamData);
        toast.success('Klub je uspješno dodan');
      }
      setShowForm(false);
      setEditing(null);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!toDelete) return;
    try {
      await teamService.remove(toDelete.id);
      toast.success('Klub je obrisan');
      setToDelete(null);
      refetch();
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

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div className="page-header">
        <h1>🏟️ Klubovi</h1>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            setEditing(null);
            setShowForm(true);
          }}
        >
          + Dodaj klub
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>{editing ? 'Uredi klub' : 'Novi klub'}</h2>
          <TeamForm
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      {teams?.length === 0 ? (
        <EmptyState icon="🏟️" message="Nema klubova. Dodaj prvi klub!" />
      ) : (
        <div className="grid">
          {teams.map((team) => (
            <TeamCard
              key={team.id}
              team={team}
              playerCount={playersByTeam[team.id]}
              onDelete={setToDelete}
              onEdit={(t) => {
                setEditing(t);
                setShowForm(true);
              }}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Brisanje kluba"
        message={`Jesi li siguran da želiš obrisati klub „${toDelete?.name}”?`}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
};
