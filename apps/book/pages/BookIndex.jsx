// import { bookService } from '../services/book.service.js'
import { bookService } from '../service/book.service.js'
import { BookList } from '../cmps/BookList.jsx'
import { BookFilter } from '../cmps/BookFilter.jsx'
import { showSuccessMsg } from '../services/event-bus.service.js'


const { Link } = ReactRouterDOM


const { useEffect, useState } = React
const { useSearchParams } = ReactRouterDOM

export function BookIndex() {

    const [searchParams, setSearchParams] = useSearchParams()
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromSearchParams(searchParams))
    



    useEffect(() => {
        setSearchParams(filterBy)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy)
            .then(books => {
                setBooks(books)
            })
    }


    // This fu
    function onRemoveBook(bookId) {
        bookService.remove(bookId)
            .then(() => {
                setBooks(prevBooks => {
                    const removedBook = prevBooks.find(book => book.id === bookId)
                    showSuccessMsg(`Book ${removedBook.title} has been successfully removed!`)
                    return prevBooks.filter(book => book.id !== bookId)
                })
            })
    }

    function onSetFilterBy(filterBy) {
        setFilterBy({ ...filterBy })
    }



    if (!books) return <div>Loading...</div>

    return (
        <section className="book-index">
            <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <button>
                <Link to="/bookIndex/edit">Add New Book</Link>
            </button>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )
}