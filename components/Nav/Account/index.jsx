import React, { Component, Fragment } from 'react'
import { connect } from "react-redux"
import Link from 'next/link'

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import InfoIcon from '@material-ui/icons/Info';
import SettingsApplicationsIcon from '@material-ui/icons/SettingsApplications';
import SecurityIcon from '@material-ui/icons/Security';

import './style.scss'

class AccountNav extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  render() {
    return (
      <Fragment>
        <nav className="nav-account">
          <ul>
            <li>
              <Link href="/account">
                <a>
                  <i>
                    <AccountCircleIcon />
                  </i>
                  <label htmlFor="Account">Account</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/constituency">
                <a>
                  <i><PersonPinCircleIcon /></i>
                  <label htmlFor="Constituency">Constituency</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="/personal-info">
                <a>
                  <i><InfoIcon /></i>
                  <label htmlFor="Personal info">Personal info</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="data-personalisation">
                <a>
                  <i><SettingsApplicationsIcon /></i>
                  <label htmlFor="Data &amp; personalisation">Data &amp; personalisation</label>
                </a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>
                  <i><SecurityIcon /></i>
                  <label htmlFor="Security">Security</label>
                </a>
              </Link>
            </li>
          </ul>
        </nav>

      </Fragment>
    )
  }
}

export default connect(state => state)(AccountNav);