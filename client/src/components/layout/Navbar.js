import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import './navbar.css';

const Navbar = (props) => {

    //ССЫЛКИ В НАВБАРЕ ДЛЯ ЗАРЕГЕНОГО ЮЗЕРА
    const authLinks = (
        <ul className="rightNavbar">
            <li><a onClick={props.logout} href="#">Logout</a></li>
        </ul>
    );

    //ССЫЛКИ В НАВБАРЕ ДЛЯ ГОСТЯ
    const guestLinks = (
        <ul className="rightNavbar">
            <li><a href="#">Developers</a></li>
            <li> <Link to="/register">Register</Link></li>
            <li> <Link to="/login">Login</Link></li>
        </ul>
    );

    let linksToShow = null;

    if (!props.auth.loading) {
        if (props.auth.isAuthenticated) {
            linksToShow = authLinks;
        } else {
            linksToShow = guestLinks;
        }
    }

    return (
        <nav className="navbar">
            <h1>
                <Link to='/'> DevConnector</Link>
            </h1>
            <div className="stub"></div>

            {linksToShow}
        </nav>
    )
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, { logout })(Navbar);