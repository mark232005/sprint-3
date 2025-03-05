import { showSuccessMsg } from '../services/event-bus.service.js'

export function Home() {
    return <section className="container home">
        <div className="box-container flex">
            <h2>
                <span className="a">A</span>
                <span className="l">l</span>
                <span className="u">u</span>
                <span className="f">f</span>
                <span className="a">A</span>
                <span className="p">p</span>
                <span className="P">p</span>
                <span className="s">s</span></h2>
            <p>Many features in one app</p>
        </div>
    </section>
}