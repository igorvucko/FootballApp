import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { matchService } from '../services/matchService';
import { teamService } from '../services/teamService';
import { playerService } from '../services/playerService';
import { MatchCard } from '../components/matches/MatchCard';
import { MatchForm } from '../components/matches/MatchForm';
import { Loader } from '../components/ui/Loader';
import { EmptyState } from '../components/ui/EmptyState';
import { ConfirmDialog } from '../components/ui/ConfirmDialog';
import { useToast } from '../hooks/useToast';
import { useAuth } from '../hooks/useAuth';
import { fullName } from '../utils/formatters';

export const Matches = () => {
  const toast = useToast();
  const { isLoggedIn } = useAuth();
  const { data: matches, loading, error, refetch } = useFetch(() => matchService.getAll());
  const { data: teams } = useFetch(() => teamService.getAll());
  const { data: players } = useFetch(() => playerService.getAll());
  const { refetch: refetchPM } = useFetch(() => matchService.getPlayerMatches());

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [linkMatch, setLinkMatch] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [minutes, setMinutes] = useState(90);

  const teamsMap = (teams || []).reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {});

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (match) => {
    setEditing(match);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
  };

  const handleSubmit = async (matchData) => {
    try {
      if (editing) {
        await matchService.update(editing.id, { ...editing, ...matchData });
        toast.success('Utakmica je uspješno ažurirana');
      } else {
        await matchService.create(matchData);
        toast.success('Utakmica je dodana');
      }
      closeForm();
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await matchService.remove(toDelete.id);
      toast.success('Utakmica je obrisana');
      setToDelete(null);
      refetch();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleAddPlayerToMatch = async () => {
    if (!selectedPlayer || !linkMatch) return;
    try {
      await matchService.addPlayerToMatch(selectedPlayer, linkMatch.id, Number(minutes) || 0);
      toast.success('Igrač dodan na utakmicu');
      setLinkMatch(null);
      setSelectedPlayer('');
      setMinutes(90);
      refetchPM();
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
        <h1>📊 Utakmice</h1>
        {isLoggedIn ? (
          <button type="button" className="btn btn--primary" onClick={openCreate}>
            + Dodaj utakmicu
          </button>
        ) : (
          <Link to="/login" className="btn btn--secondary">
            Prijavi se za uređivanje
          </Link>
        )}
      </div>

      {showForm && isLoggedIn && (
        <div className="card">
          <h2>{editing ? 'Uredi utakmicu' : 'Nova utakmica'}</h2>
          <MatchForm
            teams={teams || []}
            initial={editing}
            onSubmit={handleSubmit}
            onCancel={closeForm}
          />
        </div>
      )}

      {matches?.length === 0 ? (
        <EmptyState icon="📊" message="Nema utakmica." />
      ) : (
        <div className="grid">
          {matches.map((m) => (
            <div key={m.id}>
              <MatchCard
                match={m}
                homeTeam={teamsMap[m.homeTeamId]}
                awayTeam={teamsMap[m.awayTeamId]}
                onDelete={isLoggedIn ? setToDelete : undefined}
                onEdit={isLoggedIn ? openEdit : undefined}
              />
              {isLoggedIn && (
                <button
                  type="button"
                  className="btn btn--secondary btn--sm"
                  style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}
                  onClick={() => setLinkMatch(m)}
                >
                  + Igrač na utakmicu (n:n)
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {linkMatch && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="link-title"
          onClick={() => setLinkMatch(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 id="link-title">Dodaj igrača na utakmicu</h2>
            <p>
              {teamsMap[linkMatch.homeTeamId]?.name} vs {teamsMap[linkMatch.awayTeamId]?.name}
            </p>
            <div className="form__group">
              <label htmlFor="playerSelect">Igrač</label>
              <select
                id="playerSelect"
                value={selectedPlayer}
                onChange={(e) => setSelectedPlayer(e.target.value)}
              >
                <option value="">-- Odaberi --</option>
                {(players || []).map((p) => (
                  <option key={p.id} value={p.id}>
                    {fullName(p)}
                  </option>
                ))}
              </select>
            </div>
            <div className="form__group">
              <label htmlFor="minutes">Minute</label>
              <input
                id="minutes"
                type="number"
                min="0"
                max="120"
                value={minutes}
                onChange={(e) => setMinutes(e.target.value)}
              />
            </div>
            <div className="modal__actions">
              <button type="button" className="btn btn--secondary" onClick={() => setLinkMatch(null)}>
                Odustani
              </button>
              <button
                type="button"
                className="btn btn--primary"
                onClick={handleAddPlayerToMatch}
                disabled={!selectedPlayer}
              >
                Spremi
              </button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!toDelete}
        title="Brisanje utakmice"
        message="Jesi li siguran da želiš obrisati ovu utakmicu?"
        onConfirm={handleDelete}
        onCancel={() => setToDelete(null)}
      />
    </div>
  );
};
