import { noteService } from '../services/note.service.js'



export function NodeFilter({ filter, onSetFilter }) {
    const filterClick = (type) => {
        const newType = (filter.type === type) ? '' : type
        onSetFilter({ ...filter, type: newType })
    }

    return (
        <section className="notes-filter-by-type">
            <i className="fa-regular fa-message" onClick={() => filterClick('NoteTxt')}>  Text</i>
            <i className="fa-regular fa-square-check" onClick={() => filterClick('NoteImg')}>  Image</i>
            <i className="fa-regular fa-image" onClick={() => filterClick('NoteTodos')}>  Todos</i>
            <div>{filter.type && <button onClick={() => filterClick('')}>All</button>}</div>
        </section>
    )
}

