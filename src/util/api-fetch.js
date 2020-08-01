import 'isomorphic-fetch';

export default async function apiFetch(url, props = {}) {
  const request = await fetch(`http://localhost:3000/api/${url}`, props);

  if (request.status !== 200) return false;

  const requestJson = await request.json();

  return requestJson;
}
