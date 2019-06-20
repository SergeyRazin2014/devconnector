import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import moment from 'moment';
import { connect } from 'react-redux';
import { deleteEducation } from '../../actions/profile';

const Education = ({ educations, deleteEducation }) => {

    const educationRows = educations.map((educ) => {

        const { _id, school, degree, fieldofstudy, from, to, description } = educ;

        return (
            <tr key={educ._id}>
                <td>{school}</td>
                <td>{degree}</td>
                <td>{fieldofstudy}</td>
                <td>
                    <Moment format='DD/MM/YYYY'>
                        {moment.utc(from)}</Moment> - {'  '}
                    {to === null ? (
                        ' Now'
                    ) : (
                            <Moment format='DD/MM/YYYY'>{moment.utc(to)}</Moment>
                        )
                    }

                </td>
                <td>
                    <button className='btn' onClick={() => deleteEducation(_id)} >
                        <i class="fa fa-trash-o fa-fw"></i>
                        Delete
                    </button>
                </td>
            </tr>
        )
    });

    return (
        <div className='daschBoard_container'>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>School</th>
                        <th>Degree</th>
                        <th>Fieldofstudy</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {educationRows}
                </tbody>
            </table>
        </div>
    )
}

Education.propTypes = {
    educations: PropTypes.array.isRequired,
    deleteEducation: PropTypes.func.isRequired,
}

export default connect(null, { deleteEducation })(Education);

