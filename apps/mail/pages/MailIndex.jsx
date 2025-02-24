import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


const { useEffect, useState } = React
export function MailIndex() {

    const [mails, setMails] = useState(null)
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
    function onSetMailFilter(newMailFilter){
        setMailFilter(newMailFilter)
    }

    if (!mails) return "Loading...."
    return (
        <section className="container">
            <header>
                <MailFilter mailFilter={mailFilter} onSetMailFilter={onSetMailFilter} />
            </header>
            <main className="main">
                <MailList mails={mails} />

            </main>

        </section>

    )
}

