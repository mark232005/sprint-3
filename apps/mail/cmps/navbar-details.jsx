
export function NavbarDetails({setMailFilter, setSelectedMail,setSentMail,moveToTrash}){

    function handleOnClick() {
        setSelectedMail(null)
        setMailFilter((prevFilter) => ({ ...prevFilter, status: "inbox" }))
        setSentMail(false)
    }


    return(
        <section className="navbar-details flex">
              <img onClick={()=>handleOnClick()} src="assets/img/back.svg"/>
              <img onClick={() => moveToTrash()} src="assets/img/trash-img.svg"/>
              <img src="assets/img/unread-img.svg"/>
<div className="right-side flex">
<img src="assets/img/before.svg" />
<img src="assets/img/after.svg" />

</div>
        </section>
    )
}