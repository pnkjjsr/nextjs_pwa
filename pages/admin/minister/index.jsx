import React, { Component, Fragment } from 'react'
import EditIcon from '@material-ui/icons/Edit';

import adminAuth from 'utils/adminAuth'
import { service } from 'apiConnect'
import EditMinister from 'pages/admin/EditMinister'

import '../style.scss'

class Minister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            displayEdit: 'd-none',
            dataEdit: {},
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

    renderEdit = () => {
        const { dataEdit } = this.state
        if (!dataEdit.uid) {
            return null
        }
        else {
            return (
                <EditMinister data={dataEdit} actionHide={this.handleHide} />
            )
        }
    }

    render() {
        const { dataEdit, displayEdit, ministers } = this.state;

        const renderMinister = Object.values(ministers).map(i => {
            return (
                <ul key={i.uid}>
                    <li>{i.name}</li>
                    <li>{i.type}</li>
                    <li>{i.assets}</li>
                    <li>{i.partyShort}</li>
                    <li><EditIcon onClick={() => this.handleEdit(i)} /></li>
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

                    <div className={displayEdit}>
                        {this.renderEdit()}
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