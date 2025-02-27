import { MailFilter } from "./MailFilter.jsx";


export function Header({ mailFilter, onSetMailFilter }) {

    return (
        <section className="header-container grid ">
            <div className="left-header grid">
                <button className="main-menu-btn"> <img src="assets/img/hamburger-btn.svg" /></button>
                <div className="logo-header flex">
                    <img className="mail-logo" src="assets/img/mail-logo.svg" />
                    <h2 className="logo-name"> Alufmail</h2>
                </div>

            </div>
            <MailFilter mailFilter={mailFilter} onSetMailFilter={onSetMailFilter} />
        </section>
    )
}