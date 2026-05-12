import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navigate = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  return (
    <nav className="top-nav">
      <NavLink to="/" className="brand">
        <span className="brand-mark">AI</span>
        <span>Prompt Studio</span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/categories" className="nav-link">
          Categories
        </NavLink>
        <NavLink to="/my-prompts" className="nav-link">
          My Prompts
        </NavLink>
      </div>

      <div className="nav-actions">
        {auth.user ? (
          <>
            <span className="user-chip">Hi, {auth.user.name}</span>
            <button className="ghost-button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login" className="nav-link">
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navigate;
