import { useEffect, useState } from 'react';
import { getBooks } from '../api.js';
import BookCard from '../components/BookCard.jsx';

export default function Catalog() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Runs every time the page is opened, so changes made on the
  // Management page show up here as soon as you navigate back.
  useEffect(() => {
    getBooks()
      .then(setBooks)
      .catch(() => setError('Could not load the catalog. Is the API running on port 8080?'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section>
      <h2>Catalog</h2>
      {loading && <p>Loading…</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && books.length === 0 && <p>No books in the catalog yet.</p>}
      <div className="card-grid">
        {books.map((b) => (
          <BookCard key={b.id} book={b} />
        ))}
      </div>
    </section>
  );
}
