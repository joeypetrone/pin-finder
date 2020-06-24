import React from 'react';

import './Auth.scss';

class Auth extends React.Component {
  render() {
    return (
      <div className="Auth">
        <h1><img className="pf-logo" src="https://i.imgur.com/7UYwPwc.png" alt="blue cap" /> Pin Finder</h1>
        <button className="btn btn-primary">Hello</button>
        <footer className="text-muted">
          <small>Copyright 2020 Twitter, Inc and other contributors Graphics licensed under CC-BY 4.0: <a href="https://creativecommons.org/licenses/by/4.0/" alt="link to Twemoji Creative Commons License">https://creativecommons.org/licenses/by/4.0/</a></small>
        </footer>
      </div>
    );
  }
}

export default Auth;
