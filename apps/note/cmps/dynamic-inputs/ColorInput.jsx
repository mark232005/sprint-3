export function ColorInput({ value, handleColorChange }) {
    const colors = ['#B3C8CF', '#B7B1F2', '#D0E8C5', '#FFC6C6', '#FFF7F3']

    function onSetColor(color) {
        handleColorChange(color)
    }


    return (
        <div className="color-input">
            {colors.map(color => (
                <div
                    key={color}
                    className={`color-option ${value === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorChange(color)}
                />
            ))}
        </div>
    )
}
