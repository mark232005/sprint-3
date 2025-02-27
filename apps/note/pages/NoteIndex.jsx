import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx';
import { NodeFilter } from '../cmps/NodeFilter.jsx';

const { useState, useEffect } = React;

export function NoteIndex() {
    const [notes, setNotes] = useState(null);
    const [filterBy, setFilterBy] = useState({ text: '', type: '' });
    const [newNoteText, setNewNoteText] = useState('');
    const [noteType, setNoteType] = useState(''); // Default to text note
    const [inputPlaceholder, setInputPlaceholder] = useState('Insert your note');

    useEffect(() => {
        loadNotes();
    }, [filterBy]);

    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes));
    }

    if (!notes) return <section className="container">Loading...</section>;

    function handleInputChange({ target }) {
        setNewNoteText(target.value);
    }

    function handleNoteTypeChange(type) {
        setNoteType(type);
        setInputPlaceholder(type === 'NoteImg' ? 'Insert image URL' : 'Insert your note');
    }

    function onCreateNewNote() {
        if (!newNoteText.trim()) return;

        const newNote = noteService.getEmptyNote();
        newNote.type = noteType;
        newNote.info = noteType === 'NoteImg' ? { url: newNoteText, title: '' } : { txt: newNoteText };

        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [...prevNotes, savedNote]);
            setNewNoteText('');
        });
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
        });
    }

    function onSetFilter(filterBy) {
        setFilterBy({ ...filterBy });
    }

    function onUpdateNote(updatedNote) {
        noteService.save(updatedNote).then(loadNotes);
    }

    function onDuplicateNote(noteId) {
        noteService.getById(noteId).then(note => {
            if (!note) return;

            const duplicatedNote = {
                ...note,
                id: null,
                createdAt: Date.now(),
                isPinned: false
            };

            noteService.save(duplicatedNote).then(loadNotes);
        });
    }

    return (
        <section className="google-keep-container">
            <div className="notes-filter-by-type">
                <NodeFilter filter={filterBy} onSetFilter={onSetFilter} />
            </div>
            <div className="notes-container">
                <div className="add-note-container">
                    <div className={`create-note-field ${noteType ? 'active' : ''}`}>
                        <div className={`insert-txt-field ${noteType ? 'active' : ''}`} >
                            <input
                                type="text"
                                placeholder={inputPlaceholder}
                                value={newNoteText}
                                onChange={handleInputChange}
                            />
                            <div className="note-icons">
                                <i className="fa-regular fa-message" onClick={() => handleNoteTypeChange('NoteTxt')}></i>
                                <i className="fa-regular fa-square-check"></i>
                                <i className="fa-regular fa-image" onClick={() => handleNoteTypeChange('NoteImg')}></i>
                            </div>
                        </div>
                        {noteType && <div className="bottom-panel">
                            <button className="save-button" onClick={onCreateNewNote}>Save</button>
                        </div>}
                    </div>
                </div>
                <NoteList
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    onUpdateNote={onUpdateNote}
                    onDuplicateNote={onDuplicateNote}
                />
            </div>
        </section>
    );
}
