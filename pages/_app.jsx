import React from "react";
import App, { Container } from "next/app";

import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store";

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "components/Layout/_theme"

import Layout from "../components/Layout";
import Notification from "../components/Notification"

class MyApp extends App {
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <MuiThemeProvider theme={theme}>
            <Layout pageTitle="">
              <Notification />
              <Component {...pageProps} />
            </Layout>
          </MuiThemeProvider>
        </Provider>
      </Container>
    );
  }
}

export default withRedux(initStore, { debug: true })(MyApp);
