import { NavLink } from "react-router-dom";
import "./Nav.css";
const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <NavLink to="/" activeClassName="link--active">
            Timer
          </NavLink>
        </li>
        <li>
          <NavLink to="/tasks" activeClassName="link--active">
            Tasks
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" activeClassName="link--active">
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
