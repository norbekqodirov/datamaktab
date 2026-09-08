/** fetch() that attaches the admin bearer token for authenticated CMS write endpoints. */
export async function adminFetch(url: string, options: RequestInit = {}): Promise<Response> {
  const token = localStorage.getItem('adminToken');
  const headers = new Headers(options.headers || {});
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    localStorage.removeItem('adminToken');
    alert('Sessiya tugadi, iltimos qayta kiring: /maktabpanel');
  }
  return res;
}
