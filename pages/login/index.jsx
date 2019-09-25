import React, { Component, Fragment } from "react";
import Link from 'next/link';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Router from 'next/router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import actionNotifications from "components/Notification/actions"
import actionUser from "components/User/actions"
import layoutActions from "components/Layout/actions"

import authSession from "components/utils/authSession"
import authentication from "components/utils/authentication"
import Button from "components/Form/Button"
import Input from "components/Form/Input"

import { service } from 'utils';

import validation from "./validation"
import "./style.scss";

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: "",
      email: "",
      password: "",
      emailErr: "",
      passwordErr: "",
      emailMsg: "",
      passwordMsg: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  static async getInitialProps({ pathname }) {
    const path = pathname
    return { path }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { user, actionNotification } = this.props;

    const { valid, errors } = validation({ email, password });
    if (!valid) {
      actionNotification.showNotification({
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

    const session = new authSession;
    const auth = new authentication;
    auth.signInWithEmail(email, password)
      .then(res => {
        if (res.code) {
          console.log(res);
          actionNotification.showNotification(res)

          if (res.code == "auth/user-not-found") {
            this.setState({
              emailErr: "error",
              emailMsg: res.message
            });
          } else if (res.code == "auth/wrong-password") {
            this.setState({
              passwordErr: "error",
              passwordMsg: res.message
            });
          }

        } else {
          let token = res.user.uid;
          let data = {
            uid: token
          }
          session.setToken(token);
          service.post('/login', data)
            .then(result => {
              user.updateUser(result.data);
              session.setProfile(result.data);
              Router.push('/account')
            })
            .catch(error => {
              actionNotification.showNotification(error);
              let data = error.response.data;
              let msg = data[Object.keys(data)[0]]
              let obj = { message: msg }
              actionNotification.showNotification(obj)
            })
        }
      })
      .catch(error => {
        actionNotification.showNotification(error)
      })
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

  componentDidMount() {
    const { path, layoutAction } = this.props;
    layoutAction.update_path(path);
    const session = new authSession;
    let token = session.getToken();

    if (token) {
      Router.push('/account')
    }
  }

  render() {
    const { emailErr, passwordErr, emailMsg, passwordMsg } = this.state;
    return (
      <Fragment>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <form onSubmit={this.handleSubmit} autoComplete="on">
                  <div className="form">
                    <div className="header">
                      <h1 className="heading">
                        Login
                      </h1>
                      <div className="sub">
                        One quick step for change !!
                      </div>
                    </div>

                    <div className="form-group">
                      <label for="email">Email address</label>
                      <input className="form-control" name="email" type="text" aria-describedby="emailHelp" placeholder="Email address" />
                      <small className="form-text text-muted">
                        We'll never share your email with anyone else.
                      </small>
                    </div>

                    <div className="form-group">
                      <label for="password">Password</label>
                      <input className="form-control" name="password" type="text" aria-describedby="passwordHelp" placeholder="*******" />
                      <small className="form-text text-muted">
                        Error
                      </small>
                    </div>

                    <div>
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
                        helperText={passwordMsg}
                        onChange={this.handleChange}
                        autoComplete="off"
                      />
                    </div>

                    <div className="action">
                      <Button text="Login" variant="contained" color="primary" size="large" />
                    </div>
                  </div>

                  <div className="link">
                    Create you account, click here to <Link href="/">
                      <a>Registration</a>
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <style jsx>{``}</style>
      </Fragment>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  user: bindActionCreators(actionUser, dispatch),
  actionNotification: bindActionCreators(actionNotifications, dispatch),
  layoutAction: bindActionCreators(layoutActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Login);