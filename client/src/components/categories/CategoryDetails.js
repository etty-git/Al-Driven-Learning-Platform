import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetSubCategoriesByIdQuery } from "../../features/sub_categoriesAPI";
import { useCreatePromptMutation } from "../../features/promptsAPI";

const CategoryDetails = () => {
  const authUser = useSelector((state) => state.auth.user);
  const { id } = useParams();
  const [selectedId, setSelectedId] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    data: subCategories,
    isLoading,
    isError,
  } = useGetSubCategoriesByIdQuery(id);
  const [createPrompt, { isLoading: isSending }] = useCreatePromptMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setPrompt("");

    if (!authUser?._id) {
      setErrorMessage("Please login before sending a prompt.");
      return;
    }

    if (!selectedId || !prompt.trim()) {
      setErrorMessage("Choose a sub-category and write a prompt.");
      return;
    }

    try {
      const result = await createPrompt({
        sub_category_id: selectedId,
        category_id: id,
        user_id: authUser._id,
        prompt: prompt.trim(),
      }).unwrap();

      setResponse(result.aiResponse || "No response from AI");
    } catch (err) {
      setErrorMessage(err?.data?.message || err?.error || "Error sending prompt");
    }
  };

  return (
    <main className="page">
      <div className="section-header">
        <div>
          <span className="eyebrow">Prompt workspace</span>
          <h1 className="page-title">Write your prompt</h1>
        </div>
        <Link className="nav-link" to="/categories">
          Back to professions
        </Link>
      </div>

      <div className="workspace">
        <aside className="side-panel">
          <h2>Sub-categories</h2>

          {isLoading && <p className="empty-state">Loading...</p>}
          {isError && <p className="error-text">Error loading sub-professions</p>}

          <div className="subcat-list">
            {subCategories?.map((sub) => (
              <button
                key={sub._id}
                className={`subcat-button ${
                  selectedId === sub._id ? "selected" : ""
                }`}
                onClick={() => {
                  setSelectedId(sub._id);
                  setSelectedName(sub.name);
                  setResponse("");
                }}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {!isLoading && !subCategories?.length && (
            <p className="empty-state">No sub-categories yet.</p>
          )}
        </aside>

        <section className="chat-panel">
          <span className="eyebrow">{selectedName || "Choose a sub-category"}</span>
          <h2>Ask the AI</h2>

          <div className="answer-box">
            {response || "The AI response will appear here after you send a prompt."}
          </div>

          <form className="prompt-form" onSubmit={handleSubmit}>
            <textarea
              className="prompt-input"
              placeholder="Write your prompt..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />

            <button className="primary-button" type="submit" disabled={isSending}>
              {isSending ? "Sending..." : "Create a lesson"}
            </button>

            {errorMessage && <p className="error-text">{errorMessage}</p>}
          </form>
        </section>
      </div>
    </main>
  );
};

export default CategoryDetails;
