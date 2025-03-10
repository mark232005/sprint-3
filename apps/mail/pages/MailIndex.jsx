import { Header } from "../cmps/Header.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { NavBar } from "../cmps/NavBar.jsx"
import { SentMail } from "../cmps/SentMail.jsx"
import { SortMails } from "../cmps/SortMail.jsx"
import { mailService } from "../services/mail.service.js"
import { MailDetails } from "./MailDetails.jsx"

const { useSearchParams } = ReactRouterDOM


const { useEffect, useState } = React
export function MailIndex() {
    const [searchParams] = useSearchParams()

    const [selectedMail, setSelectedMail] = useState(null)
    const [mails, setMails] = useState(null)
    const [sentMail, setSentMail] = useState(false)
    const [mailFilter, setMailFilter] = useState(mailService.getDefaultMailFilter())
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isSortByDate, setIsSortByDate] = useState(false)
    const [isSortBySubject, setIsSortBySubject] = useState(false)
    const [isSortByRead, setIsSortByRead] = useState(false)
    useEffect(() => {
        loadMails()
    }, [mailFilter])

    useEffect(() => {
        const subject = searchParams.get('subject')
        const body = searchParams.get('body')

        if (subject || body) {
            setSentMail(true)
        }
    }, [searchParams])

    function loadMails() {
        mailService.query(mailFilter).then(
            (mails) => {
                setMails(mails)
            })
    }
    function onSetMailFilter(newMailFilter) {
        setMailFilter(newMailFilter)
    }
    function onMoveToTrash(mailId) {
        mailService.getById(mailId).then(mail => {
            if (mail.removedAt) {
                mailService.remove(mailId).then(
                    () => setMails(prevMails => prevMails.filter(mail => mail.id !== mailId))
                )
            } else {
                mail.removedAt = Date.now()
                mailService.save(mail).then(
                    updatedMail => {
                        setMails(prevMails => prevMails.map(mail => mail.id === updatedMail.id ? updatedMail : mail))
                    }
                )
            }
        })
    }


    function onSentMail(mail) {
        mailService.save(mail).then(savedMail => {
            setMails(prevMails => prevMails.map(prevMail =>
                prevMail.id === savedMail.id ? savedMail : prevMail
            ))
        })
    }


    function toggleOpenMenu() {
        setIsMenuOpen(isMenuOpen => !isMenuOpen)
    }

    function toggleSortMailsByDate() {
        setIsSortByDate(isSortByDate => !isSortByDate)
        if (!isSortByDate) return loadMails()
        console.log('sort by date');
        onSortByDate(mails)


    }



    function toggleSortMailsBySubject() {
        setIsSortBySubject(isSortBySubject => !isSortBySubject)
        if (!isSortBySubject) return loadMails()
        console.log('sort by subject');
        onSortBySubject(mails)
    }

    function toggleSortMailsByRead() {
        setIsSortByRead(isSortByRead=>!isSortByRead)
        console.log(isSortByRead);
        if(!isSortByRead) return loadMails()
            onSortByRead(mails)
    }

    function onSortBySubject(mails) {
        if (!mails || mails.length === 0) {
            console.log("No mails to sort")
            return
        }
        const sortMailsByTitle = (mails) => {
            return mails.sort((a, b) => {
                const subjectA = a.subject.toLowerCase()
                const subjectB = b.subject.toLowerCase()
                return subjectA.localeCompare(subjectB)
            })

        }
        const sortedMails = sortMailsByTitle([...mails])
        setMails(sortedMails)
    }




    function onSortByDate(mails) {
        if (!mails || mails.length === 0) {
            console.log("No mails to sort")
            return
        }
        const sortMailsByDate = (mails) => {
            return mails.sort((a, b) => {
                const dateA = new Date(a.sentAt)
                const dateB = new Date(b.sentAt)
                return dateB - dateA
            })
        }
        const sortedMails = sortMailsByDate([...mails])
        setMails(sortedMails)
    }
    
    function onSortByRead(mails) {
        if (!mails || mails.length === 0) {
            console.log("No mails to sort")
            return
        }
        const sortedMails = mails.sort((a, b) => {
            if (a.isRead === b.isRead) return 0
            return a.isRead ? 1 : -1
        })
        
        setMails(sortedMails)
}
    function onStarred(mail) {
        mailService.save(mail).then(savedMail => {
            setMails(prevMails => prevMails.map(existingMail =>
                existingMail.id === savedMail.id ? savedMail : existingMail
            ))
        })
    }
    function onDraftMail(mailId) {
        mailService.getById(mailId).then(mail => {
            const { to, subject, body } = mail
            const newMail = mailService.createMail(subject, body, to)
            setSelectedMail(newMail)
            setSentMail(true)
        }
        )
    }

    function onReadMail(mailId) {
        mailService.getById(mailId).then((oldMail) => {
            const updatedMail = { ...oldMail, isRead: true };
            mailService.save(updatedMail).then((savedMail) => {
                setMails((prevMails) => {
                    return prevMails.map((mail) =>
                        mail.id === savedMail.id ? savedMail : mail
                    );
                });
            });
        });
    }


    if (!mails) return "Loading...."
    return (
        <section className="mail-container grid">
            <header className="header">
                <Header mailFilter={mailFilter} onSetMailFilter={onSetMailFilter} toggleOpenMenu={toggleOpenMenu} />
            </header>
            <nav className="sidebar">
                <NavBar sentMail={setSentMail} setMailFilter={setMailFilter} setSelectedMail={setSelectedMail} isMenuOpen={isMenuOpen} />
            </nav>
            <main className={isMenuOpen ? "main menuOpen grid" : "main grid"}>
                {
                    !selectedMail && <SortMails mails={mails} toggleSortMailsBySubject={toggleSortMailsBySubject} toggleSortMailsByDate={toggleSortMailsByDate}
                        isSortByDate={isSortByDate} isSortBySubject={isSortBySubject}
                        toggleSortMailsByRead={toggleSortMailsByRead} />
                }

                {!selectedMail && <MailList mails={mails} setSelectedMail={setSelectedMail} onMoveToTrash={onMoveToTrash}
                    onStarred={onStarred} mailFilter={mailFilter} onDraftMail={onDraftMail} />}

                {selectedMail && <MailDetails mailId={selectedMail} setMailFilter={setMailFilter} setSelectedMail={setSelectedMail}
                    setSentMail={setSentMail} onMoveToTrash={onMoveToTrash} onReadMail={onReadMail} />}
                {sentMail && <SentMail closeModel={setSentMail} onSentMail={onSentMail} selectedMail={selectedMail} setSentMail={setSentMail} />}
                {/* <button className="btn-for-phone none" onClick={() => setSentMail(true)}>send</button> */}

            </main>

        </section>

    )
}

