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
        createdAt: 1551233930500,
        subject: 'Work',
        body: 'WHi Dima, I need to know when you finish work today so I can plan my time properly. Clean the house. What is your favorite food?',
        isRead: false,
        sentAt: 1551233930594,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'dima@gmail.com',
        starred: false
    },
    {
        id: 'e103',
        createdAt: 1551333930500,
        subject: 'To do list',
        body: 'Clean the house',
        isRead: true,
        sentAt: 1551333982023,
        removedAt: null,
        from: 'mark@gmail.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e104',
        createdAt: 1551433930500,
        subject: 'food',
        body: 'What is your favorite food?',
        isRead: false,
        sentAt: 1551433930594,
        removedAt: null,
        from: 'user@appsus.com',
        to: 'momo@momo.com',
        starred: false
    },
    {
        id: 'e105',
        createdAt: 1551533930500,
        subject: 'Holiday Plans',
        body: 'Let me know when you are free to discuss holiday plans',
        isRead: false,
        sentAt: 1551533930594,
        removedAt: null,
        from: 'alice@gmail.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e106',
        createdAt: 1551633930500,
        subject: 'Meeting Confirmation',
        body: 'Just confirming the meeting for tomorrow at 2pm.',
        isRead: false,
        sentAt: 1551633930594,
        removedAt: null,
        from: 'boss@company.com',
        to: 'user@appsus.com',
        starred: true
    },
    {
        id: 'e107',
        createdAt: 1551733930500,
        subject: 'Important Update',
        body: 'There has been an important update regarding the project, please read.',
        isRead: false,
        sentAt: 1551733930594,
        removedAt: null,
        from: 'projectmanager@company.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e108',
        createdAt: 1551833930500,
        subject: 'Family Gathering',
        body: 'Are you available for a family gathering this weekend?',
        isRead: true,
        sentAt: 1551833930594,
        removedAt: null,
        from: 'mom@family.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e109',
        createdAt: 1551933930500,
        subject: 'Reminder',
        body: 'Don’t forget the deadline for the report.',
        isRead: false,
        sentAt: 1551933930594,
        removedAt: null,
        from: 'assistant@company.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e110',
        createdAt: 1552033930500,
        subject: 'Discount Offer',
        body: 'Big sale coming up. Don’t miss it!',
        isRead: false,
        sentAt: 1552033930594,
        removedAt: null,
        from: 'sales@store.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e111',
        createdAt: 1552133930500,
        subject: 'Feedback Request',
        body: 'We would appreciate your feedback on our new app.',
        isRead: true,
        sentAt: 1552133930594,
        removedAt: null,
        from: 'support@company.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e112',
        createdAt: 1552233930500,
        subject: 'Event Invitation',
        body: 'Join us for an exclusive event this Saturday.',
        isRead: false,
        sentAt: 1552233930594,
        removedAt: null,
        from: 'events@company.com',
        to: 'user@appsus.com',
        starred: true
    },
    {
        id: 'e113',
        createdAt: 1552333930500,
        subject: 'Newsletter',
        body: 'Check out the latest updates from our company.',
        isRead: true,
        sentAt: 1552333930594,
        removedAt: null,
        from: 'newsletter@company.com',
        to: 'user@appsus.com',
        starred: false
    },
    {
        id: 'e114',
        createdAt: 1552433930500,
        subject: 'Team Outing',
        body: 'Let’s plan a team outing for next month.',
        isRead: false,
        sentAt: 1552433930594,
        removedAt: null,
        from: 'hr@company.com',
        to: 'user@appsus.com',
        starred: true
    },
    {
        id: 'e115',
        createdAt: 1552533930500,
        subject: 'Job Application',
        body: 'We received your application and would like to schedule an interview.',
        isRead: true,
        sentAt: 1552533930594,
        removedAt: null,
        from: 'hr@company.com',
        to: 'user@appsus.com',
        starred: false
    }
];

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

