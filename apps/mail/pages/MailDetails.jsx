import { NavbarDetails } from "../cmps/navbar-details.jsx"
import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React


export function MailDetails({ mailId,setMailFilter, setSelectedMail ,setSentMail,onMoveToTrash,onReadMail}) {
    const [currMail, setCurrMail] = useState(null)
    useEffect(() => {
        loadMail()
        onReadMail(mailId)
    }, [mailId])

    function loadMail() {
        mailService.getById(mailId).then(
            mail => setCurrMail(mail)
        )

    }
    function moveToTrash(){
        
        onMoveToTrash(mailId)
        setSelectedMail(null)
    }


    if (!currMail) return
    const { body, subject, from, to } = currMail
    const name = from&&from.split('@')[0]
    
    return (
        <section className="mail-details grid">
            <div>
                <NavbarDetails setMailFilter={setMailFilter} setSelectedMail={setSelectedMail} setSentMail={setSentMail} moveToTrash={moveToTrash}/>

            </div>
            <div>
                <h2 className="subject-details">{subject}</h2>
                <div className="header-details flex">
                    <h3 className="name-details">{name}</h3>
                    <p className="mail">
                       {`<${from}>`}
                    </p>

                </div>
                <p className="main-txt-mail">{body}</p>
            <button className="replay-btn flex" onClick={()=>setSentMail(true)}> <img className="replay-img"src="assets/img/reply.svg" />Replay</button>
            </div>
        </section>

    )
}