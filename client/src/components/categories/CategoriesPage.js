import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useGetCategoriesQuery } from "../../features/categoriesAPI";

const CategoriesPage = () => {
  const authUser = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);
  const isAuthenticated = Boolean(token && authUser);
  const navigate = useNavigate();
  const { data, isLoading, error } = useGetCategoriesQuery();

  if (!isAuthenticated) {
    return (
      <main className="page">
        <section className="hero">
          <span className="eyebrow">Welcome</span>
          <h1>Login to choose a category.</h1>
          <p>Your categories and prompt workspace open after connecting.</p>
          <div>
            <Link className="primary-button" to="/login">
              Login
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Hi, {authUser.name}</span>
        <h1>What do you want to create today?</h1>
        <p>Choose a category. The next screen has the sub-categories, prompt box, and AI response.</p>
      </section>

      <section>
        <div className="section-header">
          <h2>Categories</h2>
          <span className="section-subtitle">Select one to continue</span>
        </div>

        {isLoading && <p className="empty-state">Loading categories...</p>}
        {error && <p className="error-text">Error loading categories</p>}

        <div className="grid">
          {data?.map((cat) => (
            <button
              key={cat._id}
              className="category-card"
              onClick={() => navigate(`/categories/${cat._id}`)}
            >
              <h3>{cat.name}</h3>
              <p>Open prompt workspace</p>
            </button>
          ))}
        </div>

        {!isLoading && !data?.length && (
          <p className="empty-state">No categories yet.</p>
        )}
      </section>
    </main>
  );
};

export default CategoriesPage;
