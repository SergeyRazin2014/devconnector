import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

//ПО СУТИ ЭТО КАК БЫ ХАЙОРДЕР КОМПОНЕНТ

const PrivateRoute = (props) => {  //ТУТ ПРОПСЫ РАСКЛАДЫВАЕМ НА {Compoennt, isAuthenticated, loading} 

    const { component: Component, auth } = props;

    if (!auth.isAuthenticated && !auth.loading) {
        return <Redirect to='/login' />
    } else {
        return <Component {...props} />
    }


}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps)(PrivateRoute)

