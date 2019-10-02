import React, { Fragment, Component } from "react"
import Link from 'next/link'

import User from "components/User"
import authSession from "components/utils/authSession"

import "./style.scss";


class Layout extends Component {
  constructor(props) {
    super(props)

    this.state = {
      bg: ""
    }
  }

  componentDidMount() {
    const session = new authSession();
    let token = session.loggedIn();
    
    if (token) {
      this.setState({
        bg: "bg"
      });
    }
  }

  render() {
    const { bg } = this.state;
    return (
      <Fragment>
        <div className={`header ${bg}`} role="main">
          <div className="container">
            <div className="row">
              <div className="col-3 col-sm-6 pl-0">
                <div className="logo">
                  <Link prefetch href="/">
                    <a>Name</a>
                  </Link>
                </div>
              </div>
              <div className="col-9 col-sm-6 pr-0 text-right">
                <User />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Layout