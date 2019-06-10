import React, { Component, Fragment } from 'react'
import Link from 'next/link'

import './style.scss'


export default class Nav extends Component {
  constructor(props) {
    super(props)

    this.state = {
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
    return (
      <div className={`user ${e}`} onClick={this.handleOpenNav}>
        <figure>
          <img src={photo} alt="" />
        </figure>
        <figcaption>
          {name}
        </figcaption>
      </div>
    )
  }

  render() {
    const { action } = this.props;
    const { nav, anime } = this.state;
    return (
      <Fragment>
        <div className={`nav ${nav}`}>
          {this.renderUser()}

          <nav onClick={this.handleCloseNav}>
            <ul className={anime}>
              <li>
                {this.renderUser('inside')}
              </li>
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