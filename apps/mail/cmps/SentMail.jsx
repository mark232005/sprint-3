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
            <div className="sent-mail-header">
                <h1>Nex Message</h1>
                <button onClick={() => {
                    closeModel(false)
                    pushToDraft()
                }}>x</button>
            </div>
            <form onSubmit={(event) => sentMailTo(event)}>
                <input type="email" name="to" placeholder="Recipients" onChange={handleChange} />
                <input type="text" name="subject" placeholder="Subject" onChange={handleChange} />
                <input type="text" name="body" onChange={handleChange} />
                <button>Sent</button>
            </form>

        </section>
    )
}