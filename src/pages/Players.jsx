import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { playerService } from '../services/playerService';
import { teamService } from '../services/teamService';
import { PlayerCard } from '../components/players/PlayerCard';
import { PlayerForm } from '../components/players/PlayerForm';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';

export const Players = () => {
  const toast = useToast();
  const { isLoggedIn } = useAuth();
  const { data: players, loading, error, refetch } = useFetch(() => playerService.getAll());
  const { data: teams } = useFetch(() => teamService.getAll());

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [search, setSearch] = useState('');
  const [filterTeam, setFilterTeam] = useState('');

  const playersList = Array.isArray(players) ? players : [];
  const teamsList = Array.isArray(teams) ? teams : [];

  const teamsMap = teamsList.reduce((acc, t) => {
    if (t?.id != null) acc[t.id] = t;
    return acc;
  }, {});

  const filtered = playersList.filter((p) => {
    if (!p) return false;
    const full = `${p.firstName || ''} ${p.lastName || ''}`.toLowerCase();
    const matchesSearch = !search || full.includes(search.toLowerCase());
    const matchesTeam = !filterTeam || String(p.teamId) === String(filterTeam);
    return matchesSearch && matchesTeam;
  });

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (player) => {
    setEditing(player);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleSubmit = async (playerData) => {
    try {
      if (editing) {
        await playerService.update(editing.id, { ...editing, ...playerData });
        toast.success('Igrač je uspješno ažuriran');
      } else {
        await playerService.create(playerData);
        toast.success('Igrač je dodan');
      }
      closeForm();
      refetch();
    } catch (err) {
      toast.error(err.message || 'Greška pri spremanju');
    }
  };

  const handleDelete = async () => {
    if (!toDelete?.id) return;
    try {
      await playerService.remove(toDelete.id);
      toast.success('Igrač je obrisan');
      setToDelete(null);
      refetch();
    } catch (err) {
      toast.error(err.message || 'Greška pri brisanju');
    }
  };

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="container" style={{ padding: '2rem' }}>
        <p role="alert">Greška: {error}</p>
        <button type="button" className="btn btn--primary" onClick={() => refetch()}>
          Pokušaj ponovo
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 1rem' }}>
      <div className="page-header">
        <h1>👤 Igrači</h1>
        {isLoggedIn ? (
          <button type="button" className="btn btn--primary" onClick={openCreate}>
            + Dodaj igrača
          </button>
        ) : (
          <Link to="/login" className="btn btn--secondary">
            Prijavi se za uređivanje
          </Link>
        )}
      </div>

      {showForm && isLoggedIn && (
        <div className="card">
          <h2>{editing ? 'Uredi igrača' : 'Novi igrač'}</h2>
          <PlayerForm
            teams={teamsList}
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={closeForm}
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
            {teamsList.map((t) => (
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
              onDelete={isLoggedIn ? setToDelete : undefined}
              onEdit={isLoggedIn ? openEdit : undefined}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Brisanje igrača"
        message={`Obrisati igrača ${toDelete?.firstName || ''} ${toDelete?.lastName || ''}?`}
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
};
