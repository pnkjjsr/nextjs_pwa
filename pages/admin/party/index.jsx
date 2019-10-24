import React, { Component, Fragment } from "react"
import Router from 'next/router'
import EditIcon from '@material-ui/icons/Edit';

import { service } from 'apiConnect'
import EditParty from 'pages/admin/editParty'

import '../style.scss'

class Party extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayEdit: 'd-none',
            dataEdit: {},
            parties: []
        }
    }

    handleEdit = (e) => {
        this.setState({
            displayEdit: 'd-block',
            dataEdit: e
        });
    }
    handleHide = () => {
        this.setState({
            displayEdit: 'd-none',
            dataEdit: {}
        });
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

    renderEdit = () => {
        const { dataEdit } = this.state
        if (!dataEdit.uid) {
            return null
        }
        else {
            return (
                <EditParty data={dataEdit} actionHide={this.handleHide} />
            )
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
        const { parties, displayEdit, dataEdit } = this.state;

        const renderParty = Object.values(parties).map(i => {
            return (
                <ul key={i.uid}>
                    <li>{i.fullName}</li>
                    <li>{i.shortName}</li>
                    <li>{i.founded}</li>
                    <li>{i.symbol}</li>
                    <li><EditIcon onClick={() => this.handleEdit(i)} /></li>
                </ul>
            )
        })
        return (
            <Fragment>
                <div className="container admin">
                    <div className="header">
                        <h1 className="heading d-none">
                            Check all parties.
                            <small>
                                All party list
                            </small>
                        </h1>
                    </div>

                    <div className={displayEdit}>
                        {this.renderEdit()}
                    </div>


                    <div className="list">
                        {renderParty}
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default Party