import { noteService } from "../services/note.service.js";
import { ColorInput } from "./dynamic-inputs/ColorInput.jsx";
import { Link } from 'react-router-dom'


const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote, onDuplicateNote, handelNoteClick, onTogglePin }) {
    // console.log('note:', note)
    const [noteColor, setNoteColor] = useState(note.style.backgroundColor)
    const [showColorPicker, setShowColorPicker] = useState(false);



    function handleColorChange(color) {
        setNoteColor(color)
        const updateNoteStyle = { ...note, style: { ...note.style, backgroundColor: color } }
        onUpdateNote(updateNoteStyle)
        setShowColorPicker(false)
    }





    function toggleTodoStatus(note, noteId, todoIdx) {
        const updatedTodos = note.info.todos.map((todo, idx) => {
            if (idx === todoIdx) {
                return { ...todo, doneAt: todo.doneAt ? null : Date.now() }
            }
            return todo
        })

        const updatedNote = { ...note, info: { ...note.info, todos: updatedTodos } }

        onUpdateNote(updatedNote)

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
                                onClick={(e) => e.stopPropagation()}
                            />
                            <li className={todo.doneAt ? 'done' : ''}>{todo.txt}</li>
                        </div>))}
                </div>
            default:
                return <p>{note.info.txt}</p>
        }
    }

    function sendToEmail(note) {
        const subject = encodeURIComponent(note.info.title || 'Note Text from Keep')
        const body = encodeURIComponent(getNoteBody(note))
    
        const url = `#/mail?subject=${subject}&body=${body}`
        window.location.href = url
    }
    
    function getNoteBody(note) {
        switch (note.type) {
            case 'NoteTxt':
                return note.info.txt || ''
            case 'NoteImg':
                return `Check out this image: ${note.info.url || ''}`
            case 'NoteTodos':
                return note.info.todos.map(todo => `- ${todo.txt}`).join('\n') || ''
            default:
                return 'Check out this note!'
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
                    <i className="fa-solid fa-envelope" onClick={(e) => {
                        e.stopPropagation()
                        sendToEmail(note)
                    }}></i>
                    <i className="fa-regular fa-clone" onClick={(e) => {
                        e.stopPropagation();
                        onDuplicateNote(note.id);
                    }}></i>
                    <i className="fa-solid fa-palette" onClick={(e) => {
                        e.stopPropagation();
                        setShowColorPicker(!showColorPicker);
                    }}></i>
                    <i className={`fa-solid ${note.isPinned ? 'fa-solid fa-link-slash' : 'fa-thumbtack'}`}
                        onClick={(e) => {
                            e.stopPropagation()
                            onTogglePin(note.id)
                        }}
                    ></i>
                </div>
                <div>
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





