import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

import './dashBoard.css';

const DashBoard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    //ВЫПОЛНЯЕТЯ 1 РАЗ ПРИ ЗАГРУЗКЕ КОМПОНЕНТА
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ?
        <Spinner /> :
        <>
            <div className='daschBoard_container'>
                Welcome {user && user.name}
            </div>

            {profile !== null
                ? (
                    <>
                        <DashboardActions />
                        <Experience experience={profile.experience} />
                        <Education educations={profile.education} />
                    </>
                )
                : <>no profile <br /> <Link to='/create-profile'>Add profile</Link></>}
        </>

}

DashBoard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => (
    {
        auth: state.auth,
        profile: state.profile

    }
)

export default connect(mapStateToProps, { getCurrentProfile })(DashBoard); 