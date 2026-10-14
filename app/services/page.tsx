import Link from "next/link";

const disciplines = [
  {
    n: "01",
    title: "Website & digital",
    intro:
      "A confident digital front door, backed by a foundation your team can keep building on.",
    items: [
      "Website redesign",
      "Headless architecture",
      "Landing pages",
      "Maintenance & security",
    ],
  },
  {
    n: "02",
    title: "AI & automation",
    intro:
      "Useful, well-scoped AI that helps customers get answers and teams move through repetitive work.",
    items: [
      "Knowledge chatbot",
      "LLM chatbot & assistants",
      "AI receptionist / CSR",
      "Human handoff design",
    ],
  },
  {
    n: "03",
    title: "Growth & discovery",
    intro:
      "A connected approach to helping the right people find you, understand you, and take action.",
    items: [
      "Search engine optimisation",
      "Google Ads & Local Services Ads",
      "Meta advertising",
      "Social content systems",
      "Email marketing",
      "CRM integration",
    ],
  },
  {
    n: "04",
    title: "Data & measurement",
    intro:
      "Useful signals from your digital channels, shaped into a clearer view of what is happening.",
    items: [
      "Performance dashboards",
      "Analytics & event tracking",
      "Monthly reporting",
    ],
  },
  {
    n: "05",
    title: "Accessibility",
    intro:
      "More inclusive experiences built with practical checks throughout the design and development process.",
    items: ["Accessibility improvements", "Accessibility testing"],
  },
  {
    n: "06",
    title: "Ongoing support",
    intro:
      "A reliable team to help your website and connected systems stay useful after launch.",
    items: ["Technical support", "AI & content updates", "API maintenance"],
  },
];
const process = [
  [
    "01",
    "Discover & prioritise",
    "Understand the business, customers, and constraints. Agree on what is worth solving first.",
  ],
  [
    "02",
    "Design the approach",
    "Shape the experience and the system, with a plan your team can follow.",
  ],
  [
    "03",
    "Build in the open",
    "Share working progress, connect the pieces, and keep decisions easy to review.",
  ],
  [
    "04",
    "Learn & improve",
    "Use real feedback and useful measurement to guide the next iteration.",
  ],
];

export default function ServicesPage() {
  return (
    <main>
      <section className="page-hero services-hero section-shell">
        <span className="eyebrow">SERVICES · ONE CONNECTED PRACTICE</span>
        <h1>
          Build a digital system
          <br />
          that <span className="brush-underline">works together.</span>
        </h1>
        <p className="lead">
          Websites, AI, growth, data, accessibility, and support, brought
          together by one senior team with your business in mind.
        </p>
        <div className="page-hero-aside">
          <span>6 PRACTICES · 22 WAYS TO HELP</span>
          <span>INDIA · IST</span>
        </div>
      </section>
      <section className="capability-overview section-shell">
        <span className="eyebrow">THE WORK BEHIND THE WORK</span>
        <h2>
          Senior thinking for the
          <br />
          <em>systems that keep you moving.</em>
        </h2>
        <p>
          We bring focused expertise across experience design, engineering,
          automation, and growth. Choose one area or connect several around a
          shared outcome.
        </p>
        <div className="capability-grid">
          {[
            [
              "Experience design",
              "Clear paths through your website, product, and customer journey.",
            ],
            [
              "Applied intelligence",
              "AI and automation matched to real tasks and clear human oversight.",
            ],
            [
              "Growth systems",
              "Discovery, campaigns, and measurement that work as one.",
            ],
            [
              "Connected operations",
              "Data and tools organised around the way your team works.",
            ],
          ].map(([title, body], i) => (
            <article
              className={`capability-card capability-card-${i + 1} reveal-card`}
              key={title}
            >
              <span>0{i + 1} / PRACTICE</span>
              <div
                className={`service-motif service-motif-${i + 1}`}
                aria-hidden="true"
              >
                <i />
                <i />
                <i />
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="service-catalog section-shell section-space">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">THE FULL SERVICE CATALOGUE</span>
            <h2>
              22 capabilities.
              <br />
              <em>One accountable team.</em>
            </h2>
          </div>
          <p>
            Start with a focused need or bring us the larger picture. We’ll help
            map what belongs together.
          </p>
        </div>
        <div className="catalog-grid">
          {disciplines.map((item, index) => (
            <article className="catalog-card reveal-card" key={item.n}>
              <div className="catalog-head">
                <span className="catalog-icon">
                  {["◌", "✳", "↗", "⌁", "◉", "＋"][index]}
                </span>
                <span>
                  {item.items.length.toString().padStart(2, "0")} SERVICES
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.intro}</p>
              <ul>
                {item.items.map((entry) => (
                  <li key={entry}>
                    <span className="catalog-bullet">↗</span>
                    <span>
                      <strong>{entry}</strong>
                      <small>{serviceDescription(entry)}</small>
                    </span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="text-link">
                Talk about this area <span>↗</span>
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="process section-shell reveal">
        <span className="eyebrow">HOW AN ENGAGEMENT RUNS</span>
        <h2>
          Understand first.
          <br />
          <span className="brush-underline">Build with purpose.</span>
        </h2>
        <p className="process-intro">
          Every project moves through a shared rhythm, so you know what is
          happening and what comes next.
        </p>
        <div className="process-steps">
          {process.map(([n, title, body]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="closing section-shell reveal">
        <div>
          <span className="eyebrow">START WITH THE REAL NEED</span>
          <h2>
            Not sure where
            <br />
            to begin? <em>That’s fine.</em>
          </h2>
          <p>
            Tell us what feels stuck or full of possibility. We’ll help you find
            a good first step.
          </p>
        </div>
        <Link className="button button-primary" href="/contact">
          Talk it through <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

function serviceDescription(title: string) {
  const descriptions: Record<string, string> = {
    "Website redesign": "A clearer, more capable digital front door.",
    "Headless architecture": "Flexible foundations for content and growth.",
    "Landing pages": "Focused pages for a campaign or service.",
    "Maintenance & security": "Updates and care to support a dependable site.",
    "Knowledge chatbot": "Answers grounded in your own useful content.",
    "LLM chatbot & assistants": "Conversational help shaped around real tasks.",
    "AI receptionist / CSR": "A first response for calls and common enquiries.",
    "Human handoff design": "A clear route to a person when needed.",
    "Search engine optimisation":
      "Technical and content foundations for discovery.",
    "Google Ads & Local Services Ads":
      "Campaign setup and ongoing optimisation.",
    "Meta advertising": "Paid social creative, targeting, and learning.",
    "Social content systems": "A repeatable plan for useful social content.",
    "Email marketing": "Audience journeys and relevant follow-up.",
    "CRM integration": "Connected customer data and workflows.",
    "Performance dashboards": "A readable view of your chosen signals.",
    "Analytics & event tracking":
      "A considered way to understand interactions.",
    "Monthly reporting": "Regular context around what changed and why.",
    "Accessibility improvements":
      "Practical refinements for a wider range of people.",
    "Accessibility testing":
      "Checks against recognised accessibility criteria.",
    "Technical support": "Help with everyday site and platform issues.",
    "AI & content updates": "Keep your knowledge and experiences current.",
    "API maintenance": "Care for the connections between your tools.",
  };
  return descriptions[title];
}
