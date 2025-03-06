

export function SortMails({ toggleSortMailsByDate, toggleSortMailsBySubject, isSortByDate, isSortBySubject, toggleSortMailsByRead, isSortByRead }) {
    return (
        <section className="sort flex">

            <button className="sort-btn" onClick={() => toggleSortMailsByDate()}><img className="sort-img" src={isSortByDate ? "assets/img/sort-down.svg" : "assets/img/sort-up.svg"} />Date</button>
            <button className="sort-btn" onClick={() => toggleSortMailsBySubject()}><img className="sort-img" src={isSortBySubject ? "assets/img/sort-down.svg" : "assets/img/sort-up.svg"} />Subject</button>
            <button className="sort-btn" onClick={() => toggleSortMailsByRead()}>{isSortByRead ? <span>All</span> : <span>Unread</span> } </button>

        </section>
    )

}