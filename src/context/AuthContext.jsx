import { createContext, useState, useCallback, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const session = authService.getSession();
    setUser(session);
    setReady(true);
  }, []);

  const login = useCallback((credentials) => {
    const session = authService.login(credentials);
    setUser(session);
    return session;
  }, []);

  const register = useCallback((data) => {
    const session = authService.register(data);
    setUser(session);
    return session;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    ready,
    isLoggedIn: !!user,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
