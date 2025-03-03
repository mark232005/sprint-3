import { noteService } from '../services/note.service.js'



export function NodeFilter({ filter, onSetFilter, isMenuOpen}) {
    const filterClick = (type) => {
        const newType = (filter.type === type) ? '' : type
        onSetFilter({ ...filter, type: newType })
    }

    return (
        <section className={isMenuOpen ? "filter-nav-bar-open" : "filter-nav-bar"}>
            <div className="nav-item" onClick={() => filterClick('NoteTxt')}>
                <i className="fa-regular fa-message"></i>
                <span className="nav-label">Text Notes</span>
            </div>
    
            <div className="nav-item" onClick={() => filterClick('NoteTodos')}>
                <i className="fa-regular fa-square-check"></i>
                <span className="nav-label">Todos</span>
            </div>
    
            <div className="nav-item" onClick={() => filterClick('NoteImg')}>
                <i className="fa-regular fa-image"></i>
                <span className="nav-label">Images</span>
            </div>
    
            {filter.type && (
                <div className="nav-item" onClick={() => filterClick('')}>
                    <i className="fa-solid fa-arrow-rotate-left"></i>
                    <span className="nav-label">All</span>
                </div>
            )}
        </section>
    )
    
}

