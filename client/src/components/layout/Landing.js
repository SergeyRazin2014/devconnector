import React from 'react';
import { Link } from 'react-router-dom';

import './landing.css';


const Landing = () => {
    return (
        <div className="landing">
            <Link className="button" to="/register">Register</Link>
            <Link className="button" to="/login">Login</Link>
        </div>
    )
}

export default Landing;