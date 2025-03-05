const { useState, useRef, useEffect } = React


import { StarRating } from "./dynamic-inputs/StarRating.jsx"
import { reviewService } from "../service/review.service.js"


export function AddReview({ onSaveReview, toggleReview }) {
    console.log('AddReview')
    const [reviewToAdd, setReviewToAdd] = useState(() => reviewService.getEmptyReview())
    console.log('reviewToAdd:', reviewToAdd)

    const [cmpType, setCmpType] = useState('stars')

    const inputRef = useRef()

    useEffect(() => {
        if (inputRef.current)
            inputRef.current.focus()
    }, [])

    function onSubmitForm(ev) {
        ev.preventDefault()
        reviewToAdd.date = Date.now(reviewToAdd.date)
        // console.log('reviewToAdd.date:', reviewToAdd.date)
        onSaveReview(reviewToAdd)
        toggleReview()
    }

    function handleChange({ target }) {
        const { value, name: field } = target
        setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onChangeCmpType({ target }) {
        const selectedType = target.value
        setCmpType(selectedType)
    }


    const { fullName, date, txt, rating } = reviewToAdd
    return <section className='add-review'>

        <form onSubmit={onSubmitForm} className='review-form'>
            <div className='review-modal'>
                <h1>Add review</h1>
                <button className='btn-toggle-modal'
                    onClick={toggleReview}>X
                </button>

                <label className='bold-txt' htmlFor='fullname'>Full name:</label>
                <input autoFocus ref={inputRef} placeholder='Enter full name' name='fullName' type='text' id='fullname' value={fullName} onChange={handleChange} autoComplete='off' />

                <label className='bold-txt' htmlFor='date'>Date:</label>
                <input type='date' id='date' name='date' value={date} onChange={handleChange} />

                <div className='rate-by-choice'>
                    <p className='bold-txt'>Select rating</p>
                    {cmpType === 'stars' && <StarRating handleChange={handleChange} rating={rating} />}
                </div>
                <textarea name='txt' cols='30' rows='10' value={txt} onChange={handleChange}></textarea>

                <button>Save</button>
            </div>
        </form>

    </section>



}
