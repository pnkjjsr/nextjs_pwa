import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions";
import notifictionActions from "components/Notification/actions"

import {
  service
} from "utils"
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
        <div className="p-4 shadow rounded bg-white">
          <h1 className="text-teal-500 text-2xl leading-normal">
            Account
          </h1>
          <hr />
          {/* <img src={user.photo} alt="" /> */}
          <br />
          {/* {user.name} [{user.uid}] [{JSON.stringify(user.eVerified)}] */}
          <br />
          {/* {user.email} */}
          <br />
          {/* {user.mobile} */}
        </div>

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
