
export function LongTxt({ txt, length = 100 }) {

    const textToShow = txt.substring(0, length)
    return (
        <section className="long-txt">
            <p>
                {textToShow}
            </p>
        </section>
    );
}