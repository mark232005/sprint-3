import { bookService } from './book.service.js'
import { utilService } from './util.service.js'

export const reviewService = {
    saveReview,
    removeReview,
    getEmptyReview
}

window.bs = bookService

function saveReview(bookId, reviewToSave) {
    console.log('Review to Save BEFORE creating review:', reviewToSave);
    console.log('Book ID:', bookId);

    return bookService.getById(bookId)
        .then(book => {
            if (!book.reviews) book.reviews = []; // Ensure reviews array exists

            if (!reviewToSave || typeof reviewToSave !== "object") {
                console.error("Invalid review data:", reviewToSave);
                throw new Error("Review data is invalid or missing.");
            }

            const review = _createReview(reviewToSave);
            book.reviews.unshift(review);

            return bookService.save(book).then(() => review);
        })
        .catch(err => {
            console.error("Error saving review:", err);
            throw err;
        });
}


function removeReview(bookId, reviewId) {
    return bookService.get(bookId)
        .then(book => {
            const newReviews = book.reviews.filter((review) => review.id !== reviewId)
            book.reviews = newReviews
            return bookService.save(book)
        })
}

function getEmptyReview() {
    return {
        fullName: 'new name',
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        txt: '',
        selected: 0,
    }
}

// ~~~~~~~~~~~~~~~~LOCAL FUNCTIONS~~~~~~~~~~~~~~~~~~~

function _createReview(reviewToSave) {
    console.log('reviewToSave:', reviewToSave)
    return {
        id: utilService.makeId(),
        ...reviewToSave,
    }
}
