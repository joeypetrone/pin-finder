import React from 'react';

import './Auth.scss';

class Auth extends React.Component {
  render() {
    return (
      <div className="Auth">
        <h3>Welcome, please sign in.</h3>
        <button className="btn btn-primary">Google Login</button>
        <footer className="text-muted">
          <small>Copyright 2020 Twitter, Inc and other contributors Graphics licensed under CC-BY 4.0: <a href="https://creativecommons.org/licenses/by/4.0/" alt="link to Twemoji Creative Commons License">https://creativecommons.org/licenses/by/4.0/</a></small>
        </footer>
      </div>
    );
  }
}

export default Auth;
