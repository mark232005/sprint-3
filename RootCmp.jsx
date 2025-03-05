const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './apps/note/cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { NoteEditModal } from './apps/note/cmps/NoteEditModal.jsx'
import { MailDetails } from './apps/mail/pages/MailDetails.jsx'
import { BookIndex } from './apps/book/pages/BookIndex.jsx'
import { BookDetails } from './apps/book/pages/BookDetails.jsx'
import { BookEdit } from './apps/book/pages/BookEdit.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/note/edit" element={<NoteEditModal />} />
                <Route path="/book" element={<BookIndex />} />
                <Route path="/bookIndex/:bookId" element={<BookDetails />} />
                <Route path="/bookIndex/edit" element={<BookEdit />} />
                <Route path="/bookIndex/edit/:bookId" element={<BookEdit />} />
        </Routes>
        <UserMsg />
    </section>
    </Router >
}
