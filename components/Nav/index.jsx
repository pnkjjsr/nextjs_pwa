import React, { Component, Fragment } from 'react'
import Link from 'next/link'

import { connect } from "react-redux";

import authSession from '../utils/authSession'

import userIcon from "../../static/icons/user-solid-circle.svg"
import './style.scss'

class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
      admin: props.user.profile.userType,
      nav: "",
      anime: ""
    }

    this.handleOpenNav = this.handleOpenNav.bind(this);
    this.handleCloseNav = this.handleCloseNav.bind(this);
  }

  handleOpenNav = () => {
    this.setState({
      nav: "active"
    });
  }
  handleCloseNav = () => {
    this.setState({
      nav: ""
    });
  }
  renderUser(e) {
    const { name, photo } = this.props;
    let image = !photo ? userIcon : photo;

    return (
      <div className={`user ${e}`} onClick={this.handleOpenNav}>
        <figure>
          <img src={image} alt="" />
        </figure>
        <figcaption>
          {name}
        </figcaption>
      </div>
    )
  }
  async componentDidMount() {
    const auth = new authSession;
    const profile = await auth.getProfile()

    if (profile.userType == "admin") {
      this.setState({
        admin: "admin"
      });
    }
  }

  render() {
    const { nav, anime, admin } = this.state;
    const { action } = this.props;

    return (
      <Fragment>
        <div className={`nav ${nav}`}>
          {this.renderUser()}

          <nav onClick={this.handleCloseNav}>
            <ul className={anime}>
              <li>
                {this.renderUser('inside')}
              </li>

              {
                admin === "admin" ?
                  (
                    <li>
                      <Link prefetch href="/admin/dashboard">
                        <a>Dashboard</a>
                      </Link>
                    </li>
                  ) : null
              }


              <li>
                <Link prefetch href="/account">
                  <a>Account</a>
                </Link>
              </li>
              <li>
                <Link prefetch href="/">
                  <a onClick={action}>Logout</a>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Fragment>
    )
  }
}

export default connect(state => state)(Nav);