// All calls go through the Vite proxy: /api/books -> http://localhost:8080/books
const BASE = '/api/books';

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  // 204 No Content has no body
  return res.status === 204 ? null : res.json();
}

export const getBooks = () => request(BASE);

export const createBook = (book) =>
  request(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

export const updateBook = (id, book) =>
  request(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(book),
  });

export const deleteBook = (id) => request(`${BASE}/${id}`, { method: 'DELETE' });
