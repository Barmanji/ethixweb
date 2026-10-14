"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const places = [
  { name: "India Hub", lat: 22.5, lon: 78.9, hub: true },
  { name: "Seattle", lat: 47.6, lon: -122.3 },
  { name: "Utah", lat: 39.3, lon: -111.9 },
  { name: "New York", lat: 40.7, lon: -74 },
  { name: "Canada", lat: 56, lon: -106 },
  { name: "United Kingdom", lat: 54, lon: -2 },
];

const landShapes = [
  [[72, -168], [70, -140], [60, -125], [52, -130], [48, -124], [40, -123], [32, -117], [24, -108], [18, -104], [13, -90], [17, -83], [9, -78], [8, -61], [15, -61], [23, -75], [30, -80], [35, -75], [45, -65], [51, -56], [58, -62], [61, -78], [71, -85], [75, -105], [72, -125]],
  [[72, -10], [70, 30], [60, 55], [55, 80], [48, 95], [55, 120], [48, 140], [40, 130], [33, 122], [25, 110], [18, 108], [8, 105], [3, 95], [10, 78], [20, 68], [25, 55], [35, 45], [40, 30], [48, 15], [55, 8], [60, -8]],
  [[36, -18], [32, 10], [22, 25], [12, 42], [3, 50], [-12, 42], [-25, 32], [-35, 20], [-30, 5], [-20, -5], [-5, -12], [8, -16], [20, -17]],
  [[58, -8], [60, 2], [55, 5], [50, 2], [49, -5], [53, -8]],
  [[28, 68], [30, 88], [22, 94], [8, 80], [8, 72], [18, 68]],
];
function contains(poly: number[][], lat: number, lon: number) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [yi, xi] = poly[i],
      [yj, xj] = poly[j];
    if (
      xi > lon !== xj > lon &&
      lat < ((yj - yi) * (lon - xi)) / (xj - xi) + yi
    )
      inside = !inside;
  }
  return inside;
}

