import React from 'react';
import { Link } from 'react-router-dom';
import './dashBoard.css';

const DashboardActions = (props) => {
    return (
        <div className='daschBoard_container'>
            <Link className='btn' to='/edit-profile'>Edit Profile</Link>
            <Link className='btn' to='/add-experience'>Add Experience</Link>
            <Link className='btn' to='/add-education'>Add Education</Link>
        </div>
    );
}

export default DashboardActions;