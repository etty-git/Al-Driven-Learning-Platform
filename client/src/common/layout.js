import { Outlet } from "react-router-dom";
import Navigate from "./Navigate";

const Layout = () => {
  return (
    <div className="app-shell">
      <Navigate />
      <Outlet />
    </div>
  );
};

export default Layout;
