import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import actions from "./actions";

import SimpleSnackbar from "./snackbars"

import "./style.scss";

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            design: "traditional",
            type: "error"
        }
    }

    render() {
        const { open, message } = this.props.notification;

        return (
            <Fragment>
                <SimpleSnackbar open={open} msg={message} />
            </Fragment>
        );
    }

}

export default connect(state => state, actions)(Notification);