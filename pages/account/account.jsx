import React, { Component, Fragment } from "react";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import accountActions from "./actions";
import notifictionActions from "components/Notification/actions"

import UploadFile from "components/UploadFile"
import Storage from "components/utils/firestoreStorage"

import "./style.scss";

class Account extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isMobile: ""
    }
  }

  handleIsMobile = () => {
    if (screen.width < 768) {
      this.setState({
        isMobile: 'mobile'
      });
    }
  }

  componentDidMount() {
    this.handleIsMobile();
  }

  render() {
    const { isMobile } = this.state;
    const storage = new Storage;
    storage.getImage('images/users', 'profile');
    // console.log(userImg);

    return (
      <Fragment>
        <div className="container account">

          <div className="user">
            <figure className={`${isMobile}`}>
              <div className="edit">
                <UploadFile path="images/users" />
              </div>
              {/* <AccountCircleIcon /> */}
              <img src="https://firebasestorage.googleapis.com/v0/b/neta-62fcb.appspot.com/o/images%2Fusers%2FNvDWTVt8hpZTnUkfslZ9afDy1wp1%2Fprofile.jpg?alt=media&token=2abba5be-6182-4052-ad39-aba4502400a9" alt="" />
            </figure>
            <h2 className="title">Welcome, Pankaj Jasoria</h2>
            <p>
              Manage your info, privacy and security to make {process.env.domain} work better for you
            </p>
          </div>


          <h1 className="title">
            <span>Your Constituency,</span> Hari Nagar, New Delhi
          </h1>

          <div className="panel">
            <div className="row">
              <div className="col-3">
                <figure className="photo">
                  <AccountCircleIcon />
                </figure>
              </div>
              <div className="col-9">
                <div className="heading">
                  <label htmlFor="ministerName">MCD Councillor</label>
                  <h3 className="title" name="ministerName">Kiran Chopra</h3>
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
