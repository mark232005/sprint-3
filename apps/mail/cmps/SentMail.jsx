import { mailService } from "../services/mail.service.js"


const { useState } = React
export function SentMail({ closeModel, onSentMail,selectedMail,setSentMail}) {
    const [mail, setMail] = useState(()=>{
if(selectedMail)return selectedMail
else return mailService.createMail()
    })


    function sentMailTo(ev) {
        ev.preventDefault()
        const updatedMail = { ...mail, sentAt: Date.now() }
        console.log('saved')
        onSentMail(updatedMail)
        closeModel(false)
    }
    function pushToDraft() {
        onSentMail(mail)
        console.log('push To Draft');

    }
    function handleChange({ target }) {
        setMail({ ...mail, [target.name]: target.value })
    }


    return (
        <section className="sent-mail-model">
            <div className="sent-mail-header flex space-between">
                <h1 className="header-sent">New Message</h1>
                <button className="close-model" onClick={() => {
                    closeModel(false)
                    pushToDraft()
                }}>x</button>
            </div>
            <form onSubmit={(event) => sentMailTo(event)}>
                <div className="input-to">
                    <label htmlFor="to">To:</label>
                    <input className="input" type="email" name="to" onChange={handleChange} id="to"  value={mail.to||""}/>
                </div>
                <div className="input-subject">
                    <label htmlFor="subject"></label>
                    <input className="input" type="text" name="subject" placeholder="Subject" onChange={handleChange} id="subject" value={mail.subject||""}/>
                </div>
                <div className="input-body">
                    <label htmlFor="body"></label>
                    <input className="input" type="text" name="body" onChange={handleChange} id="body" value={mail.body||""}/>
                </div>
                <button className="send-btn">Send</button>
            </form>

        </section>
    )
}