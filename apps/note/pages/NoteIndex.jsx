import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'
import { NotePreview } from '../cmps/NotePreview.jsx'
import { NodeFilter } from '../cmps/NodeFilter.jsx'
import { utilService } from '../services/util.service.js'


const { useState, useEffect } = React
const { Link } = ReactRouterDOM



export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState({ text: '', type: '' })

    useEffect(() => {
        loadNotes()
    }, [filterBy])


    function loadNotes() {
        noteService.query(filterBy)
            .then(notes => setNotes(notes))
    }

    if (!notes) return <section className="container">Loading...</section>



    function onRemoveNote(noteId) {
        noteService.remove(noteId)
            .then(() => {
                setNotes(prevNotes => {
                    // const removedNote = prevNotes.findIndex(note => note.id === noteId)
                    return prevNotes.filter(note => note.id !== noteId)
                })
            })
    }


    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy })
    }

    function onUpdateNote(updatedNote) {
        noteService.save(updatedNote).then(loadNotes);
    }

    function onDuplicateNote(noteId) {
        noteService.getById(noteId)
            .then(note => {
                const newNote = {
                    ...note,
                    createdAt: Date.now(),
                    isPinned: false

                }
                noteService.save(newNote).then(loadNotes)
            })
    }




    return (
        <section className="note-index">
            <button className="new-note-button">
                <Link to="/note/edit">Add Note</Link>
            </button>
            <NodeFilter filter={filterBy} onSetFilter={onSetFilter} />
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onUpdateNote={onUpdateNote}
                onDuplicateNote={onDuplicateNote}
            />
        </section>
    )
}
