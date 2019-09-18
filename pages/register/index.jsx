import React, { Component, Fragment } from "react";
import Link from 'next/link';
import Router from 'next/router'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import user from "components/User/actions"
import registerActions from "./action"
import notification from "components/Notification/actions"

import { service } from 'utils';

import authSession from "components/utils/authSession"
import authentication from "components/utils/authentication"
import Button from "components/Form/Button"
import Input from "components/Form/Input"

import validation from "./validation"
import "./style.scss";

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0,
      fullName: "",
      email: "",
      password: "",
      msgName: "",
      msgEmail: "",
      msgPassword: "",
      errName: "",
      errEmail: "",
      errPassword: "",
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

    if (elem == 'fullName') {
      this.setState({
        errName: "",
        msgName: ""
      });
    } else if (elem == 'email') {
      this.setState({
        errEmail: "",
        msgEmail: ""
      });
    } else if (elem == 'password') {
      this.setState({
        errPassword: "",
        msgPassword: ""
      });
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, fullName, password } = this.state;
    const { notification, user, homeActions } = this.props;

    const { valid, errors } = validation({ email, fullName, password });

    if (!valid) {
      if (errors.fullName) {
        this.setState({
          errName: "error",
          msgName: errors.fullName
        });
      }
      if (errors.email) {
        this.setState({
          errEmail: "error",
          msgEmail: errors.email
        });
      }
      if (errors.password) {
        this.setState({
          errPassword: "error",
          msgPassword: errors.password
        });
      }

      this.setState({
        errorMsgs: errors
      });
      return
    }
    else {
      this.setState({
        errorMsgs: []
      });
    }

    const auth = new authentication;
    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res.code) {
          notification.showNotification(res)
          console.log(res);

          if (res.code == "auth/email-already-in-use") {
            this.setState({
              errEmail: "error",
              msgEmail: res.message
            });
          } else if (res.code == "auth/weak-password") {
            this.setState({
              errPassword: "error",
              msgPassword: res.message
            });
          }

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
            fullName: fullName,
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
    const { msgName, msgEmail, msgPassword, errName, errEmail, errPassword } = this.state;
    return (
      <Fragment>
        <Container fixed className="register">
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <div className="banner">
                <figure></figure>
              </div>
            </Grid>
            <Grid item sm={6}>
              <form autoComplete="on" onSubmit={this.handleSubmit}>
                <h1>
                  Create your account
                </h1>

                <Input
                  class={`form-control ${errName}`}
                  name="fullName"
                  type="text"
                  label="Full name"
                  htmlFor="fullName"
                  helperText={msgName}
                  onChange={this.handleChange}
                />

                <Input
                  class={`form-control ${errEmail}`}
                  name="email"
                  type="text"
                  label="Email"
                  htmlFor="email"
                  helperText={msgEmail}
                  onChange={this.handleChange}
                />

                <Input
                  class={`form-control ${errPassword}`}
                  name="password"
                  type="password"
                  label="Password"
                  htmlFor="password"
                  autoComplete="off"
                  helperText={msgPassword}
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
