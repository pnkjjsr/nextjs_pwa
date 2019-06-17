import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./style.scss";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <div className="p-4 shadow rounded bg-white">
          <h1 className="text-2xl leading-normal">
            Home: 'PWA', 'React', 'Redux', 'NextJs', 'Tailwind Css'
            StarterKit
          </h1>
        </div>

        <style jsx>{``}</style>
      </Fragment>
    )
  }

};

export default connect(state => state)(Home);
