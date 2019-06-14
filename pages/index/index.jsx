import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import "./style.scss";

const state = { title: "World" };

class Home extends Component {
  static getInitialProps({ store, isServer, pathname, query }) {
    // store.dispatch({ type: 'FOO', payload: 'foo' }); // component will be able to read from store's state when rendered
    return { custom: 'pankaj' }; // you can pass some custom props to component from here
  }

  render() {
    return (
      <Fragment>
        <div className="p-4 shadow rounded bg-white">
          <h1 className="text-teal-500 text-2xl leading-normal">
            Home: {state.title} 'PWA', 'React', 'Redux', 'NextJs', 'Tailwind Css'
            StarterKit
        </h1>
          <hr />
          {this.props.foo}
          <br />
          {this.props.custom}
        </div>

        <style jsx>{``}</style>
      </Fragment>
    )
  }

};

export default connect(state => state)(Home);
