// mail service

import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"


export const mailService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilter,
}

const KEY = 'mailsDB'

function query(filterBy = {}) {
    return storageService.query(KEY)
        .then(mails => {
            if (!mails || !mails.length) {
                mails = gMails
                utilService.saveToStorage()
            }
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                mails = mails.filter(b => regExp.test(b.title))
            }
            if (filterBy.read) {
                mails = mails.filter(mail => mail.isRead ===filterBy.read)
            }
            return mails
        })
}

function getById(mailId) {
    return storageService.get(KEY, mailId)
}

function remove(mailId) {
    return storageService.remove(KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(KEY, mail)
    } else {
        return storageService.post(KEY, mail)
    }
}

function getDefaultFilter() {
    return { read:false ,search:'' }
}
