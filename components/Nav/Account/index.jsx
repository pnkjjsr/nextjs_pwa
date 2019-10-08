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
              <Link href="">
                <a>
                  <i>
                    <AccountCircleIcon />
                  </i>
                  Account
                  </a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>
                  <i><PersonPinCircleIcon /></i>
                  Constituency
                </a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>
                  <i><InfoIcon /></i>
                  Personal info
                </a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>
                  <i><SettingsApplicationsIcon /></i>
                  Data &amp; personalisation
                  </a>
              </Link>
            </li>
            <li>
              <Link href="">
                <a>
                  <i><SecurityIcon /></i>
                  Security
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