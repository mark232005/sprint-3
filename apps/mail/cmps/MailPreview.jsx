import { LongTxt } from "./LongTxt.jsx"

import { mailService } from "../services/mail.service.js"

export function MailPreview({ mail, setSelectedMail, moveToTrash }) {
    const { from, subject, body, to, sentAt, isRead } = mail
    const handleClick = () => {
        setSelectedMail(mail.id)
    }
    const formattedSentAt = new Date(sentAt)
    function formatDate() {
        const day = formattedSentAt.getDate()
        const month = formattedSentAt.getMonth() + 1
        const year = formattedSentAt.getFullYear()
        return `${day}/${month}/${year}`
    }
    return (
        <section className= {isRead?"mail-preview grid base-line ":"mail-preview grid base-line unread"}>
            <input className="checkbox-mail " type="checkbox" />
                <img className="starred-img-mail" src="assets/img/empty-star.svg" />
            <a className=" a-mail-preview grid base-line" onClick={handleClick}>
                <span className="name">{from === mailService.loggedinUser.email ? <span>To: {to} </span> : <span>{from} </span>}</span>
                <div className="mail-txt flex">
                    <span className="subject-txt">{subject}- </span>
                    <span className="body-txt">
                        {body && <LongTxt txt={body} />}
                    </span>
                </div>
            </a>
            <span className="date-mail base-line">
                <span className="email-date">{formatDate()}</span>
                <div className="email-buttons">
                        <img className="trash-img-mail " src="assets/img/trash-img.svg" onClick={() => moveToTrash(mail.id)}/>
                        <img className="read-img-mail" src={isRead ? " assets/img/mail-open-img.svg" : "assets/img/unread-img.svg"} />
                        <img className="share-img" src="assets/img/share-img.svg" />
                </div>
            </span>
        </section>

    )
}