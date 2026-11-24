import React from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import guestData from '../../../helpers/data/guestData';

import './Auth.scss';

class Auth extends React.Component {
  state = {
    guestError: false,
  };

  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  };

  guestClickEvent = (e) => {
    e.preventDefault();
    this.setState({ guestError: false });
    guestData.signInAsGuest()
      .catch((err) => {
        console.error('Unable to sign in as guest: ', err);
        this.setState({ guestError: true });
      });
  };

  render() {
    const { guestError } = this.state;
    return (
      <div className="Auth">
        <h3>Welcome, please sign in.</h3>
        <div className="Auth-buttons">
          <button className="btn btn-primary" onClick={this.loginClickEvent}>Google Login</button>
          <button className="btn btn-outline-secondary" onClick={this.guestClickEvent}>Try as guest</button>
        </div>
        <p className="Auth-note text-muted">No account needed: guest mode starts you off with a sample property and pins.</p>
        {guestError && <p className="text-danger">Guest sign-in is unavailable right now. Please try again later.</p>}
      </div>
    );
  }
}

export default Auth;
