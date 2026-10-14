"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import IndiaClock from "@/components/india-clock";

const links = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);
  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="nav-wrap">
        <Link className="brand" href="/" aria-label="Ethixweb home">
          <Image
            className="brand-logo nav-brand-logo"
            src="/ethixweb-logo.webp"
            alt="Ethixweb"
            width={176}
            height={27}
            priority
          />
        </Link>
        <nav
          id="primary-navigation"
          className={open ? "nav-links is-open" : "nav-links"}
          aria-label="Main navigation"
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            className="mobile-nav-cta"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            Start a project <span aria-hidden="true">↗</span>
          </Link>
        </nav>
        <div className="nav-actions">
          <IndiaClock />
          <ThemeToggle />
          <Link className="nav-cta" href="/contact">
            Start a project <span aria-hidden="true">↗</span>
          </Link>
          <button
            ref={menuButtonRef}
            className="menu-toggle"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-controls="primary-navigation"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
