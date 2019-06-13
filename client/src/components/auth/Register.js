import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register, login } from '../../actions/auth';

import './register.css';

const Register = (props) => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        if (password !== password2) {
            props.setAlert('Passwords do not match', 'danger');
        } else {
            props.register({ name, email, password });
        }
    }


    if (props.isAuthenticated) {
        return <Redirect to="dashboard" />
    }

    return (
        <div className="register-page">

            <form method="GET" className="register-form" onSubmit={e => onSubmit(e)}>
                <h1>Sign Up</h1>
                <h3>Create Your Account</h3>
                <input className="register-form_input" type="text" name="name" placeholder="Name" value={name} onChange={e => onChange(e)} />
                <input className="register-form_input" type="email" name="email" placeholder="Email Address" value={email} onChange={e => onChange(e)} />
                <input className="register-form_input" type="password" name="password" placeholder="Password" value={password} onChange={e => onChange(e)} />
                <input className="register-form_input" type="password" name="password2" placeholder="Confirm Password" value={password2} onChange={e => onChange(e)} />
                <input className="register-form_input" type="submit" value="Register" />
            </form>
        </div>
    )
}


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { setAlert, register })(Register);  