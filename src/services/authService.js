/**
 * Auth preko localStorage
 */

const USERS_KEY = 'footballApp_users';
const SESSION_KEY = 'footballApp_session';

const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};


const hashPassword = (password) => {
  try {
    return btoa(unescape(encodeURIComponent(password + '_footballApp_salt')));
  } catch {
    return password;
  }
};

export const authService = {
  register({ name, email, password }) {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();

    if (!name?.trim()) throw new Error('Ime je obavezno');
    if (!normalizedEmail) throw new Error('Email je obavezan');
    if (!password || password.length < 4) {
      throw new Error('Lozinka mora imati najmanje 4 znaka');
    }
    if (users.some((u) => u.email === normalizedEmail)) {
      throw new Error('Korisnik s tim emailom već postoji');
    }

    const user = {
      id: Date.now().toString(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      createdAt: new Date().toISOString()
    };

    users.push(user);
    saveUsers(users);

    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  login({ email, password }) {
    const users = getUsers();
    const normalizedEmail = email.trim().toLowerCase();
    const user = users.find((u) => u.email === normalizedEmail);

    if (!user || user.passwordHash !== hashPassword(password)) {
      throw new Error('Pogrešan email ili lozinka');
    }

    const session = { id: user.id, name: user.name, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    return session;
  },

  logout() {
    localStorage.removeItem(SESSION_KEY);
  },

  getSession() {
    try {
      return JSON.parse(localStorage.getItem(SESSION_KEY));
    } catch {
      return null;
    }
  },

  isLoggedIn() {
    return !!this.getSession();
  }
};
