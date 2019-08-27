import React, { Component, Fragment, } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions"

import userAuth from '../../components/utils/userAuth'
import PageLoader from '../../components/loader/page'

import Location from './location'
import Mobile from './mobile'


import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0
    }
  }

  renderDashboard = () => {
    const { user } = this.props
    return (
      <div className="p-4 shadow rounded bg-white">
        <h1 className="text-teal-500 text-2xl leading-normal">
          Account
        </h1>
        <hr />
        <img src={user.photo} alt="" />
        <br />
        {user.name} [{user.uid}] [{JSON.stringify(user.eVerified)}]
        <br />
        {user.email}
        <br />
        {user.mobile}
      </div>
    )
  }

  // static getDerivedStateFromProps(props, state) { }

  componentDidMount() {
    const { accountAction } = this.props;
    accountAction.prefetchData();
  }

  render() {
    const { view } = this.props.account;

    if (view === 0) {
      return (<PageLoader />)
    }
    else if (view === 1) {
      return (<Location />)
    }
    else if (view === 2) {
      return (<Mobile />)
    }
    else if (view === 3) {
      return this.renderDashboard()
    }
  }
}

const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(userAuth(Account));