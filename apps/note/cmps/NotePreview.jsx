import { ColorInput } from "./dynamic-inputs/ColorInput.jsx";

const { useState } = React

export function NotePreview({ note, onRemoveNote, onUpdateNote ,onDuplicateNote}) {
    const [noteColor, setNoteColor] = useState(note.style.backgroundColor)

    function handleColorChange(color) {
        console.log('color:', color)
        setNoteColor(color)
        const updateNoteStyle = { ...note, style: { ...note.style, backgroundColor: color } }
        onUpdateNote(updateNoteStyle)
    }

    function renderNoteType(note) {
        switch (note.type) {
            case 'NoteTxt':
                return <p>{note.info.txt}</p>
            case 'NoteImg':
                return <img src={note.info.url} alt="img" />
            case 'NoteTodos':
                return <div>
                    <h2>{note.info.title || 'Todo List'}</h2>
                    <ul>{note.info.todos.map((todo, idx) => <li key={idx}>{todo.txt}</li>)}</ul>
                </div>
            default:
                return <p>{note.info.txt}</p>
        }
    }




    return (
        <section style={{ backgroundColor: note.style.backgroundColor }} className="note-preview">
            {renderNoteType(note)}
            <button className="delete-Note-Button" onClick={() => onRemoveNote(note.id)}>Delete</button>
            {/* <button className="duplicate-Note-Button" onClick={() => onDuplicateNote (note.id)}>Duplicate</button> */}

            <ColorInput value={noteColor} onChange={handleColorChange} />
        </section>
    )
}





