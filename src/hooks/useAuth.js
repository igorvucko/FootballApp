import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    return {
      user: null,
      ready: true,
      isLoggedIn: false,
      login: () => {
        throw new Error('AuthProvider nije postavljen u main.jsx');
      },
      register: () => {
        throw new Error('AuthProvider nije postavljen u main.jsx');
      },
      logout: () => {}
    };
  }

  return ctx;
};
