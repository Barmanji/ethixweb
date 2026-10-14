export function getFormspreeEndpoint() {
  const value = process.env.FORMSPREE_ENDPOINT?.trim();
  if (!value) return null;

  try {
    const endpoint = new URL(value);
    if (
      endpoint.protocol !== "https:" ||
      endpoint.hostname !== "formspree.io" ||
      !/^\/f\/[A-Za-z0-9]+$/.test(endpoint.pathname) ||
      endpoint.search ||
      endpoint.hash
    ) {
      return null;
    }
    return endpoint.toString();
  } catch {
    return null;
  }
}
