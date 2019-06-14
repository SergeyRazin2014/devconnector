import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';

const DashBoard = ({ getCurrentProfile, auth: { user }, profile: { profile, loading } }) => {

    debugger;

    //ВЫПОЛНЯЕТЯ 1 РАЗ ПРИ ЗАГРУЗКЕ КОМПОНЕНТА
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return loading && profile === null ?
        <Spinner /> :
        <Fragment>
            Welcome {user && user.name}
            {profile !== null ? <>profile test</> : <>no profile <br /> <Link to='/create-profile'>Add profile</Link></>}
        </Fragment>

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