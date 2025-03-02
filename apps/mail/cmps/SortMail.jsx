

export function SortMails({toggleSortMailsByDate,toggleSortMailsBySubject}) {


    return (
        <section className="sort">

            <button className="sot-by-date" onClick={()=>toggleSortMailsByDate()}>Date</button>
            <button className="sot-by-title" onClick={()=>toggleSortMailsBySubject()}>A-B</button>
        </section>
    )

}