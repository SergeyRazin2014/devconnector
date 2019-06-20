import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import Spinner from '../layout/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from '../profiles/ProfileItem';

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {


    useEffect(() => {  //ЗАПУСКАЕМ ТОЛЬКО 1 РАЗ
        getProfiles();
    }, []);

    return (
        <>
            {loading ?
                <Spinner /> :
                <>
                    {profiles.length > 0 ?
                        (
                            profiles.map(profile => (
                                <ProfileItem key={profile._id} profile={profile} />
                            ))
                        ) :
                        <h4>No profiles found...</h4>}
                </>
            }
        </>
    )
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);
