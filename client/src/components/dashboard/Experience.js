import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Moment from 'react-moment'
import moment from 'moment'
import { deleteExperience } from '../../actions/profile'

import './dashBoard.css';

function Experience({ experience, deleteExperience }) {

    const experiences = experience.map(exp => {

        return (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format='DD/MM/YYYY'>
                        {moment.utc(exp.from)}</Moment> - {'  '}
                    {exp.to === null ? (
                        ' Now'
                    ) : (
                            <Moment format='DD/MM/YYYY'>{moment.utc(exp.to)}</Moment>
                        )
                    }

                </td>
                <td>
                    <button className='btn' onClick={() => deleteExperience(exp._id)} >
                        <i class="fa fa-trash-o fa-fw"></i>
                        Delete
                    </button>
                </td>

            </tr>
        )
    })

    return (
        <div className='daschBoard_container'>
            <table className="table-bordered">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Title</th>
                        <th>Years</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {experiences}
                </tbody>
            </table>
        </div>
    )
}

Experience.propTypes = {
    experience:PropTypes.array.isRequired,
    deleteExperience: PropTypes.func.isRequired,
}

export default connect(null, { deleteExperience })(Experience);

