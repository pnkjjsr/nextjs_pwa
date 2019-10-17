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
        const { year, constituency, party, type, name, photoUrl, age, address, pincode, zone, state, cases, assets, liabilities } = this.state;
        const data = {
            year: year,
            constituency: constituency,
            party: party,
            type: type,
            name: name,
            photoUrl: photoUrl,
            age: age,
            address: address,
            pincode: pincode,
            zone: zone,
            state: state,
            assets: assets,
            liabilities: liabilities
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

    componentDidMount() {
        const { constituency, party, type } = this.state
    }

    render() {
        const { display } = this.state;
        return (
            <Fragment>
                <div className="container admin">
                    <div className="header">
                        <h1 className="heading">
                            Add Mini
                            <small>
                                Add your mini here.
                            </small>
                        </h1>
                    </div>

                    <div className="row">
                        <div className="col-md-6">
                            <form onSubmit={this.handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="year">Year</label>
                                    <input className="form-control" type="number" name="year" onChange={this.handleChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="constituency">Constituency</label>
                                    <input className="form-control" type="text" name="constituency" onChange={this.handleChange} />
                                    <small className="form-text text-muted">Councillor, MLA = Pincode, <br /> MLA = Area</small>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="party">Party</label>
                                    <select className="form-control" name="party" onChange={this.handleChange}>
                                        <option>select</option>
                                        <option value="bjp">Bhartiya Janta Party</option>
                                        <option value="inc">Indian National Congress</option>
                                        <option value="aap">Aam Aadmi Party</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="type">
                                        Select Mini Type
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