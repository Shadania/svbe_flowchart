import {getColorBG} from '../services/colors.js'

export default function Button(props) {
    var color = "def"
    if ('color' in props){
        color = props.color
    }
    var className = `${getColorBG(color)} text-white font-bold py-2 px-4 rounded my-2`
    if (!props.visible)
        className += " invisible"
    return (
        <button
            className={className}
            onClick={props.onClick}
        >
            {props.text}
        </button>
    )
}