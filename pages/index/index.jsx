import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';

import notification from "../../components/Notification/actions"
import user from "../../components/User/actions"

import authentication from "../../components/utils/authentication"
import authSession from "../../components/utils/authSession"

import { service } from '../../utils';

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0,
      address: "",
      country: "",
      d_created: "",
      d_updateed: "",
      email: "",
      password: "",
      uid: "",
      mobile: "",
      name: "",
      photo: "",
      pincode: "",
      state: "",
      v_email: "false",
      v_location: 0,
      v_mobile: 0
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
    const { email, password } = this.state;
    const { notification, user } = this.props;
    const auth = new authentication;
    const session = new authSession;
    const data = {
      email: 'pnkj_jsrr@yahoo.co.in',
      password: '123123',
      confirmPassword: '123123'
    }

    service.post('/signup', data).then((res) => {
      return console.log(res);
    }).catch((error) => {
      return console.log(error);
    });


    auth.createUserWithEmailAndPassword(email, password).then(function (e) {
      console.log(e);
      if (e.operationType === "signIn") {
        let profile = session.getProfile()
        user.updateUser(profile);
      } else { notification.showNotification(e) }

    });
  }

  handleVerification(e) {
    e.preventDefault();
    const { showNotification } = this.props;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification().then(function () {
            console.log("email sent");
          }).catch(function (error) {
            showNotification(error);
          });
        }
      } else {
        console.log("Not Logged In");
      }
    });
  }

  renderRegistration = () => {
    return (
      <div className="w-full max-w-xs mx-auto pt-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
          <h1 className="mb-4 text-lg font-bold">
            User Registration
            </h1>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="username">
              Email <span className="font-hairline text-xs"></span>
            </label>
            <input name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="ex: abc@cba.com" onChange={this.handleChange} />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
              Password <span className="font-hairline text-xs"></span>
            </label>
            <input name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******" autoComplete="true" onChange={this.handleChange} />
          </div>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Create My Account
              </button>
          </div>
        </form>
        <hr />
        <p className="text-gray-500 text-xs italic font-hairline">By proceeding, I'm agreed 'Terms & Conditions' and 'Privary Policy'</p>
      </div>
    )
  }

  renderVerification = () => {
    const { email } = this.state;
    const { showNotification } = this.props;

    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        if (!user.emailVerified) {
          user.sendEmailVerification().then(function () {
            console.log("email sent");

          }).catch(function (error) {
            showNotification(error);
          });
        }
      } else {
        console.log("Not Logged In");
      }
    });

    return (
      <div className="w-full max-w-xs mx-auto pt-4">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleVerification}>
          <h1 className="mb-4 text-lg font-bold">
            Verification link sent on your email id.
          </h1>

          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Send me Verification link again
            </button>
          </div>
        </form>
        <hr />
        <p className="text-gray-500 text-xs italic font-hairline">By clicking on button, I'm agreed to send verification link on my email id.</p>
      </div>
    )
  }

  componentDidMount() { }

  render() {
    const { view } = this.state

    if (view === 0) {
      return this.renderRegistration()
    }
    else if (view === 1) {
      return this.renderVerification()
    }


    <style jsx>{``}</style>


  }
};

const mapDispatchToProps = dispatch => ({
  user: bindActionCreators(user, dispatch),
  notification: bindActionCreators(notification, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Home);
