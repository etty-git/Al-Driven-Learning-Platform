import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./common/layout";
import Login from "./components/Login";
import Register from "./components/Register";
import CategoriesPage from "./components/categories/CategoriesPage";
import CategoryDetails from "./components/categories/CategoryDetails";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories/:id" element={<CategoryDetails />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;