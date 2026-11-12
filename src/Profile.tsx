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

const FACTS = [
  ['Day job', 'Senior engineer at Cypris AI, teaching an agent to do client research on its own.'],
  ['Side quest', 'Founding father of Budget & Chill.'],
  ['Leadership training', 'Coaching sports teams. Honestly, more than any job.'],
  ['Pet peeve', 'Meetings that could have been a decision.'],
  ['Fluent in', 'English, Russian, and roasting my friends in Instagram captions. A model does that for me now.'],
  ['Happy place', '90 °C, felt hat on, phone outside.'],
]

const ELSEWHERE = [
  {
    href: 'https://olegpuchkov.substack.com/',
    kicker: 'Writing',
    name: 'Substack',
    handle: 'olegpuchkov.substack.com',
    body: 'Personal thoughts, stories, passion projects and everything in between. Subscribe and it lands in your inbox.',
    cta: 'Subscribe',
  },
  {
    href: 'https://medium.com/@PuchkovOleg',
    kicker: 'The archive',
    name: 'Medium',
    handle: '@PuchkovOleg',
    body: 'Older writing from earlier in my career, before the newsletter.',
    cta: 'Read',
  },
  {
    href: 'https://github.com/polegarh',
    kicker: 'Code',
    name: 'GitHub',
    handle: '@polegarh',
    body: 'Two dozen public repos going back to college, from a Lisp compiler in Scala to iOS apps, plus the source of this site, fog engine included.',
    cta: 'Browse',
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
        <div>
          <div className="pf-prose">
            <p>
              I build production systems end to end. <em>Then I go sit in a sauna.</em>
            </p>
            <p>
              Data pipeline, backend, frontend: I’ve shipped across all of them, mostly where the stakes are real users
              and real revenue. I’ve led teams, mentored engineers and owned client relationships. These days AI does more
              of the typing, so I think in systems and outcomes, direct the work, and still go deep when it counts. A
              product-focused generalist who wants to get things done, which is why startups fit me.
            </p>
          </div>
          <dl className="pf-fun">
            {FACTS.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="pf-block" aria-labelledby="pf-elsewhere">
        <h2 id="pf-elsewhere" className="pf-h">Find me elsewhere</h2>
        <ul className="pf-elsewhere">
          {ELSEWHERE.map((l) => (
            <li key={l.name}>
              <a href={l.href} target="_blank" rel="noopener">
                <span className="pf-elsewhere__kicker">{l.kicker}</span>
                <span className="pf-elsewhere__name">{l.name}</span>
                <span className="pf-elsewhere__handle">{l.handle}</span>
                <span className="pf-elsewhere__body">{l.body}</span>
                <span className="pf-elsewhere__cta">
                  {l.cta} <span aria-hidden="true">↗</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
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
          <li><a href="https://olegpuchkov.substack.com/" target="_blank" rel="noopener">Substack</a></li>
          <li><a href="https://medium.com/@PuchkovOleg" target="_blank" rel="noopener">Medium</a></li>
          <li><a href="https://budgetchill.app" target="_blank" rel="noopener">Budget &amp; Chill</a></li>
        </ul>
        <p className="pf-soft">© Oleg Puchkov · New York</p>
      </footer>
    </div>
  )
}
