import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { books } from './books.js'

const BOOK_KEY = 'bookDB'
const CACHE_STORAGE_KEY = 'googleBooksCache'
const gCache = utilService.loadFromStorage(CACHE_STORAGE_KEY) || {}

_createBooks() // Initialize book database

export const bookService = {
    query,
    getById,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
    getFilterFromSearchParams,
    getNextBookId,
    getGoogleBooks,
    addGoogleBook
}

// ** Fetch Books with Filters **
function query(filterBy = {}) {
    return storageService.query(BOOK_KEY).then(books => {
        if (!books || !books.length) {
            books = _initializeBooks()
        }
        if (filterBy.title) {
            const regExp = new RegExp(filterBy.title, 'i')
            books = books.filter(b => regExp.test(b.title))
        }
        if (filterBy.price) {
            books = books.filter(b => b.listPrice.amount <= filterBy.price)
        }
        return books
    })
}

// ** Get a Single Book by ID **
function getById(bookId) {
    return storageService.get(BOOK_KEY, bookId).then(book => {
        if (!book.reviews) book.reviews = [] // Ensure reviews array exists
        return book
    })
}

// ** Remove a Book **
function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

// ** Save (Update or Add) a Book **
function save(book) {
    return book.id ? storageService.put(BOOK_KEY, book) : storageService.post(BOOK_KEY, book)
}

// ** Get Next Book ID for Navigation **
function getNextBookId(bookId) {
    return storageService.query(BOOK_KEY).then(books => {
        const idx = books.findIndex(book => book.id === bookId)
        if (idx === -1 || idx === books.length - 1) return null
        return books[idx + 1].id
    })
}

// ** Get an Empty Book Template **
function getEmptyBook(title = '', amount = 0) {
    return {
        title,
        listPrice: {
            amount,
            currencyCode: 'USD',
            isOnSale: false
        }
    }
}

// ** Default Filter Values **
function getDefaultFilter() {
    return {
        title: '',
        price: 0
    }
}
// ** Get Filter from Search Params **
function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams .get(field) ||
            defaultFilter[field]
    }
    return filterBy
}

// ** Fetch Books from Google API or Cache **
function getGoogleBooks(bookName) {
    if (!bookName) return Promise.resolve()

    const googleBooks = gCache[bookName]
    if (googleBooks) return Promise.resolve(googleBooks)

    const url = `https://www.googleapis.com/books/v1/volumes?printType=books&q=${bookName}`
    return axios.get(url).then(res => {
        const books = _formatGoogleBooks(res.data.items)
        gCache[bookName] = books
        utilService.saveToStorage(CACHE_STORAGE_KEY, gCache)
        return books
    })
}

// ** Add a Google Book to Storage **
function addGoogleBook(book) {
    return storageService.post(BOOK_KEY, book, false)
}

// ** Helper: Format Google Books Data **
function _formatGoogleBooks(googleBooks) {
    return googleBooks.map(googleBook => {
        const { volumeInfo } = googleBook
        return {
            id: googleBook.id,
            title: volumeInfo.title || "Unknown Title",
            description: volumeInfo.description || "No description available",
            pageCount: volumeInfo.pageCount || 0,
            authors: volumeInfo.authors || ["Unknown"],
            categories: volumeInfo.categories || ["Uncategorized"],
            publishedDate: volumeInfo.publishedDate || "N/A",
            language: volumeInfo.language || "en",
            listPrice: {
                amount: utilService.makeId(2) * 10, // Generate a random price
                currencyCode: "EUR",
                isOnSale: Math.random() > 0.7
            },
            reviews: [],
            thumbnail: volumeInfo.imageLinks.thumbnail || "https://via.placeholder.com/150"
        }
    })
}

// ** Private: Initialize Books from External JSON File**
function _initializeBooks() {
    console.log('Initializing books from books.js...')
    saveToStorage(BOOK_KEY, books) // Save to local storage
    return books
}

// ** Private: Ensure Books Exist in Local Storage **
function _createBooks() {
    let storedBooks = utilService.loadFromStorage(BOOK_KEY)

    if (!storedBooks || !storedBooks.length) {
        console.log('Creating books database...')
        storedBooks = books.map(book => _createBookFromData(book))
        utilService.saveToStorage(BOOK_KEY, storedBooks)
    }
}

// ** Private: Create Book Object with Default Values **
function _createBookFromData(book) {
    return {
        id: book.id || utilService.makeId(),
        title: book.title || "Untitled",
        subtitle: book.subtitle || "No subtitle available",
        authors: book.authors || ["Unknown"],
        publishedDate: book.publishedDate || 2000,
        description: book.description || "No description available",
        pageCount: book.pageCount || 100,
        categories: book.categories || ["General"],
        thumbnail: book.thumbnail || "https://via.placeholder.com/150",
        language: book.language || "en",
        listPrice: {
            amount: book.listPrice.amount || 20,
            currencyCode: book.listPrice.currencyCode || "USD",
            isOnSale: book.listPrice.isOnSale || false
        },
        reviews: book.reviews || []
    }
}
