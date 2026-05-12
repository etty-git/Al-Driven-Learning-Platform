import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, Chip, Typography } from "@mui/material";
import { useGetPromptsByUserIDQuery } from "../features/promptsAPI";

const MyPrompts = () => {
  const user = useSelector((state) => state.auth.user);
  const { data, isLoading, error } = useGetPromptsByUserIDQuery(user?._id, {
    skip: !user?._id,
    refetchOnMountOrArgChange: true,
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
  const getName = (value) => {
    if (!value) return "Unknown";
    if (typeof value === "string") return "Loading name...";
    return value.name || "Unknown";
  };

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
          <Card
            key={item._id}
            className="prompt-card"
            elevation={0}
            sx={{
              borderRadius: "8px",
              display: "block",
              overflow: "visible",
              textAlign: "left",
            }}
          >
            <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
              <Box className="prompt-meta prompt-meta-top">
                <Chip
                  label={`Category: ${getName(item.category_id)}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(59, 130, 246, 0.12)",
                    border: "1px solid rgba(59, 130, 246, 0.28)",
                    color: "var(--accent-strong)",
                    fontWeight: 700,
                  }}
                />
                <Chip
                  label={`Sub-category: ${getName(item.sub_category_id)}`}
                  size="small"
                  sx={{
                    bgcolor: "rgba(59, 130, 246, 0.12)",
                    border: "1px solid rgba(59, 130, 246, 0.28)",
                    color: "var(--accent-strong)",
                    fontWeight: 700,
                  }}
                />
              </Box>

              <Typography component="h3" variant="h6" sx={{ mb: 1.25, fontWeight: 700 }}>
                {item.prompt}
              </Typography>

              <Typography component="p" sx={{ color: "var(--muted)", lineHeight: 1.55 }}>
                {item.response}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>

      {!isLoading && !prompts.length && (
        <p className="empty-state">No prompts yet.</p>
      )}
    </main>
  );
};

export default MyPrompts;
