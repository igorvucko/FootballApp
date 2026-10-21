import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Navbar = () => {
  const { user, isLoggedIn, logout } = useAuth();

  return (
    <nav className="navbar" aria-label="Glavna navigacija">
      <div className="container navbar__inner">
        <NavLink to="/" className="navbar__brand" end>
          ⚽ FootballApp
        </NavLink>
        <ul className="navbar__links">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
              end
            >
              Početna
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/teams"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            >
              Klubovi
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/players"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            >
              Igrači
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/matches"
              className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
            >
              Utakmice
            </NavLink>
          </li>
          {isLoggedIn ? (
            <>
              <li className="navbar__link" style={{ cursor: 'default', opacity: 0.9 }}>
                👤 {user?.name}
              </li>
              <li>
                <button
                  type="button"
                  className="navbar__link"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    font: 'inherit'
                  }}
                  onClick={logout}
                >
                  Odjava
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/login"
                  className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}
                >
                  Prijava
                </NavLink>
              </li>
              <li>
                <Link to="/register" className="navbar__link">
                  Registracija
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
