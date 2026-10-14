// Shared between the server-rendered network section and the client-side WebGL
// globe. Kept free of any three.js imports so the server bundle stays light.
export type GlobePlace = {
  name: string;
  lat: number;
  lon: number;
  hub?: boolean;
};

export const places: GlobePlace[] = [
  { name: "India Hub", lat: 22.5, lon: 78.9, hub: true },
  { name: "Seattle", lat: 47.6, lon: -122.3 },
  { name: "Utah", lat: 39.3, lon: -111.9 },
  { name: "New York", lat: 40.7, lon: -74 },
  { name: "Canada", lat: 56, lon: -106 },
  { name: "United Kingdom", lat: 54, lon: -2 },
];
