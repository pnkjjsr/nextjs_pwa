import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
// import accountActions from "./actions";

import userAuth from '../../components/utils/userAuth'

// import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() { }

  render() {
    return (
      <Fragment>
        <div>
          Home
        </div>
        <style jsx>{``}</style>
      </Fragment>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  // accountAction: bindActionCreators(accountActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(userAuth(Home));