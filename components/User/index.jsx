import React, { Component } from "react";
import Router from 'next/router';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import userAction from './actions'

import Button from '@material-ui/core/Button';

import authSession from '../utils/authSession'
import authentication from "../utils/authentication"

import Nav from "../Nav"
import './style.scss';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      uid: "",
      name: "",
      eVerified: "",
      email: "",
      mobile: "",
      photo: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogin() {
    Router.push('/login')
  }

  handleLogout(e) {
    e.preventDefault();
    const { userAction, registerAction } = this.props;
    const session = new authSession()
    const auth = new authentication()

    this.setState({
      user: "",
      name: "",
      eVerified: "",
      email: "",
      mobile: "",
      photo: "",
      uid: "",
      token: ""
    }, () => userAction.updateUser(this.state));

    session.logout();
    auth.signOut();
    Router.push('/login');
  }

  componentDidMount() {
    let session = new authSession();
    let token = session.getToken();
    this.setState({
      token: token
    });
  }

  render() {
    const { token, name, photo } = this.state;
    const { user } = this.props;

    return (
      <div className="auth">
        {user.profile.uid || token ? (
          <Nav name={name} photo={photo} action={this.handleLogout} />
        ) : (
            <Button variant="outlined" color="primary" onClick={this.handleLogin}>
              Login
            </Button>
          )
        }
      </div>
    );
  }

}
const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch)
})

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user
})

export default connect(mapStateToProps, mapDispatchToProps)(User);