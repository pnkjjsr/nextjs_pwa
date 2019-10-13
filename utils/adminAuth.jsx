import React, { Component } from 'utils/react'
import Router from 'utils/next/router';

import authSession from './authSession'
import { service } from '../../utils'

import PageLoader from 'utils/components/Loader/page'

export default function adminAuth(AuthComponent) {

    return class Authenticated extends Component {
        constructor(props) {
            super(props)
            this.state = {
                isLoading: true
            };
        }

        componentDidMount() {
            const _this = this;
            const auth = new authSession;
            const token = auth.getToken();

            if (!auth.loggedIn()) {
                Router.push('/login');
            }
            else {
                let data = {
                    uid: token
                }
                service.post('/user', data)
                    .then((res) => {
                        let admin = res.data.userType;

                        if (admin === "admin") {
                            _this.setState({
                                isLoading: false
                            })
                        }
                        else {
                            Router.push('/');
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        }

        render() {
            return (
                <div>
                    {this.state.isLoading ? (
                        <PageLoader />
                    ) : (
                            <AuthComponent {...this.props} />
                        )}
                </div>
            )
        }
    }
}