const EXPERIENCE = [
  {
    org: 'Cypris AI',
    roles: [{ title: 'Senior Software Engineer', when: 'Mar 2025 – now', where: 'New York' }],
    note: 'Building AI that does the work: an autonomous research agent that runs client research on its own, plus the search systems and infrastructure behind it.',
  },
  {
    org: 'Total Expert',
    roles: [
      { title: 'Senior Software Engineer', when: 'Oct 2023 – Mar 2025', where: 'Minneapolis' },
      { title: 'Software Engineer', when: 'Dec 2020 – Oct 2023', where: 'Minneapolis' },
    ],
  },
  {
    org: 'Gumroad',
    roles: [{ title: 'Investor', when: 'Sep 2021' }],
  },
  {
    org: 'CNA Insurance',
    roles: [{ title: 'Software Engineer', when: 'Aug 2019 – Dec 2020', where: 'Chicago' }],
    note: 'Built a low-latency billing portal used daily by thousands, and client-facing Spring Boot and PostgreSQL services written test-first. Mentored engineers on Vue, mutation testing and clean code.',
  },
]

const SIDE_PROJECTS = [
  {
    name: 'A photo picker that roasts my friends',
    body: 'Runs my photography through a vision model, picks the best shots, writes a caption that roasts whoever is in them, and posts to Instagram on its own.',
  },
  {
    name: 'An agentic trading desk',
    body: 'Claude researches and places trades by itself, wired to Robinhood, with Telegram as the control panel.',
  },
]

export default function Profile() {
  return (
    <div className="pf">
      <section id="work" className="pf-feature" aria-labelledby="pf-feature-title">
        <p className="pf-kicker">Latest project</p>
        <h2 id="pf-feature-title" className="pf-feature__title">
          <a href="https://budgetchill.app" target="_blank" rel="noopener">
            Budget <em>&amp;</em> Chill
          </a>
        </h2>
        <p className="pf-feature__lede">“Budgeting is just knowing where your money goes.”</p>
        <div className="pf-feature__cols">
          <p>
            A budget and bill-splitting app for iPhone and the web. You check it on your phone every day and plan on the
            web once a month. It connects to your bank read-only through Plaid, and splitting with friends is free.
          </p>
          <p>
            I’m the founding father, and the company is part of the experiment: I run it as an office in the spirit of
            Dunder Mifflin, staffed with its own cast, while I set the direction.
          </p>
        </div>
        <a className="pf-btn" href="https://budgetchill.app" target="_blank" rel="noopener">
          budgetchill.app <span aria-hidden="true">↗</span>
        </a>
      </section>

      <section className="pf-block" aria-labelledby="pf-about">
        <h2 id="pf-about" className="pf-h">About</h2>
        <div className="pf-prose">
          <p>
            I build production systems end to end: data pipeline, backend, frontend. I’ve shipped across all of them,
            mostly inside companies where the stakes are real users and real revenue, and it shows up as paying clients
            and growth tied to what I built.
          </p>
          <p>
            I’ve led teams, managed projects and mentored engineers. A lot of that came from coaching and leading sports
            teams, not just from work. I’m comfortable owning client relationships and turning business needs into
            technical roadmaps. I just don’t love meetings that could have been a decision.
          </p>
          <p>
            With AI doing more of the typing, I think in systems and outcomes and direct the work, then go deep and get
            hands-on when it counts. A product-focused generalist who wants to get things done, which is why startups fit
            me.
          </p>
        </div>
      </section>

      <section className="pf-block" aria-labelledby="pf-side">
        <h2 id="pf-side" className="pf-h">Also building</h2>
        <ul className="pf-cards">
          {SIDE_PROJECTS.map((p) => (
            <li key={p.name} className="pf-card">
              <h3>{p.name}</h3>
              <p>{p.body}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="pf-block" aria-labelledby="pf-exp">
        <h2 id="pf-exp" className="pf-h">Experience</h2>
        <ol className="pf-exp">
          {EXPERIENCE.map((e) => (
            <li key={e.org}>
              <h3>{e.org}</h3>
              {e.roles.map((r) => (
                <p key={r.title + r.when} className="pf-exp__role">
                  <span>{r.title}</span>
                  <span className="pf-exp__meta">
                    {r.when}
                    {r.where ? ` · ${r.where}` : ''}
                  </span>
                </p>
              ))}
              {e.note && <p className="pf-exp__note">{e.note}</p>}
            </li>
          ))}
        </ol>
      </section>

      <section className="pf-block pf-facts" aria-label="Education and skills">
        <div>
          <h2 className="pf-h">Education</h2>
          <p>DePaul University<br /><span className="pf-soft">BS, Computer Science</span></p>
          <p>Linköping University<br /><span className="pf-soft">BBA, Project Management</span></p>
        </div>
        <div>
          <h2 className="pf-h">Toolbox</h2>
          <p>AWS · C# · Vue.js · Java · Python · Spring Boot</p>
          <p>Certified Kubernetes Application Developer (CKAD)</p>
          <p className="pf-soft">English and Russian, both native</p>
        </div>
      </section>

      <footer className="pf-foot">
        <p className="pf-foot__title">
          Say <em>hi.</em>
        </p>
        <ul className="pf-links">
          <li><a href="mailto:polegarh@gmail.com">Email</a></li>
          <li><a href="https://www.linkedin.com/in/puchkovoleg" target="_blank" rel="noopener">LinkedIn</a></li>
          <li><a href="https://github.com/polegarh" target="_blank" rel="noopener">GitHub</a></li>
          <li><a href="https://budgetchill.app" target="_blank" rel="noopener">Budget &amp; Chill</a></li>
        </ul>
        <p className="pf-soft">© Oleg Puchkov · New York</p>
      </footer>
    </div>
  )
}
