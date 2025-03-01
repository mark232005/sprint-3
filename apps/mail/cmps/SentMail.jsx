import { mailService } from "../services/mail.service.js"


const { useState } = React
export function SentMail({ closeModel, onSentMail }) {
    const sentMail = {
        createdAt: Date.now(),
        subject: '',
        body: '',
        sentAt: null,
        removedAt: null,
        from: mailService.loggedinUser.email,
        to: ''

    }

    const [mail, setMail] = useState(sentMail)




    function sentMailTo(ev) {
        ev.preventDefault()
        const updatedMail = { ...mail, sentAt: Date.now() }
        console.log('saved')
        onSentMail(updatedMail)
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
                    <input className="input" type="email" name="to" onChange={handleChange} id="to" />
                </div>
                <div className="input-subject">
                    <label htmlFor="subject"></label>
                    <input className="input" type="text" name="subject" placeholder="Subject" onChange={handleChange} id="subject" />
                </div>
                <div className="input-body">
                    <label htmlFor="body"></label>
                    <input className="input" type="text" name="body" onChange={handleChange} id="body" />
                </div>
                <button className="send-btn">Send</button>
            </form>

        </section>
    )
}