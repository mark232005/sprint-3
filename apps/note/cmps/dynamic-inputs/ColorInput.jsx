export function ColorInput({ value, handleColorChange }) {
    const colors = ['#F44236', '#9C27B0', '#3F51B5', '#2196F3', '#4caf50']

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
