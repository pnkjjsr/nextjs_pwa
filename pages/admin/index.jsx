import React, { Component, Fragment } from "react";
import { connect } from "react-redux";

import * as firebase from "firebase/app";

import action from "../../components/Notification/actions"

import "./style.scss";

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uid: "",
      email: "",
      password: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const { showNotification } = this.props;

    // signInWithEmailAndPassword
    // createUserWithEmailAndPassword
    firebase.auth().signInWithEmailAndPassword(email, password).then((result) => {
      console.log(result);
    }).catch(function (error) {
      console.log(error);

      showNotification(error)
      // ...
    });
  }

  handleChange(e) {
    let elem = e.target.name;

    this.setState({
      [elem]: e.target.value
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
      } else {
        console.log("nobody is login");

      }
    });
  }

  render() {

    return (
      <Fragment>
        <div className="w-full max-w-xs mx-auto pt-4">
          <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={this.handleSubmit}>
            <h1 className="mb-4 text-lg font-bold">
              Admin Panel
            </h1>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="email">
                Email <span className="font-hairline text-xs"></span>
              </label>
              <input name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" placeholder="ex: abc@cba.com" onChange={this.handleChange} />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm mb-2" htmlFor="password">
                Password <span className="font-hairline text-xs"></span>
              </label>
              <input name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="password" placeholder="******" autoComplete="true" onChange={this.handleChange} />
            </div>

            <div className="flex items-center justify-between">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                Login
              </button>
            </div>
          </form>
          <hr />
          <p className="text-gray-500 text-xs italic font-hairline">By proceeding, I'm agreed 'Terms & Conditions' and 'Privary Policy'</p>
        </div>
        <style jsx>{``}</style>
      </Fragment>
    )
  }
};

export default connect(state => state, action)(Home);
