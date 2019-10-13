import React, { Component, Fragment, } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions"

import userAuth from 'utils/userAuth'
import PageLoader from 'components/Loader/page'

import Location from './location'
import Mobile from './mobile'
import Main from './account'

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0
    }
  }

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
      return (<Main />)
    }
  }
}

const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(userAuth(Account));