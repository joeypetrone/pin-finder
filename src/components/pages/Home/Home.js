import React from 'react';

import { Link } from 'react-router-dom';

import PropertyCard from '../../shared/PropertyCard/PropertyCard';

import authData from '../../../helpers/data/authData';
import propertyData from '../../../helpers/data/propertyData';

import './Home.scss';
import pinData from '../../../helpers/data/pinData';

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
        pinData.getPinsByPropertyId(propertyId)
          .then((pins) => {
            pins.forEach((pin) => {
              pinData.deletePin(pin.id)
                .then(() => {})
                .catch((err) => console.error('Unable to delete pin with property on Home page: ', err));
            });
          })
          .catch((err) => console.error('Unable to get pins to be deleted with property on Home page: ', err));
        this.getProperties();
      })
      .catch((err) => console.error('Unable to delete property on Home page: ', err));
  }

  componentDidMount() {
    this.getProperties();
  }

  render() {
    const { properties } = this.state;
    const addPropertyLink = '/property/new';

    const buildPropertyCards = properties.map((property) => (
      <PropertyCard key={property.id} property={property} removeProperty={this.removeProperty}/>
    ));

    return (
      <div className="Home">
        <h3>My Properties</h3>
        <Link className="btn btn-primary" to={addPropertyLink}>Add Property</Link>
        <div className="d-flex flex-wrap my-3">
          {buildPropertyCards}
        </div>
      </div>
    );
  }
}

export default Home;
