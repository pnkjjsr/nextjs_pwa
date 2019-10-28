import React, { Component, Fragment } from 'react'

import { service } from 'apiConnect'
import adminAuth from 'utils/adminAuth'
import firebaseStorage from 'utils/firestoreStorage'

import Button from 'components/Form/Button'

import "../style.scss"

class EditMinister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            typeOptions: [],
            yearOptions: [],
            partyOptions: [],
            zoneOptions: [],
            uid: props.data.uid,
            type: props.data.type,
            year: props.data.year,
            state: props.data.state,
            constituency: props.data.constituency,
            party: props.data.party,
            partyShort: props.data.partyShort,
            name: props.data.name,
            photoUrl: props.data.photoUrl,
            age: props.data.age,
            education: props.data.education,
            address: props.data.address,
            pincode: props.data.pincode,
            cases: props.data.cases,
            assets: props.data.assets,
            liabilities: props.data.liabilities,
            winner: props.data.winner
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
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
        const { uid, year, constituency, party, partyShort, type, name, photoUrl, age, address, pincode, state, cases, assets, liabilities, education, winner } = this.state;
        const { actionHide } = this.props

        const data = {
            uid: uid,
            type: type,
            state: state,
            constituency: constituency,
            year: year,
            party: party,
            partyShort: partyShort,
            name: name,
            photoUrl: photoUrl,
            age: age,
            address: address,
            pincode: pincode,
            cases: cases,
            education: education,
            assets: assets,
            liabilities: liabilities,
            winner: winner,
        }

        service.post(`/edit-minister`, data)
            .then(res => {
                console.log(res);
                actionHide()
            })
            .catch(err => {
                console.log(err);
            });

        // const storage = new firebaseStorage();
        // storage.uploadAffidavits(type, file);
    }

    handleCancel = () => {
        const { actionHide } = this.props
        actionHide()
    }

    renderConstituency = () => {
        const { type, zoneOptions, constituency } = this.state

        const renderZoneOptions = zoneOptions.map((option, index) => {
            return (
                <option key={index} value={option}>{option}</option>
            )
        })

        if (type == "councillor" || type == "mla") {
            return (
                <Fragment>
                    <input className="form-control" type="text" maxLength="6" name="constituency" value={constituency} onChange={this.handleChange} />
                    <small className="form-text text-muted">Councillor, MLA = Pincode</small>
                </Fragment>
            )
        }
        else if (type == "mp") {
            return (
                <Fragment>
                    <select className="form-control" value={constituency} name="constituency" onChange={this.handleChange}>
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
        const { type, state, yearOptions, zoneOptions } = this.state;

        if (type && state) {
            if (!yearOptions.length) {
                this.renderYear()
            }
            if (!zoneOptions.length) {
                this.renderZone()
            }
        }

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
        const { typeOptions, yearOptions, partyOptions, year, party, partyShort, type, name, photoUrl, age, address, pincode, state, cases, assets, liabilities, education, winner } = this.state;

        console.log(yearOptions);


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
                                    <select className="form-control" value={type} name="type" onChange={this.handleChange}>
                                        <option>select</option>
                                        {renderTypeOptions}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="state">State</label>
                                    <select className="form-control" value={state} name="state" onChange={this.handleChange}>
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
                                    <select className="form-control" name="year" value={year} onChange={this.handleChange}>
                                        <option value="">Select year</option>
                                        {renderYears}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="party">Party full name</label>
                                    <select className="form-control" name="party" value={party} onChange={this.handleChange}>
                                        <option>select</option>
                                        {renderFullPartyOptions}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partyShort">Party short name</label>
                                    <select className="form-control" name="partyShort" value={partyShort} onChange={this.handleChange}>
                                        <option>select</option>
                                        {renderShortPartyOptions}
                                    </select>
                                </div>

                                <hr />

                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input className="form-control" type="text" name="name" value={name} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="photoUrl">Photo</label>
                                    <input type="file" className="form-control-file" name="photoUrl" value={photoUrl} onChange={this.handleFile} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="age">Age</label>
                                    <input className="form-control" name="age" type="text" value={age} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Address</label>
                                    <input className="form-control" name="address" type="text" value={address} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pincode">Pincode</label>
                                    <input className="form-control" name="pincode" type="text" value={pincode} onChange={this.handleChange} />
                                </div>

                                <hr />

                                <div className="form-group">
                                    <label htmlFor="education">Education</label>
                                    <input className="form-control" name="education" type="text" value={education} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="cases">Legal Cases</label>
                                    <input className="form-control" name="cases" type="text" value={cases} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="assets">Assets</label>
                                    <input className="form-control" name="assets" type="text" value={assets} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="liabilities">Liabilities</label>
                                    <input className="form-control" name="liabilities" type="text" value={liabilities} onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="winner">Winner</label>
                                    <select className="form-control" name="winner" value={winner} onChange={this.handleChange}>
                                        <option value="">Select</option>
                                        <option value={true}>True</option>
                                        <option value={false}>False</option>
                                    </select>
                                </div>

                                <div>
                                    <Button text="Submit" variant="btn-primary" />
                                    <button className="btn btn-default" type="button" onClick={this.handleCancel}>Cancel</button>
                                </div>

                            </form>
                        </div>
                    </div>


                </div>

            </Fragment>
        )
    }
}
export default adminAuth(EditMinister)