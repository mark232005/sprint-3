const { useState, useEffect } = React

export function BookFilter({ onSetFilterBy,filterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function onHandleChange({ target }) {
        // console.log('target:', target)
		const field = target.name
		const value = target.type === 'number' ? +target.value : target.value
        // console.log('field:', field)
        // console.log('value:', value)

		
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
	}
    // console.log('filterByToEdit:', filterByToEdit)
    const { title, price } = filterByToEdit


    function onSubmitForm(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    return (
        <section className="book-filter">
            <h2>Filter Book</h2>

            <form onSubmit={onSubmitForm}>
                <label htmlFor="txt">Book Name</label>
                <input 
                    name="title" 
                    value={title || ''} 
                    onChange={onHandleChange} 
                    type="text" 
                    id="txt" 
                />

                <label htmlFor="amount">Price</label>
                <input 
                    type="number" 
                    name="price"
                    value={price || ''} 
                    onChange={onHandleChange} 
                    id="price" 
                    
                />

                <button>Submit</button>
            </form>
        </section>
    )
}
