const { useState, useEffect } = React;
const { useParams } = ReactRouter;
const { Link } = ReactRouterDOM;

import { bookService } from '../services/book.service.js';
import { reviewService } from "../services/review.service.js";

import { LongTxt } from '../cmps/LongTxt.jsx';
import { AddReview } from '../cmps/AddReview.jsx';
import { ReviewList } from "../cmps/ReviewList.jsx";

export function BookDetails() {
    const [book, setBook] = useState(null);
    const [nextBookId, setNextBookId] = useState(null);
    const [isLoadingReview, setIsLoadingReview] = useState(false);
    const [isShowReviewModal, setIsShowReviewModal] = useState(false);

    const params = useParams();
    
    useEffect(() => {
        bookService.getNextBookId(params.bookId).then(setNextBookId);
        loadBook();
    }, [params.bookId]);

    function loadBook() {
        bookService.getById(params.bookId)
            .then(setBook)
            .catch(err => console.log('BookDetails: err in loadBook', err));
    }

    if (!book) return <p>Loading...</p>;

    const {
        title,
        thumbnail,
        description,
        pageCount,
        publishedDate,
        listPrice,
        reviews = [] // Ensure reviews is always an array
    } = book;

    function getPageCount() {
        if (pageCount > 500) return 'Serious Reading';
        if (pageCount > 200) return 'Decent Reading';
        if (pageCount > 100) return 'Light Reading';
    }

    function getPublishedDate() {
        const diffOfPublishedDate = new Date().getFullYear() - publishedDate;
        if (diffOfPublishedDate > 10) return 'Vintage Book';
        if (diffOfPublishedDate < 1) return 'New!';
    }

    function getPriceColor() {
        if (listPrice.amount > 150) return { color: "red", padding: "5px" };
        if (listPrice.amount < 20) return { color: "green", padding: "5px" };
    }

    function onToggleReviewModal() {
        setIsShowReviewModal(prev => !prev);
    }

    function onSaveReview(reviewToAdd) {
        setIsLoadingReview(true);
    
        reviewService.saveReview(book.id, reviewToAdd)
            .then(review => {
                setBook(prevBook => {
                    const reviews = prevBook.reviews ? [review, ...prevBook.reviews] : [review]
                    return { ...prevBook, reviews }
                })
            })
            .catch(err => {
                console.error(`Review for ${book.title} Failed!`, err);
            })
            .finally(() => setIsLoadingReview(false));
    }
    

    function onRemoveReview(reviewId) {
        setIsLoadingReview(true);
        reviewService.removeReview(book.id, reviewId)
            .then(() => {
                setBook(prevBook => ({
                    ...prevBook,
                    reviews: prevBook.reviews.filter(review => review.id !== reviewId)
                }));
            })
            .finally(() => setIsLoadingReview(false));
    }

    return (
        <section className="book-details">
            <div className="book-details-header">
                <h1>{title}</h1>
            </div>

            {listPrice.isOnSale && <div className="book-details-on-sale">On-sale!</div>}

            <div className="book-details-info">
                <span>Book Pages: {pageCount} - ({getPageCount()})</span>
                <span>Published Date: {publishedDate} - ({getPublishedDate()})</span>
                <span style={getPriceColor()}>
                    Price: {listPrice.amount} {listPrice.currencyCode}
                </span>

                <span>Description:</span>
                <LongTxt txt={description || ''} />

                <hr className='brake-line' />
                <button onClick={onToggleReviewModal}>Add Review</button>

                {isShowReviewModal && (
                    <AddReview
                        toggleReview={onToggleReviewModal}
                        onSaveReview={onSaveReview}
                    />
                )}
            </div>

            <div className='review-container'>
                {!isLoadingReview ? (
                    <ReviewList reviews={reviews} onRemoveReview={onRemoveReview} />
                ) : (
                    <div className="loader"></div>
                )}
            </div>

            <div className="book-details-image">
                <img src={thumbnail} alt={title} />
            </div>

            <div className="buttons">
                <button><Link to="/book">Back</Link></button>
                <button>
                    {nextBookId && <Link to={`/bookIndex/${nextBookId}`}>Next Book</Link>}
                </button>
            </div>
        </section>
    );
}
