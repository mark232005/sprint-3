// mail service

import { storageService } from "../../../services/async-storage.service.js"
import { utilService } from "../../../services/util.service.js"

const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'Mahatma Appsus'
}

export const mailService = {
    query,
    getById,
    save,
    remove,
    getDefaultMailFilter,
    loggedinUser,
    createMail,
    getFilterFromSearchParams,
    getComposeDataFromSearchParams
}

const KEY = 'mailsDB'
function query(filterBy = {}) {
    return storageService.query(KEY)
        .then(mails => {
            if (!mails || !mails.length) {
                mails = gMails
                utilService.saveToStorage(KEY, mails)
            }
            if (filterBy.search) {
                const regExp = new RegExp(filterBy.search, 'i')
                mails = mails.filter(mail =>
                    regExp.test(mail.from) ||
                    regExp.test(mail.body) ||
                    regExp.test(mail.subject)

                )
            }
            if (filterBy.read) {
                mails = mails.filter(mail => mail.isRead === filterBy.read)
            }
            if (filterBy.status === 'sent') {
                mails = mails.filter(mail => mail.from === loggedinUser.email)
            }
            if (filterBy.status === 'draft') {
                mails = mails.filter(mail => mail.sentAt === null)
            }
            if (filterBy.status === 'inbox') {
                mails = mails.filter(mail =>
                    mail.sentAt !== null && mail.from !== loggedinUser.email && mail.removedAt === null
                )
            }
            if (filterBy.status === 'trash') {
                mails = mails.filter(mail =>
                    mail.removedAt !== null)

            }
            if (filterBy.status === 'starred') {
                mails = mails.filter(mail =>
                    mail.starred !== false)
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

function getDefaultMailFilter() {
    return {
        status: 'inbox',
        search: '',
        isRead: false,
        isStared: false,
        labels: []
    }
}


var gMails = [
    {
        id: 'e101',
        createdAt: 1551133930500,
        subject: 'Miss you!',
        body: 'Would love to catch up sometimes',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'Mia@gmail.com',
        to: 'user@appsus.com',
        starred: true
    },
    {
        id: 'e102',
        createdAt: 1551133930500,
        subject: 'Work',
        body: 'WHi Dima, I need to know when you finish work today so I can plan my time properly.Clean the house What is your favorite food',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'dima@gmail.com',
        starred: false

    },
    {
        id: 'e103',
        createdAt: 1551133930500,
        subject: 'To do list',
        body: 'Clean the house',
        isRead: false,
        sentAt: 1551133982023,
        removedAt: null,
        from: 'mark@gmail.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e104',
        createdAt: 1551133930500,
        subject: 'food',
        body: 'What is your favorite food?',
        isRead: false,
        sentAt: 1551133930594,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'momo@momo.com',
        starred: false

    }

]

function createMail(subject, body, to) {
    return {
        createdAt: Date.now(),
        subject: subject || "",
        body: body || "",
        sentAt: null,
        removedAt: null,
        from: loggedinUser.email,
        starred: false,
        to: to || ""

    }

}

function getFilterFromSearchParams(searchParams) {
    return {
        to: searchParams.get('to') || '',
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || ''
    }
}


function getComposeDataFromSearchParams(searchParams) {
    return {
        to: searchParams.get('to') || '',
        subject: searchParams.get('subject') || '',
        body: searchParams.get('body') || ''
    }
}

