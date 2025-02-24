import { LongTxt } from "./LongTxt.jsx"
const { useParams, Link, useNavigate } = ReactRouterDOM


export function MailPreview({ mail }) {
    const {from,subject,body}=mail
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/mail/details/${mail.id}`)}
    return (
        <section className="mail-preview">
            <a onClick={handleClick}>
            <span>{from} </span>
            <span>{subject}</span>
            {body && <LongTxt txt={body}/>}
            </a>
        </section>

    )
}