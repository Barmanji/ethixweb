"use client";

import { useEffect, useRef, useState } from "react";
import { places } from "@/lib/globe-places";

export default function GlobeCanvas() {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const [ready, setReady] = useState(false);

  // Defer everything — the three.js library and the scene code — until the
  // globe is close to the viewport. On a typical visit the visitor never causes
  // either bundle to load, so they stay out of the homepage's initial JS.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!ready) return;
    let cleanup: (() => void) | undefined;
    let cancelled = false;
    Promise.all([import("./globe-scene"), import("three")]).then(
      ([scene, THREE]) => {
        if (cancelled || !hostRef.current) return;
        cleanup = scene.createGlobe(
          THREE,
          hostRef.current,
          labelsRef.current,
          places,
        );
      },
    );
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [ready]);

  return (
    <div ref={hostRef} className="globe-three-host">
      {places.map((place, index) => (
        <span
          className={`globe-three-label${place.hub ? " is-hub" : ""}`}
          key={place.name}
          ref={(element) => {
            labelsRef.current[index] = element;
          }}
        >
          {place.name}
        </span>
      ))}
    </div>
  );
}
