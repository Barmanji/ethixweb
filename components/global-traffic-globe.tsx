const connections = [
  { name: "Seattle", x: 24, y: 31, curve: "M206 160 Q115 54 62 93" },
  { name: "Utah", x: 29, y: 39, curve: "M206 160 Q120 98 76 117" },
  { name: "New York", x: 41, y: 33, curve: "M206 160 Q155 66 108 99" },
  { name: "Canada", x: 35, y: 24, curve: "M206 160 Q142 34 91 72" },
  { name: "United Kingdom", x: 53, y: 30, curve: "M206 160 Q197 75 149 90" },
];

/** Decorative example network. It does not represent live analytics. */
export default function GlobalTrafficGlobe() {
  return <section className="global-network section-shell" aria-labelledby="network-title">
    <div className="network-heading"><span className="eyebrow">GLOBAL OPERATIONS NETWORK</span><h2 id="network-title">Built for fast moving<br />teams across time zones.</h2><p>Seattle, Utah, New York, Canada, the United Kingdom, and India connected through one responsive digital operations layer.</p></div>
    <div className="network-layout"><div className="network-globe" role="img" aria-label="Illustrative connection map centered on India, with links to North America, the United Kingdom, and Canada">
      <div className="globe-sphere"><div className="globe-land land-north" /><div className="globe-land land-south" /><div className="globe-grid globe-grid-a" /><div className="globe-grid globe-grid-b" /><svg className="globe-routes" viewBox="0 0 260 260" aria-hidden="true">{connections.map((connection) => <path key={connection.name} d={connection.curve} />)}<circle cx="206" cy="160" r="4" className="origin-dot" /></svg>{connections.map((connection) => <span key={connection.name} className="globe-point" style={{ left: `${connection.x}%`, top: `${connection.y}%` }}><i />{connection.name}</span>)}<span className="globe-point india-point"><i />India Hub</span></div><span className="network-note">ILLUSTRATIVE CONNECTION MAP</span></div>
      <div className="network-cards">{connections.slice(0, 3).map((connection, index) => <article className="network-card" key={connection.name}><div><i className={`network-status network-status-${index}`} /><strong>{connection.name}</strong><span className="network-spark" aria-hidden="true">{index === 0 ? "⌁" : index === 1 ? "↗" : "⌘"}</span></div><p>{["Active projects", "Maintenance & support", "Strategy & growth"][index]}</p><span className="network-card-note">CONNECTED TO INDIA HUB</span></article>)}<p className="network-disclaimer">Example locations shown to illustrate a connected operating model.</p></div></div>
  </section>;
}
