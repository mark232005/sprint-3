import { Header } from "../cmps/Header.jsx"
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
    const [sentMail, setSentMail] = useState(null)
    const [mailFilter, setMailFilter] = useState(mailService.getDefaultMailFilter())
    const [isMenuOpen, setIsMenuOpen]=useState(false)
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
    function onMoveToTrash(mailId) {
        console.log(mailId);
        mailService.getById(mailId).then(mail => {
            mail.removedAt = Date.now()
            mailService.save(mail).then(
                upDateMail => setMails(prevMails =>prevMails.filter(mail=>mail.id!==upDateMail.id))
            )
        }
        )
    }

    function onSentMail(mail) {
        mailService.save(mail).then(
            newMail => setMails(prevMails => [...prevMails, newMail])
        )

    }
    function toggleOpenMenu(){
setIsMenuOpen(isMenuOpen=>!isMenuOpen)
    }

    if (!mails) return "Loading...."
    return (
        <section className="mail-container grid">
            <header className="header">
                <Header mailFilter={mailFilter} onSetMailFilter={onSetMailFilter} toggleOpenMenu={toggleOpenMenu} />
            </header>
            <nav className="sidebar">
                <NavBar sentMail={setSentMail} setMailFilter={setMailFilter} setSelectedMail={setSelectedMail} isMenuOpen={isMenuOpen} />
            </nav>
            <main className={isMenuOpen?"main menuOpen grid":"main grid"}>
                {!selectedMail && <MailList mails={mails} setSelectedMail={setSelectedMail} onMoveToTrash={onMoveToTrash} />}
                {selectedMail && <MailDetails mailId={selectedMail} />}
                {sentMail && <SentMail closeModel={setSentMail} onSentMail={onSentMail} />}


            </main>

        </section>

    )
}

