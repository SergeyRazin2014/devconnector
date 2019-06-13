import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
import { Redirect } from 'react-router-dom';

import './register.css';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    }

    //Редирект если логин успешный
    if (isAuthenticated) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="register-page">

            <form method="GET" className="register-form" onSubmit={e => onSubmit(e)}>
                <h1>Log In</h1>
                <h3>Sign Into Your Account</h3>
                <input className="register-form_input" type="email" name="email" placeholder="Email Address" required value={email} onChange={e => onChange(e)} />
                <input className="register-form_input" type="password" name="password" placeholder="Password" minLength='6' value={password} onChange={e => onChange(e)} />
                <input className="register-form_input" type="submit" value="Log In" />
            </form>
        </div>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);