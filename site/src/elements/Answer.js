
function Answer(props) {
    /*
    function clicked() {
        props.onClick(props.text)
    }

    return (
        <button 
            className="bg-blue-200 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded" 
            onClick={clicked}>
            {props.text}
        </button>
    )
    */
    function onClick() {
        props.onClick(props.data.goesTo)
    }

   return (
    <button
        className="bg-blue-200 hover:bg-blue-400 text-black font-bold py-2 px-4 rounded" 
        onClick={onClick}
    >
        {props.data.text}
    </button>
   )
}

export default Answer;