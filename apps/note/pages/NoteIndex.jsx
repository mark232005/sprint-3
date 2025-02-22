import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'


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








    return (
        <section className="note-index">
            <button className="new-note-button">
                <Link to="/note/edit">Add Note</Link>
            </button>
            <NoteList notes={notes} />
        </section>
    )
}
