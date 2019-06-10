import React, { Fragment, Component } from "react";
import Link from 'next/link'
import Auth from "../../Auth";

import "./style.scss";

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className="header">
          <div className="flex">
            <div className="w-1/2">
              <div className="logo">
                <Link prefetch href="/">
                  <a>N</a>
                </Link>
              </div>
            </div>
            <div className="w-1/2 text-right">
              <Auth />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
