import React, { Fragment } from 'react';
import spin from './spin.gif';

const Spinner = () => {
    return (<Fragment>
        <img src={spin}
            style={{ width: '100px', margin: 'auto', display: 'block' }}
            alt='Loading...'
        />
    </Fragment>)
}

export default Spinner;