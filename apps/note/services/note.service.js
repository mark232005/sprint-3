// note service
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
            if (filterBy.text) {
                const regExp = new RegExp(filterBy.text, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt || ''))
            }
            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }
            return notes
        })
}

function getById(noteId) {
    return storageService.get(NOTE_KEY, noteId).then(note => {
        if (!note) note = {}
        return note
    })
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
        style: {
            backgroundColor: '#fff'
        },
        info: {
            txt
        }
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
        filterBy[field] = searchParams.get(field) ||
            defaultFilter[field]
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
            style: {
                backgroundColor: '#00d'
            },
            info: {
                txt: 'Fullstack Me Baby!'
            }
        },
        {
            id: 'n102',
            createdAt: 1112223,
            type: 'NoteImg',
            isPinned: false,
            info: {
                url: 'http://some-img/me',
                title: 'Bobi and Me'
            },
            style: {
                backgroundColor: '#00d'
            }
        },
        {
            id: 'n103',
            createdAt: 1112224,
            type: 'NoteTodos',
            isPinned: false,
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
