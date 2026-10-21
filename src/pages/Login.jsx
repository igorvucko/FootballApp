import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export const Login = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      login(form);
      toast.success('Uspješna prijava');
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '480px' }}>
      <div className="card">
        <h1>Prijava</h1>
        <p className="card__meta">Prijavi se da možeš uređivati klubove, igrače i utakmice.</p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__group">
            <label htmlFor="email">Email *</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form__group">
            <label htmlFor="password">Lozinka *</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <p className="form__error" role="alert">
              {error}
            </p>
          )}

          <div className="form__actions">
            <button type="submit" className="btn btn--primary">
              Prijavi se
            </button>
          </div>
        </form>

        <p style={{ marginTop: '1rem' }}>
          Nemaš račun? <Link to="/register">Registriraj se</Link>
        </p>
      </div>
    </div>
  );
};
