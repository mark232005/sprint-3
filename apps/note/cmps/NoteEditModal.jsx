
const { useState, useEffect } = React

export function NoteEditModal({ note, onUpdateNote, closeModal }) {
    const [editedNote, setEditedNote] = useState({ ...note })


    function handleChange({ target }) {
        const { name, value } = target
        setEditedNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [name]: value
            }
        }))
    }

    function onSave(ev) {
        ev.preventDefault()
        onUpdateNote(editedNote)
        closeModal()
    }

    function handleTodoChange(idx, newTxt) {
        setEditedNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos: prevNote.info.todos.map((todo, i) => {
                    if (i === idx) todo.txt = newTxt
                    return todo
                })
            }
        }))

    }

    function onToggleTodo(idx) {
        setEditedNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos: prevNote.info.todos.map((todo, i) => {
                    if (i === idx) todo.doneAt = todo.doneAt ? null : Date.now()
                    return todo
                })
            }
        }))
    }

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                {note.type === 'NoteTxt' && (
                    <textarea
                        name="txt"
                        value={editedNote.info.txt}
                        onChange={handleChange} />
                )}
                {note.type === 'NoteTodos' && (
                    <ul>
                        {editedNote.info.todos.map((todo, idx) => (
                            <li key={idx}>
                                <input
                                    type="checkbox"
                                    checked={!!todo.doneAt}
                                    onChange={() => onToggleTodo(idx)}
                                />
                                <input
                                    type="text"
                                    value={todo.txt}
                                    onChange={(ev) => handleTodoChange(idx, ev.target.value)}
                                />
                            </li>
                        ))}
                    </ul>

                )}
                {note.type === 'NoteImg' && (
                    <textarea
                        name="url"
                        value={editedNote.info.url}
                        onChange={handleChange} />
                )}

                <button onClick={onSave}>Save</button>
            </div>
        </div>
    )
}