function spherePoint(lat: number, lon: number, radius = 1) {
  const phi = THREE.MathUtils.degToRad(90 - lat);
  const theta = THREE.MathUtils.degToRad(lon + 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function makeLandTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1440;
  canvas.height = 720;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const ocean = ctx.createRadialGradient(
    canvas.width * 0.42,
    canvas.height * 0.35,
    20,
    canvas.width * 0.55,
    canvas.height * 0.5,
    canvas.width * 0.7,
  );
  ocean.addColorStop(0, "#1b252a");
  ocean.addColorStop(0.62, "#12191d");
  ocean.addColorStop(1, "#24191b");
  ctx.fillStyle = ocean;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  for (const shape of landShapes) {
    ctx.beginPath();
    shape.forEach(([lat, lon], index) => {
      const x = ((lon + 180) / 360) * canvas.width;
      const y = ((90 - lat) / 180) * canvas.height;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.strokeStyle = "rgba(235,125,105,.22)";
    ctx.lineWidth = 0.65;
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function GlobalTrafficGlobe() {
  const hostRef = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);
  const rotationRef = useRef({
    dragging: false,
    x: 0,
    y: 0,
    rotX: -0.12,
    rotY: Math.PI,
  });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.className = "globe-three-canvas";
    renderer.domElement.setAttribute("aria-hidden", "true");
    host.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30);
    camera.position.z = 3.55;
    const globe = new THREE.Group();
    scene.add(globe);
    globe.rotation.x = rotationRef.current.rotX;
    globe.rotation.y = rotationRef.current.rotY;

    scene.add(new THREE.AmbientLight(0x9b7370, 1.2));
    const keyLight = new THREE.DirectionalLight(0xffdfd0, 1.65);
    keyLight.position.set(-2.8, 2.2, 4);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x9f4548, 0.75);
    rimLight.position.set(3, -0.6, -2);
    scene.add(rimLight);
    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1, 80, 64),
      new THREE.MeshPhongMaterial({
        map: makeLandTexture(),
        color: 0xd3c7c0,
        specular: 0x593635,
        shininess: 18,
        emissive: 0x170c0f,
        emissiveIntensity: 0.55,
      }),
    );
    globe.add(sphere);
    const atmosphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.025, 64, 48),
      new THREE.MeshBasicMaterial({
        color: 0xdf6a60,
        side: THREE.BackSide,
        transparent: true,
        opacity: 0.11,
        depthWrite: false,
      }),
    );
    globe.add(atmosphere);

    // Dotted land detail echoes the reference while the textured sphere supplies real depth and occlusion.
    const dots: number[] = [];
    for (let lat = -55; lat <= 75; lat += 2.8)
      for (let lon = -175; lon <= 175; lon += 2.8) {
        if (landShapes.some((shape) => contains(shape, lat, lon)))
          dots.push(...spherePoint(lat, lon, 1.006).toArray());
      }
    const dotGeometry = new THREE.BufferGeometry();
    dotGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(dots, 3),
    );
    globe.add(
      new THREE.Points(
        dotGeometry,
        new THREE.PointsMaterial({
          color: 0xf08372,
          size: 0.016,
          transparent: true,
          opacity: 0.88,
          sizeAttenuation: true,
          depthWrite: false,
        }),
      ),
    );

    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0xd36d60,
      transparent: true,
      opacity: 0.09,
    });
    for (const lat of [-60, -30, 0, 30, 60]) {
      const pts: THREE.Vector3[] = [];
      for (let lon = -180; lon <= 180; lon += 4)
        pts.push(spherePoint(lat, lon, 1.002));
      globe.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          gridMaterial,
        ),
      );
    }
    for (let lon = -180; lon < 180; lon += 30) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 3)
        pts.push(spherePoint(lat, lon, 1.002));
      globe.add(
        new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          gridMaterial,
        ),
      );
    }

    const hub = spherePoint(places[0].lat, places[0].lon, 1.012);
    const movers: {
      mesh: THREE.Mesh;
      curve: THREE.QuadraticBezierCurve3;
      offset: number;
    }[] = [];
    places.slice(1).forEach((place, index) => {
      const end = spherePoint(place.lat, place.lon, 1.012);
      // Keep routes close to the surface so their arcs read as paths around a globe.
      const mid = hub
        .clone()
        .add(end)
        .normalize()
        .multiplyScalar(1.18 + (index % 2) * 0.025);
      const curve = new THREE.QuadraticBezierCurve3(hub.clone(), mid, end);
      const routeMaterial = new THREE.LineDashedMaterial({
        color: 0xff786b,
        transparent: true,
        opacity: 0.8,
        dashSize: 0.024,
        gapSize: 0.022,
        depthTest: false,
        depthWrite: false,
      });
      const route = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(curve.getPoints(100)),
        routeMaterial,
      );
      route.computeLineDistances();
      globe.add(route);
      const destination = new THREE.Mesh(
        new THREE.SphereGeometry(0.015, 10, 8),
        new THREE.MeshBasicMaterial({
          color: 0xff8876,
          depthTest: false,
          depthWrite: false,
        }),
      );
      destination.position.copy(end);
      globe.add(destination);
      const mover = new THREE.Mesh(
        new THREE.SphereGeometry(0.018, 10, 8),
        new THREE.MeshBasicMaterial({ color: index % 2 ? 0xe9b56f : 0xffddd0 }),
      );
      globe.add(mover);
      movers.push({ mesh: mover, curve, offset: index / places.length });
    });

    const hubMarker = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 12, 10),
      new THREE.MeshBasicMaterial({ color: 0xffd5c4 }),
    );
    hubMarker.position.copy(hub.clone().multiplyScalar(1.012));
    globe.add(hubMarker);
    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(0.055, 0.003, 6, 36),
      new THREE.MeshBasicMaterial({
        color: 0xeb7667,
        transparent: true,
        opacity: 0.8,
      }),
    );
    halo.position.copy(hubMarker.position);
    halo.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 0, 1),
      hubMarker.position.clone().normalize(),
    );
    globe.add(halo);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();
    let visible = false,
      raf = 0,
      last = 0,
      elapsed = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const projectLabels = () => {
      places.forEach((place, index) => {
        const el = labelsRef.current[index];
        if (!el) return;
        const world = spherePoint(place.lat, place.lon, 1.045).applyMatrix4(
          globe.matrixWorld,
        );
        const p = world.clone().project(camera);
        const front =
          world.z > 0.08 &&
          p.x > -1.05 &&
          p.x < 1.05 &&
          p.y > -1.05 &&
          p.y < 1.05;
        el.style.opacity = front
          ? String(Math.max(0.42, Math.min(1, world.z * 1.5)))
          : "0";
        el.style.transform = `translate(${(p.x * 0.5 + 0.5) * host.clientWidth}px,${(-p.y * 0.5 + 0.5) * host.clientHeight}px) translate(-50%,-50%)`;
      });
    };
    const render = (now: number) => {
      raf = 0;
      if (!visible) return;
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      elapsed += dt;
      const rotation = rotationRef.current;
      if (!rotation.dragging && !reduced.matches) {
        rotation.rotY += dt * 0.19;
      }
      globe.rotation.set(rotation.rotX, rotation.rotY, 0.06);
      globe.updateMatrixWorld(true);
      movers.forEach(({ mesh, curve, offset }, index) => {
        const t = (elapsed * (0.075 + index * 0.003) + offset) % 1;
        mesh.position.copy(curve.getPointAt(t));
      });
      halo.scale.setScalar(1 + Math.sin(elapsed * 2.3) * 0.12);
      renderer.render(scene, camera);
      projectLabels();
      if (!reduced.matches || rotationRef.current.dragging)
        raf = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(render);
        if (!visible && raf) {
          cancelAnimationFrame(raf);
          raf = 0;
          last = 0;
        }
      },
      { rootMargin: "120px" },
    );
    observer.observe(host);
    const motionChange = () => {
      if (visible && !raf) raf = requestAnimationFrame(render);
    };
    reduced.addEventListener("change", motionChange);

    const pointerDown = (event: PointerEvent) => {
      rotationRef.current.dragging = true;
      rotationRef.current.x = event.clientX;
      rotationRef.current.y = event.clientY;
      renderer.domElement.setPointerCapture(event.pointerId);
    };
    const pointerMove = (event: PointerEvent) => {
      const r = rotationRef.current;
      if (!r.dragging) return;
      r.rotY += (event.clientX - r.x) * 0.006;
      r.rotX = THREE.MathUtils.clamp(
        r.rotX + (event.clientY - r.y) * 0.004,
        -0.9,
        0.9,
      );
      r.x = event.clientX;
      r.y = event.clientY;
      if (!raf) raf = requestAnimationFrame(render);
    };
    const pointerUp = () => {
      rotationRef.current.dragging = false;
    };
    renderer.domElement.addEventListener("pointerdown", pointerDown);
    renderer.domElement.addEventListener("pointermove", pointerMove);
    renderer.domElement.addEventListener("pointerup", pointerUp);
    renderer.domElement.addEventListener("pointercancel", pointerUp);
    const key = (event: KeyboardEvent) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      rotationRef.current.rotY += event.key === "ArrowLeft" ? -0.18 : 0.18;
      if (!raf) raf = requestAnimationFrame(render);
    };
    renderer.domElement.addEventListener("keydown", key);
    renderer.domElement.tabIndex = 0;
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.setAttribute(
      "aria-label",
      "Illustrative 3D globe with routes connecting India to Seattle, Utah, New York, Canada, and the United Kingdom. Drag or use arrow keys to rotate.",
    );

    return () => {
      observer.disconnect();
      ro.disconnect();
      reduced.removeEventListener("change", motionChange);
      renderer.domElement.removeEventListener("pointerdown", pointerDown);
      renderer.domElement.removeEventListener("pointermove", pointerMove);
      renderer.domElement.removeEventListener("pointerup", pointerUp);
      renderer.domElement.removeEventListener("pointercancel", pointerUp);
      renderer.domElement.removeEventListener("keydown", key);
      if (raf) cancelAnimationFrame(raf);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Line ||
          object instanceof THREE.Points
        ) {
          object.geometry.dispose();
          const material = object.material;
          if (Array.isArray(material)) material.forEach((m) => m.dispose());
          else material.dispose();
        }
      });
      sphere.material.map?.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

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
