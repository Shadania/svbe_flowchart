import {getColorBG} from '../services/colors.js'

function Answer(props) {
    function onClick() {
        props.onClick(props.data.goesTo)
    }

    var color = "blue"
    if ('color' in props){
        color = props.color
    }
    const className = `${getColorBG(color)} text-white font-bold py-2 px-4 rounded`

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