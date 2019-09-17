import React, { Component, Fragment } from "react";
import Link from 'next/link';
import Router from 'next/router'

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import user from "components/User/actions"
import registerActions from "./action"
import notification from "components/Notification/actions"

import { service } from 'utils';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import authSession from "components/utils/authSession"
import authentication from "components/utils/authentication"
import Button from "components/Button"
import Input from "components/Input"
import bannerImg from "static/images/signup/banner.jpg"

import "./style.scss";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0,
      email: "",
      mobile: "",
      password: ""
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
    const { email, mobile, password } = this.state;
    const { notification, user, homeActions } = this.props;

    const auth = new authentication;
    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res.code) {
          notification.showNotification(res)
        }
        else {
          const session = new authSession;
          let token = res.user.uid;
          session.setToken(token);
          user.updateUser({ token: token });

          const data = {
            uid: token,
            userType: "normal",
            email: email,
            mobile: mobile,
            password: password
          }
          service.post('/signup', data)
            .then((result) => {
              user.updateUser(result.data);
              session.setProfile(result.data);
              auth.sendEmailVerification()
              Router.push("/account")
            }).catch(async (error) => {
              let data = error.response.data;
              let msg = data[Object.keys(data)[0]]
              let obj = { message: msg }

              notification.showNotification(obj)
            });
        }
      })
      .catch(error => {
        notification.showNotification(error)
      })




  }

  handleVerification(e) {
    e.preventDefault();
    const auth = new authentication;
    auth.sendEmailVerification()
  }

  renderHome = () => {
    return (
      <div className="text-center">
        HomePage
      </div>
    )
  }

  renderRegistration = () => {
    return (
      <Fragment>
        <Container fixed>
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <figure>
                <img src={bannerImg} alt="Signup banner image" />
              </figure>
            </Grid>
            <Grid item sm={6}>
              <form autoComplete="on" onSubmit={this.handleSubmit}>
                <h1>
                  Create your account
                </h1>

                <Input
                  name="email"
                  type="email"
                  label="Email"
                  htmlFor="email"
                  onChange={this.handleChange}
                />

                <Input
                  name="mobile"
                  type="text"
                  label="Mobile"
                  htmlFor="mobile"
                  onChange={this.handleChange}
                />

                <Input
                  name="password"
                  type="password"
                  label="Password"
                  htmlFor="password"
                  autoComplete="off"
                  onChange={this.handleChange}
                />


                <div>
                  <Button text="Create My Account" />
                </div>
                <div>
                  Alrady registered, click here to <Link href="/login">
                    <a>login</a>
                  </Link>
                </div>
              </form>
              <hr />
              <p>
                By proceeding, I'm agreed 'Terms & Conditions' and 'Privary Policy'
              </p>
            </Grid>
          </Grid>
        </Container>


        <div className="w-full max-w-xs mx-auto pt-4">

        </div>
      </Fragment>

    )
  }

  renderVerification = () => {
    return (
      <Fragment>
        <div>
          <form onSubmit={this.handleVerification}>
            <h1>
              Verification link sent on your email id.
          </h1>

            <div>
              <button type="submit">
                Send Verification link again
            </button>
            </div>
          </form>
          <hr />
          <p>By clicking on button, I'm agreed to send verification link on my email id.</p>
        </div>
      </Fragment>
    )
  }

  static getDerivedStateFromProps(props, state) {
    const { register } = props

    if (register.view === 1) {
      Router.push('/')
      return null
    }
    else {
      return null
    }
  }

  componentDidMount() {
    const { registerAction } = this.props;
    registerAction.check_login();
  }

  render() {
    return this.renderRegistration()
  }
};

const mapDispatchToProps = dispatch => ({
  registerAction: bindActionCreators(registerActions, dispatch),
  user: bindActionCreators(user, dispatch),
  notification: bindActionCreators(notification, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Register);
