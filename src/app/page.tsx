const EXPERIENCE = [
  {
    date: "2025",
    company: "VideoAmp",
    title: "Intermediate Data Engineer",
    description:
      "Built Snowflake and Airflow ETL pipelines powering daily reporting dashboards.",
  },
  {
    date: "2023–25",
    company: "Fincons · AppleTV+",
    title: "Software Engineer I",
    description:
      "Architected a Single-Source-of-Truth metadata platform across 7 systems, using GraphQL federation and Kafka pipelines handling 10k+ events a day.",
  },
  {
    date: "2022–23",
    company: "Fincons · AppleTV+",
    title: "Associate Software Engineer",
    description:
      "Led development of a multi-tenant notification system and built a secure file attachment feature with versioning.",
  },
  {
    date: "2020",
    company: "3Diligent",
    title: "Backend Software Engineering Intern",
    description:
      "Built dynamic price estimation from historical purchase data and automated API test suites.",
  },
];

const ROOMFUL_TAGS = ["Next.js", "TypeScript", "Cloudflare Durable Objects", "Tailwind"];

export default function Home() {
  return (
    <div className="flex flex-1 justify-center">
      <div className="flex w-full max-w-[860px] flex-1 flex-col px-6 py-12 md:px-8 md:py-16">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4 text-sm font-semibold md:mb-10">
          <span>Andrew Chau</span>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-normal">
            <a
              href="https://github.com/chauandrew"
              className="text-muted hover:text-accent"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/chau-andrew/"
              className="text-muted hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href="mailto:andrewchau333@gmail.com"
              className="text-muted hover:text-accent"
            >
              Email
            </a>
            <a
              href="/andrew-chau-resume.pdf"
              download
              className="font-semibold text-accent"
            >
              Resume ↓
            </a>
          </nav>
        </header>

        <div className="mb-8 flex items-center gap-2 text-sm text-muted">
          <span className="status-dot h-2 w-2 shrink-0 animate-[status-pulse_2.2s_infinite] rounded-full bg-accent" />
          Open to backend and data roles. Just back from a year of humanitarian
          work abroad.
        </div>

        <h1 className="mb-14 max-w-[34ch] text-balance text-[1.9rem] leading-[1.35] font-medium tracking-tight md:text-[2.3rem]">
          I build backend systems and pipelines for work, and{" "}
          <span className="text-accent">icebreaker games</span> that get a
          room of strangers laughing.
        </h1>

        <section>
          <h2 className="mb-5 text-xs tracking-wider text-muted uppercase">
            Projects
          </h2>
          <div className="grid grid-cols-1 items-start gap-4 border-t border-border py-6 md:grid-cols-[1fr_auto]">
            <div>
              <h3 className="mb-2 text-lg font-semibold">Roomful</h3>
              <p className="mb-3 max-w-[52ch] text-[0.92rem] text-muted">
                Party games for a room full of people. A host projects the
                lobby onto a screen, and players join from their phones with
                a 4-letter code, no account needed. Each room lives on its
                own tiny server that just disappears once everyone&apos;s
                gone.
              </p>
              <div className="flex flex-wrap gap-x-1 text-[0.72rem] text-muted">
                {ROOMFUL_TAGS.map((tag, i) => (
                  <span key={tag}>
                    {tag}
                    {i < ROOMFUL_TAGS.length - 1 ? " · " : ""}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex shrink-0 gap-2 md:flex-col">
              <a
                href="https://roomful.vercel.app"
                className="rounded-full border border-accent px-3 py-1.5 text-center text-sm whitespace-nowrap text-accent"
              >
                Live ↗
              </a>
              <a
                href="https://github.com/chauandrew/roomful"
                className="px-3 py-1.5 text-center text-sm whitespace-nowrap text-muted"
              >
                Code ↗
              </a>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mt-14 mb-5 text-xs tracking-wider text-muted uppercase">
            Experience
          </h2>
          <div className="space-y-5">
            {EXPERIENCE.map((job) => (
              <div
                key={`${job.company}-${job.title}`}
                className="grid grid-cols-[7ch_1fr] gap-4 text-sm md:grid-cols-[9ch_1fr]"
              >
                <span className="pt-0.5 text-[0.8rem] text-muted">
                  {job.date}
                </span>
                <div>
                  <p>
                    <span className="font-semibold">{job.company}</span>{" "}
                    <span className="text-muted">· {job.title}</span>
                  </p>
                  <p className="mt-1 max-w-[52ch] text-[0.88rem] text-muted">
                    {job.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mt-14 mb-5 text-xs tracking-wider text-muted uppercase">
            About
          </h2>
          <p className="max-w-[58ch] text-[0.92rem] leading-relaxed text-muted">
            UCLA CS, 2021. Outside of shipping code I{" "}
            <span className="text-accent">boulder</span> (stuck at v6-7 for
            now), bake more than one person should really eat alone, and
            host game nights for 50+ college and high school students. That
            last one is basically how Roomful started.
          </p>
        </section>

        <footer className="mt-14 border-t border-border pt-6 text-xs text-muted">
          Built with Next.js.
        </footer>
      </div>
    </div>
  );
}
