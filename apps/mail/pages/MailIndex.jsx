import { MailList } from "../cmps/MailList.jsx"
import { mailService } from "../services/mail.service.js"


const { useEffect, useState } = React
export function MailIndex() {

    const [mails, setMails] = useState(null)
    useEffect(() => {
        loadMails()
        console.log(mails);
    }, [])

    function loadMails() {
        mailService.query().then(
            (mails) => {
                setMails(mails)
            })
    }

if(!mails) return "Loading...."
    return (
        <section className="container">
           <main className="main">
            <MailList mails={mails}/>
            
            </main> 

        </section>

    )
}

