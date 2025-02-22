import { noteService } from "../services/note.service.js";



const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

export function NoteEdit() {
    const params = useParams()
    const navigate = useNavigate()

    const [note, setNote] = useState(noteService.getEmptyNote())

    useEffect(() => {
        if (params.noteId) {
            noteService.getById(params.noteId)
            .then(setNote)
        }
    }, [params.noteId])

    function handleChange({ target }) {
        const { name, value } = target
        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [name]: value
            }
        }))
    }

    function onSave(ev) {
        ev.preventDefault()
        noteService.save(note).then(() => {
            navigate("/note")
        })
    }

    return (
        <section className="note-edit">
            <h2>{params.noteId ? 'Edit Note' : 'Add Note'}</h2>

            <form onSubmit={onSave}>
                <label htmlFor="txt">Note Text</label>
                <textarea
                    name="txt"
                    value={note.info.txt || ''}
                    onChange={handleChange}
                    id="txt"
                />

                <button>Save</button>
            </form>
        </section>
    );
}
