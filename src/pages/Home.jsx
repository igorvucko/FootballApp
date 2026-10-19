import { Link } from 'react-router-dom';

export const Home = () => (
  <div className="container" style={{ padding: '2rem 1rem' }}>
    <section className="card" aria-labelledby="home-title">
      <h1 id="home-title">⚽ Dobrodošli u FootballApp</h1>
      <p>
        Aplikacija za upravljanje nogometnim klubovima, igračima i utakmicama.
        Vodi evidenciju, prati statistiku i organiziraj svoju ligu.
      </p>
      <p style={{ color: '#6c757d', fontSize: '0.95rem' }}>
        Završni rad – Front-End Developer (Edunova) · React · Vite · SCSS · localStorage
      </p>

      <div className="grid" style={{ marginTop: '2rem' }}>
        <Link to="/teams" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="card__title">🏟️ Klubovi</h3>
          <p>Pregled svih klubova i njihovih podataka</p>
        </Link>
        <Link to="/players" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="card__title">👤 Igrači</h3>
          <p>Upravljanje igračima i njihovom statistikom</p>
        </Link>
        <Link to="/matches" className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h3 className="card__title">📊 Utakmice</h3>
          <p>Rezultati i raspored utakmica</p>
        </Link>
      </div>
    </section>
  </div>
);
