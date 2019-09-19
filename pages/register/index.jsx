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
      fullNameMsg: "",
      emailMsg: "",
      passwordMsg: "",
      fullNameErr: "",
      emailErr: "",
      passwordErr: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
  }

  handleChange(e) {
    let elem = e.target.name;
    let err = elem + "Err"
    let msg = elem + "Msg"

    this.setState({
      [elem]: e.target.value,
      [err]: "",
      [msg]: ""
    }, () => this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, fullName, password } = this.state;
    const { notification, user, homeActions } = this.props;
    const { valid, errors } = validation({ email, fullName, password });

    if (!valid) {
      notification.showNotification({
        code: "",
        message: "Please enter the details.",
        type: "error"
      });
      Object.keys(errors).map(e => {
        var err = e + "Err"
        var msg = e + "Msg"
        this.setState({
          [err]: "error",
          [msg]: errors[e]
        });
      });
      return
    }

    const auth = new authentication;
    auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        if (res.code) {
          notification.showNotification(res)

          if (res.code == "auth/email-already-in-use") {
            this.setState({
              emailErr: "error",
              emailMsg: res.message
            });
          } else if (res.code == "auth/weak-password") {
            this.setState({
              passwordErr: "error",
              passwordMsg: res.message
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
    const { fullNameMsg, emailMsg, passwordMsg, fullNameErr, emailErr, passwordErr } = this.state;
    console.log();

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
                  class={`form-control ${fullNameErr}`}
                  name="fullName"
                  type="text"
                  label="Full name"
                  htmlFor="fullName"
                  helperText={fullNameMsg}
                  onChange={this.handleChange}
                />

                <Input
                  class={`form-control ${emailErr}`}
                  name="email"
                  type="text"
                  label="Email"
                  htmlFor="email"
                  helperText={emailMsg}
                  onChange={this.handleChange}
                />

                <Input
                  class={`form-control ${passwordErr}`}
                  name="password"
                  type="password"
                  label="Password"
                  htmlFor="password"
                  autoComplete="off"
                  helperText={passwordMsg}
                  onChange={this.handleChange}
                />


                <div>
                  <Button text="Create My Account" variant="contained" color="primary" size="large" />
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
