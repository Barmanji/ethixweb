"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";

const links = [{ href: "/", label: "Home" }, { href: "/services", label: "Services" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export default function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return <header className={scrolled ? "site-header is-scrolled" : "site-header"}><div className="nav-wrap"><Link className="brand" href="/" aria-label="Ethixweb home"><span className="brand-name">ETHIXWEB<small>INDEPENDENT DIGITAL STUDIO</small></span></Link>
    <nav className={open ? "nav-links is-open" : "nav-links"} aria-label="Main navigation">{links.map(({ href, label }) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}</nav>
    <div className="nav-actions"><span className="nav-location">INDIA · IST</span><ThemeToggle /><Link className="nav-cta" href="/contact">Start a project <span aria-hidden="true">↗</span></Link><button className="menu-toggle" type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}><span /><span /></button></div>
  </div></header>;
}
