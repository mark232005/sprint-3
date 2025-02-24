const { useState, useEffect } = React

export function MailFilter({ onSetMailFilter, mailFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState({ ...mailFilter })

    useEffect(() => {
        onSetMailFilter(filterByToEdit)
    }, [filterByToEdit])



    function handleChange({ target }) {
        const { name, value, type } = target
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, [name]: value }))
    }

    return (
            <input type="text" placeholder="Search" onChange={handleChange} name="search" id="search" value={filterByToEdit.search} />
    )
}