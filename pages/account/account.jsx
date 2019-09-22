import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions";
import notifictionActions from "components/Notification/actions"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { service } from "utils"
import authSession from "components/utils/authSession"
import authentication from "components/utils/authentication"

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const auth = new authentication;
  }

  render() {
    return (
      <Fragment>
        <Container className="account" fixed>
          <Grid container spacing={3} >
            <Grid item>
              <h1 >
                Account Page
              </h1>
            </Grid>
          </Grid>
        </Container>
        <style jsx>{``}</style>
      </Fragment >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch),
  notificationAction: bindActionCreators(notifictionActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Account);
