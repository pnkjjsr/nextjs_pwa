import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { auth } = this.props

    return (
      <Fragment>
        <div className="p-4 shadow rounded bg-white">
          <h1 className="text-teal-500 text-2xl leading-normal">
            Account
          </h1>
          <hr />
          <img src={auth.photo} alt="" />
          <br />
          {auth.name} [{auth.uid}] [{JSON.stringify(auth.eVerified)}]
          <br />
          {auth.email}
          <br />
          {auth.mobile}
        </div>

        <style jsx>{``}</style>
      </Fragment>
    )
  }
}

export default connect(state => state)(Home);
