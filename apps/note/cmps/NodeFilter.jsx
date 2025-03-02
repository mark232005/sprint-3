import { noteService } from '../services/note.service.js'



export function NodeFilter({ filter, onSetFilter }) {
    const filterClick = (type) => {
        const newType = (filter.type === type) ? '' : type
        onSetFilter({ ...filter, type: newType })
    }

    return (
        <section className="notes-filter-by-type">
            <h2>Filter by</h2>
            <i className="fa-regular fa-message" onClick={() => filterClick('NoteTxt')}><span>Text</span></i>
            <i className="fa-regular fa-square-check" onClick={() => filterClick('NoteImg')}><span>To Do</span></i>
            <i className="fa-regular fa-image" onClick={() => filterClick('NoteTodos')}><span>Images</span></i>
            {filter.type && <i className="fa-solid fa-arrow-rotate-left" onClick={() => filterClick('')}><span>All</span></i>}
        </section>
    )
}

