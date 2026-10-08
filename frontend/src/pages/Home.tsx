import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

type RewriteStyle = "simple" | "professional" | "shorter" | "detailed";

interface SummaryResult {
  url: string;
  title: string;
  summary: string;
}

const Home = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<SummaryResult | null>(null);

  const [loading, setLoading] = useState(false);
  const [rewriteLoading, setRewriteLoading] = useState(false);

  const [error, setError] = useState("");
  const [rewriteError, setRewriteError] = useState("");
  const [rewrittenText, setRewrittenText] = useState("");

  const summarize = async () => {
    if (!url.trim()) {
      setError("Please enter a URL.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setRewrittenText("");
    setRewriteError("");

    try {
      const response = await fetch(`${API_URL}/api/summarize`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to summarize the webpage.");
      }

      setResult(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong while summarizing."
      );
    } finally {
      setLoading(false);
    }
  };

  const rewrite = async (style: RewriteStyle) => {
    if (!result?.summary) {
      return;
    }

    setRewriteLoading(true);
    setRewriteError("");

    try {
      const response = await fetch(`${API_URL}/api/rewrite`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: result.summary,
          style,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to rewrite the text.");
      }

      setRewrittenText(data.rewritten);
    } catch (err) {
      setRewriteError(
        err instanceof Error
          ? err.message
          : "Something went wrong while rewriting."
      );
    } finally {
      setRewriteLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-137px)] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <section className="text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
            AI Web Summarizer
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Turn any webpage into a simple summary
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">
            Paste a webpage URL and let AI extract the important information
            and summarize it for you.
          </p>

          {/* URL Input */}
          <div className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <input
              type="url"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !loading) {
                  summarize();
                }
              }}
              placeholder="https://example.com/article"
              className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none transition focus:border-gray-500 focus:ring-2 focus:ring-gray-200"
            />

            <button
              type="button"
              onClick={summarize}
              disabled={loading}
              className="rounded-lg bg-black px-6 py-3 font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Summarizing..." : "Summarize"}
            </button>
          </div>

          {error && (
            <p className="mx-auto mt-4 max-w-3xl text-sm text-red-600">
              {error}
            </p>
          )}
        </section>

        {/* Result */}
        {result && (
          <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6">
              <p className="text-sm font-medium text-gray-500">Source</p>

              <a
                href={result.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 block break-all text-sm text-blue-600 hover:underline"
              >
                {result.url}
              </a>
            </div>

            {result.title && (
              <h2 className="text-2xl font-bold text-gray-900">
                {result.title}
              </h2>
            )}

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-900">
                AI Summary
              </h3>

              <p className="mt-3 whitespace-pre-line leading-7 text-gray-700">
                {result.summary}
              </p>
            </div>

            {/* Rewrite */}
            <div className="mt-8 border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Rewrite with AI
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Choose how you want the summary rewritten.
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => rewrite("simple")}
                  disabled={rewriteLoading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Simple
                </button>

                <button
                  type="button"
                  onClick={() => rewrite("professional")}
                  disabled={rewriteLoading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Professional
                </button>

                <button
                  type="button"
                  onClick={() => rewrite("shorter")}
                  disabled={rewriteLoading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Shorter
                </button>

                <button
                  type="button"
                  onClick={() => rewrite("detailed")}
                  disabled={rewriteLoading}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 disabled:opacity-50"
                >
                  Detailed
                </button>
              </div>

              {rewriteLoading && (
                <p className="mt-4 text-sm text-gray-500">
                  AI is rewriting the summary...
                </p>
              )}

              {rewriteError && (
                <p className="mt-4 text-sm text-red-600">
                  {rewriteError}
                </p>
              )}

              {rewrittenText && (
                <div className="mt-6 rounded-xl bg-gray-50 p-5">
                  <h4 className="font-semibold text-gray-900">
                    Rewritten Version
                  </h4>

                  <p className="mt-3 whitespace-pre-line leading-7 text-gray-700">
                    {rewrittenText}
                  </p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default Home;