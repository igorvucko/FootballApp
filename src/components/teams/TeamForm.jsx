import { useState, useEffect } from 'react';
import { validateTeam } from '../../utils/validators';

const initialState = {
  name: '',
  city: '',
  stadium: '',
  founded: '',
  logo: '⚽'
};

export const TeamForm = ({ initial, onSubmit, onCancel }) => {
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

    if (touched[name]) {
      const validationErrors = validateTeam(newForm);
      setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const validationErrors = validateTeam(form);
    setErrors((prev) => ({ ...prev, [name]: validationErrors[name] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTeam(form);
    setErrors(validationErrors);
    setTouched(
      Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );

    if (Object.keys(validationErrors).length === 0) {
      onSubmit({ ...form, founded: Number(form.founded) });
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form__group">
        <label htmlFor="name">Naziv kluba *</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-invalid={!!errors.name}
          className={errors.name ? 'input--error' : ''}
        />
        {errors.name && (
          <p className="form__error" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="city">Grad *</label>
          <input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.city}
            className={errors.city ? 'input--error' : ''}
          />
          {errors.city && (
            <p className="form__error" role="alert">
              {errors.city}
            </p>
          )}
        </div>

        <div className="form__group">
          <label htmlFor="founded">Godina osnivanja *</label>
          <input
            id="founded"
            name="founded"
            type="number"
            min="1850"
            max={new Date().getFullYear()}
            value={form.founded}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={!!errors.founded}
            className={errors.founded ? 'input--error' : ''}
          />
          {errors.founded && (
            <p className="form__error" role="alert">
              {errors.founded}
            </p>
          )}
        </div>
      </div>

      <div className="grid-2">
        <div className="form__group">
          <label htmlFor="stadium">Stadion</label>
          <input
            id="stadium"
            name="stadium"
            value={form.stadium}
            onChange={handleChange}
          />
        </div>

        <div className="form__group">
          <label htmlFor="logo">Emoji / logo</label>
          <input id="logo" name="logo" value={form.logo} onChange={handleChange} maxLength={4} />
        </div>
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
