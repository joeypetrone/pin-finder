import React from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  render() {
    return (
      <div className="Auth">
        <h3>Welcome, please sign in.</h3>
        <button className="btn btn-primary" onClick={this.loginClickEvent}>Google Login</button>
      </div>
    );
  }
}

export default Auth;
