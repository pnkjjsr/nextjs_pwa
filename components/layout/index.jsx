import React, { Fragment, Component } from "react";
import Head from "./head";

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <Head title={this.props.pageTitle} />
        Header
        {this.props.children}
        Footer
      </Fragment>
    );
  }
}
