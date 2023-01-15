export default function Button(props) {
    var className = `bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2`
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