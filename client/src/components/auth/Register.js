import React, { Fragment, useState } from 'react';

import './register.css';

const Register = () => {

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
            alert("password not equals");
        }else{
            alert('password equals');
        }
    }

    return (
        <div className="register-page">

            <form method="GET" className="register-form" onSubmit={e => onSubmit(e)}>
                <h1>Sign Up</h1>
                <h3>Create Your Account</h3>
                <input className="register-form_input" type="text" name="name" placeholder="Name" required value={name} onChange={e => onChange(e)} />
                <input className="register-form_input" type="email" name="email" placeholder="Email Address" required value={email} onChange={e => onChange(e)} />
                <input className="register-form_input" type="password" name="password" placeholder="Password" minLength='6' value={password} onChange={e => onChange(e)} />
                <input className="register-form_input" type="password" name="password2" placeholder="Confirm Password" minLength='6' value={password2} onChange={e => onChange(e)} />
                <input className="register-form_input" type="submit" value="Register" />
            </form>
        </div>
    )
}

export default Register;