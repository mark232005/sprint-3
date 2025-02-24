import { noteService } from '../services/note.service.js'



export function NodeFilter({ filter, onSetFilter }) {
    const filterClick = (type) => {
        const newType = (filter.type === type) ? '' : type
        onSetFilter({ ...filter, type: newType })
    }

    return (
        <section className="note-filter">
            <button onClick={() => filterClick('NoteTxt')}>Text</button>
            <button onClick={() => filterClick('NoteImg')}>Image</button>
            <button onClick={() => filterClick('NoteTodos')}>Todos</button>
            {filter.type && <button onClick={() => filterClick('')}>All</button>}
        </section>
    )
}