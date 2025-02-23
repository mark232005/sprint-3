import { NotePreview } from './NotePreview.jsx'





export function NoteList({ notes, onRemoveNote }) {

    return (
        <section className="note-list">
            {notes.map(note =>
                <li className="note-item" key={note.id}>
                    <NotePreview
                        note={note}
                        onRemoveNote={onRemoveNote} />

                </li>)}
        </section>
    )
}
