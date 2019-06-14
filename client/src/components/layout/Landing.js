import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

import './landing.css';


const Landing = ({ isAuthenticated }) => {

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <div className="landing">
            <Link className="button" to="/register">Register</Link>
            <Link className="button" to="/login">Login</Link>
        </div>
    )
}

Landing.propTypes = {
    isAuthenticated: PropTypes.bool
}

const mapStateToPorps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToPorps)(Landing);