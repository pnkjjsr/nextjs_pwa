import React, { Component, Fragment } from 'react'

import adminAuth from 'utils/adminAuth'
import { service } from 'apiConnect'

import '../style.scss'

class Minister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ministers: []
        }
    }

    handleFile = (e) => {
        let elm = e.target.name
        let path = e.target.files[0]
        this.setState({
            [elm]: path
        });
    }

    componentDidMount() {
        service.post('/minister')
            .then(res => {
                if (res.status == 200) {
                    let data = res.data
                    this.setState({
                        ministers: data
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    render() {
        const { ministers } = this.state;
        const renderMinister = Object.values(ministers).map(i => {
            return (
                <ul key={i.uid}>
                    <li>{i.name}</li>
                    <li>{i.type}</li>
                    <li>{i.assets}</li>
                    <li>{i.partyShort}</li>
                </ul>
            )
        })
        return (
            <Fragment>
                <div className="container admin">
                    <div className="header">
                        <h1 className="heading">
                            Check all ministers.
                            <small>
                                All minister list
                            </small>
                        </h1>
                    </div>

                    <div className="list">
                        {renderMinister}
                    </div>

                </div>
            </Fragment>
        )
    }
}
export default adminAuth(Minister)