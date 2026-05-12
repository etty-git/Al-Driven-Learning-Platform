import { Outlet } from "react-router-dom";
import Navigate from "./Navigate";
import { useSelector } from "react-redux";
const Layout = () => {
  const auth = useSelector((state) => state.auth);
  const userName = auth.user ? auth.user.name : "Guest";
  return (
    <div>
      <Navigate />
      <main>
        <h1>Welcome, {userName}!</h1>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;