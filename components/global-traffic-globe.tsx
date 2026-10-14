import GlobeCanvas from "./globe-canvas";
import { places } from "@/lib/globe-places";

// This section renders on the server so the heading, labels shell, and cards are
// part of the initial HTML. The heavy WebGL work lives in <GlobeCanvas>, which is
// code-split and only mounts once the globe is near the viewport.
export default function GlobalTrafficGlobe() {
  return (
    <section
      id="global-network"
      className="global-network section-shell"
      aria-labelledby="network-title"
    >
      <div className="network-heading">
        <span className="eyebrow">GLOBAL OPERATIONS NETWORK</span>
        <h2 id="network-title">
          Built for fast moving
          <br />
          teams across time zones.
        </h2>
        <p>
          Seattle, Utah, New York, Canada, the United Kingdom, and India stay
          connected through one responsive digital operations layer.
        </p>
      </div>
      <div className="network-layout">
        <div className="network-globe">
          <GlobeCanvas />
          <span className="network-note">
            ILLUSTRATIVE CONNECTION MAP · DRAG TO ROTATE
          </span>
        </div>
        <div className="network-cards">
          {places.slice(1, 4).map((place, index) => (
            <article className="network-card" key={place.name}>
              <div>
                <i className={`network-status network-status-${index}`} />
                <strong>{place.name}</strong>
                <span className="network-spark" aria-hidden="true">
                  {index === 0 ? "⌁" : index === 1 ? "↗" : "⌘"}
                </span>
              </div>
              <p>
                {
                  [
                    "Active projects",
                    "Maintenance & support",
                    "Strategy & growth",
                  ][index]
                }
              </p>
              <span className="network-card-note">CONNECTED TO INDIA HUB</span>
            </article>
          ))}
          <p className="network-disclaimer">
            Example locations shown to illustrate a connected operating model.
          </p>
        </div>
      </div>
    </section>
  );
}
