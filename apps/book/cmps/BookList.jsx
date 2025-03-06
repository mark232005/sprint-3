import { BookPreview } from './BookPreview.jsx';
const { Link } = ReactRouterDOM


export function BookList({ books, onRemoveBook }) {

    return (
        <section className='bookList-section'>
            <h2
                                    style={{
                                        alignSelf: 'right',
                                        margin : '15px'
                        
                                    }}>Book List</h2>
            <ul className="book-list">
                {books.map(book =>
                    <li className='single-book' key={book.id}>
                        <BookPreview book={book} />
                        <section
                            className='book-button'
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around',
                                marginTop: '0.5rem',
                                flexWrap: 'wrap'
                            }}
                        >                            <button>
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