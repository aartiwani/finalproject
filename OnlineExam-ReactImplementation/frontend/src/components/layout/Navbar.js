import React from 'react'
import {Link} from "react-router-dom";
import AuthOptions from '../auth/AuthOptions';
import "semantic-ui-css/semantic.min.css";
import '../../style.css';
export default function Navbar() {
    return (
        <div className="ui header" id="header">
            <Link to="/"> <h1>CDAC</h1></Link>
            <AuthOptions/>
        </div>
    )
}
