/**
 * localStorage adapter – zadovoljava kriterij ocjene 3
 * (podaci pohranjeni u localStorage)
 * Koristi se kao fallback ili primarni izvor kad json-server nije aktivan.
 */

const PREFIX = 'footballApp_';

const defaultData = {
  teams: [
    { id: '1', name: 'Dinamo Zagreb', city: 'Zagreb', stadium: 'Maksimir', founded: 1945, logo: '🔵' },
    { id: '2', name: 'Hajduk Split', city: 'Split', stadium: 'Poljud', founded: 1911, logo: '⚪' },
    { id: '3', name: 'Rijeka', city: 'Rijeka', stadium: 'Rujevica', founded: 1946, logo: '⚫' },
    { id: '4', name: 'Osijek', city: 'Osijek', stadium: 'Opus Arena', founded: 1947, logo: '🟡' }
  ],
  players: [
    {
      id: '1',
      firstName: 'Luka',
      lastName: 'Modrić',
      position: 'midfielder',
      number: 10,
      age: 38,
      nationality: 'Hrvatska',
      teamId: '1',
      goals: 5,
      assists: 12,
      notes: 'Kapetan reprezentacije'
    },
    {
      id: '2',
      firstName: 'Marko',
      lastName: 'Livaja',
      position: 'forward',
      number: 10,
      age: 30,
      nationality: 'Hrvatska',
      teamId: '2',
      goals: 15,
      assists: 7,
      notes: ''
    },
    {
      id: '3',
      firstName: 'Ivan',
      lastName: 'Perišić',
      position: 'wing',
      number: 4,
      age: 35,
      nationality: 'Hrvatska',
      teamId: '2',
      goals: 8,
      assists: 9,
      notes: ''
    },
    {
      id: '4',
      firstName: 'Ramón',
      lastName: 'Miélez',
      position: 'forward',
      number: 9,
      age: 28,
      nationality: 'Argentina',
      teamId: '4',
      goals: 12,
      assists: 4,
      notes: ''
    }
  ],
  matches: [
    {
      id: '1',
      homeTeamId: '1',
      awayTeamId: '2',
      homeScore: 2,
      awayScore: 1,
      date: '2026-03-15',
      stadium: 'Maksimir',
      competition: 'HNL'
    },
    {
      id: '2',
      homeTeamId: '3',
      awayTeamId: '1',
      homeScore: 0,
      awayScore: 3,
      date: '2026-03-22',
      stadium: 'Rujevica',
      competition: 'HNL'
    },
    {
      id: '3',
      homeTeamId: '4',
      awayTeamId: '2',
      homeScore: 1,
      awayScore: 1,
      date: '2026-04-05',
      stadium: 'Opus Arena',
      competition: 'HNL'
    }
  ],
  playerMatches: [
    { id: '1', playerId: '1', matchId: '1', minutesPlayed: 90 },
    { id: '2', playerId: '2', matchId: '1', minutesPlayed: 85 },
    { id: '3', playerId: '1', matchId: '2', minutesPlayed: 90 },
    { id: '4', playerId: '4', matchId: '3', minutesPlayed: 78 }
  ]
};

const key = (resource) => `${PREFIX}${resource}`;

const ensureSeed = (resource) => {
  const existing = localStorage.getItem(key(resource));
  if (existing === null) {
    const seed = defaultData[resource] || [];
    localStorage.setItem(key(resource), JSON.stringify(seed));
    return seed;
  }
  return JSON.parse(existing);
};

export const storage = {
  getAll(resource) {
    return ensureSeed(resource);
  },

  getById(resource, id) {
    const items = ensureSeed(resource);
    return items.find((item) => String(item.id) === String(id)) || null;
  },

  create(resource, item) {
    const items = ensureSeed(resource);
    const newItem = { ...item, id: Date.now().toString() };
    items.push(newItem);
    localStorage.setItem(key(resource), JSON.stringify(items));
    return newItem;
  },

  update(resource, id, data) {
    const items = ensureSeed(resource);
    const index = items.findIndex((item) => String(item.id) === String(id));
    if (index === -1) throw new Error('Zapis nije pronađen');
    items[index] = { ...items[index], ...data, id };
    localStorage.setItem(key(resource), JSON.stringify(items));
    return items[index];
  },

  remove(resource, id) {
    const items = ensureSeed(resource);
    const filtered = items.filter((item) => String(item.id) !== String(id));
    localStorage.setItem(key(resource), JSON.stringify(filtered));
  },

  query(resource, predicate) {
    return ensureSeed(resource).filter(predicate);
  },

  reset() {
    Object.keys(defaultData).forEach((r) => {
      localStorage.setItem(key(r), JSON.stringify(defaultData[r]));
    });
  }
};
