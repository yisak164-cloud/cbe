
function Button(props) {
    const handleClick = (e) => {
        console.log("button clicked ", e)
    }
    return (
        <button
            onClick={(e) => handleClick(e)}
            style={{ color: "white", fontSize: "1.3rem", backgroundColor: "purple" }}>
            {props.label}
        </button>
    )
}

export default Button
