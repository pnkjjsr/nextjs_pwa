import React, { Fragment, Component } from "react";
import Link from 'next/link'

import User from "components/User";

import "./style.scss";

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className="header" role="main">
          <div className="container">
            <div className="row">
              <div className="col-6">
                <div className="logo">
                  <Link prefetch href="/">
                    <a>Name</a>
                  </Link>
                </div>
              </div>
              <div className="col-6">
                <User />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
