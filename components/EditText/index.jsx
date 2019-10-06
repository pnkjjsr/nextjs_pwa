import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import editTextActions from "./actions"
import CreateIcon from '@material-ui/icons/Create';


import "./style.scss";

class EditText extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: props.default
        }
    }

    render() {
        const { editTextAction } = this.props;
        console.log(editTextAction.prefetch());

        const { val } = this.state;
        return (
            <Fragment>
                <div className="edit-text">
                    <div className="edit">
                        <CreateIcon />
                    </div>
                    {val}
                    {/* <input className="form-control" type="text" value="" /> */}
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    editTextAction: bindActionCreators(editTextActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(EditText)