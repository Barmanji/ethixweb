"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// The marketing callout invites visitors to start a new enquiry. It is
// irrelevant inside the private admin workspace, so it is hidden there while
// the rest of the footer stays in place.
export default function FooterCallout() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
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
  );
}
