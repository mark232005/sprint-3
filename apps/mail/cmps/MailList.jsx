import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, setSelectedMail }) {
    return (
        <section>
            <ul className="mails-list">
                {
                    mails.map(
                        mail =>
                            <li key={mail.id}>
                                <MailPreview mail={mail} setSelectedMail={setSelectedMail} />
                            </li>
                    )
                }
            </ul>

        </section>
    )


}
