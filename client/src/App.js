import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Layout from "./common/layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CategoriesPage from "./components/categories/CategoriesPage";
import CategoryDetails from "./components/categories/CategoryDetails";
import MyPrompts from "./components/histort/MyHistort";
import MainDashboard from "./components/manager/MainDashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="categories/:id" element={<CategoryDetails />} />
            <Route path="my-prompts" element={<MyPrompts />} />
            <Route path="manager" element={<MainDashboard />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
