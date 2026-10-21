import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';

export const Register = () => {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', password2: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.password !== form.password2) {
      setError('Lozinke se ne podudaraju');
      return;
    }

    try {
      register({ name: form.name, email: form.email, password: form.password });
      toast.success('Račun je kreiran. Dobrodošao/la!');
      navigate('/');
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 1rem', maxWidth: '480px' }}>
      <div className="card">
        <h1>Registracija</h1>
        <p className="card__meta">Kreiraj račun za upravljanje FootballApp podacima.</p>

        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__group">
            <label htmlFor="name">Ime *</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

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
            <label htmlFor="password">Lozinka * (min. 4 znaka)</label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              required
              minLength={4}
            />
          </div>

          <div className="form__group">
            <label htmlFor="password2">Ponovi lozinku *</label>
            <input
              id="password2"
              name="password2"
              type="password"
              autoComplete="new-password"
              value={form.password2}
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
              Registriraj se
            </button>
          </div>
        </form>

        <p style={{ marginTop: '1rem' }}>
          Već imaš račun? <Link to="/login">Prijavi se</Link>
        </p>
      </div>
    </div>
  );
};
