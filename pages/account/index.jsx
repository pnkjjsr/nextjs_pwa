import React, { Component, Fragment, } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions"

import userAuth from '../../components/utils/userAuth'
import PageLoader from '../../components/loader/page'

import Location from './location'
import Mobile from './mobile'

import userImg from '../../static/images/pj.gif'


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
      <Fragment>
        <h1 className="text-teal-500 text-2xl leading-normal">
          Account
        </h1>
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-auto">

          <img className="w-full" src={userImg} alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Pankaj Jasoria</div>
            <p className="text-gray-700 text-base">
              MLA
              </p>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">#winter</span>
          </div>
        </div>
      </Fragment>
    )
  }

  // static getDerivedStateFromProps(props, state) {}

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