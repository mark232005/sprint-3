import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { NavBar } from "../cmps/NavBar.jsx"
import { SentMail } from "../cmps/SentMail.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"



const { useEffect, useState } = React
export function MailIndex() {
    const [selectedMail, setSelectedMail] = useState(null)
    const [mails, setMails] = useState(null)
    const [sentMail,setSentMail]=useState(null)
    const [mailFilter, setMailFilter] = useState(mailService.getDefaultMailFilter())
    useEffect(() => {
        loadMails()
    }, [mailFilter])

    function loadMails() {
        mailService.query(mailFilter).then(
            (mails) => {
                setMails(mails)
            })
    }
    function onSetMailFilter(newMailFilter) {
        setMailFilter(newMailFilter)
    }

    if (!mails) return "Loading...."
    return (
        <section className="container grid">
            <header className="header">
                <MailFilter mailFilter={mailFilter} onSetMailFilter={onSetMailFilter} />
            </header>
            <nav className="sidebar">
                <NavBar sentMail={setSentMail}  setMailFilter={setMailFilter} setSelectedMail={setSelectedMail}/>
            </nav>
            <main className="main">
                {!selectedMail && <MailList mails={mails} setSelectedMail={setSelectedMail} />}
                {selectedMail && <MailDetails mailId={selectedMail} />}
                {sentMail && <SentMail closeModel={setSentMail} />}
        

            </main>

        </section>

    )
}

