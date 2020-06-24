import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import './App.scss';

import MyNavbar from '../components/shared/MyNavbar/MyNavbar';

import Auth from '../components/pages/Auth/Auth';
import Home from '../components/pages/Home/Home';
import EditProperty from '../components/pages/EditProperty/EditProperty';
import EditPin from '../components/pages/EditPin/EditPin';
import NewProperty from '../components/pages/NewProperty/NewProperty';
import NewPin from '../components/pages/NewPin/NewPin';
import SingleProperty from '../components/pages/SingleProperty/SingleProperty';
import SinglePin from '../components/pages/SinglePin/SinglePin';

import fbConnection from '../helpers/data/connection';

fbConnection();

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

class App extends React.Component {
  state = {
    authed: false,
  }

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
      } else {
        this.setState({ authed: false });
      }
    });
  }

  componentWillUnmount() {
    this.removeListener();
  }

  render() {
    const { authed } = this.state;
    return (
      <div className="App">
        <BrowserRouter>
          <React.Fragment>
            <MyNavbar authed={authed} />
            <div className="container">
              <div className="row justify-content-center">
                <Switch>
                  <PrivateRoute path='/home' component={Home} authed={authed} />
                  <PrivateRoute path='/property/edit/:propertyId' component={EditProperty} authed={authed} />
                  <PrivateRoute path='/pin/edit/:pinId' component={EditPin} authed={authed} />
                  <PrivateRoute path='/property/new' component={NewProperty} authed={authed} />
                  <PrivateRoute path='/pin/new/:propertyId' component={NewPin} authed={authed} />
                  <PrivateRoute path='/property/:propertyId' component={SingleProperty} authed={authed} />
                  <PrivateRoute path='/pin/:pinId' component={SinglePin} authed={authed} />
                  <PublicRoute path='/auth' component={Auth} authed={authed} />
                  <Redirect from="*" to="/home" />
                </Switch>
              </div>
            </div>
          </React.Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
