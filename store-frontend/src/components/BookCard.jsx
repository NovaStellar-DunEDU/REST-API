export default function BookCard({ book }) {
  return (
    <article className="card">
      <h3>{book.title}</h3>
      <p className="author">by {book.author}</p>
      <p className="price">${Number(book.price).toFixed(2)}</p>
      <dl>
        <dt>ISBN</dt>
        <dd>{book.isbn}</dd>
        <dt>Published</dt>
        <dd>{book.publishYear}</dd>
      </dl>
    </article>
  );
}
