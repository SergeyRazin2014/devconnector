import React from 'react'
import PropTypes from 'prop-types'

const ProfileItem = ({ profile }) => {
    return (
        <div>
            profile id = {profile._id}
            <br/>
            {profile.user.name}
        </div>
    )
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
}

export default ProfileItem
