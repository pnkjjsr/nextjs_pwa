import React, { Component, Fragment } from 'react'

import adminAuth from 'components/utils/adminAuth'
import firebaseStorage from 'components/utils/firestoreStorage'

class Minister extends Component {
    constructor(props) {
        super(props)
        this.state = {
            type: "",
            file: ""
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
        const { type, file } = this.state;
        const storage = new firebaseStorage();
        storage.uploadAffidavits(type, file);
    }

    render() {
        return (
            <Fragment>
                <div className="container">
                    <h3>
                        Heading
                    </h3>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="type">
                                Type
                        </label>
                            <select className="form-control" name="type" onChange={this.handleChange}>
                                <option>select</option>
                                <option value="muncipal">Mun</option>
                                <option value="mla">MLA</option>
                                <option value="mp">MP</option>
                                <option value="cm">CM</option>
                                <option value="pm">PM</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="file">PDF file upload</label>
                            <input type="file" className="form-control-file" name="file" onChange={this.handleFile} />
                        </div>

                        <div>
                            <button className="btn btn-primary" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

            </Fragment>
        )
    }
}
export default adminAuth(Minister)