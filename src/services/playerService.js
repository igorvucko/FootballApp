import api from './api';

const RESOURCE = 'players';

export const playerService = {
  getAll: () => api.get(RESOURCE),

  getById: (id) => api.get(RESOURCE, id),

  getByTeam: (teamId) =>
    api.getWhere(RESOURCE, (p) => String(p.teamId) === String(teamId)),

  create: (player) => api.post(RESOURCE, player),

  update: (id, player) => api.put(RESOURCE, id, player),

  remove: (id) => api.delete(RESOURCE, id)
};
