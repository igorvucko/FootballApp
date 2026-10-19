import { useState, useEffect } from 'react';
import { validatePlayer } from '../../utils/validators';

const initialState = {
  firstName: '',
  lastName: '',
  position: '',
  number: '',
  age: '',
  nationality: 'Hrvatska',
  teamId: '',
  goals: 0,
  assists: 0,
  notes: ''
};

export const PlayerForm = ({ teams = [], onSubmit, onCancel, initial }) => {
  const [form, setForm] = useState(initial || initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (initial) setForm(initial);
  }, [initial]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newForm = { ...form, [name]: value };
    setForm(newForm);

    // real-time validacija nakon što je polje "touched"
    if (touched[name]) {
      const validationErrors = validatePlayer(newForm);
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validatePlayer(form);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validatePlayer(form);
    setErrors(validationErrors);
    setTouched(
      Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({
        ...form,
        number: Number(form.number),
        age: Number(form.age),
        goals: Number(form.goals) || 0,
        assists: Number(form.assists) || 0
      });
    }
  };

  const {
    firstName,
    lastName,
    position,
    number,
    age,
    nationality,
    teamId,
    goals,
    assists,
    notes
  } = form;

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="firstName">Ime *</label>
          <input
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            className={errors.firstName ? 'input--error' : ''}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p id="firstName-error" className="form__error" role="alert">
              {errors.firstName}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="lastName">Prezime *</label>
          <input
            id="lastName"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            className={errors.lastName ? 'input--error' : ''}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p id="lastName-error" className="form__error" role="alert">
              {errors.lastName}
            </p>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="position">Pozicija *</label>
          <select
            id="position"
            name="position"
            value={position}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.position}
            className={errors.position ? 'input--error' : ''}
          >
            <option value="">-- Odaberi --</option>
            <option value="goalkeeper">Golman</option>
            <option value="defender">Branič</option>
            <option value="midfielder">Vezni</option>
            <option value="forward">Napadač</option>
            <option value="wing">Krilo</option>
          </select>
          {errors.position && (
            <p className="form__error" role="alert">
              {errors.position}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="number">Broj dresa *</label>
          <input
            id="number"
            name="number"
            type="number"
            min="1"
            max="99"
            value={number}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.number}
            className={errors.number ? 'input--error' : ''}
          />
          {errors.number && (
            <p className="form__error" role="alert">
              {errors.number}
            </p>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="age">Godine *</label>
          <input
            id="age"
            name="age"
            type="number"
            min="15"
            max="55"
            value={age}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.age}
            className={errors.age ? 'input--error' : ''}
          />
          {errors.age && (
            <p className="form__error" role="alert">
              {errors.age}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="nationality">Državljanstvo</label>
          <input
            id="nationality"
            name="nationality"
            value={nationality}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </div>
      </div>

      <div className="form__group">
        <label htmlFor="teamId">Klub *</label>
        <select
          id="teamId"
          name="teamId"
          value={teamId}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.teamId}
          className={errors.teamId ? 'input--error' : ''}
        >
          <option value="">-- Odaberi klub --</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        {errors.teamId && (
          <p className="form__error" role="alert">
            {errors.teamId}
          </p>
        )}
      </div>

      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="goals">Golovi</label>
          <input
            id="goals"
            name="goals"
            type="number"
            min="0"
            value={goals}
            onChange={handleChange}
          />
        </div>

        <div className="form__group">
          <label htmlFor="assists">Asistencije</label>
          <input
            id="assists"
            name="assists"
            type="number"
            min="0"
            value={assists}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form__group">
        <label htmlFor="notes">Napomene</label>
        <textarea
          id="notes"
          name="notes"
          value={notes}
          onChange={handleChange}
          rows={3}
          placeholder="Opcionalne bilješke o igraču..."
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
