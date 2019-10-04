import React, { Component, Fragment } from "react";

import { connect } from "react-redux";

import authSession from "components/utils/authSession"
import Storage from "components/utils/firestoreStorage"
import { service } from "utils";

import CreateIcon from '@material-ui/icons/Create';
import "./style.scss";

class UploadFile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            path: props.path
        }
    }

    handleUpload = (e) => {
        const { path } = this.state
        let file = e.target.files[0]
        const storage = new Storage;
        storage.uploadImage(path, file).then(res => {
            const session = new authSession();
            let uid = session.getToken();
            let path = `images/users/${uid}/profile.jpg`
            let data = {
                "uid": uid,
                "photoURL": path
            }
            service.post('/addUserDetails', data).then(res => {
                console.log(res.data);
            }).catch();
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        return (
            <Fragment>
                <div className="upload" onClick={this.handleEdit}>
                    <input type="file" onChange={this.handleUpload} />
                    <CreateIcon />
                </div>
                <style jsx>{``}</style>
            </Fragment >
        )
    }
}

export default connect(state => state)(UploadFile);