import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import actions from "./actions";

import Snackbar from "./snackbars"

import "./style.scss";

class Notification extends Component {
    constructor(props) {
        super(props)
        this.state = {
            classes: "error"
        }
    }

    render() {
        const { classes } = this.state;
        const { open, message, type } = this.props.notification;

        return (
            <Fragment>
                <Snackbar type={type == undefined ? classes : type} open={open} msg={message} />
            </Fragment>
        );
    }

}

export default connect(state => state, actions)(Notification);