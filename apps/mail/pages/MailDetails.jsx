import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM


export function MailDetails() {
    const [currMail, setCurrMail] = useState(null)
    const param = useParams()
    useEffect(() => {
        loadMail()
    }, [param.mailId])

    function loadMail() {
        mailService.getById(param.mailId).then(
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