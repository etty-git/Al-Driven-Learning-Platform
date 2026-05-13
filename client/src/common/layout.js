import { Outlet } from "react-router-dom";
import Navigate from "./Navigate";

/**
 * Layout ראשי של האפליקציה
 * כולל ניווט ותוכן דינמי לפי route
 */
const Layout = () => {
  return (
    <div className="app-shell">
      <Navigate />
      <Outlet />
   
    </div>
  );
};

export default Layout;