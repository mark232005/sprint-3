import { LongTxt } from "./LongTxt.jsx"


export function MailPreview({ mail, setSelectedMail }) {
    const { from, subject, body } = mail
    const handleClick = () => {
        setSelectedMail(mail.id)
    }
    return (
        <section className="mail-preview">
            <a onClick={handleClick}>
                <span>{from} </span>
                <span>{subject}</span>
                {body && <LongTxt txt={body} />}
            </a>
        </section>

    )
}