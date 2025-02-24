import { MailPreview } from "./MailPreview.jsx";

export function MailList({mails}) {
    return (
        <section>
            <ul className="mails-list">
{
    mails.map(
        mail=>
            <li  key={mail.id}>
                <MailPreview mail={mail}/>
            </li>
    )
}
            </ul>

        </section>
    )
        
    
}
