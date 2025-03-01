import { NotePreview } from './NotePreview.jsx'
import { NoteEditModal } from './NoteEditModal.jsx'


const { useState, useEffect } = React



export function NoteList({ notes, onRemoveNote , onUpdateNote, onDuplicateNote}) {

    const [selectedNote, setSelectedNote] = useState(null)

    function handelNoteClick(note){
        setSelectedNote(note)
    }

    function closeModal(){
        setSelectedNote(null)
    }

    return (
        <section className="note-list">
            {notes.map(note => (
                <li className="note-item" key={note.id}>
                    <NotePreview
                        note={note}
                        onRemoveNote={onRemoveNote}
                        onUpdateNote={onUpdateNote}
                        onDuplicateNote={onDuplicateNote}
                        handelNoteClick={handelNoteClick}
                         />

                </li>
            ))}
            {selectedNote && (
                <NoteEditModal
                    note={selectedNote}
                    onUpdateNote={onUpdateNote}
                    closeModal={closeModal}
                    
                />
            )}
        </section>
    )
}
