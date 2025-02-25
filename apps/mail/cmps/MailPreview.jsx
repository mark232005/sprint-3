import { LongTxt } from "./LongTxt.jsx"

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, setSelectedMail }) {
    const { from, subject, body,to } = mail
    const handleClick = () => {
        setSelectedMail(mail.id)
    }
    return (
        <section className="mail-preview">
            <a onClick={handleClick}>
                {from===mailService.loggedinUser.email? <span>To: {to} </span>: <span>{from} </span>}
                <span>{from} </span>
                <span>{subject}</span>
                {body && <LongTxt txt={body} />}
            </a>
        </section>

    )
}