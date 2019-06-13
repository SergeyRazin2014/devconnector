import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';

const DashBoard = ({ getCurrentProfile, auth, profile }) => {

    //ВЫПОЛНЯЕТЯ 1 РАЗ ПРИ ЗАГРУЗКЕ КОМПОНЕНТА
    useEffect(() => {
        getCurrentProfile();
    }, []);

    return (
        <div>hello dashboard</div>
    )
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