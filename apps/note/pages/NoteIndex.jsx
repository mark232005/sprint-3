import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx';
import { NodeFilter } from '../cmps/NodeFilter.jsx';
import { NoteAddNew } from '../cmps/NoteAddNew.jsx';


const { useState, useEffect } = React;

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [filterBy, setFilterBy] = useState({ text: '', type: '' })
    const [newNoteText, setNewNoteText] = useState('')
    const [noteType, setNoteType] = useState('')
    const [inputPlaceholder, setInputPlaceholder] = useState('Insert your note')
    const [todos, setTodos] = useState([])

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

    function handleTodoTypeChange(type) {
        setNoteType(type)
        setInputPlaceholder('Insert your todo tile')
        setTodos([{ txt: '', doneAt: null }])
    }
    function handleTodoChange(idx, value) {
        const updatedTodos = todos.map((todo, todoIdx) =>
            idx === todoIdx ? { ...todo, txt: value } : todo
        );
        setTodos(updatedTodos);
    }
    function addTodo() {
        setTodos([...todos, { txt: '', doneAt: null }]);
    }

    function onCreateNewNote() {
        if (!newNoteText.trim()) return;

        const newNote = noteService.getEmptyNote();
        newNote.type = noteType;

        if (noteType === 'NoteImg') {
            newNote.info = {
                url: newNoteText,
                title: 'New Image Note'
            };
        } else if (noteType === 'NoteTodos') {
            newNote.info = {
                title: newNoteText,
                todos
            }
        } else {
            newNote.info = { txt: newNoteText };
        }
        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [...prevNotes, savedNote]);
            setNewNoteText('');
            setNoteType('');
        })
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
            <NodeFilter filter={filterBy} onSetFilter={onSetFilter} />

            <div className="notes-container">
                <div className="add-note-container">
                    <NoteAddNew
                        noteType={noteType}
                        inputPlaceholder={inputPlaceholder}
                        newNoteText={newNoteText}
                        handleInputChange={handleInputChange}
                        handleNoteTypeChange={handleNoteTypeChange}
                        handleTodoTypeChange={handleTodoTypeChange}
                        todos={todos}
                        handleTodoChange={handleTodoChange}
                        addTodo={addTodo}
                        onCreateNewNote={onCreateNewNote}
                    />
                    </div>
                <NoteList
                    notes={notes}
                    onRemoveNote={onRemoveNote}
                    onUpdateNote={onUpdateNote}
                    onDuplicateNote={onDuplicateNote}
                />
            </div>
        </section>
    )
}
