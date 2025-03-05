import { BookPreview } from './BookPreview.jsx';
const { Link } = ReactRouterDOM


export function BookList({ books, onRemoveBook }) {

    return (
        <section>
            <h2>Book List</h2>
            <ul className="book-list">
                {books.map(book =>
                    <li key={book.id}>
                        <BookPreview book={book} />
                        <section>
                            <button>
                                <Link to={`/bookIndex/${book.id}`}>Select</Link>
                            </button>
                            <button>
                                <Link to={`/bookIndex/edit/${book.id}`}>Edit</Link>
                            </button>
                            <button onClick={() => onRemoveBook(book.id)}>Delete</button>
                        </section>
                    </li>
                )}
            </ul>
        </section>
    )
}