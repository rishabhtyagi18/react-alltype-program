import React, { useState } from "react";

export default function GoogleSearchReplica() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Perform search using DuckDuckGo API
  const search = async (q) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(
          q
        )}&format=json&no_redirect=1&skip_disambig=1`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(processResults(data));
    } catch (err) {
      setError("Error fetching results.");
    } finally {
      setLoading(false);
    }
  };

  // Extract and flatten results from DuckDuckGo API response
  const processResults = (data) => {
    const items = [];
    function gatherTopics(topics) {
      topics.forEach((topic) => {
        if (topic.Text && topic.FirstURL) items.push(topic);
        if (topic.Topics) gatherTopics(topic.Topics); // Recursively get nested topics
      });
    }
    if (Array.isArray(data.RelatedTopics)) {
      gatherTopics(data.RelatedTopics);
    }
    return items;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      search(query.trim());
    }
  };

  const handleFeelingLucky = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch(
        `https://api.duckduckgo.com/?q=${encodeURIComponent(
          query.trim()
        )}&format=json&no_redirect=1&skip_disambig=1`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();

      function findFirstURL(topics) {
        for (const topic of topics) {
          if (topic.FirstURL) return topic.FirstURL;
          if (topic.Topics) {
            const found = findFirstURL(topic.Topics);
            if (found) return found;
          }
        }
        return null;
      }

      const firstURL = findFirstURL(data.RelatedTopics || []);

      if (firstURL) {
        window.location.href = firstURL;
      } else {
        setError("No suitable results found for redirect.");
      }
    } catch (err) {
      setError("Error during 'I'm Feeling Lucky' operation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 720,
        margin: "40px auto",
        padding: "0 20px",
      }}
    >
      {/* Header similar to Google */}
      <header style={{ textAlign: "right", marginBottom: 40, fontSize: 14 }}>
        <button
          onClick={() => alert("Gmail link clicked")}
          style={{
            marginRight: 24,
            color: "#1a0dab",
            textDecoration: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "inherit",
          }}
        >
          Gmail
        </button>
        <button
          onClick={() => alert("Images link clicked")}
          style={{
            background: "none",
            border: "none",
            color: "#1a0dab",
            textDecoration: "none",
            cursor: "pointer",
            padding: 0,
            fontSize: "inherit",
          }}
        >
          Images
        </button>
      </header>

      {/* Google Logo */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <img
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
          alt="Google logo"
          style={{ width: 272, height: 92 }}
        />
      </div>

      {/* Search Form */}
      <form
        onSubmit={handleSubmit}
        role="search"
        aria-label="Google Search Form"
        style={{
          display: "flex",
          justifyContent: "center",
          border: "1px solid #dfe1e5",
          borderRadius: 24,
          padding: "10px 20px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          marginBottom: 30,
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          background: "white",
        }}
      >
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search Google or type a URL"
          autoFocus
          aria-label="Search input"
          style={{
            flexGrow: 1,
            fontSize: 18,
            border: "none",
            outline: "none",
            padding: "10px 10px",
          }}
        />
        <button
          type="submit"
          aria-label="Search"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            paddingLeft: 10,
            color: "#5f6368",
          }}
          disabled={loading}
        >
          🔍
        </button>
      </form>

      {/* Buttons */}
      <div
        style={{
          textAlign: "center",
          marginBottom: 30,
          display: "flex",
          justifyContent: "center",
          gap: 10,
        }}
      >
        <button
          onClick={handleSubmit}
          disabled={loading || !query.trim()}
          style={{
            backgroundColor: "#f8f8f8",
            border: "1px solid #f8f8f8",
            padding: "10px 24px",
            borderRadius: 4,
            cursor: loading || !query.trim() ? "not-allowed" : "pointer",
            fontSize: 14,
          }}
        >
          Google Search
        </button>
        <button
          onClick={handleFeelingLucky}
          disabled={loading || !query.trim()}
          style={{
            backgroundColor: "#f8f8f8",
            border: "1px solid #f8f8f8",
            padding: "10px 24px",
            borderRadius: 4,
            cursor: loading || !query.trim() ? "not-allowed" : "pointer",
            fontSize: 14,
          }}
        >
          I'm Feeling Lucky
        </button>
      </div>

      {/* Results Section */}
      {loading && (
        <p style={{ textAlign: "center", color: "#555" }}>Loading results...</p>
      )}

      {error && (
        <p style={{ textAlign: "center", color: "red", fontWeight: "bold" }}>
          {error}
        </p>
      )}

      {results && results.length === 0 && !loading && (
        <p style={{ textAlign: "center" }}>No results found.</p>
      )}

      <section
        aria-live="polite"
        aria-atomic="true"
        style={{ marginTop: 20 }}
      >
        {results &&
          results.map((item, index) => (
            <article
              key={index}
              style={{ marginBottom: 25, lineHeight: 1.4 }}
              className="result-item"
            >
              <a
                href={item.FirstURL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: 18,
                  color: "#1a0dab",
                  textDecoration: "none",
                }}
                className="result-link"
              >
                {item.Text.length > 70
                  ? item.Text.slice(0, 70) + "…"
                  : item.Text}
              </a>
              <div
                style={{ fontSize: 14, color: "#006621" }}
                className="result-url"
              >
                {new URL(item.FirstURL).hostname}
              </div>
            </article>
          ))}
      </section>

      <footer
        style={{
          textAlign: "center",
          marginTop: 60,
          color: "#70757a",
          fontSize: 14,
          borderTop: "1px solid #e4e4e4",
          paddingTop: 15,
        }}
      >
        Google Search Replica Demo - Powered by DuckDuckGo API
      </footer>
    </div>
  );
}


// #How It Works:
// Text input bound to state query.
// Fetches search results from DuckDuckGo JSON API on submit or clicking "Google Search".
// Parses and flattens the results, displaying the clickable link, snippet, and domain.
// "I'm Feeling Lucky" redirects to the top result if found.
// Loading and error states displayed.
// Basic accessible markup and styles inspired by Google’s simple layout.
