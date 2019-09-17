import React, { Component, Fragment, } from "react";
import loader from "../../static/icons/loader.svg"

export default class PageLoader extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Fragment>
                <figure className="w-full">
                    <img className="m-auto my-24" src={loader} alt="page loader" />
                </figure>
            </Fragment>
        )
    }
}