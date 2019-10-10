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

import FlagIcon from '@material-ui/icons/Flag';
import MoneyIcon from '@material-ui/icons/Money';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';

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

              <div className="row d-none">
                <div className="col-12 col-lg-6 col-xl-4">
                  <div className="panel">
                    <div className="row">
                      <div className="col-3 col-lg-12">
                        <figure className="photo">
                          <AccountCircleIcon />
                        </figure>
                      </div>
                      <div className="col-9 col-lg-12">
                        <div className="heading">
                          <label htmlFor="ministerName">MCD Councillor</label>
                          <h3 className="title" name="ministerName">Kiran Chopra</h3>
                        </div>

                        <div className="details">
                          <ul>
                            <li>
                              <i>
                                <FlagIcon />
                              </i>
                              <label htmlFor=""><b>Bharatiya Janata Party</b></label>
                            </li>
                            <li>
                              <i>
                                <MoneyIcon />
                              </i>
                              <label htmlFor="">Rs 1,97,93,701</label>
                            </li>
                            <li>
                              <i>
                                <MenuBookIcon />
                              </i>
                              <label htmlFor="">10th Pass</label>
                            </li>
                            <li>
                              <i>
                                <HomeIcon />
                              </i>
                              <label htmlFor="">B-133/1, Hari Nagar, New Delhi-110064</label>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
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
