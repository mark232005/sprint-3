import { NotePreview } from './NotePreview.jsx'





export function NoteList({ notes }) {

    return (
        <section className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview note={note} />
                </li>)}
        </section>
    )
}
