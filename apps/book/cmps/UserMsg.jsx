import { eventBusService } from '../services/event-bus.service.js'
const { useEffect, useState, useRef } = React

export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutId = useRef()

    useEffect(() => {
        const unsubscribe = eventBusService.on('show-user-msg', (msg) => {
            if (timeoutId) clearTimeout(timeoutId.current)
            setMsg(msg)
            timeoutId.current = setTimeout(onCloseMsg, 3000);
        })

        return () => {
            unsubscribe()
        }

    }, [])

    function onCloseMsg() {
        clearTimeout(timeoutId.current)
        setMsg(null)
    }

    if (!msg) return null
    return (
        <div className={'user-msg ' + msg.type}>
            <p>{msg.txt}</p>
        </div>
    )
}