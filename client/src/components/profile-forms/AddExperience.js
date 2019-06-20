import React, { useState } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

import './addExperience.css';

const AddExperience = ({ addExperience, history }) => {

    const [formData, setFormData] = useState({
        company: '',
        title: '',
        location: '',
        from: '',
        to: '',
        current: false,
        description: ''
    });

    const [toDateDisabled, toggleDisabled] = useState(false);

    const {
        company,
        title,
        location,
        from,
        to,
        current,
        description,
    } = formData;

    const onChange = e => setFormData({
        ...formData, [e.target.name]: e.target.value
    });

    return (
        <form className='addExperienceContainer' onSubmit={e => {
            e.preventDefault();
            addExperience(formData, history);
        }}>

            <input placeholder='title' className='addExperienceItem' type="text" name="title" value={title} onChange={e => onChange(e)} />
            <input placeholder='company' className='addExperienceItem' type="text" name="company" value={company} onChange={e => onChange(e)} />
            <input placeholder='location' className='addExperienceItem' type="text" name="location" value={location} onChange={e => onChange(e)} />
            
            <div className='date-input-container'>
                <p>From</p>
                <input className='addExperienceItem' type="date" name="from" value={from} onChange={e => onChange(e)} />
            </div>

            <div className="checkbox_current_container" >
                <input
                    className='checkbox_current'
                    type="checkbox"
                    name="current"
                    id='addExperienceItem_Id'
                    onChange={() => {
                        setFormData({ ...formData, current: !current });
                        toggleDisabled(!toDateDisabled);
                    }} />

                <label htmlFor="addExperienceItem_Id">Current</label>
            </div>
            <div className='date-input-container'>
                <p>To</p>
                <input
                    className='addExperienceItem'
                    type="date"
                    name="to"
                    value={to}
                    onChange={e => onChange(e)}
                    disabled={toDateDisabled ? 'disabled' : ''}
                />
            </div>

            <textarea
                className='addExperienceItem'
                name="description"
                cols="30"
                rows="10"
                value={description} onChange={e => onChange(e)}
            >

            </textarea>

            <input className='btn' type="submit" value="Submit" />
        </form>
    )
}

AddExperience.propTypes = {
    addExperience: PropTypes.func.isRequired,
}

export default connect(null, { addExperience })(withRouter(AddExperience))
