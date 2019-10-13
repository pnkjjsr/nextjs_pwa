import React, { Component, Fragment } from "react";
import CreateIcon from '@material-ui/icons/Create';
import authSession from "utils/authSession"
import { service } from "utils"

import "./style.scss";

class EditText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            val: props.default,
            textDisplay: "d-block",
            inputDisplay: "d-none"
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleButton = this.handleButton.bind(this)
    }

    handleEdit() {
        this.setState({
            textDisplay: "d-none",
            inputDisplay: "d-block"
        });
    }

    handleChange(e) {
        let attr = e.target.name
        this.setState({
            [attr]: e.target.value
        })
    }

    handleButton() {
        const { name } = this.state;
        const session = new authSession;
        let user = session.getProfile();

        const data = {
            uid: user.uid,
            displayName: name
        }
        service.post('/addUserDetails', data)
            .then(res => {
                service.post('user', { uid: user.uid })
                    .then(res => {
                        session.setProfile(res.data);
                    })
                    .catch(err => {
                        console.log(err);
                    });

                this.setState({
                    val: name,
                    textDisplay: "d-block",
                    inputDisplay: "d-none"
                });
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentDidMount() {
        const session = new authSession;
        let user = session.getProfile();
        if (!user.displayName) { return }
        else {
            this.setState({
                val: user.displayName
            });
        }
    }

    render() {
        const { val, textDisplay, inputDisplay } = this.state;
        return (
            <Fragment>
                <div className="edit-text">
                    <div className="edit" onClick={this.handleEdit}>
                        <CreateIcon />
                    </div>
                    <div className={`text ${textDisplay}`}>
                        {val}
                    </div>
                    <div className={`input ${inputDisplay}`}>
                        {/* <input className="form-control form-control-sm" type="text" /> */}
                        <div className="input-group input-group-sm mb-3">
                            <input name="name" className="form-control" type="text" placeholder={val} aria-label="name" onChange={this.handleChange} />
                            <div className="input-group-append">
                                <button className="btn btn-outline-primary" type="button" onClick={this.handleButton}>Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default (EditText)