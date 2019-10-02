import React, { Component, Fragment } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions";
import notifictionActions from "components/Notification/actions"

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
        <div className="container account">

          <div className="user">
            <figure>
              <AccountCircleIcon />
            </figure>
            <h2 className="title">Welcome, Pankaj Jasoria</h2>
            <p>
              Manage your info, privacy and security to make Neta work better for you
            </p>
          </div>


          <h1 className="title">
            <span>Your Constituency,</span> Hari Nagar, New Delhi
          </h1>

          <div className="panel">
            <div className="row">
              <div className="col-3">
                <figure className="photo">
                  <AccountCircleIcon />
                </figure>
              </div>
              <div className="col-9">
                <div className="heading">
                  <label htmlFor="ministerName">MCD Councillor</label>
                  <h3 className="title" name="ministerName">Kiran Chopra</h3>
                </div>
              </div>
            </div>
          </div>

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
