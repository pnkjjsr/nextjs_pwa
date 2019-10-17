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
                            Add Party
                            <small>
                                Add your polotical party here.
                            </small>
                        </h1>
                    </div>

                </div>
            </Fragment>
        )
    }
}

export default Party