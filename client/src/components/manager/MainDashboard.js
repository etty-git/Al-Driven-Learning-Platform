import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetPromptsQuery } from "../../features/promptsAPI";

const MainDashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetPromptsQuery(undefined, {
    skip: !user?.isAdmin,
  });

  if (!user?.isAdmin) {
    return (
      <main className="page">
        <section className="hero">
          <span className="eyebrow">Manager</span>
          <h1>Admins only.</h1>
          <p>This page is available only for manager accounts.</p>
          <div>
            <Link className="primary-button" to="/categories">
              Back to categories
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const prompts = data?.prompts || [];

  return (
    <main className="page">
      <section className="hero">
        <span className="eyebrow">Manager dashboard</span>
        <h1>All user prompts</h1>
        <p>Review every prompt and AI response created in the system.</p>
      </section>

      {isLoading && <p className="empty-state">Loading prompts...</p>}
      {error && <p className="error-text">Error loading prompts</p>}

      <div className="grid">
        {prompts.map((item) => (
          <article className="prompt-card" key={item._id}>
            <h3>{item.prompt}</h3>
            <p>{item.response}</p>
            <p>
              User: {item.user_id?.name || "Unknown"} | Category:{" "}
              {item.category_id?.name || "Unknown"} | Sub-category:{" "}
              {item.sub_category_id?.name || "Unknown"}
            </p>
          </article>
        ))}
      </div>

      {!isLoading && !prompts.length && (
        <p className="empty-state">No prompts yet.</p>
      )}
    </main>
  );
};

export default MainDashboard;
