import { useState } from 'react';
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
import { fullName } from '../utils/formatters';

export const Matches = () => {
  const toast = useToast();
  const { data: matches, loading, error, refetch } = useFetch(() => matchService.getAll());
  const { data: teams } = useFetch(() => teamService.getAll());
  const { data: players } = useFetch(() => playerService.getAll());
  const { data: playerMatches, refetch: refetchPM } = useFetch(() =>
    matchService.getPlayerMatches()
  );

  const [showForm, setShowForm] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const [linkMatch, setLinkMatch] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [minutes, setMinutes] = useState(90);

  const teamsMap = (teams || []).reduce((acc, t) => {
    acc[t.id] = t;
    return acc;
  }, {});

  const handleSubmit = async (match) => {
    try {
      await matchService.create(match);
      toast.success('Utakmica je dodana');
      setShowForm(false);
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
        <button type="button" className="btn btn--primary" onClick={() => setShowForm(true)}>
          + Dodaj utakmicu
        </button>
      </div>

      {showForm && (
        <div className="card">
          <h2>Nova utakmica</h2>
          <MatchForm
            teams={teams || []}
            onSubmit={handleSubmit}
            onCancel={() => setShowForm(false)}
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
                onDelete={setToDelete}
              />
              <button
                type="button"
                className="btn btn--secondary btn--sm"
                style={{ marginTop: '-0.5rem', marginBottom: '1rem' }}
                onClick={() => setLinkMatch(m)}
              >
                + Igrač na utakmicu (n:n)
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal za n:n povezivanje igrač ↔ utakmica */}
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
