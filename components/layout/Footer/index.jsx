import React, { Fragment, Component } from "react";
import Link from 'next/link'
import Container from '@material-ui/core/Container';

import "./style.scss";

export default class Footer extends Component {
  render() {
    return (
      <Fragment>
        <div className="footer" role="main">
          <Container fixed>
            <ul className="links">
              <li>
                <Link href="/about">
                  <a>About</a>
                </Link>
              </li>
              <li>
                <Link href="/Terms">
                  <a>Terms</a>
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy">
                  <a>Privacy policy</a>
                </Link>
              </li>
              <li>
                <Link href="/cookies">
                  <a>Cookies</a>
                </Link>
              </li>
              <li>
                <Link href="/jobs">
                  <a>Jobs</a>
                </Link>

              </li>
              <li>
                <Link href="/settings">
                  <a>Settings</a>
                </Link>
              </li>
            </ul>

            <div className="copyright">
              © 2019 Neta .Ltd
            </div>
          </Container>
        </div>
      </Fragment>
    );
  }
}
