import React from 'react';
import { Link } from 'react-router-dom';

import './navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1>
                <Link to='/'> DevConnector</Link>
            </h1>
            <div className="stub"></div>
            <ul className="rightNavbar">
                <li><a href="#">Developers</a></li>
                <li> <Link to="/register">Register</Link></li>
                <li> <Link to="/login">Login</Link></li>
            </ul>
        </nav>
    )
}

export default Navbar;