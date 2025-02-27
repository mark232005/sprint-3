const { useState, useEffect } = React

export function MailFilter({ onSetMailFilter, mailFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...mailFilter })

    useEffect(() => {
        onSetMailFilter(filterByToEdit)
    }, [filterByToEdit])



    function handleChange({ target }) {
        const { name, value} = target
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, [name]: value }))
    }

    return (
        <section> 
            <label htmlFor="search"> <img  className="search-img" src="assets/img/search-icon.svg"/></label>
            <input className="input-search "
             type="text" 
             placeholder="Search"
              onChange={handleChange}
               name="search" 
              id="search" value={filterByToEdit.search} />
              <img className="options-btn" src="assets/img/options-btn.svg"/>

        </section>
    )
}