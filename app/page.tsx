import Link from "next/link";
import CreepyButton from "@/components/ui/creepy-button";
import GlobalTrafficGlobe from "@/components/global-traffic-globe";
import ProcessFlipCards from "@/components/process-flip-cards";

const services = [
  [
    "01",
    "Digital experiences",
    "Websites, ecommerce, and digital products with a clear point of view.",
  ],
  [
    "02",
    "Useful AI",
    "Assistants and automations that fit the way your team actually works.",
  ],
  [
    "03",
    "Steady growth",
    "Search, campaigns, and measurement built around the right next step.",
  ],
  [
    "04",
    "Connected operations",
    "CRM, data, and support that make the whole system easier to run.",
  ],
];
const tickerItems = [
  "Websites",
  "SEO",
  "Ads",
  "Analytics",
  "Automations",
  "Support",
];

export default function Home() {
  return (
    <main>
      <section className="hero hero-centered section-shell">
        <span className="eyebrow">
          <i /> PREMIUM DIGITAL OPERATIONS TEAM
        </span>
        <h1>
          <span>We run the</span>
          <span className="shine-word brush-underline">tech.</span>
          <span>You run the</span>
          <span className="shine-word brush-underline">business.</span>
        </h1>
        <p className="lead">
          We manage your digital operation, from AI booking agents and CRM
          integrations to websites, SEO, and ads.
        </p>
        <div className="actions">
          <Link className="button button-primary" href="/contact">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
          <CreepyButton
            href="/services"
            className="hero-creepy"
            coverClassName="hero-creepy-cover"
          >
            Explore services <span aria-hidden="true">↗</span>
          </CreepyButton>
        </div>
        <div className="hero-meta">
          <span>STRATEGY · DESIGN · BUILD</span>
          <span>INDIA · IST</span>
          <span>ONE CONNECTED TEAM</span>
        </div>
      </section>

      <div
        className="ticker"
        aria-label="Websites, SEO, ads, analytics, automations, and support"
      >
        <div className="ticker-track">
          {Array.from({ length: 2 }, (_, group) => (
            <div className="ticker-group" aria-hidden={group > 0} key={group}>
              {tickerItems.map((item) => (
                <span className="ticker-item" key={item}>
                  <span>{item}</span>
                  <b>✳</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="services" className="section-shell section-space">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">DIGITAL SOLUTIONS</span>
            <h2>
              Senior operators for the
              <br />
              <span className="brush-underline">
                systems that grow the revenue.
              </span>
            </h2>
          </div>
          <p>
            Websites, ads, AI, data, and operations, brought together in one
            accountable team.
          </p>
        </div>
        <div className="service-grid">
          {services.map(([number, title, body], index) => (
            <Link
              href="/services"
              className={`service-card service-card-${index + 1} reveal-card`}
              key={number}
            >
              <span className="card-number">{number} / 04</span>
              <ServiceDiagram index={index} />
              <div className="service-card-copy">
                <h3>{title}</h3>
                <p>{body}</p>
              </div>
              <span className="card-explore">
                VIEW THE SYSTEM <b aria-hidden="true">↗</b>
              </span>
              <span className="card-arrow" aria-hidden="true">
                ↗
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="process section-shell reveal">
        <span className="eyebrow">A CLEAR WAY OF WORKING</span>
        <h2>
          Careful thinking.
          <br />
          <span className="brush-underline">Visible progress.</span>
        </h2>
        <p className="process-intro">
          Small senior teams work best when everyone knows what’s happening,
          what’s next, and why it matters.
        </p>
        <ProcessFlipCards />
      </section>

      <section id="work" className="work-section section-shell section-space">
        <div className="section-heading reveal">
          <div>
            <span className="eyebrow">FULL SERVICE CATALOGUE</span>
            <h2>
              22 services,
              <br />
              <em>one accountable team.</em>
            </h2>
          </div>
          <p>
            From your website to AI reception, campaigns, analytics, and
            support, every service connects to the same operating rhythm.
          </p>
        </div>
        <div className="work-grid">
          <article className="work-card work-card-large reveal-card">
            <div className="work-visual work-visual-web">
              <div className="browser-bar">
                <i />
                <i />
                <i />
                <span>HOME SERVICE · DIGITAL GROWTH</span>
              </div>
              <div className="work-skeleton">
                <span className="work-kicker">
                  WEBSITE · LOCAL SEO · BOOKINGS
                </span>
                <b>
                  Turn more visits
                  <br />
                  into <em>booked work.</em>
                </b>
                <p>
                  A clear path from the first search to a real conversation.
                </p>
                <Link href="/services">Explore the connected system ↗</Link>
              </div>
              <div className="work-orbit" />
              <div className="work-proof">
                <i /> DISCOVER <b>→</b> TRUST <b>→</b> BOOK
              </div>
            </div>
            <div className="work-caption">
              <div>
                <span className="eyebrow">HOME SERVICE GROWTH SYSTEM</span>
                <h3>From first search to booked job.</h3>
              </div>
              <span className="work-tag">STRATEGY · DESIGN · BUILD</span>
            </div>
          </article>
          <article className="work-card reveal-card">
            <div className="work-visual work-visual-flow">
              <div className="automation-label">
                <span className="eyebrow">AI RECEPTION · ALWAYS READY</span>
                <strong>A useful first response.</strong>
                <small>
                  A considered route from enquiry to the right next step.
                </small>
              </div>
              <div className="flow-steps">
                <div className="flow-node">
                  <span>01</span>
                  <strong>Customer calls</strong>
                  <small>Question or booking request</small>
                </div>
                <span className="flow-line" />
                <div className="flow-node flow-node-accent">
                  <span>02</span>
                  <strong>AI receptionist</strong>
                  <small>Answers, gathers context</small>
                </div>
                <span className="flow-line" />
                <div className="flow-node">
                  <span>03</span>
                  <strong>Team follows up</strong>
                  <small>Human handoff with context</small>
                </div>
              </div>
              <div className="flow-foot">
                <i /> HUMAN HANDOFF · CONTEXT INCLUDED
              </div>
            </div>
            <div className="work-caption">
              <div>
                <span className="eyebrow">PRACTICAL AUTOMATION</span>
                <h3>Keep the helpful human in the loop.</h3>
              </div>
            </div>
          </article>
        </div>
        <p className="work-note">
          Illustrative examples based on the kinds of connected systems we
          build; no client results are implied.
        </p>
      </section>

      <GlobalTrafficGlobe />

      <section className="why-section section-shell reveal">
        <div className="why-heading">
          <span className="eyebrow">WHY ETHIXWEB</span>
          <h2>
            A close-knit team,
            <br />a <em>clearer partnership.</em>
          </h2>
          <p>
            We bring an India-rooted perspective and a global outlook to the
            work, with the people shaping your project close to the decisions.
          </p>
          <Link className="text-link" href="/about">
            Meet the studio <span>↗</span>
          </Link>
        </div>
        <div className="why-points">
          <article>
            <span>01</span>
            <div>
              <h3>Talk to the people doing the work</h3>
              <p>
                Direct collaboration keeps context intact and decisions moving.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Make choices with a reason</h3>
              <p>
                Tools, features, and polish should serve a real business or
                customer need.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Keep the next step visible</h3>
              <p>
                Clear plans and honest trade-offs make the work easier to trust.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="closing section-shell reveal">
        <div>
          <span className="eyebrow">ROBUST SOLUTIONS</span>
          <h2>
            Want to work
            <br />
            <span className="brush-underline">with us?</span>
          </h2>
          <p>
            Tired of being caught between tools and ideas? Work with a senior
            team that takes the time to understand your business.
          </p>
        </div>
        <Link className="button button-primary" href="/contact">
          Get in touch <span aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}

function ServiceDiagram({ index }: { index: number }) {
  return (
    <div
      className={`service-card-art service-card-art-${index + 1}`}
      aria-hidden="true"
    >
      {index === 0 && (
        <svg viewBox="0 0 260 130">
          <rect x="70" y="12" width="116" height="78" rx="8" />
          <rect x="79" y="23" width="98" height="56" rx="3" />
          <path d="M90 39h36M90 49h68M90 59h49" />
          <rect x="28" y="50" width="50" height="66" rx="7" />
          <path d="M36 61h34M36 69h24M36 78h29" />
          <rect x="178" y="58" width="53" height="57" rx="7" />
          <path d="M186 70h36M186 78h24M186 87h30" />
          <circle cx="212" cy="103" r="2" />
        </svg>
      )}
      {index === 1 && (
        <svg viewBox="0 0 260 130">
          <rect x="49" y="15" width="162" height="100" rx="10" />
          <path d="M49 34h162M62 25h2m8 0h2m8 0h2" />
          <rect x="65" y="46" width="94" height="48" rx="5" />
          <path d="M75 58h44M75 67h68M75 76h53" />
          <circle cx="181" cy="58" r="9" />
          <circle cx="181" cy="83" r="9" />
          <path d="M159 61h13m-13 22h13m9-16v7" />
          <path d="M82 103h96" />
        </svg>
      )}
      {index === 2 && (
        <svg viewBox="0 0 260 130">
          <path
            className="diagram-grid"
            d="M34 25h194M34 53h194M34 81h194M34 109h194M53 18v98M95 18v98M137 18v98M179 18v98M221 18v98"
          />
          <path
            className="diagram-line"
            d="m48 91 38-15 34 9 33-34 28 8 31-30"
          />
          <circle cx="212" cy="29" r="4" />
          <rect x="52" y="92" width="18" height="18" rx="2" />
          <rect x="80" y="82" width="18" height="28" rx="2" />
          <rect x="108" y="70" width="18" height="40" rx="2" />
          <rect x="136" y="57" width="18" height="53" rx="2" />
        </svg>
      )}
      {index === 3 && (
        <svg viewBox="0 0 260 130">
          <path d="M130 27 71 62l59 38 59-38-59-35Zm-59 35H35m36 0 59 38m59-38h36m-36 0-59 38m0-73v73" />
          <circle cx="130" cy="27" r="9" />
          <circle cx="71" cy="62" r="8" />
          <circle cx="189" cy="62" r="8" />
          <circle cx="130" cy="100" r="9" />
          <circle cx="35" cy="62" r="5" />
          <circle cx="225" cy="62" r="5" />
        </svg>
      )}
      <span className="diagram-label">
        {
          [
            "RESPONSIVE BY DESIGN",
            "HUMAN + AUTOMATION",
            "MEASURE WHAT MATTERS",
            "CONNECTED OPERATIONS",
          ][index]
        }
      </span>
    </div>
  );
}
