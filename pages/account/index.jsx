import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import actions from "./actions";

import firebase from "firebase/app";

import Location from './location'

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      v_location: 0
    }
    this.dbListener = this.dbListener.bind(this);
  }

  dbListener = () => {
    const { auth } = this.props;
    if (auth.uid) {
      var db = firebase.firestore();
      let usersRef = db.collection('users').doc(auth.uid);
      let getDoc = usersRef.get()
        .then(doc => {
          if (!doc.exists) {
            console.log('No such document!');
          } else {
            let vLocation = doc.data().v_location;
            this.setState({
              v_location: vLocation
            });
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }

  renderDashboard = () => {
    const { auth } = this.props
    return (
      <div className="p-4 shadow rounded bg-white">
        <h1 className="text-teal-500 text-2xl leading-normal">
          Account
        </h1>
        <hr />
        <img src={auth.photo} alt="" />
        <br />
        {auth.name} [{auth.uid}] [{JSON.stringify(auth.eVerified)}]
        <br />
        {auth.email}
        <br />
        {auth.mobile}
      </div>
    )
  }

  renderAccount = () => {
    const { v_location } = this.state;
    if (v_location === 0) {
      return (<Location />)
    }
    else if (v_location === 1) {
      return this.renderDashboard()
    }
  }

  render() {
    // this.dbListener();
    return (
      <Fragment>
        {this.renderAccount()}
        <style jsx>{``}</style>
      </Fragment>
    )
  }
}

export default connect(state => state)(Account);
