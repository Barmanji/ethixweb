import ContactForm from "@/components/contact-form";

export default function ContactPage() {
  return <main>
    <section className="contact-page section-shell"><div className="contact-intro"><span className="eyebrow">LET’S BEGIN WITH A CONVERSATION</span><h1>Good things<br />start with <em>hello.</em></h1><p className="lead">Tell us a little about what you’re building, changing, or figuring out. We’ll take it from there, together.</p><div className="contact-promise"><span className="promise-icon">✳</span><div><strong>A real person, a considered reply.</strong><p>We read every enquiry ourselves and get back to you by email, usually within one working day.</p></div></div><div className="contact-details"><span className="eyebrow">A STUDIO ROOTED IN INDIA</span><strong>India Standard Time</strong><span>UTC +05:30 · Working across time zones</span><a href="mailto:contact@ethixweb.com">contact@ethixweb.com ↗</a></div></div><ContactForm /></section>
    <section className="contact-strip section-shell"><div><span>01</span><strong>Direct communication</strong></div><div><span>02</span><strong>Thoughtful next steps</strong></div><div><span>03</span><strong>A considered first conversation</strong></div></section>
  </main>;
}
