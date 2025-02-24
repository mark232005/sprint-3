
export function NotePreview({ note }) {

    return (
        <section className="note-preview">
            <h1>{note.type}</h1>
            <button className="hover" onClick={() => onRemoveNote(note.id)}>Delete</button>

        </section>
    )
}