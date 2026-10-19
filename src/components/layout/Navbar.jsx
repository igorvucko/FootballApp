import { NavLink } from 'react-router-dom';

export const Navbar = () => (
  <nav className="navbar" aria-label="Glavna navigacija">
    <div className="container navbar__inner">
      <NavLink to="/" className="navbar__brand" end>
        ⚽ FootballApp
      </NavLink>
      <ul className="navbar__links">
        <li>
          <NavLink to="/" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`} end>
            Početna
          </NavLink>
        </li>
        <li>
          <NavLink to="/teams" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>
            Klubovi
          </NavLink>
        </li>
        <li>
          <NavLink to="/players" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>
            Igrači
          </NavLink>
        </li>
        <li>
          <NavLink to="/matches" className={({ isActive }) => `navbar__link${isActive ? ' active' : ''}`}>
            Utakmice
          </NavLink>
        </li>
      </ul>
    </div>
  </nav>
);
