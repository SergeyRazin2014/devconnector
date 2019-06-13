import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'



const Alert = (props) => {

    let { alerts } = props;

    //если в глобальном стейте есть алерты, тогда показать эти алерты
    if (alerts !== null && alerts.length > 0) {
        let res = alerts.map((alert) => {
            return (
                <div key={alert.id} className={`alert alert-${alert.alertType}`}>
                    {alert.msg}
                </div>
            )
        })

        return res;
    }

    return null;


}

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
    return {
        alerts: state.alert
    }
}

export default connect(mapStateToProps)(Alert);