import api from './api';

const RESOURCE = 'matches';
const PM_RESOURCE = 'playerMatches';

export const matchService = {
  getAll: () => api.get(RESOURCE),

  getById: (id) => api.get(RESOURCE, id),

  create: (match) => api.post(RESOURCE, match),

  update: (id, match) => api.put(RESOURCE, id, match),

  remove: (id) => api.delete(RESOURCE, id),

  // ========== n:n veza igrači ↔ utakmice ==========
  getPlayerMatches: () => api.get(PM_RESOURCE),

  getPlayersForMatch: (matchId) =>
    api.getWhere(PM_RESOURCE, (pm) => String(pm.matchId) === String(matchId)),

  getMatchesForPlayer: (playerId) =>
    api.getWhere(PM_RESOURCE, (pm) => String(pm.playerId) === String(playerId)),

  addPlayerToMatch: (playerId, matchId, minutesPlayed = 0) =>
    api.post(PM_RESOURCE, { playerId, matchId, minutesPlayed }),

  removePlayerFromMatch: (id) => api.delete(PM_RESOURCE, id)
};
