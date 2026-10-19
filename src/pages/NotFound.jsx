import { Link } from 'react-router-dom';

export const NotFound = () => (
  <div className="container" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
    <h1>404</h1>
    <p>Stranica nije pronađena.</p>
    <Link to="/" className="btn btn--primary">
      Natrag na početnu
    </Link>
  </div>
);
