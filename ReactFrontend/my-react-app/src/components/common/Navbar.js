import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {

    let SiteName = "First React"


    return (
    <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                <Link className="navbar-brand" to="#">{SiteName}</Link>
            </div>
            <ul className="nav navbar-nav">
                <li className="active"><Link to="#">Home</Link></li>
                <li className="dropdown"><Link className="dropdown-toggle" data-toggle="dropdown" to="#">Page 1 <span className="caret"></span></Link>
                    <ul className="dropdown-menu">
                        <li><Link to="#">Page 1-1</Link></li>
                        <li><Link to="#">Page 1-2</Link></li>
                        <li><Link to="#">Page 1-3</Link></li>
                    </ul>
                </li>
                <li><Link to="#">Page 2</Link></li>
                <li><Link to="#">Page 3</Link></li>
            </ul>
        </div>
    </nav>
    )

}