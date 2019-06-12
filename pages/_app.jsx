import React from "react";
import App, { Container } from "next/app";

import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store";
import Actions from "../redux/actions";

import Layout from "../components/Layout";


class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    // we can dispatch from here too
    // ctx.store.dispatch({ type: 'FOO', payload: 'foo' });

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Layout pageTitle="">
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </Layout>
      </Container>
    );
  }
}

export default withRedux(initStore)(MyApp);
