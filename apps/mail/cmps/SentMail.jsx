import { mailService } from "../services/mail.service.js"

const { useState, useEffect } = React
const { useSearchParams } = ReactRouterDOM

export function SentMail({ closeModel, onSentMail, selectedMail, setSentMail }) {
    const [searchParams, setSearchParams] = useSearchParams()

    const initialMail = mailService.getComposeDataFromSearchParams(searchParams)

    const [mail, setMail] = useState(() => {
        if (selectedMail) return selectedMail
        return mailService.createMail(initialMail.subject, initialMail.body, initialMail.to)
    })

    useEffect(() => {
        const updatedParams = new URLSearchParams(searchParams)

        updatedParams.set('to', mail.to || '')
        updatedParams.set('subject', mail.subject || '')
        updatedParams.set('body', mail.body || '')
        setSearchParams(updatedParams)
    }, [mail])

    function sentMailTo(ev) {
        ev.preventDefault()
        const updatedMail = { ...mail, sentAt: Date.now() }
        onSentMail(updatedMail)
        closeModel(false)
    }

    function pushToDraft() {
        onSentMail(mail)
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
            <form onSubmit={sentMailTo}>
                <div className="input-to">
                    <label htmlFor="to">To:</label>
                    <input className="input" type="email" name="to" onChange={handleChange} id="to" value={mail.to || ""} />
                </div>
                <div className="input-subject">
                    <label htmlFor="subject"></label>
                    <input className="input" type="text" name="subject" placeholder="Subject" onChange={handleChange} id="subject" value={mail.subject || ""} />
                </div>
                <div className="input-body">
                    <label htmlFor="body"></label>
                    <input className="input" type="text" name="body" onChange={handleChange} id="body" value={mail.body || ""} />
                </div>
                <button className="send-btn">Send</button>
            </form>
        </section>
    )
}
