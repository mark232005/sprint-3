import { noteService } from '../services/note.service.js'
const { useState, useEffect, useRef } = React

export function NoteMainFilterHeader({ onSetFilter, filterBy , onToggleMenu }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy || { txt: '' })

    const { txt } = filterByToEdit

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.value
        setFilterByToEdit({ ...filterByToEdit, [field]: value })
    }

    return (

        <section className="note-main-filter-header">
            <React.Fragment>
                <input
                    type="text"
                    name="txt"
                    value={txt || ''}
                    onChange={handleChange}
                    placeholder="Search your note"
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </React.Fragment>

        </section>
    )
}
