import React, { Fragment, useState } from 'react';

import './register.css';

const Login = () => {

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
        console.log('success');
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

export default Login;