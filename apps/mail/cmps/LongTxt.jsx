
export function LongTxt({ txt, length = 50 }) {

    const textToShow = txt.substring(0, length)
    return (
        <section className="long-txt">
            <p>
                {textToShow}
            </p>
        </section>
    );
}