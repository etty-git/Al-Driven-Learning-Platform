import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CategoriesPage from "./categories/CategoriesPage";

const Home = () => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    return <CategoriesPage />;
  }

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">AI prompt workspace</span>
        <h1>Choose a category and turn an idea into an answer.</h1>
        <p>
          Sign in, pick a category, choose a sub-category, and write your prompt
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
