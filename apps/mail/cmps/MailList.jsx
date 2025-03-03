import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, setSelectedMail ,onMoveToTrash,onStarred,mailFilter, onDraftMail}) {
    function moveToTrash(mailId){
        onMoveToTrash(mailId)
    }
    if(!mails) return
    return (
        <section>
            <ul className="mails-list clean-list grid">
                {
                    mails.map(
                        mail =>
                            <li className="mail-Preview" key={mail.id}>
                                <MailPreview mail={mail} setSelectedMail={setSelectedMail} moveToTrash={moveToTrash} onStarred={onStarred} 
                                 mailFilter={mailFilter} onDraftMail={onDraftMail}/>
                            </li>
                    )
                }
            </ul>

        </section>
    )


}
