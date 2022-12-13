import React from "react";
import {Link} from "react-router-dom";

function HeaderLink(props) {
    return (
        <div class='text-white mx-2 font-bold'>
            <Link to={props.url}>{props.text}</Link>
        </div>
    )
}

export default HeaderLink;