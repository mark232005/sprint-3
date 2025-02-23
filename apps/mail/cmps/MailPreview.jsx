import { LongTxt } from "./LongTxt.jsx"


export function MailPreview({ mail }) {
    const {from,subject,body}=mail
    return (
        <section className="mail-preview">
            <button>
            <span>{from} </span>
            <span>{subject}</span>
            {body && <LongTxt txt={body}/>}
            </button>
        </section>

    )
}