import Link from "next/link";
import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-callout">
        <div className="footer-callout-copy">
          <span className="eyebrow">
            <i /> THE NEXT CHAPTER STARTS SOMEWHERE
          </span>
          <h2>
            Make room for
            <br />
            <span className="brush-underline">better work.</span>
          </h2>
          <p>
            Tell us what you want to change, grow, or bring to life. We’ll help
            you find a clear way forward.
          </p>
          <Link href="/contact" className="button button-primary">
            Start a conversation <span aria-hidden="true">↗</span>
          </Link>
        </div>
        <div className="footer-orbit footer-network-art" aria-hidden="true">
          <svg viewBox="0 0 420 420">
            <circle cx="210" cy="210" r="158" />
            <circle cx="210" cy="210" r="118" />
            <circle cx="210" cy="210" r="78" />
            <circle cx="210" cy="210" r="38" />
            <path d="M52 210h316M210 52v316M99 98l222 224M321 98 99 322M72 146c84-54 192-54 276 0M72 274c84 54 192 54 276 0" />
            <path d="M110 118c39 8 57 43 48 78m152-78c-39 8-57 43-48 78M110 302c39-8 57-43 48-78m152 78c-39-8-57-43-48-78" />
          </svg>
          <span className="orbit-core">✳</span>
          <span className="orbit-tag orbit-tag-one">DESIGN</span>
          <span className="orbit-tag orbit-tag-two">SYSTEMS</span>
          <span className="orbit-tag orbit-tag-three">GROWTH</span>
        </div>
      </div>
      <div className="footer-main">
        <div className="footer-brand-column">
          <Link
            className="brand footer-brand"
            href="/"
            aria-label="Ethixweb home"
          >
            <Image
              className="brand-logo footer-brand-logo"
              src="/ethixweb-logo.webp"
              alt="Ethixweb"
              width={148}
              height={22}
            />
          </Link>
          <p>
            Thoughtful digital work, built with care in India and made for
            everywhere.
          </p>
          <a className="footer-email" href="mailto:contact@ethixweb.com">
            contact@ethixweb.com <span>↗</span>
          </a>
        </div>
        <div className="footer-nav">
          <span className="eyebrow">EXPLORE</span>
          <Link href="/services">Services</Link>
          <Link href="/about">Our story</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admin">Lead admin</Link>
        </div>
        <div className="footer-nav">
          <span className="eyebrow">HOW WE HELP</span>
          <Link href="/services">Digital experiences</Link>
          <Link href="/services">AI & automation</Link>
          <Link href="/services">Growth systems</Link>
          <Link href="/services">Ongoing support</Link>
        </div>
        <div className="footer-contact">
          <span className="eyebrow">ROOTED IN INDIA</span>
          <strong>India Standard Time</strong>
          <span>UTC +05:30 · Working across time zones</span>
          <Link className="footer-contact-link" href="/contact">
            Plan a first conversation ↗
          </Link>
        </div>
      </div>
      <div className="footer-word" aria-hidden="true">
        <svg className="footer-word-e" viewBox="0 0 70 100" focusable="false">
          <path d="M4 0h64v26H4ZM4 37h64v26H4ZM4 74h64v26H4Z" />
        </svg>
        THIXW
        <svg className="footer-word-e" viewBox="0 0 70 100" focusable="false">
          <path d="M4 0h64v26H4ZM4 37h64v26H4ZM4 74h64v26H4Z" />
        </svg>
        B<span className="footer-word-reg">®</span>
      </div>
      <div className="footer-bottom">
        <span>© 2026 ETHIXWEB. MADE WITH INTENTION.</span>
        <span>INDIA · 28° N 77° E</span>
        <a href="#top">BACK TO TOP ↑</a>
      </div>
    </footer>
  );
}
