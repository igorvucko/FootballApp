import { useState, useEffect } from 'react';
import { validateMatch } from '../../utils/validators';

const emptyState = {
  homeTeamId: '',
  awayTeamId: '',
  homeScore: 0,
  awayScore: 0,
  date: '',
  stadium: '',
  competition: 'HNL'
};

export const MatchForm = ({ teams = [], onSubmit, onCancel, initial }) => {
  const [form, setForm] = useState(initial || emptyState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initial) {
      setForm({
        homeTeamId: initial.homeTeamId || '',
        awayTeamId: initial.awayTeamId || '',
        homeScore: initial.homeScore ?? 0,
        awayScore: initial.awayScore ?? 0,
        date: initial.date || '',
        stadium: initial.stadium || '',
        competition: initial.competition || 'HNL'
      });
    } else {
      setForm(emptyState);
    }
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);

    if (touched[name]) {
      const validationErrors = validateMatch(newForm);
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validateMatch(form);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateMatch(form);
    setErrors(validationErrors);
    setTouched(Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {}));

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({
        ...form,
        homeScore: Number(form.homeScore),
        awayScore: Number(form.awayScore)
      });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="homeTeamId">Domaći klub *</label>
          <select
            id="homeTeamId"
            name="homeTeamId"
            value={form.homeTeamId}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.homeTeamId}
            className={errors.homeTeamId ? 'input--error' : ''}
          >
            <option value="">-- Odaberi --</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {errors.homeTeamId && (
            <p className="form__error" role="alert">
              {errors.homeTeamId}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="awayTeamId">Gostujući klub *</label>
          <select
            id="awayTeamId"
            name="awayTeamId"
            value={form.awayTeamId}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.awayTeamId}
            className={errors.awayTeamId ? 'input--error' : ''}
          >
            <option value="">-- Odaberi --</option>
            {teams.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
          {errors.awayTeamId && (
            <p className="form__error" role="alert">
              {errors.awayTeamId}
            </p>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="homeScore">Golovi domaći</label>
          <input
            id="homeScore"
            name="homeScore"
            type="number"
            min="0"
            value={form.homeScore}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.homeScore ? 'input--error' : ''}
          />
          {errors.homeScore && (
            <p className="form__error" role="alert">
              {errors.homeScore}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="awayScore">Golovi gosti</label>
          <input
            id="awayScore"
            name="awayScore"
            type="number"
            min="0"
            value={form.awayScore}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.awayScore ? 'input--error' : ''}
          />
          {errors.awayScore && (
            <p className="form__error" role="alert">
              {errors.awayScore}
            </p>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="date">Datum *</label>
          <input
            id="date"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.date}
            className={errors.date ? 'input--error' : ''}
          />
          {errors.date && (
            <p className="form__error" role="alert">
              {errors.date}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="competition">Natjecanje</label>
          <select
            id="competition"
            name="competition"
            value={form.competition}
            onChange={handleChange}
          >
            <option value="HNL">HNL</option>
            <option value="Kup">Kup</option>
            <option value="Liga prvaka">Liga prvaka</option>
            <option value="Europska liga">Europska liga</option>
            <option value="Prijateljska">Prijateljska</option>
          </select>
        </div>
      </div>

      <div className="form__group">
        <label htmlFor="stadium">Stadion</label>
        <input
          id="stadium"
          name="stadium"
          value={form.stadium}
          onChange={handleChange}
          placeholder="npr. Maksimir"
        />
      </div>

      <div className="form__actions">
        <button type="submit" className="btn btn--primary">
          Spremi
        </button>
        <button type="button" className="btn btn--secondary" onClick={onCancel}>
          Odustani
        </button>
      </div>
    </form>
  );
};
