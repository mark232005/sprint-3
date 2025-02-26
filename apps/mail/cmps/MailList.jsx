import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, setSelectedMail ,onMoveToTrash}) {
    function moveToTrash(mailId){
        onMoveToTrash(mailId)
    }
    console.log(mails);
    if(!mails) return
    return (
        <section>
            <ul className="mails-list">
                {
                    mails.map(
                        mail =>
                            <li key={mail.id}>
                                <MailPreview mail={mail} setSelectedMail={setSelectedMail} />
                                <button className="on-remove-btn" onClick={()=>moveToTrash(mail.id)}>Remove</button>
                            </li>
                    )
                }
            </ul>

        </section>
    )


}
