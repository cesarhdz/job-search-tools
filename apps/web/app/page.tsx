export default function Home() {
  return (
    <main className="shell">
      <header className="topbar">
        <strong>Job Search Tools</strong>
        <span className="badge">Local workspace</span>
      </header>

      <section className="hero">
        <p className="eyebrow">Workspace ready</p>
        <h1>Your job search, with durable context.</h1>
        <p className="lede">
          Keep the state your AI assistant needs without turning the job search
          into another conversation you have to reconstruct.
        </p>
      </section>

      <section className="card" aria-labelledby="search-context-title">
        <div>
          <p className="eyebrow">Next</p>
          <h2 id="search-context-title">Search context</h2>
          <p>
            Target roles, location preferences, and constraints will live here.
          </p>
        </div>
        <span className="status">Coming next</span>
      </section>
    </main>
  );
}
