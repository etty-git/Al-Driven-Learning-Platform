import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navigate = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/categories">Categories</NavLink>
      <NavLink to="/my-prompts">My Prompts</NavLink>

      {/* אם לא מחובר - תראה Login */}
      {!auth.user && (
        <NavLink to="/login">Login</NavLink>
      )}

      {/* אם מחובר - תראה ברוך הבא + Logout */}
      {auth.user && (
        <>
          <span>Welcome, {auth.user.name}!</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navigate;