import React, { Component, Fragment } from 'react'
import adminAuth from 'utils/adminAuth'

import NavAdmin from 'components/Nav/Admin'
import { MDBContainer, MDBBtn } from "mdbreact";


class Dashboard extends Component {
    render() {
        return (
            <Fragment>
                <MDBContainer>
                    <MDBBtn color="primary">Material Design React Component</MDBBtn>
                </MDBContainer>
            </Fragment>
        )
    }
}
export default adminAuth(Dashboard)