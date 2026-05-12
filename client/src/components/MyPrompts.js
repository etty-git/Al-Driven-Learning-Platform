import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useGetPromptsByUserIDQuery } from "../features/promptsAPI";

const MyPrompts = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetPromptsByUserIDQuery(user?._id, {
    skip: !user?._id,
  });

  if (!user) {
    return (
      <main className="page">
        <section className="hero">
          <span className="eyebrow">My Prompts</span>
          <h1>Login to see your prompt history.</h1>
          <div>
            <Link className="primary-button" to="/login">
              Login
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
        <span className="eyebrow">My Prompts</span>
        <h1>Your AI answers</h1>
        <p>Review the prompts you sent and the responses you received.</p>
      </section>

      {isLoading && <p className="empty-state">Loading prompts...</p>}
      {error && <p className="error-text">Error loading prompts</p>}

      <div className="grid">
        {prompts.map((item) => (
          <article className="prompt-card" key={item._id}>
            <h3>{item.prompt}</h3>
            <p>{item.response}</p>
          </article>
        ))}
      </div>

      {!isLoading && !prompts.length && (
        <p className="empty-state">No prompts yet.</p>
      )}
    </main>
  );
};

export default MyPrompts;
