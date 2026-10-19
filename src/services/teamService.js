import api from './api';

const RESOURCE = 'teams';

export const teamService = {
  getAll: () => api.get(RESOURCE),

  getById: (id) => api.get(RESOURCE, id),

  create: (team) => api.post(RESOURCE, team),

  update: (id, team) => api.put(RESOURCE, id, team),

  remove: (id) => api.delete(RESOURCE, id)
};
