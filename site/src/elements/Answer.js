
function Answer(props) {
    function onClick() {
        props.onClick(props.data.goesTo)
    }

    var color = "blue"
    if ('color' in props){
        color = props.color
    }
    const className = `bg-${color}-200 hover:bg-${color}-400 text-black font-bold py-2 px-4 rounded`

    return (
        <button
            className={className} 
            onClick={onClick}
        >
            {props.data.text}
        </button>
    )
}

export default Answer;