import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import './createProfile.css';
import { createProfile, getCurrentProfile } from '../../actions/profile';


function EditProfile({ profileReducer, createProfile, getCurrentProfile, history }) {

    const profile = profileReducer.profile;
    const loading = profileReducer.loading;

    const [formData, setFormData] = useState({
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: ''
    });

    const [displaySocialInputs, toggleSocialInputs] = useState(false);

    useEffect(() => {
        getCurrentProfile();
        setFormData({
            company       : loading || !profile.company ? ''        : profile.company,
            website       : loading || !profile.website ? ''        : profile.website,
            location      : loading || !profile.location ? ''       : profile.location,
            status        : loading || !profile.status ? ''         : profile.status,
            skills        : loading || !profile.skills ? ''         : profile.skills.join(','),
            githubusername: loading || !profile.githubusername ? "" : profile.githubusername,
            bio           : loading || !profile.bio ? ""            : profile.bio,
            twitter       : loading || !profile.twitter ? ""        : profile.twitter,
            facebook      : loading || !profile.facebook ? ""       : profile.facebook,
            linkedin      : loading || !profile.linkedin ? ""       : profile.linkedin,
            youtube       : loading || !profile.youtube ? ""        : profile.youtube,
            instagram     : loading || !profile.instagram ? ""      : profile.instagram
        });

    },[loading, getCurrentProfile]);

    const {
        company,
        website,
        location,
        status,
        skills,
        githubusername,
        bio,
        twitter,
        facebook,
        linkedin,
        youtube,
        instagram
    } = formData;


    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        createProfile(formData, history, true);
    }

    return (

        <form className='profileFormContainer' onSubmit={onSubmit}>
            <input className='inputForm' placeholder='company' type="text" name="company" value={company} onChange={e => onChange(e)} />
            <input className='inputForm' placeholder='website' type="text" name="website" value={website} onChange={e => onChange(e)} />
            <input className='inputForm' placeholder='location' type="text" name="location" value={location} onChange={e => onChange(e)} />

            <select className='inputForm' name="status" value={status} onChange={(e) => onChange(e)} >
                <option value="0">Select Professional Status</option>
                <option value="Junior">Junior</option>
                <option value="Middle">Middle</option>
                <option value="Senior">Senior</option>
            </select>

            <input className='inputForm' placeholder='skills' type="text" name="skills" value={skills} onChange={e => onChange(e)} />
            <input className='inputForm' placeholder='githubusername' type="text" name="githubusername" value={githubusername} onChange={e => onChange(e)} />
            <input className='inputForm' placeholder='bio' type="text" name="bio" value={bio} onChange={e => onChange(e)} />

            <a href="#!" onClick={(e) => toggleSocialInputs(!displaySocialInputs)} >Add Social Network Links</a>


            {
                displaySocialInputs &&
                <>
                    <input className='inputForm' placeholder='twitter' type="text" name="twitter" value={twitter} onChange={e => onChange(e)} />
                    <input className='inputForm' placeholder='facebook' type="text" name="facebook" value={facebook} onChange={e => onChange(e)} />
                    <input className='inputForm' placeholder='linkedin' type="text" name="linkedin" value={linkedin} onChange={e => onChange(e)} />
                    <input className='inputForm' placeholder='youtube' type="text" name="youtube" value={youtube} onChange={e => onChange(e)} />
                    <input className='inputForm' placeholder='instagram' type="text" name="instagram" value={instagram} onChange={e => onChange(e)} />
                </>


            }

            <br />
            <input type="submit" value="Submit" />

        </form>

    )
}

EditProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    profileReducer: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
    return {
        profileReducer: state.profile
    }
};

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(EditProfile));

