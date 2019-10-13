import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import actions from "./actions";
import notificationActions from "../../components/Notification/actions"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { service } from '../../utils';

import authSession from "../../utils/authSession"
import Button from "components/Form/Button"
import Input from "components/Form/Input"

import validation from "./validation"
import "./style.scss";

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: "",
      address: "",
      state: "",
      pincode: "",
      country: "India",
      addressErr: "",
      stateErr: "",
      pincodeErr: "",
      addressMsg: "",
      stateMsg: "",
      pincodeMsg: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let elem = e.target.name;
    let err = elem + "Err"
    let msg = elem + "Msg"

    this.setState({
      [elem]: e.target.value,
      [err]: "",
      [msg]: ""
    }, () => this.state);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { address, state, pincode, country } = this.state;
    const { notificationAction } = this.props;

    const { valid, errors } = validation({ address, state, pincode, country });
    if (!valid) {
      notificationAction.showNotification({
        code: "",
        message: "Please enter the details.",
        type: "error"
      });
      Object.keys(errors).map(e => {
        var err = e + "Err"
        var msg = e + "Msg"
        this.setState({
          [err]: "error",
          [msg]: errors[e]
        });
      });
      return
    }

    const session = new authSession();
    const token = session.getToken();
    const data = {
      token: token,
      address: address,
      state: state,
      pincode: pincode,
      country: country
    }

    service.post('/location', data)
      .then((res) => {
        const { action } = this.props;
        action.mobile();
      }).catch(async (error) => {
        let data = error.response.data;
        let msg = data[Object.keys(data)[0]]
        let key = Object.keys(data)[0];
        let message = msg.message;

        notificationAction.showNotification(msg);
        if (key) {
          let err = key + "Err"
          let msg = key + "Msg"
          this.setState({
            [err]: "error",
            [msg]: message
          });
        }
      });
  }

  render() {
    const { addressErr, addressMsg, stateErr, stateMsg, pincodeErr, pincodeMsg } = this.state;
    return (
      <Fragment>
        <Container className="account" fixed>
          <Grid container justify="center" spacing={3} >
            <Grid item sm={4}>
              <div className="form">
                <div className="header">
                  <h1 className="heading">Select Your Area</h1>
                </div>
                <div>
                  <form onSubmit={this.handleSubmit}>

                    <Input
                      class={`form-control ${addressErr}`}
                      name="address"
                      type="text"
                      label="Address"
                      htmlFor="address"
                      helperText={addressMsg}
                      onChange={this.handleChange}
                    />

                    <Input
                      class={`form-control ${stateErr}`}
                      name="state"
                      type="text"
                      label="State"
                      htmlFor="state"
                      helperText={stateMsg}
                      onChange={this.handleChange}
                    />

                    <Input
                      class={`form-control ${pincodeErr}`}
                      name="pincode"
                      type="text"
                      label="Pincode"
                      htmlFor="pincode"
                      helperText={pincodeMsg}
                      onChange={this.handleChange}
                    />

                    <Input
                      disabled={true}
                      value="India"
                      class={`form-control`}
                      name="country"
                      type="text"
                      label="Country"
                      htmlFor="country"
                      onChange={this.handleChange}
                    />

                    <div className="action">
                      <Button text="Proceed" variant="contained" color="primary" size="large" />
                    </div>
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
        <style jsx>{``}</style>
      </Fragment>
    )
  }
}
const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(actions, dispatch),
  notificationAction: bindActionCreators(notificationActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Location);
