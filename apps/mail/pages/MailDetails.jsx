import { NavbarDetails } from "../cmps/navbar-details.jsx"
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
    const { body, subject, from, to } = currMail
    const name = from.split('@')
    return (
        <section className="mail-details grid">
            <div>
                <NavbarDetails />

            </div>
            <div>
                <h2 className="subject-details">{subject}</h2>
                <div className="header-details flex">
                    <h3 className="name-details">{name[0]}</h3>
                    <p className="mail">
                       {`<${from}>`}
                    </p>

                </div>
                <p className="main-txt-mail">{body}</p>
            <button className="replay-btn flex">  <img className="replay-img"src="assets/img/reply.svg" />Replay</button>
            </div>
        </section>

    )
}