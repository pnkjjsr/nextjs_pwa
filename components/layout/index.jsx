import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import layoutActions from './actions'

import Head from "./head";
import Header from "./Header";
import Footer from "./Footer";

import "./style.scss";

class Layout extends Component {
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
        {/* <Header /> */}
        <div className="main">
          {this.props.children}
        </div>
        <Footer />
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  layoutAction: bindActionCreators(layoutActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Layout);