


export function NavBar({ sentMail, setMailFilter, setSelectedMail,isMenuOpen}) {


    function handleOnClick(filterName) {
        setSelectedMail(null)
        setMailFilter((prevFilter) => ({ ...prevFilter, status: filterName }))
    }
    return (
        <section className={isMenuOpen?"nav-bar open-navb-bar":"nav-bar"}>
            <button className="new-msg-btn" onClick={() => sentMail(true)}>
                <img className="new-msg-img" src="assets/img/new-msg-btn.svg" />
            </button>
            <ul  className={isMenuOpen?" open-btn-nav clean-list":"clean-list"}>
                <li>
                    <button className="btn-nav inbox-btn " onClick={() => handleOnClick('inbox')}>
                        <img className="img-nav" src="assets/img/inbox-img.svg" />
                    </button></li>
                <li>
                    <button className="btn-nav starred-btn" onClick={() => handleOnClick('starred')} >
                        <img className="img-nav" src="assets/img/star-navbar.svg" />
                    </button>
                </li>
                <li>
                    <button className="btn-nav sent-btn" onClick={() => handleOnClick('sent')}>
                    <img className="img-nav" src="assets/img/sent-img.svg" />
                    </button></li>
                <li>
                    <button className="btn-nav draft-btn" onClick={() => handleOnClick('draft')}>
                    <img className="img-nav" src="assets/img/draft-img.svg" />
                        </button>
                </li>
                <li>
                    <button className="btn-nav trash-btn" onClick={() => handleOnClick('trash')}>
                    <img className="img-nav" src="assets/img/trash-img.svg" />

                        </button>
                </li>
            </ul>
        </section>
    )
}