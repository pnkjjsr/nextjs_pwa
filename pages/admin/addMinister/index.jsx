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
            year: "",
            constituency: "",
            party: "",
            type: "",
            name: "",
            photoUrl: "",
            age: "",
            education: "",
            address: "",
            pincode: "",
            zone: "",
            state: "",
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
            zone: zone,
            age: age,
            type: type,
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

    render() {
        const { display } = this.state;
        return (
            <Fragment>
                <div className="container admin">
                    <div className="header">
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
                                    <label htmlFor="year">Year</label>
                                    <select className="form-control" name="year" onChange={this.handleChange}>
                                        <option value="">Select year</option>
                                        <option value="2019">2019</option>
                                        <option value="2017">2017</option>
                                        <option value="2015">2015</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="constituency">Constituency</label>
                                    <input className="form-control" type="text" name="constituency" onChange={this.handleChange} />
                                    <small className="form-text text-muted">Councillor, MLA = Pincode, <br /> MLA = Area</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="party">Party full name</label>
                                    <select className="form-control" name="party" onChange={this.handleChange}>
                                        <option>select</option>
                                        <option value="Bhartiya Janta Party">Bhartiya Janta Party</option>
                                        <option value="Indian National Congress">Indian National Congress</option>
                                        <option value="Aam Aadmi Party">Aam Aadmi Party</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="partyShort">Party short name</label>
                                    <select className="form-control" name="partyShort" onChange={this.handleChange}>
                                        <option>select</option>
                                        <option value="BJP">BJP</option>
                                        <option value="INC">INC</option>
                                        <option value="AAP">AAP</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="type">
                                        Select Minister Type
                                    </label>
                                    <select className="form-control" name="type" onChange={this.handleChange}>
                                        <option>select</option>
                                        <option value="councillor">Councillor</option>
                                        <option value="mla">MLA</option>
                                        <option value="mp">MP</option>
                                        <option value="cm">CM</option>
                                        <option value="pm">PM</option>
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

                                    <div className="form-group">
                                        <label htmlFor="zone">Zone</label>
                                        <input className="form-control" name="zone" type="text" onChange={this.handleChange} />
                                        <small className="form-text text-muted">
                                            New Delhi, South Delhi, West Delhi, East Delhi, Chandni Chowk, North West Delhi, North East Delhi
                                        </small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="state">State</label>
                                        <input className="form-control" name="state" type="text" onChange={this.handleChange} />
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