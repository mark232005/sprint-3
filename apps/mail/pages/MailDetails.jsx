import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React


export function MailDetails({ mailId }) {
    const [currMail, setCurrMail] = useState(null)
    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.getById(mailId).then(
            mail => setCurrMail(mail)
        )

    }

    if (!currMail) return
    const { body, subject, from, } = currMail
    return (
        <section className="mail-details">
            <header>
                <h2>{subject}</h2>
            </header>
            <div>
                <h3>{from}</h3>
                <p>{body}</p>
            </div>
        </section>

    )
}