import React, { Component, Fragment, } from "react";
import loader from "static/icons/loader.svg"

import './style.scss'

export default class PageLoader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <div className="page-loader">
                    <figure>
                        <img src={loader} alt="page loader" />
                    </figure>
                </div>
            </Fragment>
        )
    }
}