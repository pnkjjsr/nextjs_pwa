import React, { Fragment, Component } from "react"
import Link from 'next/link'

import { connect } from "react-redux";

import User from "components/User"
import authSession from "components/utils/authSession"

import "./style.scss";


class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bg: ""
    }
  }

  static getDerivedStateFromProps(props, state) {
    const { user } = props

    if (user.profile.uid) {
      return {
        bg: "bg"
      };
    }
    return true;
  }

  componentDidMount() {
    const session = new authSession();
    let token = session.loggedIn();
    if (token) {
      this.setState({
        bg: "bg"
      });
    }
  }
  componentDidUpdate(prevProps) {
    const { user } = this.props
    if (prevProps.user.profile.uid != user.profile.uid) {
      this.setState({
        bg: ""
      });
    }
  }

  render() {
    const { bg } = this.state;

    return (
      <Fragment>
        <div className={`header ${bg}`} role="main">
          <div className="container">
            <div className="row">
              <div className="col-3 col-sm-6 pl-0">
                <div className="logo">
                  <Link prefetch href="/">
                    <a>Name</a>
                  </Link>
                </div>
              </div>
              <div className="col-9 col-sm-6 pr-0 text-right">
                <User />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default connect(state => state)(Header)