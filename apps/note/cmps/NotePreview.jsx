
export function NotePreview({ note, onRemoveNote }) {
    console.log('note', note)
    console.log('note.style', note.style.backgroundColor)


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
            <button className="hover" onClick={() => onRemoveNote(note.id)}>Delete</button>

        </section>
    )
}




