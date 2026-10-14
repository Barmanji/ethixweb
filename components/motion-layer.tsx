"use client";

import { useEffect } from "react";

export default function MotionLayer({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal, .reveal-card").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal, .reveal-card").forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
    const observe = (root: ParentNode) => root.querySelectorAll(".reveal:not(.is-visible), .reveal-card:not(.is-visible)").forEach((element) => observer.observe(element));
    observe(document);
    const mutations = new MutationObserver((records) => records.forEach((record) => record.addedNodes.forEach((node) => {
      if (!(node instanceof HTMLElement)) return;
      if (node.matches(".reveal:not(.is-visible), .reveal-card:not(.is-visible)")) observer.observe(node);
      observe(node);
    })));
    mutations.observe(document.body, { childList: true, subtree: true });
    return () => { mutations.disconnect(); observer.disconnect(); };
  }, []);
  return children;
}
