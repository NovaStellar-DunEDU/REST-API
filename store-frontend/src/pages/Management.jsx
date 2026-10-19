import { useEffect, useState } from 'react';
import { createBook, deleteBook, getBooks, updateBook } from '../api.js';

const EMPTY = { title: '', author: '', isbn: '', price: '', publishYear: '' };

function validate(form) {
  const errors = {};
  if (!form.title.trim()) errors.title = 'Title is required';
  if (!form.author.trim()) errors.author = 'Author is required';
  if (!form.isbn.trim()) errors.isbn = 'ISBN is required';
  if (form.price === '' || Number.isNaN(Number(form.price)) || Number(form.price) < 0) {
    errors.price = 'Enter a price of 0 or more';
  }
  if (form.publishYear === '' || !Number.isInteger(Number(form.publishYear))) {
    errors.publishYear = 'Enter a whole-number year';
  }
  return errors;
}

export default function Management() {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(EMPTY);
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const reload = () =>
    getBooks()
      .then(setBooks)
      .catch(() => setMessage('Could not reach the API. Is it running on port 8080?'));

  useEffect(() => {
    reload();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const resetForm = () => {
    setForm(EMPTY);
    setEditingId(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return; // block add/update when fields are missing

    const payload = {
      title: form.title.trim(),
      author: form.author.trim(),
      isbn: form.isbn.trim(),
      price: Number(form.price),
      publishYear: Number(form.publishYear),
    };

    try {
      if (editingId === null) {
        await createBook(payload);
        setMessage('Book added.');
      } else {
        await updateBook(editingId, payload);
        setMessage('Book updated.');
      }
      resetForm();
      await reload(); // refresh the table after every successful change
    } catch {
      setMessage('Something went wrong saving that book.');
    }
  };

  const handleEdit = (book) => {
    setEditingId(book.id);
    setErrors({});
    setForm({
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      price: String(book.price),
      publishYear: String(book.publishYear),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      if (editingId === id) resetForm();
      setMessage('Book deleted.');
      await reload();
    } catch {
      setMessage('Could not delete that book.');
    }
  };

  const field = (name, label, type = 'text', extra = {}) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} value={form[name]} onChange={handleChange} {...extra} />
      {errors[name] && <span className="error">{errors[name]}</span>}
    </div>
  );

  return (
    <section>
      <h2>Management</h2>

      <form className="book-form" onSubmit={handleSubmit} noValidate>
        <h3>{editingId === null ? 'Add a book' : `Editing book #${editingId}`}</h3>
        {field('title', 'Title')}
        {field('author', 'Author')}
        {field('isbn', 'ISBN')}
        {field('price', 'Price ($)', 'number', { step: '0.01', min: '0' })}
        {field('publishYear', 'Publish year', 'number', { step: '1' })}
        <div className="form-actions">
          <button type="submit">{editingId === null ? 'Add book' : 'Save changes'}</button>
          {editingId !== null && (
            <button type="button" className="secondary" onClick={resetForm}>
              Cancel edit
            </button>
          )}
        </div>
      </form>

      {message && <p className="notice">{message}</p>}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Price</th>
            <th>Year</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>${Number(b.price).toFixed(2)}</td>
              <td>{b.publishYear}</td>
              <td className="actions">
                <button onClick={() => handleEdit(b)}>Edit</button>
                <button className="danger" onClick={() => handleDelete(b.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan="7">No books yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </section>
  );
}
