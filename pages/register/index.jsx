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
import banner from "static/images/signup/banner.jpg"
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
          <Grid container spacing={0}>
            <Grid item sm={7}>
              <div className="banner">
                <h2 className="title">
                  Lets build our
                  <br />
                  India together !!
                </h2>

                <figure>
                  <img src={banner} alt="banner of the website" />
                </figure>
              </div>
            </Grid>
            <Grid item sm={5}>
              <form autoComplete="on" onSubmit={this.handleSubmit}>
                <div className="form">
                  <div className="header">
                    <h1 className="heading">
                      Create your account
                    </h1>
                    <div className="sub">
                      One free step for nation
                    </div>
                  </div>

                  <div>
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
                      class={`form-control last ${passwordErr}`}
                      name="password"
                      type="password"
                      label="Password"
                      htmlFor="password"
                      autoComplete="off"
                      helperText={passwordMsg}
                      onChange={this.handleChange}
                    />

                    <div className="note">
                      By clicking Sign Up, you agree to our Terms, Data Policy and Cookie Policy. You may receive SMS notifications from us and can opt out at any time.
                    </div>

                    <div className="action">
                      <Button text="Create My Account" variant="contained" color="secondary" size="large" />
                    </div>
                  </div>
                </div>

                <div className="link">
                  Already a member? <Link href="/login"><a>Login</a></Link>
                </div>
              </form>
            </Grid>
          </Grid>
        </Container>
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
