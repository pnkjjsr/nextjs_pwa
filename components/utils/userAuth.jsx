// utils/withAuth.js - a HOC for protected pages
import React, { Component } from 'react'
import Router from 'next/router';

import authSession from './authSession'

import PageLoader from '../loader/page'

export default function withAuth(AuthComponent) {
    const Auth = new authSession()
    return class Authenticated extends Component {
        constructor(props) {
            super(props)
            this.state = {
                isLoading: true
            };
        }

        componentDidMount() {
            if (!Auth.loggedIn()) {
                Router.push('/register');
            }
            else {
                this.setState({ isLoading: false })
            }
        }

        render() {
            return (
                <div>
                    {this.state.isLoading ? (
                        <PageLoader />
                    ) : (
                            <AuthComponent {...this.props} auth={Auth} />
                        )}
                </div>
            )
        }
    }
}