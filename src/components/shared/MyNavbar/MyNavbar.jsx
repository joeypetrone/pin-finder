import React from 'react';
import { NavLink as RRNavLink } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import guestData from '../../../helpers/data/guestData';

import './MyNavbar.scss';

class MyNavbar extends React.Component {
  static propTypes = {
    authed: PropTypes.bool.isRequired,
  };

  state = {
    isOpen: false,
  };

  logMeOut = (e) => {
    e.preventDefault();
    firebase.auth().signOut();
  };

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    const { isOpen } = this.state;

    const buildNavbar = () => {
      const { authed } = this.props;
      if (authed) {
        return (
          <Nav className="ml-auto" navbar>
            {guestData.isGuest() && (
              <NavItem className="guest-note">
                <span className="badge badge-warning" title="Guest data stays with this browser and is lost after logout">Guest mode</span>
              </NavItem>
            )}
            <NavItem>
              <NavLink tag={RRNavLink} to='/home'>Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={RRNavLink} to='/property/new'>New Property</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={this.logMeOut} href="0">Logout</NavLink>
            </NavItem>
          </Nav>
        );
      }
      return <Nav className="ml-auto" navbar></Nav>;
    };

    return (
      <div className="MyNavbar">
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/" className="navbar-brand"><img className="pf-logo" src="https://i.imgur.com/7UYwPwc.png" alt="blue cap" /> Pin Finder</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={isOpen} navbar>
            { buildNavbar() }
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

export default MyNavbar;
