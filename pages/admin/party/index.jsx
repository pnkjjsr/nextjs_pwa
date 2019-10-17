import react, { Component, Fragment } from "react"

import { service } from 'apiConnect'

import '../style.scss'

class Party extends Component {
    constructor(props) {
        super(props)
        this.state = {
            parties: ""
        }
    }

    componentDidMount() {
        service.post('/party')
            .then(res => {
                if (res.status == 200) {
                    let data = res.data
                    this.setState({
                        parties: data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { parties } = this.state;
        console.log(parties);

        // const renderParties;

        return (
            <Fragment>
                <div className="container admin">
                    <div className="header">
                        <h1 className="heading">
                            Check all parties.
                            <small>
                                All party list
                            </small>
                        </h1>
                    </div>

                    <div>

                    </div>

                </div>
            </Fragment>
        )
    }
}

export default Party