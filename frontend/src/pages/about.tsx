const About = () => {
  return (
    <main className="min-h-[calc(100vh-137px)] px-6 py-16">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <section className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gray-500">
            About the Project
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            WebSummarizer
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            A simple AI powered tool that turns webpages into concise,
            easy to understand summaries.
          </p>
        </section>

        {/* What it does */}
        <section className="mt-14 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            What does it do?
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            WebSummarizer allows you to paste a webpage URL and get an AI
            generated summary of its content. Instead of reading through an
            entire webpage, you can quickly understand its main points.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            After generating a summary, you can also use AI to rewrite it in
            different styles, such as simple, professional, shorter, or more
            detailed.
          </p>
        </section>

        {/* How it works */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            How it works
          </h2>

          <div className="mt-6 space-y-5">
            <div>
              <h3 className="font-semibold text-gray-900">
                1. Enter a URL
              </h3>
              <p className="mt-1 text-gray-600">
                Paste the URL of the webpage you want to summarize.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                2. Extract the content
              </h3>
              <p className="mt-1 text-gray-600">
                The Flask backend fetches the webpage and extracts its
                readable text using BeautifulSoup.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                3. Generate the summary
              </h3>
              <p className="mt-1 text-gray-600">
                The extracted content is sent to an AI model through
                OpenRouter, which generates a concise summary.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                4. Rewrite with AI
              </h3>
              <p className="mt-1 text-gray-600">
                The generated summary can be rewritten according to the
                user's preferred style.
              </p>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Technology
          </h2>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "React",
              "TypeScript",
              "React Router",
              "Tailwind CSS",
              "Flask",
              "Python",
              "BeautifulSoup",
              "OpenRouter",
            ].map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
              >
                {technology}
              </span>
            ))}
          </div>
        </section>

        {/* Purpose */}
        <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900">
            Why I built it
          </h2>

          <p className="mt-4 leading-7 text-gray-600">
            This project was built to explore the complete flow of a modern
            AI powered web application, from a React frontend and Flask API
            to web scraping and AI integration.
          </p>

          <p className="mt-4 leading-7 text-gray-600">
            The goal was to keep the application simple while demonstrating
            how different technologies can work together to solve a practical
            problem.
          </p>
        </section>
      </div>
    </main>
  );
};

export default About;