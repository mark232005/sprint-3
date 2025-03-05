import { AddGoogleBook } from '../cmps/AddGoogleBook.jsx';
import { bookService } from "../services/book.service.js";
import { showErrorMsg } from '../services/event-bus.service.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    console.log('bookToEdit:', bookToEdit)


    const params = useParams()
    const navigate = useNavigate()
    console.log('params bookId:', params.bookId)


    useEffect(() => {
        if (!params.bookId) return
        loadBook()
    }, [])


    function loadBook() {
        bookService.getById(params.bookId)
            .then(setBookToEdit)
            
    }


    function handleChange({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }
        setBookToEdit(prevBook => ({ ...prevBook, [prop]: value }))
    }



    function handleChangeListPrice({ target }) {
        const { type, name: prop } = target
        let { value } = target

        switch (type) {
            case 'range':
            case 'number':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break;
        }

        setBookToEdit(prevBook => ({
            ...prevBook,
            listPrice: { ...prevBook.listPrice, [prop]: value }
        }))
    }


    const { title, authors, listPrice, description, pageCount } = bookToEdit


    function onSave(ev) {
        ev.preventDefault()

        bookService.save(bookToEdit)
            .then(() => showSuccessMsg('Book has successfully saved!'))
            .catch(() => showErrorMsg(`couldn't save book`))
            .finally(() => navigate('/book'))


    }

    return (
        <section className="book-edit">
            <h2>{params.bookId ? 'Book Edit' : 'Book Add '}</h2>

            {!params.bookId && <AddGoogleBook />}
            
            <form onSubmit={onSave}>
                <label htmlFor="txt">Book Name</label>
                <input
                    name="title"
                    value={title || ''}
                    onChange={handleChange}
                    type="text"
                    id="txt"
                />
                <label htmlFor="authors">Authors</label>
                <input
                    name="authors"
                    value={authors || ''}
                    onChange={handleChange}
                    type="text"
                    id="authors" />

                <label htmlFor="description">Description</label>
                <textarea
                    name="description"
                    value={description || ''}
                    onChange={handleChange}
                    id="description" />

                <label htmlFor="pageCount">Page Count</label>
                <input
                    name="pageCount"
                    value={pageCount || ''}
                    onChange={handleChange}
                    type="number"
                    id="pageCount" />


                <label htmlFor="price">Price</label>
                <input
                    id="price"
                    type="number"
                    name="amount"
                    value={listPrice.amount}
                    onChange={handleChangeListPrice}
                />
                <button>Save</button>

            </form>
        </section>
    )

}