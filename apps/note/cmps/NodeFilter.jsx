import { noteService } from '../services/note.service.js'



export function NodeFilter({ filter, onSetFilter }) {
    const filterClick = (type) => {
        const newType = (filter.type === type) ? '' : type
        onSetFilter({ ...filter, type: newType })
    }

    return (
        <section className="note-filter">
            <div><button onClick={() => filterClick('NoteTxt')}>Text</button></div>
            <div><button onClick={() => filterClick('NoteImg')}>Image</button></div>
            <div><button onClick={() => filterClick('NoteTodos')}>Todos</button></div>
            <div>{filter.type && <button onClick={() => filterClick('')}>All</button>}</div>
        </section>
    )
}