import React, { Component, Fragment } from "react";
import Link from 'next/link';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import Router from 'next/router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import actionNotifications from "components/Notification/actions"
import actionUser from "components/User/actions"

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


  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { user, actionNotification } = this.props;
    const session = new authSession;
    const auth = new authentication;

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
    const session = new authSession;
    let token = session.getToken();

    if (token) {
      Router.push('/account')
    }
  }

  render() {
    const { email, password, emailErr, passwordErr, emailMsg, passwordMsg } = this.state;
    return (
      <Fragment>
        <Container className="login" fixed>
          <Grid container justify="center" spacing={3} >
            <Grid item sm={4}>
              <h1>
                Login
            </h1>

              <form onSubmit={this.handleSubmit} autoComplete="on">

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

                <Button text="Login" variant="contained" color="primary" size="large" />

                <div className="text-gray text-xs font-hairline mt-2">
                  Create you account, click here to <Link href="/">
                    <a className="font-medium text-blue-600">Registration</a>
                  </Link>
                </div>
              </form>
              <hr />
              <p className="text-gray text-xs italic font-hairline">By proceeding, I'm agreed 'Terms & Conditions' and 'Privary Policy'</p>
            </Grid>
          </Grid>
        </Container>


        <style jsx>{``}</style>
      </Fragment>
    )
  }
};

const mapDispatchToProps = dispatch => ({
  user: bindActionCreators(actionUser, dispatch),
  actionNotification: bindActionCreators(actionNotifications, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Login);