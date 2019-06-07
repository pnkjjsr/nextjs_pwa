import React, { Fragment, Component } from "react";
import Auth from "../../Auth";

import "./style.scss";

export default class Layout extends Component {
  render() {
    return (
      <Fragment>
        <div className="header">
          <div className="flex">
            <div className="w-1/2">Logo</div>
            <div className="w-1/2 text-right">
              <Auth />
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}
