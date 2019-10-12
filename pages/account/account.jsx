import React, { Component, Fragment } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions";
import notifictionActions from "components/Notification/actions"

import authSession from "components/utils/authSession"
import Storage from "components/utils/firestoreStorage"
import UploadFile from "components/UploadFile"
import EditText from 'components/EditText'
import AccountNav from 'components/Nav/Account/index'
import PanelMinister from "components/Panel/Minister";

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: "",
      imgUsr: "",
      state: "",
      pincode: ""
    }
  }

  handleIsMobile = () => {
    if (screen.width < 768) {
      this.setState({
        isMobile: 'mobile'
      });
    }
  }
  static getDerivedStateFromProps(props) {
    if (props.account.imgUser) {
      return {
        imgUsr: props.account.imgUser
      }
    }
    return true;
  }


  componentDidMount() {
    this.handleIsMobile();
    const session = new authSession;
    const user = session.getProfile();
    const storage = new Storage;

    storage.getImage('images/users', 'profile')
      .then(res => {
        this.setState({
          imgUsr: res.src
        });
      })
      .catch(err => {
        // console.dir(err);
      });

    this.setState({
      state: user.state,
      pincode: user.pincode
    });
  }

  render() {
    const { isMobile, imgUsr, pincode, state } = this.state;
    return (
      <Fragment>
        <div className="container account">
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <AccountNav />
            </div>
            <div className="col-lg-9">
              <div className="user">
                <figure className={`${isMobile}`}>
                  <div className="edit">
                    <UploadFile path="images/users" />
                  </div>
                  {!imgUsr ? <AccountCircleIcon /> : <img src={imgUsr} alt="User Image" />}
                </figure>
                <h2 className="title">Welcome, <EditText default="Name" /></h2>
                <p>
                  Manage your info, privacy and security to make {process.env.domain} work better for you
                </p>
              </div>

              <h1 className="title">
                <span>Your Constituency,</span> {pincode} - {state}
              </h1>

              <div className="row">
                <div className="col-12 col-lg-6 col-xl-4">
                  <PanelMinister title="MCD Councillor" type="councillor" />
                </div>
                <div className="col-12 col-lg-6 col-xl-4">
                  <PanelMinister title="MLA" type="mla" />
                </div>
                <div className="col-12 col-lg-6 col-xl-4">
                  {/* <PanelMinister type="mp" /> */}
                </div>
                <div className="col-12 col-lg-6 col-xl-4">
                  {/* <PanelMinister type="cm" /> */}
                </div>
                <div className="col-12 col-lg-6 col-xl-4">
                  {/* <PanelMinister type="pm" /> */}
                </div>
              </div>

            </div>
          </div>

        </div>
        <style jsx>{``}</style>
      </Fragment >
    )
  }
}

const mapDispatchToProps = dispatch => ({
  accountAction: bindActionCreators(accountActions, dispatch),
  notificationAction: bindActionCreators(notifictionActions, dispatch)
})

export default connect(state => state, mapDispatchToProps)(Account);
