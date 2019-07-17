import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import actions from "./actions";

import firebase from "firebase/app";
import "firebase/firestore";

import "./style.scss";

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0,
      verifier: "",
      mobile: "",
      otp: "",
      confirmationResult: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
  }

  handleChange(e) {
    let elem = e.target.name;

    this.setState({
      [elem]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let _ = this;
    const { mobile, verifier } = this.state;

    var phoneNumber = `+91 ${mobile}`;
    var appVerifier = verifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        _.setState({
          view: 1,
          confirmationResult: confirmationResult
        });
      }).catch(function (error) {
        console.log(error);
      });
  }

  handleVerification(e) {
    e.preventDefault();
    const _ = this;
    const { mobile, otp, confirmationResult } = this.state;
    let phone = `+91 ${mobile}`;
    var code = otp;

    confirmationResult.confirm(code).then(function (result) {
      const profile = localStorage.getItem('profile');
      const data = JSON.parse(profile);
      const { uid } = _.props.user || data.uid;
      var db = firebase.firestore();
      const date = new Date().getTime();
      db.collection("users")
        .doc(uid)
        .update({
          d_updated: date,
          mobile: phone,
          v_mobile: 1
        });
    }).catch(function (error) {
      console.log(error);
    });
  }

  renderMobile = () => {
    return (
      <div className="w-full max-w-xs mx-auto pt-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
          <h1 className="mb-4 text-lg font-bold">
            Please enter your contact number
            </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="address">
              Mobile <span className="font-hairline text-xs"></span>
            </label>
            <input name="mobile" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="Mobile" placeholder="ex: 9210 XXXX60" onChange={this.handleChange} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Proceed
              </button>
          </div>
        </form>
        <hr />
        <p className="text-gray-500 text-xs italic font-hairline">By proceeding, I'm agreed 'Terms & Conditions' and 'Privary Policy'</p>
      </div>
    )
  }

  renderVerification = () => {
    return (
      <div className="w-full max-w-xs mx-auto pt-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleVerification}>
          <h1 className="mb-4 text-lg font-bold">
            Please enter verification code
            </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="address">
              OTP <span className="font-hairline text-xs">one-time password</span>
            </label>
            <input name="otp" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="Mobile" placeholder="ex: 123456" onChange={this.handleChange} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Proceed
              </button>
          </div>
        </form>
        <hr />
        <p className="text-gray-500 text-xs italic font-hairline">By proceeding, I'm agreed 'Terms & Conditions' and 'Privary Policy'</p>
      </div>
    )
  }

  componentDidMount() {
    const recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptcha, {
      'size': 'invisible',
      'callback': function (response) {
        onSignInSubmit();
      }
    });
    this.setState({
      verifier: recaptchaVerifier
    });
  }

  render() {
    const { view } = this.state;
    return (
      <Fragment>
        {view === 0 ? this.renderMobile() : this.renderVerification()}

        <div ref={(ref) => this.recaptcha = ref}></div>

        <style jsx>{``}</style>
      </Fragment >
    )
  }
}

export default connect(state => state, actions)(Location);
