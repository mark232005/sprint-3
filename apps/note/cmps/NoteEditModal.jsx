import { Fragment } from "react"

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
    function handleTitleChange(newTitle) {
        setEditedNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                title: newTitle
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
        <div className="modal">
            <div className="overlay" onClick={closeModal} >
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                    {note.type === 'NoteTxt' && (
                        <input
                            name="txt"
                            value={editedNote.info.txt}
                            onChange={handleChange} />
                    )}
                    {note.type === 'NoteTodos' && (
                        <div>

                            <input className="title"
                                type="text"
                                placeholder="Todo List Title"
                                value={editedNote.info.title || ''}
                                onChange={(ev) => handleTitleChange(ev.target.value)}

                            />
                            {editedNote.info.todos.map((todo, idx) => (
                                <div className="ToDo-List" key={idx}>
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
                                </div>
                            ))}

                        </div>

                    )}
                    {note.type === 'NoteImg' && (
                        <div>
                            <input
                                type="text"
                                name="title"
                                value={editedNote.info.title}
                                onChange={handleChange}
                            />
                            <input
                                type="text"
                                name="url"
                                value={editedNote.info.url}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    <button onClick={onSave}>Save</button>
                </div>
            </div>
        </div>
    )
}