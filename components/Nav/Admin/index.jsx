import React, { Component, Fragment } from 'react'
import Link from 'next/link'
import HomeIcon from '@material-ui/icons/Home';
import './style.scss'

class NavAdmin extends Component {
    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg bg-light">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="#">
                                <Link href="/admin/dashboard">
                                    <HomeIcon />
                                </Link>
                            </a>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Ministers
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link href="/admin/minister">
                                    <a className="dropdown-item">View Ministers</a>
                                </Link>
                                <Link href="/admin/addminister">
                                    <a className="dropdown-item">Add Minister</a>
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Parties
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link href="/admin/party">
                                    <a className="dropdown-item">View Parties</a>
                                </Link>
                                <Link href="/admin/addparty">
                                    <a className="dropdown-item">Add Party</a>
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Users
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link href="/admin">
                                    <a className="dropdown-item">Administrators</a>
                                </Link>
                                <Link href="/admin">
                                    <a className="dropdown-item">Admin Group</a>
                                </Link>
                                <Link href="/admin">
                                    <a className="dropdown-item">Users</a>
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Marketing
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link href="/admin">
                                    <a className="dropdown-item">Promotions</a>
                                </Link>
                                <Link href="/admin">
                                    <a className="dropdown-item">NewsLetter</a>
                                </Link>
                            </div>
                        </li>

                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Website
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link href="/admin">
                                    <a className="dropdown-item">Blog</a>
                                </Link>
                                <Link href="/admin">
                                    <a className="dropdown-item">Pages</a>
                                </Link>
                                <Link href="/admin">
                                    <a className="dropdown-item">Tags</a>
                                </Link>
                                <Link href="/admin">
                                    <a className="dropdown-item">SEO</a>
                                </Link>
                            </div>
                        </li>

                    </ul>
                </nav>
            </Fragment >
        )
    }
}

export default NavAdmin