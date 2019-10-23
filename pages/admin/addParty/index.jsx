import React, { Component, Fragment } from "react"
import Router from 'next/router';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import actionNotifications from "components/Notification/actions"

import { service } from 'apiConnect'
import firebaseStorage from 'utils/firestoreStorage'

import Button from 'components/Form/Button'



import '../style.scss'

class Party extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fullName: "",
            shortName: "",
            photoUrl: "",
            date: "",
            month: "",
            year: ""
        }
    }

    handleFile = (e) => {
        let elm = e.target.name
        let path = e.target.files[0]
        this.setState({
            [elm]: path
        });
    }

    handleChange = (e) => {
        let elm = e.target.name
        this.setState({
            [elm]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const storage = new firebaseStorage;
        const { fullName, shortName, photoUrl, date, month, year } = this.state;
        const { actionNotification } = this.props
        const partyData = {
            fullName: fullName,
            shortName: shortName,
            photoUrl: photoUrl,
            founded: `${date}/${month}/${year}`
        }

        service.post('/add-party', partyData)
            .then(res => {
                let uid = res.data.uid

                storage.uploadImage('images/parties', photoUrl, uid)
                    .then(res => {
                        console.log(res);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(error => {
                // actionNotification.showNotification(error);
                let data = error.response.data;
                let msg = data[Object.keys(data)[0]]
                let obj = { message: msg }
                actionNotification.showNotification(obj)
            })
    }

    render() {
        return (
            <Fragment>
                <div className="container admin">
                    <div className="header">
                        <h1 className="heading d-none">
                            Add Party
                            <small>
                                Add your polotical party here.
                            </small>
                        </h1>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="fullName">Party full  name</label>
                                    <input className="form-control" type="text" name="fullName" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="shortName">Party short Name</label>
                                    <input className="form-control" type="text" name="shortName" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="photoUrl">Party photo (symbol)</label>
                                    <input type="file" className="form-control-file" name="photoUrl" onChange={this.handleFile} />
                                </div>

                                <div className="row">
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="date">Date</label>
                                            <select className="form-control" name="date" onChange={this.handleChange}>
                                                <option value="">Select Date</option>
                                                <option value="01">01</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="month">Month</label>
                                            <select className="form-control" name="month" onChange={this.handleChange}>
                                                <option value="">Select month</option>
                                                <option value="01">January</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-4">
                                        <div className="form-group">
                                            <label htmlFor="year">Year</label>
                                            <select className="form-control" name="year" onChange={this.handleChange}>
                                                <option value="">Select year</option>
                                                <option value="2014">2014</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <Button text="Submit" variant="btn-primary" />
                                </div>
                            </form>
                        </div>
                    </div>

                </div>
            </Fragment>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    actionNotification: bindActionCreators(actionNotifications, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Party)