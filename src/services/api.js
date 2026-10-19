/**
 * API sloj – koristi localStorage (ocjena 3) kao primarni izvor.
 * Ako želiš json-server (ocjena 5), postavi USE_JSON_SERVER = true
 * i pokreni `npm run server`.
 */

import { storage } from './storage';

// Postavi na true ako želiš koristiti json-server + axios
const USE_JSON_SERVER = false;

let axiosInstance = null;

if (USE_JSON_SERVER) {
  // Dinamički import samo kad treba
  import('axios').then(({ default: axios }) => {
    axiosInstance = axios.create({
      baseURL: '/api',
      timeout: 10000,
      headers: { 'Content-Type': 'application/json' }
    });
  });
}

const delay = (ms = 200) => new Promise((r) => setTimeout(r, ms));

/** Generic CRUD preko localStorage */
const localApi = {
  async get(resource, id) {
    await delay();
    if (id) {
      const item = storage.getById(resource, id);
      if (!item) throw new Error('Zapis nije pronađen');
      return item;
    }
    return storage.getAll(resource);
  },

  async getWhere(resource, predicate) {
    await delay();
    return storage.query(resource, predicate);
  },

  async post(resource, data) {
    await delay();
    return storage.create(resource, data);
  },

  async put(resource, id, data) {
    await delay();
    return storage.update(resource, id, data);
  },

  async delete(resource, id) {
    await delay();
    storage.remove(resource, id);
  }
};

export default localApi;
