import { ColorInput } from "./dynamic-inputs/ColorInput.jsx";
import { Link } from 'react-router-dom'


const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote, onDuplicateNote, handelNoteClick, onTogglePin }) {
    console.log('note:', note)
    const [noteColor, setNoteColor] = useState(note.style.backgroundColor)
    const [showColorPicker, setShowColorPicker] = useState(false);



    function handleColorChange(color) {
        setNoteColor(color)
        const updateNoteStyle = { ...note, style: { ...note.style, backgroundColor: color } }
        onUpdateNote(updateNoteStyle)
    }



    function toggleTodoStatus(note, noteId, todoIdx) {
        const updatedNotes = notes.map(note => {
            if (note.id !== noteId) return note

            const updatedTodos = note.info.todos.map((todo, idx) => {
                if (idx === todoIdx) {
                    return { ...todo, doneAt: todo.doneAt ? null : Date.now() }
                }
                return todo
            })

            return { ...note, info: { ...note.info, todos: updatedTodos } }
        })

        setNotes(updatedNotes);
        noteService.save(updatedNotes.find(note => note.id === noteId))
    }


    function renderNoteType(note) {
        switch (note.type) {
            case 'NoteTxt':
                return <p>{note.info.txt}</p>
            case 'NoteImg':
                return <div><img src={note.info.url} alt="img" />
                    <h2>{note.info.title}</h2>
                </div>
            case 'NoteTodos':
                return <div>
                    <h2>{note.info.title || 'Todo List'}</h2>
                    {note.info.todos.map((todo, idx) => (
                        <div key={idx} className='todo-item'>
                            <input
                                type="checkbox"
                                checked={!!todo.doneAt}
                                onChange={() => toggleTodoStatus(note, note.id, idx)}
                            />
                            <li className={todo.doneAt ? 'done' : ''}>{todo.txt}</li>
                        </div>))}
                </div>
            default:
                return <p>{note.info.txt}</p>
        }
    }




    return (
        <section style={{ backgroundColor: note.style.backgroundColor }}
            className="note-preview"
        >
            <div className="note-preview" onClick={() => handelNoteClick(note)}>
                <div className="note-preview-content">
                    {renderNoteType(note)}
                </div>
                <div className="note-preview-functions">
                    <i className="fa-solid fa-trash" onClick={(e) => {
                        e.stopPropagation();
                        onRemoveNote(note.id);
                    }}></i>
                    <i className="fa-regular fa-clone" onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateNote(note.id);
                    }}></i>
                    <i className="fa-solid fa-palette" onClick={(e) => {
                        e.stopPropagation();
                        setShowColorPicker(!showColorPicker);
                    }}></i>
                    <i
                        className={`fa-thumbtack ${note.isPinned ? 'pinned' : ''}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            onTogglePin(note.id)
                        }}
                    ></i>
                    <span className="material-symbols-outlined">
                        keep
                    </span>

                    {showColorPicker && (
                        <div onClick={(e) => e.stopPropagation()}>
                            <ColorInput
                                value={noteColor}
                                handleColorChange={(color) => {
                                    handleColorChange(color)
                                    // setShowColorPicker(false)
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </section>
    )
}





