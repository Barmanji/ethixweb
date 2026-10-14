import Link from "next/link";
import Image from "next/image";
import FooterCallout from "./footer-callout";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <FooterCallout />
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
