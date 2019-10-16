import react, { Component, Fragment } from "react"


class Party extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Fragment>
                <div className="container admin">
                    <div className="header">
                        <h1 className="heading">
                            Add Mini
                            <small>
                                All polotical party list
                            </small>
                        </h1>
                    </div>

                </div>
            </Fragment>
        )
    }
}

export default Party