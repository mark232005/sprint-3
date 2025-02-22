import { noteService } from '../services/note.service.js'
import { NoteList } from '../cmps/NoteList.jsx'


const { useState, useEffect } = React

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
        <section className="container">
            <NoteList notes={notes} />
        </section>
    )
}
