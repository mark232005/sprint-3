import { utilService } from './util.service.js';
import { storageService } from '../services/async-storage.service.js';

const NOTE_KEY = 'noteDB'

export const noteService = {
    query,
    getById,
    remove,
    save,
    getEmptyNote,
    getDefaultFilter,
    getFilterFromSearchParams,
}

function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (!notes || !notes.length) {
                notes = _initializeNotes()
                utilService.saveToStorage(NOTE_KEY, notes)
            }
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => {
                    switch (note.type) {
                        case 'NoteTxt':
                            return regExp.test(note.info.txt || '')
                        case 'NoteImg':
                            return regExp.test(note.info.title || '')
                        case 'NoteTodos':
                            return regExp.test(note.info.title || '') ||
                                Array.isArray(note.info.todos) && note.info.todos.some(todo => regExp.test(todo.txt || ''))
                        default:
                            return false
                    }
                })
            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            return notes
        })
}

function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(note => note || {})
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function save(note) {
    return note.id ? storageService.put(NOTE_KEY, note) : storageService.post(NOTE_KEY, note)
}



function getEmptyNote(type = 'NoteTxt', txt = '') {
    return {
        id: '',
        createdAt: Date.now(),
        type,
        isPinned: false,
        style: { backgroundColor: getNoteColor(type) },
        info: { txt }
    }
}

function getDefaultFilter() {
    return {
        text: '',
        type: ''
    }
}

function getFilterFromSearchParams(searchParams) {
    const defaultFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in defaultFilter) {
        filterBy[field] = searchParams.get(field) || defaultFilter[field]
    }
    return filterBy
}

function _initializeNotes() {
    return [
        {
            id: 'n101',
            createdAt: 1112222,
            type: 'NoteTxt',
            isPinned: true,
            style: { backgroundColor: getNoteColor('NoteTxt') },
            info: { txt: 'Fullstack Me Baby!' }
        },
        {
            id: 'n102',
            createdAt: 1112223,
            type: 'NoteImg',
            isPinned: false,
            style: { backgroundColor: getNoteColor('NoteImg') },
            info: { url: 'https://picsum.photos/id/1/200/300', title: 'Bobi and Me' }
        },
        {
            id: 'n103',
            createdAt: 1112224,
            type: 'NoteTodos',
            isPinned: false,
            style: { backgroundColor: getNoteColor('NoteTodos') },
            info: {
                title: 'Get my stuff together',
                todos: [
                    { txt: 'Driving license', doneAt: null },
                    { txt: 'Coding power', doneAt: 187111111 }
                ]
            }
        }
    ]
}

function getNoteColor(type) {
    const colors = {
        'NoteTxt': '#FFDDC1',
        'NoteImg': '#FFCBCB',
        'NoteVideo': '#B5EAD7',
        'NoteTodos': '#E2F0CB', // Blue
        'NoteAudio': '#9C27B0', // Purple
        'NoteCanvas': '#FF9800', // Orange
        'NoteMap': '#795548'  // Brown
    }
    return colors[type] || '#FFFFFF'
}
