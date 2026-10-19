import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { playerService } from '../services/playerService';
import { teamService } from '../services/teamService';
import { PlayerCard } from '../components/players/PlayerCard';
import { PlayerForm } from '../components/players/PlayerForm';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../hooks/useToast';

export const Players = () => {
  const toast = useToast();
  const { data: players, loading, error, refetch } = useFetch(() => playerService.getAll());
  const { data: teams } = useFetch(() => teamService.getAll());

  const [showForm, setShowForm] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [filterTeam, setFilterTeam] = useState('');

  const teamsMap = (teams || []).reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {});

  const filtered = (players || []).filter((p) => {
    const full = `${p.firstName} ${p.lastName}`.toLowerCase();
    const matchesSearch = !search || full.includes(search.toLowerCase());
    const matchesTeam = !filterTeam || String(p.teamId) === String(filterTeam);
    return matchesSearch && matchesTeam;
  });

  const handleSubmit = async (player) => {
    try {
      await playerService.create(player);
      toast.success('Igrač je dodan');
      setShowForm(false);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await playerService.remove(toDelete.id);
      toast.success('Igrač je obrisan');
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
        <h1>👤 Igrači</h1>
        <button type="button" className="btn btn--primary" onClick={() => setShowForm(true)}>
          + Dodaj igrača
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Novi igrač</h2>
          <PlayerForm
            teams={teams || []}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className="filters">
        <div className="form__group" style={{ marginBottom: 0 }}>
          <label htmlFor="search">Pretraži igrače</label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Ime ili prezime..."
          />
        </div>
        <div className="form__group" style={{ marginBottom: 0 }}>
          <label htmlFor="filterTeam">Filtriraj po klubu</label>
          <select
            id="filterTeam"
            value={filterTeam}
            onChange={(e) => setFilterTeam(e.target.value)}
          >
            <option value="">Svi klubovi</option>
            {(teams || []).map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState icon="👤" message="Nema igrača koji odgovaraju kriterijima." />
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <PlayerCard
              key={p.id}
              player={p}
              team={teamsMap[p.teamId]}
              onDelete={setToDelete}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Brisanje igrača"
        message={`Obrisati igrača ${toDelete?.firstName} ${toDelete?.lastName}?`}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
};
