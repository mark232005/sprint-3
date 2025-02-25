


export function NavBar({ sentMail, setMailFilter,setSelectedMail }) {


    function handleOnClick(filterName) {
        setSelectedMail(null)
        setMailFilter((prevFilter)=>({...prevFilter,status :filterName}))
    }
    return (
        <section >
            <button onClick={() => sentMail(true)}>Compose</button>
            <ul>
                <li><button onClick={() =>handleOnClick ('inbox')}>Inbox</button></li>
                <li><button onClick={() =>handleOnClick ('starred')} >Starred</button></li>
                <li><button  onClick={() =>handleOnClick ('sent')} >Sent</button></li>
                <li><button  onClick={() =>handleOnClick ('draft')}>Draft</button></li>
                <li><button  onClick={() =>handleOnClick ('trash')}>Trash</button></li>
            </ul>
        </section>
    )
}