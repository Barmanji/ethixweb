"use client";

import { useEffect } from "react";

export default function MotionLayer({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const reveal = () =>
      document
        .querySelectorAll(".reveal, .reveal-card")
        .forEach((element) => element.classList.add("is-visible"));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      reveal();
      return;
    }
    if (!("IntersectionObserver" in window)) {
      reveal();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -32px 0px" },
    );
    const observe = (root: ParentNode) =>
      root
        .querySelectorAll(
          ".reveal:not(.is-visible), .reveal-card:not(.is-visible)",
        )
        .forEach((element) => observer.observe(element));
    observe(document);

    // Batch mutations into a single scan per frame instead of querying the
    // subtree on every DOM change (and once per added node).
    let scheduled = false;
    const mutations = new MutationObserver(() => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        observe(document);
      });
    });
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => {
      mutations.disconnect();
      observer.disconnect();
    };
  }, []);
  return children;
}
