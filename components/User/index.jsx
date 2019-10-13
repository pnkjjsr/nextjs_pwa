import React, { Component } from "react";
import Router from 'next/router';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import userAction from './actions'

import Button from "components/Form/Button"

import authSession from '../../utils/authSession'
import authentication from "../../utils/authentication"

import Nav from "../Nav"
import './style.scss';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnSize: "",
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
  handleSignup() {
    Router.push('/register')
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

  handleBtnSize = () => {
    if (screen.width > 1410) {
      this.setState({
        btnSize: "btn-lg"
      });
    }
    else if (screen.width < 992) {
      this.setState({
        btnSize: "btn-sm"
      });
    }
    else {
      this.setState({
        btnSize: ""
      });
    }
  }

  render() {
    const { btnSize, token } = this.state;
    const { user, layout } = this.props;
    return (
      <div className="auth">
        {user.profile.uid || token ? (
          <Nav action={this.handleLogout} />
        ) : (
            layout.path == '/login'
              ?
              <Button text="Create new account" size={btnSize} variant="btn-outline-primary" action={this.handleSignup} />
              :
              <Button text="Login" size={btnSize} variant="btn-outline-primary" action={this.handleLogin} />
          )
        }
      </div>
    );
  }
  componentDidMount() {
    let session = new authSession();
    let token = session.getToken();

    this.handleBtnSize();

    this.setState({
      token: token
    });
  }

}
const mapDispatchToProps = dispatch => ({
  userAction: bindActionCreators(userAction, dispatch)
})

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  layout: state.layout
})

export default connect(mapStateToProps, mapDispatchToProps)(User);