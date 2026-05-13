import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import Layout from "./common/layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoriesPage from "./components/categories/CategoriesPage";
import CategoryDetails from "./components/categories/CategoryDetails";
import MyPrompts from "./components/history/MyHistory";
import MainDashboard from "./components/manager/MainDashboard";

/**
 * הגדרת כל ה־Routes של האפליקציה
 */
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Layout ראשי */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:id" element={<CategoryDetails />} />
            <Route path="my-prompts" element={<MyPrompts />} />
            <Route path="manager" element={<MainDashboard />} />
          </Route>

          {/* עמודי auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;