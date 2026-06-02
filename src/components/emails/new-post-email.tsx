import { renderToStaticMarkup } from "react-dom/server";
import type { ForemArticle } from "../../utils/newsletter";

export const renderNewPostEmail = (article: ForemArticle) => {
  const html = renderToStaticMarkup(<NewPostEmail article={article} />);
  return `<!doctype html>${html}`;
};

const NewPostEmail = ({ article }: { article: ForemArticle }) => {
  return (
    <html lang="en">
      <body
        style={{
          backgroundColor: "#0d1117",
          color: "#e6edf3",
          fontFamily: "Inter, Arial, sans-serif",
          margin: 0,
          padding: "24px",
        }}
      >
        <main
          style={{
            maxWidth: "640px",
            margin: "0 auto",
            backgroundColor: "#161b22",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #30363d",
          }}
        >
          {article.cover_image ? (
            <img
              src={article.cover_image}
              alt={article.title}
              style={{ width: "100%", display: "block" }}
            />
          ) : null}
          <section style={{ padding: "24px" }}>
            <p style={{ marginTop: 0, color: "#58a6ff", fontWeight: 700 }}>Hacksore Newsletter</p>
            <h1 style={{ marginTop: "0.5rem", marginBottom: "1rem", lineHeight: 1.3 }}>{article.title}</h1>
            <p style={{ color: "#9da7b3", lineHeight: 1.6 }}>{article.description}</p>
            <a
              href={article.url}
              style={{
                display: "inline-block",
                marginTop: "16px",
                backgroundColor: "#238636",
                color: "#ffffff",
                padding: "10px 16px",
                borderRadius: "8px",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Read on Dev.to
            </a>
          </section>
        </main>
      </body>
    </html>
  );
};
