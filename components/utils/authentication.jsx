import firebase from "firebase/app";
import 'firebase/auth'

import clientCredentials from "./client";

import authSession from "./authSession";

export default class Authentication {
    constructor(props) {
        this.signInWithEmail = this.signInWithEmail.bind(this);
    }

    initialize() {
        const auth = new authSession();

        if (!firebase.apps.length) {
            firebase.initializeApp(clientCredentials);
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    let profile = {
                        "uid": user.uid,
                        "name": user.displayName,
                        "mobile": user.phoneNumber,
                        "email": user.email,
                        "v_email": user.emailVerified,
                        "photo": user.photoURL
                    }
                    auth.setProfile(profile)
                } else {
                    console.log("Not Logged In");
                }
            })
        }
    }

    createUserWithEmailAndPassword(email, password) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.initialize();
            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then((result) => {
                    resolve(result);
                }).catch(function (error) {
                    resolve(error);
                });
        });
    }

    signInWithEmail(email, password) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.initialize();
            firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
                resolve(result);
            }).catch(function (error) {
                resolve(error);
            });
        });

    }

    signOut() {
        this.initialize();
        firebase.auth().signOut().then(function (result) {
            console.log(result);
        }).catch(function (error) {
            console.log(error);
        })
    }

}