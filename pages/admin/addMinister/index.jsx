import React, { Component, Fragment } from 'react'

import { service } from 'apiConnect'
import adminAuth from 'utils/adminAuth'
import firebaseStorage from 'utils/firestoreStorage'

import Button from 'components/Form/Button'

import "../style.scss"

class Minister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "d-block",
            typeOptions: [],
            yearOptions: [],
            partyOptions: [],
            zoneOptions: [],
            type: "",
            year: "",
            state: "",
            constituency: "",
            party: "",
            name: "",
            photoUrl: "",
            age: "",
            education: "",
            address: "",
            pincode: "",
            cases: "",
            assets: "",
            liabilities: ""
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.constituency && prevState.party && prevState.type) {
            return {
                display: "d-block;"
            }
        }
        return null;
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
        }, () => {
            const { type, state, yearOptions, zoneOptions } = this.state;

            if (type && state) {
                if (!yearOptions.length) {
                    this.renderYear()
                }
                if (!zoneOptions.length) {
                    this.renderZone()
                }
            }
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { year, constituency, party, partyShort, type, name, photoUrl, age, address, pincode, zone, state, cases, assets, liabilities, education } = this.state;
        const data = {
            cases: cases,
            education: education,
            party: party,
            partyShort: partyShort,
            constituency: constituency,
            address: address,
            liabilities: liabilities,
            state: state,
            assets: assets,
            name: name,
            pincode: pincode,
            age: age,
            year: year,
            photoUrl: photoUrl,
        }

        let apiHit = type
        console.log(data);


        service.post(`/add-${apiHit}`, data)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });

        // const storage = new firebaseStorage();
        // storage.uploadAffidavits(type, file);
    }

    renderConstituency = () => {
        const { type, zoneOptions } = this.state

        const renderZoneOptions = zoneOptions.map((option, index) => {
            return (
                <option key={index} value={option}>{option}</option>
            )
        })

        if (type == "councillor" || type == "mla") {
            return (
                <Fragment>
                    <input className="form-control" type="text" maxLength="6" name="constituency" onChange={this.handleChange} />
                    <small className="form-text text-muted">Councillor, MLA = Pincode</small>
                </Fragment>
            )
        }
        else if (type == "mp") {
            return (
                <Fragment>
                    <select className="form-control" name="constituency" onChange={this.handleChange}>
                        <option value="">Select</option>
                        {renderZoneOptions}
                    </select>
                </Fragment>
            )

        }
        else {
            return (
                <Fragment>
                    <input className="form-control" type="text" name="constituency" disabled="disabled" onChange={this.handleChange} />
                    <small className="form-text text-muted">Select minister type first</small>
                </Fragment>
            )
        }


    }

    renderYear = () => {
        const { type, state } = this.state;
        let data = {
            "type": type,
            "state": state
        }

        service.post('/election-years', data)
            .then(res => {
                let years = res.data[0].years
                this.setState({
                    yearOptions: years
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    renderZone = () => {
        const { state } = this.state;
        let data = {
            "state": state
        }

        service.post('/state-zones', data)
            .then(res => {
                let zones = res.data[0].zone
                this.setState({
                    zoneOptions: zones
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        service.post('/minister-type')
            .then(res => {
                this.setState({
                    typeOptions: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });

        service.post('/party')
            .then(res => {
                this.setState({
                    partyOptions: res.data
                });
            })
            .catch(err => {
                console.log(err);
            });
    }

    render() {
        const { display, typeOptions, yearOptions, partyOptions } = this.state;

        const renderTypeOptions = typeOptions.map(option => {
            return (
                <option key={option.uid} value={option.type}>{option.name}</option>
            )
        })

        const renderYears = yearOptions.map((yr, key) => {
            return (
                <option key={key} value={yr}>{yr}</option>
            )
        })

        const renderFullPartyOptions = partyOptions.map(option => {
            return (
                <option key={option.uid} value={option.fullName}>{option.fullName}</option>
            )
        })

        const renderShortPartyOptions = partyOptions.map(option => {
            return (
                <option key={option.uid} value={option.shortName}>{option.shortName}</option>
            )
        })

        return (
            <Fragment>
                <div className="container admin">
                    <div className="header d-none">
                        <h1 className="heading">
                            Add Minister
                            <small>
                                Add your minister here.
                            </small>
                        </h1>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.handleSubmit}>

                                <div className="form-group">
                                    <label htmlFor="type">
                                        Select Minister Type
                                    </label>
                                    <select className="form-control" name="type" onChange={this.handleChange}>
                                        <option>select</option>
                                        {renderTypeOptions}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <select className="form-control" name="state" onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value="New Delhi">New Delhi</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="constituency">Constituency</label>
                                    {this.renderConstituency()}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="year">Year</label>
                                    <select className="form-control" name="year" onChange={this.handleChange}>
                                        <option value="">Select year</option>
                                        {renderYears}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="party">Party full name</label>
                                    <select className="form-control" name="party" onChange={this.handleChange}>
                                        <option>select</option>
                                        {renderFullPartyOptions}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partyShort">Party short name</label>
                                    <select className="form-control" name="partyShort" onChange={this.handleChange}>
                                        <option>select</option>
                                        {renderShortPartyOptions}
                                    </select>
                                </div>

                                <hr />

                                <div className={display}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input className="form-control" type="text" name="name" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="photoUrl">Photo</label>
                                        <input type="file" className="form-control-file" name="photoUrl" onChange={this.handleFile} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="age">Age</label>
                                        <input className="form-control" name="age" type="text" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="education">Education</label>
                                        <input className="form-control" name="education" type="text" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="address">Address</label>
                                        <input className="form-control" name="address" type="text" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="pincode">Pincode</label>
                                        <input className="form-control" name="pincode" type="text" onChange={this.handleChange} />
                                    </div>

                                    <hr />

                                    <div className="form-group">
                                        <label htmlFor="cases">Legal Cases</label>
                                        <input className="form-control" name="cases" type="text" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="assets">Assets</label>
                                        <input className="form-control" name="assets" type="text" onChange={this.handleChange} />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="liabilities">Liabilities</label>
                                        <input className="form-control" name="liabilities" type="text" onChange={this.handleChange} />
                                    </div>

                                    <div>
                                        <Button text="Submit" variant="btn-primary" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>


                </div>

            </Fragment>
        )
    }
}
export default adminAuth(Minister)