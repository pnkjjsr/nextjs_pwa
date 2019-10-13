import React, { Component, Fragment } from 'react'
import adminAuth from 'utils/adminAuth'

class Dashboard extends Component {
    render() {
        return (
            <Fragment>
                Admin Access
            </Fragment>
        )
    }
}
export default adminAuth(Dashboard)