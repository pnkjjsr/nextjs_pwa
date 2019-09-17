import React, { Fragment, Component } from "react";

import Head from "./head";
import Header from "./Header";
import Footer from "./Footer";

import "./style.scss";

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      authtoken: props.authtoken
    }
  }
  render() {
    return (
      <Fragment>
        <Head title={this.props.pageTitle} />
        <Header />
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </Fragment>
    );
  }
}
