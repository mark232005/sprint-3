import { NotePreview } from './NotePreview.jsx'
import { NoteEditModal } from './NoteEditModal.jsx'


const { useState, useEffect } = React



export function NoteList({ notes, onRemoveNote, onUpdateNote, onDuplicateNote, onTogglePin ,handelNoteClick}) {



    return (
        <section className="note-list">
            {notes.map(note => (
                <li className="note-item" key={note.id}>
                    <NotePreview
                        note={note}
                        onRemoveNote={onRemoveNote}
                        onUpdateNote={onUpdateNote}
                        onDuplicateNote={onDuplicateNote}
                        onTogglePin={onTogglePin}
                        handelNoteClick={handelNoteClick}
                    />

                </li>
            ))}

        </section>
    )
}



