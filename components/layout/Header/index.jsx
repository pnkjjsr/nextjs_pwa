import React, { Fragment, Component } from "react";
import Link from 'next/link'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import User from "components/User";

import "./style.scss";

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className="header">
          <Container fixed>
            <Grid container spacing={0}>
              <Grid item xs={6}>
                <div className="logo">
                  <Link prefetch href="/">
                    <a>[Name]</a>
                  </Link>
                </div>
              </Grid>
              <Grid item xs={6} align="right">
                <User />
              </Grid>
            </Grid>
          </Container>
        </div>
      </Fragment>
    );
  }
}
