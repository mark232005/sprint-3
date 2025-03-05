import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/NoteList.jsx';
import { NodeFilter } from '../cmps/NodeFilter.jsx';
import { NoteAddNew } from '../cmps/NoteAddNew.jsx';
import { NoteMainFilterHeader } from '../cmps/NoteMainFilterHeader.jsx';
import { NoteEditModal } from '../cmps/NoteEditModal.jsx';


const { useState, useEffect } = React;

export function NoteIndex() {
    const [notes, setNotes] = useState([])
    const [filterBy, setFilterBy] = useState({ text: '', type: '' })
    const [newNoteText, setNewNoteText] = useState('')
    const [noteType, setNoteType] = useState('')
    const [inputPlaceholder, setInputPlaceholder] = useState('Insert your note')
    const [todos, setTodos] = useState([])
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const pinnedNotes = notes.filter(note => note.isPinned)
    const unpinnedNotes = notes.filter(note => !note.isPinned)


    const [selectedNote, setSelectedNote] = useState(null)




    function handelNoteClick(note) {
        setSelectedNote(note)
    }

    function resetNoteForm() {
        setNewNoteText('')
        setNoteType('')
        setTodos([])
        setInputPlaceholder('Insert your note')
    }

    function closeModal() {
        setSelectedNote(null)
    }
    useEffect(() => {
        loadNotes();
    }, [filterBy]);

    function loadNotes() {
        noteService.query(filterBy).then(notes => setNotes(notes));
    }

    if (!notes) return <section className="container">Loading...</section>;

    function handleInputChange({ target }) {
        setNewNoteText(target.value)
    }

    function handleNoteTypeChange(type) {
        setNoteType(type)
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

    function onCreateNewNote(txt, type) {
        if (!txt.trim()) return;

        const newNote = noteService.getEmptyNote();
        newNote.type = type

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
            newNote.info = { txt: txt };
        }
        noteService.save(newNote).then(savedNote => {
            setNotes(prevNotes => [...prevNotes, savedNote])
            loadNotes()
            resetNoteForm()


        })
    }

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId));
        })
    }
    function onTogglePin(noteId) {
        setNotes(prevNotes =>
            sortNotes(
                prevNotes.map(note =>
                    note.id === noteId ? { ...note, isPinned: !note.isPinned } : note
                )
            )
        )
    }

    function onSetFilter(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
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
        })
    }
    function sortNotes(notes) {
        return notes.sort((a, b) => {
            if (a.isPinned === b.isPinned) return 0;
            return a.isPinned ? -1 : 1
        })
    }

    function onToggleMenu() {
        console.log('toggle menu', isMenuOpen)
        setIsMenuOpen(isMenuOpen => !isMenuOpen)
    }

    return (
        <section className="google-keep-container">
            <div className="google-keep-header">
                <div className="menu-icon">
                    <i className="fa-solid fa-bars" onClick={() => onToggleMenu()}></i>
                    <span>Aluf Keep</span>
                </div>

                <NoteMainFilterHeader filterBy={filterBy} onSetFilter={onSetFilter} onToggleMenu={onToggleMenu} />
            </div>
            <div className='google-keep-content'>
                <NodeFilter filter={filterBy} onSetFilter={onSetFilter} isMenuOpen={isMenuOpen} />

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
                            resetNoteForm={resetNoteForm}


                        />
                    </div>

                    {pinnedNotes.length > 0 && (
                        <div>
                            <h3>Pinned Notes</h3>
                            <NoteList
                                notes={pinnedNotes}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                                onDuplicateNote={onDuplicateNote}
                                onTogglePin={onTogglePin}
                                handelNoteClick={handelNoteClick}
                            />
                        </div>
                    )}
                    {unpinnedNotes.length > 0 && (
                        <div>
                            <h3>Other Notes</h3>
                            <NoteList
                                notes={unpinnedNotes}
                                onRemoveNote={onRemoveNote}
                                onUpdateNote={onUpdateNote}
                                onDuplicateNote={onDuplicateNote}
                                onTogglePin={onTogglePin}
                                handelNoteClick={handelNoteClick}

                            />
                        </div>
                    )}


                </div>
            </div>

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
