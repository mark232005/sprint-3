import { noteService } from '../services/note.service.js'

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function NoteAddNew({
    inputPlaceholder,
    handleInputChange,
    handleNoteTypeChange,
    handleTodoTypeChange,
    todos,
    handleTodoChange,
    addTodo,
    onCreateNewNote,
    noteType,
    newNoteText,
    resetNoteForm,
}) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [currentText, setCurrentText] = useState(searchParams.get('txt') || '')
    const [currentType, setCurrentType] = useState('NoteTxt')



    useEffect(() => {
        const txt = searchParams.get('txt')
        const type = searchParams.get('type') || 'NoteTxt'

        if (txt) {
            onCreateNewNote(txt, type)
            resetNoteForm()
            setCurrentText('')
            setSearchParams({})
        }
    }, [])

    function handleLocalInputChange(ev) {
        handleInputChange(ev)
        setCurrentText(ev.target.value)
    }

    function handleClose() {
        onCreateNewNote(currentText, noteType)
        resetNoteForm()
        setCurrentText('')
    }

    return (
        <div className={`create-note-field ${noteType ? 'active' : ''}`}>
            <div className={`insert-txt-field ${noteType ? 'active' : ''}`} >
                <input
                    type="text"
                    placeholder={inputPlaceholder}
                    value={currentText}
                    onChange={handleLocalInputChange}
                />
                <div className="note-icons">
                    <i className="fa-regular fa-message" onClick={() => handleNoteTypeChange('NoteTxt')}></i>
                    <i className="fa-regular fa-square-check" onClick={() => handleTodoTypeChange('NoteTodos')}></i>
                    <i className="fa-regular fa-image" onClick={() => handleNoteTypeChange('NoteImg')}></i>
                </div>
            </div>

            {noteType === 'NoteTodos' && (
                <div className="todos-container header">
                    {todos.map((todo, idx) => (
                        <div
                            key={idx}
                            className={`todo-item header ${idx === todos.length - 1 ? 'last-todo header' : ''}`}
                        >
                            <div>
                                <input type="checkbox" />
                                <input
                                    type="text"
                                    placeholder={`Todo ${idx + 1}`}
                                    value={todo.txt}
                                    onChange={(e) => handleTodoChange(idx, e.target.value)}
                                />
                            </div>
                            {idx === todos.length - 1 && (
                                <div className="plus-sign">
                                    <i className="fa-regular fa-plus create" onClick={addTodo}></i>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {noteType && (
                <div className="bottom-panel">
                    <i className="fa-regular fa-floppy-disk save-button" onClick={handleClose}>Close</i>
                </div>)}
        </div>
    )
}
