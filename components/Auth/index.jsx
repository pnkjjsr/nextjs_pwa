import React, { Component } from "react";
import Router from 'next/router';

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import fetch from "isomorphic-unfetch";
import clientCredentials from "./client";

import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import authAction from './actions'

import Nav from "../Nav"
import './style.scss';

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      name: "",
      eVerified: "",
      email: "",
      mobile: "",
      photo: ""
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const { action } = this.props;
    const { uid } = this.state;
    var _ = this;

    firebase.initializeApp(clientCredentials);
    firebase.auth().onAuthStateChanged(user => {


      if (user) {
        let db = firebase.firestore();
        let getUser = db.collection('users').doc(user.uid);

        const setReducer = () => {
          _.setState({
            name: user.displayName,
            eVerified: user.emailVerified,
            email: user.email,
            mobile: user.phoneNumber,
            photo: user.photoURL,
            uid: user.uid
          });
          action.updateUser(_.state);
        }

        let getDoc = getUser.get()
          .then(doc => {
            if (!doc.exists) {
              console.log('No such document!');
              const date = new Date().getTime();
              db.collection("users")
                .doc(`${user.uid}`)
                .set({
                  id: user.uid,
                  d_created: date,
                  name: user.displayName,
                  email: user.email,
                  v_email: user.emailVerified,
                  mobile: user.phoneNumber,
                  photo: user.photoURL
                });

              setReducer();

              return user
                .getIdToken()
                .then(token => {
                  return fetch("/api/login", {
                    method: "POST",
                    headers: new Headers({ "Content-Type": "application/json" }),
                    credentials: "same-origin",
                    body: JSON.stringify({ token })
                  });
                });
            } else {
              console.log('Document data:', doc.data());
              setReducer();
            }
          })
          .catch(err => {
            console.log('Error getting document', err);
          });
      }
      else {
        this.setState({ uid: null });
        fetch("/api/logout", {
          method: "POST",
          credentials: "same-origin"
        })
      }





    });
  }

  handleLogin() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(function (result) {
      console.log(result.credential.accessToken);

      if (result.operationType == "signIn") {
        Router.push('/account');
      }
    }).catch(function (error) {
      // An error happened.
      if (error.code === 'auth/account-exists-with-different-credential') {
        // Step 2.
        // User's email already exists.
        // The pending Google credential.
        var pendingCred = error.credential;
        // The provider account's email address.
        var email = error.email;
        // Get sign-in methods for this email.
        auth.fetchSignInMethodsForEmail(email).then(function (methods) {
          // Step 3.
          // If the user has several sign-in methods,
          // the first method in the list will be the "recommended" method to use.
          if (methods[0] === 'password') {
            // Asks the user their password.
            // In real scenario, you should handle this asynchronously.
            var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
            auth.signInWithEmailAndPassword(email, password).then(function (user) {
              // Step 4a.
              return user.linkWithCredential(pendingCred);
            }).then(function () {
              // Google account successfully linked to the existing Firebase user.
              goToApp();
            });
            return;
          }
          // All the other cases are external providers.
          // Construct provider object for that provider.
          // TODO: implement getProviderForProviderId.
          var provider = getProviderForProviderId(methods[0]);
          // At this point, you should let the user know that he already has an account
          // but with a different provider, and let him validate the fact he wants to
          // sign in with this provider.
          // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
          // so in real scenario you should ask the user to click on a "continue" button
          // that will trigger the signInWithPopup.
          auth.signInWithPopup(provider).then(function (result) {
            // Remember that the user may have signed in with an account that has a different email
            // address than the first one. This can happen as Firebase doesn't control the provider's
            // sign in flow and the user is free to login using whichever account he owns.
            // Step 4b.
            // Link to Google credential.
            // As we have access to the pending credential, we can directly call the link method.
            result.user.linkAndRetrieveDataWithCredential(pendingCred).then(function (usercred) {
              // Google account successfully linked to the existing Firebase user.
              goToApp();
            });
          });
        });
      }
    });
  }

  handleLogout() {
    const { action } = this.props;
    const _ = this;
    firebase.auth().signOut().then(function (result) {
      _.setState({
        user: "",
        name: "",
        eVerified: "",
        email: "",
        mobile: "",
        photo: "",
        uid: ""
      });
      action.updateUser(_.state);
    }).catch(function (error) {
      console.log(error);
    })
  }

  render() {
    const { uid, name, photo } = this.state;

    return (
      <div className="auth">
        {uid ? (
          <Nav name={name} photo={photo} action={this.handleLogout} />
        ) : (
            <span className="link" onClick={this.handleLogin}>Login</span>
          )
        }
      </div>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  action: bindActionCreators(authAction, dispatch)
})

const mapStateToProps = state => ({
  state: state.auth
})

export default connect(mapStateToProps, mapDispatchToProps)(Auth);