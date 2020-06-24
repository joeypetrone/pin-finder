import React from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';

import './Auth.scss';

class Auth extends React.Component {
  loginClickEvent = (e) => {
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
  }

  render() {
    return (
      <div className="Auth">
        <h3>Welcome, please sign in.</h3>
        <button className="btn btn-primary" onClick={this.loginClickEvent}>Google Login</button>
        <footer className="text-muted">
          <small>Copyright 2020 Twitter, Inc and other contributors Graphics licensed under CC-BY 4.0: <a href="https://creativecommons.org/licenses/by/4.0/" alt="link to Twemoji Creative Commons License">https://creativecommons.org/licenses/by/4.0/</a></small>
        </footer>
      </div>
    );
  }
}

export default Auth;
