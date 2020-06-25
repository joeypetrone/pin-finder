import React from 'react';

import { Link } from 'react-router-dom';

import PropertyCard from '../../shared/PropertyCard/PropertyCard';

import authData from '../../../helpers/data/authData';
import propertyData from '../../../helpers/data/propertyData';

import './Home.scss';

class Home extends React.Component {
  state = {
    properties: [],
  }

  getProperties = () => {
    const uid = authData.getUid();
    propertyData.getPropertiesByUid(uid)
      .then((properties) => this.setState({ properties }))
      .catch((err) => console.error('unable to get properties: ', err));
  }

  removeProperty = (propertyId) => {
    propertyData.deleteProperty(propertyId)
      .then(() => {
        this.getProperties();
      })
      .catch((err) => console.error('unable to delete property: ', err));
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    const { properties } = this.state;
    const addPropertyLink = '/property/new';

    const buildPropertyCards = properties.map((property) => (
      <PropertyCard />
    ));

    return (
      <div className="Home">
        <h3>My Properties</h3>
        <Link className="btn btn-primary" to={addPropertyLink}>Add Property</Link>
        <div className="d-flex flex-wrap">
          {buildPropertyCards}
        </div>
      </div>
    );
  }
}

export default Home;
