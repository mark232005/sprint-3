export function ColorInput({ value, onChange }) {
    const colors = ['#F44236', '#9C27B0', '#3F51B5', '#2196F3', '#4caf50'];

    return (
        <section className="color-input">
            <div className="items-container">
                {colors.map((color, idx) => (
                    <button
                        key={idx}
                        className={`color-btn ${value === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onChange(color)}
                    ></button>
                ))}
            </div>
        </section>
    )
}
