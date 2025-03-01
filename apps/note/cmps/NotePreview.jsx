import { ColorInput } from "./dynamic-inputs/ColorInput.jsx";

const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote, onDuplicateNote, handelNoteClick }) {
    console.log('note:', note)
    const [noteColor, setNoteColor] = useState(note.style.backgroundColor)


    function handleColorChange(color) {
        console.log('color:', color)
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
            onClick={() => handelNoteClick(note)}>
            
            <div className="note-preview">
                <div className="note-preview-content">
                {renderNoteType(note)}
                </div>
                <div className="note-preview-functions">
                    <i className="fa-solid fa-trash" onClick={() => onRemoveNote(note.id)}></i>
                    <i className="fa-regular fa-clone" onClick={() => onDuplicateNote(note.id)}></i>
                    <i className="fa-solid fa-palette" onClick={() => <ColorInput value={noteColor} onChange={handleColorChange} />}></i>


                </div>
            </div>
        </section>
    )
}





