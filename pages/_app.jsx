import React from "react";
import App, { Container } from "next/app";

import { Provider } from 'react-redux';
import withRedux from "next-redux-wrapper";
import { initStore } from "../redux/store";

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from "components/Layout/_theme"

import Layout from "components/Layout";
import Notification from "components/Notification"
import authSession from "components/utils/authSession"

class MyApp extends App {
  constructor(props) {
    super(props)
    this.state = {
      key: false
    }
  }
  static async getInitialProps({ Component, ctx, router }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    return { pageProps };
  }
  render() {
    const { key } = this.state;
    const { Component, ctx, router, pageProps, store } = this.props;

    if (router.query.key == process.env.secretKey || key == true || process.env.NODE_ENV == "development") {
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
    else {
      return false
    }
  }
  componentDidMount() {
    const { router } = this.props;
    const session = new authSession()
    if (router.query.key == process.env.secretKey) {
      session.setSecretKey(true)
      this.setState({
        key: true
      });
    }
  }
}

export default withRedux(initStore, { debug: true })(MyApp);
