import React, { Component, Fragment } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions";
import notifictionActions from "../../components/Notification/actions"

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import { service } from "../../utils"
import authSession from "utils/authSession"
import authentication from "utils/authentication"

import Button from "components/Form/Button"
import Input from "components/Form/Input"

import "./style.scss";

class Location extends Component {
  constructor(props) {
    super(props)
    this.state = {
      view: 0,
      country_code: "+91",
      mobile: "",
      mobileErr: "",
      mobileMsg: "",
      otp: "",
      otpErr: "",
      otpMsg: "",
      verifier: "",
      confirmationResult: ""
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleVerification = this.handleVerification.bind(this);
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

  async handleSubmit(e) {
    e.preventDefault();
    const { country_code, mobile, verifier } = this.state;
    const { notificationAction, accountAction } = this.props;

    if (!mobile) {
      notificationAction.showNotification({
        code: "",
        message: "Please enter the details.",
        type: "error"
      });
      this.setState({
        mobileErr: "error",
        mobileMsg: "Mobile must not be empty"
      });
      return
    }

    const session = new authSession();
    const auth = new authentication;
    const token = session.getToken();

    let phoneNumber = `${country_code} ${mobile}`
    let appVerifier = verifier;
    let confirmationResult = await auth.linkWithPhoneNumber(phoneNumber, appVerifier);
    console.log(confirmationResult);

    if (confirmationResult.code == "auth/invalid-phone-number") {
      notificationAction.showNotification(confirmationResult);
      this.setState({
        mobileErr: "error",
        mobileMsg: "Enter a valid mobile number"
      });
    }
    else if (confirmationResult.code == "auth/provider-already-linked") {
      accountAction.account();
    }
    else if (confirmationResult) {
      const data = {
        token: token,
        country_code: country_code,
        phoneNumber: mobile
      }
      service.post('/phone', data)
        .then(res => {
          this.setState({
            view: 1,
            confirmationResult: confirmationResult
          })
        })
        .catch(error => {
          notificationAction.showNotification(error);
        })
    }
  }

  handleVerification(e) {
    e.preventDefault();
    const { otp, confirmationResult } = this.state;
    const { notificationAction, accountAction } = this.props;

    if (!otp) {
      notificationAction.showNotification({
        code: "",
        message: "Please enter the OTP.",
        type: "error"
      });
      this.setState({
        otpErr: "error",
        otpMsg: "OTP must not be empty"
      });
      return
    }
    let _this = this;
    let auth = new authentication;
    let session = new authSession();
    let uid = session.getToken();

    const data = {
      token: uid,
      phoneVerified: true
    }

    confirmationResult.confirm(otp).then(function (result) {
      service.post('/verifyPhone', data)
        .then(res => {
          accountAction.account();
        })
        .catch(error => {
          notificationAction.showNotification(error);
        })

    }).catch(function (error) {
      if (error.code == "auth/invalid-verification-code") {
        let msg = "Invalid OTP"
        _this.setState({
          otpErr: "error",
          otpMsg: "Please enter correct OTP"
        });
        notificationAction.showNotification({ message: msg });
      }
    });


  }

  renderMobile = () => {
    const { mobileErr, mobileMsg } = this.state;
    return (
      <Fragment>
        <div className="form">
          <div className="header">
            <h1 className="heading">Enter contact number</h1>
          </div>
          <div>
            <form onSubmit={this.handleSubmit}>
              <Input
                class={`form-control ${mobileErr}`}
                name="mobile"
                type="text"
                label="Mobile number"
                htmlFor="mobile"
                helperText={mobileMsg}
                onChange={this.handleChange}
              />
              <div className="action">
                <Button text="Proceed" variant="contained" color="primary" size="large" />
              </div>
            </form>
          </div>
        </div>
      </Fragment>

    )
  }

  renderVerification = () => {
    const { otpErr, otpMsg } = this.state;
    return (
      <Fragment>
        <div className="form">
          <div className="header">
            <h1 className="heading">Verification code</h1>
          </div>
          <div>
            <form autoComplete="off" onSubmit={this.handleVerification}>
              <Input
                class={`form-control ${otpErr}`}
                name="otp"
                type="text"
                label="OTP"
                htmlFor="otp"
                helperText={otpMsg}
                autoComplete="off"
                onChange={this.handleChange}
              />
              <div className="action">
                <Button text="Proceed" variant="contained" color="primary" size="large" />
              </div>
            </form>
          </div>
        </div>
        <div className="links">
          Click here to <span onClick={this.handleSubmit}>resend</span>
        </div>
      </Fragment>
    )
  }

  componentDidMount() {
    const auth = new authentication;
    let recaptchaVerifier = auth.recaptchaVerifier(this.recaptcha);
    this.setState({
      verifier: recaptchaVerifier
    })
  }

  render() {
    const { view } = this.state;
    return (
      <Fragment>
        <Container className="account" fixed>
          <Grid container justify="center" spacing={3} >
            <Grid item sm={4}>
              {view === 0 ? this.renderMobile() : this.renderVerification()}
            </Grid>
          </Grid>
        </Container>

        <div ref={(ref) => this.recaptcha = ref}></div>

        <style jsx>{``}</style>
      </Fragment >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch),
  notificationAction: bindActionCreators(notifictionActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Location);
