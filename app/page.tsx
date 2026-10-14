import Link from "next/link";
import GlobalTrafficGlobe from "@/components/global-traffic-globe";

const services = [
  ["01", "Digital experiences", "Websites, ecommerce, and digital products with a clear point of view."],
  ["02", "Useful AI", "Assistants and automations that fit the way your team actually works."],
  ["03", "Steady growth", "Search, campaigns, and measurement built around the right next step."],
  ["04", "Connected operations", "CRM, data, and support that make the whole system easier to run."],
];
const process = [["01", "Listen", "Start with the people, goals, and friction behind the brief."], ["02", "Find the shape", "Agree on a focused plan, the right tools, and what we’ll learn."], ["03", "Build together", "Share work early, make clear decisions, and keep momentum visible."], ["04", "Keep improving", "Launch with care and use what we learn to choose the next move."]];

export default function Home() {
  return <main>
    <section className="hero hero-centered section-shell">
      <span className="eyebrow"><i /> PREMIUM DIGITAL OPERATIONS TEAM</span>
      <h1><span>We run the</span><span className="shine-word">tech.</span><span>You run the</span><span className="shine-word">business.</span></h1>
      <p className="lead">We manage your digital operation, from AI booking agents and CRM integrations to websites, SEO, and ads.</p>
      <div className="actions"><Link className="button button-primary" href="/contact">Start a project <span aria-hidden="true">↗</span></Link><Link className="button button-quiet" href="#work">See our work <span aria-hidden="true">↓</span></Link></div>
      <div className="hero-meta"><span>STRATEGY · DESIGN · BUILD</span><span>INDIA · IST</span><span>ONE CONNECTED TEAM</span></div>
      <div className="hero-signal" aria-hidden="true"><span /><span /><span /><span /><span /><b>✳</b></div>
    </section>

    <div className="ticker" aria-label="Websites, SEO, ads, analytics, automations, and support"><div className="ticker-track"><div className="ticker-group" aria-hidden="false"><span>Websites</span><b>✳</b><span>SEO</span><b>✳</b><span>Ads</span><b>✳</b><span>Analytics</span><b>✳</b><span>Automations</span><b>✳</b><span>Support</span><b>✳</b></div><div className="ticker-group" aria-hidden="true"><span>Websites</span><b>✳</b><span>SEO</span><b>✳</b><span>Ads</span><b>✳</b><span>Analytics</span><b>✳</b><span>Automations</span><b>✳</b><span>Support</span><b>✳</b></div></div></div>

    <section id="services" className="section-shell section-space">
      <div className="section-heading reveal"><div><span className="eyebrow">DIGITAL SOLUTIONS</span><h2>Senior operators for the<br /><span className="brush-underline">systems that grow the revenue.</span></h2></div><p>Websites, ads, AI, data, and operations, brought together in one accountable team.</p></div>
      <div className="service-grid">{services.map(([number, title, body], index) => <Link href="/services" className={`service-card service-card-${index + 1} reveal-card`} key={number}><span className="card-number">{number} / 04</span><div className={`service-motif service-motif-${index + 1}`} aria-hidden="true"><i /><i /><i /><b>{["◉", "✳", "↗", "⌁"][index]}</b></div><div><h3>{title}</h3><p>{body}</p></div><span className="card-arrow" aria-hidden="true">↗</span></Link>)}</div>
    </section>

    <section className="process section-shell reveal"><span className="eyebrow">A CLEAR WAY OF WORKING</span><h2>Careful thinking.<br /><span className="brush-underline">Visible progress.</span></h2><p className="process-intro">Small senior teams work best when everyone knows what’s happening, what’s next, and why it matters.</p><div className="process-steps">{process.map(([number, title, body]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{body}</p></article>)}</div></section>

    <section id="work" className="work-section section-shell section-space"><div className="section-heading reveal"><div><span className="eyebrow">FULL SERVICE CATALOGUE</span><h2>22 services,<br /><em>one accountable team.</em></h2></div><p>From your website to AI reception, campaigns, analytics, and support, every service connects to the same operating rhythm.</p></div><div className="work-grid"><article className="work-card work-card-large reveal-card"><div className="work-visual work-visual-web"><div className="browser-bar"><i /><i /><i /><span>HOME SERVICE · DIGITAL GROWTH</span></div><div className="work-skeleton"><span className="work-kicker">WEBSITE · LOCAL SEO · BOOKINGS</span><b>Turn more visits<br />into <em>booked work.</em></b><p>A clear path from the first search to a real conversation.</p><Link href="/services">Explore the connected system ↗</Link></div><div className="work-orbit" /><div className="work-proof"><i /> DISCOVER <b>→</b> TRUST <b>→</b> BOOK</div></div><div className="work-caption"><div><span className="eyebrow">HOME SERVICE GROWTH SYSTEM</span><h3>From first search to booked job.</h3></div><span className="work-tag">STRATEGY · DESIGN · BUILD</span></div></article><article className="work-card reveal-card"><div className="work-visual work-visual-flow"><div className="automation-label"><span className="eyebrow">AI RECEPTION · ALWAYS READY</span><strong>A useful first response.</strong><small>A considered route from enquiry to the right next step.</small></div><div className="flow-steps"><div className="flow-node"><span>01</span><strong>Customer calls</strong><small>Question or booking request</small></div><span className="flow-line" /><div className="flow-node flow-node-accent"><span>02</span><strong>AI receptionist</strong><small>Answers, gathers context</small></div><span className="flow-line" /><div className="flow-node"><span>03</span><strong>Team follows up</strong><small>Human handoff with context</small></div></div><div className="flow-foot"><i /> CONNECTED WORKFLOW <b>● HUMAN BACKUP</b></div></div><div className="work-caption"><div><span className="eyebrow">PRACTICAL AUTOMATION</span><h3>Keep the helpful human in the loop.</h3></div></div></article></div><p className="work-note">Illustrative examples based on the kinds of connected systems we build; no client results are implied.</p></section>

    <GlobalTrafficGlobe />

    <section className="why-section section-shell reveal"><div className="why-heading"><span className="eyebrow">WHY ETHIXWEB</span><h2>A close-knit team,<br />a <em>clearer partnership.</em></h2><p>We bring an India-rooted perspective and a global outlook to the work, with the people shaping your project close to the decisions.</p><Link className="text-link" href="/about">Meet the studio <span>↗</span></Link></div><div className="why-points"><article><span>01</span><div><h3>Talk to the people doing the work</h3><p>Direct collaboration keeps context intact and decisions moving.</p></div></article><article><span>02</span><div><h3>Make choices with a reason</h3><p>Tools, features, and polish should serve a real business or customer need.</p></div></article><article><span>03</span><div><h3>Keep the next step visible</h3><p>Clear plans and honest trade-offs make the work easier to trust.</p></div></article></div></section>

    <section className="closing section-shell reveal"><div><span className="eyebrow">ROBUST SOLUTIONS</span><h2>Want to work<br /><span className="brush-underline">with us?</span></h2><p>Tired of being caught between tools and ideas? Work with a senior team that takes the time to understand your business.</p></div><Link className="button button-primary" href="/contact">Get in touch <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
