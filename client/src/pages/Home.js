import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoriesPage from "../components/categories/CategoriesPage";

/**
 * עמוד הבית
 * אם המשתמש מחובר → מעביר לקטגוריות
 * אם לא מחובר → מסך פתיחה
 */
const Home = () => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <CategoriesPage />;
  }

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">AI professions workspace</span>
        <h1>Choose a profession and turn an idea into an answer.</h1>
        <p>
          Sign in, pick a profession, choose a sub-category, and write your prompt
          in one focused workspace.
        </p>

        <div>
          <Link className="primary-button" to="/login">
            Start
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;